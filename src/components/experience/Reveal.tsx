"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  /**
   * Animate on mount instead of on scroll-into-view. Use for anything that is
   * already inside the first viewport on load (hero copy) — whileInView's
   * IntersectionObserver can sit unfired until the user scrolls/resizes,
   * which otherwise leaves above-the-fold text stuck invisible.
   */
  immediate?: boolean;
}

/** Fade-in used across the immersive pages — scroll-triggered by default. */
export function Reveal({
  children,
  as = "div",
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  immediate = false,
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const trigger = immediate
    ? { animate: { opacity: 1, x: 0, y: 0 } }
    : {
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, margin: "50px", amount: 0 },
      };
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      {...trigger}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
