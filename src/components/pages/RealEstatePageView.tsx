"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BackBand,
  BackLabel,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { ValueFaq } from "@/components/pages/ValueFaq";
import { ReScaleBand } from "@/components/pages/ReScaleBand";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { BACK_MEDIA } from "@/lib/back-media";
import { getReFaq } from "@/lib/content/re-learn";
import type { Locale, SiteContent } from "@/types/content";

interface RealEstatePageViewProps {
  content: SiteContent;
  locale?: Locale;
}

const COPY = {
  pt: {
    area: "Real Estate",
    headline: "Ativos reais.\nPerspectiva de longo prazo.",
    intro:
      "Investimos em ativos imobiliários com disciplina estratégica, capital paciente e visão de longo prazo — entre o Brasil e os Estados Unidos.",
    videoEyebrow: "Presença",
    videoTitle: "Ativos que atravessam ciclos — e mercados.",
    videoBody:
      "Do drone à operação: acompanhamos o ativo com a mesma disciplina de ownership que define a firma.",
    strategyEyebrow: "Estratégia",
    strategyTitle: "Três frentes. Um critério: valor durável.",
    strategyBody:
      "Não operamos fórmulas genéricas de mercado. Cada alocação combina originação seletiva, gestão presente e leitura Brasil–EUA — com horizonte longo o suficiente para o ativo trabalhar.",
    pillars: [
      {
        title: "Originação seletiva",
        body: "Priorizamos ativos com localização, uso e tese claras — onde o risco é legível e o upside vem de execução, não de narrativa.",
      },
      {
        title: "Gestão presente",
        body: "Entramos além do capital: acompanhamos operação, disciplina financeira e decisões que preservam e constroem valor ao longo do ciclo.",
      },
      {
        title: "Corredor Brasil–EUA",
        body: "Presença nos dois mercados para estruturar, alocar e acompanhar — com visão local e padrão institucional.",
      },
    ],
    examplesEyebrow: "No portfólio",
    examplesTitle: "Geromel e Superbloom na plataforma.",
    examplesView: "Ver case",
    examples: [
      {
        id: "geromel",
        title: "Geromel Construction",
        caption:
          "Construção e real assets com disciplina operacional e horizonte longo.",
        href: "/cases/geromel",
        logo: "/images/logos-empresas/geromel-trim.png",
      },
      {
        id: "superbloom",
        title: "Superbloom Real Estate",
        caption:
          "Plataforma imobiliária estruturada para capital com clareza institucional.",
        href: "/cases/superbloom",
        logo: "/images/logos-empresas/superbloom-wordmark.png",
      },
    ],
    portfolioCta: "Ver portfólio completo",
    portfolioHref: "/cases",
    learnEyebrow: "Ler mais",
    learnTitle: "Real estate: disciplina e horizonte longo entre dois mercados",
    learnBody:
      "Como a tese de ativos reais da Head Oversea equilibra capital paciente no Brasil e nos Estados Unidos — e o que isso muda na forma de investir.",
    learnCta: "Abrir artigo",
    learnHref: "/insights/real-estate-dois-mercados",
    phrase:
      "O ciclo passa. O ativo bem escolhido — e bem governado — permanece.",
    phraseMark: "Brasil — USA",
    faqEyebrow: "FAQ",
    faqTitle: "Perguntas sobre Real Estate.",
    closeEyebrow: "Próximo passo",
    closeTitle: "Pronto para explorar oportunidades em real assets.",
    closeCta: "Falar conosco",
    closeHref: "/contato",
  },
  en: {
    area: "Real Estate",
    headline: "Real assets.\nLong‑term perspective.",
    intro:
      "We invest in real estate assets with strategic discipline, patient capital, and a long‑term view — across Brazil and the United States.",
    videoEyebrow: "Presence",
    videoTitle: "Assets that outlast cycles — and borders.",
    videoBody:
      "From aerial view to operations: we stay with the asset under the same ownership discipline that defines the firm.",
    strategyEyebrow: "Strategy",
    strategyTitle: "Three fronts. One standard: durable value.",
    strategyBody:
      "We do not run generic market formulas. Every allocation combines selective origination, present stewardship, and a Brazil–U.S. reading — with a horizon long enough for the asset to work.",
    pillars: [
      {
        title: "Selective origination",
        body: "We prioritize assets with clear location, use, and thesis — where risk is legible and upside comes from execution, not narrative.",
      },
      {
        title: "Present stewardship",
        body: "We go beyond capital: we stay close to operations, financial discipline, and decisions that preserve and build value through the cycle.",
      },
      {
        title: "Brazil–U.S. corridor",
        body: "Presence in both markets to structure, allocate, and oversee — with local fluency and an institutional standard.",
      },
    ],
    examplesEyebrow: "In the portfolio",
    examplesTitle: "Geromel and Superbloom on the platform.",
    examplesView: "View case",
    examples: [
      {
        id: "geromel",
        title: "Geromel Construction",
        caption:
          "Construction and real assets with operational discipline and a long horizon.",
        href: "/en/cases/geromel",
        logo: "/images/logos-empresas/geromel-trim.png",
      },
      {
        id: "superbloom",
        title: "Superbloom Real Estate",
        caption:
          "A real estate platform structured for capital with institutional clarity.",
        href: "/en/cases/superbloom",
        logo: "/images/logos-empresas/superbloom-wordmark.png",
      },
    ],
    portfolioCta: "View full portfolio",
    portfolioHref: "/en/cases",
    learnEyebrow: "Read more",
    learnTitle: "Real estate: discipline and a long horizon across two markets",
    learnBody:
      "How Head Oversea’s real-asset thesis balances patient capital in Brazil and the United States — and what that changes in how we invest.",
    learnCta: "Open article",
    learnHref: "/en/insights/real-estate-two-markets",
    phrase:
      "Cycles pass. A well-chosen — and well-governed — asset remains.",
    phraseMark: "Brazil — USA",
    faqEyebrow: "FAQ",
    faqTitle: "Questions about Real Estate.",
    closeEyebrow: "Next step",
    closeTitle: "Ready to explore opportunities in real assets.",
    closeCta: "Contact us",
    closeHref: "/en/contact",
  },
} as const;

/** Real Estate — logos, video gradient, article CTA, black FAQ, SEO-ready copy. */
export function RealEstatePageView({
  content,
  locale = "pt",
}: RealEstatePageViewProps) {
  const t = COPY[locale];
  const faq = getReFaq(locale);

  return (
    <BackShell content={content} locale={locale}>
      {/* Hero — aerial video + Real Estate headline on the right */}
      <section className="relative min-h-[min(72vh,680px)] overflow-hidden bg-black text-white">
        <LazyVideo
          className="absolute inset-0 h-full w-full object-cover object-center lg:w-[68%]"
          src={BACK_MEDIA.videoRealEstate}
          poster={BACK_MEDIA.house}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
          aria-hidden
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 42%, rgba(0,0,0,0.88) 68%, #050505 82%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.88) 100%)",
          }}
        />
        <div className="page-shell relative z-10 flex min-h-[min(72vh,680px)] items-end py-12 pb-16 lg:items-center lg:justify-end lg:py-20">
          <div className="w-full max-w-[40ch] lg:w-[min(100%,420px)]">
            <Reveal variant="rise">
              <BackLabel tone="light">{t.area}</BackLabel>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <h1 className="font-display mt-5 whitespace-pre-line text-[clamp(1.95rem,5.5vw,3.25rem)] leading-[1.1] text-white md:mt-6 md:text-[clamp(2.1rem,4vw,3.25rem)]">
                {t.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.14} variant="fadeUp">
              <p
                className="body-editorial mt-5 text-white/70"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {t.intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scale — editorial figures with count-up (HO layout, not BX twin) */}
      <ReScaleBand locale={locale} />

      {/* Strategy — dark for contrast after navy scale */}
      <BackBand tone="black">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal variant="rise">
              <BackLabel tone="light">{t.strategyEyebrow}</BackLabel>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <h2 className="font-display mt-7 max-w-[22ch] text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.1]">
                {t.strategyTitle}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} variant="fadeUp" className="lg:col-span-5">
            <p className="body-editorial max-w-[42ch] text-white/55">
              {t.strategyBody}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/[0.08] pt-12 md:mt-16 md:grid-cols-3 md:gap-8 md:pt-14">
          {t.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.08 + i * 0.06} variant="rise">
              <h3 className="font-display text-[clamp(1.25rem,2vw,1.55rem)] leading-snug">
                {pillar.title}
              </h3>
              <p className="body-editorial mt-4 text-white/50">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </BackBand>

      {/* Logos — light band */}
      <BackBand tone="white">
        {/* Logos — list */}
        <div>
          <Reveal variant="rise">
            <BackLabel>{t.examplesEyebrow}</BackLabel>
          </Reveal>

          <div className="mt-10 border-t border-black/[0.1] md:mt-12">
            {t.examples.map((item, i) => (
              <Reveal key={item.id} delay={0.1 + i * 0.08} variant="fadeUp">
                <Link
                  href={item.href}
                  className="group grid grid-cols-1 items-center gap-6 border-b border-black/[0.1] py-8 transition-colors hover:bg-black/[0.015] sm:grid-cols-[12rem_1fr_auto] sm:gap-10 sm:py-9 md:gap-14"
                >
                  <div className="flex h-12 w-full items-center justify-start">
                    <Image
                      src={item.logo}
                      alt={item.title}
                      width={480}
                      height={110}
                      className="h-10 w-auto max-h-10 max-w-full object-contain object-left transition-opacity duration-500 group-hover:opacity-70"
                      quality={95}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="max-w-[42ch] text-[13px] leading-relaxed text-black/45 md:text-[14px]">
                      {item.caption}
                    </p>
                  </div>

                  <span className="hidden items-center gap-3 text-[11px] font-medium uppercase tracking-[0.16em] text-black/40 transition-colors group-hover:text-[var(--gold)] sm:inline-flex">
                    {t.examplesView}
                    <span
                      className="flex h-8 w-8 items-center justify-center"
                      aria-hidden
                    >
                      <span className="relative block h-[2px] w-5 bg-current">
                        <span className="absolute right-0 top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-[var(--gold)]" />
                        <span className="absolute left-0 top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-current opacity-35" />
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24} className="mt-10">
            <MeridianLink href={t.portfolioHref}>{t.portfolioCta}</MeridianLink>
          </Reveal>
        </div>
      </BackBand>

      {/* Read more — opens RE article page */}
      <section className="border-t border-white/[0.08] bg-black text-white">
        <div className="page-shell py-[clamp(2.75rem,6vw,4.75rem)]">
          <Reveal variant="rise">
            <BackLabel tone="light">{t.learnEyebrow}</BackLabel>
          </Reveal>

          <div className="mt-10 grid items-center gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-14">
            <Reveal delay={0.08} variant="fadeUp" className="lg:col-span-6">
              <ImageReveal className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                <Image
                  src="/images/philadelphia-skyline-us-real-estate.jpg"
                  alt={t.learnTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  quality={90}
                />
              </ImageReveal>
            </Reveal>
            <Reveal
              delay={0.12}
              variant="rise"
              className="lg:col-span-5 lg:col-start-8"
            >
              <h2 className="font-display max-w-[18ch] text-[clamp(1.85rem,3.2vw,2.55rem)] leading-[1.12]">
                {t.learnTitle}
              </h2>
              <p className="body-editorial mt-6 max-w-[38ch] text-white/55">
                {t.learnBody}
              </p>
              <div className="mt-10">
                <MeridianLink href={t.learnHref} tone="light">
                  {t.learnCta}
                </MeridianLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Discrete phrase */}
      <section className="border-t border-black/[0.06] bg-[var(--off-white)] text-black">
        <div className="page-shell py-[clamp(2.5rem,5vw,3.75rem)]">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <Reveal variant="fadeUp">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
                {t.phraseMark}
              </p>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <p className="mt-5 font-display text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.45] text-black/70">
                {t.phrase}
              </p>
            </Reveal>
            <span className="mt-8 h-px w-12 bg-black/15" aria-hidden />
          </div>
        </div>
      </section>

      {/* FAQ black */}
      <ValueFaq
        tone="black"
        eyebrow={t.faqEyebrow}
        title={t.faqTitle}
        items={faq}
      />

      {/* Soft close */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(2.75rem,6vw,4.5rem)]">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal variant="rise">
                <BackLabel>{t.closeEyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-6 max-w-[18ch] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.12]">
                  {t.closeTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.14} className="lg:col-span-4 lg:col-start-9">
              <MeridianLink href={t.closeHref}>
                {t.closeCta}
              </MeridianLink>
            </Reveal>
          </div>
        </div>
      </section>
    </BackShell>
  );
}
