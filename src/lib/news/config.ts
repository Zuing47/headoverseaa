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

export function newsAdminEmail(): string | null {
  const e = req("NEWS_ADMIN_EMAIL")?.toLowerCase();
  return e?.includes("@") ? e : null;
}

/** Simplest: plaintext password in Vercel env (Sensitive). */
export function newsAdminPasswordPlain(): string | null {
  const p = req("NEWS_ADMIN_PASSWORD");
  if (!p || p.length < 8) return null;
  return p;
}

export function newsAdminPasswordSha256(): string | null {
  let h = req("NEWS_ADMIN_PASSWORD_SHA256");
  if (!h) return null;
  h = h.replace(/^["']|["']$/g, "").replace(/\s+/g, "").toLowerCase();
  if (h.startsWith("0x")) h = h.slice(2);
  if (!/^[a-f0-9]{64}$/.test(h)) return null;
  return h;
}

export function isAllowedAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  if (newsAdminEmail() === normalized) return true;
  if (newsAdminCredentials().has(normalized)) return true;
  return false;
}

/**
 * bcrypt map — B64 wins over legacy vars.
 */
export function newsAdminCredentials(): Map<string, string> {
  const map = new Map<string, string>();

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

  const singleEmail = newsAdminEmail();
  const singleHash = req("NEWS_ADMIN_PASSWORD_HASH");
  if (singleEmail && singleHash) {
    const hash = normalizeBcryptHash(singleHash);
    if (hash) map.set(singleEmail, hash);
  }

  const b64 = req("NEWS_ADMIN_PASSWORD_HASH_B64");
  if (singleEmail && b64) {
    try {
      const decoded = Buffer.from(b64.replace(/\s/g, ""), "base64").toString(
        "utf8",
      );
      const hash = normalizeBcryptHash(decoded);
      if (hash) map.set(singleEmail, hash);
    } catch {
      // ignore
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

export function newsIngestReady(): {
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
  return { ok: missing.length === 0, missing };
}

/** Safe diagnostics for the login page — never includes secret values. */
export function newsAdminAuthDiagnostics(): string[] {
  const notes: string[] = [];
  const emailRaw = process.env.NEWS_ADMIN_EMAIL;
  if (!emailRaw?.trim()) notes.push("NEWS_ADMIN_EMAIL: não encontrada no deploy");
  else if (!newsAdminEmail()) {
    notes.push(
      `NEWS_ADMIN_EMAIL: valor inválido (len=${emailRaw.trim().length})`,
    );
  } else notes.push("NEWS_ADMIN_EMAIL: ok");

  const plainRaw = process.env.NEWS_ADMIN_PASSWORD;
  if (!plainRaw?.trim()) notes.push("NEWS_ADMIN_PASSWORD: não encontrada");
  else if (!newsAdminPasswordPlain()) {
    notes.push(
      `NEWS_ADMIN_PASSWORD: muito curta (mín. 8, len=${plainRaw.trim().length})`,
    );
  } else notes.push("NEWS_ADMIN_PASSWORD: ok");

  const shaRaw = process.env.NEWS_ADMIN_PASSWORD_SHA256;
  if (!shaRaw?.trim()) notes.push("NEWS_ADMIN_PASSWORD_SHA256: não encontrada");
  else if (!newsAdminPasswordSha256()) {
    const cleaned = shaRaw.trim().replace(/\s+/g, "");
    notes.push(
      `NEWS_ADMIN_PASSWORD_SHA256: formato inválido (precisa 64 hex; len=${cleaned.length})`,
    );
  } else notes.push("NEWS_ADMIN_PASSWORD_SHA256: ok");

  return notes;
}

export function newsAdminAuthConfigured(): boolean {
  if (!newsAdminEmail()) return false;
  if (newsAdminPasswordPlain()) return true;
  if (newsAdminPasswordSha256()) return true;
  if (newsAdminCredentials().size > 0) return true;
  return false;
}

export function newsSystemReady(): {
  ok: boolean;
  missing: string[];
} {
  const missing: string[] = [...newsIngestReady().missing];

  const session = req("NEWS_SESSION_SECRET");
  if (!session) missing.push("NEWS_SESSION_SECRET");
  else if (session.length < 32) {
    missing.push("NEWS_SESSION_SECRET (precisa ter pelo menos 32 caracteres)");
  }

  if (!newsAdminAuthConfigured()) {
    missing.push(
      "NEWS_ADMIN_EMAIL + NEWS_ADMIN_PASSWORD (texto da senha, mais simples)",
    );
  }

  return { ok: missing.length === 0, missing };
}
