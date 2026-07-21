import type { Locale } from "@/types/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getContent } from "@/lib/content";

interface SiteShellProps {
  children: React.ReactNode;
  locale?: Locale;
}

export function SiteShell({ children, locale = "pt" }: SiteShellProps) {
  const content = getContent(locale);

  return (
    <>
      <Header content={content} locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer content={content} locale={locale} />
    </>
  );
}
