import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "outline";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const styles = cn(
    "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-medium tracking-[0.16em] uppercase transition-colors duration-500 rounded-none",
    variant === "primary" &&
      "bg-white text-black hover:bg-gold hover:text-black",
    variant === "dark" &&
      "bg-black text-white hover:bg-gold hover:text-black",
    (variant === "secondary" || variant === "outline") &&
      "border border-current bg-transparent hover:border-gold hover:text-gold",
    variant === "ghost" && "px-0 py-2 text-muted hover:text-white",
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {variant !== "ghost" && (
        <span
          className="inline-block transition-transform duration-500 group-hover:translate-x-1"
          aria-hidden
        >
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {inner}
    </button>
  );
}
