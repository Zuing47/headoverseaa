import type { Locale, SiteContent } from "@/types/content";
import { en } from "./en";
import { pt } from "./pt";

const content: Record<Locale, SiteContent> = { pt, en };

/** English is the site default. */
export function getContent(locale: Locale = "en"): SiteContent {
  return content[locale];
}

/**
 * Locale from pathname:
 * - `/` and `/en…` → English
 * - `/pt` and all other naked PT routes → Portuguese
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === "/pt" || pathname.startsWith("/pt/")) return "pt";
  if (pathname === "/" || pathname.startsWith("/en")) return "en";
  return "pt";
}

export function localizedPath(path: string, locale: Locale): string {
  if (locale === "en") {
    if (path === "/" || path === "/pt") return "/";
    return alternateLocalePath(path.startsWith("/en") ? path : path);
  }
  if (path === "/" || path === "/en") return "/pt";
  return alternateLocalePath(path.startsWith("/en") ? path : `/en${path === "/" ? "" : path}`);
}

const PT_TO_EN: Record<string, string> = {
  "/": "/pt", // not used for `/` which is EN — kept for safety
  "/pt": "/",
  "/real-estate": "/en/real-estate",
  "/private-equity": "/en/private-equity",
  "/cases": "/en/cases",
  "/time": "/en/about",
  "/sobre": "/en/about",
  "/servicos": "/en/services",
  "/contato": "/en/contact",
  "/insights": "/en/insights",
  "/por-que-head-oversea": "/en/why-head-oversea",
  "/tese": "/en/thesis",
  "/como-atuamos": "/en/how-we-work",
  "/fundadores": "/en/founders",
  "/investidores": "/en/investors",
  "/materiais": "/en/materials",
};

const EN_TO_PT: Record<string, string> = {
  "/": "/pt",
  "/en": "/pt",
  "/pt": "/",
  "/en/real-estate": "/real-estate",
  "/en/private-equity": "/private-equity",
  "/en/cases": "/cases",
  "/en/about": "/sobre",
  "/en/leadership": "/sobre",
  "/en/services": "/servicos",
  "/en/contact": "/contato",
  "/en/insights": "/insights",
  "/en/why-head-oversea": "/por-que-head-oversea",
  "/en/thesis": "/tese",
  "/en/how-we-work": "/como-atuamos",
  "/en/founders": "/fundadores",
  "/en/investors": "/investidores",
  "/en/materials": "/materiais",
};

const NEWS_PT_TO_EN: Record<string, string> = {
  "presenca-operacional-eua": "us-operational-presence",
  "riolaser-mercado-americano": "riolaser-us-market",
  "real-estate-dois-mercados": "real-estate-two-markets",
  "governanca-ativa-ownership": "active-governance-ownership",
};

const NEWS_EN_TO_PT: Record<string, string> = {
  "us-operational-presence": "presenca-operacional-eua",
  "riolaser-us-market": "riolaser-mercado-americano",
  "real-estate-two-markets": "real-estate-dois-mercados",
  "active-governance-ownership": "governanca-ativa-ownership",
};

/** Path in the other language for the language switcher / hreflang. */
export function alternateLocalePath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);

  const brandPt = pathname.match(/^\/cases\/([^/]+)$/);
  if (brandPt) return `/en/cases/${brandPt[1]}`;
  const brandEn = pathname.match(/^\/en\/cases\/([^/]+)$/);
  if (brandEn) return `/cases/${brandEn[1]}`;

  const newsPt = pathname.match(/^\/insights\/([^/]+)$/);
  if (newsPt) {
    return `/en/insights/${NEWS_PT_TO_EN[newsPt[1]] ?? newsPt[1]}`;
  }
  const newsEn = pathname.match(/^\/en\/insights\/([^/]+)$/);
  if (newsEn) {
    return `/insights/${NEWS_EN_TO_PT[newsEn[1]] ?? newsEn[1]}`;
  }

  if (locale === "pt") {
    if (pathname === "/pt") return "/";
    return PT_TO_EN[pathname] ?? "/";
  }

  if (pathname === "/" || pathname === "/en") return "/pt";
  return EN_TO_PT[pathname] ?? "/pt";
}

/** Home path for a locale. */
export function homePath(locale: Locale): string {
  return locale === "en" ? "/" : "/pt";
}
