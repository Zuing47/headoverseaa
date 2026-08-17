/**
 * Canonical production host and environment-safe absolute URLs.
 * Preview/dev must not leak into indexable canonicals when Vercel env is set.
 */

export const PRODUCTION_HOST = "headoversea.com";
export const PRODUCTION_ORIGIN = `https://${PRODUCTION_HOST}`;

/** Default share image — file that exists in /public (do not use missing /og-nyc.jpg). */
export const DEFAULT_OG_IMAGE = "/images/us-skyline-presence.jpg";
export const DEFAULT_OG_ALT =
  "Head Oversea — Private Equity & Real Estate across Brazil and the United States";

export const ORG = {
  name: "Head Oversea",
  legalName: "Head Oversea",
  alternateName: "Head Oversea Private Equity & Real Estate",
  email: "contact@headoversea.com",
  telephone: "+1-689-777-1149",
  foundingDate: "2022",
  logoPath: "/logo-white.svg",
  sameAs: [
    "https://www.linkedin.com/company/headoversea",
    "https://www.instagram.com/headoversea",
  ],
  address: {
    streetAddress: "189 South Orange Ave, Ste 1250, South Tower",
    addressLocality: "Orlando",
    addressRegion: "FL",
    postalCode: "32801",
    addressCountry: "US",
  },
} as const;

function trimSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/** True only on Vercel Production (or local without VERCEL_ENV). */
export function isIndexableEnv(): boolean {
  const env = process.env.VERCEL_ENV?.trim();
  if (!env) return true;
  return env === "production";
}

/**
 * Absolute site origin.
 * Production always uses the public domain so preview URLs never become canonicals
 * when this is called from sitemap/robots in production.
 */
export function getSiteUrl(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEWS_SITE_URL?.trim();
  if (explicit) return trimSlash(explicit);

  if (process.env.VERCEL_ENV === "production") return PRODUCTION_ORIGIN;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  return PRODUCTION_ORIGIN;
}

/** Origin used in sitemap/robots/canonicals that must never be localhost or preview. */
export function getPublicSiteUrl(): string {
  if (!isIndexableEnv()) {
    const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (explicit) return trimSlash(explicit);
    return PRODUCTION_ORIGIN;
  }
  return getSiteUrl();
}

export function absoluteUrl(path: string, origin = getPublicSiteUrl()): string {
  if (!path || path === "/") return origin;
  if (path.startsWith("https://") || path.startsWith("http://")) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Locale from URL — mirrors getLocaleFromPath without importing content. */
export function localeFromPathname(pathname: string): "en" | "pt" {
  if (pathname === "/pt" || pathname.startsWith("/pt/")) return "pt";
  if (pathname === "/" || pathname.startsWith("/en")) return "en";
  return "pt";
}

export function htmlLangFromPathname(pathname: string): "en" | "pt-BR" {
  return localeFromPathname(pathname) === "en" ? "en" : "pt-BR";
}

export function ogLocaleFromPath(path: string): "en_US" | "pt_BR" {
  return localeFromPathname(path) === "en" ? "en_US" : "pt_BR";
}

export function schemaInLanguage(pathOrLocale: string): "en-US" | "pt-BR" {
  if (pathOrLocale === "en" || pathOrLocale === "pt") {
    return pathOrLocale === "en" ? "en-US" : "pt-BR";
  }
  return localeFromPathname(pathOrLocale) === "en" ? "en-US" : "pt-BR";
}

export function homePathForLocale(locale: "en" | "pt"): string {
  return locale === "en" ? "/" : "/pt";
}

export function organizationId(origin = getPublicSiteUrl()): string {
  return `${origin}/#organization`;
}

export function websiteId(origin = getPublicSiteUrl()): string {
  return `${origin}/#website`;
}
