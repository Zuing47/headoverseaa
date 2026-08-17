import type { Metadata } from "next";
import { alternateLocalePath, getLocaleFromPath } from "@/lib/content";
import {
  DEFAULT_OG_ALT,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  getPublicSiteUrl,
  isIndexableEnv,
  ogLocaleFromPath,
} from "@/lib/site";

/**
 * Canonical + hreflang alternates for a page, derived from its own path.
 * Relative paths resolve against `metadataBase` (set in the root layout).
 */
export function alternates(path: string): Metadata["alternates"] {
  const other = alternateLocalePath(path);
  const isPt = getLocaleFromPath(path) === "pt";
  const ptPath = isPt ? path : other;
  const enPath = isPt ? other : path;

  return {
    canonical: path,
    languages: {
      "pt-BR": ptPath,
      "en-US": enPath,
      "x-default": enPath,
    },
  };
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Open Graph / Twitter image path (defaults to existing skyline asset) */
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  /** Use for Insights articles */
  type?: "website" | "article";
  publishedTime?: string;
  robots?: Metadata["robots"];
};

function clampDescription(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= 160) return t;
  const cut = t.slice(0, 157);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

/** Per-page metadata with Open Graph, Twitter card, and hreflang. */
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
  keywords,
  type = "website",
  publishedTime,
  robots,
}: PageMetaInput): Metadata {
  const origin = getPublicSiteUrl();
  const url = absoluteUrl(path, origin);
  const desc = clampDescription(description);
  const ogLocale = ogLocaleFromPath(path);
  const indexable = isIndexableEnv();

  return {
    title:
      path === "/" || path === "/pt" || path === "/en"
        ? { absolute: title }
        : title,
    description: desc,
    ...(keywords?.length ? { keywords } : {}),
    alternates: alternates(path),
    robots: robots ?? {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: {
      type,
      url,
      locale: ogLocale,
      alternateLocale: ogLocale === "en_US" ? "pt_BR" : "en_US",
      title,
      description: desc,
      siteName: "Head Oversea",
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [image],
    },
  };
}
