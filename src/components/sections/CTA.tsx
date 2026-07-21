"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Media } from "@/components/ui/Media";
import { transition } from "@/lib/motion";
import type { SiteContent, Locale } from "@/types/content";

interface CTAProps {
  content: SiteContent;
  locale: Locale;
}

export function CTA({ content, locale }: CTAProps) {
  const contactHref = locale === "en" ? "/en/contact" : "/contato";
  const eyebrow = locale === "en" ? "Ready for the next step?" : "Pronto para o próximo passo?";
  const title =
    locale === "en"
      ? "Shall we turn your company into a global case?"
      : "Vamos transformar sua empresa em um case global?";

  return (
    <Section tone="porcelain">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow className="text-champagne-deep">{eyebrow}</Eyebrow>
            <FadeIn>
              <h2 className="font-display text-3xl font-light leading-tight text-ink text-balance md:text-4xl lg:text-5xl">
                {title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15} className="mt-10">
              <Button href={contactHref} variant="dark">
                {content.cta.primary}
              </Button>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="flex aspect-square max-w-sm items-center justify-center rounded-sm bg-obsidian lg:ml-auto">
              <Logo variant="mark" className="w-20 text-champagne" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

interface InsightsProps {
  content: SiteContent;
  locale: Locale;
}

export function Insights({ content, locale }: InsightsProps) {
  const title = locale === "en" ? "Content that creates value." : "Conteúdo que gera valor.";

  return (
    <Section tone="porcelain">
      <Container>
        <div className="mb-12">
          <Eyebrow>{content.insights.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {content.insights.items.map((item, index) => {
            const isLink = item.href && item.href !== "#";
            const inner = (
              <>
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                  {item.image && (
                    <Media
                      src={item.image}
                      alt={item.title}
                      scrim
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute left-4 top-4 flex items-center gap-3">
                    <span className="bg-obsidian/70 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-champagne backdrop-blur-sm">
                      {item.category}
                    </span>
                    <span className="font-mono text-[10px] text-stone">{item.date}</span>
                  </div>
                </div>
                <h3 className="mt-5 font-display text-xl leading-snug text-ink transition-colors group-hover:text-champagne-deep">
                  {item.title}
                </h3>
                <span className="mt-4 inline-block text-champagne-deep opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                  →
                </span>
              </>
            );

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={transition(0.7, index * 0.08)}
                className="group"
              >
                {isLink ? (
                  <Link href={item.href} className="block">
                    {inner}
                  </Link>
                ) : (
                  <div>{inner}</div>
                )}
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
