import type { Locale } from "@/types/content";

const MAX = {
  title: 200,
  summary: 600,
  body: 20_000,
  category: 80,
  sourceName: 120,
  slug: 120,
  externalId: 200,
  url: 2_000,
  rejectReason: 500,
} as const;

/** Strip tags / control chars — articles are plain text only (no HTML render). */
export function stripToPlainText(raw: unknown, max: number): string {
  let s = String(raw ?? "");
  // Remove HTML tags
  s = s.replace(/<[^>]*>/g, " ");
  // Decode a few common entities without introducing HTML
  s = s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
  // Kill other entities / null bytes / control chars (keep \n\t)
  s = s.replace(/&#?\w+;/g, " ");
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  s = s.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
  s = s.replace(/[ \t]{2,}/g, " ").trim();
  if (s.length > max) s = s.slice(0, max).trim();
  return s;
}

export function slugify(raw: string): string {
  const base = stripToPlainText(raw, MAX.slug)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX.slug);
  return base || "noticia";
}

function isBlockedHostname(host: string): boolean {
  const h = host.toLowerCase().replace(/^\[|\]$/g, "");

  if (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "0.0.0.0" ||
    h === "::1" ||
    h === "::" ||
    h.endsWith(".local") ||
    h.endsWith(".internal") ||
    h.endsWith(".localhost") ||
    h === "metadata.google.internal" ||
    h === "metadata" ||
    h === "169.254.169.254" ||
    h === "metadata.aws.internal"
  ) {
    return true;
  }

  // IPv4 private / link-local / loopback / CGNAT
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) {
    const parts = h.split(".").map(Number);
    if (parts.some((n) => n > 255)) return true;
    const [a, b] = parts;
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    if (a === 192 && b === 0 && parts[2] === 0) return true;
  }

  // IPv6 truncated / unique-local / link-local
  if (h.includes(":")) {
    if (
      h === "::1" ||
      h.startsWith("fc") ||
      h.startsWith("fd") ||
      h.startsWith("fe80") ||
      h.startsWith("::ffff:127.") ||
      h.startsWith("::ffff:10.") ||
      h.startsWith("::ffff:192.168.") ||
      /^::ffff:172\.(1[6-9]|2\d|3[0-1])\./.test(h)
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Only https absolute URLs — blocks javascript:, data:, http, userinfo,
 * and obvious private/metadata hosts. Callers that fetch must also
 * refuse open redirects (see safeFetchHttps).
 */
export function sanitizeHttpsUrl(raw: unknown): string | null {
  // Reject non-strings (NoSQL-style object injection into URL fields)
  if (raw !== null && raw !== undefined && typeof raw !== "string") {
    return null;
  }
  const s = String(raw ?? "").trim();
  if (!s || s.length > MAX.url) return null;
  let url: URL;
  try {
    url = new URL(s);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username || url.password) return null;
  if (isBlockedHostname(url.hostname)) return null;
  return url.toString();
}

/**
 * Fetch HTTPS with SSRF hardening: re-validate every redirect Location
 * and never follow to private/metadata hosts.
 */
export async function safeFetchHttps(
  pageUrl: string,
  init?: RequestInit & { maxRedirects?: number },
): Promise<Response | null> {
  const maxRedirects = init?.maxRedirects ?? 3;
  let current = sanitizeHttpsUrl(pageUrl);
  if (!current) return null;

  const { maxRedirects: _m, ...rest } = init || {};
  void _m;

  for (let i = 0; i <= maxRedirects; i++) {
    let res: Response;
    try {
      res = await fetch(current, {
        ...rest,
        redirect: "manual",
        signal: rest.signal ?? AbortSignal.timeout(10_000),
      });
    } catch {
      return null;
    }

    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) return null;
      let next: string;
      try {
        next = new URL(loc, current).toString();
      } catch {
        return null;
      }
      current = sanitizeHttpsUrl(next);
      if (!current) return null;
      continue;
    }

    return res;
  }
  return null;
}

export function parseLocale(raw: unknown): Locale {
  const v = String(raw ?? "pt").trim().toLowerCase();
  return v === "en" ? "en" : "pt";
}

export function bodyToParagraphs(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean)
    .slice(0, 80);
}

export function formatNewsDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  // Always Brazil calendar day — Vercel UTC was shifting evening posts to the next day.
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "pt-BR", {
    month: "short",
    year: "numeric",
    day: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(d);
}

/** Escape JSON for embedding in <script type="application/ld+json">. */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}

export { MAX as NEWS_FIELD_MAX };
