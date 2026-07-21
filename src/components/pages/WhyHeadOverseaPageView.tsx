"use client";

import {
  BackLabel,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { ValueFaq } from "@/components/pages/ValueFaq";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { BACK_MEDIA } from "@/lib/back-media";
import type { Locale, SiteContent } from "@/types/content";

const COPY = {
  pt: {
    eyebrow: "Por que Head Oversea",
    title: "Perspectiva global.\nInsight local.\nOwnership ativo.",
    intro:
      "Conectamos oportunidades no Brasil com capacidade de execução nos Estados Unidos para construir negócios mais fortes e ativos reais de valor duradouro.",
    diffEyebrow: "Nossa diferença",
    diffTitle: "Mais que capital. Parceria para gerar valor real.",
    differences: [
      {
        n: "01",
        title: "Experiência",
        body: "Anos de investimento, expansão internacional e construção de empresas com ownership ativo.",
      },
      {
        n: "02",
        title: "Rede global",
        body: "Relacionamentos de alto nível que abrem portas em diligência, distribuição e crescimento.",
      },
      {
        n: "03",
        title: "Execução",
        body: "Capacidade operacional real — presença no terreno onde as decisões acontecem.",
      },
      {
        n: "04",
        title: "Alinhamento",
        body: "Investimos ao lado da gestão. Capital paciente com governança presente.",
      },
    ],
    marketsEyebrow: "Dois mercados. Um propósito.",
    marketsTitle: "Insight no Brasil.\nExecução nos Estados Unidos.",
    marketsBody:
      "Uma ponte estratégica entre originação e confiança no Brasil e estrutura, disciplina e escala nos Estados Unidos.",
    brazilLabel: "Brasil",
    brazilCaption: "Insight, originação e relações de\u00A0confiança.",
    usLabel: "Estados Unidos",
    usCaption: "Execução, estrutura e escala\u00A0institucional.",
    principlesEyebrow: "Nossos princípios",
    principles: [
      {
        n: "01",
        title: "Integridade",
        body: "Clareza de tese, transparência de processo e compromisso com o que prometemos.",
      },
      {
        n: "02",
        title: "Disciplina",
        body: "Critério de alocação, governança e ritmo de decisão sem atalhos.",
      },
      {
        n: "03",
        title: "Foco de longo prazo",
        body: "Horizonte paciente — valor construído ao longo do ciclo, não na narrativa de curto prazo.",
      },
      {
        n: "04",
        title: "Excelência",
        body: "Padrão institucional em operação, reporting e presença nos dois mercados.",
      },
      {
        n: "05",
        title: "Impacto real",
        body: "Empresas e ativos mais fortes, relevantes e preparados para o próximo capítulo.",
      },
    ],
    leadershipEyebrow: "Liderança ativa",
    leadershipTitle: "Lideramos de perto.\nTransformamos de dentro.",
    leadershipBody:
      "Ownership ativo não é cheque à distância. É presença na decisão, disciplina operacional e parceria com a liderança até o evento de liquidez.",
    quote:
      "Nosso papel é ser mais que investidores: somos parceiros na construção de empresas mais fortes e relevantes.",
    quoteBy: "Douglas Bubna, CEO & Founder",
    cta: "Falar conosco",
    faqEyebrow: "FAQ",
    faqTitle: "Perguntas frequentes.",
    faq: [
      {
        question: "O que diferencia a Head Oversea?",
        answer:
          "Presença real Brasil–EUA, ownership ativo e execução operacional — não capital à distância nem consultoria pontual.",
      },
      {
        question: "Como funciona a presença nos dois mercados?",
        answer:
          "Originação e relações de confiança no Brasil; estrutura, disciplina e escala nos Estados Unidos, com a firma operando nos dois lados.",
      },
      {
        question: "Para quem é a conversa?",
        answer:
          "Fundadores, lideranças e investidores alinhados a horizonte longo, governança ativa e construção de valor em private equity e real estate.",
      },
      {
        question: "Como começar?",
        answer:
          "Por uma conversa de qualificação. Avaliamos tese, momento e aderência antes de qualquer proposta de parceria.",
      },
    ],
  },
  en: {
    eyebrow: "Why Head Oversea",
    title: "Global perspective.\nLocal insight.\nActive ownership.",
    intro:
      "We connect opportunities in Brazil with execution capacity in the United States to build stronger businesses and real assets of lasting value.",
    diffEyebrow: "Our difference",
    diffTitle: "More than capital. Partnership to create real value.",
    differences: [
      {
        n: "01",
        title: "Experience",
        body: "Years of investment, international expansion, and company building through active ownership.",
      },
      {
        n: "02",
        title: "Global network",
        body: "High-level relationships that open doors in diligence, distribution, and growth.",
      },
      {
        n: "03",
        title: "Execution",
        body: "Real operating capacity — presence on the ground where decisions are made.",
      },
      {
        n: "04",
        title: "Alignment",
        body: "We invest alongside management. Patient capital with present governance.",
      },
    ],
    marketsEyebrow: "Two markets. One purpose.",
    marketsTitle: "Brazil insight.\nUnited States execution.",
    marketsBody:
      "A strategic bridge between origination and trust in Brazil and structure, discipline, and scale in the United States.",
    brazilLabel: "Brazil",
    brazilCaption: "Insight, origination, and relationships of\u00A0trust.",
    usLabel: "United States",
    usCaption: "Execution, structure, and institutional\u00A0scale.",
    principlesEyebrow: "Our principles",
    principles: [
      {
        n: "01",
        title: "Integrity",
        body: "Clear thesis, transparent process, and commitment to what we promise.",
      },
      {
        n: "02",
        title: "Discipline",
        body: "Allocation criteria, governance, and decision rhythm without shortcuts.",
      },
      {
        n: "03",
        title: "Long‑term focus",
        body: "A patient horizon — value built through the cycle, not short-term narrative.",
      },
      {
        n: "04",
        title: "Excellence",
        body: "An institutional standard in operations, reporting, and presence in both markets.",
      },
      {
        n: "05",
        title: "Real impact",
        body: "Stronger, more relevant companies and assets prepared for the next chapter.",
      },
    ],
    leadershipEyebrow: "Active leadership",
    leadershipTitle: "We lead up close.\nWe transform from within.",
    leadershipBody:
      "Active ownership is not a check from afar. It is presence in decisions, operating discipline, and partnership with leadership through the liquidity event.",
    quote:
      "Our role is to be more than investors: we are partners in building stronger, more relevant companies.",
    quoteBy: "Douglas Bubna, CEO & Founder",
    cta: "Contact us",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions.",
    faq: [
      {
        question: "What sets Head Oversea apart?",
        answer:
          "Real Brazil–U.S. presence, active ownership, and operational execution — not distant capital or one-off consulting.",
      },
      {
        question: "How does presence in both markets work?",
        answer:
          "Origination and relationships of trust in Brazil; structure, discipline, and scale in the United States, with the firm operating on both sides.",
      },
      {
        question: "Who is the conversation for?",
        answer:
          "Founders, leaders, and investors aligned with a long horizon, active governance, and value building in private equity and real estate.",
      },
      {
        question: "How do we start?",
        answer:
          "With a qualification conversation. We assess thesis, timing, and fit before any partnership proposal.",
      },
    ],
  },
} as const;

interface WhyHeadOverseaPageViewProps {
  content: SiteContent;
  locale?: Locale;
}

/** Why Head Oversea — print layout, HO palette (black / white / gold). */
export function WhyHeadOverseaPageView({
  content,
  locale = "pt",
}: WhyHeadOverseaPageViewProps) {
  const t = COPY[locale];
  const en = locale === "en";
  const contactHref = en ? "/en/contact" : "/contato";

  return (
    <BackShell content={content} locale={locale} headerSurface="dark">
      {/* Hero — navy copy band; video beside on desktop, full band under on mobile */}
      <section
        className="relative overflow-hidden bg-[var(--navy)] text-white"
        style={{ color: "#ffffff", colorScheme: "dark" }}
      >
        <div className="page-shell relative z-10 pt-[calc(72px+clamp(3rem,8vw,5.5rem))] pb-[clamp(2.5rem,6vw,4rem)] md:pt-[calc(5rem+clamp(3.5rem,9vw,6rem))] lg:min-h-[min(78vh,700px)] lg:pb-[clamp(5rem,10vw,7.5rem)]">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="relative z-10 lg:col-span-5">
              <Reveal variant="rise">
                <BackLabel tone="light">{t.eyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h1
                  className="font-display mt-8 max-w-[14ch] whitespace-pre-line text-[clamp(2.35rem,4.5vw,3.75rem)] leading-[1.06] text-white"
                  style={{ color: "#ffffff" }}
                >
                  {t.title}
                </h1>
              </Reveal>
              <Reveal delay={0.14} variant="fadeUp">
                <p
                  className="body-editorial mt-7 max-w-[38ch] text-white/55"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {t.intro}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7" aria-hidden />
          </div>
        </div>

        {/* Desktop: video from the right with L→R soft mask into navy */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.75) 38%, #000 58%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.75) 38%, #000 58%)",
          }}
        >
          <LazyVideo
            className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
            src={BACK_MEDIA.videoWhyHead}
            aria-hidden
          />
        </div>

        {/* Mobile: real video band under copy (visible, not washed out) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--navy)] lg:hidden">
          <LazyVideo
            className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
            src={BACK_MEDIA.videoWhyHead}
            aria-hidden
          />
        </div>
      </section>

      {/* Nossa diferença — white, 4 pillars */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Reveal variant="rise">
                <BackLabel>{t.diffEyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-7 max-w-[16ch] text-[clamp(1.85rem,3.2vw,2.65rem)] leading-[1.12]">
                  {t.diffTitle}
                </h2>
              </Reveal>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:gap-x-10 lg:gap-y-12">
              {t.differences.map((item, i) => (
                <Reveal key={item.n} delay={0.08 + i * 0.05} variant="rise">
                  <p className="text-[12px] font-medium tracking-[0.14em] text-[var(--gold)]">
                    {item.n}
                  </p>
                  <h3 className="font-display mt-3 text-[1.35rem] leading-snug md:text-[1.5rem]">
                    {item.title}
                  </h3>
                  <p className="body-editorial mt-3 max-w-[32ch] text-[14px] text-black/50">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dois mercados — flag videos */}
      <section
        className="border-t border-white/[0.08] bg-black text-white"
        style={{ color: "#ffffff", colorScheme: "dark" }}
      >
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal variant="rise">
                <BackLabel tone="light">{t.marketsEyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2
                  className="font-display mt-7 max-w-[16ch] whitespace-pre-line text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.1] text-white"
                  style={{ color: "#ffffff" }}
                >
                  {t.marketsTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.12} variant="fadeUp">
                <p
                  className="body-editorial mt-6 max-w-[40ch] text-white/55"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {t.marketsBody}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
            <Reveal delay={0.1} variant="fadeUp">
              <figure className="relative aspect-[16/11] overflow-hidden bg-[#111]">
                <LazyVideo
                  className="absolute inset-0 h-full w-full object-cover"
                  src={BACK_MEDIA.videoBrazilFlag}
                  aria-hidden
                />
                <div
                  className="absolute inset-0"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
                    {t.brazilLabel}
                  </p>
                  <p className="mt-2 max-w-[34ch] text-[14px] leading-relaxed text-white/75">
                    {t.brazilCaption}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.16} variant="fadeUp">
              <figure className="relative aspect-[16/11] overflow-hidden bg-[#111]">
                <LazyVideo
                  className="absolute inset-0 h-full w-full object-cover"
                  src={BACK_MEDIA.videoUsaFlag}
                  aria-hidden
                />
                <div
                  className="absolute inset-0"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
                    {t.usLabel}
                  </p>
                  <p className="mt-2 max-w-[34ch] text-[14px] leading-relaxed text-white/75">
                    {t.usCaption}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Princípios — 5 columns */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <Reveal variant="rise">
            <BackLabel>{t.principlesEyebrow}</BackLabel>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 lg:gap-6">
            {t.principles.map((item, i) => (
              <Reveal key={item.n} delay={0.06 + i * 0.04} variant="rise">
                <span
                  className="mb-5 block h-px w-8 bg-[var(--gold)]"
                  aria-hidden
                />
                <p className="text-[11px] tracking-[0.14em] text-black/35">
                  {item.n}
                </p>
                <h3 className="font-display mt-3 text-[1.15rem] leading-snug md:text-[1.25rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-black/50">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Liderança ativa + quote */}
      <section
        className="border-t border-white/[0.08] bg-black text-white"
        style={{ color: "#ffffff", colorScheme: "dark" }}
      >
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal variant="rise">
                <BackLabel tone="light">{t.leadershipEyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2
                  className="font-display mt-7 max-w-[14ch] whitespace-pre-line text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.1] text-white"
                  style={{ color: "#ffffff" }}
                >
                  {t.leadershipTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.12} variant="fadeUp">
                <p
                  className="body-editorial mt-6 max-w-[40ch] text-white/55"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {t.leadershipBody}
                </p>
              </Reveal>
              <Reveal delay={0.18} className="mt-10">
                <MeridianLink href={contactHref} tone="light">
                  {t.cta}
                </MeridianLink>
              </Reveal>
            </div>

            <Reveal
              delay={0.14}
              variant="rise"
              className="lg:col-span-6 lg:col-start-7"
            >
              <blockquote className="border-t border-white/[0.1] pt-10">
                <span
                  className="font-display text-[3.5rem] leading-none text-[var(--gold)]"
                  aria-hidden
                >
                  “
                </span>
                <p
                  className="font-display mt-2 max-w-[28ch] text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.35] text-white/80"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {t.quote}
                </p>
                <footer className="mt-10 flex items-center gap-4">
                  <span
                    className="h-px w-10 bg-[var(--gold)]"
                    aria-hidden
                  />
                  <cite
                    className="not-italic text-[13px] tracking-[0.04em] text-white/50"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {t.quoteBy}
                  </cite>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <ValueFaq
        tone="white"
        eyebrow={t.faqEyebrow}
        title={t.faqTitle}
        items={[...t.faq]}
      />
    </BackShell>
  );
}
