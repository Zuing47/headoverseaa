import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * - `/en` home → `/`
 * - `/admin/news` gets noindex-ish headers + never cache
 * Admin auth is enforced in page/API handlers (defense in depth).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname === "/en/") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  if (pathname.startsWith("/admin")) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.set("Cache-Control", "no-store, max-age=0");
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "no-referrer");
    return res;
  }

  if (pathname.startsWith("/api/news")) {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("X-Content-Type-Options", "nosniff");
    return res;
  }

  if (pathname.startsWith("/insights") || pathname.startsWith("/en/insights")) {
    const res = NextResponse.next();
    res.headers.set(
      "Cache-Control",
      "private, no-store, no-cache, must-revalidate",
    );
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/en",
    "/en/",
    "/admin/:path*",
    "/api/news/:path*",
    "/insights",
    "/insights/:path*",
    "/en/insights",
    "/en/insights/:path*",
  ],
};
