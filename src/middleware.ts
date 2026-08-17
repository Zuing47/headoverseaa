import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { htmlLangFromPathname, isIndexableEnv } from "@/lib/site";

/**
 * - `/en` home → `/` (308)
 * - locale header for `<html lang>`
 * - `/admin` never indexed
 * Preview/staging: X-Robots-Tag noindex
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname === "/en/") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-locale", htmlLangFromPathname(pathname));

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (!isIndexableEnv()) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  if (pathname.startsWith("/admin")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.set("Cache-Control", "no-store, max-age=0");
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "no-referrer");
    return res;
  }

  if (pathname.startsWith("/api/news/media/")) {
    res.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
    res.headers.set("X-Content-Type-Options", "nosniff");
    return res;
  }

  if (pathname.startsWith("/api/news")) {
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("X-Content-Type-Options", "nosniff");
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
