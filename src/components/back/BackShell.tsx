"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackContact } from "./BackContact";
import { InsightsSignup } from "@/components/home/InsightsSignup";
import { BACK_MEDIA } from "@/lib/back-media";
import type { Locale, SiteContent } from "@/types/content";

interface BackShellProps {
  content: SiteContent;
  locale: Locale;
  children: React.ReactNode;
  /** Append BackContact before footer */
  withContact?: boolean;
  contactImage?: string;
  /** light = black nav on white pages (e.g. Why Head Oversea hero) */
  headerSurface?: "dark" | "light";
  /** Newsletter band before footer — client request: every page */
  withNewsletter?: boolean;
}

/**
 * BACK page shell — for interiors in the Back style.
 * Home and Contact stay custom; everything else should prefer this.
 */
export function BackShell({
  content,
  locale,
  children,
  withContact = false,
  contactImage = BACK_MEDIA.manhattanIce,
  headerSurface = "dark",
  withNewsletter = true,
}: BackShellProps) {
  return (
    <main
      className={
        headerSurface === "light"
          ? "min-h-screen bg-white text-black"
          : "min-h-screen bg-black text-white"
      }
      style={{ overflowX: "clip" }}
    >
      <Header content={content} locale={locale} surface={headerSurface} />
      {children}
      {withNewsletter ? <InsightsSignup locale={locale} /> : null}
      {withContact ? (
        <BackContact locale={locale} image={contactImage} />
      ) : null}
      <Footer content={content} locale={locale} />
    </main>
  );
}
