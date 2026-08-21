/**
 * Server-only news config. Never import this module from client components.
 */

/** Default marketing login email (override with NEWS_ADMIN_EMAIL). */
const DEFAULT_ADMIN_EMAIL = "marketing@headoversea.com";

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

export function newsAdminEmail(): string {
  const e = req("NEWS_ADMIN_EMAIL")?.toLowerCase();
  if (e?.includes("@")) return e;
  return DEFAULT_ADMIN_EMAIL;
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

/** True when at least one server-side password source is configured (no hardcoded bootstrap). */
export function newsAdminPasswordConfigured(): boolean {
  if (newsAdminPasswordPlain()) return true;
  if (newsAdminPasswordSha256()) return true;
  if (newsAdminCredentials().size > 0) return true;
  return false;
}

export function isAllowedAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  if (normalized === newsAdminEmail()) return true;
  if (normalized === DEFAULT_ADMIN_EMAIL) return true;
  if (newsAdminCredentials().has(normalized)) return true;
  return false;
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

/** Admin queue / approve / reject — only needs Redis (auth is session cookie). */
export function newsQueueReady(): {
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
  return { ok: missing.length === 0, missing };
}

/** Safe Redis diagnostics — no secret values. Authenticated admin only. */
export function newsRedisDiagnostics(): string[] {
  const notes: string[] = [];
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();

  if (!process.env.UPSTASH_REDIS_REST_URL?.trim() && !process.env.KV_REST_API_URL?.trim()) {
    notes.push("Redis URL: não encontrada (UPSTASH_REDIS_REST_URL ou KV_REST_API_URL)");
  } else if (!url) {
    notes.push("Redis URL: vazia");
  } else if (!url.startsWith("https://")) {
    notes.push("Redis URL: deve começar com https://");
  } else {
    notes.push("Redis URL: ok");
  }

  if (!process.env.UPSTASH_REDIS_REST_TOKEN?.trim() && !process.env.KV_REST_API_TOKEN?.trim()) {
    notes.push("Redis TOKEN: não encontrado (UPSTASH_REDIS_REST_TOKEN ou KV_REST_API_TOKEN)");
  } else if (!token) {
    notes.push("Redis TOKEN: vazio");
  } else {
    notes.push(`Redis TOKEN: ok (len=${token.length})`);
  }

  return notes;
}

/** Safe diagnostics for the login page — never includes secret values. */
export function newsAdminAuthDiagnostics(): string[] {
  const notes: string[] = [];
  notes.push(`Login email ativo: ${newsAdminEmail()}`);
  if (newsAdminPasswordPlain()) {
    notes.push("NEWS_ADMIN_PASSWORD: ok (env)");
  } else if (newsAdminPasswordSha256()) {
    notes.push("NEWS_ADMIN_PASSWORD_SHA256: ok (env)");
  } else if (newsAdminCredentials().size > 0) {
    notes.push("NEWS_ADMIN_CREDENTIALS / HASH: ok (env)");
  } else {
    notes.push(
      "Senha: NÃO configurada — defina NEWS_ADMIN_PASSWORD ou NEWS_ADMIN_PASSWORD_SHA256 na Vercel",
    );
  }

  const shaRaw = process.env.NEWS_ADMIN_PASSWORD_SHA256;
  if (shaRaw?.trim() && !newsAdminPasswordSha256()) {
    notes.push(
      "AVISO: NEWS_ADMIN_PASSWORD_SHA256 inválido — apague essa variável na Vercel",
    );
  }
  return notes;
}

export function newsAdminAuthConfigured(): boolean {
  return newsAdminPasswordConfigured();
}

export function newsLoginReady(): {
  ok: boolean;
  missing: string[];
} {
  const missing: string[] = [];
  const session = req("NEWS_SESSION_SECRET");
  if (!session) missing.push("NEWS_SESSION_SECRET (≥32 chars)");
  else if (session.length < 32) {
    missing.push("NEWS_SESSION_SECRET (precisa ter pelo menos 32 caracteres)");
  }
  if (!newsAdminPasswordConfigured()) {
    missing.push(
      "NEWS_ADMIN_PASSWORD ou NEWS_ADMIN_PASSWORD_SHA256 ou NEWS_ADMIN_CREDENTIALS",
    );
  }
  return { ok: missing.length === 0, missing };
}

export function newsSystemReady(): {
  ok: boolean;
  missing: string[];
} {
  const missing = [
    ...newsIngestReady().missing,
    ...newsLoginReady().missing,
  ];
  return { ok: missing.length === 0, missing: [...new Set(missing)] };
}
