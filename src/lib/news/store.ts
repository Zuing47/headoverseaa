import { Redis } from "@upstash/redis";
import {
  newsRedisConfigured,
  redisRestToken,
  redisRestUrl,
} from "./config";
import type { NewsArticleRecord, NewsStatus } from "./types";

let client: Redis | null = null;

function redis(): Redis {
  if (!newsRedisConfigured()) {
    throw new Error("news_store_unavailable");
  }
  if (!client) {
    const url = redisRestUrl();
    const token = redisRestToken();
    if (!url || !token) throw new Error("news_store_unavailable");
    client = new Redis({ url, token });
  }
  return client;
}

const KEYS = {
  article: (id: string) => `news:article:${id}`,
  byStatus: (status: NewsStatus) => `news:status:${status}`,
  slug: (locale: string, slug: string) => `news:slug:${locale}:${slug}`,
  external: (externalId: string) => `news:ext:${externalId}`,
} as const;

export async function getArticleById(
  id: string,
): Promise<NewsArticleRecord | null> {
  const raw = await redis().get<NewsArticleRecord>(KEYS.article(id));
  return raw ?? null;
}

export async function getArticleBySlug(
  locale: string,
  slug: string,
): Promise<NewsArticleRecord | null> {
  const id = await redis().get<string>(KEYS.slug(locale, slug));
  if (!id) return null;
  return getArticleById(id);
}

export async function findByExternalId(
  externalId: string,
): Promise<NewsArticleRecord | null> {
  const id = await redis().get<string>(KEYS.external(externalId));
  if (!id) return null;
  return getArticleById(id);
}

export async function listByStatus(
  status: NewsStatus,
  limit = 50,
): Promise<NewsArticleRecord[]> {
  const ids = await redis().zrange<string[]>(KEYS.byStatus(status), 0, limit - 1, {
    rev: true,
  });
  if (!ids.length) return [];
  const pipeline = redis().pipeline();
  for (const id of ids) {
    pipeline.get(KEYS.article(id));
  }
  const rows = await pipeline.exec();
  const out: NewsArticleRecord[] = [];
  for (const row of rows) {
    if (row && typeof row === "object") {
      out.push(row as NewsArticleRecord);
    }
  }
  return out;
}

export async function listPublished(limit = 100): Promise<NewsArticleRecord[]> {
  return listByStatus("published", limit);
}

/**
 * Create pending article. Returns existing if externalId already seen (idempotent).
 */
export async function createPendingArticle(
  article: NewsArticleRecord,
): Promise<{ article: NewsArticleRecord; created: boolean }> {
  const r = redis();

  if (article.externalId) {
    const existing = await findByExternalId(article.externalId);
    if (existing) return { article: existing, created: false };
  }

  // Ensure unique slug — append short id if taken
  let slug = article.slug;
  const taken = await r.get(KEYS.slug(article.locale, slug));
  if (taken) {
    slug = `${article.slug}-${article.id.slice(0, 8)}`;
    article = { ...article, slug };
  }

  const score = Date.parse(article.createdAt) || Date.now();

  const pipe = r.pipeline();
  pipe.set(KEYS.article(article.id), article);
  pipe.zadd(KEYS.byStatus("pending"), { score, member: article.id });
  pipe.set(KEYS.slug(article.locale, article.slug), article.id);
  if (article.externalId) {
    pipe.set(KEYS.external(article.externalId), article.id);
  }
  await pipe.exec();

  return { article, created: true };
}

export async function decideArticle(opts: {
  id: string;
  decision: "approve" | "reject";
  decidedBy: string;
  rejectReason?: string | null;
}): Promise<NewsArticleRecord | null> {
  const current = await getArticleById(opts.id);
  if (!current || current.status !== "pending") return null;

  const now = new Date().toISOString();
  const next: NewsArticleRecord = {
    ...current,
    status: opts.decision === "approve" ? "published" : "rejected",
    updatedAt: now,
    publishedAt: opts.decision === "approve" ? now : null,
    decidedBy: opts.decidedBy,
    rejectReason:
      opts.decision === "reject" ? opts.rejectReason || null : null,
  };

  const score = Date.parse(current.createdAt) || Date.now();
  const r = redis();
  const pipe = r.pipeline();
  pipe.set(KEYS.article(next.id), next);
  pipe.zrem(KEYS.byStatus("pending"), next.id);
  pipe.zadd(KEYS.byStatus(next.status), { score, member: next.id });
  await pipe.exec();

  return next;
}

export type NewsArticlePatch = {
  title?: string;
  summary?: string;
  body?: string;
  category?: string;
  locale?: NewsArticleRecord["locale"];
  slug?: string;
  sourceName?: string | null;
  sourceUrl?: string | null;
  imageUrl?: string | null;
};

/** @deprecated use NewsArticlePatch */
export type NewsPendingPatch = NewsArticlePatch;

/** Update fields on pending or published articles (not rejected). */
export async function updateArticle(
  id: string,
  patch: NewsArticlePatch,
): Promise<NewsArticleRecord | null> {
  const current = await getArticleById(id);
  if (!current || current.status === "rejected") return null;

  const now = new Date().toISOString();
  const nextLocale = patch.locale ?? current.locale;
  let nextSlug = patch.slug ?? current.slug;

  if (current.locale !== nextLocale || current.slug !== nextSlug) {
    const taken = await redis().get<string>(KEYS.slug(nextLocale, nextSlug));
    if (taken && taken !== current.id) {
      nextSlug = `${nextSlug}-${current.id.slice(0, 8)}`;
    }
  }

  const next: NewsArticleRecord = {
    ...current,
    title: patch.title ?? current.title,
    summary: patch.summary ?? current.summary,
    body: patch.body ?? current.body,
    category: patch.category ?? current.category,
    locale: nextLocale,
    slug: nextSlug,
    sourceName:
      patch.sourceName !== undefined ? patch.sourceName : current.sourceName,
    sourceUrl:
      patch.sourceUrl !== undefined ? patch.sourceUrl : current.sourceUrl,
    imageUrl: patch.imageUrl !== undefined ? patch.imageUrl : current.imageUrl,
    updatedAt: now,
  };

  const r = redis();
  const pipe = r.pipeline();
  pipe.set(KEYS.article(next.id), next);

  if (current.locale !== next.locale || current.slug !== next.slug) {
    pipe.del(KEYS.slug(current.locale, current.slug));
    pipe.set(KEYS.slug(next.locale, next.slug), next.id);
  }

  await pipe.exec();
  return next;
}

/** Update fields on a pending article only. */
export async function updatePendingArticle(
  id: string,
  patch: NewsArticlePatch,
): Promise<NewsArticleRecord | null> {
  const current = await getArticleById(id);
  if (!current || current.status !== "pending") return null;
  return updateArticle(id, patch);
}

/** Permanently remove an article from the store and public indexes. */
export async function deleteArticle(id: string): Promise<NewsArticleRecord | null> {
  const current = await getArticleById(id);
  if (!current) return null;

  const r = redis();
  const pipe = r.pipeline();
  pipe.del(KEYS.article(current.id));
  pipe.zrem(KEYS.byStatus("pending"), current.id);
  pipe.zrem(KEYS.byStatus("published"), current.id);
  pipe.zrem(KEYS.byStatus("rejected"), current.id);
  pipe.del(KEYS.slug(current.locale, current.slug));
  if (current.externalId) {
    pipe.del(KEYS.external(current.externalId));
  }
  await pipe.exec();
  return current;
}
