"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DURATION, VIEWPORT, fadeUp, lineReveal, transition } from "@/lib/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
}: TextRevealProps) {
  const lines = text.split("\n");
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={cn("overflow-hidden", className)}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden">
          <motion.span
            className="block"
            variants={lineReveal}
            custom={delay + lineIndex * 0.12}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

interface CounterProps {
  value: string;
  suffix?: string;
  label: string;
  prefix?: string;
}

export function Counter({ value, suffix = "", label, prefix = "" }: CounterProps) {
  return (
    <div className="flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={transition(DURATION.base)}
        className="flex items-baseline gap-1"
      >
        {prefix && (
          <span className="font-mono text-sm text-champagne tracking-wider">
            {prefix}
          </span>
        )}
        <span className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-ivory">
          {value}
        </span>
        {suffix && (
          <span className="font-display text-3xl md:text-4xl text-champagne">
            {suffix}
          </span>
        )}
      </motion.div>
      <p className="text-sm text-stone tracking-wide uppercase">{label}</p>
    </div>
  );
}
