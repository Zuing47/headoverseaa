/**
 * Server-only news config. Never import this module from client components.
 */

function req(name: string): string | null {
  const v = process.env[name]?.trim();
  return v || null;
}

/** Upstash classic names OR Vercel KV integration names. */
export function redisRestUrl(): string | null {
  return req("UPSTASH_REDIS_REST_URL") || req("KV_REST_API_URL");
}

export function redisRestToken(): string | null {
  return req("UPSTASH_REDIS_REST_TOKEN") || req("KV_REST_API_TOKEN");
}

export function newsRedisConfigured(): boolean {
  return Boolean(redisRestUrl() && redisRestToken());
}

export function newsIngestKey(): string | null {
  const key = req("NEWS_INGEST_API_KEY");
  if (!key || key.length < 32) return null;
  return key;
}

export function newsSessionSecret(): string | null {
  const s = req("NEWS_SESSION_SECRET");
  if (!s || s.length < 32) return null;
  return s;
}

/**
 * Vercel treats `$` as env interpolation. Users often store bcrypt as `$$2b$$12$$...`.
 * Normalize that back to a real bcrypt hash.
 */
function normalizeBcryptHash(raw: string): string | null {
  let h = raw.trim().replace(/^["']|["']$/g, "");
  if (h.includes("$$")) {
    h = h.replace(/\$\$/g, "$");
  }
  if (!/^\$2[aby]?\$\d{2}\$/.test(h)) return null;
  return h;
}

/**
 * Preferred (Vercel-safe, no `$`):
 *   NEWS_ADMIN_EMAIL=marketing@headoversea.com
 *   NEWS_ADMIN_PASSWORD_HASH_B64=<base64 do hash bcrypt>
 *
 * Also supported:
 *   NEWS_ADMIN_PASSWORD_HASH (escape $ as $$ in Vercel)
 *   NEWS_ADMIN_CREDENTIALS=email:hash
 */
export function newsAdminCredentials(): Map<string, string> {
  const map = new Map<string, string>();

  const singleEmail = req("NEWS_ADMIN_EMAIL")?.toLowerCase();
  const b64 = req("NEWS_ADMIN_PASSWORD_HASH_B64");
  if (singleEmail?.includes("@") && b64) {
    try {
      const decoded = Buffer.from(b64, "base64").toString("utf8");
      const hash = normalizeBcryptHash(decoded);
      if (hash) map.set(singleEmail, hash);
    } catch {
      // ignore invalid base64
    }
  }

  const singleHash = req("NEWS_ADMIN_PASSWORD_HASH");
  if (singleEmail?.includes("@") && singleHash) {
    const hash = normalizeBcryptHash(singleHash);
    if (hash) map.set(singleEmail, hash);
  }

  const raw = req("NEWS_ADMIN_CREDENTIALS");
  if (raw) {
    for (const part of raw.split(",")) {
      const idx = part.indexOf(":");
      if (idx <= 0) continue;
      const email = part.slice(0, idx).trim().toLowerCase();
      const hash = normalizeBcryptHash(part.slice(idx + 1));
      if (!email.includes("@") || !hash) continue;
      map.set(email, hash);
    }
  }

  return map;
}

export function newsSiteUrl(): string {
  return (
    req("NEWS_SITE_URL") ||
    req("NEXT_PUBLIC_SITE_URL") ||
    "https://headoversea.com"
  ).replace(/\/$/, "");
}

export function newsSystemReady(): {
  ok: boolean;
  missing: string[];
} {
  const missing: string[] = [];

  if (!redisRestUrl()) {
    missing.push("UPSTASH_REDIS_REST_URL (ou KV_REST_API_URL)");
  }
  if (!redisRestToken()) {
    missing.push("UPSTASH_REDIS_REST_TOKEN (ou KV_REST_API_TOKEN)");
  }

  const ingest = req("NEWS_INGEST_API_KEY");
  if (!ingest) missing.push("NEWS_INGEST_API_KEY");
  else if (ingest.length < 32) {
    missing.push("NEWS_INGEST_API_KEY (precisa ter pelo menos 32 caracteres)");
  }

  const session = req("NEWS_SESSION_SECRET");
  if (!session) missing.push("NEWS_SESSION_SECRET");
  else if (session.length < 32) {
    missing.push("NEWS_SESSION_SECRET (precisa ter pelo menos 32 caracteres)");
  }

  if (newsAdminCredentials().size === 0) {
    missing.push(
      "NEWS_ADMIN_EMAIL + NEWS_ADMIN_PASSWORD_HASH_B64 (rode: npm run news:hash-password)",
    );
  }

  return { ok: missing.length === 0, missing };
}
