"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Institutional label — BACK organization (caps + line to the right).
 * Used sitewide so "estilo back" and existing pages share one DNA.
 */
export function SectionLabel({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <p
        className={cn(
          "label-caps shrink-0",
          tone === "dark" ? "text-black/45" : "text-white/45",
        )}
      >
        {children}
      </p>
      <span
        className={cn(
          "h-px min-w-[2rem] flex-1 max-w-[4.5rem]",
          tone === "dark" ? "bg-black/20" : "bg-white/25",
        )}
        aria-hidden
      />
    </div>
  );
}

/**
 * Head Oversea signature CTA — Meridian (Brasil ↔ USA).
 * Part of BACK identity — never replace with generic circle-arrow chrome.
 */
export function MeridianLink({
  href,
  children,
  tone = "dark",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  external?: boolean;
}) {
  const light = tone === "light";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-3.5 text-[13px] tracking-[0.04em] transition-colors",
        light ? "text-white" : "text-black",
        className,
      )}
    >
      <span
        className={cn(
          "underline underline-offset-[7px] decoration-1 transition-[text-decoration-color]",
          light
            ? "decoration-white/25 group-hover:decoration-white/70"
            : "decoration-black/20 group-hover:decoration-black/55",
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]",
          light
            ? "border-white/35 group-hover:border-white/70 group-hover:bg-white/[0.08]"
            : "border-black/25 group-hover:border-black/55 group-hover:bg-black/[0.04]",
        )}
        aria-hidden
      >
        <span
          className={cn(
            "absolute left-[7px] h-[3px] w-[3px] rounded-full transition-transform duration-500 group-hover:-translate-x-px",
            light ? "bg-white" : "bg-black",
          )}
        />
        <span
          className={cn(
            "h-px w-2.5 origin-left scale-x-75 transition-transform duration-500 group-hover:scale-x-100",
            light ? "bg-white/70" : "bg-black/60",
          )}
        />
        <span
          className={cn(
            "absolute right-[7px] h-[3px] w-[3px] rounded-full transition-transform duration-500 group-hover:translate-x-px",
            light ? "bg-white" : "bg-black",
          )}
        />
      </span>
    </Link>
  );
}

export function TextLink({
  href,
  children,
  tone = "dark",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  external?: boolean;
}) {
  return (
    <MeridianLink
      href={href}
      tone={tone}
      className={className}
      external={external}
    >
      {children}
    </MeridianLink>
  );
}

export function MeridianRule({
  tone = "dark",
  className,
  active = true,
}: {
  tone?: "dark" | "light";
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "block h-px origin-left transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        tone === "dark" ? "bg-black/15" : "bg-white/20",
        active ? "scale-x-100" : "scale-x-0",
        className,
      )}
      aria-hidden
    />
  );
}
