"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { transition } from "@/lib/motion";
import type { SiteContent, Locale } from "@/types/content";

interface ProcessProps {
  content: SiteContent;
  locale: Locale;
}

export function Process({ content, locale }: ProcessProps) {
  const aboutHref = locale === "en" ? "/en/about" : "/sobre";
  const { process } = content;

  return (
    <Section tone="obsidian">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <Eyebrow>{process.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-light leading-tight text-ivory md:text-4xl">
              {process.title}
            </h2>
            <Link
              href={aboutHref}
              className="group mt-8 inline-flex items-center gap-3 border border-border-strong px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-champagne hover:text-champagne"
            >
              {process.cta}
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>

        <ol className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {process.steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={transition(0.7, index * 0.1)}
              className="relative"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne/40 font-mono text-xs text-champagne">
                  0{index + 1}
                </span>
                {index < process.steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-border lg:block" aria-hidden />
                )}
              </div>
              <h3 className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-ivory">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
