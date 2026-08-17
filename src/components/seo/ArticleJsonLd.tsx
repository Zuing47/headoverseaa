import type { Insight, Locale } from "@/types/content";
import { JsonLdScript } from "./JsonLdScript";
import { breadcrumbList, type BreadcrumbItem } from "./InteriorJsonLd";
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  getPublicSiteUrl,
  organizationId,
  schemaInLanguage,
  websiteId,
} from "@/lib/site";

const MONTH_MAP: Record<string, string> = {
  jan: "01",
  january: "01",
  fev: "02",
  feb: "02",
  february: "02",
  mar: "03",
  march: "03",
  abr: "04",
  apr: "04",
  april: "04",
  mai: "05",
  may: "05",
  jun: "06",
  june: "06",
  jul: "07",
  july: "07",
  ago: "08",
  aug: "08",
  august: "08",
  set: "09",
  sep: "09",
  sept: "09",
  september: "09",
  out: "10",
  oct: "10",
  october: "10",
  nov: "11",
  november: "11",
  dez: "12",
  dec: "12",
  december: "12",
};

function monthToken(raw: string): string | undefined {
  const key = raw.replace(/\./g, "").toLowerCase();
  return MONTH_MAP[key];
}

/**
 * Parse display dates without inventing a calendar day.
 * Month-only values stay YYYY-MM (valid ISO-8601).
 */
export function insightDatePublished(
  date: string | undefined,
  iso?: string | null,
): string | undefined {
  if (iso) {
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }
  if (!date) return undefined;
  const trimmed = date.trim();
  if (/^\d{4}-\d{2}(-\d{2})?(T.*)?$/.test(trimmed)) return trimmed;

  const isoTry = Date.parse(trimmed);
  if (!Number.isNaN(isoTry) && /[A-Za-z]{3,} \d{1,2}, \d{4}/.test(trimmed)) {
    return new Date(isoTry).toISOString();
  }

  const ptDay = trimmed.match(
    /^(\d{1,2})\s+de\s+([A-Za-zç\.]+)\.?\s+de\s+(\d{4})$/i,
  );
  if (ptDay) {
    const month = monthToken(ptDay[2]);
    if (month) {
      return `${ptDay[3]}-${month}-${ptDay[1].padStart(2, "0")}`;
    }
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 2) {
    const month = monthToken(parts[0]);
    const year = parts[1];
    if (month && /^\d{4}$/.test(year)) return `${year}-${month}`;
  }

  return undefined;
}

function articleImage(article: Insight, origin: string): string {
  if (!article.image) return absoluteUrl(DEFAULT_OG_IMAGE, origin);
  if (article.image.startsWith("http")) return article.image;
  return absoluteUrl(article.image, origin);
}

type ArticleJsonLdProps = {
  article: Insight;
  locale: Locale;
  path: string;
  crumbs: BreadcrumbItem[];
};

export function ArticleJsonLd({
  article,
  locale,
  path,
  crumbs,
}: ArticleJsonLdProps) {
  const origin = getPublicSiteUrl();
  const url = absoluteUrl(path, origin);
  const image = articleImage(article, origin);
  const published = insightDatePublished(article.date, article.dateIso);
  const inLanguage = schemaInLanguage(locale);
  const authorName = article.author?.trim() || "Head Oversea";
  const isWire = authorName.toLowerCase() !== "head oversea";

  const breadcrumb = crumbs.length >= 2 ? breadcrumbList(crumbs, origin) : null;

  const schema = {
    "@type": isWire ? "NewsArticle" : "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description ?? article.title,
    image: [image],
    ...(published ? { datePublished: published, dateModified: published } : {}),
    author: isWire
      ? { "@type": "Organization", name: authorName }
      : { "@id": organizationId(origin) },
    publisher: { "@id": organizationId(origin) },
    mainEntityOfPage: { "@id": url },
    inLanguage,
    isPartOf: { "@id": websiteId(origin) },
    articleSection: article.category,
  };

  const page = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: article.title,
    description: article.description ?? article.title,
    inLanguage,
    isPartOf: { "@id": websiteId(origin) },
    mainEntity: { "@id": `${url}#article` },
    publisher: { "@id": organizationId(origin) },
    ...(breadcrumb ? { breadcrumb: { "@id": breadcrumb["@id"] } } : {}),
  };

  const graph = [page, schema, ...(breadcrumb ? [breadcrumb] : [])];

  return (
    <JsonLdScript
      id={`jsonld-article-${article.slug}`}
      data={{ "@context": "https://schema.org", "@graph": graph }}
    />
  );
}
