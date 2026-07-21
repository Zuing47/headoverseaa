"use client";

import { BackHero, BackShell } from "@/components/back";
import { CasesEditorial } from "@/components/pages/CasesEditorial";
import type { Locale, SiteContent } from "@/types/content";

interface CasesPageViewProps {
  content: SiteContent;
  locale: Locale;
  subtitle: string;
}

export function CasesPageView({
  content,
  locale,
  subtitle,
}: CasesPageViewProps) {
  return (
    <BackShell content={content} locale={locale}>
      <BackHero
        eyebrow={content.cases.eyebrow}
        title={content.cases.title}
        subtitle={subtitle}
      />

      <CasesEditorial content={content} locale={locale} />
    </BackShell>
  );
}
