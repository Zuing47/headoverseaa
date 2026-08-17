import type { CaseStudy, Locale } from "@/types/content";
import { JsonLdScript } from "./JsonLdScript";
import { breadcrumbList, homeCrumb } from "./InteriorJsonLd";
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  getPublicSiteUrl,
  organizationId,
  schemaInLanguage,
  websiteId,
} from "@/lib/site";

export function CaseJsonLd({
  locale,
  item,
  path,
}: {
  locale: Locale;
  item: CaseStudy;
  path: string;
}) {
  const origin = getPublicSiteUrl();
  const url = absoluteUrl(path, origin);
  const casesPath = locale === "en" ? "/en/cases" : "/cases";
  const crumbs = [
    homeCrumb(locale),
    { name: locale === "en" ? "Portfolio" : "Portfólio", path: casesPath },
    { name: item.company, path },
  ];
  const breadcrumb = breadcrumbList(crumbs, origin);
  const image = item.image
    ? item.image.startsWith("http")
      ? item.image
      : absoluteUrl(item.image, origin)
    : absoluteUrl(DEFAULT_OG_IMAGE, origin);

  const article = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: item.headline || item.company,
    name: item.company,
    description: item.detail?.summary || item.description || item.headline,
    image: [image],
    author: { "@id": organizationId(origin) },
    publisher: { "@id": organizationId(origin) },
    mainEntityOfPage: { "@id": url },
    inLanguage: schemaInLanguage(locale),
    articleSection: item.category,
    about: {
      "@type": "Organization",
      name: item.company,
      ...(item.visitUrl ? { url: item.visitUrl } : {}),
      ...(item.instagramUrl ? { sameAs: [item.instagramUrl] } : {}),
    },
  };

  const page = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: `${item.company} | Head Oversea`,
    description: article.description,
    inLanguage: schemaInLanguage(locale),
    isPartOf: { "@id": websiteId(origin) },
    mainEntity: { "@id": `${url}#article` },
    publisher: { "@id": organizationId(origin) },
    breadcrumb: { "@id": breadcrumb["@id"] },
  };

  return (
    <JsonLdScript
      id={`jsonld-case-${item.id}`}
      data={{ "@context": "https://schema.org", "@graph": [page, article, breadcrumb] }}
    />
  );
}
