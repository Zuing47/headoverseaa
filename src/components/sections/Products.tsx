"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Logo } from "@/components/ui/Logo";
import { transition } from "@/lib/motion";
import type { SiteContent, Locale } from "@/types/content";

interface ProductsProps {
  content: SiteContent;
  locale: Locale;
}

export function Products({ content, locale }: ProductsProps) {
  const servicesHref = locale === "en" ? "/en/services" : "/servicos";
  const label = locale === "en" ? "Learn more" : "Saiba mais";

  return (
    <Section tone="porcelain-alt">
      <Container>
        <div className="mb-16 text-center">
          <Eyebrow className="text-champagne-deep">{content.pillars.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-light text-ink md:text-4xl lg:text-5xl">
            {content.pillars.title}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.pillars.items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={transition(0.7, index * 0.08)}
              className="group flex flex-col overflow-hidden rounded-sm border border-border-ink bg-porcelain"
            >
              <div className="relative">
                {item.image && (
                  <Media
                    src={item.image}
                    alt={item.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="aspect-[4/3] w-full"
                  />
                )}
                <span className="absolute bottom-0 left-6 flex h-12 w-12 translate-y-1/2 items-center justify-center bg-obsidian text-champagne">
                  <Logo variant="mark" className="w-4" title="" />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-10">
                <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
                <Link
                  href={`${servicesHref}#${item.id}`}
                  className="group/link mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-champagne-deep"
                >
                  {label}
                  <span className="transition-transform duration-500 group-hover/link:translate-x-1" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
