"use client";

import Image from "next/image";
import type { SiteContent } from "@/types/content";
import { Reveal } from "./reveal";
import { SectionLabel, TextLink } from "./Editorial";
import { ImageReveal } from "@/components/pages/ImageReveal";

interface ThesisSectionProps {
  content: SiteContent;
}

export function ThesisSection({ content }: ThesisSectionProps) {
  const { thesis } = content.home;

  return (
    <section className="bg-white text-black">
      <div className="page-shell section-space-lg">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal variant="rise">
              <SectionLabel>{thesis.eyebrow}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} variant="rise">
              <h2 className="font-display mt-8 whitespace-pre-line text-[clamp(2.5rem,4.2vw,3.75rem)] text-black">
                {thesis.title}
              </h2>
            </Reveal>
            <Reveal delay={0.18} variant="fadeUp">
              <p className="body-editorial mt-8 max-w-[36ch] text-black/55">
                {thesis.body}
              </p>
            </Reveal>
            <Reveal delay={0.26} variant="fadeUp">
              <div className="mt-12">
                <TextLink href={thesis.href}>{thesis.cta}</TextLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ImageReveal className="aspect-[4/5] w-full bg-[#eceae4]" delay={0.08}>
              <Image
                src={thesis.image}
                alt={
                  thesis.eyebrow === "Nossa tese" || thesis.eyebrow === "Our thesis"
                    ? "Head Oversea investment team collaborating on private equity strategy"
                    : thesis.title.replace(/\n/g, " ")
                }
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                quality={90}
                priority
              />
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
