/**
 * Shared lead-form validation + light anti-spam helpers.
 */

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
}

/** Keep only digits (and a leading + for intl). */
export function sanitizePhoneInput(raw: string) {
  const cleaned = raw.replace(/[^\d+]/g, "");
  if (!cleaned) return "";
  const hasPlus = cleaned.startsWith("+");
  const digits = cleaned.replace(/\D/g, "").slice(0, 15);
  return hasPlus ? `+${digits}` : digits;
}

/** Empty is ok (optional). If filled, need 8–15 digits. */
export function isValidPhone(phone: string) {
  if (!phone.trim()) return true;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

/** Clamp free-text lead fields — reject oversized payloads early. */
export function clampField(raw: unknown, max: number): string {
  return String(raw ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export type SpamCheck =
  | { spam: false }
  | { spam: true; reason: "honeypot" | "too_fast" | "missing_timing" };

/** Honeypot / timing checks for lead forms. */
export function checkSpam(opts: {
  honeypot?: string;
  formStartedAt?: number | string;
  minMs?: number;
}): SpamCheck {
  if (String(opts.honeypot ?? "").trim()) {
    return { spam: true, reason: "honeypot" };
  }
  const started = Number(opts.formStartedAt);
  if (!Number.isFinite(started) || started <= 0) {
    return { spam: true, reason: "missing_timing" };
  }
  const minMs = opts.minMs ?? 1200;
  if (Date.now() - started < minMs) {
    return { spam: true, reason: "too_fast" };
  }
  // Reject absurd ancient timestamps (replay / clock abuse)
  const age = Date.now() - started;
  if (age > 24 * 60 * 60 * 1000) {
    return { spam: true, reason: "missing_timing" };
  }
  return { spam: false };
}

/** Simple in-memory rate limit (per serverless instance). */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now > row.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const };
  }
  if (row.count >= limit) {
    return { ok: false as const, retryAfterMs: row.resetAt - now };
  }
  row.count += 1;
  return { ok: true as const };
}

/**
 * Client IP for rate limits. Prefer platform headers Vercel/CF set;
 * fall back to first X-Forwarded-For hop (platform-managed on Vercel).
 */
export function clientIp(request: Request) {
  const vercel = request.headers.get("x-vercel-forwarded-for")?.trim();
  if (vercel) return vercel.split(",")[0]?.trim() || "unknown";

  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;

  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;

  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return "unknown";
}
