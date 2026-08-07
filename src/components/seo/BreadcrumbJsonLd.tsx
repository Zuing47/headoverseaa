import Script from "next/script";

const SITE_URL = "https://headoversea.com";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
  id?: string;
};

/** BreadcrumbList for multi-level pages (insights, cases, sections). */
export function BreadcrumbJsonLd({
  items,
  id = "jsonld-breadcrumb",
}: BreadcrumbJsonLdProps) {
  if (items.length < 2) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
