"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function hardResetWindowScroll() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** When Lenis is off — native window scroll only. */
export function NativeRouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    hardResetWindowScroll();
    const id = requestAnimationFrame(hardResetWindowScroll);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

/**
 * When Lenis is on — reset Lenis offset + window so the next page always
 * opens at the top and scroll-triggered animations can play.
 */
export function LenisRouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const reset = () => {
      lenis?.scrollTo(0, { immediate: true });
      hardResetWindowScroll();
    };
    reset();
    const id = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return null;
}
