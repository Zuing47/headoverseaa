import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/experience/Reveal";

const PILLARS = [
  {
    title: "Governança ativa",
    text: "Entramos na sala de decisão — board, controles e disciplina de execução desde o primeiro trimestre.",
  },
  {
    title: "Internacionalização",
    text: "Estruturamos a operação e a presença nos Estados Unidos para transformar potencial em valor global.",
  },
  {
    title: "Capital & liquidez",
    text: "Preparamos a empresa para captação, M&A e o evento de liquidez — com valuation sustentado.",
  },
];

/** Light editorial intro — brings white into the home and states the thesis cleanly. */
export function HomeIntro() {
  return (
    <section className="bg-porcelain text-ink">
      <Container className="py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne-deep">
              Nossa tese
            </p>
            <h2 className="font-display mt-6 leading-[1.05] text-ink [font-size:clamp(2rem,4vw,3.4rem)]">
              Não investimos e esperamos. Construímos junto.
            </h2>
          </Reveal>
          <div className="lg:pt-2">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
                Assumimos posições de active ownership em empresas de médio porte e
                trabalhamos três alavancas em paralelo — governança, operação e capital —
                até transformá-las em ativos globais.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border-ink bg-border-ink sm:grid-cols-3">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={0.15 + i * 0.1}>
                  <div className="h-full bg-porcelain p-7">
                    <span className="font-mono text-xs text-champagne-deep">0{i + 1}</span>
                    <h3 className="font-display mt-4 text-lg text-ink">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <Link
                href="/tese"
                className="group mt-12 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-champagne-deep"
              >
                Conhecer a tese completa
                <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
