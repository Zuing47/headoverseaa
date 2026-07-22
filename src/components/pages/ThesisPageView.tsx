"use client";

import Image from "next/image";
import {
  BackLabel,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { BACK_MEDIA } from "@/lib/back-media";
import { cn } from "@/lib/utils";
import type { Locale, SiteContent } from "@/types/content";

interface ThesisPageViewProps {
  content: SiteContent;
  locale?: Locale;
}

const LEVER_ICON_PATHS = [
  "M4 18V10M10 18V6M16 18v-8M22 18V8",
  "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7ZM12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22",
  "M9 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm7 1a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM3.5 18c.8-3 2.8-4.5 5.5-4.5S14 15 14.5 18M13 18c.4-2 1.8-3.2 3.5-3.2 1.6 0 2.8 1 3.2 3.2",
  "M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17ZM12 7.5V12l3 2",
  "M4 17l5-5 4 3 7-8M15 7h5v5",
] as const;

function LeverIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7 text-[var(--gold)]"
      aria-hidden
    >
      <path d={LEVER_ICON_PATHS[index]} />
    </svg>
  );
}

const COPY = {
  pt: {
    heroEyebrow: "Nossa tese",
    heroTitle: "Construindo valor duradouro\nem mercados privados.",
    heroBody:
      "Acreditamos em apoiar empresas e ativos com capital, estratégia e presença — para construir valor que permanece.",
    heroCta: "Nossos princípios",
    convictionEyebrow: "Nossa convicção",
    convictionTitle: "Valor duradouro não é sorte. É método.",
    principles: [
      {
        n: "01",
        title: "Fundamentos sólidos",
        body: "Modelos validados, ativos reais e tese clara — a base antes de qualquer alocação.",
      },
      {
        n: "02",
        title: "Gestão excepcional",
        body: "Liderança alinhada, ownership ativo e presença na sala de decisão.",
      },
      {
        n: "03",
        title: "Disciplina financeira",
        body: "Capital paciente, critério de alocação e governança sem atalhos.",
      },
      {
        n: "04",
        title: "Visão de longo prazo",
        body: "Horizonte longo — valor construído ao longo do ciclo, não na narrativa de curto prazo.",
      },
    ],
    marketsEyebrow: "Dois mercados. Um propósito.",
    marketsTitle:
      "Conectamos oportunidades no Brasil com capacidade de execução nos EUA.",
    brazilLabel: "Brasil",
    brazilBody: "Insight, originação e relações de confiança.",
    usLabel: "Estados Unidos",
    usBody: "Execução, estrutura e escala institucional.",
    marketsCta: "Saiba mais sobre nossa abordagem",
    valueEyebrow: "Como geramos valor",
    valueTitle:
      "Atuamos lado a lado para transformar empresas e ativos em líderes de seus setores.",
    valueCta: "Nossas alavancas",
    levers: [
      {
        title: "Estratégia",
        body: "Clareza de tese, posicionamento e prioridades de crescimento.",
      },
      {
        title: "Operações",
        body: "Disciplina no dia a dia — eficiência, processo e execução.",
      },
      {
        title: "Governança",
        body: "Board presente, alinhamento de incentivos e reporting.",
      },
      {
        title: "Capital",
        body: "Estrutura financeira adequada ao ciclo e ao risco.",
      },
      {
        title: "Pessoas",
        body: "Liderança e times preparados para o próximo capítulo.",
      },
    ],
    impactEyebrow: "Nosso impacto",
    impactTitle: "Parcerias que geram resultados reais.",
    stats: [
      { value: "+20", label: "Empresas apoiadas" },
      { value: "+30", label: "Operações realizadas" },
      { value: "3", label: "Setores principais" },
      { value: "100%", label: "Foco em criação de valor" },
    ],
    commitEyebrow: "Nosso compromisso",
    commitTitle:
      "Estratégia e capital alinhados — com presença onde as decisões acontecem.",
    quote:
      "Nossa filosofia é simples: construir negócios excepcionais, cultivar pessoas excepcionais e criar valor que perdura.",
    quoteName: "Douglas Bubna",
    quoteRole: "CEO & Founder",
    contactEyebrow: "Vamos conversar",
    contactTitle:
      "Interessado em construir o próximo caso de sucesso conosco?",
    contactCta: "Entre em contato",
  },
  en: {
    heroEyebrow: "Our Thesis",
    heroTitle: "Building enduring value in private markets.",
    heroBody:
      "We believe in supporting companies and assets with capital, strategy, and presence — to build value that endures.",
    heroCta: "Our principles",
    convictionEyebrow: "Our conviction",
    convictionTitle: "Enduring value is not luck. It is method.",
    principles: [
      {
        n: "01",
        title: "Solid foundations",
        body: "Validated models, real assets, and a clear thesis — the base before any allocation.",
      },
      {
        n: "02",
        title: "Exceptional management",
        body: "Aligned leadership, active ownership, and presence in the decision room.",
      },
      {
        n: "03",
        title: "Financial discipline",
        body: "Patient capital, allocation criteria, and governance without shortcuts.",
      },
      {
        n: "04",
        title: "Long‑term vision",
        body: "A long horizon — value built through the cycle, not short-term narrative.",
      },
    ],
    marketsEyebrow: "Two markets. One purpose.",
    marketsTitle:
      "We connect opportunities in Brazil with execution capacity in the U.S.",
    brazilLabel: "Brazil",
    brazilBody: "Insight, origination, and relationships of trust.",
    usLabel: "United States",
    usBody: "Execution, structure, and institutional scale.",
    marketsCta: "Learn more about our approach",
    valueEyebrow: "How we create value",
    valueTitle:
      "We work side by side to turn companies and assets into leaders in their sectors.",
    valueCta: "Our levers",
    levers: [
      {
        title: "Strategy",
        body: "Clear thesis, positioning, and growth priorities.",
      },
      {
        title: "Operations",
        body: "Day-to-day discipline — efficiency, process, and execution.",
      },
      {
        title: "Governance",
        body: "Present board, aligned incentives, and reporting.",
      },
      {
        title: "Capital",
        body: "Financial structure fit for the cycle and the risk.",
      },
      {
        title: "People",
        body: "Leadership and teams ready for the next chapter.",
      },
    ],
    impactEyebrow: "Our impact",
    impactTitle: "Partnerships that deliver real results.",
    stats: [
      { value: "+20", label: "Companies supported" },
      { value: "+30", label: "Operations completed" },
      { value: "3", label: "Core sectors" },
      { value: "100%", label: "Focus on value creation" },
    ],
    commitEyebrow: "Our commitment",
    commitTitle:
      "Strategy and capital aligned — with presence where decisions are made.",
    quote:
      "Our philosophy is simple: build exceptional businesses, cultivate exceptional people, and create value that endures.",
    quoteName: "Douglas Bubna",
    quoteRole: "CEO & Founder",
    contactEyebrow: "Let's talk",
    contactTitle: "Interested in building the next success story with us?",
    contactCta: "Contact us",
  },
} as const;

/** Our Thesis — institutional print layout (HO palette). */
export function ThesisPageView({
  content,
  locale = "pt",
}: ThesisPageViewProps) {
  const t = COPY[locale];
  const en = locale === "en";
  const approachHref = en ? "/en/how-we-work" : "/como-atuamos";
  const contactHref = en ? "/en/contact" : "/contato";

  return (
    <BackShell content={content} locale={locale}>
      {/* Hero — thesis1 full-bleed */}
      <section
        className="relative min-h-[min(88vh,820px)] overflow-hidden bg-black text-white"
        style={{ color: "#ffffff", colorScheme: "dark" }}
      >
        <div className="absolute inset-0">
          <Image
            src={BACK_MEDIA.thesisHero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />
          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.4) 35%, rgba(5,5,5,0.88) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            aria-hidden
            style={{
              background:
                "linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.72) 38%, rgba(5,5,5,0.28) 68%, rgba(5,5,5,0.45) 100%)",
            }}
          />
        </div>

        <div className="page-shell relative z-10 flex min-h-[min(88vh,820px)] flex-col justify-end pb-[clamp(3.5rem,8vw,5.5rem)] pt-[calc(5rem+clamp(2rem,6vw,4rem))]">
          <div className="max-w-[36rem]">
            <Reveal variant="rise">
              <p className="label-caps text-[var(--gold)]">{t.heroEyebrow}</p>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <h1
                className="font-display mt-6 whitespace-pre-line text-[clamp(2rem,5.5vw,3.85rem)] leading-[1.08] text-white md:mt-7 md:text-[clamp(2.35rem,4.8vw,3.85rem)]"
                style={{ color: "#ffffff" }}
              >
                {t.heroTitle}
              </h1>
            </Reveal>
            <span
              className="mt-8 block h-px w-14 bg-[var(--gold)]"
              aria-hidden
            />
            <Reveal delay={0.14} variant="fadeUp">
              <p
                className="body-editorial mt-8 max-w-[40ch] text-white/65"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {t.heroBody}
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <a
                href="#principios"
                className="group inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--gold)] transition-opacity hover:opacity-70"
              >
                {t.heroCta}
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Nossa convicção — 4 principles */}
      <section
        id="principios"
        className="scroll-mt-24 border-t border-black/[0.06] bg-white text-black"
      >
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Reveal variant="rise">
                <p className="label-caps text-[var(--gold)]">
                  {t.convictionEyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-6 max-w-[14ch] text-[clamp(1.65rem,2.8vw,2.25rem)] leading-[1.15]">
                  {t.convictionTitle}
                </h2>
              </Reveal>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-black/[0.1]">
              {t.principles.map((item, i) => (
                <Reveal
                  key={item.n}
                  delay={0.06 + i * 0.05}
                  variant="rise"
                  className="lg:px-6 xl:px-8"
                >
                  <p className="text-[12px] font-medium tracking-[0.14em] text-[var(--gold)]">
                    {item.n}
                  </p>
                  <h3 className="font-display mt-4 text-[1.2rem] leading-snug md:text-[1.3rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-black/50">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dois mercados — thesis2 | copy */}
      <section
        className="border-t border-white/[0.08] bg-black text-white"
        style={{ color: "#ffffff", colorScheme: "dark" }}
      >
        <div className="grid lg:grid-cols-2">
          <Reveal variant="fadeScale" className="relative min-h-[320px] lg:min-h-[560px]">
            <ImageReveal className="absolute inset-0" immediate={false}>
              <Image
                src={BACK_MEDIA.thesisMarkets}
                alt=""
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover object-center grayscale"
                quality={90}
              />
            </ImageReveal>
          </Reveal>

          <div className="flex flex-col justify-center px-[var(--page-padding-mobile)] py-[clamp(3rem,7vw,5rem)] md:px-[var(--page-padding-tablet)] lg:px-[var(--page-padding-desktop)]">
            <Reveal variant="rise">
              <p className="label-caps text-[var(--gold)]">{t.marketsEyebrow}</p>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <h2
                className="font-display mt-7 max-w-[22ch] text-[clamp(1.75rem,3.2vw,2.55rem)] leading-[1.12] text-white"
                style={{ color: "#ffffff" }}
              >
                {t.marketsTitle}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <Reveal delay={0.12} variant="fadeUp">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
                  {t.brazilLabel}
                </p>
                <p
                  className="mt-3 max-w-[28ch] text-[14px] leading-relaxed text-white/55"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {t.brazilBody}
                </p>
              </Reveal>
              <Reveal delay={0.16} variant="fadeUp">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
                  {t.usLabel}
                </p>
                <p
                  className="mt-3 max-w-[28ch] text-[14px] leading-relaxed text-white/55"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {t.usBody}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="mt-12">
              <MeridianLink href={approachHref} tone="light">
                {t.marketsCta}
              </MeridianLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Como geramos valor — 5 levers */}
      <section
        id="alavancas"
        className="scroll-mt-24 border-t border-black/[0.06] bg-[var(--off-white)] text-black"
      >
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal variant="rise">
                <BackLabel>{t.valueEyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-7 max-w-[18ch] text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.12]">
                  {t.valueTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.14} className="mt-10">
                <MeridianLink href="#alavancas">{t.valueCta}</MeridianLink>
              </Reveal>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-5 lg:gap-6 lg:border-l lg:border-black/[0.08] lg:pl-10">
              {t.levers.map((lever, i) => (
                <Reveal
                  key={lever.title}
                  delay={0.06 + i * 0.04}
                  variant="rise"
                  className={cn(
                    i > 0 && "lg:border-l lg:border-black/[0.08] lg:pl-5",
                  )}
                >
                  <LeverIcon index={i} />
                  <h3 className="font-display mt-5 text-[1.15rem] leading-snug">
                    {lever.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-black/50">
                    {lever.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nosso impacto */}
      <section
        className="border-t border-white/[0.08] bg-black text-white"
        style={{ color: "#ffffff", colorScheme: "dark" }}
      >
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal variant="rise">
                <p className="label-caps text-[var(--gold)]">{t.impactEyebrow}</p>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2
                  className="font-display mt-6 max-w-[16ch] text-[clamp(1.65rem,2.8vw,2.25rem)] leading-[1.15] text-white"
                  style={{ color: "#ffffff" }}
                >
                  {t.impactTitle}
                </h2>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8">
              {t.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.08 + i * 0.05} variant="rise">
                  <p
                    className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-[-0.03em] text-white"
                    style={{ color: "#ffffff" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-3 max-w-[14ch] text-[11px] uppercase tracking-[0.14em] text-white/40"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment title — light band */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(2.75rem,6vw,4.5rem)] pb-[clamp(2rem,4vw,3rem)]">
          <Reveal variant="rise">
            <BackLabel>{t.commitEyebrow}</BackLabel>
          </Reveal>
          <Reveal delay={0.06} variant="rise">
            <h2 className="font-display mt-7 max-w-[22ch] text-[clamp(1.65rem,2.8vw,2.35rem)] leading-[1.15] text-black">
              {t.commitTitle}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Quote + portrait — full shell width like ref, photo right */}
      <section
        className="border-t border-white/[0.08] bg-black text-white"
        style={{ color: "#ffffff", colorScheme: "dark" }}
      >
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
            <div className="order-2 flex min-w-0 flex-1 flex-col justify-between gap-10 lg:order-1 lg:min-h-[22rem]">
              <Reveal delay={0.1} variant="rise">
                <p className="text-[clamp(1.65rem,3.2vw,2.65rem)] font-normal leading-[1.22] tracking-[-0.02em] text-white">
                  {`“${t.quote}”`}
                </p>
              </Reveal>
              <Reveal delay={0.18} variant="fadeUp">
                <p className="text-[15px] font-medium tracking-[-0.01em] text-white">
                  {t.quoteName}
                </p>
                <p className="mt-1 text-[13px] tracking-[0.02em] text-white/50">
                  {t.quoteRole}
                </p>
              </Reveal>
            </div>

            <div className="order-1 w-full max-w-[20rem] shrink-0 sm:max-w-[22rem] lg:order-2 lg:w-[22rem] lg:max-w-none xl:w-[24rem]">
              <ImageReveal
                delay={0.2}
                className="relative aspect-[4/5] w-full overflow-hidden bg-[#111]"
              >
                <Image
                  src="/images/douglas3.jpg"
                  alt={`${t.quoteName} — ${t.quoteRole}, Head Oversea`}
                  fill
                  sizes="(max-width: 1024px) 352px, 384px"
                  className="object-cover object-[50%_18%]"
                  quality={95}
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Close CTA — light after dark quote */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal variant="rise">
                <p className="label-caps text-black/45">
                  {t.contactEyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-6 max-w-[20ch] text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12] text-black">
                  {t.contactTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.14} className="lg:col-span-4 lg:col-start-9">
              <MeridianLink href={contactHref} tone="dark">
                {t.contactCta}
              </MeridianLink>
            </Reveal>
          </div>
        </div>
      </section>
    </BackShell>
  );
}
