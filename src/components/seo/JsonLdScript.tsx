/** SSR JSON-LD — present in the initial HTML for crawlers (no next/script delay). */
import { safeJsonLdStringify } from "@/lib/news/sanitize";

export function JsonLdScript({
  id,
  data,
}: {
  id: string;
  data: unknown;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(data) }}
    />
  );
}
