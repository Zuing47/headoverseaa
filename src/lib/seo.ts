import type { Metadata } from "next";
import { alternateLocalePath, getLocaleFromPath } from "@/lib/content";

const SITE_URL = "https://headoversea.com";
const DEFAULT_OG = "/og-nyc.jpg";

/**
 * Canonical + hreflang alternates for a page, derived from its own path.
 * Relative paths resolve against `metadataBase` (set in the root layout).
 * Pass the page's real path, e.g. `alternates("/servicos")` or
 * `alternates("/en/services")`.
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
  /** Open Graph / Twitter image path (defaults to NYC skyline share image) */
  image?: string;
  imageAlt?: string;
  keywords?: string[];
};

/** Per-page metadata with Open Graph, Twitter card, and hreflang. */
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG,
  imageAlt = "Head Oversea — Private Equity & Real Estate",
  keywords,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title:
      path === "/" || path === "/pt" || path === "/en"
        ? { absolute: title }
        : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: alternates(path),
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Head Oversea",
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
      description,
      images: [image],
    },
  };
}
