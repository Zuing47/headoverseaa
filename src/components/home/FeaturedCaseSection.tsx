"use client";

import Image from "next/image";
import type { SiteContent } from "@/types/content";
import { Reveal } from "./reveal";
import { SectionLabel, TextLink } from "./Editorial";
import { ImageReveal } from "@/components/pages/ImageReveal";

interface FeaturedCaseSectionProps {
  content: SiteContent;
}

export function FeaturedCaseSection({ content }: FeaturedCaseSectionProps) {
  const featured = content.home.featuredCase;

  const rows = [
    { label: "Context", text: featured.context },
    { label: "Thesis", text: featured.thesis },
    { label: "Action", text: featured.action },
    { label: "Result", text: featured.result },
  ];

  return (
    <section className="bg-[#f7f6f2] text-black">
      <div className="grid lg:grid-cols-12 lg:items-stretch">
        <ImageReveal className="relative min-h-[44vh] w-full bg-[#e8e6e1] lg:col-span-6 lg:min-h-[min(70vh,680px)]">
          <Image
            src={featured.image}
            alt={
              featured.company === "Riolaser"
                ? "Riolaser clinic exterior in the United States — Head Oversea private equity portfolio"
                : featured.company
            }
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            quality={95}
            priority
          />
        </ImageReveal>

        <div className="flex flex-col justify-center px-[var(--page-padding-mobile)] py-[clamp(3.25rem,7vw,4.75rem)] md:px-[var(--page-padding-tablet)] lg:col-span-6 lg:px-[var(--page-padding-desktop)] lg:pl-16 xl:pl-24">
          <Reveal>
            <SectionLabel>{featured.eyebrow}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mt-8 text-[clamp(2.6rem,4vw,3.85rem)]">
              {featured.company}
            </h2>
          </Reveal>

          <div className="mt-12 max-w-md space-y-0">
            {rows.map((row, i) => (
              <Reveal
                key={row.label}
                delay={0.12 + i * 0.05}
                className="border-t border-black/[0.08] py-6"
              >
                <p className="label-caps text-black/35">{row.label}</p>
                <p className="body-editorial mt-3 text-black/55">{row.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.32}>
            <div className="mt-10">
              <TextLink href={featured.href}>{featured.cta}</TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
