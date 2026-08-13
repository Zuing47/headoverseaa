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

/** Only https absolute URLs — blocks javascript:, data:, http, SSRF to metadata IPs is still possible; we never server-fetch these. */
export function sanitizeHttpsUrl(raw: unknown): string | null {
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
  // Block obvious localhost / private hostnames (defense in depth; we don't fetch)
  const host = url.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host) ||
    host === "169.254.169.254" ||
    host === "metadata.google.internal"
  ) {
    return null;
  }
  return url.toString();
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
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "pt-BR", {
    month: "short",
    year: "numeric",
    day: "numeric",
  }).format(d);
}

export { MAX as NEWS_FIELD_MAX };
