"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SiteContent, Locale, CaseStudy } from "@/types/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PortfolioStack({ content, locale = "pt" }: { content: SiteContent; locale?: Locale }) {
  const en = locale === "en";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const items = content.cases.items;
  const casesHref = en ? "/en/cases" : "/cases";
  const title = en ? "Selected portfolio" : "Portfólio selecionado";
  const viewAll = en ? "View all" : "Ver todos";
  const visit = en ? "Visit site" : "Visitar site";

  return (
    <section className="border-t border-white/10 bg-black px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="label-mono text-white/50"
          >
            {title}
          </motion.h2>
          <Link
            href={casesHref}
            className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-champagne"
          >
            {viewAll}
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </div>

        {/* Sticky stack — one company at a time */}
        <div ref={ref} className="mt-10">
          {items.map((item, i) => (
            <StackCard
              key={item.id}
              item={item}
              index={i}
              total={items.length}
              progress={scrollYProgress}
              visitLabel={visit}
            />
          ))}
        </div>
      </div>
    </section>
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
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const isReal = item.visitUrl && item.visitUrl !== "#";
  const light = item.logoBg === "light";

  return (
    <div className="sticky flex min-h-[62vh] items-start" style={{ top: `calc(7rem + ${index * 22}px)` }}>
      <motion.article
        style={{ scale }}
        className={cn(
          "relative flex aspect-[16/9] w-full origin-top flex-col items-center justify-center gap-10 overflow-hidden rounded-2xl border md:aspect-[21/9]",
          light ? "border-transparent bg-white" : "border-white/12 bg-[#0b0c0f]",
        )}
      >
        {/* Section index — micro accent */}
        <span className={cn("label-mono absolute left-7 top-7 text-xs", light ? "text-black/40" : "text-white/35")}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className={cn("absolute right-7 top-7 text-[11px] uppercase tracking-[0.16em]", light ? "text-black/40" : "text-white/40")}>
          {item.category}
        </span>

        {/* Logo — the hero of the card */}
        <div className="flex min-h-[80px] w-full items-center justify-center px-8 md:min-h-[110px]">
          {item.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.logo}
              alt={item.company}
              className={cn("w-auto max-w-[320px] object-contain md:max-w-[420px]", light ? "max-h-20 md:max-h-24" : "max-h-16 md:max-h-20")}
            />
          ) : (
            <span className={cn("font-display text-4xl uppercase tracking-tight md:text-6xl", light ? "text-black" : "text-white")}>
              {item.company}
            </span>
          )}
        </div>

        <a
          href={item.visitUrl ?? "#"}
          target={isReal ? "_blank" : undefined}
          rel={isReal ? "noopener noreferrer" : undefined}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full border px-7 py-3 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors",
            light
              ? "border-black/20 text-black hover:bg-black hover:text-white"
              : "border-white/20 text-white hover:border-champagne hover:text-champagne",
          )}
        >
          {visitLabel}
          <span className="transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden>↗</span>
        </a>
      </motion.article>
    </div>
  );
}
