import Image from "next/image";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/experience/Reveal";
import type { Locale } from "@/types/content";

const COPY = {
  pt: {
    eyebrow: "Case em destaque",
    company: "Riolaser",
    title: "De operação nos EUA a marca de referência no mercado.",
    blocks: [
      { label: "Situação", text: "Marca de estética a laser nos Estados Unidos, com modelo validado e potencial de consolidação — precisando de governança e disciplina operacional para escalar." },
      { label: "Tese", text: "Ownership ativo em private equity — governança formal e base operacional sólida no mercado americano." },
      { label: "Intervenção", text: "Reestruturação societária, board e reporting mensal, com a Head Oversea lado a lado da liderança." },
      { label: "Resultado", text: "Empresa estruturada, investível e com operação profissionalizada — pronta para o próximo ciclo de crescimento." },
    ],
    cta: "Ler o case completo",
  },
  en: {
    eyebrow: "Featured case",
    company: "Riolaser",
    title: "From U.S. operations to a reference brand in the market.",
    blocks: [
      { label: "Situation", text: "A laser aesthetics brand in the United States, with a validated model and consolidation potential — needing governance and operational discipline to scale." },
      { label: "Thesis", text: "Active ownership in private equity — formal governance and a solid operating base in the American market." },
      { label: "Intervention", text: "Corporate restructuring, a board and monthly reporting, with Head Oversea alongside leadership." },
      { label: "Result", text: "A structured, investable company with professionalized operations — ready for the next growth cycle." },
    ],
    cta: "Read the full case",
  },
} as const;

export function FeaturedCase({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const casesHref = locale === "en" ? "/en/cases" : "/cases";

  return (
    <Section tone="charcoal" className="!py-14 md:!py-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal x={-40} y={0}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border-strong">
              <Image
                src="/images/hero.jpg"
                alt={t.company}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <Reveal>
              <p className="font-display text-lg text-champagne">{t.company}</p>
              <h2 className="mt-2 font-display font-normal leading-tight tracking-tight text-ivory [font-size:clamp(1.6rem,3vw,2.4rem)]">
                {t.title}
              </h2>
            </Reveal>

            <div className="mt-8 flex flex-col gap-5">
              {t.blocks.map((b, i) => (
                <Reveal key={b.label} delay={i * 0.08} className="border-t border-border pt-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-champagne">
                    {b.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{b.text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-8">
              <Link
                href={casesHref}
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-champagne transition-colors hover:text-ivory"
              >
                {t.cta}
                <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
