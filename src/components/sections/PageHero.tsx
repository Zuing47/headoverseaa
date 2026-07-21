"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/FadeIn";
import { transition } from "@/lib/motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border hero-gradient pt-24 pb-14 md:pt-32 md:pb-20">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.7)}
          className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-champagne-dim"
        >
          {eyebrow}
        </motion.p>
        <TextReveal
          as="h1"
          text={title}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-ivory max-w-4xl"
        />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.8, 0.5)}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-stone"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
