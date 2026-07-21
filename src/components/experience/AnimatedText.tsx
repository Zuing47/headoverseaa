"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

/**
 * Character-by-character scroll reveal. Each glyph fades from 0.2 to 1 opacity
 * as the paragraph passes through the viewport.
 */
export function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = start + 1 / chars.length;
        return (
          <Char key={i} progress={scrollYProgress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </p>
  );
}

function Char({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span style={{ position: "relative", display: "inline-block", whiteSpace: "pre" }}>
      <span style={{ opacity: 0.2 }}>{children}</span>
      <motion.span style={{ opacity, position: "absolute", left: 0, top: 0 }}>
        {children}
      </motion.span>
    </span>
  );
}
