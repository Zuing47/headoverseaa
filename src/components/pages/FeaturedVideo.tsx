"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/home/reveal";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  body: string;
  cta: string;
  src?: string;
  /** Static image instead of video (replaces player entirely). */
  image?: string;
  poster?: string;
  /** When true, playback stays muted (no audio). Default false. */
  muted?: boolean;
  /** About uses roomier vertical rhythm. */
  density?: "close" | "roomy";
  /**
   * Native frame — portrait (9:16) vs landscape interview (16:10).
   * Default landscape for PE-style clips.
   */
  aspect?: "landscape" | "portrait";
  /** Autoplay muted + loop (no click-to-play overlay). */
  autoplay?: boolean;
};

/** Interview-style band — text left, video/image right. */
export function FeaturedVideo({
  title,
  body,
  cta,
  src,
  image,
  poster = "/images/douglas2.jpg",
  muted = false,
  density = "close",
  aspect = "landscape",
  autoplay = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoplay);
  const isPortrait = aspect === "portrait";
  const isImage = Boolean(image);
  /** Autoplay must start muted for browsers; user can unmute via controls. */
  const startMuted = muted || autoplay;

  useEffect(() => {
    if (!autoplay || isImage || !src) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => {});
  }, [autoplay, isImage, src]);

  const start = async () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      el.controls = true;
      setPlaying(true);
    }
  };

  return (
    <section className="border-t border-white/[0.08] bg-black text-white">
      <div
        className={cn(
          "page-shell",
          density === "roomy"
            ? "section-space-roomy"
            : "py-[clamp(2.75rem,6vw,4.75rem)]",
        )}
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="rise" className="lg:col-span-5">
            <h2 className="font-display max-w-[18ch] text-[clamp(1.85rem,3.2vw,2.65rem)] leading-[1.12]">
              {title}
            </h2>
            <p className="body-editorial mt-6 max-w-[38ch] text-white/55">
              {body}
            </p>
            {!autoplay && !isImage ? (
              <button
                type="button"
                onClick={start}
                className="group mt-10 inline-flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-70"
              >
                {cta}
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-black"
                  aria-hidden
                >
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                    <path d="M0 0v12l10-6L0 0Z" />
                  </svg>
                </span>
              </button>
            ) : null}
          </Reveal>

          <Reveal
            delay={0.1}
            variant="fadeUp"
            className={cn(
              isPortrait ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-7",
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden bg-[#111]",
                isPortrait
                  ? "mx-auto aspect-[9/16] w-full max-w-[min(100%,360px)]"
                  : "aspect-[16/10] w-full",
              )}
            >
              {isImage ? (
                <Image
                  src={image!}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                  quality={92}
                />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    className={cn(
                      "absolute inset-0 h-full w-full",
                      isPortrait ? "object-contain" : "object-cover",
                      !playing && !autoplay && "opacity-0",
                    )}
                    src={src}
                    playsInline
                    muted={startMuted}
                    loop={autoplay}
                    autoPlay={autoplay}
                    preload="metadata"
                    controls={autoplay || playing}
                    onEnded={() => {
                      if (!autoplay) setPlaying(false);
                    }}
                  />

                  {!autoplay && !playing ? (
                    <button
                      type="button"
                      onClick={start}
                      className="absolute inset-0 z-[1] block w-full cursor-pointer"
                      aria-label={cta}
                    >
                      <Image
                        src={poster}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-top"
                        quality={90}
                      />
                      <div
                        className="absolute inset-0"
                        aria-hidden
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,0,0,0.35) 0%, transparent 55%)",
                        }}
                      />
                      <span className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16">
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 10 12"
                          fill="currentColor"
                          aria-hidden
                          className="ml-0.5"
                        >
                          <path d="M0 0v12l10-6L0 0Z" />
                        </svg>
                      </span>
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
