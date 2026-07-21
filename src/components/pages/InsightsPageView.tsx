"use client";

import Image from "next/image";
import Link from "next/link";
import { BackLabel, BackShell } from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { BACK_MEDIA } from "@/lib/back-media";
import { getContent } from "@/lib/content";
import type { Locale } from "@/types/content";

interface InsightsPageViewProps {
  locale?: Locale;
}

export function InsightsPageView({ locale = "pt" }: InsightsPageViewProps) {
  const content = getContent(locale);
  const en = locale === "en";
  const insights = content.insights.items;
  const badge = "Blog";

  return (
    <BackShell content={content} locale={locale} headerSurface="dark">
      {/* Title band */}
      <section className="border-b border-black/[0.06] bg-black text-white">
        <div className="page-shell pb-10 pt-24 md:pb-14 md:pt-28 lg:pb-16 lg:pt-32">
          <Reveal variant="rise">
            <BackLabel tone="light">{en ? "News" : "Notícias"}</BackLabel>
          </Reveal>
          <div className="mt-7 grid items-end gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
            <Reveal delay={0.08} variant="rise" className="lg:col-span-5">
              <h1 className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] font-light leading-[1.02]">
                News
              </h1>
            </Reveal>
            <Reveal
              delay={0.14}
              variant="fadeUp"
              className="lg:col-span-6 lg:col-start-7"
            >
              <p className="body-editorial max-w-[40ch] text-white/55">
                {en
                  ? "Analysis, theses, and the inside view on active ownership between Brazil and the U.S."
                  : "Análises, teses e bastidores sobre active ownership entre Brasil e Estados Unidos."}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Card grid — Blog badge + date + title */}
      <section className="bg-white text-black">
        <div className="page-shell py-[clamp(2.5rem,6vw,4.5rem)]">
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12">
            {insights.map((item, i) => (
              <Reveal key={item.slug ?? item.title} delay={i * 0.05} variant="fadeUp">
                <Link href={item.href} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black/[0.04]">
                    <Image
                      src={item.image || BACK_MEDIA.pexelsField}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      quality={88}
                      priority={i < 4}
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2.5">
                    <span className="rounded-md bg-black/[0.06] px-2.5 py-1 text-[11px] font-medium tracking-wide text-black/50">
                      {badge}
                    </span>
                    <span className="text-[12px] tracking-wide text-black/40">
                      {item.date}
                    </span>
                  </div>
                  <h2 className="font-display mt-3 text-[clamp(1.05rem,1.35vw,1.2rem)] font-medium leading-snug text-black transition-opacity group-hover:opacity-70">
                    {item.title}
                  </h2>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </BackShell>
  );
}
