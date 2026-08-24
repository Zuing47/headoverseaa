import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/form-guard";
import { ingestAuthorized } from "@/lib/news/auth";
import { newsIngestKey, newsIngestReady, newsRedisConfigured } from "@/lib/news/config";
import { newNewsId } from "@/lib/news/crypto";
import { resolveIngestCover } from "@/lib/news/media";
import {
  NEWS_FIELD_MAX,
  parseLocale,
  sanitizeHttpsUrl,
  slugify,
  stripToEditorialText,
  stripToPlainText,
} from "@/lib/news/sanitize";
import { createPendingArticle, findByExternalId, purgeStalePendingArticles } from "@/lib/news/store";
import { PENDING_NEWS_TTL_MS } from "@/lib/news/authors";
import type { NewsArticleRecord, NewsIngestInput } from "@/lib/news/types";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * n8n / automation ingest — creates pending articles only.
 * Auth: Authorization: Bearer $NEWS_INGEST_API_KEY
 * Never publishes. Never returns secrets.
 *
 * Image: accepts imageUrl / image_url / image / enclosure…;
 * if missing, scrapes og:image from sourceUrl and hosts a copy when possible.
 */
export async function POST(request: Request) {
  const ready = newsIngestReady();
  if (!ready.ok || !newsRedisConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "news_system_unconfigured",
        missing: ready.missing,
      },
      { status: 503 },
    );
  }

  const ingestKey = newsIngestKey();
  if (!ingestKey || !ingestAuthorized(request, ingestKey)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  // Keep the approval queue clean even if nobody opens /admin/news.
  void purgeStalePendingArticles(PENDING_NEWS_TTL_MS).catch(() => undefined);

  const ip = clientIp(request);
  const limitedIp = rateLimit(`news-ingest-ip:${ip}`, 40, 60 * 60 * 1000);
  const limitedKey = rateLimit(`news-ingest-key`, 120, 60 * 60 * 1000);
  if (!limitedIp.ok || !limitedKey.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, error: "invalid_content_type" }, { status: 415 });
  }

  let body: NewsIngestInput & Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 100_000) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    body = JSON.parse(text) as NewsIngestInput & Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const title = stripToPlainText(body.title, NEWS_FIELD_MAX.title);
  if (title.length < 8) {
    return NextResponse.json({ ok: false, error: "invalid_title" }, { status: 400 });
  }

  const summary = stripToPlainText(body.summary, NEWS_FIELD_MAX.summary);
  const articleBody = stripToEditorialText(
    body.body || body.summary || title,
    NEWS_FIELD_MAX.body,
  );
  const category =
    stripToPlainText(body.category, NEWS_FIELD_MAX.category) || "News";
  const sourceName = stripToPlainText(body.sourceName, NEWS_FIELD_MAX.sourceName) || null;
  const sourceUrl = sanitizeHttpsUrl(body.sourceUrl);
  const locale = parseLocale(body.locale);
  const externalId =
    stripToPlainText(body.externalId, NEWS_FIELD_MAX.externalId) || null;

  if (externalId) {
    try {
      const existing = await findByExternalId(externalId);
      if (existing) {
        return NextResponse.json({
          ok: true,
          created: false,
          id: existing.id,
          status: existing.status,
          slug: existing.slug,
          imageUrl: existing.imageUrl,
        });
      }
    } catch {
      return NextResponse.json({ ok: false, error: "store_error" }, { status: 503 });
    }
  }

  let imageUrl: string | null = null;
  try {
    imageUrl = await resolveIngestCover({ body, sourceUrl });
  } catch {
    imageUrl = null;
  }

  const id = newNewsId();
  const now = new Date().toISOString();
  const slugBase = body.slug ? slugify(String(body.slug)) : slugify(title);

  const record: NewsArticleRecord = {
    id,
    status: "pending",
    locale,
    slug: slugBase,
    title,
    summary: summary || articleBody.slice(0, 280),
    body: articleBody,
    category,
    sourceUrl,
    sourceName,
    sourceLogoUrl: null,
    imageUrl,
    authorId: null,
    pairId: null,
    externalId,
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
    decidedBy: null,
    rejectReason: null,
    linkedinPostedAt: null,
  };

  try {
    const { article, created } = await createPendingArticle(record);
    return NextResponse.json(
      {
        ok: true,
        created,
        id: article.id,
        status: article.status,
        slug: article.slug,
        imageUrl: article.imageUrl,
      },
      { status: created ? 201 : 200 },
    );
  } catch {
    return NextResponse.json({ ok: false, error: "store_error" }, { status: 503 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
