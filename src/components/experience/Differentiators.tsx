"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/experience/Reveal";
import { transition } from "@/lib/motion";
import type { SiteContent } from "@/types/content";

export function Differentiators({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(0);
  const { model } = content;

  return (
    <section className="bg-obsidian px-5 py-24 sm:px-8 md:px-10 md:py-32" style={{ overflowX: "clip" }}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal x={-40} y={0} className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-border-strong">
            <Image
              src="/images/about.jpg"
              alt="Head Oversea — governança ativa e execução hands-on"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              aria-hidden
              style={{ background: "linear-gradient(to top, rgba(7,7,8,0.4), transparent 55%)" }}
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal as="p" className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-champagne">
            {model.eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="text-metallic font-display mb-10 font-light leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
          >
            {model.title}
          </Reveal>

          <div className="flex flex-col">
            {model.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.title} className="border-t border-border last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span
                      className={`font-display text-xl transition-colors md:text-2xl ${
                        isOpen ? "text-champagne" : "text-ivory"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className={`shrink-0 text-2xl font-light transition-colors ${isOpen ? "text-champagne" : "text-stone"}`}>
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
                        <p className="pb-6 text-base leading-relaxed text-stone">{item.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
