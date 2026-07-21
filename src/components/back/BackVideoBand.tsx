"use client";

import { BackBand, BackLabel } from "./primitives";
import { Reveal } from "@/components/home/reveal";
import { ParallaxMedia } from "@/components/pages/ImageReveal";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { cn } from "@/lib/utils";

interface BackVideoBandProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  src: string;
  poster?: string;
  /** landscape full-bleed or contained portrait frame */
  variant?: "bleed" | "frame";
  className?: string;
}

/** BACK full-bleed or framed video with optional overlay copy. */
export function BackVideoBand({
  eyebrow,
  title,
  body,
  src,
  poster,
  variant = "bleed",
  className,
}: BackVideoBandProps) {
  if (variant === "frame") {
    return (
      <BackBand tone="black" className={className}>
        {eyebrow ? (
          <Reveal variant="rise">
            <BackLabel tone="light">{eyebrow}</BackLabel>
          </Reveal>
        ) : null}
        {title ? (
          <Reveal delay={0.08} variant="rise">
            <h2 className="font-display mt-8 max-w-[18ch] text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.12]">
              {title}
            </h2>
          </Reveal>
        ) : null}
        {body ? (
          <Reveal delay={0.12} variant="fadeUp">
            <p className="body-editorial mt-5 max-w-[40ch] text-white/50">
              {body}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={0.16} variant="fadeUp" className="mt-12">
          <div className="relative mx-auto h-[min(68vh,560px)] w-[min(100%,calc(68vh*9/16))] max-w-[380px] overflow-hidden bg-[#111]">
            <LazyVideo
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              poster={poster}
              aria-hidden
            />
          </div>
        </Reveal>
      </BackBand>
    );
  }

  return (
    <section
      className={cn(
        "relative min-h-[min(52vh,520px)] overflow-hidden bg-black text-white md:min-h-[58vh]",
        className,
      )}
    >
      <ParallaxMedia strength={8}>
        <LazyVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          aria-hidden
        />
      </ParallaxMedia>
      <div
        className="absolute inset-0 z-[1] hidden lg:block"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] lg:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.58) 100%)",
        }}
      />
      {(eyebrow || title || body) && (
        <div className="page-shell relative z-10 flex min-h-[min(52vh,520px)] flex-col justify-end py-12 md:min-h-[58vh] md:justify-center md:py-16">
          {eyebrow ? (
            <Reveal variant="rise">
              <BackLabel tone="light">{eyebrow}</BackLabel>
            </Reveal>
          ) : null}
          {title ? (
            <Reveal delay={0.1} variant="rise">
              <h2 className="font-display mt-6 max-w-[20ch] text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.08]">
                {title}
              </h2>
            </Reveal>
          ) : null}
          {body ? (
            <Reveal delay={0.18} variant="fadeUp">
              <p className="mt-6 max-w-[38ch] text-[15px] leading-relaxed text-white/55 md:text-[16px]">
                {body}
              </p>
            </Reveal>
          ) : null}
        </div>
      )}
    </section>
  );
}
