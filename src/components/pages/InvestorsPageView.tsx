"use client";

import Image from "next/image";
import {
  BackLabel,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { BACK_MEDIA } from "@/lib/back-media";
import { cn } from "@/lib/utils";
import type { Locale, SiteContent } from "@/types/content";

interface InvestorsPageViewProps {
  content: SiteContent;
  locale?: Locale;
}

const COPY = {
  pt: {
    heroTitle: "Investidores",
    heroBody:
      "Exposição a private equity e real assets com um sócio operacional presente — deal flow qualificado, governança ativa e execução nos dois lados do Atlântico.",
    heroMediaAlt: "Presença institucional — Head Oversea",
    heroLine: "Presença. Disciplina. Horizonte longo.",
    whatEyebrow: "O que fazemos",
    whatTitle:
      "Capital paciente com ownership ativo. Não alocamos à distância — construímos valor ao lado da gestão, do primeiro trimestre ao evento de liquidez.",
    pillars: [
      {
        title: "Deal flow seletivo",
        body: "Originação própria no Brasil e nos Estados Unidos. Empresas e ativos com tese clara, modelo validado e espaço real de criação de valor.",
      },
      {
        title: "Alinhamento total",
        body: "Investimos ao lado da gestão. Governança presente, reporting disciplinado e incentivos alinhados ao horizonte longo.",
      },
      {
        title: "Execução nos dois mercados",
        body: "Presença operacional Brasil–EUA: insight e relações de confiança de um lado; estrutura, escala e disciplina do outro.",
      },
    ],
    edgeEyebrow: "Por que Head Oversea",
    edgeTitle: "Um parceiro local com padrão institucional.",
    edges: [
      {
        value: "+20",
        label: "Empresas apoiadas",
        body: "Portfólio atual e passado com active ownership.",
      },
      {
        value: "2",
        label: "Mercados",
        body: "Brasil e Estados Unidos — um corredor, uma firma.",
      },
      {
        value: "100%",
        label: "Foco em valor",
        body: "Sem produtos avulsos. Só parceria com horizonte longo.",
      },
      {
        value: "PE · RE",
        label: "Dois eixos",
        body: "Private equity e ativos reais sob a mesma disciplina.",
      },
    ],
    proofEyebrow: "O diferencial",
    proofTitle: "Capital sozinho não basta. Presença muda o resultado.",
    proofBody:
      "Family offices e investidores institucionais precisam de mais do que alocação: um operador no terreno, tese legível e governança que sustenta múltiplo no exit.",
    proofCta: "Conhecer nossa tese",
    compareLeftLabel: "Capital passivo",
    compareLeftValue: "Distância",
    compareLeftBody: "Cheque sem presença. Reporting esporádico. Pouca influência na operação.",
    compareRightLabel: "Ownership ativo",
    compareRightValue: "Presença",
    compareRightBody: "Board, operação e capital no mesmo ritmo — valor construído no ciclo.",
    compareDelta: "Método",
    compareDeltaNote: "O que separa narrativa de resultado.",
    resourcesEyebrow: "Recursos",
    resourcesTitle: "Para aprofundar a conversa.",
    resources: [
      {
        title: "Nossa tese de investimento",
        href: "/tese",
      },
      {
        title: "Private Equity — ownership ativo",
        href: "/private-equity",
      },
      {
        title: "Real Estate — ativos reais",
        href: "/real-estate",
      },
      {
        title: "Como atuamos",
        href: "/como-atuamos",
      },
      {
        title: "Portfólio",
        href: "/cases",
      },
    ],
    quote:
      "Investidor sério não compra narrativa. Compra disciplina de capital, governança presente e um time que está na sala quando a decisão pesa.",
    quoteName: "Lucas Policarpo",
    quoteRole: "CFO & Founder",
    contactEyebrow: "Próximo passo",
    contactTitle: "Uma conversa de qualificação — sem pressa, com critério.",
    contactCta: "Falar com relações institucionais",
  },
  en: {
    heroTitle: "Investors",
    heroBody:
      "Exposure to private equity and real assets with a present operating partner — qualified deal flow, active governance, and execution on both sides of the Atlantic.",
    heroMediaAlt: "Institutional presence — Head Oversea",
    heroLine: "Presence. Discipline. Long horizon.",
    whatEyebrow: "What we do",
    whatTitle:
      "Patient capital with active ownership. We do not allocate from afar — we build value alongside management, from the first quarter to the liquidity event.",
    pillars: [
      {
        title: "Selective deal flow",
        body: "Proprietary origination in Brazil and the United States. Companies and assets with a clear thesis, validated model, and real room to create value.",
      },
      {
        title: "Total alignment",
        body: "We invest alongside management. Present governance, disciplined reporting, and incentives aligned to a long horizon.",
      },
      {
        title: "Execution in both markets",
        body: "Brazil–U.S. operating presence: insight and relationships of trust on one side; structure, scale, and discipline on the other.",
      },
    ],
    edgeEyebrow: "Why Head Oversea",
    edgeTitle: "A local partner with an institutional standard.",
    edges: [
      {
        value: "+20",
        label: "Companies supported",
        body: "Current and prior portfolio with active ownership.",
      },
      {
        value: "2",
        label: "Markets",
        body: "Brazil and the United States — one corridor, one firm.",
      },
      {
        value: "100%",
        label: "Value focus",
        body: "No one-off products. Only partnership with a long horizon.",
      },
      {
        value: "PE · RE",
        label: "Two axes",
        body: "Private equity and real assets under the same discipline.",
      },
    ],
    proofEyebrow: "The edge",
    proofTitle: "Capital alone is not enough. Presence changes the outcome.",
    proofBody:
      "Family offices and institutional investors need more than allocation: an operator on the ground, a legible thesis, and governance that sustains multiples at exit.",
    proofCta: "Explore our thesis",
    compareLeftLabel: "Passive capital",
    compareLeftValue: "Distance",
    compareLeftBody: "A check without presence. Sporadic reporting. Little influence on operations.",
    compareRightLabel: "Active ownership",
    compareRightValue: "Presence",
    compareRightBody: "Board, operations, and capital in the same rhythm — value built through the cycle.",
    compareDelta: "Method",
    compareDeltaNote: "What separates narrative from results.",
    resourcesEyebrow: "Resources",
    resourcesTitle: "To deepen the conversation.",
    resources: [
      {
        title: "Our investment thesis",
        href: "/en/thesis",
      },
      {
        title: "Private Equity — active ownership",
        href: "/en/private-equity",
      },
      {
        title: "Real Estate — real assets",
        href: "/en/real-estate",
      },
      {
        title: "How we work",
        href: "/en/how-we-work",
      },
      {
        title: "Portfolio",
        href: "/en/cases",
      },
    ],
    quote:
      "Serious investors do not buy narrative. They buy capital discipline, present governance, and a team in the room when the decision weighs.",
    quoteName: "Lucas Policarpo",
    quoteRole: "CFO & Founder",
    contactEyebrow: "Next step",
    contactTitle: "A qualification conversation — without haste, with criteria.",
    contactCta: "Speak with institutional relations",
  },
} as const;

/** For Investors — institutional pitch (print rhythm, HO identity). */
export function InvestorsPageView({
  content,
  locale = "pt",
}: InvestorsPageViewProps) {
  const t = COPY[locale];
  const en = locale === "en";
  const contactHref = en ? "/en/contact" : "/contato";
  const thesisHref = en ? "/en/thesis" : "/tese";

  return (
    <BackShell content={content} locale={locale} headerSurface="dark">
      {/* Hero — title | intro, then media band */}
      <section className="bg-black text-white">
        <div className="page-shell pt-[calc(72px+clamp(2.5rem,6vw,4rem))] pb-[clamp(2.5rem,5vw,3.5rem)] md:pt-[calc(5rem+clamp(2.5rem,6vw,4rem))]">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal variant="rise" className="lg:col-span-5">
              <h1 className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.02em]">
                {t.heroTitle}
              </h1>
            </Reveal>
            <Reveal delay={0.1} variant="fadeUp" className="lg:col-span-6 lg:col-start-7">
              <p className="body-editorial max-w-[42ch] text-white/55">
                {t.heroBody}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal variant="fadeScale" delay={0.08}>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111] sm:aspect-[2.4/1] lg:aspect-[21/9]">
            <LazyVideo
              className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
              src="/videos/investidores.mp4?v=buildings"
              poster="/images/investidores-poster.jpg?v=buildings"
              eager
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.1) 40%, rgba(5,5,5,0.45) 78%, rgba(5,5,5,0.78) 100%)",
              }}
            />
            <div className="page-shell absolute inset-x-0 bottom-0 z-10 pb-[clamp(1.5rem,4vw,2.75rem)]">
              <Reveal delay={0.16} variant="fadeUp">
                <p className="font-display max-w-[22ch] text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.15] text-white">
                  {t.heroLine}
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </section>

      {/* What we do — statement + 3 pillars */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(3rem,7vw,5.5rem)]">
          <Reveal variant="rise">
            <BackLabel>{t.whatEyebrow}</BackLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <h2 className="font-display mt-8 max-w-[28ch] text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.12]">
              {t.whatTitle}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 border-t border-black/[0.08] pt-12 md:mt-16 md:grid-cols-3 md:gap-12 md:pt-14">
            {t.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.08 + i * 0.06} variant="rise">
                <span
                  className="mb-5 block h-px w-10 bg-black/20"
                  aria-hidden
                />
                <h3 className="font-display text-[1.35rem] leading-snug md:text-[1.45rem]">
                  {pillar.title}
                </h3>
                <p className="body-editorial mt-4 text-[15px] text-black/55">
                  {pillar.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Edge stats — eye-catching */}
      <section className="border-t border-white/[0.08] bg-black text-white">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="max-w-2xl">
            <Reveal variant="rise">
              <BackLabel tone="light">{t.edgeEyebrow}</BackLabel>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <h2 className="font-display mt-7 text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12]">
                {t.edgeTitle}
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {t.edges.map((edge, i) => (
              <Reveal
                key={edge.label}
                delay={0.06 + i * 0.05}
                variant="rise"
                className={cn(
                  i > 0 && "lg:border-l lg:border-white/[0.1] lg:pl-8",
                )}
              >
                <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-[-0.03em]">
                  {edge.value}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-white/40">
                  {edge.label}
                </p>
                <p className="mt-3 max-w-[22ch] text-[13px] leading-relaxed text-white/45">
                  {edge.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof — compare + CTA */}
      <section className="border-t border-black/[0.06] bg-[var(--off-white)] text-black">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal variant="rise">
                <BackLabel>{t.proofEyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-7 max-w-[16ch] text-[clamp(1.85rem,3.2vw,2.65rem)] leading-[1.12]">
                  {t.proofTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.12} variant="fadeUp">
                <p className="body-editorial mt-6 max-w-[40ch] text-black/55">
                  {t.proofBody}
                </p>
              </Reveal>
              <Reveal delay={0.18} className="mt-10">
                <MeridianLink href={thesisHref}>{t.proofCta}</MeridianLink>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:pt-[calc(0.875rem+1.75rem)]">
              <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
                <Reveal delay={0.1} variant="fadeUp">
                  <div className="flex h-full flex-col border border-black/[0.1] bg-white p-7 md:p-8">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-black/40">
                      {t.compareLeftLabel}
                    </p>
                    <p className="font-display mt-6 text-[clamp(1.75rem,3vw,2.25rem)] leading-none text-black/35">
                      {t.compareLeftValue}
                    </p>
                    <p className="mt-5 text-[14px] leading-relaxed text-black/50">
                      {t.compareLeftBody}
                    </p>
                  </div>
                </Reveal>

                <Reveal
                  delay={0.14}
                  variant="fadeUp"
                  className="flex flex-col items-center justify-center py-2 sm:px-2"
                >
                  <span className="font-display text-[1.1rem] tracking-tight text-black">
                    {t.compareDelta}
                  </span>
                  <span className="mt-1 max-w-[10ch] text-center text-[11px] leading-snug text-black/40">
                    {t.compareDeltaNote}
                  </span>
                </Reveal>

                <Reveal delay={0.18} variant="fadeUp">
                  <div className="flex h-full flex-col border border-black bg-black p-7 text-white md:p-8">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {t.compareRightLabel}
                    </p>
                    <p className="font-display mt-6 text-[clamp(1.75rem,3vw,2.25rem)] leading-none">
                      {t.compareRightValue}
                    </p>
                    <p className="mt-5 text-[14px] leading-relaxed text-white/55">
                      {t.compareRightBody}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources list */}
      <section className="border-t border-white/[0.08] bg-black text-white">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <Reveal variant="rise">
            <BackLabel tone="light">{t.resourcesEyebrow}</BackLabel>
          </Reveal>
          <Reveal delay={0.06} variant="rise">
            <h2 className="font-display mt-7 max-w-[18ch] text-[clamp(1.85rem,3.2vw,2.65rem)] leading-[1.12]">
              {t.resourcesTitle}
            </h2>
          </Reveal>

          <div className="mt-12 border-t border-white/[0.1]">
            {t.resources.map((item, i) => (
              <Reveal key={item.href} delay={0.04 + i * 0.04} variant="fadeUp">
                <div className="border-b border-white/[0.1]">
                  <div className="flex items-center justify-between gap-6 py-6 md:py-7">
                    <p className="font-display text-[clamp(1.15rem,2vw,1.45rem)] leading-snug">
                      {item.title}
                    </p>
                    <MeridianLink href={item.href} tone="light">
                      {en ? "Open" : "Abrir"}
                    </MeridianLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote — full shell width like ref, photo right */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
            <div className="order-2 flex min-w-0 flex-1 flex-col justify-between gap-10 lg:order-1 lg:min-h-[22rem]">
              <Reveal variant="rise">
                <p className="text-[clamp(1.65rem,3.2vw,2.65rem)] font-normal leading-[1.22] tracking-[-0.02em] text-black">
                  {`“${t.quote}”`}
                </p>
              </Reveal>
              <Reveal delay={0.16} variant="fadeUp">
                <p className="text-[15px] font-medium tracking-[-0.01em] text-black">
                  {t.quoteName}
                </p>
                <p className="mt-1 text-[13px] tracking-[0.02em] text-black/50">
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
                  src={BACK_MEDIA.lucas}
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

      {/* Close CTA */}
      <section className="border-t border-white/[0.08] bg-black text-white">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal variant="rise">
                <BackLabel tone="light">{t.contactEyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-6 max-w-[20ch] text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12]">
                  {t.contactTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.14} className="lg:col-span-4 lg:col-start-9">
              <MeridianLink href={contactHref} tone="light">
                {t.contactCta}
              </MeridianLink>
            </Reveal>
          </div>
        </div>
      </section>
    </BackShell>
  );
}
