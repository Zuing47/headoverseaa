/**
 * PT↔EN translation for bilingual publish (no API key).
 * Primary: Google gtx endpoint. Fallback: MyMemory.
 */

async function translateGoogle(
  text: string,
  from: "pt" | "en",
  to: "pt" | "en",
): Promise<string | null> {
  const q = text.trim();
  if (!q) return text;
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", from);
  url.searchParams.set("tl", to);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", q.slice(0, 4500));

  const res = await fetch(url.toString(), {
    method: "GET",
    signal: AbortSignal.timeout(12_000),
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data) || !Array.isArray(data[0])) return null;
  const parts: string[] = [];
  for (const row of data[0]) {
    if (Array.isArray(row) && typeof row[0] === "string") parts.push(row[0]);
  }
  const out = parts.join("").trim();
  return out || null;
}

async function translateMyMemory(
  text: string,
  from: "pt" | "en",
  to: "pt" | "en",
): Promise<string | null> {
  const q = text.trim();
  if (!q) return text;
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", q.slice(0, 450));
  url.searchParams.set("langpair", `${from}|${to}`);
  url.searchParams.set("de", "news@headoversea.com");

  const res = await fetch(url.toString(), {
    method: "GET",
    signal: AbortSignal.timeout(12_000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    responseData?: { translatedText?: string };
  };
  const out = data.responseData?.translatedText?.trim();
  if (!out || /MYMEMORY WARNING/i.test(out)) return null;
  return out;
}

async function translateChunk(
  text: string,
  from: "pt" | "en",
  to: "pt" | "en",
): Promise<string> {
  const q = text.trim();
  if (!q) return text;
  try {
    const g = await translateGoogle(q, from, to);
    if (g && g.toLowerCase() !== q.toLowerCase()) return g;
  } catch {
    // fall through
  }
  try {
    const m = await translateMyMemory(q, from, to);
    if (m) return m;
  } catch {
    // fall through
  }
  return text;
}

export async function translateNewsFields(
  fields: { title: string; summary: string; body: string; category: string },
  from: "pt" | "en",
  to: "pt" | "en",
  opts?: { maxParagraphs?: number },
): Promise<{ title: string; summary: string; body: string; category: string }> {
  if (from === to) return fields;

  const maxParas = opts?.maxParagraphs ?? 20;
  const paragraphs = fields.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, maxParas);

  // Sequential chunks — more reliable than blasting the free endpoint in parallel
  const title = await translateChunk(fields.title, from, to);
  const summary = await translateChunk(fields.summary || fields.title, from, to);
  const category = await translateChunk(fields.category || "News", from, to);
  const translatedParas: string[] = [];
  for (const p of paragraphs) {
    translatedParas.push(await translateChunk(p, from, to));
  }

  return {
    title,
    summary,
    body: translatedParas.join("\n\n") || summary,
    category,
  };
}

/** Heuristic: EN twin still in Portuguese (copy backfill). */
export function looksUntranslated(
  source: { title: string; body: string },
  twin: { title: string; body: string; locale: string },
): boolean {
  if (twin.locale !== "en") return false;
  if (twin.title.trim() === source.title.trim()) return true;
  // Common PT markers in an "English" article
  const sample = `${twin.title} ${twin.body.slice(0, 400)}`.toLowerCase();
  const ptHits = (
    sample.match(
      /\b(sobre|reuniões|taxa|divulga|para|com|não|estão|também|após|desde)\b/g,
    ) || []
  ).length;
  return ptHits >= 3;
}
