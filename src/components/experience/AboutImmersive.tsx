import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/experience/Reveal";
import { AnimatedText } from "@/components/experience/AnimatedText";
import { GlowButton } from "@/components/experience/GlowButton";
import type { Locale } from "@/types/content";

const COPY = {
  pt: {
    title: "Nossa tese",
    text: "Identificamos empresas com modelos validados e as conduzimos na expansão, combinando equity, advisory e execução hands-on. Nosso objetivo é aumentar significativamente o valor desses negócios, transformando-os em líderes globais. Vamos construir algo duradouro juntos.",
    cta: "Falar com especialista",
    href: "/contato",
  },
  en: {
    title: "Our thesis",
    text: "We identify companies with validated models and guide them through expansion, combining equity, advisory, and hands-on execution. Our goal is to significantly increase the value of these businesses, turning them into global leaders. Let's build something enduring together.",
    cta: "Talk to a specialist",
    href: "/en/contact",
  },
} as const;

export function AboutImmersive({ locale = "pt" }: { locale?: Locale }) {
  const t = COPY[locale];
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-obsidian px-5 py-20 sm:px-8 md:px-10" style={{ overflowX: "clip" }}>
      {/* Corner marks — Head monogram in place of the reference's 3D toys. */}
      <Reveal delay={0.1} x={-80} y={0} duration={0.9} className="pointer-events-none absolute left-[1%] top-[4%] sm:left-[2%] md:left-[4%]">
        <Logo variant="mark" className="w-[120px] text-champagne/20 sm:w-[160px] md:w-[210px]" title="" />
      </Reveal>
      <Reveal delay={0.15} x={80} y={0} duration={0.9} className="pointer-events-none absolute right-[1%] top-[4%] sm:right-[2%] md:right-[4%]">
        <Logo variant="mark" className="w-[120px] text-champagne/20 sm:w-[160px] md:w-[210px]" title="" />
      </Reveal>
      <Reveal delay={0.25} x={-80} y={0} duration={0.9} className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <Logo variant="mark" className="w-[100px] text-champagne/15 sm:w-[140px] md:w-[180px]" title="" />
      </Reveal>
      <Reveal delay={0.3} x={80} y={0} duration={0.9} className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <Logo variant="mark" className="w-[130px] text-champagne/15 sm:w-[170px] md:w-[220px]" title="" />
      </Reveal>

      <div className="relative flex flex-col items-center gap-12 sm:gap-14">
        <div className="flex flex-col items-center gap-8 sm:gap-10">
          <Reveal
            as="h2"
            y={40}
            className="text-metallic font-display text-center font-light uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 4rem)" }}
          >
            {t.title}
          </Reveal>

          <AnimatedText
            text={t.text}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#d7e2ea] text-[clamp(1rem,2vw,1.35rem)]"
          />
        </div>

        <Reveal>
          <GlowButton href={t.href}>{t.cta}</GlowButton>
        </Reveal>
      </div>
    </section>
  );
}
