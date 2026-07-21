"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BackBand, BackLabel } from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FaqItem = { question: string; answer: string };

export function ValueFaq({
  eyebrow,
  title,
  items,
  tone = "white",
}: {
  eyebrow: string;
  title: string;
  items: FaqItem[];
  tone?: "white" | "black";
}) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  const dark = tone === "black";

  return (
    <BackBand tone={dark ? "black" : "white"}>
      <Reveal variant="rise">
        <BackLabel tone={dark ? "light" : "dark"}>{eyebrow}</BackLabel>
      </Reveal>
      <Reveal delay={0.06} variant="rise">
        <h2
          className={cn(
            "font-display mt-8 max-w-[18ch] text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]",
            dark && "text-white",
          )}
        >
          {title}
        </h2>
      </Reveal>

      <div
        className={cn(
          "mt-12 border-t md:mt-16",
          dark ? "border-white/[0.12]" : "border-black/[0.1]",
        )}
      >
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.question} delay={0.04 + i * 0.04} variant="fadeUp">
              <div
                className={cn(
                  "border-b",
                  dark ? "border-white/[0.12]" : "border-black/[0.1]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors md:py-7"
                >
                  <span
                    className={cn(
                      "max-w-[52ch] text-[15px] font-medium leading-snug tracking-[-0.01em] transition-colors md:text-[17px]",
                      dark
                        ? isOpen
                          ? "text-white"
                          : "text-white/70 group-hover:text-white"
                        : isOpen
                          ? "text-black"
                          : "text-black/75 group-hover:text-black",
                    )}
                  >
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                      dark
                        ? isOpen
                          ? "border-white bg-white text-black"
                          : "border-white/25 bg-transparent text-white/55 group-hover:border-white/45"
                        : isOpen
                          ? "border-black bg-black text-white"
                          : "border-black/20 bg-transparent text-black/55 group-hover:border-black/40",
                    )}
                    aria-hidden
                  >
                    <motion.svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        duration: reduce ? 0 : DURATION.base,
                        ease: EASE_OUT,
                      }}
                    >
                      <path
                        d="M3 5.25 7 9l4-3.75"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="answer"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: DURATION.slow, ease: EASE_OUT },
                        opacity: { duration: DURATION.base, ease: EASE_OUT },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={reduce ? false : { y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 8, opacity: 0 }}
                        transition={{
                          duration: DURATION.slow,
                          ease: EASE_OUT,
                          delay: 0.04,
                        }}
                        className={cn(
                          "body-editorial max-w-[54ch] pb-7 md:pb-8",
                          dark ? "text-white/55" : "text-black/55",
                        )}
                      >
                        {item.answer}
                      </motion.p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </BackBand>
  );
}
