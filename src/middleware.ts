import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { htmlLangFromPathname, isIndexableEnv } from "@/lib/site";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

function applySecurityHeaders(res: NextResponse) {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    res.headers.set(k, v);
  }
  // Never reflect arbitrary Origin as ACAO — APIs are same-origin / Bearer.
  res.headers.delete("Access-Control-Allow-Origin");
}

/**
 * - `/en` home → `/` (308)
 * - locale header for `<html lang>`
 * - `/admin` never indexed
 * Preview/staging: X-Robots-Tag noindex
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname === "/en/") {
    const redirect = NextResponse.redirect(new URL("/", request.url), 308);
    applySecurityHeaders(redirect);
    return redirect;
  }

  // Block CORS preflight probing of cookie-auth APIs from foreign origins
  if (
    request.method === "OPTIONS" &&
    pathname.startsWith("/api/news/admin")
  ) {
    const res = new NextResponse(null, { status: 403 });
    applySecurityHeaders(res);
    return res;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-locale", htmlLangFromPathname(pathname));

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });
  applySecurityHeaders(res);

  if (!isIndexableEnv()) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  if (pathname.startsWith("/admin")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.set("Cache-Control", "no-store, max-age=0");
    res.headers.set("Referrer-Policy", "no-referrer");
    return res;
  }

  if (pathname.startsWith("/api/news/media/")) {
    res.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
    return res;
  }

  if (pathname.startsWith("/api/")) {
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  if (pathname.startsWith("/insights") || pathname.startsWith("/en/insights")) {
    res.headers.set(
      "Cache-Control",
      "private, no-store, no-cache, must-revalidate",
    );
    return res;
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon|images/|videos/|guides/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|mp4|ico|txt)$).*)",
  ],
};
