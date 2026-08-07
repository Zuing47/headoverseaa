import Script from "next/script";
import type { Insight, Locale } from "@/types/content";

const SITE_URL = "https://headoversea.com";

const MONTH_MAP: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  Abr: "04",
  May: "05",
  Mai: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Ago: "08",
  Sep: "09",
  Set: "09",
  Oct: "10",
  Out: "10",
  Nov: "11",
  Dec: "12",
};

/** Parse display dates like "Jun 2026" / "Mai 2026" into ISO YYYY-MM-DD. */
export function insightDatePublished(date: string): string {
  const parts = date.trim().split(/\s+/);
  if (parts.length >= 2) {
    const month = MONTH_MAP[parts[0]];
    const year = parts[1];
    if (month && /^\d{4}$/.test(year)) {
      return `${year}-${month}-01`;
    }
  }
  return `${new Date().getFullYear()}-01-01`;
}

type ArticleJsonLdProps = {
  article: Insight;
  locale: Locale;
  path: string;
};

export function ArticleJsonLd({ article, locale, path }: ArticleJsonLdProps) {
  const url = `${SITE_URL}${path}`;
  const image = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `${SITE_URL}${article.image}`
    : `${SITE_URL}/og-nyc.jpg`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description ?? article.title,
    image: [image],
    datePublished: insightDatePublished(article.date),
    dateModified: insightDatePublished(article.date),
    author: {
      "@type": "Organization",
      name: article.author ?? "Head Oversea",
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: locale === "en" ? "en-US" : "pt-BR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    articleSection: article.category,
  };

  return (
    <Script
      id={`jsonld-article-${article.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
