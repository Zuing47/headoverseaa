"use client";

import Image from "next/image";
import Link from "next/link";
import { BackBand, BackLabel } from "./primitives";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";

export type BackTrackItem = {
  title: string;
  href: string;
  image: string;
  alt?: string;
  caption?: string;
};

interface BackTrackGridProps {
  eyebrow: string;
  title: string;
  items: BackTrackItem[];
}

/** BACK track record — white band, 3 image columns. */
export function BackTrackGrid({ eyebrow, title, items }: BackTrackGridProps) {
  return (
    <BackBand tone="white">
      <Reveal variant="rise">
        <BackLabel>{eyebrow}</BackLabel>
      </Reveal>
      <Reveal delay={0.08} variant="rise">
        <h2 className="font-display mt-6 max-w-[24ch] text-[clamp(1.9rem,3.2vw,2.65rem)] leading-[1.1]">
          {title}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-6">
        {items.slice(0, 3).map((item, i) => (
          <Reveal key={item.href} delay={0.1 + i * 0.08} variant="rise">
            <Link href={item.href} className="group block">
              <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-[#eee]">
                <Image
                  src={item.image}
                  alt={item.alt ?? item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  quality={90}
                />
              </ImageReveal>
              <h3 className="font-display mt-5 text-[1.3rem] leading-snug transition-opacity group-hover:opacity-65 md:text-[1.45rem]">
                {item.title}
              </h3>
              {item.caption ? (
                <p className="mt-3 text-[12px] leading-relaxed text-black/40">
                  {item.caption}
                </p>
              ) : null}
            </Link>
          </Reveal>
        ))}
      </div>
    </BackBand>
  );
}
