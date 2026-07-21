import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { FadeIn, TextReveal } from "@/components/motion/FadeIn";
import type { SiteContent } from "@/types/content";

interface TeamProps {
  content: SiteContent;
  title?: string;
}

export function Team({ content, title = "Nossa equipe" }: TeamProps) {
  return (
    <Section dark>
      <Container>
        <div className="mb-16">
          <Eyebrow>{content.about.eyebrow}</Eyebrow>
          <TextReveal
            text={title}
            className="font-display text-4xl md:text-5xl font-light text-ivory"
          />
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {content.about.team.map((member, index) => (
            <FadeIn
              key={member.name}
              delay={index * 0.05}
              className="bg-charcoal p-8 group hover:bg-graphite transition-colors"
            >
              <div className="mb-6 aspect-[3/4] bg-slate relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="font-display text-5xl text-ivory/10 select-none">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <h3 className="font-display text-xl text-ivory">{member.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-stone">
                {member.role}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
