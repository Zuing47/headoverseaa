/** SSR JSON-LD — present in the initial HTML for crawlers (no next/script delay). */
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
