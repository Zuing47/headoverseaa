import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/form-guard";
import { ingestAuthorized } from "@/lib/news/auth";
import { newsIngestKey, newsIngestReady, newsRedisConfigured } from "@/lib/news/config";
import { markLinkedInPosted } from "@/lib/news/store";

export const runtime = "nodejs";

/**
 * n8n — mark a published article as posted on LinkedIn.
 * Auth: Authorization: Bearer $NEWS_INGEST_API_KEY
 *
 * POST /api/news/linkedin/posted
 * Body: { "id": "<article-id>" }
 */
export async function POST(request: Request) {
  const ready = newsIngestReady();
  if (!ready.ok || !newsRedisConfigured()) {
    return NextResponse.json(
      { ok: false, error: "news_system_unconfigured", missing: ready.missing },
      { status: 503 },
    );
  }

  const ingestKey = newsIngestKey();
  if (!ingestKey || !ingestAuthorized(request, ingestKey)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const ip = clientIp(request);
  const limited = rateLimit(`news-li-posted:${ip}`, 120, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: { id?: unknown };
  try {
    body = (await request.json()) as { id?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id.trim() : "";
  if (!id || id.length > 80) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  try {
    const article = await markLinkedInPosted(id);
    if (!article) {
      return NextResponse.json(
        { ok: false, error: "not_found_or_not_published" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: article.id,
      linkedinPostedAt: article.linkedinPostedAt,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "store_error" }, { status: 503 });
  }
}
