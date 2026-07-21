"use client";

import Image from "next/image";
import Link from "next/link";
import { BackShell, MeridianLink } from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { FeaturedVideo } from "@/components/pages/FeaturedVideo";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { BACK_MEDIA } from "@/lib/back-media";
import { cn } from "@/lib/utils";
import type { Locale, SiteContent } from "@/types/content";

interface PrivateEquityPageViewProps {
  content: SiteContent;
  locale?: Locale;
}

/** Portfolio cards with a looping clip instead of a static photo. */
const PE_CASE_VIDEO: Record<string, string> = {
  riolaser: "/videos/riolaser.mp4",
  roadpro: "/videos/roadpro.mp4",
  drakkar: "/videos/drakkar.mp4",
  once: "/videos/once.mp4",
};

/**
 * Per-logo optical caps — aspect ratios differ, but every mark sits
 * vertically centered in the same fixed slot so the row reads as one line.
 */
const LOGO_BOX: Record<string, { w: number; h: number; box: string }> = {
  riolaser: { w: 532, h: 179, box: "max-h-10 max-w-[140px]" },
  drakkar: { w: 239, h: 163, box: "max-h-12 max-w-[120px]" },
  roadpro: { w: 931, h: 157, box: "max-h-8 max-w-[150px]" },
  once: { w: 400, h: 120, box: "max-h-10 max-w-[150px]" },
};
const LOGO_BOX_DEFAULT = { w: 400, h: 120, box: "max-h-10 max-w-[140px]" };

const COPY = {
  pt: {
    heroLabel: "Private Equity",
    heroTitle: "Ownership ativo.\nNegócios duradouros.",
    heroBody:
      "Investimos em empresas líderes — assumindo ownership e construindo valor de longo prazo ao lado da liderança.",
    heroCta: "Nossa abordagem",
    leversEyebrow: "Como geramos valor",
    leversIntro:
      "Não vendemos serviços avulsos. Entramos como sócios e trabalhamos três frentes em paralelo, do primeiro trimestre ao evento de liquidez.",
    levers: [
      {
        n: "01",
        title: "Operamos",
        body: "Fortalecemos a operação com disciplina, eficiência e execução lado a lado com a gestão.",
      },
      {
        n: "02",
        title: "Expandimos",
        body: "Conectamos empresas a novos mercados — com presença real no Brasil e nos Estados Unidos.",
      },
      {
        n: "03",
        title: "Multiplicamos",
        body: "Construímos valor duradouro com governança, capital estruturado e horizonte longo.",
      },
    ],
    strategyEyebrow: "Nossa estratégia",
    strategyTitle: "Parceria ativa.\nFoco em performance.",
    strategyBody:
      "Combinamos experiência setorial, disciplina financeira e presença operacional para acelerar resultados sustentáveis.",
    stats: [
      { value: "+20", label: "Empresas no portfólio atual e passado" },
      { value: "+30", label: "Aquisições complementares" },
      { value: "3", label: "Setores principais de atuação" },
      { value: "100%", label: "Compromisso com sucesso de longo prazo" },
    ],
    approachTitle: "Construímos valor com governança e execução.",
    quote:
      "Nosso papel é ser mais que investidores: somos parceiros na construção de empresas mais fortes e relevantes.",
    quoteName: "Douglas Bubna",
    quoteRole: "CEO & Founder",
    quoteBy: "Douglas Bubna, CEO & Founder",
    portfolioEyebrow: "Empresas do portfólio",
    portfolioIntro:
      "Orgulho de fazer parte da jornada de empresas que constroem presença real no Brasil e nos Estados Unidos — identificamos, investimos e ampliamos o valor de negócios sólidos.",
    viewAll: "Ver todas",
    marketsTitle: "Conectamos empresas brasileiras ao mundo.",
    markets: [
      { value: "2", label: "Mercados principais" },
      { value: "Brasil · EUA", label: "Presença ativa" },
      { value: "Visão global", label: "Execução local" },
    ],
    insightsEyebrow: "Insights",
    insightsTitle: "Conteúdo que gera insights e perspectiva.",
    readArticle: "Ler artigo",
    videoTitle:
      "Por que comprar um pequeno negócio pode ser um grande diferencial?",
    videoBody:
      "A tese da Head Oversea em Private Equity: empresas de menor porte, bem escolhidas, com ownership ativo e execução — viram ativos com escala e valor de longo prazo.",
    videoCta: "Assistir vídeo",
  },
  en: {
    heroLabel: "Private Equity",
    heroTitle: "Active ownership.\nEnduring businesses.",
    heroBody:
      "We invest in leading companies — taking ownership positions and building long-term value alongside leadership.",
    heroCta: "Our approach",
    leversEyebrow: "How we create value",
    leversIntro:
      "We don't sell one-off services. We come in as partners and work three fronts in parallel, from the first quarter to the liquidity event.",
    levers: [
      {
        n: "01",
        title: "Operate",
        body: "We strengthen operations with discipline, efficiency, and execution side by side with management.",
      },
      {
        n: "02",
        title: "Expand",
        body: "We connect companies to new markets — with real presence in Brazil and the United States.",
      },
      {
        n: "03",
        title: "Multiply",
        body: "We build enduring value through governance, structured capital, and a long horizon.",
      },
    ],
    strategyEyebrow: "Our strategy",
    strategyTitle: "Active partnership.\nPerformance focus.",
    strategyBody:
      "We combine sector experience, financial discipline, and operational presence to accelerate sustainable results.",
    stats: [
      { value: "+20", label: "Companies in current and prior portfolio" },
      { value: "+30", label: "Add‑ons completed" },
      { value: "3", label: "Core sectors of focus" },
      { value: "100%", label: "Commitment to long-term success" },
    ],
    approachTitle: "We build value with governance and execution.",
    quote:
      "Our role is to be more than investors: we are partners in building stronger, more relevant companies.",
    quoteName: "Douglas Bubna",
    quoteRole: "CEO & Founder",
    quoteBy: "Douglas Bubna, CEO & Founder",
    portfolioEyebrow: "Portfolio companies",
    portfolioIntro:
      "We're proud to be part of the journey of companies building real presence in Brazil and the United States — we identify, invest in, and grow the value of solid businesses.",
    viewAll: "View all",
    marketsTitle: "We connect Brazilian companies to the world.",
    markets: [
      { value: "2", label: "Core markets" },
      { value: "Brazil · USA", label: "Active presence" },
      { value: "Global vision", label: "Local execution" },
    ],
    insightsEyebrow: "Insights",
    insightsTitle: "Content that builds insight and perspective.",
    readArticle: "Read article",
    videoTitle:
      "Why buying a small business can be a big differentiator?",
    videoBody:
      "Head Oversea's Private Equity thesis: well-chosen smaller companies, with active ownership and execution, become scaled assets with long-term value.",
    videoCta: "Watch video",
  },
} as const;

export function PrivateEquityPageView({
  content,
  locale = "pt",
}: PrivateEquityPageViewProps) {
  const t = COPY[locale];
  const en = locale === "en";
  const casesHref = en ? "/en/cases" : "/cases";
  const insightsHref = en ? "/en/insights" : "/insights";

  const peCases = content.cases.items
    .filter((c) => c.category === "Private Equity" || c.id === "riolaser")
    .slice(0, 4);

  const insights = content.insights.items.slice(0, 3);

  return (
    <BackShell content={content} locale={locale}>
      {/* ── 01 Hero split ───────────────────────────────────── */}
      <section className="relative border-b border-white/[0.08] bg-black text-white">
        <div className="grid lg:grid-cols-2 lg:min-h-[min(72vh,700px)]">
          <div className="relative min-h-[min(48vh,420px)] sm:min-h-[52vw] lg:min-h-full">
            <LazyVideo
              className="absolute inset-0 h-full w-full object-cover object-center"
              src={BACK_MEDIA.videoNiagara}
              eager
            />
            <div
              className="absolute inset-0 hidden lg:block"
              aria-hidden
              style={{
                background:
                  "linear-gradient(90deg, transparent 52%, rgba(0,0,0,0.35) 74%, rgba(0,0,0,0.82) 92%, #000 100%)",
              }}
            />
            <div
              className="absolute inset-0 lg:hidden"
              aria-hidden
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(5,5,5,0.35) 85%, #050505 100%)",
              }}
            />
          </div>

          <div className="flex flex-col justify-center px-[var(--page-padding-mobile)] py-[clamp(3rem,7vw,5rem)] md:px-[var(--page-padding-tablet)] lg:px-[var(--page-padding-desktop)]">
            <Reveal variant="rise">
              <p className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] uppercase leading-none tracking-[0.02em] text-white">
                {t.heroLabel}
              </p>
            </Reveal>
            <Reveal delay={0.08} variant="rise">
              <h1 className="font-display mt-5 max-w-[18ch] whitespace-pre-line text-[clamp(2.4rem,5vw,4rem)] leading-[1.05]">
                {t.heroTitle}
              </h1>
            </Reveal>
            <Reveal delay={0.14} variant="fadeUp">
              <p className="body-editorial mt-7 max-w-[38ch] text-white/55">
                {t.heroBody}
              </p>
            </Reveal>
            <Reveal delay={0.2} variant="fadeUp" className="mt-10">
              <a
                href="#abordagem"
                className="group inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-70"
              >
                {t.heroCta}
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 02 Impact stats ─────────────────────────────────── */}
      <section className="border-t border-black/[0.08] bg-[var(--off-white)] text-black">
        <div className="page-shell py-[clamp(2.75rem,6vw,4.75rem)]">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal variant="rise">
                <p className="label-caps text-[var(--gold)]">{t.strategyEyebrow}</p>
              </Reveal>
              <Reveal delay={0.08} variant="rise">
                <h2 className="font-display mt-7 whitespace-pre-line text-[clamp(2rem,3.6vw,3rem)] leading-[1.1]">
                  {t.strategyTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.14} variant="fadeUp">
                <p className="body-editorial mt-6 max-w-[36ch] text-black/55">
                  {t.strategyBody}
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-6 lg:col-start-7 lg:gap-x-12">
              {t.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.08 + i * 0.05} variant="rise">
                  <p className="font-display text-[clamp(2.75rem,6vw,4rem)] leading-none tracking-[-0.03em] text-[var(--navy)]">
                    {stat.value}
                  </p>
                  <p className="mt-3 max-w-[18ch] text-[12px] uppercase tracking-[0.12em] text-[var(--navy)]/55">
                    {stat.label}
                  </p>
                  <div className="mt-5 h-px w-12 bg-[var(--navy)]/25" aria-hidden />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 How we create value ──────────────────────────── */}
      <section className="border-t border-white/[0.08] bg-black text-white">
        <div className="page-shell py-[clamp(2.75rem,6vw,4.75rem)]">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal variant="rise">
                <h2 className="font-display text-[clamp(1.85rem,3.2vw,2.65rem)] leading-[1.12]">
                  {t.leversEyebrow}
                </h2>
              </Reveal>
              <Reveal delay={0.06} variant="fadeUp">
                <p className="body-editorial mt-6 text-white/55">{t.leversIntro}</p>
              </Reveal>

              <div className="mt-12 flex flex-col divide-y divide-white/[0.12]">
                {t.levers.map((lever, i) => (
                  <Reveal
                    key={lever.n}
                    delay={0.08 + i * 0.06}
                    variant="fadeUp"
                    className={cn("py-9", i === 0 && "pt-2")}
                  >
                    <div className="flex items-baseline gap-4">
                      <p className="font-mono text-[12px] tracking-wider text-[var(--navy-soft)]">
                        {lever.n}
                      </p>
                      <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-snug">
                        {lever.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-[46ch] text-[14px] leading-relaxed text-white/50">
                      {lever.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal
              delay={0.12}
              variant="fadeUp"
              className="lg:col-span-6"
            >
              <ImageReveal className="relative aspect-[4/5] overflow-hidden bg-[#111] sm:aspect-[3/4] lg:aspect-[4/5] lg:min-h-[520px]">
                <LazyVideo
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  src="/videos/pe-create-value.mp4"
                  poster="/images/pe-create-value-poster.jpg"
                  loop
                  muted
                  aria-hidden
                />
              </ImageReveal>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 04 Portfolio grid ───────────────────────────────── */}
      <section className="border-t border-black/[0.08] bg-[var(--off-white)] text-black">
        <div className="page-shell py-[clamp(2.75rem,6vw,4.75rem)]">
          <Reveal variant="rise">
            <p className="label-caps text-black/45">
              {t.portfolioEyebrow}{" "}
              <span className="text-black/30">({peCases.length})</span>
            </p>
          </Reveal>
          <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
            <Reveal delay={0.06} variant="fadeUp" className="max-w-[46ch]">
              <p className="body-editorial text-black/55">{t.portfolioIntro}</p>
            </Reveal>
            <Reveal delay={0.1} variant="fadeUp">
              <Link
                href={casesHref}
                className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-black/55 transition-colors hover:text-black"
              >
                {t.viewAll}
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {peCases.map((item, i) => (
              <Reveal key={item.id} delay={0.06 + i * 0.05} variant="fadeUp">
                <Link
                  href={
                    en ? `/en/cases/${item.id}` : `/cases/${item.id}`
                  }
                  className="group block"
                >
                  <ImageReveal className="relative aspect-[4/5] overflow-hidden bg-[#ddd]">
                    {PE_CASE_VIDEO[item.id] ? (
                      <LazyVideo
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        src={PE_CASE_VIDEO[item.id]}
                        poster={item.image}
                      />
                    ) : (
                      <Image
                        src={item.image || BACK_MEDIA.laserStore}
                        alt={item.company}
                        fill
                        sizes="(max-width:768px) 50vw, 25vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        quality={92}
                      />
                    )}
                    <div
                      className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-25"
                      aria-hidden
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55) 100%)",
                      }}
                    />
                  </ImageReveal>
                  {item.logo ? (
                    <div className="mt-5 flex h-14 items-center">
                      <Image
                        src={item.logo}
                        alt={item.company}
                        width={(LOGO_BOX[item.id] ?? LOGO_BOX_DEFAULT).w}
                        height={(LOGO_BOX[item.id] ?? LOGO_BOX_DEFAULT).h}
                        quality={100}
                        className={cn(
                          "h-auto w-auto object-contain object-left",
                          (LOGO_BOX[item.id] ?? LOGO_BOX_DEFAULT).box,
                        )}
                      />
                    </div>
                  ) : (
                    <h3 className="mt-5 font-display text-[1.05rem] uppercase tracking-tight">
                      {item.company}
                    </h3>
                  )}
                  <p className="mt-2.5 text-[11px] uppercase tracking-[0.14em] text-black/40">
                    {(item.detail?.sector || item.category).toUpperCase()}
                    {item.location ? ` / ${item.location.toUpperCase()}` : ""}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── 05 Global expansion ─────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/[0.08] bg-black text-white">
        {/* Mobile: full-width flag band (was desktop-only) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden lg:hidden">
          <Image
            src={BACK_MEDIA.usFlagPresence}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[68%_32%] brightness-110 contrast-110 saturate-125"
            quality={90}
          />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block"
          aria-hidden
        >
          <Image
            src={BACK_MEDIA.usFlagPresence}
            alt=""
            fill
            sizes="60vw"
            className="object-cover object-[68%_32%] brightness-110 contrast-110 saturate-125"
            quality={95}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #000 0%, #000 18%, rgba(0,0,0,0.72) 34%, rgba(0,0,0,0.18) 52%, transparent 68%)",
            }}
          />
        </div>

        <div className="page-shell relative z-10 py-[clamp(2.75rem,6vw,4.75rem)]">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="max-w-xl lg:col-span-5 lg:max-w-none">
              <Reveal variant="rise">
                <h2 className="font-display max-w-[16ch] text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.12]">
                  {t.marketsTitle}
                </h2>
              </Reveal>
              <div className="mt-12 grid max-w-[28rem] grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8">
                {t.markets.map((m, i) => (
                  <Reveal key={m.label} delay={0.08 + i * 0.06} variant="rise">
                    <p className="font-display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-none text-white">
                      {m.value}
                    </p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-white/45 sm:text-[11px]">
                      {m.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured video (with audio) ─────────────────────── */}
      <FeaturedVideo
        title={t.videoTitle}
        body={t.videoBody}
        cta={t.videoCta}
        src={BACK_MEDIA.videoPeFeatured}
        poster={BACK_MEDIA.peDesk}
        autoplay
        muted
      />

      {/* ── 06 Insights ─────────────────────────────────────── */}
      <section className="border-t border-black/[0.08] bg-[var(--off-white)] text-black">
        <div className="page-shell py-[clamp(2.75rem,6vw,4.75rem)]">
          <Reveal variant="rise">
            <p className="label-caps text-[var(--gold)]">{t.insightsEyebrow}</p>
          </Reveal>
          <Reveal delay={0.06} variant="rise">
            <h2 className="font-display mt-7 max-w-[22ch] text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.12]">
              {t.insightsTitle}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {insights.map((article, i) => (
              <Reveal key={article.slug} delay={0.08 + i * 0.06} variant="fadeUp">
                <Link href={article.href} className="group block border-t border-black/[0.1] pt-8">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-black/40">
                    {article.date}
                  </p>
                  <h3 className="font-display mt-4 text-[clamp(1.15rem,1.8vw,1.35rem)] leading-snug transition-colors group-hover:text-black/70">
                    {article.title}
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[var(--gold)]">
                    {t.readArticle}
                    <span
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} variant="fadeUp" className="mt-14">
            <MeridianLink href={insightsHref}>
              {en ? "All insights" : "Todos os insights"}
            </MeridianLink>
          </Reveal>
        </div>
      </section>

      {/* ── 07 Approach — title over darkened video ─────────── */}
      <section
        id="abordagem"
        className="relative scroll-mt-24 min-h-[min(52vh,480px)] overflow-hidden bg-black text-white md:min-h-[min(58vh,560px)]"
      >
        <LazyVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={BACK_MEDIA.videoMarkets}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background: "rgba(0,0,0,0.28)",
          }}
        />
        <div className="page-shell relative z-10 flex min-h-[min(52vh,480px)] flex-col justify-center py-14 md:min-h-[min(58vh,560px)] md:py-20">
          <Reveal variant="rise">
            <h2 className="font-display max-w-[18ch] text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.12] text-white">
              {t.approachTitle}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Quote + portrait — full shell width like ref, photo right, tight gap */}
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
                  src="/images/douglas4.jpg"
                  alt="Douglas Bubna — CEO & Founder, Head Oversea"
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
    </BackShell>
  );
}

