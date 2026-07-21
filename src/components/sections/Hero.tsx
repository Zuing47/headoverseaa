"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { transition } from "@/lib/motion";
import type { SiteContent, Locale } from "@/types/content";

interface HeroProps {
  content: SiteContent;
  locale: Locale;
}

export function Hero({ content, locale }: HeroProps) {
  const contactHref = locale === "en" ? "/en/contact" : "/contato";
  const aboutHref = locale === "en" ? "/en/about" : "/sobre";
  const { hero } = content;

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-obsidian">
      {hero.image && (
        <Media
          src={hero.image}
          alt=""
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
      )}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(7,7,8,0.94) 0%, rgba(7,7,8,0.82) 38%, rgba(7,7,8,0.45) 70%, rgba(7,7,8,0.35) 100%), linear-gradient(to top, rgba(7,7,8,0.9), transparent 40%)",
        }}
      />

      <Container className="relative z-10 pt-32 pb-16 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.8, 0.2)}
          className="mb-8 text-[11px] font-medium uppercase tracking-[0.28em] text-champagne"
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="max-w-4xl font-display text-[clamp(2.75rem,7vw,6rem)] font-light leading-[0.98] tracking-tight text-ivory">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(1, 0.35)}
            className="block"
          >
            {hero.title}
          </motion.span>
          {hero.titleAccent && (
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(1, 0.5)}
              className="block italic text-champagne"
            >
              {hero.titleAccent}
            </motion.span>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.9, 0.7)}
          className="mt-8 max-w-xl text-lg leading-relaxed text-stone md:text-xl"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.9, 0.9)}
          className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center"
        >
          <Button href={contactHref}>{content.cta.primary}</Button>
          {hero.videoLabel && (
            <a
              href={aboutHref}
              className="group inline-flex items-center gap-3 text-sm tracking-wide text-ivory transition-colors hover:text-champagne"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong transition-colors group-hover:border-champagne">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {hero.videoLabel}
            </a>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
