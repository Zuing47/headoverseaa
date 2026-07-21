"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Lenis only on capable desktops. Disabled for reduced-motion, Save-Data,
 * slow networks, and coarse pointers (most phones) so low-end devices stay snappy.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 900px)");
    // @ts-expect-error NetworkInformation
    const conn = navigator.connection;
    const slow =
      conn?.saveData === true ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "slow-2g" ||
      conn?.effectiveType === "3g";

    const sync = () => {
      setEnabled(
        !reduce.matches && !coarse.matches && !narrow.matches && !slow,
      );
    };
    sync();
    reduce.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        duration: 1,
        smoothWheel: true,
        anchors: { offset: -80, duration: 1.1 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
