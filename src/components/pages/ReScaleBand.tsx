"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { BackLabel } from "@/components/back";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { CountValue } from "@/components/home/FirmAbout";
import { DURATION, EASE_OUT } from "@/lib/motion";
import type { Locale } from "@/types/content";

const COPY = {
  pt: {
    eyebrow: "Escala",
    primaryLabel: "Equity gerado em ativos do portfólio",
    primaryPrefix: "US$",
    primaryValue: "42",
    primarySuffix: "M+",
    secondary: [
      { value: "2", suffix: "", label: "Mercados ativos", sub: "Brasil · Estados Unidos" },
      { value: "2022", suffix: "", label: "Presença operacional", sub: "Corredor Brasil–EUA" },
    ],
    note: "Figuras ilustrativas do portfólio Head Oversea. Equity gerado refere-se a valor construído em ativos sob ownership ativo.",
    imageAlt: "Presença Head Oversea — sessões e operação entre mercados",
  },
  en: {
    eyebrow: "Scale",
    primaryLabel: "Equity generated across portfolio assets",
    primaryPrefix: "US$",
    primaryValue: "42",
    primarySuffix: "M+",
    secondary: [
      { value: "2", suffix: "", label: "Active markets", sub: "Brazil · United States" },
      { value: "2022", suffix: "", label: "Operating presence", sub: "Brazil–U.S. corridor" },
    ],
    note: "Illustrative Head Oversea portfolio figures. Equity generated refers to value built in assets under active ownership.",
    imageAlt: "Head Oversea presence — sessions and operations across markets",
  },
} as const;

/** Scale band — figure + presence photo + secondary metrics. */
export function ReScaleBand({ locale = "pt" }: { locale?: Locale }) {
  const t = COPY[locale];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -8% 0px",
  });

  return (
    <section
      ref={ref}
      className="border-t border-black/[0.06] bg-white text-black"
    >
      <div className="page-shell py-[clamp(3rem,7vw,5.5rem)]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: DURATION.slow, ease: EASE_OUT }}
        >
          <BackLabel>{t.eyebrow}</BackLabel>
        </motion.div>

        <div className="mt-10 grid items-end gap-10 md:mt-12 lg:grid-cols-12 lg:items-center lg:gap-x-10 xl:gap-x-12">
          {/* Primary figure */}
          <div className="lg:col-span-4">
            <p className="flex flex-wrap items-baseline gap-x-2 font-display text-[clamp(3rem,8vw,5.5rem)] leading-none tracking-[-0.04em] text-black">
              <motion.span
                className="text-[0.32em] font-sans font-medium tracking-[0.1em] text-black/45"
                initial={reduce ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: DURATION.base, delay: 0.05, ease: EASE_OUT }}
              >
                {t.primaryPrefix}
              </motion.span>
              <CountValue
                value={t.primaryValue}
                suffix={t.primarySuffix}
                active={inView}
                delay={0.12}
              />
            </p>
            <motion.p
              className="mt-4 max-w-[28ch] text-[13px] leading-relaxed text-black/50 md:text-[14px]"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: DURATION.slow,
                delay: 0.28,
                ease: EASE_OUT,
              }}
            >
              {t.primaryLabel}
            </motion.p>
          </div>

          {/* Presence photo — fills the mid gap */}
          <div className="lg:col-span-4">
            <ImageReveal
              delay={0.12}
              className="relative aspect-[4/5] w-full overflow-hidden bg-[#eceae4] sm:aspect-[5/4] lg:aspect-[4/5]"
            >
              <Image
                src="/images/scale-presence.jpg"
                alt={t.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-cover object-center"
                quality={90}
              />
            </ImageReveal>
          </div>

          {/* Secondary metrics */}
          <div className="flex flex-wrap gap-x-10 gap-y-8 sm:gap-x-12 lg:col-span-4 lg:justify-end">
            {t.secondary.map((item, i) => (
              <motion.div
                key={item.label}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: DURATION.slow,
                  delay: 0.2 + i * 0.06,
                  ease: EASE_OUT,
                }}
              >
                <p className="font-display text-[clamp(1.75rem,3vw,2.35rem)] leading-none text-black">
                  <CountValue
                    value={item.value}
                    suffix={item.suffix}
                    active={inView}
                    delay={0.22 + i * 0.06}
                  />
                </p>
                <p className="mt-3 text-[12px] uppercase tracking-[0.12em] text-black/45">
                  {item.label}
                </p>
                <p className="mt-1 text-[12px] text-black/35">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          className="mt-12 max-w-[48ch] text-[12px] leading-relaxed text-black/35"
          initial={reduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: DURATION.slow, delay: 0.4, ease: EASE_OUT }}
        >
          {t.note}
        </motion.p>
      </div>
    </section>
  );
}
