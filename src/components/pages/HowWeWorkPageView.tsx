"use client";

import Image from "next/image";
import {
  BackBand,
  BackLabel,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { ValueFaq } from "@/components/pages/ValueFaq";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { BACK_MEDIA } from "@/lib/back-media";
import type { Locale, SiteContent } from "@/types/content";

const COPY = {
  pt: {
    heroTitle: "Valor se constrói.\nNão se encontra.",
    heroBody:
      "Não investimos apenas capital. Trabalhamos ao lado da liderança para transformar empresas e ativos em negócios mais fortes, eficientes e preparados para o futuro.",

    frontsEyebrow: "Três frentes",
    frontsTitle: "Assumimos a empresa por onde o valor realmente se move.",
    frontsIntro:
      "Não vendemos serviços avulsos. Entramos como sócios e trabalhamos operação, governança e capital em paralelo — do primeiro trimestre ao evento de liquidez.",
    fronts: [
      {
        n: "01",
        title: "Operacional",
        body: "Entramos na operação lado a lado com a liderança para destravar eficiência, margem e disciplina de execução. Toda empresa em portfólio opera com metas e reporting mensal desde o primeiro trimestre.",
      },
      {
        n: "02",
        title: "Governança",
        body: "Instalamos board formal, controles e estrutura societária que tornam a empresa investível. Governança não é burocracia — é o que sustenta valuation em uma venda ou captação.",
      },
      {
        n: "03",
        title: "Capital & expansão",
        body: "Estruturamos capital e conduzimos a expansão internacional, com base nos Estados Unidos, até o evento de liquidez. Presença real nos dois mercados — não representação de papel.",
      },
    ],

    processEyebrow: "Como entramos",
    processTitle: "Um ciclo claro — sem pitch genérico.",
    processBody:
      "Cada parceria começa com contexto e termina preparada para liquidez. O ritmo é o mesmo; o desenho muda com a tese da empresa.",
    process: [
      {
        n: "01",
        title: "Qualificação",
        body: "Conversa aberta sobre tese, momento e aderência. Sem compromisso — e sem deck genérico.",
      },
      {
        n: "02",
        title: "Diagnóstico",
        body: "Leitura profunda de operação, governança e potencial internacional antes de qualquer proposta.",
      },
      {
        n: "03",
        title: "Entrada",
        body: "Posição societária, papéis no board e prioridades do primeiro trimestre alinhadas com a liderança.",
      },
      {
        n: "04",
        title: "Ciclo ativo",
        body: "Execução mensal: metas, reporting, capital e expansão. Ownership dentro da empresa, não acompanhamento de longe.",
      },
      {
        n: "05",
        title: "Liquidez",
        body: "Empresa preparada para venda, captação ou novo investidor — com números, governança e posicionamento investíveis.",
      },
    ],

    introEyebrow: "O essencial",
    introTitle: "O que muda quando entramos.",
    pillars: [
      {
        n: "01",
        title: "Ownership ativo",
        body: "Assumimos posição na empresa e trabalhamos dentro dela — operação, board e capital — em vez de acompanhar de longe.",
      },
      {
        n: "02",
        title: "Dois mercados",
        body: "Presença real no Brasil e nos Estados Unidos. Expansão com estrutura local, não com representação de papel.",
      },
      {
        n: "03",
        title: "Horizonte longo",
        body: "Construímos até o evento de liquidez. Disciplina mensal, compounding e decisões alinhadas ao próximo capítulo.",
      },
    ],

    cadenceEyebrow: "Ritmo operacional",
    cadenceTitle: "O que instalamos no primeiro ciclo.",
    cadenceBody:
      "Ownership ativo exige presença. Medimos o esforço pela qualidade da execução dentro da empresa — não pelo número de decks apresentados.",
    cadence: [
      {
        title: "Reporting mensal",
        body: "Metas claras, números auditáveis e rotina de acompanhamento com a liderança.",
      },
      {
        title: "Board & controles",
        body: "Governança formal que torna a empresa legível para sócios, bancos e compradores.",
      },
      {
        title: "Prioridades de margem",
        body: "Foco nas alavancas que movem resultado no curto prazo sem sacrificar o horizonte de liquidez.",
      },
      {
        title: "Agenda de capital",
        body: "Estrutura societária e financiamento alinhados ao ciclo — não capital solto sem tese.",
      },
    ],

    leversEyebrow: "Alavancas",
    leversTitle: "Como criamos valor na prática.",
    leversSubtitle: "Seis frentes com potencial de mover retorno e resiliência.",
    levers: [
      {
        title: "Eficiência operacional",
        body: "Processos, margem e disciplina de execução lado a lado com a gestão.",
      },
      {
        title: "Board & controles",
        body: "Governança que torna a empresa investível e preparada para liquidez.",
      },
      {
        title: "Capital estruturado",
        body: "Financiamento e estrutura societária alinhados ao ciclo de crescimento.",
      },
      {
        title: "Expansão internacional",
        body: "Entrada nos EUA com presença real — não apenas abertura de CNPJ.",
      },
      {
        title: "Liderança & talentos",
        body: "Fortalecimento do time para o próximo nível de escala.",
      },
      {
        title: "Posicionamento de marca",
        body: "Clareza de oferta e diferenciação nos mercados em que atuamos.",
      },
    ],

    caseEyebrow: "Case em destaque",
    caseTitle: "Riolaser — do potencial à referência no mercado americano.",
    caseHighlightsTitle: "Destaques da tese",
    caseHighlights: [
      "Clínica de estética a laser nos EUA com modelo validado",
      "Entrada na liderança e board desde o primeiro trimestre",
      "Presença operacional real no mercado americano",
    ],
    caseActionTitle: "Valor em ação",
    caseActions: [
      "Governança formal e reporting mensal",
      "Disciplina operacional e metas claras",
      "Consolidação de marca no mercado local",
    ],
    caseCta: "Ler o case",

    closeEyebrow: "Antes de alocar",
    closeTitle: "Parceria exige alinhamento — não pressa.",
    closeBody:
      "Cada conversa começa com contexto: tese, momento da empresa e o que precisamos construir juntos. Sem pitch genérico.",
    closeCta: "Vamos conversar",
    closeHref: "/contato",
  },
  en: {
    heroTitle: "Value is built.\nNot found.",
    heroBody:
      "We don't just invest capital. We work alongside leadership to turn companies and assets into stronger, more efficient businesses — built for what's next.",

    frontsEyebrow: "Three fronts",
    frontsTitle: "We take the company where value actually moves.",
    frontsIntro:
      "We don't sell standalone services. We enter as partners and work operations, governance, and capital in parallel — from the first quarter to the liquidity event.",
    fronts: [
      {
        n: "01",
        title: "Operations",
        body: "We join the operating room alongside leadership to unlock efficiency, margin, and execution discipline. Every portfolio company runs with targets and monthly reporting from day one.",
      },
      {
        n: "02",
        title: "Governance",
        body: "We install a formal board, controls, and ownership structure that make the company investable. Governance is not bureaucracy — it is what holds valuation in a sale or raise.",
      },
      {
        n: "03",
        title: "Capital & expansion",
        body: "We structure capital and lead international expansion from a U.S. base through the liquidity event. Real presence in both markets — not a paper representation.",
      },
    ],

    processEyebrow: "How we enter",
    processTitle: "A clear cycle — no generic pitch.",
    processBody:
      "Every partnership starts with context and ends ready for liquidity. The rhythm stays the same; the design shifts with each company's thesis.",
    process: [
      {
        n: "01",
        title: "Qualification",
        body: "An open conversation on thesis, timing, and fit. No commitment — and no generic deck.",
      },
      {
        n: "02",
        title: "Diagnosis",
        body: "A deep read of operations, governance, and international potential before any partnership proposal.",
      },
      {
        n: "03",
        title: "Entry",
        body: "Ownership position, board roles, and first-quarter priorities aligned with leadership.",
      },
      {
        n: "04",
        title: "Active cycle",
        body: "Monthly execution: targets, reporting, capital, and expansion. Ownership inside the company — not remote monitoring.",
      },
      {
        n: "05",
        title: "Liquidity",
        body: "A company prepared for sale, a raise, or a new investor — with numbers, governance, and positioning that read as investable.",
      },
    ],

    introEyebrow: "The essentials",
    introTitle: "What changes when we enter.",
    pillars: [
      {
        n: "01",
        title: "Active ownership",
        body: "We take a position in the company and work inside it — operations, board, and capital — instead of watching from afar.",
      },
      {
        n: "02",
        title: "Two markets",
        body: "Real presence in Brazil and the United States. Expansion with local structure, not a paper representation.",
      },
      {
        n: "03",
        title: "Long horizon",
        body: "We build through the liquidity event. Monthly discipline, compounding, and decisions aligned to the next chapter.",
      },
    ],

    cadenceEyebrow: "Operating cadence",
    cadenceTitle: "What we install in the first cycle.",
    cadenceBody:
      "Active ownership demands presence. We measure effort by the quality of execution inside the company — not by the number of decks presented.",
    cadence: [
      {
        title: "Monthly reporting",
        body: "Clear targets, auditable numbers, and a cadence with leadership.",
      },
      {
        title: "Board & controls",
        body: "Formal governance that makes the company readable to partners, lenders, and buyers.",
      },
      {
        title: "Margin priorities",
        body: "Focus on the levers that move near-term results without sacrificing the liquidity horizon.",
      },
      {
        title: "Capital agenda",
        body: "Ownership structure and financing aligned to the cycle — not capital without a thesis.",
      },
    ],

    leversEyebrow: "Levers",
    leversTitle: "How we create value in practice.",
    leversSubtitle: "Six fronts with potential to move returns and resilience.",
    levers: [
      {
        title: "Operating efficiency",
        body: "Process, margin, and execution discipline alongside management.",
      },
      {
        title: "Board & controls",
        body: "Governance that makes the company investable and ready for liquidity.",
      },
      {
        title: "Structured capital",
        body: "Financing and ownership structure aligned to the growth cycle.",
      },
      {
        title: "International expansion",
        body: "U.S. entry with real presence — not just a paperwork entity.",
      },
      {
        title: "Leadership & talent",
        body: "Strengthening the team for the next stage of scale.",
      },
      {
        title: "Brand positioning",
        body: "Clear offer and differentiation in the markets we operate in.",
      },
    ],

    caseEyebrow: "Featured case",
    caseTitle: "Riolaser — from potential to a U.S. market reference.",
    caseHighlightsTitle: "Investment highlights",
    caseHighlights: [
      "U.S. laser aesthetics clinic with a validated model",
      "Leadership and board entry from the first quarter",
      "Real operating presence in the American market",
    ],
    caseActionTitle: "Value creation in action",
    caseActions: [
      "Formal governance and monthly reporting",
      "Operating discipline and clear targets",
      "Brand consolidation in the local market",
    ],
    caseCta: "Read the case",

    closeEyebrow: "Before allocating",
    closeTitle: "Partnership needs alignment — not haste.",
    closeBody:
      "Every conversation starts with context: thesis, company moment, and what we need to build together. No generic pitch.",
    closeCta: "Let's talk",
    closeHref: "/en/contact",
  },
} as const;

interface HowWeWorkPageViewProps {
  content: SiteContent;
  locale?: Locale;
}

export function HowWeWorkPageView({
  content,
  locale = "pt",
}: HowWeWorkPageViewProps) {
  const t = COPY[locale];
  const en = locale === "en";
  const caseHref = en ? "/en/cases/riolaser" : "/cases/riolaser";

  return (
    <BackShell content={content} locale={locale}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[min(78vh,720px)] overflow-hidden bg-black text-white">
        <Image
          src={BACK_MEDIA.valueHero}
          alt={
            en
              ? "New York skyline — Head Oversea value creation"
              : "Skyline de Nova York — criação de valor Head Oversea"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={92}
        />
        <div
          className="absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.78) 100%)",
          }}
        />
        <div className="page-shell relative z-10 flex min-h-[min(78vh,720px)] flex-col items-center justify-center py-24 text-center md:py-28">
          <Reveal variant="rise">
            <BackLabel tone="light" className="justify-center">
              {content.valueCreation.eyebrow}
            </BackLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <h1 className="font-display mt-6 max-w-[18ch] whitespace-pre-line text-[clamp(2.85rem,6.5vw,5rem)] font-light leading-[1.02]">
              {t.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.16} variant="fadeUp">
            <p className="body-editorial mx-auto mt-6 max-w-[44ch] text-white/65">
              {t.heroBody}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Three fronts ─────────────────────────────────────── */}
      <BackBand tone="white">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal variant="rise" className="lg:col-span-5">
            <BackLabel>{t.frontsEyebrow}</BackLabel>
            <h2 className="font-display mt-7 max-w-[16ch] text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.12]">
              {t.frontsTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1} variant="fadeUp" className="lg:col-span-6 lg:col-start-7">
            <p className="body-editorial max-w-[42ch] text-black/55">{t.frontsIntro}</p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col divide-y divide-black/[0.1] md:mt-16">
          {t.fronts.map((front, i) => (
            <Reveal
              key={front.n}
              delay={0.06 + i * 0.06}
              variant="fadeUp"
              className="grid gap-4 py-10 first:pt-2 last:pb-0 md:grid-cols-12 md:gap-10 md:py-12"
            >
              <p className="font-mono text-[12px] tracking-wider text-black/35 md:col-span-1">
                {front.n}
              </p>
              <h3 className="font-display text-[clamp(1.45rem,2.4vw,1.95rem)] leading-snug md:col-span-4">
                {front.title}
              </h3>
              <p className="max-w-[48ch] text-[15px] leading-relaxed text-black/55 md:col-span-7">
                {front.body}
              </p>
            </Reveal>
          ))}
        </div>
      </BackBand>

      {/* ── Process ──────────────────────────────────────────── */}
      <BackBand tone="black">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal variant="rise" className="lg:col-span-5">
            <BackLabel tone="light">{t.processEyebrow}</BackLabel>
            <h2 className="font-display mt-7 max-w-[14ch] text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.12]">
              {t.processTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1} variant="fadeUp" className="lg:col-span-6 lg:col-start-7">
            <p className="body-editorial max-w-[42ch] text-white/55">{t.processBody}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-5 lg:gap-8">
          {t.process.map((step, i) => (
            <Reveal key={step.n} delay={0.06 + i * 0.05} variant="rise">
              <p className="font-mono text-[12px] tracking-wider text-white/30">
                {step.n}
              </p>
              <h3 className="font-display mt-4 text-[1.25rem] leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/50">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </BackBand>

      {/* ── Essentials over US flag video ────────────────────── */}
      <section className="relative min-h-[min(80vh,780px)] overflow-hidden bg-black text-white">
        <LazyVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={BACK_MEDIA.videoEua}
          poster={BACK_MEDIA.usFlagPresence}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.78) 100%)",
          }}
        />
        <div className="page-shell relative z-10 flex min-h-[min(80vh,780px)] flex-col justify-center py-16 md:py-20">
          <Reveal variant="rise">
            <BackLabel tone="light">{t.introEyebrow}</BackLabel>
          </Reveal>
          <Reveal delay={0.06} variant="rise">
            <h2 className="font-display mt-6 max-w-[20ch] text-[clamp(2.15rem,4.2vw,3.4rem)] leading-[1.08]">
              {t.introTitle}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-8">
            {t.pillars.map((p, i) => (
              <Reveal key={p.n} delay={0.1 + i * 0.08} variant="rise">
                <p className="font-display text-[clamp(2.75rem,5vw,4rem)] leading-none tracking-[-0.04em] text-white/25">
                  {p.n}
                </p>
                <h3 className="font-display mt-5 text-[1.55rem] leading-snug text-white">
                  {p.title}
                </h3>
                <p className="body-editorial mt-3 text-white/60">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Operating cadence ────────────────────────────────── */}
      <BackBand tone="white">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal variant="rise" className="lg:col-span-5">
            <BackLabel>{t.cadenceEyebrow}</BackLabel>
            <h2 className="font-display mt-7 max-w-[14ch] text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12]">
              {t.cadenceTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1} variant="fadeUp" className="lg:col-span-6 lg:col-start-7">
            <p className="body-editorial max-w-[40ch] text-black/55">{t.cadenceBody}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-16">
          {t.cadence.map((item, i) => (
            <Reveal key={item.title} delay={0.06 + i * 0.05} variant="rise">
              <div className="border-t border-black/[0.12] pt-8">
                <h3 className="font-display text-[1.35rem] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-black/50">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </BackBand>

      {/* ── Value levers ─────────────────────────────────────── */}
      <BackBand tone="black">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal variant="rise" className="lg:col-span-6">
            <BackLabel tone="light">{t.leversEyebrow}</BackLabel>
            <h2 className="font-display mt-7 max-w-[16ch] text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.12]">
              {t.leversTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.08} variant="fadeUp" className="lg:col-span-5 lg:col-start-8">
            <p className="body-editorial text-white/55">{t.leversSubtitle}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {t.levers.map((lever, i) => (
            <Reveal key={lever.title} delay={0.06 + i * 0.05} variant="rise">
              <h3 className="font-display text-[1.35rem] leading-snug">{lever.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/50">
                {lever.body}
              </p>
            </Reveal>
          ))}
        </div>
      </BackBand>

      {/* ── Featured case ────────────────────────────────────── */}
      <BackBand tone="white">
        <Reveal variant="rise">
          <BackLabel>{t.caseEyebrow}</BackLabel>
        </Reveal>
        <Reveal delay={0.06} variant="rise">
          <h2 className="font-display mt-8 max-w-[22ch] text-[clamp(1.85rem,3.6vw,3rem)] leading-[1.1] text-black">
            {t.caseTitle}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-14">
          <Reveal delay={0.08} variant="fadeUp" className="lg:col-span-5">
            <ImageReveal className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden bg-[#111] md:max-w-[360px] lg:mx-0">
              <Image
                src="/images/VMA_4616.jpg"
                alt="Rio Laser"
                fill
                sizes="360px"
                className="object-cover object-center"
                quality={92}
              />
            </ImageReveal>
          </Reveal>

          <Reveal delay={0.14} variant="fadeUp" className="lg:col-span-6 lg:col-start-7">
            <div>
              <h3 className="font-display text-[1.25rem] text-black">
                {t.caseHighlightsTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {t.caseHighlights.map((item) => (
                  <li
                    key={item}
                    className="border-t border-black/[0.1] pt-3 text-[14px] leading-relaxed text-black/55 first:border-t-0 first:pt-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <h3 className="font-display text-[1.25rem] text-black">
                {t.caseActionTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {t.caseActions.map((item) => (
                  <li
                    key={item}
                    className="border-t border-black/[0.1] pt-3 text-[14px] leading-relaxed text-black/55 first:border-t-0 first:pt-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <MeridianLink href={caseHref}>{t.caseCta}</MeridianLink>
            </div>
          </Reveal>
        </div>
      </BackBand>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <ValueFaq
        tone="black"
        eyebrow={content.faq.eyebrow}
        title={content.faq.title}
        items={content.faq.items}
      />

      {/* ── Close ────────────────────────────────────────────── */}
      <BackBand tone="white">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal variant="rise" className="lg:col-span-5">
            <BackLabel>{t.closeEyebrow}</BackLabel>
            <h2 className="font-display mt-7 max-w-[16ch] text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12]">
              {t.closeTitle}
            </h2>
          </Reveal>
          <Reveal
            delay={0.1}
            variant="fadeUp"
            className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7"
          >
            <p className="body-editorial max-w-[40ch] text-black/55">{t.closeBody}</p>
            <div>
              <MeridianLink href={t.closeHref}>{t.closeCta}</MeridianLink>
            </div>
          </Reveal>
        </div>
      </BackBand>
    </BackShell>
  );
}
