import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * English is the default locale at `/`.
 * Keep `/en/*` deep links; only `/en` (home) redirects to `/`.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname === "/en/") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/en", "/en/"],
};
