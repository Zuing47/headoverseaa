/**
 * Lightweight PT↔EN translation for bilingual publish (no API key).
 * Uses MyMemory public endpoint with paragraph chunking.
 */

async function translateChunk(
  text: string,
  from: "pt" | "en",
  to: "pt" | "en",
): Promise<string> {
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
  if (!res.ok) return text;
  const data = (await res.json()) as {
    responseData?: { translatedText?: string };
  };
  const out = data.responseData?.translatedText?.trim();
  if (!out || /MYMEMORY WARNING/i.test(out)) return text;
  return out;
}

export async function translateNewsFields(
  fields: { title: string; summary: string; body: string; category: string },
  from: "pt" | "en",
  to: "pt" | "en",
): Promise<{ title: string; summary: string; body: string; category: string }> {
  if (from === to) return fields;

  const paragraphs = fields.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 24);

  const [title, summary, category, ...translatedParas] = await Promise.all([
    translateChunk(fields.title, from, to),
    translateChunk(fields.summary || fields.title, from, to),
    translateChunk(fields.category || "News", from, to),
    ...paragraphs.map((p) => translateChunk(p, from, to)),
  ]);

  return {
    title,
    summary,
    body: translatedParas.join("\n\n") || summary,
    category,
  };
}
