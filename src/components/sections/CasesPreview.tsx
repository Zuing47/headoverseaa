"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { transition } from "@/lib/motion";
import type { SiteContent, Locale } from "@/types/content";

interface CasesPreviewProps {
  content: SiteContent;
  locale: Locale;
}

export function CasesPreview({ content, locale }: CasesPreviewProps) {
  const casesHref = locale === "en" ? "/en/cases" : "/cases";
  const label = locale === "en" ? "View all cases" : "Ver todos os cases";

  return (
    <Section tone="charcoal">
      <Container>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>{content.cases.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-light text-ivory md:text-4xl lg:text-5xl">
              {content.cases.title}
            </h2>
          </div>
          <Link
            href={casesHref}
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-champagne transition-colors hover:text-ivory"
          >
            {label}
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.cases.items.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={transition(0.7, index * 0.08)}
            >
              <Link
                href={casesHref}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-sm p-6"
              >
                {item.image && (
                  <Media
                    src={item.image}
                    alt={item.company}
                    scrim
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="relative">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-champagne">
                    {item.category}
                  </p>
                  {item.result ? (
                    <>
                      <p className="font-display text-4xl font-light text-ivory">
                        {item.result}
                      </p>
                      {item.resultLabel && (
                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-stone">
                          {item.resultLabel}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="font-display text-2xl font-light text-ivory">
                      {item.company}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    {item.headline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
