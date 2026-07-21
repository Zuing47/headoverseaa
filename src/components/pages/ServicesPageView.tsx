"use client";

import {
  BackApproach,
  BackBand,
  BackHero,
  BackShell,
  BackSplit,
  BackTrackGrid,
} from "@/components/back";
import { TextReveal } from "@/components/pages/TextReveal";
import { BACK_MEDIA } from "@/lib/back-media";
import type { Locale, SiteContent } from "@/types/content";

interface ServicesPageViewProps {
  content: SiteContent;
  locale?: Locale;
}

const PILLAR_MEDIA = [
  BACK_MEDIA.laserStore,
  BACK_MEDIA.usFlag,
  BACK_MEDIA.marketsFlag,
] as const;

export function ServicesPageView({
  content,
  locale = "pt",
}: ServicesPageViewProps) {
  const { pillars } = content;
  const en = locale === "en";

  return (
    <BackShell content={content} locale={locale}>
      <BackHero
        eyebrow={pillars.eyebrow}
        title={pillars.title}
        subtitle={
          en
            ? "Active governance, hands-on execution, and strategic presence in the United States."
            : "Governança ativa, execução hands-on e presença estratégica nos Estados Unidos."
        }
        image={BACK_MEDIA.handshake}
        imageAlt={
          en
            ? "Partnership and transaction"
            : "Parceria e transação"
        }
      />

      <BackBand tone="white">
        <div className="divide-y divide-black/[0.08] border-t border-black/[0.08]">
          {pillars.items.map((pillar, index) => (
            <TextReveal key={pillar.id} delay={index * 0.05}>
              <div
                id={pillar.id}
                className="grid scroll-mt-28 gap-8 py-14 md:grid-cols-12 md:gap-10 md:py-20"
              >
                <div className="md:col-span-4">
                  <span className="label-caps text-black/35">
                    0{index + 1}
                  </span>
                  <h2 className="font-display mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-snug">
                    {pillar.title}
                  </h2>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="body-editorial text-black/55">
                    {pillar.description}
                  </p>
                  <ul className="mt-8 space-y-4 border-t border-black/[0.08] pt-8">
                    {pillar.highlights.map((h) => (
                      <li
                        key={h}
                        className="body-editorial flex gap-4 text-black/65"
                      >
                        <span
                          className="mt-2.5 h-px w-6 shrink-0 bg-black/25"
                          aria-hidden
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TextReveal>
          ))}
        </div>
      </BackBand>

      <BackTrackGrid
        eyebrow={en ? "Capabilities" : "Capacidades"}
        title={
          en
            ? "Three fronts. One ownership thesis."
            : "Três frentes. Uma tese de ownership."
        }
        items={pillars.items.slice(0, 3).map((p, i) => ({
          title: p.title,
          href: `#${p.id}`,
          image: PILLAR_MEDIA[i] ?? BACK_MEDIA.laserStore,
          caption: p.description.slice(0, 90) + "…",
        }))}
      />

      <BackSplit
        media="left"
        eyebrow={en ? "United States" : "Estados Unidos"}
        title={
          en
            ? "Strategic presence where capital scales."
            : "Presença estratégica onde o capital escala."
        }
        body={
          en
            ? "Structure, compliance, and relationships in the U.S. — with origination and trust rooted in Brazil."
            : "Estrutura, compliance e relacionamentos nos EUA — com originação e confiança enraizadas no Brasil."
        }
        href={en ? "/en/private-equity" : "/private-equity"}
        cta={en ? "Explore Private Equity" : "Explorar Private Equity"}
        image={BACK_MEDIA.nycGlass}
        imageAlt={en ? "U.S. towers" : "Torres nos EUA"}
      />

      <BackApproach
        title={
          en
            ? "Investing with Head Oversea"
            : "Investindo com a Head Oversea"
        }
        body={
          en
            ? "Active ownership across private equity and real estate."
            : "Ownership ativo em private equity e real estate."
        }
        href={en ? "/en/cases" : "/cases"}
        cta={en ? "View portfolio" : "Ver portfólio"}
        image={BACK_MEDIA.marketsBr}
        imageAlt="Head Oversea"
        quote={
          en
            ? "Services are not the product. Ownership is."
            : "Serviços não são o produto. Ownership é."
        }
      />
    </BackShell>
  );
}
