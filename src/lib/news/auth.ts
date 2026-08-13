import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  effectiveAdminPasswordSha256,
  isAllowedAdminEmail,
  newsAdminCredentials,
  newsAdminEmail,
  newsAdminPasswordPlain,
  newsSessionSecret,
  newsSiteUrl,
} from "./config";
import { safeEqual } from "./crypto";

export const NEWS_SESSION_COOKIE = "ho_news_session";
const SESSION_TTL_SEC = 60 * 60 * 8; // 8h

function secretKey() {
  const s = newsSessionSecret();
  if (!s) throw new Error("news_session_unconfigured");
  return new TextEncoder().encode(s);
}

export type NewsSession = {
  email: string;
};

export async function verifyAdminPassword(
  email: string,
  password: string,
): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  if (password.length < 8 || password.length > 200) return false;

  if (!isAllowedAdminEmail(normalized)) {
    createHash("sha256").update(password, "utf8").digest("hex");
    return false;
  }

  // Prefer exact email match to configured admin email
  const adminEmail = newsAdminEmail();
  if (normalized !== adminEmail && normalized !== "marketing@headoversea.com") {
    createHash("sha256").update(password, "utf8").digest("hex");
    return false;
  }

  // 1) Plain password in env
  const plain = newsAdminPasswordPlain();
  if (plain) {
    return safeEqual(password, plain);
  }

  // 2) Valid SHA-256 from env, else built-in bootstrap hash
  const sha = effectiveAdminPasswordSha256();
  const got = createHash("sha256").update(password, "utf8").digest("hex");
  if (safeEqual(got, sha)) return true;

  // 3) bcrypt map (legacy)
  const creds = newsAdminCredentials();
  const hash = creds.get(normalized);
  if (!hash) {
    await bcrypt.compare(
      password,
      "$2b$12$KlRzJoue5aMSj1zz/p7bw.0g62uYRy6sCT4gzj53zeJlnvyZqQSI6",
    );
    return false;
  }
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ role: "news_admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email.trim().toLowerCase())
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SEC}s`)
    .sign(secretKey());
}

export async function readSessionFromToken(
  token: string | undefined | null,
): Promise<NewsSession | null> {
  if (!token) return null;
  if (!newsSessionSecret()) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    if (payload.role !== "news_admin") return null;
    const email = String(payload.sub ?? "");
    if (!email.includes("@")) return null;
    // Must still be allowlisted (email env or bcrypt map)
    if (!isAllowedAdminEmail(email)) return null;
    return { email };
  } catch {
    return null;
  }
}

export async function getNewsSession(): Promise<NewsSession | null> {
  const jar = await cookies();
  return readSessionFromToken(jar.get(NEWS_SESSION_COOKIE)?.value);
}

export function sessionCookieOptions(token: string) {
  return {
    name: NEWS_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_TTL_SEC,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: NEWS_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 0,
  };
}

/** CSRF defense for cookie-authenticated mutations. */
export function assertSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const reqUrl = new URL(request.url);

  if (origin) {
    try {
      const o = new URL(origin);
      // Primary: Origin must match the host serving this API
      if (o.protocol === reqUrl.protocol && o.host === reqUrl.host) {
        return true;
      }
      // Also allow configured public site URL (www / apex mismatch edge cases)
      const site = newsSiteUrl();
      const s = new URL(site);
      if (o.protocol === s.protocol && o.host === s.host) return true;
      if (
        process.env.NODE_ENV !== "production" &&
        (o.hostname === "localhost" || o.hostname === "127.0.0.1")
      ) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin") return true;
  if (process.env.NODE_ENV !== "production" && !origin) return true;
  return false;
}

export function extractBearerToken(request: Request): string | null {
  const h = request.headers.get("authorization");
  if (!h) return null;
  const m = /^Bearer\s+(.+)$/i.exec(h.trim());
  if (!m?.[1]) return null;
  return m[1].trim();
}

export function ingestAuthorized(request: Request, expectedKey: string): boolean {
  const token = extractBearerToken(request);
  if (!token) return false;
  return safeEqual(token, expectedKey);
}
