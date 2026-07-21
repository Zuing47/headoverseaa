"use client";

import type { SiteContent } from "@/types/content";
import { Reveal } from "./reveal";
import { SectionLabel } from "./Editorial";
import { cn } from "@/lib/utils";

interface ValueCreationSectionProps {
  content: SiteContent;
}

export function ValueCreationSection({ content }: ValueCreationSectionProps) {
  const { valueCreation } = content.home;

  return (
    <section className="bg-black text-white">
      <div className="page-shell section-space-lg">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-7" variant="rise">
            <SectionLabel tone="light">{valueCreation.eyebrow}</SectionLabel>
            <h2 className="font-display mt-8 whitespace-pre-line text-[clamp(2.5rem,4.2vw,3.75rem)]">
              {valueCreation.title}
            </h2>
          </Reveal>
          {valueCreation.intro ? (
            <Reveal delay={0.1} variant="fade" className="lg:col-span-5">
              <p className="body-editorial max-w-[38ch] text-white/45 lg:ml-auto lg:text-right">
                {valueCreation.intro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-20 grid border-t border-white/[0.1] lg:mt-28 lg:grid-cols-3">
          {valueCreation.items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={0.08 + i * 0.1}
              variant="rise"
              className={cn(
                "py-12 lg:py-16",
                i > 0 && "border-t border-white/[0.1] lg:border-t-0 lg:border-l lg:pl-12",
                i < valueCreation.items.length - 1 && "lg:pr-12",
              )}
            >
              <p className="label-caps text-white/35">{item.number}</p>
              <h3 className="font-display mt-8 text-[1.85rem] md:text-[2.15rem]">
                {item.title}
              </h3>
              <p className="body-editorial mt-5 max-w-[32ch] text-white/45">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
