import { Container, Section, Eyebrow, Divider } from "@/components/ui/Container";
import { FadeIn, TextReveal } from "@/components/motion/FadeIn";
import type { SiteContent } from "@/types/content";

interface PhilosophyProps {
  content: SiteContent;
}

export function Philosophy({ content }: PhilosophyProps) {
  return (
    <Section dark>
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{content.philosophy.eyebrow}</Eyebrow>
            <TextReveal
              text={content.philosophy.title}
              className="font-display text-5xl md:text-6xl font-light text-ivory"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7 space-y-10">
            <FadeIn>
              <p className="text-xl leading-relaxed text-stone md:text-2xl md:leading-relaxed">
                {content.philosophy.body}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <blockquote className="border-l border-champagne/40 pl-8 font-display text-2xl italic leading-snug text-ivory/90 md:text-3xl">
                {content.philosophy.thesis}
              </blockquote>
            </FadeIn>

            <Divider className="!my-12" />

            <div className="grid gap-10 sm:grid-cols-2">
              <FadeIn delay={0.15}>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-champagne-dim">
                  {content.philosophy.mission.label}
                </p>
                <p className="text-sm leading-relaxed text-stone">
                  {content.philosophy.mission.text}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-champagne-dim">
                  {content.philosophy.vision.label}
                </p>
                <p className="text-sm leading-relaxed text-stone">
                  {content.philosophy.vision.text}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
