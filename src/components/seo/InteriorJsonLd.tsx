import type { Locale } from "@/types/content";
import { JsonLdScript } from "./JsonLdScript";
import {
  absoluteUrl,
  getPublicSiteUrl,
  homePathForLocale,
  organizationId,
  schemaInLanguage,
  websiteId,
} from "@/lib/site";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function homeCrumb(locale: Locale): BreadcrumbItem {
  return {
    name: "Home",
    path: homePathForLocale(locale),
  };
}

export function breadcrumbList(
  items: BreadcrumbItem[],
  origin = getPublicSiteUrl(),
) {
  return {
    "@type": "BreadcrumbList" as const,
    "@id": `${absoluteUrl(items[items.length - 1]?.path || "/", origin)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, origin),
    })),
  };
}

type InteriorJsonLdProps = {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  crumbs: BreadcrumbItem[];
  /** schema.org @type — WebPage, AboutPage, ContactPage, CollectionPage… */
  type?: string | string[];
  extra?: Record<string, unknown>[];
  faq?: { question: string; answer: string }[];
};

/**
 * WebPage + BreadcrumbList linked to Organization / WebSite @ids.
 */
export function InteriorJsonLd({
  locale,
  path,
  name,
  description,
  crumbs,
  type = "WebPage",
  extra = [],
  faq,
}: InteriorJsonLdProps) {
  const origin = getPublicSiteUrl();
  const url = absoluteUrl(path, origin);
  const trail = crumbs.length ? crumbs : [homeCrumb(locale)];
  const breadcrumb = trail.length >= 2 ? breadcrumbList(trail, origin) : null;

  const faqNode =
    faq && faq.length
      ? {
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: faqEntities(faq),
          inLanguage: schemaInLanguage(locale),
          isPartOf: { "@id": websiteId(origin) },
        }
      : null;

  const page = {
    "@type": type,
    "@id": url,
    url,
    name,
    description,
    inLanguage: schemaInLanguage(locale),
    isPartOf: { "@id": websiteId(origin) },
    about: { "@id": organizationId(origin) },
    publisher: { "@id": organizationId(origin) },
    ...(breadcrumb ? { breadcrumb: { "@id": breadcrumb["@id"] } } : {}),
    ...(faqNode ? { mainEntity: { "@id": faqNode["@id"] } } : {}),
  };

  const graph = [
    page,
    ...(breadcrumb ? [breadcrumb] : []),
    ...(faqNode ? [faqNode] : []),
    ...extra,
  ];

  return (
    <JsonLdScript
      id={`jsonld-page-${locale}-${path.replace(/\W+/g, "-")}`}
      data={{
        "@context": "https://schema.org",
        "@graph": graph,
      }}
    />
  );
}

export function faqEntities(
  items: { question: string; answer: string }[],
): Record<string, unknown>[] {
  return items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));
}
