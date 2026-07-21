"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of scroll (heroes) */
  immediate?: boolean;
}

/**
 * Photo / media entrance — rises from below with a soft clip mask.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: ImageRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={cn("relative overflow-hidden", className)}>{children}</div>;
  }

  const motionProps = immediate
    ? { animate: { y: "0%", scale: 1, clipPath: "inset(0% 0% 0% 0%)" } }
    : {
        whileInView: { y: "0%", scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
        viewport: VIEWPORT,
      };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ y: "28%", scale: 1.1, clipPath: "inset(12% 0% 0% 0%)" }}
        {...motionProps}
        transition={{
          duration: DURATION.cinematic,
          delay,
          ease: EASE_OUT,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Full-bleed band that rises into view on scroll. */
export function MediaRise({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={cn("relative overflow-hidden", className)}>{children}</div>;
  }
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ y: "18%", scale: 1.06, opacity: 0.5 }}
        whileInView={{ y: "0%", scale: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION.cinematic, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Subtle scroll parallax for full-bleed media.
 * Strength is % travel — keep low (8–14) for institutional feel.
 */
export function ParallaxMedia({
  children,
  className,
  strength = 10,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`],
  );

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Less bleed on mobile so object-cover doesn't crop the subject away */}
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-[-4%] will-change-transform md:inset-[-14%]"
      >
        {children}
      </motion.div>
    </div>
  );
}
