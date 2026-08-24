import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rateLimit } from "@/lib/form-guard";
import { assertSameOrigin, getNewsSession } from "@/lib/news/auth";
import {
  NEWS_FIELD_MAX,
  parseLocale,
  stripToEditorialText,
  stripToPlainText,
} from "@/lib/news/sanitize";

export const runtime = "nodejs";
export const maxDuration = 60;

type ImproveBody = {
  title?: string;
  summary?: string;
  body?: string;
  category?: string;
  locale?: string;
  sourceName?: string;
  imageUrl?: string;
};

function aiConfigured(): boolean {
  return Boolean(
    process.env.OPENAI_API_KEY?.trim() || process.env.NEWS_AI_API_KEY?.trim(),
  );
}

/**
 * Expand / polish a pending news draft with AI (editorial length + **bold**).
 * Auth: news admin session + same-origin.
 * Does not persist — client applies to draft and user saves.
 */
export async function POST(request: Request) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const session = await getNewsSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (!aiConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "ai_unconfigured",
        hint: "Defina OPENAI_API_KEY (ou NEWS_AI_API_KEY) na Vercel e faça Redeploy.",
      },
      { status: 503 },
    );
  }

  const limited = rateLimit(`news-improve:${session.email}`, 20, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: ImproveBody;
  try {
    const text = await request.text();
    if (text.length > 120_000) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    body = JSON.parse(text) as ImproveBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const locale = parseLocale(body.locale);
  const title = stripToPlainText(body.title, NEWS_FIELD_MAX.title);
  const summary = stripToPlainText(body.summary, NEWS_FIELD_MAX.summary);
  const articleBody = stripToEditorialText(body.body, NEWS_FIELD_MAX.body);
  const category = stripToPlainText(body.category, NEWS_FIELD_MAX.category) || "News";
  const sourceName = stripToPlainText(body.sourceName, NEWS_FIELD_MAX.sourceName);
  const imageUrl = String(body.imageUrl ?? "").trim().slice(0, 2000);

  if (title.length < 8 && articleBody.length < 40) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const lang = locale === "en" ? "English" : "Portuguese (Brazil)";
  const system = `You are a senior financial editor for Head Oversea (private equity / real estate, Brazil–US).
Rewrite and EXPAND news into a fuller institutional article with a news-portal structure.
Rules:
- Output language: ${lang} only.
- Return ONLY valid JSON with keys: title, summary, body (no markdown fences).
- summary: 1–2 sentences dek/lead under the headline (max ~500 chars).
- body: 5 to 8 blocks separated by a blank line. Substantially longer than the input. Stay factual; do not invent numbers, quotes, or deals not implied by the source.
- Structure helpers (each on its own line/paragraph):
  - ## Subheading for 1–2 section titles
  - **bold** for key company/fund names (4–10 uses)
  - > pull-quote line for one key takeaway (optional)
  - - bullet items when listing points (optional)
- Do NOT use HTML.
- If an image URL is provided, you MAY insert at most ONE mid-article figure on its own line as: ![short caption](EXACT_URL) using that exact URL only. Never invent image URLs.
- Tone: serious, clear, institutional — not clickbait, not a clone of any specific news brand.`;

  const user = `Category: ${category}
Source outlet: ${sourceName || "n/a"}
Cover image URL (optional, reuse only this): ${imageUrl || "none"}

Current title:
${title}

Current summary:
${summary}

Current body:
${articleBody || summary || title}`;

  try {
    const client = new OpenAI({
      apiKey:
        process.env.OPENAI_API_KEY?.trim() ||
        process.env.NEWS_AI_API_KEY?.trim(),
    });
    const model =
      process.env.NEWS_AI_MODEL?.trim() || "gpt-4o-mini";

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.55,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const raw = completion.choices[0]?.message?.content || "";
    let parsed: { title?: string; summary?: string; body?: string };
    try {
      parsed = JSON.parse(raw) as {
        title?: string;
        summary?: string;
        body?: string;
      };
    } catch {
      return NextResponse.json({ ok: false, error: "ai_bad_json" }, { status: 502 });
    }

    const outTitle = stripToPlainText(parsed.title || title, NEWS_FIELD_MAX.title);
    const outSummary = stripToPlainText(
      parsed.summary || summary,
      NEWS_FIELD_MAX.summary,
    );
    const outBody = stripToEditorialText(
      parsed.body || articleBody,
      NEWS_FIELD_MAX.body,
    );

    if (outTitle.length < 8 || outBody.length < 80) {
      return NextResponse.json({ ok: false, error: "ai_too_short" }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      title: outTitle,
      summary: outSummary,
      body: outBody,
    });
  } catch (err) {
    console.error("[news-improve]", err);
    return NextResponse.json({ ok: false, error: "ai_failed" }, { status: 502 });
  }
}
