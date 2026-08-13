import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { rateLimit } from "@/lib/form-guard";
import { assertSameOrigin, getNewsSession } from "@/lib/news/auth";
import { newsQueueReady, newsRedisConfigured } from "@/lib/news/config";
import { NEWS_FIELD_MAX, slugify, stripToPlainText } from "@/lib/news/sanitize";
import { decideArticle, publishLocaleTwin } from "@/lib/news/store";
import { translateNewsFields } from "@/lib/news/translate";

export const runtime = "nodejs";

type DecideBody = {
  id?: string;
  decision?: "approve" | "reject";
  rejectReason?: string;
};

function revalidateNews(slugPt?: string, slugEn?: string) {
  revalidatePath("/insights");
  revalidatePath("/en/insights");
  revalidatePath("/");
  revalidatePath("/pt");
  if (slugPt) revalidatePath(`/insights/${slugPt}`);
  if (slugEn) revalidatePath(`/en/insights/${slugEn}`);
}

/**
 * Approve or reject a pending article.
 * Approve → publishes source locale + automatic twin in the other language.
 */
export async function POST(request: Request) {
  const ready = newsQueueReady();
  if (!ready.ok || !newsRedisConfigured()) {
    return NextResponse.json(
      { ok: false, error: "news_system_unconfigured", missing: ready.missing },
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

    let twinSlug: string | undefined;
    if (decision === "approve") {
      const otherLocale = article.locale === "pt" ? "en" : "pt";
      try {
        const translated = await translateNewsFields(
          {
            title: article.title,
            summary: article.summary,
            body: article.body,
            category: article.category,
          },
          article.locale,
          otherLocale,
        );
        const twin = await publishLocaleTwin({
          source: article,
          locale: otherLocale,
          title: translated.title,
          summary: translated.summary,
          body: translated.body,
          category: translated.category,
          slug: slugify(translated.title),
          decidedBy: session.email,
        });
        twinSlug = twin.slug;
      } catch {
        // Source locale still published even if twin translation fails
      }

      revalidateNews(
        article.locale === "pt" ? article.slug : twinSlug,
        article.locale === "en" ? article.slug : twinSlug,
      );
      // Always refresh both listing pages
      revalidatePath("/insights");
      revalidatePath("/en/insights");
      revalidatePath(`/insights/${article.slug}`);
      revalidatePath(`/en/insights/${article.slug}`);
      if (twinSlug) {
        revalidatePath(`/insights/${twinSlug}`);
        revalidatePath(`/en/insights/${twinSlug}`);
      }
    }

    return NextResponse.json({
      ok: true,
      id: article.id,
      status: article.status,
      slug: article.slug,
      twinSlug: twinSlug ?? null,
      href:
        article.locale === "en"
          ? `/en/insights/${article.slug}`
          : `/insights/${article.slug}`,
      hrefEn:
        article.locale === "en"
          ? `/en/insights/${article.slug}`
          : twinSlug
            ? `/en/insights/${twinSlug}`
            : null,
      hrefPt:
        article.locale === "pt"
          ? `/insights/${article.slug}`
          : twinSlug
            ? `/insights/${twinSlug}`
            : null,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "store_error" }, { status: 503 });
  }
}
