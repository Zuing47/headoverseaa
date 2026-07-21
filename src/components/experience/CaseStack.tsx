"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import type { SiteContent, Locale, CaseStudy } from "@/types/content";

interface CaseStackProps {
  content: SiteContent;
  locale: Locale;
  /** Set false when the page already renders its own hero heading (e.g. /cases). */
  showHeader?: boolean;
}

export function CaseStack({ content, locale, showHeader = true }: CaseStackProps) {
  const en = locale === "en";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const items = content.cases.items;

  return (
    <Section tone="obsidian" className="!pt-20 !pb-24 md:!pt-24">
      <Container>
        {showHeader && (
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>{content.cases.eyebrow}</Eyebrow>
              <h2 className="text-metallic font-display font-light leading-tight tracking-tight [font-size:clamp(1.6rem,3vw,2.5rem)]">
                {content.cases.title}
              </h2>
            </div>
            <Link
              href={en ? "/en/cases" : "/cases"}
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-champagne transition-colors hover:text-ivory"
            >
              {en ? "View all" : "Ver todos"}
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>
        )}

        <div ref={ref}>
          {items.map((item, i) => (
            <StackCard
              key={item.id}
              item={item}
              index={i}
              total={items.length}
              progress={scrollYProgress}
              visitLabel={en ? "Visit site" : "Visitar site"}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function StackCard({
  item,
  index,
  total,
  progress,
  visitLabel,
}: {
  item: CaseStudy;
  index: number;
  total: number;
  progress: MotionValue<number>;
  visitLabel: string;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const isReal = item.visitUrl && item.visitUrl !== "#";
  const light = item.logoBg === "light";

  return (
    <div className="sticky flex min-h-[40vh] items-start" style={{ top: `calc(6rem + ${index * 20}px)` }}>
      <motion.article
        style={{ scale }}
        className={`flex w-full origin-top flex-col items-center justify-center gap-9 rounded-3xl px-8 py-12 md:py-16 ${
          light ? "bg-white" : "border border-border-strong bg-charcoal"
        }`}
      >
        <div className="flex min-h-[72px] w-full items-center justify-center md:min-h-[88px]">
          {item.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.logo}
              alt={item.company}
              className="max-h-14 w-auto max-w-[280px] object-contain md:max-h-16"
            />
          ) : (
            <span
              className={`font-display text-3xl font-normal md:text-4xl ${light ? "text-obsidian" : "text-ivory"}`}
            >
              {item.company}
            </span>
          )}
        </div>

        <a
          href={item.visitUrl ?? "#"}
          target={isReal ? "_blank" : undefined}
          rel={isReal ? "noopener noreferrer" : undefined}
          className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
            light
              ? "border-obsidian/20 text-obsidian hover:bg-obsidian hover:text-ivory"
              : "border-border-strong text-ivory hover:border-champagne hover:text-champagne"
          }`}
        >
          {visitLabel}
          <span aria-hidden>↗</span>
        </a>
      </motion.article>
    </div>
  );
}
