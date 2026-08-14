import { slugify } from "./sanitize";
import { listPublished, publishLocaleTwin } from "./store";
import { translateNewsFields } from "./translate";
import type { NewsArticleRecord } from "./types";
import type { Locale } from "@/types/content";

function pairKey(article: NewsArticleRecord): string {
  return article.pairId || article.id;
}

function hasLocaleTwin(
  published: NewsArticleRecord[],
  source: NewsArticleRecord,
  locale: Locale,
): boolean {
  if (source.locale === locale) return true;
  const key = pairKey(source);
  return published.some(
    (p) =>
      p.locale === locale &&
      p.status === "published" &&
      p.id !== source.id &&
      (pairKey(p) === key || p.pairId === source.id || source.pairId === p.id),
  );
}

async function fieldsForTwin(
  source: NewsArticleRecord,
  otherLocale: Locale,
  mode: "translate" | "copy",
) {
  const base = {
    title: source.title,
    summary: source.summary,
    body: source.body,
    category: source.category,
  };
  if (mode === "copy") return base;

  try {
    const shortBody = source.body
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(0, 8)
      .join("\n\n");
    return await Promise.race([
      translateNewsFields(
        { ...base, body: shortBody || source.summary },
        source.locale,
        otherLocale,
      ),
      new Promise<typeof base>((_, reject) => {
        setTimeout(() => reject(new Error("translate_timeout")), 7_000);
      }),
    ]);
  } catch {
    return base;
  }
}

/**
 * Create opposite-locale twin. Translation is best-effort — on failure we still
 * publish the twin with the source text so both /insights and /en/insights list it.
 */
export async function ensureOppositeTwin(
  source: NewsArticleRecord,
  decidedBy: string,
  mode: "translate" | "copy" = "translate",
): Promise<NewsArticleRecord> {
  const otherLocale: Locale = source.locale === "pt" ? "en" : "pt";
  const fields = await fieldsForTwin(source, otherLocale, mode);

  return publishLocaleTwin({
    source,
    locale: otherLocale,
    title: fields.title,
    summary: fields.summary,
    body: fields.body,
    category: fields.category,
    slug: slugify(fields.title),
    decidedBy,
  });
}

/**
 * Instant repair for missing twins (copy source text). Keeps public pages fast;
 * approve path still tries real translation first.
 */
export async function backfillMissingTwins(limit = 4): Promise<number> {
  const published = await listPublished(100);
  let created = 0;

  for (const source of published) {
    if (created >= limit) break;
    if (source.status !== "published") continue;

    const other: Locale = source.locale === "pt" ? "en" : "pt";
    if (hasLocaleTwin(published, source, other)) continue;

    try {
      const twin = await ensureOppositeTwin(
        source,
        "system:twin-backfill",
        "copy",
      );
      published.push(twin);
      created += 1;
    } catch {
      // continue
    }
  }

  return created;
}
