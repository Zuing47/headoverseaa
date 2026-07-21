"use client";

import Image from "next/image";
import type { SiteContent } from "@/types/content";
import { Reveal } from "./reveal";
import { SectionLabel, TextLink } from "./Editorial";
import { ImageReveal } from "@/components/pages/ImageReveal";

interface RealEstateBandProps {
  content: SiteContent;
}

export function RealEstateBand({ content }: RealEstateBandProps) {
  const { realEstate } = content.home;

  return (
    <section className="bg-off-white text-black">
      <div className="grid lg:grid-cols-12 lg:items-stretch">
        <div className="flex flex-col justify-center px-[var(--page-padding-mobile)] py-[clamp(3.25rem,7vw,4.75rem)] md:px-[var(--page-padding-tablet)] lg:col-span-5 lg:px-[var(--page-padding-desktop)] lg:pr-16">
          <Reveal>
            <SectionLabel>{realEstate.eyebrow}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <h2 className="font-display mt-8 whitespace-pre-line text-[clamp(2.6rem,4.5vw,4rem)]">
              {realEstate.title}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="body-editorial mt-8 max-w-[34ch] text-black/55">
              {realEstate.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12">
              <TextLink href={realEstate.href}>{realEstate.cta}</TextLink>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.08}
          variant="fade"
          className="relative min-h-[46vh] w-full lg:col-span-7 lg:min-h-[min(68vh,640px)]"
        >
          <ImageReveal className="absolute inset-0 min-h-[46vh] lg:min-h-full">
            <Image
              src={realEstate.image}
              alt="Luxury residential real estate asset — Head Oversea long-term real estate investments"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              quality={90}
            />
          </ImageReveal>
        </Reveal>
      </div>
    </section>
  );
}
