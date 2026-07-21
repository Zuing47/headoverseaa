import Link from "next/link";
import { Reveal } from "@/components/experience/Reveal";
import type { Locale } from "@/types/content";

const COPY = {
  pt: {
    eyebrow: "Pronto para o próximo passo?",
    title: "Toda parceria começa com uma conversa qualificada.",
    subtitle: "Escolha o caminho que descreve você. Sem formulário longo, sem pressão.",
    founders: "Para Fundadores",
    investors: "Para Investidores",
  },
  en: {
    eyebrow: "Ready for the next step?",
    title: "Every partnership starts with a qualified conversation.",
    subtitle: "Choose the path that describes you. No long form, no pressure.",
    founders: "For Founders",
    investors: "For Investors",
  },
} as const;

export function StepCTA({ locale = "pt" }: { locale?: Locale }) {
  const t = COPY[locale];
  const foundersHref = locale === "en" ? "/en/contact" : "/fundadores";
  const investorsHref = locale === "en" ? "/en/contact" : "/investidores";

  return (
    <section className="bg-obsidian px-6 py-16 md:py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-champagne">
          {t.eyebrow}
        </p>
        <h2 className="text-metallic font-display font-normal leading-tight tracking-tight [font-size:clamp(1.75rem,3.5vw,3rem)]">
          {t.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-stone md:text-base">
          {t.subtitle}
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={foundersHref}
            className="glow-btn w-full px-10 py-4 text-sm sm:w-auto"
          >
            {t.founders} →
          </Link>
          <Link
            href={investorsHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-strong px-10 py-4 text-sm font-medium uppercase tracking-widest text-ivory transition-colors hover:border-champagne hover:text-champagne sm:w-auto"
          >
            {t.investors} →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
