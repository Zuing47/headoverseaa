"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackContact } from "@/components/back";
import { InsightsSignup } from "@/components/home/InsightsSignup";
import type { Locale, SiteContent } from "@/types/content";

interface InteriorShellProps {
  content: SiteContent;
  locale: Locale;
  children: React.ReactNode;
  tone?: "light" | "dark";
  withCTA?: boolean;
  contactImage?: string;
  withNewsletter?: boolean;
}

/**
 * Interior shell — defaults to BACK contact close.
 * Prefer BackShell + BackHero for new estilo back pages.
 */
export function InteriorShell({
  content,
  locale,
  children,
  tone = "dark",
  withCTA = false,
  contactImage,
  withNewsletter = true,
}: InteriorShellProps) {
  return (
    <main
      className={
        tone === "light"
          ? "min-h-screen bg-white text-black"
          : "min-h-screen bg-black text-white"
      }
      style={{ overflowX: "clip" }}
    >
      <Header
        content={content}
        locale={locale}
        surface={tone === "light" ? "light" : "dark"}
      />
      {children}
      {withNewsletter ? <InsightsSignup locale={locale} /> : null}
      {withCTA ? (
        <BackContact locale={locale} image={contactImage} />
      ) : null}
      <Footer content={content} locale={locale} />
    </main>
  );
}
