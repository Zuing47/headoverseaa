import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { FadeIn } from "@/components/motion/FadeIn";
import type { SiteContent, Locale } from "@/types/content";

interface AboutIntroProps {
  content: SiteContent;
  locale: Locale;
}

export function AboutIntro({ content, locale }: AboutIntroProps) {
  const aboutHref = locale === "en" ? "/en/about" : "/sobre";
  const label = locale === "en" ? "Read our story" : "Conheça nossa história";

  return (
    <Section tone="porcelain">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <Eyebrow className="text-champagne-deep">{content.about.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-light leading-tight text-ink md:text-4xl lg:text-[2.75rem]">
              {content.about.title}
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-ink-soft">
              {content.about.intro}
            </p>
            <Link
              href={aboutHref}
              className="group mt-10 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-champagne-deep"
            >
              {label}
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Media
              src="/images/about.jpg"
              alt={content.about.title}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full rounded-sm"
            />
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
