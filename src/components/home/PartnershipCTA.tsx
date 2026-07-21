"use client";

import type { SiteContent } from "@/types/content";
import { Reveal } from "./reveal";
import { SectionLabel, TextLink } from "./Editorial";
import { MaskedText } from "@/components/motion/MaskedText";

interface PartnershipCTAProps {
  content: SiteContent;
}

/** Closing invite — black field, masked headline. */
export function PartnershipCTA({ content }: PartnershipCTAProps) {
  const { finalCta } = content.home;

  return (
    <section className="border-t border-white/[0.08] bg-black text-white">
      <div className="page-shell section-space-lg">
        <Reveal variant="fade">
          <SectionLabel tone="light">Partnership</SectionLabel>
        </Reveal>
        <MaskedText
          delay={0.08}
          className="font-display mt-8 max-w-3xl text-[clamp(2.4rem,4.5vw,3.75rem)] leading-[1.08]"
        >
          {finalCta.title}
        </MaskedText>

        <Reveal
          delay={0.28}
          variant="fadeUp"
          className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          <TextLink href={finalCta.foundersHref} tone="light">
            {finalCta.foundersLabel}
          </TextLink>
          <TextLink href={finalCta.investorsHref} tone="light">
            {finalCta.investorsLabel}
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}
