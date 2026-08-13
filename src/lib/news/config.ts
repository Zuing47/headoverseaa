/**
 * Server-only news config. Never import this module from client components.
 */

function req(name: string): string | null {
  const v = process.env[name]?.trim();
  return v || null;
}

export function newsRedisConfigured(): boolean {
  return Boolean(req("UPSTASH_REDIS_REST_URL") && req("UPSTASH_REDIS_REST_TOKEN"));
}

export function newsIngestKey(): string | null {
  const key = req("NEWS_INGEST_API_KEY");
  // Reject trivially weak keys
  if (!key || key.length < 32) return null;
  return key;
}

export function newsSessionSecret(): string | null {
  const s = req("NEWS_SESSION_SECRET");
  if (!s || s.length < 32) return null;
  return s;
}

/**
 * Format: email:bcryptHash,email:bcryptHash
 * Generate hash: node scripts/hash-news-password.mjs "senha-forte"
 */
export function newsAdminCredentials(): Map<string, string> {
  const raw = req("NEWS_ADMIN_CREDENTIALS");
  const map = new Map<string, string>();
  if (!raw) return map;
  for (const part of raw.split(",")) {
    const idx = part.indexOf(":");
    if (idx <= 0) continue;
    const email = part.slice(0, idx).trim().toLowerCase();
    const hash = part.slice(idx + 1).trim();
    if (!email.includes("@") || !hash.startsWith("$2")) continue;
    map.set(email, hash);
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
  if (!newsRedisConfigured()) {
    missing.push("UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN");
  }
  if (!newsIngestKey()) missing.push("NEWS_INGEST_API_KEY (≥32 chars)");
  if (!newsSessionSecret()) missing.push("NEWS_SESSION_SECRET (≥32 chars)");
  if (newsAdminCredentials().size === 0) {
    missing.push("NEWS_ADMIN_CREDENTIALS");
  }
  return { ok: missing.length === 0, missing };
}
