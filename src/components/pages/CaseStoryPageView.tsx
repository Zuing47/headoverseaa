"use client";

import Link from "next/link";
import {
  BackBand,
  BackLabel,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import type { CaseStudy, Locale, SiteContent } from "@/types/content";

const UI = {
  pt: {
    back: "Todos os cases",
    about: "Sobre a empresa",
    sector: "Setor",
    market: "Mercado",
    category: "Categoria",
    outcome: "Resultado",
    visit: "Visitar site",
    instagram: "Conhecer Instagram",
    links: "Links",
    contact: "Fale conosco",
  },
  en: {
    back: "All cases",
    about: "About the company",
    sector: "Sector",
    market: "Market",
    category: "Category",
    outcome: "Outcome",
    visit: "Visit website",
    instagram: "View Instagram",
    links: "Links",
    contact: "Contact us",
  },
} as const;

interface CaseStoryPageViewProps {
  content: SiteContent;
  locale: Locale;
  item: CaseStudy;
}

/** Standardized company case — logo, about, website, Instagram. */
export function CaseStoryPageView({
  content,
  locale,
  item,
}: CaseStoryPageViewProps) {
  const t = UI[locale];
  const detail = item.detail;
  const casesHref = locale === "en" ? "/en/cases" : "/cases";
  const contactHref = locale === "en" ? "/en/contact" : "/contato";
  const about =
    detail?.summary || item.description || item.headline;
  const sector = detail?.sector;
  const facts = [
    sector ? { label: t.sector, value: sector } : null,
    item.location ? { label: t.market, value: item.location } : null,
    item.category ? { label: t.category, value: item.category } : null,
    item.result
      ? { label: item.resultLabel || t.outcome, value: item.result }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <BackShell content={content} locale={locale} headerSurface="light">
      <BackBand tone="white">
        <Reveal variant="rise">
          <Link
            href={casesHref}
            className="label-caps text-black/40 transition-colors hover:text-black"
          >
            ← {t.back}
          </Link>
        </Reveal>

        {/* Logo + name */}
        <div className="mt-12 grid items-end gap-10 border-b border-black/[0.08] pb-12 lg:mt-16 lg:grid-cols-12 lg:pb-16">
          <Reveal delay={0.06} variant="rise" className="lg:col-span-5">
            {item.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.logo}
                alt={item.company}
                className="h-14 w-auto max-w-[260px] object-contain object-left md:h-16"
              />
            ) : null}
            <h1 className="font-display mt-8 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05]">
              {item.company}
            </h1>
            {item.headline ? (
              <p className="body-editorial mt-5 max-w-[36ch] text-black/50">
                {item.headline}
              </p>
            ) : null}
          </Reveal>

          <Reveal
            delay={0.12}
            variant="fadeUp"
            className="flex flex-col gap-5 sm:flex-row sm:flex-wrap lg:col-span-6 lg:col-start-7 lg:justify-end"
          >
            {item.visitUrl ? (
              <MeridianLink href={item.visitUrl} external>
                {t.visit}
              </MeridianLink>
            ) : null}
            {item.instagramUrl ? (
              <MeridianLink href={item.instagramUrl} external>
                {t.instagram}
              </MeridianLink>
            ) : null}
          </Reveal>
        </div>

        {/* About + facts */}
        <div className="grid gap-14 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
          <div className="lg:col-span-6">
            <Reveal variant="rise">
              <BackLabel>{t.about}</BackLabel>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <p className="body-editorial mt-8 max-w-[44ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-relaxed text-black/60">
                {about}
              </p>
            </Reveal>
          </div>

          {facts.length > 0 ? (
            <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
              {facts.map((fact, i) => (
                <Reveal key={fact.label} delay={0.08 + i * 0.05} variant="fadeUp">
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-black/35">
                    {fact.label}
                  </dt>
                  <dd className="mt-3 font-display text-[1.15rem] leading-snug text-black/80">
                    {fact.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          ) : null}
        </div>

        {/* Links block — reinforced */}
        {(item.visitUrl || item.instagramUrl) && (
          <div className="border-t border-black/[0.08] py-12 md:py-14">
            <Reveal variant="rise">
              <BackLabel>{t.links}</BackLabel>
            </Reveal>
            <div className="mt-10 grid gap-0 border-t border-black/[0.1]">
              {item.visitUrl ? (
                <Reveal delay={0.06} variant="fadeUp">
                  <div className="flex items-center justify-between gap-6 border-b border-black/[0.1] py-6 md:py-7">
                    <p className="font-display text-[clamp(1.15rem,2vw,1.4rem)]">
                      {item.company}
                    </p>
                    <MeridianLink href={item.visitUrl} external>
                      {t.visit}
                    </MeridianLink>
                  </div>
                </Reveal>
              ) : null}
              {item.instagramUrl ? (
                <Reveal delay={0.1} variant="fadeUp">
                  <div className="flex items-center justify-between gap-6 border-b border-black/[0.1] py-6 md:py-7">
                    <p className="font-display text-[clamp(1.15rem,2vw,1.4rem)]">
                      Instagram
                    </p>
                    <MeridianLink href={item.instagramUrl} external>
                      {t.instagram}
                    </MeridianLink>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        )}

        <div className="border-t border-black/[0.08] pt-12 pb-4">
          <Reveal delay={0.08}>
            <MeridianLink href={contactHref}>{t.contact}</MeridianLink>
          </Reveal>
        </div>
      </BackBand>
    </BackShell>
  );
}
