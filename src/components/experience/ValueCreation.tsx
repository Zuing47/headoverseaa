import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/experience/Reveal";
import type { SiteContent } from "@/types/content";

export function ValueCreation({ content }: { content: SiteContent }) {
  const { valueCreation } = content;

  return (
    <Section tone="obsidian" className="!py-14 md:!py-16">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Eyebrow>{valueCreation.eyebrow}</Eyebrow>
          <h2 className="text-metallic font-display font-normal leading-tight tracking-tight [font-size:clamp(1.6rem,3vw,2.5rem)]">
            {valueCreation.title}
          </h2>
          {valueCreation.intro && (
            <p className="mt-6 text-sm leading-relaxed text-stone md:text-base">
              {valueCreation.intro}
            </p>
          )}
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {valueCreation.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.12} className="h-full">
              <div className="flex h-full flex-col bg-obsidian p-8 md:p-10">
                <span className="font-mono text-xs text-champagne">0{i + 1}</span>
                <h3 className="mt-5 font-display text-xl font-normal text-ivory md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-stone">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
