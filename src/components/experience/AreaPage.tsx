"use client";

import Image from "next/image";
import {
  BackApproach,
  BackBand,
  BackLabel,
  BackShell,
  BackTrackGrid,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { TextReveal } from "@/components/pages/TextReveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { BACK_MEDIA } from "@/lib/back-media";
import type { SiteContent, Locale } from "@/types/content";

export interface AreaSection {
  n: string;
  label: string;
  body: string;
}

interface AreaPageProps {
  content: SiteContent;
  locale: Locale;
  area: string;
  headline: string;
  intro: string;
  heroImage?: string;
  midImage: string;
  sections: AreaSection[];
  portfolioLabel: string;
  portfolioHref: string;
  quote?: string;
}

/** Area page in estilo BACK — Real Estate (and similar). */
export function AreaPage({
  content,
  locale,
  area,
  headline,
  intro,
  heroImage,
  midImage,
  sections,
  portfolioLabel,
  portfolioHref,
  quote,
}: AreaPageProps) {
  const en = locale === "en";
  const closingQuote =
    quote ??
    (en
      ? "Patient capital. Real assets. Presence in both markets."
      : "Capital paciente. Ativos reais. Presença nos dois mercados.");

  const isRE = area.toLowerCase().includes("real");
  const heroSrc = heroImage || (isRE ? BACK_MEDIA.house : midImage);

  return (
    <BackShell content={content} locale={locale}>
      {/* Hero — photo full-bleed + black contrast + left-aligned copy */}
      <section className="relative min-h-[min(72vh,680px)] overflow-hidden bg-black text-white">
        <Image
          src={heroSrc}
          alt={`${area} — Head Oversea`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
          quality={92}
        />
        <div
          className="absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.48) 42%, rgba(0,0,0,0.78) 100%)",
          }}
        />
        <div className="page-shell relative z-10 flex min-h-[min(72vh,680px)] flex-col justify-end py-16 md:justify-center md:py-20">
          <Reveal variant="rise">
            <BackLabel tone="light">{area}</BackLabel>
          </Reveal>
          <div className="mt-7 grid items-end gap-8 lg:mt-9 lg:grid-cols-12 lg:gap-10">
            <Reveal delay={0.08} variant="rise" className="lg:col-span-7">
              <h1 className="font-display max-w-[16ch] whitespace-pre-line text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-[1.04]">
                {headline}
              </h1>
            </Reveal>
            <Reveal delay={0.14} variant="fadeUp" className="lg:col-span-5">
              <p className="body-editorial max-w-[40ch] text-white/65">
                {intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <BackBand tone="white">
        <TextReveal>
          <BackLabel>{en ? "What we do" : "O que fazemos"}</BackLabel>
        </TextReveal>
        <div className="mt-12 divide-y divide-black/[0.08] border-t border-black/[0.08]">
          {sections.map((s, i) => (
            <TextReveal key={s.n} delay={i * 0.05}>
              <div className="grid gap-6 py-14 md:grid-cols-12 md:gap-10 md:py-20">
                <div className="md:col-span-4">
                  <span className="label-caps text-black/35">{s.n}</span>
                  <h2 className="font-display mt-4 text-[clamp(1.5rem,2.5vw,2.1rem)] leading-snug">
                    {s.label}
                  </h2>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="body-editorial text-black/55">{s.body}</p>
                </div>
              </div>
            </TextReveal>
          ))}
        </div>
      </BackBand>

      <ImageReveal className="aspect-[4/3] w-full min-h-[220px] bg-[#0a0a0a] sm:aspect-[16/10] sm:min-h-0 md:aspect-[21/9] lg:aspect-[24/9]">
        <Image
          src={midImage}
          alt={`${area} — Head Oversea`}
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={92}
        />
      </ImageReveal>

      <BackTrackGrid
        eyebrow={en ? "Related" : "Relacionado"}
        title={
          en
            ? "How real estate sits in our platform."
            : "Como o real estate se encaixa na plataforma."
        }
        items={[
          {
            title: "Private Equity",
            href: en ? "/en/private-equity" : "/private-equity",
            image: BACK_MEDIA.marketsUs,
          },
          {
            title: en ? "Our thesis" : "Nossa tese",
            href: en ? "/en/about" : "/tese",
            image: BACK_MEDIA.marketsBr,
          },
          {
            title: en ? "Portfolio" : "Portfólio",
            href: portfolioHref,
            image: BACK_MEDIA.luxuryHome,
          },
        ]}
      />

      <BackApproach
        eyebrow={en ? "Our approach" : "Nossa abordagem"}
        title={
          en
            ? `Investing with Head Oversea — ${area}`
            : `Investindo com Head Oversea — ${area}`
        }
        body={intro}
        href={portfolioHref}
        cta={portfolioLabel}
        image={isRE ? BACK_MEDIA.canyon : midImage}
        imageAlt={`${area} — Head Oversea`}
        quote={closingQuote}
      />
    </BackShell>
  );
}
