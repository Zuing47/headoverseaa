"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { transition } from "@/lib/motion";
import type { SiteContent } from "@/types/content";

export function Faq({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(0);
  const { faq } = content;

  return (
    <Section tone="obsidian" className="!py-14 md:!py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <h2 className="text-metallic font-display font-normal leading-tight tracking-tight [font-size:clamp(1.6rem,3vw,2.4rem)]">
              {faq.title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {faq.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.question} className="border-t border-border last:border-b">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`font-display text-lg transition-colors md:text-xl ${
                          isOpen ? "text-champagne" : "text-ivory"
                        }`}
                      >
                        {item.question}
                      </span>
                      <span className={`shrink-0 pt-1 text-xl font-light transition-colors ${isOpen ? "text-champagne" : "text-stone"}`}>
                        {isOpen ? "–" : "+"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={transition(0.4)}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-stone md:text-base">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
