"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icons";
import { transition } from "@/lib/motion";
import type { SiteContent } from "@/types/content";

interface MetricsProps {
  content: SiteContent;
}

export function Metrics({ content }: MetricsProps) {
  return (
    <section className="border-y border-border bg-charcoal">
      <Container>
        <div className="grid grid-cols-2 divide-y divide-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          {content.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={transition(0.7, i * 0.08)}
              className="flex flex-col gap-4 px-2 py-10 lg:border-l lg:border-border lg:px-6 lg:first:border-l-0"
            >
              {metric.icon && (
                <Icon name={metric.icon} className="h-6 w-6 text-champagne" />
              )}
              <div className="flex items-baseline gap-0.5">
                {i === 0 && (
                  <span className="font-mono text-sm text-champagne">US$</span>
                )}
                <span className="font-display text-4xl font-light tracking-tight text-ivory md:text-5xl">
                  {metric.value}
                </span>
                {metric.suffix && (
                  <span className="font-display text-2xl text-champagne md:text-3xl">
                    {metric.suffix}
                  </span>
                )}
              </div>
              <p className="text-xs uppercase tracking-wide text-stone">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
