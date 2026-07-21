"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** Default true for decorative loops */
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
  /** Keep false on low-end — only attach src when visible */
  eager?: boolean;
  "aria-hidden"?: boolean | "true" | "false";
  "aria-label"?: string;
};

/**
 * Deferred video loader — attaches `src` only when near viewport.
 * Prevents potato phones from downloading every loop at once.
 */
export function LazyVideo({
  src,
  poster,
  className,
  muted = true,
  loop = true,
  playsInline = true,
  autoPlay = true,
  eager = false,
  ...aria
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;

    const saveData =
      typeof navigator !== "undefined" &&
      // @ts-expect-error NetworkInformation
      (navigator.connection?.saveData === true ||
        // @ts-expect-error
        navigator.connection?.effectiveType === "2g");

    // Save-Data: keep poster only (still show something). Never block 3g/4g.
    if (saveData && poster) {
      setActive(false);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, poster]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active || !autoPlay) return;
    const play = () => {
      el.play().catch(() => {});
    };
    play();
  }, [active, autoPlay, src]);

  return (
    <video
      ref={ref}
      className={cn("bg-black", className)}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={autoPlay && active}
      preload={active ? "metadata" : "none"}
      src={active ? src : undefined}
      {...aria}
    />
  );
}
