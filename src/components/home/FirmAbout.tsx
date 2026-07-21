"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";
import type { Locale, SiteContent } from "@/types/content";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { BackLabel } from "@/components/back";
import { MeridianLink } from "./Editorial";

/** Dark navy — deep blue, not mid-blue. */
const EQUITY_NAVY = "var(--navy)";

interface FirmAboutProps {
  content: SiteContent;
  locale?: Locale;
}

export function CountValue({
  value,
  suffix,
  active,
  delay,
}: {
  value: string;
  suffix?: string;
  active: boolean;
  delay: number;
}) {
  const numeric = Number.parseFloat(value.replace(/[^\d.]/g, ""));
  const isNumeric = Number.isFinite(numeric);
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) =>
    Number.isInteger(numeric) ? String(Math.round(v)) : v.toFixed(0),
  );
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active || !isNumeric) return;
    if (reduce) {
      mv.set(numeric);
      return;
    }
    const controls = animate(mv, numeric, {
      duration: DURATION.cinematic,
      delay,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [active, delay, isNumeric, mv, numeric, reduce]);

  return (
    <span className="inline-flex items-center tracking-[-0.04em]">
      <motion.span
        className="leading-none"
        initial={reduce ? false : { opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: DURATION.slow,
          delay,
          ease: EASE_OUT,
        }}
      >
        {isNumeric ? <motion.span>{display}</motion.span> : value}
      </motion.span>
      {suffix ? (
        <motion.span
          className="ml-1 text-[0.42em] font-sans tracking-[0.04em] text-current/55"
          initial={reduce ? false : { opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: DURATION.slow,
            delay: delay + 0.15,
            ease: EASE_OUT,
          }}
        >
          {suffix}
        </motion.span>
      ) : null}
    </span>
  );
}

/** Home — firm intro + single equity figure. */
export function FirmAbout({ content, locale = "pt" }: FirmAboutProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -10% 0px",
  });
  const en = locale === "en";
  const aboutHref = en ? "/en/about" : "/sobre";
  const equity = content.home.trust[0] ?? {
    value: "42",
    suffix: "M+",
    label: en ? "Equity generated" : "Equity gerado",
  };

  const numeric = Number.parseFloat(equity.value.replace(/[^\d.]/g, ""));
  const countMv = useMotionValue(0);
  const countDisplay = useTransform(countMv, (v) => String(Math.round(v)));

  useEffect(() => {
    if (!inView || !Number.isFinite(numeric)) return;
    if (reduce) {
      countMv.set(numeric);
      return;
    }
    const controls = animate(countMv, numeric, {
      duration: DURATION.cinematic,
      delay: 0.18,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [inView, numeric, countMv, reduce]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-black/[0.08] bg-white text-black"
      aria-label={en ? "About Head Oversea" : "Sobre a Head Oversea"}
    >
      <div className="page-shell relative py-[clamp(3.25rem,7vw,5.5rem)]">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 24 }}
            transition={{ duration: DURATION.slow, ease: EASE_OUT }}
            className="lg:col-span-7"
          >
            <BackLabel tone="dark">{en ? "About" : "Sobre"}</BackLabel>
            <h2 className="font-display mt-7 max-w-[18ch] text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.1] text-[var(--navy)]">
              {en
                ? "An investment firm built for long horizons."
                : "Uma firma de investimento feita para horizontes longos."}
            </h2>
            <p className="body-editorial mt-7 max-w-[40ch] text-black/55">
              {content.about.intro || content.philosophy.body}
            </p>
            <div className="mt-10">
              <MeridianLink href={aboutHref}>
                {en ? "Read more" : "Ler mais"}
              </MeridianLink>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 28 }}
            transition={{
              duration: DURATION.slow,
              delay: 0.12,
              ease: EASE_OUT,
            }}
            className="lg:col-span-4 lg:col-start-9"
          >
            <p
              className="text-[13px] leading-snug"
              style={{ color: `${EQUITY_NAVY}aa` }}
            >
              {equity.label}
            </p>

            {/*
              Baseline lock: large figure sits on the line.
              US$ / M+ are shifted up from that baseline to mid-cap of the figure.
              (items-center + serif metrics kept failing optically.)
            */}
            <p
              className="mt-3"
              style={{
                color: EQUITY_NAVY,
                fontSize: "clamp(3.25rem, 12vw, 5.5rem)",
                lineHeight: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                gap: "0.1em",
              }}
            >
              <span
                className="font-sans font-medium tracking-[0.12em]"
                style={{
                  fontSize: "0.28em",
                  lineHeight: 1,
                  position: "relative",
                  top: "-0.78em",
                  opacity: 0.72,
                }}
              >
                US$
              </span>
              <motion.span
                className="font-display"
                style={{
                  fontSize: "1em",
                  lineHeight: 1,
                  display: "inline-block",
                }}
                initial={reduce ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: DURATION.slow,
                  delay: 0.18,
                  ease: EASE_OUT,
                }}
              >
                {countDisplay}
              </motion.span>
              <span
                className="font-sans font-medium tracking-[0.04em]"
                style={{
                  fontSize: "0.32em",
                  lineHeight: 1,
                  position: "relative",
                  top: "-0.7em",
                  opacity: 0.72,
                }}
              >
                {equity.suffix}
              </span>
            </p>

            <motion.div
              className="mt-6 h-px origin-left"
              style={{ backgroundColor: `${EQUITY_NAVY}33` }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: DURATION.slow,
                delay: 0.35,
                ease: EASE_OUT,
              }}
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use FirmAbout */
export const TrustBar = FirmAbout;
