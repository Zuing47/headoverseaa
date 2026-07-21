"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SiteContent, Locale } from "@/types/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/* ── Circular arrow link (shared) ─────────────────────────── */
export function CircleArrowLink({
  href,
  children,
  external,
  light,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-champagne-deep",
        light ? "text-ink" : "text-white hover:text-champagne",
      )}
    >
      {children}
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-500 group-hover:border-champagne-deep group-hover:text-champagne-deep",
          light ? "border-ink/25" : "border-white/30",
        )}
        aria-hidden
      >
        <span className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}

/* ── 01 · About the firm (stat + statement) ───────────────── */
export function AboutFirm({ content, locale = "pt" }: { content: SiteContent; locale?: Locale }) {
  const en = locale === "en";
  const stat = content.metrics[0];
  const t = en
    ? { eyebrow: "About the firm", headline: "Delivering lasting value", cta: "Learn more", aboutHref: "/en/about" }
    : { eyebrow: "Sobre a firma", headline: "Construindo valor duradouro", cta: "Saiba mais", aboutHref: "/sobre" };

  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-10 md:py-24 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        {/* Centered eyebrow + statement */}
        <div className="flex flex-col items-center text-center">
          <motion.span
            {...reveal()}
            className="h-px w-10 bg-white/30"
            aria-hidden
          />
          <motion.p {...reveal(0.06)} className="label-mono mt-6 text-champagne">
            {t.eyebrow}
          </motion.p>
          <motion.h2
            {...reveal(0.12)}
            className="font-display mt-8 max-w-3xl text-white [font-size:clamp(2.2rem,5vw,4.4rem)]"
          >
            {t.headline}
          </motion.h2>
        </div>

        {/* Two-column detail */}
        <div className="mt-20 grid gap-16 border-t border-white/10 pt-16 md:grid-cols-[1.4fr_1fr] md:gap-10">
          <div>
            <motion.h3 {...reveal(0.05)} className="font-display text-2xl text-white md:text-3xl">
              {content.philosophy.title}
            </motion.h3>
            <motion.p {...reveal(0.12)} className="mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
              {content.philosophy.body}
            </motion.p>
            <motion.div {...reveal(0.2)} className="mt-10">
              <CircleArrowLink href={t.aboutHref}>{t.cta}</CircleArrowLink>
            </motion.div>
          </div>

          {stat && (
            <motion.div {...reveal(0.2)} className="flex flex-col justify-start border-t border-white/10 pt-8 md:border-t-0 md:border-l md:pl-10 md:pt-0">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg text-champagne">US$</span>
                <span className="font-display text-6xl text-white md:text-7xl">{stat.value}</span>
                {stat.suffix && <span className="font-display text-3xl text-champagne">{stat.suffix}</span>}
              </div>
              <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-white/45">{stat.label}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── 02 · Institutional statement ─────────────────────────── */
export function InstitutionalStatement({ locale = "pt" }: { locale?: Locale }) {
  const t =
    locale === "en"
      ? {
          lead: "We invest in real assets and enduring businesses.",
          body: "Head Oversea is an active ownership investment company operating between Brazil and the United States.",
        }
      : {
          lead: "Investimos em ativos reais e negócios duradouros.",
          body: "A Head Oversea é uma empresa de active ownership que opera entre o Brasil e os Estados Unidos.",
        };
  return (
    <section className="bg-black px-6 py-32 md:px-10 md:py-48 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <motion.h2
          {...reveal()}
          className="font-display max-w-5xl text-white [font-size:clamp(2rem,5vw,4.5rem)]"
        >
          {t.lead}
        </motion.h2>
        <motion.p
          {...reveal(0.12)}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl"
        >
          {t.body}
        </motion.p>
      </div>
    </section>
  );
}

/* ── 03 / 04 · Investment areas (editorial) ───────────────── */
export function InvestmentArea({
  index,
  area,
  title,
  description,
  linkLabel,
  href,
  image,
  reverse,
}: {
  index: string;
  area: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <section className="relative bg-black">
      <div className="mx-auto grid max-w-[1600px] items-stretch gap-px md:grid-cols-2">
        <div className={reverse ? "md:order-2" : ""}>
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative h-[52vh] min-h-[360px] w-full overflow-hidden md:h-[80vh]"
          >
            <Image src={image} alt="" fill sizes="50vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-black/25" aria-hidden />
          </motion.div>
        </div>
        <div className="flex items-center bg-black px-6 py-16 md:px-14 lg:px-20">
          <div className="max-w-lg">
            <motion.p {...reveal()} className="label-mono text-champagne">
              {index} / {area}
            </motion.p>
            <motion.h2
              {...reveal(0.08)}
              className="font-display mt-6 text-white [font-size:clamp(2.2rem,4vw,4rem)]"
            >
              {title}
            </motion.h2>
            <motion.p {...reveal(0.16)} className="mt-7 text-base leading-relaxed text-white/55 md:text-lg">
              {description}
            </motion.p>
            <motion.div {...reveal(0.24)} className="mt-10">
              <CircleArrowLink href={href}>{linkLabel}</CircleArrowLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 05 · Active ownership ─────────────────────────────────── */
export function ActiveOwnership({ locale = "pt" }: { locale?: Locale }) {
  const t =
    locale === "en"
      ? {
          eyebrow: "Investment philosophy",
          headline: "We don't simply invest. We build.",
          items: [
            { n: "01", k: "Operate", d: "We work alongside leadership." },
            { n: "02", k: "Expand", d: "We connect businesses to new markets." },
            { n: "03", k: "Compound", d: "We build value with a long-term perspective." },
          ],
        }
      : {
          eyebrow: "Filosofia de investimento",
          headline: "Não apenas investimos. Construímos.",
          items: [
            { n: "01", k: "Operate", d: "Trabalhamos lado a lado com a liderança." },
            { n: "02", k: "Expand", d: "Conectamos empresas a novos mercados." },
            { n: "03", k: "Compound", d: "Construímos valor com perspectiva de longo prazo." },
          ],
        };
  return (
    <section className="border-t border-white/10 bg-black px-6 py-32 md:px-10 md:py-44 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <motion.p {...reveal()} className="label-mono text-champagne">
          {t.eyebrow}
        </motion.p>
        <motion.h2 {...reveal(0.08)} className="font-display mt-6 max-w-3xl text-white [font-size:clamp(2rem,4.4vw,4rem)]">
          {t.headline}
        </motion.h2>

        <div className="mt-20 grid gap-px border-t border-white/10 md:grid-cols-3">
          {t.items.map((item, i) => (
            <motion.div
              key={item.k}
              {...reveal(0.1 + i * 0.1)}
              className="group border-b border-white/10 py-10 transition-colors md:border-b-0 md:border-l md:px-10 md:first:border-l-0 md:first:pl-0"
            >
              <span className="label-mono text-white/40">{item.n}</span>
              <h3 className="font-display mt-5 text-2xl uppercase tracking-tight text-white transition-colors group-hover:text-champagne md:text-3xl">
                {item.k}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{item.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 05b · Featured stories (light theme) ─────────────────── */
export function FeaturedStories({ content, locale = "pt" }: { content: SiteContent; locale?: Locale }) {
  const en = locale === "en";
  const items = content.insights.items.slice(0, 4);
  const insightsHref = en ? "/en/insights" : "/insights";
  const t = en
    ? { eyebrow: "News & Insights", title: "Featured Stories", viewAll: "View all" }
    : { eyebrow: "Notícias", title: "Destaques", viewAll: "Ver todos" };

  if (!items.length) return null;

  return (
    <section className="border-t border-border-ink bg-porcelain px-6 py-16 md:px-10 md:py-24 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.p {...reveal()} className="label-mono text-champagne-deep">
              {t.eyebrow}
            </motion.p>
            <motion.h2
              {...reveal(0.08)}
              className="font-display mt-4 text-ink [font-size:clamp(2rem,4vw,3.4rem)]"
            >
              {t.title}
            </motion.h2>
          </div>
          <motion.div {...reveal(0.12)}>
            <Link
              href={insightsHref}
              className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-mute transition-colors hover:text-champagne-deep"
            >
              {t.viewAll}
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.a
              key={item.title}
              {...reveal((i % 4) * 0.08)}
              href={item.href && item.href !== "#" ? item.href : insightsHref}
              className="group block"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-porcelain-alt">
                {item.image && (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <h3 className="font-display mt-6 text-lg leading-snug text-ink transition-colors group-hover:text-champagne-deep md:text-xl">
                {item.title}
              </h3>
              <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                <span>{item.category}</span>
                <span aria-hidden>·</span>
                <span>{item.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 06 · Selected portfolio (list) ───────────────────────── */
export function PortfolioList({ content, locale = "pt" }: { content: SiteContent; locale?: Locale }) {
  const [active, setActive] = useState<number | null>(null);
  const items = content.cases.items;
  const casesHref = locale === "en" ? "/en/cases" : "/cases";
  const title = locale === "en" ? "Selected portfolio" : "Portfólio selecionado";
  const viewAll = locale === "en" ? "View all" : "Ver todos";

  return (
    <section className="relative border-t border-white/10 bg-black px-6 py-16 md:px-10 md:py-24 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between">
          <motion.h2 {...reveal()} className="label-mono text-white/50">
            {title}
          </motion.h2>
          <Link
            href={casesHref}
            className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-champagne"
          >
            {viewAll}
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </div>

        <div className="relative mt-10 border-t border-white/12">
          {/* Floating preview (desktop) */}
          <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-full w-[36%] lg:block">
            {items.map((item, i) => (
              <div
                key={item.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
                aria-hidden
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image src={item.image ?? "/images/about.jpg"} alt="" fill sizes="36vw" className="object-cover object-center" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              </div>
            ))}
          </div>

          {items.map((item, i) => (
            <motion.div key={item.id} {...reveal(i * 0.05)} className="relative z-10">
              <Link
                href={casesHref}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group flex items-center justify-between gap-6 border-b border-white/12 py-7 md:py-9"
              >
                <div className="flex items-baseline gap-4 transition-transform duration-500 group-hover:translate-x-2 md:gap-8">
                  <span className="label-mono text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl uppercase tracking-tight text-white transition-colors group-hover:text-champagne md:text-5xl">
                    {item.company}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="hidden text-[11px] uppercase tracking-[0.18em] text-white/45 sm:block">
                    {item.category}
                  </span>
                  <span className="text-xl text-white/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-champagne" aria-hidden>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 06 · Selected portfolio (logo cards) ─────────────────── */
export function PortfolioCards({ content, locale = "pt" }: { content: SiteContent; locale?: Locale }) {
  const items = content.cases.items;
  const casesHref = locale === "en" ? "/en/cases" : "/cases";
  const title = locale === "en" ? "Selected portfolio" : "Portfólio selecionado";
  const viewAll = locale === "en" ? "View all" : "Ver todos";
  const visit = locale === "en" ? "Visit site" : "Visitar site";

  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-10 md:py-24 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between">
          <motion.h2 {...reveal()} className="label-mono text-white/50">{title}</motion.h2>
          <Link href={casesHref} className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-champagne">
            {viewAll}
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => {
            const hasLink = item.visitUrl && item.visitUrl !== "#";
            const light = item.logoBg === "light";
            return (
              <motion.a
                key={item.id}
                {...reveal((i % 4) * 0.06)}
                href={hasLink ? item.visitUrl : casesHref}
                target={hasLink ? "_blank" : undefined}
                rel={hasLink ? "noopener noreferrer" : undefined}
                className="group relative flex aspect-[4/3] flex-col items-center justify-center bg-black p-8 transition-colors duration-500 hover:bg-[#0d0e11]"
              >
                {item.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.logo}
                    alt={item.company}
                    loading="lazy"
                    className={cn(
                      "max-h-14 w-auto max-w-[60%] object-contain transition-all duration-700 group-hover:scale-[1.05]",
                      light ? "rounded-sm bg-white p-2" : "opacity-90 group-hover:opacity-100",
                    )}
                  />
                ) : (
                  <span className="font-display text-xl uppercase text-white">{item.company}</span>
                )}

                <span className="pointer-events-none absolute bottom-7 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-champagne opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {visit}
                  <span aria-hidden>↗</span>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Metrics band ─────────────────────────────────────────── */
export function MetricsBand({ content, locale = "pt" }: { content: SiteContent; locale?: Locale }) {
  const stats = content.metrics.slice(0, 4);
  const label = locale === "en" ? "By the numbers" : "Em números";
  return (
    <section className="border-t border-white/10 bg-black px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <motion.p {...reveal()} className="label-mono text-white/50">{label}</motion.p>
        <div className="mt-14 grid grid-cols-2 gap-px border-t border-white/10 md:grid-cols-4">
          {stats.map((m, i) => (
            <motion.div
              key={m.label}
              {...reveal(i * 0.08)}
              className="border-b border-white/10 py-10 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
            >
              <div className="flex items-baseline gap-0.5">
                {i === 0 && <span className="font-mono text-sm text-champagne">US$</span>}
                <span className="font-display text-5xl text-white md:text-6xl">{m.value}</span>
                {m.suffix && <span className="font-display text-2xl text-champagne">{m.suffix}</span>}
              </div>
              <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-white/45">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact CTA (home close) ─────────────────────────────── */
export function ContactCTA({ locale = "pt" }: { locale?: Locale }) {
  const en = locale === "en";
  const contactHref = en ? "/en/contact" : "/contato";
  const t = en
    ? { headline: "Building value through private equity and real estate.", cta: "Get in touch" }
    : { headline: "Construindo valor através de private equity e real estate.", cta: "Fale conosco" };
  return (
    <section className="relative border-t border-white/10 bg-black px-6 py-20 md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <motion.h2 {...reveal()} className="font-display max-w-4xl text-white [font-size:clamp(2rem,5vw,4.5rem)]">
          {t.headline}
        </motion.h2>
        <motion.div {...reveal(0.12)} className="mt-12">
          <CircleArrowLink href={contactHref}>{t.cta}</CircleArrowLink>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Global perspective (retained, optional) ──────────────── */
export function GlobalPerspective({ locale = "pt" }: { locale?: Locale }) {
  const t =
    locale === "en"
      ? { eyebrow: "Global perspective", h1: "Brazil insight.", h2: "United States execution.", body: "We operate across two markets — origination and relationships in Brazil, structuring and presence in the United States." }
      : { eyebrow: "Perspectiva global", h1: "Visão do Brasil.", h2: "Execução nos Estados Unidos.", body: "Operamos entre dois mercados — originação e relacionamento no Brasil, estruturação e presença nos Estados Unidos." };
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden border-t border-white/10 bg-black px-6 md:px-10 lg:px-14">
      <Image src="/images/eua2.jpg" alt="" fill sizes="100vw" className="object-cover object-center opacity-60" />
      <div className="absolute inset-0" aria-hidden style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.35) 100%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] py-16">
        <motion.p {...reveal()} className="label-mono text-champagne">{t.eyebrow}</motion.p>
        <motion.h2 {...reveal(0.08)} className="font-display mt-6 text-white [font-size:clamp(2.4rem,6vw,6rem)]">
          {t.h1}
          <br />
          <span className="text-white/55">{t.h2}</span>
        </motion.h2>
        <motion.p {...reveal(0.16)} className="mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
          {t.body}
        </motion.p>
      </div>
    </section>
  );
}

/* ── 08 · Leadership (editorial grid) ─────────────────────── */
export function LeadershipGrid({ content, locale = "pt" }: { content: SiteContent; locale?: Locale }) {
  const team = content.about.team.slice(0, 8);
  const aboutHref = locale === "en" ? "/en/about" : "/sobre";
  const title = locale === "en" ? "About us" : "Sobre nós";
  const viewAll = locale === "en" ? "View About us" : "Ver Sobre nós";

  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-10 md:py-24 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between">
          <motion.h2 {...reveal()} className="label-mono text-white/50">{title}</motion.h2>
          <Link href={aboutHref} className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-champagne">
            {viewAll}
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
          {team.map((m, i) => {
            const hasLink = m.linkedin && m.linkedin !== "#";
            return (
              <motion.div key={m.name} {...reveal((i % 4) * 0.06)} className="group">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="object-cover object-center grayscale transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-graphite" />
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg uppercase tracking-tight text-white">{m.name}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-champagne">{m.role}</p>
                {hasLink && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-white"
                  >
                    {locale === "en" ? "View profile" : "Ver perfil"} ↗
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 09 · Insights (editorial) ────────────────────────────── */
export function InsightsEditorial({ content, locale = "pt" }: { content: SiteContent; locale?: Locale }) {
  const items = content.insights.items.slice(0, 3);
  const [lead, ...rest] = items;
  const insightsHref = locale === "en" ? "/en/insights" : "/insights";
  const title = "Insights";
  const readLabel = locale === "en" ? "Read insight" : "Ler insight";

  if (!lead) return null;

  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-10 md:py-24 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <motion.h2 {...reveal()} className="label-mono text-white/50">{title}</motion.h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Lead */}
          <motion.a {...reveal(0.05)} href={lead.href || insightsHref} className="group block">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {lead.image && (
                <Image src={lead.image} alt="" fill sizes="50vw" className="object-cover object-center transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" />
              )}
            </div>
            <p className="mt-6 label-mono text-champagne">{lead.category}</p>
            <h3 className="font-display mt-4 max-w-xl text-white transition-colors group-hover:text-champagne [font-size:clamp(1.6rem,2.6vw,2.6rem)]">
              {lead.title}
            </h3>
            <span className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-white/55 transition-colors group-hover:text-champagne">
              {readLabel} →
            </span>
          </motion.a>

          {/* Secondary list */}
          <div className="flex flex-col justify-center divide-y divide-white/12 border-t border-white/12">
            {rest.map((item, i) => (
              <motion.a key={item.title} {...reveal(0.1 + i * 0.08)} href={item.href || insightsHref} className="group block py-8">
                <p className="label-mono text-white/40">{item.category}</p>
                <h4 className="font-display mt-3 text-xl text-white transition-colors group-hover:text-champagne md:text-2xl">
                  {item.title}
                </h4>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
