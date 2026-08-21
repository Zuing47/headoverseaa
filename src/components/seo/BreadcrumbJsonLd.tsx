import { breadcrumbList, type BreadcrumbItem } from "./InteriorJsonLd";
import { getPublicSiteUrl } from "@/lib/site";
import { safeJsonLdStringify } from "@/lib/news/sanitize";

export type { BreadcrumbItem };

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
  id?: string;
};

/** @deprecated Prefer InteriorJsonLd which includes WebPage + breadcrumb. Kept for existing pages. */
export function BreadcrumbJsonLd({
  items,
  id = "jsonld-breadcrumb",
}: BreadcrumbJsonLdProps) {
  if (items.length < 2) return null;
  const schema = {
    "@context": "https://schema.org",
    ...breadcrumbList(items, getPublicSiteUrl()),
  };

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(schema) }}
    />
  );
}
