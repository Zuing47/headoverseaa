import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/** Glowing champagne pill — the immersive "Falar com especialista" CTA. */
export function GlowButton({ href, children, className }: GlowButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "glow-btn px-8 py-3 text-xs sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base",
        className,
      )}
    >
      {children}
    </Link>
  );
}
