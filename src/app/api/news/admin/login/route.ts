import { NextResponse } from "next/server";
import { clientIp, isEmail, rateLimit } from "@/lib/form-guard";
import {
  assertSameOrigin,
  createSessionToken,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/news/auth";
import { newsLoginReady } from "@/lib/news/config";

export const runtime = "nodejs";

type LoginBody = {
  email?: string;
  password?: string;
};

/**
 * Marketing login — httpOnly cookie session.
 * Generic errors only (no user enumeration).
 */
export async function POST(request: Request) {
  const ready = newsLoginReady();
  if (!ready.ok) {
    return NextResponse.json(
      { ok: false, error: "news_system_unconfigured", missing: ready.missing },
      { status: 503 },
    );
  }

  if (!assertSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const ip = clientIp(request);
  const limited = rateLimit(`news-login:${ip}`, 5, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: LoginBody;
  try {
    const text = await request.text();
    if (text.length > 4_000) {
      return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
    }
    body = JSON.parse(text) as LoginBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !isEmail(email) || !password) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }

  const emailLimited = rateLimit(`news-login-email:${email}`, 5, 15 * 60 * 1000);
  if (!emailLimited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const ok = await verifyAdminPassword(email, password);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }

  const token = await createSessionToken(email);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
