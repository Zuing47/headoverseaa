"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "fadeUp"
  | "fade"
  | "fadeScale"
  | "rise"
  | "slide"
  | "slideRight";

/**
 * Near-zero opacity floors — Lenis can strand whileInView if we start at
 * exactly 0, so we keep a barely-perceptible sliver instead. Movement is
 * the primary signal: every variant now rises from below with real
 * distance so the entrance reads clearly, not as a soft fade.
 *
 * A timed safety net forces full opacity if IntersectionObserver never
 * fires (some mobile browsers + route transitions), so copy never stays
 * invisible on dark bands.
 */
const VARIANTS: Record<
  RevealVariant,
  { initial: TargetAndTransition; whileInView: TargetAndTransition }
> = {
  fadeUp: {
    initial: { opacity: 0.02, y: 64 },
    whileInView: { opacity: 1, y: 0 },
  },
  fade: {
    initial: { opacity: 0.02, y: 32 },
    whileInView: { opacity: 1, y: 0 },
  },
  fadeScale: {
    initial: { opacity: 0.03, y: 28, scale: 0.96 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
  },
  rise: {
    initial: { opacity: 0.02, y: 92 },
    whileInView: { opacity: 1, y: 0 },
  },
  slide: {
    initial: { opacity: 0.02, x: -36 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0.02, x: 72 },
    whileInView: { opacity: 1, x: 0 },
  },
};

const STATIC: TargetAndTransition = { opacity: 1, y: 0, x: 0, scale: 1 };

/** If IO never fires, force visible after this (ms). */
const REVEAL_FALLBACK_MS = 1600;

export function reveal(delay = 0, variant: RevealVariant = "fadeUp") {
  const v = VARIANTS[variant];
  return {
    initial: v.initial,
    whileInView: v.whileInView,
    viewport: VIEWPORT,
    transition: { duration: DURATION.slow, delay, ease: EASE_OUT },
  };
}

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "fadeUp",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: VIEWPORT.amount,
    margin: VIEWPORT.margin,
  });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setFallback(true), REVEAL_FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }

  const v = VARIANTS[variant];
  const show = inView || fallback;

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={v.initial}
      animate={show ? v.whileInView : v.initial}
      transition={{ duration: DURATION.slow, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variant = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const v = VARIANTS[variant];
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      variants={{
        hidden: v.initial,
        visible: {
          ...v.whileInView,
          transition: { duration: DURATION.slow, ease: EASE_OUT },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export { STATIC };
