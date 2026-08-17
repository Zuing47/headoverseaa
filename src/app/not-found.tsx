import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getContent } from "@/lib/content";
import { localeFromPathname } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const pathname = (await headers()).get("x-pathname") || "/";
  const locale = localeFromPathname(pathname);
  const en = locale === "en";
  const content = getContent(locale);
  const home = en ? "/" : "/pt";

  const links = en
    ? [
        { href: "/", label: "Home" },
        { href: "/en/private-equity", label: "Private Equity" },
        { href: "/en/real-estate", label: "Real Estate" },
        { href: "/en/cases", label: "Portfolio" },
        { href: "/en/insights", label: "News" },
        { href: "/en/contact", label: "Contact" },
      ]
    : [
        { href: "/pt", label: "Home" },
        { href: "/private-equity", label: "Private Equity" },
        { href: "/real-estate", label: "Real Estate" },
        { href: "/cases", label: "Portfólio" },
        { href: "/insights", label: "Notícias" },
        { href: "/contato", label: "Contato" },
      ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Header content={content} locale={locale} />
      <section className="page-shell pb-24 pt-32 md:pt-40">
        <p className="label-caps text-white/40">404</p>
        <h1 className="font-display mt-6 max-w-[18ch] text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.05]">
          {en ? "This page is not available." : "Esta página não está disponível."}
        </h1>
        <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-white/55">
          {en
            ? "The address may have changed. Continue from one of the pages below."
            : "O endereço pode ter mudado. Siga por uma das páginas abaixo."}
        </p>
        <ul className="mt-12 flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-14">
          <Link href={home} className="label-caps text-white/45 transition-colors hover:text-white">
            ← {en ? "Back to Home" : "Voltar para a Home"}
          </Link>
        </p>
      </section>
      <Footer content={content} locale={locale} />
    </main>
  );
}
