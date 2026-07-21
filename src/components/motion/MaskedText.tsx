"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MaskedTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

/**
 * Line-masked display reveal — each line rises through a clip.
 * Institutional signature for section headlines.
 */
export function MaskedText({
  children,
  className,
  delay = 0,
  as: Tag = "h2",
}: MaskedTextProps) {
  const reduce = useReducedMotion();
  const lines = children.split("\n");
  const MotionTag = motion[Tag];

  if (reduce) {
    return (
      <Tag className={cn("whitespace-pre-line", className)}>{children}</Tag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      aria-label={children.replace(/\n/g, " ")}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden py-[0.06em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%", opacity: 0.4 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: {
                  duration: DURATION.slow,
                  delay: delay + i * 0.1,
                  ease: EASE_OUT,
                },
              },
            }}
          >
            {line || "\u00A0"}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
