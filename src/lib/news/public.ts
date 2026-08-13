import type { Insight, Locale } from "@/types/content";
import { getContent } from "@/lib/content";
import { newsRedisConfigured } from "./config";
import { recordToInsight } from "./map";
import { getArticleBySlug, listPublished } from "./store";

export { recordToInsight } from "./map";

/** Public listing: static editorial pieces first, then approved dynamic news. */
export async function getPublicInsights(locale: Locale): Promise<Insight[]> {
  const staticItems = getContent(locale).insights.items;
  if (!newsRedisConfigured()) return staticItems;

  try {
    const published = await listPublished(80);
    const dynamic = published
      .filter((a) => a.locale === locale && a.status === "published")
      .map(recordToInsight);
    const seen = new Set(staticItems.map((i) => i.slug));
    const merged = [...staticItems];
    for (const item of dynamic) {
      if (seen.has(item.slug)) continue;
      seen.add(item.slug);
      merged.push(item);
    }
    return merged;
  } catch {
    return staticItems;
  }
}

export async function getPublicInsightBySlug(
  locale: Locale,
  slug: string,
): Promise<Insight | null> {
  const staticItem = getContent(locale).insights.items.find(
    (a) => a.slug === slug,
  );
  if (staticItem) return staticItem;
  if (!newsRedisConfigured()) return null;

  try {
    const article = await getArticleBySlug(locale, slug);
    if (!article || article.status !== "published") return null;
    if (article.locale !== locale) return null;
    return recordToInsight(article);
  } catch {
    return null;
  }
}
