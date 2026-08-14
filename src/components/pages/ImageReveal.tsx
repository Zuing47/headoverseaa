"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of scroll (heroes) */
  immediate?: boolean;
}

const REVEALED = { y: "0%", scale: 1, clipPath: "inset(0% 0% 0% 0%)" };
const HIDDEN = { y: "18%", scale: 1.06, clipPath: "inset(8% 0% 0% 0%)" };

/**
 * Photo / media entrance — rises from below with a soft clip mask.
 * Falls back to fully revealed quickly so mobile never strands images.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: VIEWPORT.amount,
    margin: VIEWPORT.margin,
  });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setFallback(true), 600);
    return () => window.clearTimeout(id);
  }, []);

  if (reduce) {
    return <div className={cn("relative overflow-hidden", className)}>{children}</div>;
  }

  const show = immediate || inView || fallback;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={HIDDEN}
        animate={show ? REVEALED : HIDDEN}
        transition={{
          duration: DURATION.cinematic,
          delay: show && !fallback ? delay : 0,
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
        initial={{ y: "18%", scale: 1.06, opacity: 1 }}
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
