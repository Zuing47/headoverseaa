import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/form-guard";
import { assertSameOrigin, getNewsSession } from "@/lib/news/auth";
import { newsRedisConfigured, newsSystemReady } from "@/lib/news/config";
import { NEWS_FIELD_MAX, stripToPlainText } from "@/lib/news/sanitize";
import { decideArticle } from "@/lib/news/store";

export const runtime = "nodejs";

type DecideBody = {
  id?: string;
  decision?: "approve" | "reject";
  rejectReason?: string;
};

/**
 * Approve or reject a pending article.
 * Approve → appears on /insights. Reject → never public.
 */
export async function POST(request: Request) {
  const ready = newsSystemReady();
  if (!ready.ok || !newsRedisConfigured()) {
    return NextResponse.json(
      { ok: false, error: "news_system_unconfigured" },
      { status: 503 },
    );
  }

  if (!assertSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const session = await getNewsSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const limited = rateLimit(`news-decide:${session.email}`, 60, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: DecideBody;
  try {
    const text = await request.text();
    if (text.length > 4_000) {
      return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
    }
    body = JSON.parse(text) as DecideBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const id = String(body.id ?? "").trim();
  if (!/^[a-f0-9]{32}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  const decision = body.decision;
  if (decision !== "approve" && decision !== "reject") {
    return NextResponse.json({ ok: false, error: "invalid_decision" }, { status: 400 });
  }

  const rejectReason =
    decision === "reject"
      ? stripToPlainText(body.rejectReason, NEWS_FIELD_MAX.rejectReason) || null
      : null;

  try {
    const article = await decideArticle({
      id,
      decision,
      decidedBy: session.email,
      rejectReason,
    });
    if (!article) {
      return NextResponse.json({ ok: false, error: "not_found_or_not_pending" }, { status: 404 });
    }
    return NextResponse.json({
      ok: true,
      id: article.id,
      status: article.status,
      slug: article.slug,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "store_error" }, { status: 503 });
  }
}
