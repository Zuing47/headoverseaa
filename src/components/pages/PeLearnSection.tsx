"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/home/reveal";
import { SectionLabel } from "@/components/home/Editorial";
import { PE_LEARN } from "@/lib/content/pe-learn";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/content";

export function PeLearnSection({ locale }: { locale: Locale }) {
  const t = PE_LEARN[locale];
  const [openId, setOpenId] = useState<string>(t.topics[0].id);
  const baseId = useId();

  return (
    <>
      <section
        id="aprender"
        className="bg-black text-white"
        aria-labelledby={`${baseId}-learn-title`}
      >
        <div className="page-shell section-space-lg">
          <Reveal variant="rise">
            <SectionLabel tone="light">{t.eyebrow}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <h2
              id={`${baseId}-learn-title`}
              className="font-display mt-8 max-w-3xl whitespace-pre-line text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]"
            >
              {t.title}
            </h2>
          </Reveal>
          <Reveal delay={0.14} variant="fadeUp">
            <p className="body-editorial mt-6 max-w-2xl text-white/45">
              {t.intro}
            </p>
          </Reveal>

          <div className="mt-14 border-t border-white/[0.1] md:mt-20">
            {t.topics.map((topic, i) => {
              const open = openId === topic.id;
              const panelId = `${baseId}-panel-${topic.id}`;
              const buttonId = `${baseId}-btn-${topic.id}`;

              return (
                <Reveal key={topic.id} delay={0.04 + i * 0.04} variant="rise">
                  <div className="border-b border-white/[0.1]">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenId(open ? "" : topic.id)}
                      className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
                    >
                      <span className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-snug text-white transition-opacity group-hover:opacity-70">
                        {topic.title}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-[14px] text-white/35 transition-transform duration-500",
                          open && "rotate-180 text-white/70",
                        )}
                        aria-hidden
                      >
                        ↓
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: DURATION.fast,
                            ease: EASE_OUT,
                          }}
                          className="overflow-hidden"
                        >
                          <p className="body-editorial max-w-3xl pb-8 text-white/50 md:pb-10">
                            {topic.body}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="framework"
        className="bg-[#0a0a0a] text-white"
        aria-labelledby={`${baseId}-framework-title`}
      >
        <div className="page-shell section-space-lg">
          <Reveal variant="rise">
            <SectionLabel tone="light">{t.frameworkEyebrow}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <h2
              id={`${baseId}-framework-title`}
              className="font-display mt-8 max-w-3xl whitespace-pre-line text-[clamp(2.2rem,4vw,3.4rem)]"
            >
              {t.frameworkTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.12} variant="fade">
            <p className="mt-4 max-w-xl text-[13px] tracking-wide text-white/30">
              {t.frameworkNote}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-0 border-t border-white/[0.1] sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {t.stages.map((stage, i) => (
              <Reveal
                key={stage.n}
                delay={0.08 + i * 0.08}
                variant="rise"
                className={cn(
                  "border-b border-white/[0.1] py-10 sm:border-b-0 lg:border-l lg:border-white/[0.1] lg:px-8 lg:py-12",
                  i === 0 && "lg:border-l-0 lg:pl-0",
                  i % 2 === 1 && "sm:border-l sm:border-white/[0.1] sm:pl-8",
                  i >= 2 && "sm:border-t sm:border-white/[0.1] lg:border-t-0",
                )}
              >
                <p className="label-caps text-white/35">{stage.n}</p>
                <div className="mt-8 flex h-28 items-end md:h-36">
                  <motion.div
                    className="w-full origin-bottom bg-white/[0.12]"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.1,
                      ease: EASE_OUT,
                    }}
                    style={{ height: `${28 + i * 18}%` }}
                  />
                </div>
                <h3 className="font-display mt-8 text-[1.55rem] md:text-[1.75rem]">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-[28ch] text-[14px] leading-relaxed text-white/45">
                  {stage.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="presenca"
        className="bg-black text-white"
        aria-labelledby={`${baseId}-contrast-title`}
      >
        <div className="page-shell section-space-lg">
          <Reveal variant="rise">
            <SectionLabel tone="light">{t.contrastEyebrow}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <h2
              id={`${baseId}-contrast-title`}
              className="font-display mt-8 max-w-3xl whitespace-pre-line text-[clamp(2.2rem,4vw,3.4rem)]"
            >
              {t.contrastTitle}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="rise" delay={0.1}>
              <p className="label-caps text-white/35">{t.paper.label}</p>
              <ul className="mt-8 space-y-0">
                {t.paper.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-white/[0.08] py-5 text-[15px] text-white/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="rise" delay={0.18}>
              <p className="label-caps text-white/55">{t.real.label}</p>
              <ul className="mt-8 space-y-0">
                {t.real.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-white/[0.12] py-5 text-[15px] text-white/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
