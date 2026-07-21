"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale, SiteContent } from "@/types/content";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { MeridianLink } from "./Editorial";
import { BackLabel } from "@/components/back";
import { ImageReveal } from "@/components/pages/ImageReveal";

interface FeatureRailProps {
  content: SiteContent;
  locale?: Locale;
}

/**
 * Post-hero feature rail — PWS carousel energy, Crossing signature.
 * One composition: giant media + editorial caption + meridian controls.
 */
export function FeatureRail({ content, locale = "pt" }: FeatureRailProps) {
  const en = locale === "en";
  const slides = content.insights.items.slice(0, 3);
  const [index, setIndex] = useState(0);
  const active = slides[index];

  if (!active) return null;

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  };

  return (
    <section className="bg-black text-white" aria-label="Featured">
      <div className="page-shell pb-16 pt-6 md:pb-24 md:pt-10">
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <BackLabel tone="light">
            {en ? "Perspectives" : "Perspectivas"}
          </BackLabel>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={en ? "Previous" : "Anterior"}
              className="flex h-11 w-11 items-center justify-center border border-white/25 text-white/70 transition-colors hover:border-white/55 hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={en ? "Next" : "Próximo"}
              className="flex h-11 w-11 items-center justify-center border border-white/25 text-white/70 transition-colors hover:border-white/55 hover:text-white"
            >
              →
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0.35, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.slow, ease: EASE_OUT }}
          >
            <Link href={active.href} className="group block">
              <ImageReveal className="relative aspect-[4/3] w-full min-h-[220px] overflow-hidden bg-[#111] sm:aspect-[16/10] sm:min-h-0 md:aspect-[21/9] lg:aspect-[24/9]">
                {active.image ? (
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    quality={92}
                    priority
                  />
                ) : null}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                  aria-hidden
                />
              </ImageReveal>
            </Link>

            <div className="mt-8 grid gap-8 border-t border-white/[0.1] pt-8 md:mt-10 md:grid-cols-12 md:gap-10 md:pt-10">
              <div className="md:col-span-5">
                <p className="label-caps text-white/40">{active.category}</p>
                <h2 className="font-display mt-4 text-[clamp(1.65rem,2.8vw,2.35rem)] leading-[1.12]">
                  {active.title}
                </h2>
              </div>
              <div className="flex flex-col justify-between md:col-span-6 md:col-start-7">
                <p className="body-editorial max-w-[42ch] text-white/50">
                  {active.description}
                </p>
                <div className="mt-8">
                  <MeridianLink href={active.href} tone="light">
                    {en ? "Learn more" : "Saiba mais"}
                  </MeridianLink>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex gap-2" role="tablist" aria-label="Slides">
          {slides.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={cnDot(i === index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function cnDot(on: boolean) {
  return [
    "h-1.5 rounded-full transition-all duration-500",
    on ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/55",
  ].join(" ");
}
