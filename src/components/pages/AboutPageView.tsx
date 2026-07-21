"use client";

import Image from "next/image";
import { InteriorShell } from "@/components/pages/InteriorShell";
import { EditorialHero } from "@/components/pages/EditorialHero";
import { FeaturedVideo } from "@/components/pages/FeaturedVideo";
import { TextReveal } from "@/components/pages/TextReveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { TeamCarousel } from "@/components/pages/TeamCarousel";
import {
  MeridianLink,
  SectionLabel,
  TextLink,
} from "@/components/home/Editorial";
import type { Locale, SiteContent } from "@/types/content";

interface AboutPageViewProps {
  content: SiteContent;
  locale?: Locale;
}

/** About Us ? story, philosophy, and the people behind the equity. */
export function AboutPageView({
  content,
  locale = "pt",
}: AboutPageViewProps) {
  const { about, philosophy } = content;
  const en = locale === "en";
  const contactHref = en ? "/en/contact" : "/contato";

  return (
    <InteriorShell content={content} locale={locale} tone="light">
      {/* Our story first — light hero (avoids two black bands) */}
      <EditorialHero
        tone="light"
        density="roomy"
        eyebrow={en ? "Our story" : "Nossa história"}
        title={
          en ? "Built for long horizons." : "Feita para horizontes longos."
        }
        subtitle={about.history[0]}
      />

      {/* Story continues */}
      <section className="border-t border-black/[0.08] bg-white text-black">
        <div className="page-shell pb-[clamp(3rem,7vw,5rem)]">
          <div className="max-w-3xl space-y-8">
            {about.history.slice(1).map((paragraph, i) => (
              <TextReveal key={i} delay={0.06 + i * 0.06}>
                <p className="body-editorial text-black/55">{paragraph}</p>
              </TextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* High-value — dark band below story */}
      <section className="border-t border-white/[0.08] bg-black text-white">
        <div className="page-shell section-space-roomy">
          <TextReveal>
            <SectionLabel tone="light">
              {about.eyebrow}
            </SectionLabel>
          </TextReveal>
          <TextReveal delay={0.06}>
            <h2 className="font-display mt-8 max-w-[18ch] text-[clamp(2rem,3.6vw,3rem)] leading-[1.1]">
              {about.title}
            </h2>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="body-editorial mt-8 max-w-[42ch] text-white/55">
              {about.intro}
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Philosophy + larger portrait */}
      <section className="border-t border-black/[0.08] bg-white text-black">
        <div className="page-shell section-space-roomy">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <TextReveal>
                <SectionLabel tone="dark">{philosophy.eyebrow}</SectionLabel>
              </TextReveal>
              <TextReveal delay={0.06}>
                <p className="font-display mt-8 max-w-[28ch] text-[clamp(1.75rem,3.2vw,2.6rem)] leading-snug">
                  {philosophy.body}
                </p>
              </TextReveal>
              <TextReveal delay={0.1}>
                <p className="body-editorial mt-8 max-w-2xl italic text-black/45">
                  {philosophy.thesis}
                </p>
              </TextReveal>
              <div className="mt-16 grid gap-12 border-t border-black/[0.08] pt-12 md:grid-cols-2">
                <TextReveal>
                  <p className="label-caps text-black/35">
                    {philosophy.mission.label}
                  </p>
                  <p className="body-editorial mt-4 text-black/55">
                    {philosophy.mission.text}
                  </p>
                </TextReveal>
                <TextReveal delay={0.08}>
                  <p className="label-caps text-black/35">
                    {philosophy.vision.label}
                  </p>
                  <p className="body-editorial mt-4 text-black/55">
                    {philosophy.vision.text}
                  </p>
                </TextReveal>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <ImageReveal
                delay={0.08}
                className="relative aspect-[4/5] w-full overflow-hidden bg-[#111]"
              >
                <Image
                  src="/images/about-philosophy.jpg"
                  alt={
                    en
                      ? "Head Oversea leadership in session"
                      : "Time Head Oversea em sessão"
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                  quality={95}
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured media — Imersão Brasil × EUA */}
      <FeaturedVideo
        density="roomy"
        aspect="portrait"
        image="/images/about-featured.jpg"
        title={
          en
            ? "Building a firm that operates across Brazil and the United States."
            : "Construindo uma firma que opera entre Brasil e Estados Unidos."
        }
        body={
          en
            ? "A look at how Head Oversea brings partners, operators, and capital together — with presence in both markets and a long-term ownership mindset."
            : "Um olhar sobre como a Head Oversea une sócios, operadores e capital — com presença nos dois mercados e mentalidade de ownership de longo prazo."
        }
        cta={en ? "Watch video" : "Assistir vídeo"}
      />

      {/* Light — people behind the equity */}
      <section className="border-t border-black/[0.08] bg-white text-black">
        <div className="page-shell section-space-roomy">
          <TextReveal>
            <SectionLabel tone="dark">
              {en ? "The team" : "O time"}
            </SectionLabel>
          </TextReveal>
          <TextReveal delay={0.06}>
            <h2 className="font-display mt-8 max-w-2xl text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-black">
              {en
                ? "The people behind the equity."
                : "As pessoas por trás do equity."}
            </h2>
          </TextReveal>

          <div className="mt-14 md:mt-16">
            <TeamCarousel team={about.team} locale={locale} />
          </div>

          <TextReveal delay={0.12} className="mt-14">
            <TextLink href={contactHref} tone="dark">
              {en ? "Talk to us" : "Fale conosco"}
            </TextLink>
          </TextReveal>
        </div>
      </section>

      {/* Black ? close */}
      <section className="border-t border-white/10 bg-black text-white">
        <div className="page-shell py-[clamp(4.5rem,10vw,8rem)]">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <TextReveal>
                <SectionLabel tone="light">
                  {en ? "Engage" : "Relacionamento"}
                </SectionLabel>
              </TextReveal>
              <TextReveal delay={0.08}>
                <p className="font-display mt-7 max-w-[22ch] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.12]">
                  {en
                    ? "Ready to speak with the team."
                    : "Pronto para falar com o time."}
                </p>
              </TextReveal>
            </div>
            <TextReveal delay={0.14} className="lg:col-span-4 lg:col-start-9">
              <MeridianLink href={contactHref} tone="light">
                {en ? "Contact us" : "Fale conosco"}
              </MeridianLink>
            </TextReveal>
          </div>
        </div>
      </section>
    </InteriorShell>
  );
}
