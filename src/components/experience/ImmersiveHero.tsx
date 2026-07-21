import Link from "next/link";
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/experience/Reveal";
import { ImmersiveNav } from "@/components/experience/ImmersiveNav";
import { GlowButton } from "@/components/experience/GlowButton";
import { LazyVideo } from "@/components/ui/LazyVideo";
import type { Locale } from "@/types/content";

const HERO_LINKS = {
  pt: { thesisLabel: "Nossa Tese", thesis: "/tese", founder: "/fundadores", investor: "/investidores" },
  en: { thesisLabel: "Our thesis", thesis: "/en/services", founder: "/en/contact", investor: "/en/contact" },
} as const;

export function ImmersiveHero({ locale = "pt" }: { locale?: Locale }) {
  const content = getContent(locale);
  const { metrics, hero } = content;
  const stats = metrics.slice(0, 4);
  const links = HERO_LINKS[locale];

  return (
    <section className="relative flex h-screen min-h-[640px] flex-col overflow-hidden">
      {/* Full-bleed cinematic video loop */}
      <LazyVideo
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/videos/us-city-skyline-sunset.mp4"
        poster="/images/us-city-skyline-sunset-poster.jpg"
        eager
        aria-hidden
      />
      {/* Left-heavy scrim: dark on the left for legibility, clearer on the right to keep the scene visible */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(6,8,15,0.92) 0%, rgba(6,8,15,0.72) 30%, rgba(6,8,15,0.32) 62%, rgba(6,8,15,0.12) 100%)",
        }}
      />
      {/* Bottom fade so the stats row stays readable */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(6,8,15,0.35) 0%, transparent 30%, transparent 65%, rgba(6,8,15,0.95) 100%)",
        }}
      />

      <ImmersiveNav content={content} locale={locale} />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pt-24 pb-14 sm:px-8 md:pt-24 md:pb-14">
        <Reveal immediate
          as="p"
          delay={0.1}
          y={20}
          className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-champagne sm:text-sm"
        >
          {hero.eyebrow}
        </Reveal>

        <h1 className="text-metallic font-display max-w-3xl font-normal leading-[1.02] tracking-tight [font-size:clamp(2rem,4.5vw,3.75rem)]">
          <Reveal immediate as="span" delay={0.2} y={40} className="block">
            {hero.title}
          </Reveal>
          {hero.titleAccent && (
            <Reveal
              immediate
              as="span"
              delay={0.32}
              y={40}
              className="block text-champagne [-webkit-text-fill-color:var(--champagne)]"
            >
              {hero.titleAccent}
            </Reveal>
          )}
        </h1>

        <Reveal immediate
          as="p"
          delay={0.45}
          y={20}
          className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/70 md:text-base"
        >
          {hero.subtitle}
        </Reveal>

        <Reveal immediate delay={0.55} y={20} className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <GlowButton href={links.thesis}>{links.thesisLabel}</GlowButton>
          <div className="flex items-center gap-6">
            <Link
              href={links.founder}
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ivory/90 transition-colors hover:text-champagne"
            >
              {hero.founderCta}
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
            <span className="h-4 w-px bg-white/20" aria-hidden />
            <Link
              href={links.investor}
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ivory/90 transition-colors hover:text-champagne"
            >
              {hero.investorCta}
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        {hero.trustLine && (
          <Reveal immediate delay={0.65} y={12} className="mt-6 text-xs tracking-wide text-ivory/45">
            {hero.trustLine}
          </Reveal>
        )}

        {/* Stat row */}
        <Reveal immediate delay={0.75} className="mt-12 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {stats.map((m, i) => (
            <div key={m.label}>
              <div className="flex items-baseline gap-0.5">
                {i === 0 && <span className="font-mono text-xs text-champagne">US$</span>}
                <span className="font-display text-2xl font-light text-ivory md:text-3xl">
                  {m.value}
                </span>
                {m.suffix && <span className="font-display text-lg text-champagne">{m.suffix}</span>}
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-ivory/50">{m.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
