import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "page-shell",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-page",
        size === "wide" && "max-w-[1600px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

type SectionTone =
  | "black"
  | "graphite"
  | "off-white"
  | "white"
  | "obsidian"
  | "charcoal"
  | "porcelain"
  | "porcelain-alt";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** @deprecated prefer `tone` */
  dark?: boolean;
  tone?: SectionTone;
  space?: "xl" | "lg" | "md" | "none";
}

const TONE_CLASS: Record<SectionTone, string> = {
  black: "bg-black text-white",
  graphite: "bg-graphite text-white",
  "off-white": "bg-off-white text-ink",
  white: "bg-white text-ink",
  obsidian: "bg-black text-white",
  charcoal: "bg-graphite text-white",
  porcelain: "bg-off-white text-ink",
  "porcelain-alt": "bg-porcelain-alt text-ink",
};

const SPACE_CLASS = {
  xl: "section-space-xl",
  lg: "section-space-lg",
  md: "section-space-md",
  none: "",
} as const;

export function Section({
  children,
  className,
  id,
  dark,
  tone,
  space = "xl",
}: SectionProps) {
  const resolved: SectionTone = tone ?? (dark ? "graphite" : "black");
  return (
    <section
      id={id}
      className={cn(
        "relative",
        SPACE_CLASS[space],
        TONE_CLASS[resolved],
        className,
      )}
    >
      {children}
    </section>
  );
}

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn("label-caps mb-6 text-gold", className)}>{children}</p>
  );
}

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <div className={cn("line-accent w-full", className)} />;
}
