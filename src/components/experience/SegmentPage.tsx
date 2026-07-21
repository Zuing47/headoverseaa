"use client";

import {
  BackApproach,
  BackBand,
  BackHero,
  BackLabel,
  BackShell,
  BackSplit,
  BackTrackGrid,
  BackVideoBand,
  MeridianLink,
} from "@/components/back";
import { TextReveal } from "@/components/pages/TextReveal";
import { BACK_MEDIA } from "@/lib/back-media";
import type { Locale, SegmentContent, SiteContent } from "@/types/content";

interface SegmentPageProps {
  content: SiteContent;
  locale?: Locale;
  segment: SegmentContent;
  image: string;
  contactHref: string;
}

/** Founders / Investors — estilo BACK. */
export function SegmentPage({
  content,
  locale = "pt",
  segment,
  image,
  contactHref,
}: SegmentPageProps) {
  const en = locale === "en";
  const isInvestors =
    segment.eyebrow.toLowerCase().includes("invest") ||
    segment.eyebrow.toLowerCase().includes("investor");

  return (
    <BackShell content={content} locale={locale}>
      <BackHero
        eyebrow={segment.eyebrow}
        title={segment.title}
        subtitle={segment.subtitle}
        image={isInvestors ? BACK_MEDIA.manhattanIce : BACK_MEDIA.nycGlass}
        imageAlt={
          isInvestors
            ? en
              ? "Lower Manhattan skyline"
              : "Skyline de Lower Manhattan"
            : en
              ? "Glass towers — U.S. market"
              : "Torres de vidro — mercado dos EUA"
        }
      />

      <BackBand tone="white">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <TextReveal>
              <BackLabel>{segment.painsTitle}</BackLabel>
            </TextReveal>
            <TextReveal delay={0.06}>
              <ul className="mt-10">
                {segment.pains.map((pain) => (
                  <li
                    key={pain}
                    className="border-t border-black/[0.08] py-5 last:border-b"
                  >
                    <p className="body-editorial flex gap-4 text-black/65">
                      <span
                        className="mt-2.5 h-px w-6 shrink-0 bg-black/25"
                        aria-hidden
                      />
                      {pain}
                    </p>
                  </li>
                ))}
              </ul>
            </TextReveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <TextReveal>
              <BackLabel>{segment.needsTitle}</BackLabel>
            </TextReveal>
            <TextReveal delay={0.08}>
              <p className="font-display mt-8 text-[clamp(1.5rem,2.5vw,2.1rem)] leading-snug">
                {segment.needs}
              </p>
            </TextReveal>
            <TextReveal delay={0.14} className="mt-12">
              <ul className="space-y-4 border-t border-black/[0.08] pt-8">
                {segment.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="text-[15px] leading-relaxed text-black/60"
                  >
                    {cap}
                  </li>
                ))}
              </ul>
            </TextReveal>
            <TextReveal delay={0.2} className="mt-12">
              <MeridianLink href={contactHref}>{segment.cta}</MeridianLink>
            </TextReveal>
          </div>
        </div>
      </BackBand>

      <BackSplit
        media="left"
        eyebrow={en ? "In practice" : "Na prática"}
        title={segment.subtitle}
        body={segment.needs}
        href={contactHref}
        cta={segment.cta}
        image={
          image ||
          (isInvestors ? BACK_MEDIA.philadelphia : BACK_MEDIA.drakkarShow)
        }
        imageAlt={segment.eyebrow}
      />

      <BackVideoBand
        eyebrow={en ? "Presence" : "Presença"}
        title={
          isInvestors
            ? en
              ? "Markets we underwrite — and show up in."
              : "Mercados que analisamos — e onde estamos presentes."
            : en
              ? "Operators in the room with founders."
              : "Operadores na sala com fundadores."
        }
        src={isInvestors ? BACK_MEDIA.videoFounder : BACK_MEDIA.videoPortraitB}
        poster={isInvestors ? BACK_MEDIA.sunsetPoster : BACK_MEDIA.expansion}
        variant={isInvestors ? "bleed" : "frame"}
      />

      <BackTrackGrid
        eyebrow={en ? "Explore" : "Explorar"}
        title={
          en
            ? "Go deeper into our thesis and platforms."
            : "Aprofunde na tese e nas plataformas."
        }
        items={
          isInvestors
            ? [
                {
                  title: "Private Equity",
                  href: en ? "/en/private-equity" : "/private-equity",
                  image: BACK_MEDIA.marketsUs,
                },
                {
                  title: "Real Estate",
                  href: en ? "/en/real-estate" : "/real-estate",
                  image: BACK_MEDIA.luxuryHome,
                },
                {
                  title: en ? "Why us" : "Por que nós",
                  href: en ? "/en/why-head-oversea" : "/por-que-head-oversea",
                  image: BACK_MEDIA.usPresence,
                },
              ]
            : [
                {
                  title: "Private Equity",
                  href: en ? "/en/private-equity" : "/private-equity",
                  image: BACK_MEDIA.laserStore,
                },
                {
                  title: en ? "Our approach" : "Como atuamos",
                  href: en ? "/en/services" : "/como-atuamos",
                  image: BACK_MEDIA.workspace,
                },
                {
                  title: en ? "Portfolio" : "Portfólio",
                  href: en ? "/en/cases" : "/cases",
                  image: BACK_MEDIA.riolaserUs,
                },
              ]
        }
      />

      <BackApproach
        title={
          en
            ? "Investing with Head Oversea"
            : "Investindo com a Head Oversea"
        }
        body={segment.subtitle}
        href={contactHref}
        cta={segment.cta}
        image={isInvestors ? BACK_MEDIA.euaMarkets : BACK_MEDIA.apexTrade}
        imageAlt="Head Oversea"
        quote={
          en
            ? "A qualified conversation is where partnership begins."
            : "Uma conversa qualificada é onde a parceria começa."
        }
      />
    </BackShell>
  );
}
