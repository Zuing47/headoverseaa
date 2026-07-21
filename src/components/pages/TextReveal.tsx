"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h2" | "h3" | "li" | "blockquote" | "span";
}

/** Scroll text entrance — aligned with home Reveal language. */
export function TextReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  return (
    <Comp
      className={cn(className)}
      initial={{ opacity: 0.02, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}
