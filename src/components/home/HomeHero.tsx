"use client";

import { motion } from "framer-motion";
import type { Locale, SiteContent } from "@/types/content";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { SectionLabel, MeridianLink } from "./Editorial";
import { LazyVideo } from "@/components/ui/LazyVideo";

interface HomeHeroProps {
  content: SiteContent;
  locale?: Locale;
}

/**
 * Full-bleed hero — U.S. sunset / flag skyline loop (home only).
 * One job: brand posture + PE/RE entry.
 */
export function HomeHero({ content, locale = "pt" }: HomeHeroProps) {
  const { hero } = content;
  const en = locale === "en";
  const peHref = en ? "/en/private-equity" : "/private-equity";
  const reHref = en ? "/en/real-estate" : "/real-estate";

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black text-white md:min-h-[92svh]">
      <motion.div
        className="absolute inset-0"
        initial={{ y: "18%", scale: 1.08, opacity: 0.4 }}
        animate={{ y: "0%", scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        <LazyVideo
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] md:object-center"
          src="/videos/us-city-skyline-sunset.mp4"
          poster="/images/us-city-skyline-sunset-poster.jpg"
          eager
          aria-hidden
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, #050505 0%, #050505 16%, rgba(5,5,5,0.9) 32%, rgba(5,5,5,0.55) 48%, rgba(5,5,5,0.2) 68%, transparent 90%)",
        }}
      />
      {/* Mobile: dark plate so white type stays legible over bright skyline */}
      <div
        className="pointer-events-none absolute inset-0 lg:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.55) 28%, rgba(5,5,5,0.62) 52%, rgba(5,5,5,0.92) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-56 lg:h-48"
        aria-hidden
        style={{
          background:
            "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.75) 42%, transparent 100%)",
        }}
      />

      <div className="relative z-10 grid min-h-[100svh] lg:min-h-[92svh] lg:grid-cols-12">
        <div className="relative flex flex-col justify-end px-[var(--page-padding-mobile)] pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-28 md:px-[var(--page-padding-tablet)] md:pb-16 lg:col-span-5 lg:justify-center lg:px-[var(--page-padding-desktop)] lg:pb-24 lg:pr-10 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, delay: 0.2, ease: EASE_OUT }}
          >
            <SectionLabel tone="light">{hero.eyebrow}</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.35, ease: EASE_OUT }}
            className="font-display mt-5 max-w-[13ch] text-[clamp(2.45rem,8vw,5rem)] font-light leading-[1.05] tracking-[-0.03em] text-white md:mt-7 md:text-[clamp(3rem,6vw,5rem)]"
          >
            {hero.title}
            {hero.titleAccent ? (
              <>
                {" "}
                <span className="text-white/90">{hero.titleAccent}</span>
              </>
            ) : null}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, delay: 0.5, ease: EASE_OUT }}
            className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/75 md:mt-8 md:text-[16px]"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.base,
              delay: 0.62,
              ease: EASE_OUT,
            }}
            className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-10"
          >
            <MeridianLink href={peHref} tone="light">
              Private Equity
            </MeridianLink>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
            <MeridianLink href={reHref} tone="light">
              Real Estate
            </MeridianLink>
          </motion.div>

          {hero.trustLine ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.base,
                delay: 0.78,
                ease: EASE_OUT,
              }}
              className="mt-6 max-w-[38ch] text-[12px] leading-relaxed tracking-wide text-white/45 md:mt-10"
            >
              {hero.trustLine}
            </motion.p>
          ) : null}
        </div>

        <div
          className="hidden min-h-[46vh] lg:col-span-7 lg:block lg:min-h-[100svh]"
          aria-hidden
        />
      </div>
    </section>
  );
}
