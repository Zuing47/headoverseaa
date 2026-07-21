"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

interface MediaProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Overlay a subtle top-to-bottom scrim for text legibility over the image. */
  scrim?: boolean;
}

/**
 * Photography slot. Renders an optimized next/image; if the file is not present
 * yet (user is still supplying assets) it degrades to a branded placeholder
 * instead of a broken image. Drop the real file at `src` and it appears.
 */
export function Media({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  scrim = false,
}: MediaProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-graphite", className)}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(120% 120% at 70% 20%, rgba(184,168,138,0.12), transparent 55%), var(--graphite)",
          }}
          aria-hidden
        >
          <Logo variant="mark" className="w-12 text-champagne/25" title="" />
        </div>
      )}
      {scrim && !failed && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(7,7,8,0.85) 0%, rgba(7,7,8,0.35) 45%, rgba(7,7,8,0.15) 100%)",
          }}
          aria-hidden
        />
      )}
    </div>
  );
}
