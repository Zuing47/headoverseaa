"use client";

import Image from "next/image";
import {
  BackLabel,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import {
  ImageReveal,
  MediaRise,
  ParallaxMedia,
} from "@/components/pages/ImageReveal";
import { MaskedText } from "@/components/motion/MaskedText";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { BACK_MEDIA } from "@/lib/back-media";
import type { Locale, SiteContent } from "@/types/content";

interface FoundersPageViewProps {
  content: SiteContent;
  locale?: Locale;
}

const COPY = {
  pt: {
    heroTitle: "Para fundadores",
    heroBody:
      "Um sócio que entra na operação — não apenas na planilha. Estruturamos governança, criamos valor e abrimos caminho para capital e expansão, sem que você perca o controle da visão.",
    heroLine: "Sócio operacional. Visão intacta.",
    painsEyebrow: "O que trava você hoje",
    painsTitle: "Crescimento sem estrutura vira risco.",
    pains: [
      {
        n: "01",
        title: "Governança incompleta",
        body: "Sem board, reporting e disciplina de decisão, o próximo salto de escala fica frágil — e o capital institucional se afasta.",
      },
      {
        n: "02",
        title: "Capital com custo de controle",
        body: "Rodadas e cheques que pedem mais do que participação: pedem a narrativa da empresa. Você quer crescimento sem abrir mão da visão.",
      },
      {
        n: "03",
        title: "Teto doméstico",
        body: "O modelo funciona no Brasil, mas falta ponte para execução, estrutura e escala nos Estados Unidos.",
      },
      {
        n: "04",
        title: "Exit sem preparo",
        body: "Quando chega a hora de vender ou captar, números, narrativa e governança ainda não estão investíveis.",
      },
    ],
    partnerEyebrow: "A parceria",
    partnerTitle:
      "Ownership ativo ao seu lado — do diagnóstico ao evento de liquidez.",
    partnerBody:
      "Não vendemos consultoria pontual. Assumimos posição, trabalhamos dentro da empresa e alinhamos incentivos ao horizonte longo.",
    steps: [
      {
        n: "01",
        title: "Qualificação",
        body: "Conversa franca sobre tese, momento e aderência. Sem compromisso.",
      },
      {
        n: "02",
        title: "Diagnóstico",
        body: "Operação, governança, números e potencial internacional sob critério.",
      },
      {
        n: "03",
        title: "Estrutura",
        body: "Governança, capital e prioridades de criação de valor — juntos.",
      },
      {
        n: "04",
        title: "Execução",
        body: "Presença na sala de decisão. Operamos o plano com a liderança.",
      },
      {
        n: "05",
        title: "Liquidez",
        body: "Empresa preparada para venda, captação ou próximo ciclo.",
      },
    ],
    tracksEyebrow: "Dois caminhos",
    tracksTitle: "Escolha o eixo que faz sentido para o seu negócio.",
    tracksBody:
      "Private equity para empresas. Real estate para ativos reais. A mesma disciplina de ownership — tese clara, execução presente.",
    peLabel: "Private Equity",
    peTitle: "Empresas com modelo validado.\nOwnership ativo.",
    peBody:
      "Entramos para profissionalizar, expandir e multiplicar valor — com presença operacional Brasil–EUA até o evento de liquidez.",
    peCta: "Explorar Private Equity",
    peHref: "/private-equity",
    reLabel: "Real Estate",
    reTitle: "Ativos reais.\nCapital paciente.",
    reBody:
      "Localização, uso e tese claras. Construímos valor em ativos com risco legível e upside de execução — não de narrativa.",
    reCta: "Explorar Real Estate",
    reHref: "/real-estate",
    bringEyebrow: "O que trazemos",
    bringTitle: "Mais do que capital. Capacidade de execução.",
    brings: [
      {
        title: "Governança",
        body: "Board presente, incentivos alinhados e reporting que sustenta múltiplo.",
      },
      {
        title: "Operação",
        body: "Disciplina no dia a dia — eficiência, processo e decisões no terreno.",
      },
      {
        title: "Capital",
        body: "Estrutura financeira adequada ao ciclo, sem atalhos de curto prazo.",
      },
      {
        title: "Expansão",
        body: "Ponte Brasil–EUA: originação, soft landing e escala institucional.",
      },
      {
        title: "Marca",
        body: "Posicionamento que abre portas em diligência, distribuição e exit.",
      },
      {
        title: "Horizonte",
        body: "Ciclo paciente orientado a liquidez — valor construído no tempo.",
      },
    ],
    fitEyebrow: "Para quem é",
    fitTitle: "Fundadores alinhados a parceria de verdade.",
    fits: [
      "Negócio com modelo validado e tração real — não ideia no papel.",
      "Disposição para governança ativa e transparência de números.",
      "Ambição de escala, captação ou venda com sócio operacional presente.",
      "Abertura para o corredor Brasil–Estados Unidos quando fizer sentido.",
    ],
    resourcesEyebrow: "Aprofunde",
    resourcesTitle: "Conteúdo para decidir com clareza.",
    resources: [
      { title: "Nossa tese", href: "/tese" },
      { title: "Como atuamos", href: "/como-atuamos" },
      { title: "Por que Head Oversea", href: "/por-que-head-oversea" },
      { title: "Portfólio", href: "/cases" },
    ],
    contactEyebrow: "Comece aqui",
    contactTitle: "Uma conversa de qualificação. Critério primeiro — proposta depois.",
    contactCta: "Falar com o time de originação",
    peCtaShort: "Private Equity",
    reCtaShort: "Real Estate",
  },
  en: {
    heroTitle: "For founders",
    heroBody:
      "A partner who enters the operation — not just the spreadsheet. We structure governance, create value, and open the path to capital and expansion, without you losing control of the vision.",
    heroLine: "Operating partner. Vision intact.",
    painsEyebrow: "What holds you back",
    painsTitle: "Growth without structure becomes risk.",
    pains: [
      {
        n: "01",
        title: "Incomplete governance",
        body: "Without a board, reporting, and decision discipline, the next scale jump is fragile — and institutional capital stays away.",
      },
      {
        n: "02",
        title: "Capital that costs control",
        body: "Rounds and checks that ask for more than equity: they ask for the company’s narrative. You want growth without giving up the vision.",
      },
      {
        n: "03",
        title: "Domestic ceiling",
        body: "The model works in Brazil, but the bridge to execution, structure, and scale in the United States is missing.",
      },
      {
        n: "04",
        title: "Exit without preparation",
        body: "When it is time to sell or raise, numbers, narrative, and governance are still not investable.",
      },
    ],
    partnerEyebrow: "The partnership",
    partnerTitle:
      "Active ownership beside you — from diagnosis to the liquidity event.",
    partnerBody:
      "We do not sell one-off consulting. We take a position, work inside the company, and align incentives to a long horizon.",
    steps: [
      {
        n: "01",
        title: "Qualification",
        body: "A frank conversation on thesis, timing, and fit. No strings attached.",
      },
      {
        n: "02",
        title: "Diagnosis",
        body: "Operations, governance, numbers, and international potential under criteria.",
      },
      {
        n: "03",
        title: "Structure",
        body: "Governance, capital, and value-creation priorities — together.",
      },
      {
        n: "04",
        title: "Execution",
        body: "Presence in the decision room. We run the plan with leadership.",
      },
      {
        n: "05",
        title: "Liquidity",
        body: "A company prepared for sale, a raise, or the next cycle.",
      },
    ],
    tracksEyebrow: "Two paths",
    tracksTitle: "Choose the axis that fits your business.",
    tracksBody:
      "Private equity for companies. Real estate for real assets. The same ownership discipline — clear thesis, present execution.",
    peLabel: "Private Equity",
    peTitle: "Companies with a validated model.\nActive ownership.",
    peBody:
      "We enter to professionalize, expand, and multiply value — with Brazil–U.S. operating presence through the liquidity event.",
    peCta: "Explore Private Equity",
    peHref: "/en/private-equity",
    reLabel: "Real Estate",
    reTitle: "Real assets.\nPatient capital.",
    reBody:
      "Clear location, use, and thesis. We build value in assets with legible risk and upside from execution — not narrative.",
    reCta: "Explore Real Estate",
    reHref: "/en/real-estate",
    bringEyebrow: "What we bring",
    bringTitle: "More than capital. Execution capacity.",
    brings: [
      {
        title: "Governance",
        body: "Present board, aligned incentives, and reporting that sustains multiples.",
      },
      {
        title: "Operations",
        body: "Day-to-day discipline — efficiency, process, and decisions on the ground.",
      },
      {
        title: "Capital",
        body: "Financial structure fit for the cycle, without short-term shortcuts.",
      },
      {
        title: "Expansion",
        body: "Brazil–U.S. bridge: origination, soft landing, and institutional scale.",
      },
      {
        title: "Brand",
        body: "Positioning that opens doors in diligence, distribution, and exit.",
      },
      {
        title: "Horizon",
        body: "A patient cycle oriented to liquidity — value built over time.",
      },
    ],
    fitEyebrow: "Who it is for",
    fitTitle: "Founders aligned with a real partnership.",
    fits: [
      "A business with a validated model and real traction — not an idea on paper.",
      "Willingness for active governance and number transparency.",
      "Ambition to scale, raise, or sell with a present operating partner.",
      "Openness to the Brazil–United States corridor when it makes sense.",
    ],
    resourcesEyebrow: "Go deeper",
    resourcesTitle: "Material to decide with clarity.",
    resources: [
      { title: "Our thesis", href: "/en/thesis" },
      { title: "How we work", href: "/en/how-we-work" },
      { title: "Why Head Oversea", href: "/en/why-head-oversea" },
      { title: "Portfolio", href: "/en/cases" },
    ],
    contactEyebrow: "Start here",
    contactTitle: "A qualification conversation. Criteria first — proposal later.",
    contactCta: "Speak with origination",
    peCtaShort: "Private Equity",
    reCtaShort: "Real Estate",
  },
} as const;

/** For Founders — institutional BACK layout, PE/RE CTAs, no closing quote. */
export function FoundersPageView({
  content,
  locale = "pt",
}: FoundersPageViewProps) {
  const t = COPY[locale];
  const en = locale === "en";
  const contactHref = en ? "/en/contact" : "/contato";

  return (
    <BackShell content={content} locale={locale} headerSurface="dark">
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="page-shell pt-[calc(72px+clamp(2.5rem,6vw,4rem))] pb-[clamp(2.5rem,5vw,3.5rem)] md:pt-[calc(5rem+clamp(2.5rem,6vw,4rem))]">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal variant="rise" className="lg:col-span-5">
              <h1 className="font-display text-[clamp(2.35rem,6.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-white md:text-[clamp(2.75rem,5.5vw,4.5rem)]">
                {t.heroTitle}
              </h1>
            </Reveal>
            <Reveal
              delay={0.1}
              variant="fadeUp"
              className="lg:col-span-6 lg:col-start-7"
            >
              <p className="body-editorial max-w-[42ch] text-white/55">
                {t.heroBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                <MeridianLink href={t.peHref} tone="light">
                  {t.peCtaShort}
                </MeridianLink>
                <MeridianLink href={t.reHref} tone="light">
                  {t.reCtaShort}
                </MeridianLink>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black sm:aspect-[2.4/1] lg:aspect-[21/9]">
          <MediaRise className="absolute inset-0" delay={0.06}>
            <ParallaxMedia strength={9}>
              <LazyVideo
                className="absolute inset-0 h-full w-full scale-100 object-cover object-center md:scale-[1.08]"
                src={BACK_MEDIA.videoContact}
                poster="/images/contact-poster.jpg"
                aria-hidden
              />
            </ParallaxMedia>
          </MediaRise>
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.25) 35%, rgba(5,5,5,0.45) 65%, rgba(5,5,5,0.82) 100%)",
            }}
          />
          <div className="page-shell absolute inset-x-0 bottom-0 z-10 pb-[clamp(1.5rem,4vw,2.75rem)]">
            <MaskedText
              as="p"
              className="font-display max-w-[20ch] text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.15] text-white"
            >
              {t.heroLine}
            </MaskedText>
          </div>
        </div>
      </section>

      {/* Pains */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(3rem,7vw,5.5rem)]">
          <Reveal variant="rise">
            <BackLabel>{t.painsEyebrow}</BackLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <MaskedText
              as="h2"
              className="font-display mt-7 max-w-[18ch] text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12]"
            >
              {t.painsTitle}
            </MaskedText>
          </Reveal>

          <div className="mt-14 grid gap-10 border-t border-black/[0.08] pt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-black/[0.08]">
            {t.pains.map((item, i) => (
              <Reveal
                key={item.n}
                delay={0.06 + i * 0.05}
                variant="rise"
                className="lg:px-6 xl:px-8 first:lg:pl-0 last:lg:pr-0"
              >
                <p className="text-[12px] font-medium tracking-[0.14em] text-black/35">
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
      </section>

      {/* Partnership journey */}
      <section className="border-t border-white/[0.08] bg-black text-white">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="max-w-3xl">
            <Reveal variant="rise">
              <BackLabel tone="light">{t.partnerEyebrow}</BackLabel>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <MaskedText
                as="h2"
                className="font-display mt-7 text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12]"
              >
                {t.partnerTitle}
              </MaskedText>
            </Reveal>
            <Reveal delay={0.12} variant="fadeUp">
              <p className="body-editorial mt-6 max-w-[48ch] text-white/50">
                {t.partnerBody}
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 border-t border-white/[0.1] pt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-6">
            {t.steps.map((step, i) => (
              <Reveal
                key={step.n}
                delay={0.08 + i * 0.07}
                variant={i % 2 === 0 ? "rise" : "fadeUp"}
              >
                <p className="text-[12px] tracking-[0.14em] text-white/35">
                  {step.n}
                </p>
                <h3 className="font-display mt-4 text-[1.15rem] leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/45">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PE / RE tracks — primary CTAs */}
      <section
        id="caminhos"
        className="scroll-mt-24 border-t border-black/[0.06] bg-[var(--off-white)] text-black"
      >
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="max-w-2xl">
            <Reveal variant="rise">
              <BackLabel>{t.tracksEyebrow}</BackLabel>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <h2 className="font-display mt-7 text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12]">
                {t.tracksTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.12} variant="fadeUp">
              <p className="body-editorial mt-5 max-w-[44ch] text-black/55">
                {t.tracksBody}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
            <Reveal delay={0.1} variant="slide">
              <article className="group flex h-full flex-col overflow-hidden border border-black/[0.08] bg-white">
                <ImageReveal className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                  <Image
                    src={BACK_MEDIA.peDesk}
                    alt=""
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    quality={90}
                  />
                  <div
                    className="absolute inset-0"
                    aria-hidden
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.55) 100%)",
                    }}
                  />
                </ImageReveal>
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-black/40">
                    {t.peLabel}
                  </p>
                  <h3 className="font-display mt-4 whitespace-pre-line text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.12]">
                    {t.peTitle}
                  </h3>
                  <p className="body-editorial mt-4 flex-1 text-[15px] text-black/55">
                    {t.peBody}
                  </p>
                  <div className="mt-8">
                    <MeridianLink href={t.peHref}>{t.peCta}</MeridianLink>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.18} variant="slideRight">
              <article className="group flex h-full flex-col overflow-hidden border border-black/[0.08] bg-white">
                <ImageReveal className="relative aspect-[16/10] overflow-hidden bg-[#111]" delay={0.08}>
                  <Image
                    src={BACK_MEDIA.house}
                    alt=""
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    quality={90}
                  />
                  <div
                    className="absolute inset-0"
                    aria-hidden
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.55) 100%)",
                    }}
                  />
                </ImageReveal>
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-black/40">
                    {t.reLabel}
                  </p>
                  <h3 className="font-display mt-4 whitespace-pre-line text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.12]">
                    {t.reTitle}
                  </h3>
                  <p className="body-editorial mt-4 flex-1 text-[15px] text-black/55">
                    {t.reBody}
                  </p>
                  <div className="mt-8">
                    <MeridianLink href={t.reHref}>{t.reCta}</MeridianLink>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we bring */}
      <section className="border-t border-white/[0.08] bg-black text-white">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <Reveal variant="rise">
            <BackLabel tone="light">{t.bringEyebrow}</BackLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <h2 className="font-display mt-7 max-w-[18ch] text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12]">
              {t.bringTitle}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
            {t.brings.map((item, i) => (
              <Reveal key={item.title} delay={0.06 + i * 0.04} variant="rise">
                <span
                  className="mb-5 block h-px w-8 bg-white/25"
                  aria-hidden
                />
                <h3 className="font-display text-[1.25rem] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/45">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fit */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal variant="rise">
                <BackLabel>{t.fitEyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-7 max-w-[16ch] text-[clamp(1.85rem,3.2vw,2.65rem)] leading-[1.12]">
                  {t.fitTitle}
                </h2>
              </Reveal>
            </div>
            <ul className="lg:col-span-6 lg:col-start-7">
              {t.fits.map((line, i) => (
                <Reveal key={line} delay={0.06 + i * 0.05} variant="fadeUp">
                  <li className="border-t border-black/[0.08] py-5 last:border-b">
                    <p className="body-editorial flex gap-4 text-black/65">
                      <span
                        className="mt-2.5 h-px w-6 shrink-0 bg-black/25"
                        aria-hidden
                      />
                      {line}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Resources */}
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
                  <div className="flex flex-col items-start gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:py-7">
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

      {/* Close — dual CTAs, no quote */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(3rem,7vw,5rem)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal variant="rise">
                <BackLabel>{t.contactEyebrow}</BackLabel>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-6 max-w-[20ch] text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12]">
                  {t.contactTitle}
                </h2>
              </Reveal>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center lg:col-span-5 lg:col-start-8 lg:justify-end">
              <Reveal delay={0.12}>
                <MeridianLink href={t.peHref}>{t.peCta}</MeridianLink>
              </Reveal>
              <Reveal delay={0.16}>
                <MeridianLink href={t.reHref}>{t.reCta}</MeridianLink>
              </Reveal>
              <Reveal delay={0.2}>
                <MeridianLink href={contactHref}>{t.contactCta}</MeridianLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </BackShell>
  );
}
