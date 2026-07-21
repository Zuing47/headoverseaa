"use client";

import Image from "next/image";
import { BackBand, BackLabel, MeridianLink } from "./primitives";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { cn } from "@/lib/utils";

interface BackSplitProps {
  eyebrow?: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  /** media on left (default) or right */
  media?: "left" | "right";
  tone?: "white" | "black";
  stats?: { label: string; value: string }[];
}

/** BACK Z-split — education / resource pattern. */
export function BackSplit({
  eyebrow,
  title,
  body,
  href,
  cta,
  image,
  imageAlt,
  media = "left",
  tone = "white",
  stats,
}: BackSplitProps) {
  const dark = tone === "black";
  const mediaFirst = media === "left";

  return (
    <BackBand tone={tone}>
      {eyebrow ? (
        <Reveal variant="rise">
          <BackLabel tone={dark ? "light" : "dark"}>{eyebrow}</BackLabel>
        </Reveal>
      ) : null}

      <div
        className={cn(
          "grid items-center gap-10 lg:grid-cols-12 lg:gap-14",
          eyebrow ? "mt-8 lg:mt-10" : "",
        )}
      >
        <Reveal
          delay={0.08}
          variant="fadeUp"
          className={cn(
            "lg:col-span-7",
            !mediaFirst && "lg:order-2",
          )}
        >
          <ImageReveal className="relative aspect-[16/10] overflow-hidden bg-[#111] sm:aspect-[16/10]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center"
              quality={90}
            />
          </ImageReveal>
        </Reveal>

        <Reveal
          delay={0.14}
          variant="fadeUp"
          className={cn(
            "lg:col-span-5",
            !mediaFirst && "lg:order-1",
          )}
        >
          <h2
            className={cn(
              "font-display text-[clamp(1.75rem,2.8vw,2.35rem)] leading-[1.1]",
              dark ? "text-white" : "text-black",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "body-editorial mt-4 max-w-[40ch]",
              dark ? "text-white/55" : "text-black/55",
            )}
          >
            {body}
          </p>
          <div className="mt-7">
            <MeridianLink href={href} tone={dark ? "light" : "dark"}>
              {cta}
            </MeridianLink>
          </div>
          {stats?.length ? (
            <ul className="mt-8 space-y-0 border-t border-current/10 pt-2">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className={cn(
                    "flex items-baseline justify-between gap-6 border-b py-4",
                    dark ? "border-white/[0.12]" : "border-black/[0.08]",
                  )}
                >
                  <span
                    className={cn(
                      "text-[13px]",
                      dark ? "text-white/45" : "text-black/45",
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="font-display text-[1.35rem] leading-none">
                    {s.value}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </div>
    </BackBand>
  );
}
