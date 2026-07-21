import type { Transition, Variants } from "framer-motion";

/**
 * Motion language — every animation derives from these tokens.
 */

/** Expo-out — the only easing used sitewide. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Deliberately slower than product UI. */
export const DURATION = {
  fast: 0.45,
  base: 0.75,
  slow: 1.05,
  cinematic: 2.2,
} as const;

/** Viewport trigger — fire early so Lenis doesn't skip whileInView. */
export const VIEWPORT = {
  once: true,
  amount: 0.12,
  margin: "120px 0px 0px 0px",
} as const;

export const transition = (
  duration: number = DURATION.base,
  delay = 0,
): Transition => ({ duration, delay, ease: EASE_OUT });

export const fadeUp: Variants = {
  hidden: { opacity: 0.02, y: 64 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: transition(DURATION.slow, delay),
  }),
};

export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: (delay: number = 0) => ({
    y: 0,
    transition: transition(DURATION.slow, delay),
  }),
};
