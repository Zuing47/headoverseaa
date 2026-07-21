"use client";

import Image from "next/image";
import Link from "next/link";
import { TextReveal } from "@/components/pages/TextReveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { SectionLabel, TextLink } from "@/components/home/Editorial";
import type { Locale, SiteContent } from "@/types/content";

interface PortfolioFilmstripProps {
  content: SiteContent;
  locale?: Locale;
  tone?: "light" | "dark";
}

/** Horizontal immersion strip of portfolio company photos — reused across pages */
export function PortfolioFilmstrip({
  content,
  locale = "pt",
  tone = "dark",
}: PortfolioFilmstripProps) {
  const en = locale === "en";
  const dark = tone === "dark";
  const items = content.cases.items.filter((c) => c.image);
  const casesHref = en ? "/en/cases" : "/cases";

  return (
    <section
      className={dark ? "bg-black text-white" : "bg-white text-black"}
    >
      <div className="page-shell pt-[clamp(4rem,8vw,6rem)]">
        <TextReveal>
          <SectionLabel tone={dark ? "light" : "dark"}>
            {content.cases.eyebrow}
          </SectionLabel>
        </TextReveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <TextReveal delay={0.06}>
            <h2 className="font-display max-w-2xl text-[clamp(1.75rem,3vw,2.75rem)] leading-snug">
              {en
                ? "Companies we build alongside."
                : "Empresas que construímos lado a lado."}
            </h2>
          </TextReveal>
          <TextReveal delay={0.1}>
            <TextLink href={casesHref} tone={dark ? "light" : "dark"}>
              {en ? "View portfolio" : "Ver portfólio"}
            </TextLink>
          </TextReveal>
        </div>
      </div>

      <div className="mt-12 flex gap-3 overflow-x-auto px-[var(--page-padding-mobile)] pb-16 md:mt-16 md:gap-4 md:px-[var(--page-padding-tablet)] md:pb-24 lg:px-[var(--page-padding-desktop)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <Link
            key={item.id}
            href={item.visitUrl && item.visitUrl !== "#" ? item.visitUrl : casesHref}
            target={item.visitUrl && item.visitUrl !== "#" ? "_blank" : undefined}
            rel={
              item.visitUrl && item.visitUrl !== "#"
                ? "noopener noreferrer"
                : undefined
            }
            className="group relative w-[72vw] max-w-[420px] shrink-0 sm:w-[48vw] lg:w-[32vw]"
          >
            <ImageReveal
              className="aspect-[3/4] w-full bg-[#1a1a1a]"
              delay={i * 0.05}
            >
              <Image
                src={item.image!}
                alt={item.company}
                fill
                sizes="(max-width: 768px) 72vw, 32vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.85) 100%)",
                }}
              />
            </ImageReveal>
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
              <p className="label-caps text-white/45">{item.category}</p>
              <p className="font-display mt-2 text-xl text-white md:text-2xl">
                {item.company}
              </p>
              {item.location ? (
                <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-white/40">
                  {item.location}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
