import { Redis } from "@upstash/redis";
import {
  newsRedisConfigured,
  redisRestToken,
  redisRestUrl,
} from "./config";
import { newNewsId } from "./crypto";
import {
  isNewsMediaPath,
  newsMediaPublicPath,
} from "./media-path";
import { NEWS_FIELD_MAX, sanitizeHttpsUrl } from "./sanitize";

export {
  isNewsMediaPath,
  newsMediaPublicPath,
  newsMediaIdFromPath,
} from "./media-path";

const MAX_BYTES = 1_800_000; // ~1.8MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

let client: Redis | null = null;

function redis(): Redis {
  if (!newsRedisConfigured()) throw new Error("news_store_unavailable");
  if (!client) {
    const url = redisRestUrl();
    const token = redisRestToken();
    if (!url || !token) throw new Error("news_store_unavailable");
    client = new Redis({ url, token });
  }
  return client;
}

const KEYS = {
  bytes: (id: string) => `news:media:${id}:b64`,
  meta: (id: string) => `news:media:${id}:meta`,
} as const;

export type NewsMediaMeta = {
  contentType: string;
  bytes: number;
  createdAt: string;
  sourceUrl?: string | null;
};

/** Accept site media path or https URL. */
export function sanitizeNewsImageRef(raw: unknown): string | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  if (s.startsWith("/images/") && s.length <= NEWS_FIELD_MAX.url) {
    return s.slice(0, NEWS_FIELD_MAX.url);
  }
  if (isNewsMediaPath(s)) return s;
  return sanitizeHttpsUrl(s);
}

/**
 * Pull image URL from common n8n / RSS field names.
 */
export function pickIngestImageUrl(body: Record<string, unknown>): string | null {
  const candidates: unknown[] = [
    body.imageUrl,
    body.image_url,
    body.image,
    body.cover,
    body.coverUrl,
    body.cover_url,
    body.thumbnail,
    body.thumbnailUrl,
    body.enclosureUrl,
    body.enclosure_url,
  ];

  const enclosure = body.enclosure;
  if (enclosure && typeof enclosure === "object") {
    candidates.push((enclosure as { url?: unknown }).url);
  }
  const media = body.media;
  if (media && typeof media === "object") {
    candidates.push((media as { url?: unknown; content?: unknown }).url);
    candidates.push((media as { content?: unknown }).content);
  }

  for (const c of candidates) {
    const url = sanitizeHttpsUrl(c);
    if (url) return url;
  }
  return null;
}

function extractMetaContent(html: string, property: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
    "i",
  );
  const m = html.match(re) || html.match(re2);
  return m?.[1]?.trim() || null;
}

/** Fetch article page and read og:image / twitter:image (SSRF-hardened URL only). */
export async function fetchOgImage(pageUrl: string): Promise<string | null> {
  const safe = sanitizeHttpsUrl(pageUrl);
  if (!safe) return null;
  try {
    const res = await fetch(safe, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(8_000),
      headers: {
        "User-Agent": "HeadOverseaBot/1.0 (+https://headoversea.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) return null;
    const ctype = (res.headers.get("content-type") || "").toLowerCase();
    if (!ctype.includes("text/html") && !ctype.includes("application/xhtml")) {
      return null;
    }
    const html = (await res.text()).slice(0, 250_000);
    const raw =
      extractMetaContent(html, "og:image") ||
      extractMetaContent(html, "og:image:url") ||
      extractMetaContent(html, "twitter:image") ||
      extractMetaContent(html, "twitter:image:src");
    if (!raw) return null;
    // Resolve relative URLs against the page
    try {
      const abs = new URL(raw, safe).toString();
      return sanitizeHttpsUrl(abs);
    } catch {
      return sanitizeHttpsUrl(raw);
    }
  } catch {
    return null;
  }
}

export async function putNewsMedia(opts: {
  bytes: Buffer;
  contentType: string;
  sourceUrl?: string | null;
  id?: string;
}): Promise<{ id: string; path: string }> {
  let contentType = opts.contentType.toLowerCase().split(";")[0].trim();
  if (contentType === "image/jpg") contentType = "image/jpeg";
  if (!ALLOWED_TYPES.has(contentType)) {
    throw new Error("invalid_image_type");
  }
  if (opts.bytes.length < 32 || opts.bytes.length > MAX_BYTES) {
    throw new Error("invalid_image_size");
  }

  const id = opts.id || newNewsId();
  const meta: NewsMediaMeta = {
    contentType,
    bytes: opts.bytes.length,
    createdAt: new Date().toISOString(),
    sourceUrl: opts.sourceUrl ?? null,
  };

  const r = redis();
  const pipe = r.pipeline();
  pipe.set(KEYS.bytes(id), opts.bytes.toString("base64"));
  pipe.set(KEYS.meta(id), meta);
  await pipe.exec();

  return { id, path: newsMediaPublicPath(id) };
}

export async function getNewsMedia(
  id: string,
): Promise<{ bytes: Buffer; contentType: string } | null> {
  if (!/^[a-f0-9]{32}$/i.test(id)) return null;
  const r = redis();
  const [b64, meta] = await Promise.all([
    r.get<string>(KEYS.bytes(id)),
    r.get<NewsMediaMeta>(KEYS.meta(id)),
  ]);
  if (!b64 || typeof b64 !== "string" || !meta?.contentType) return null;
  try {
    const bytes = Buffer.from(b64, "base64");
    if (bytes.length < 32) return null;
    return { bytes, contentType: meta.contentType };
  } catch {
    return null;
  }
}

/** Download remote cover and store on our media CDN path. */
export async function persistRemoteImage(
  imageUrl: string,
): Promise<string | null> {
  const safe = sanitizeHttpsUrl(imageUrl);
  if (!safe) return null;
  try {
    const res = await fetch(safe, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
      headers: {
        "User-Agent": "HeadOverseaBot/1.0 (+https://headoversea.com)",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: new URL(safe).origin + "/",
      },
    });
    if (!res.ok) return null;
    let contentType = (res.headers.get("content-type") || "")
      .toLowerCase()
      .split(";")[0]
      .trim();
    if (contentType === "image/jpg") contentType = "image/jpeg";
    if (!ALLOWED_TYPES.has(contentType)) {
      // Guess from URL
      if (/\.png(\?|$)/i.test(safe)) contentType = "image/png";
      else if (/\.webp(\?|$)/i.test(safe)) contentType = "image/webp";
      else if (/\.gif(\?|$)/i.test(safe)) contentType = "image/gif";
      else contentType = "image/jpeg";
    }
    const len = Number(res.headers.get("content-length") || 0);
    if (len > MAX_BYTES) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > MAX_BYTES) return null;
    const stored = await putNewsMedia({
      bytes: buf,
      contentType,
      sourceUrl: safe,
    });
    return stored.path;
  } catch {
    return null;
  }
}

/**
 * Resolve cover for ingest: n8n fields → og:image → persist locally when possible.
 */
export async function resolveIngestCover(opts: {
  body: Record<string, unknown>;
  sourceUrl: string | null;
}): Promise<string | null> {
  let remote = pickIngestImageUrl(opts.body);
  if (!remote && opts.sourceUrl) {
    remote = await fetchOgImage(opts.sourceUrl);
  }
  if (!remote) return null;

  const hosted = await persistRemoteImage(remote);
  return hosted || remote;
}
