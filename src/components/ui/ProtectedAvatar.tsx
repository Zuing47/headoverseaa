"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type ProtectedAvatarProps = {
  src: string;
  alt: string;
  /** CSS size, e.g. 40 or "2.5rem" */
  size?: number;
  className?: string;
  /** object-position — team photos often need object-top */
  objectPosition?: "top" | "center";
};

/**
 * Soft image protection for team/author photos.
 * Blocks casual right-click / drag-save. Does not stop DevTools downloads.
 */
export function ProtectedAvatar({
  src,
  alt,
  size = 40,
  className,
  objectPosition = "top",
}: ProtectedAvatarProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-black/[0.06] select-none",
        className,
      )}
      style={{ width: size, height: size }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        draggable={false}
        className={cn(
          "pointer-events-none select-none [-webkit-user-drag:none]",
          objectPosition === "top" ? "object-cover object-top" : "object-cover",
        )}
      />
      {/* Invisible shield over the bitmap */}
      <span
        className="absolute inset-0 z-[1] cursor-default"
        aria-hidden
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}

type ProtectedPhotoProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Full-bleed / rectangular team photo with the same soft protection. */
export function ProtectedPhoto({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
}: ProtectedPhotoProps) {
  return (
    <div
      className={cn("relative select-none", fill && "absolute inset-0", className)}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill ?? true}
        sizes={sizes}
        priority={priority}
        draggable={false}
        className="pointer-events-none select-none object-cover object-top [-webkit-user-drag:none]"
      />
      <span
        className="absolute inset-0 z-[1] cursor-default"
        aria-hidden
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
