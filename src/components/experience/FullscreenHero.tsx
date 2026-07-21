"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import type { Locale } from "@/types/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const COPY = {
  pt: {
    label: "Head Oversea",
    headline: "Construindo valor duradouro.",
    sub: "Private Equity. Real Estate. Visão de longo prazo.",
    cta: "Explorar investimentos",
    scroll: "Rolar",
  },
  en: {
    label: "Head Oversea",
    headline: "Building lasting value.",
    sub: "Private Equity. Real Estate. Long‑term vision.",
    cta: "Explore our investments",
    scroll: "Scroll",
  },
} as const;

export function FullscreenHero({ locale = "pt" }: { locale?: Locale }) {
  const t = COPY[locale];
  const investmentsHref = locale === "en" ? "/en/private-equity" : "/private-equity";

  return (
    <section className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-black">
      {/* Cinematic looping background video */}
      <LazyVideo
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/videos/us-city-skyline-sunset.mp4"
        poster="/images/us-city-skyline-sunset-poster.jpg"
        eager
        aria-hidden
      />
      {/* Dark cinematic scrim */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* Content — centered, single message */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 md:px-10 lg:px-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="label-mono text-white/70"
        >
          {t.label}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="font-display mt-6 max-w-5xl uppercase text-white [font-size:clamp(2.8rem,8vw,8.5rem)]"
        >
          {t.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="mt-6 text-base uppercase tracking-[0.18em] text-white/70 md:text-xl"
        >
          {t.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
          className="mt-12"
        >
          <Link
            href={investmentsHref}
            className="group inline-flex items-center gap-3 border-b border-white/40 pb-1 text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-champagne hover:text-champagne"
          >
            {t.cta}
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden
      >
        <span className="label-mono text-[10px] text-white/50">{t.scroll}</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/60"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
