import { Header } from "@/components/layout/Header";
import type { SiteContent, Locale } from "@/types/content";

interface ImmersiveNavProps {
  content: SiteContent;
  locale?: Locale;
}

/**
 * Thin wrapper so immersive pages share the exact same header as every other
 * page (solid black on scroll, same nav/logo/CTA) — no bespoke header design.
 */
export function ImmersiveNav({ content, locale = "pt" }: ImmersiveNavProps) {
  return <Header content={content} locale={locale} />;
}
