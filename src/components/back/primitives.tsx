"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { MeridianLink } from "@/components/home/Editorial";

/** BACK label — caps + line to the right (PWS organization, HO type). */
export function BackLabel({
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

/** Full-bleed band wrapper for BACK stacks. */
export function BackBand({
  tone = "white",
  children,
  className,
  id,
}: {
  tone?: "white" | "black" | "navy";
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        tone === "white"
          ? "bg-white text-black"
          : tone === "navy"
            ? "border-t border-white/[0.08] bg-[var(--navy)] text-white"
            : "border-t border-white/[0.08] bg-black text-white",
        className,
      )}
    >
      <div className="page-shell section-space-lg">{children}</div>
    </section>
  );
}

/** Stat column — label above, display value, hairline under. */
export function BackStat({
  label,
  value,
  suffix,
  prefix,
  tone = "dark",
}: {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className="min-w-0">
      <p
        className={cn(
          "min-h-[2.75rem] text-[13px] leading-snug",
          tone === "dark" ? "text-black/45" : "text-white/45",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "font-display mt-5 text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none tracking-[-0.03em]",
          tone === "dark" ? "text-black" : "text-white",
        )}
      >
        {prefix ? (
          <span className="mr-1 align-super text-[0.28em] font-sans tracking-[0.12em] opacity-40">
            {prefix}
          </span>
        ) : null}
        {value}
        {suffix ? (
          <span className="ml-0.5 text-[0.55em] opacity-40">{suffix}</span>
        ) : null}
      </p>
      <div
        className={cn(
          "mt-6 h-px w-full",
          tone === "dark" ? "bg-black/15" : "bg-white/20",
        )}
        aria-hidden
      />
    </div>
  );
}

/** Full-width list row — text left, Meridian right. */
export function BackListRow({
  href,
  children,
  tone = "light",
  cta,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between gap-8 border-t py-7 transition-opacity last:border-b hover:opacity-70",
        tone === "light" ? "border-white/[0.12]" : "border-black/[0.08]",
      )}
    >
      <span
        className={cn(
          "font-display text-[clamp(1.25rem,2vw,1.65rem)] leading-snug",
          tone === "light" ? "text-white" : "text-black",
        )}
      >
        {children}
      </span>
      <span className="shrink-0">
        <MeridianLink href={href} tone={tone === "light" ? "light" : "dark"}>
          {cta ?? "→"}
        </MeridianLink>
      </span>
    </Link>
  );
}

export { MeridianLink };
