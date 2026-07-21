"use client";

import Image from "next/image";
import type { Locale } from "@/types/content";
import { BackBand, BackLabel, MeridianLink } from "./primitives";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";

interface BackContactProps {
  locale?: Locale;
  /** Optional right-side reveal image (PWS contact pattern) */
  image?: string;
  imageAlt?: string;
}

/** BACK closing contact — optional media on the right. */
export function BackContact({
  locale = "pt",
  image,
  imageAlt,
}: BackContactProps) {
  const en = locale === "en";
  const href = en ? "/en/contact" : "/contato";

  return (
    <BackBand tone="black" className="!border-t border-white/[0.08]">
      <div
        className={
          image
            ? "grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
            : "max-w-[42rem]"
        }
      >
        <div className={image ? "lg:col-span-5" : undefined}>
          <Reveal variant="rise">
            <BackLabel tone="light">
              {en ? "Contact us" : "Contato"}
            </BackLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <h2 className="font-display mt-6 max-w-[18ch] text-[clamp(2rem,3.4vw,2.85rem)] leading-[1.08]">
              {en
                ? "Connect with the Head Oversea team"
                : "Conecte-se com o time Head Oversea"}
            </h2>
          </Reveal>
          <Reveal delay={0.14} variant="fadeUp">
            <p className="body-editorial mt-5 max-w-[40ch] text-white/50">
              {en
                ? "Founders and investors — a qualified conversation to begin the partnership."
                : "Fundadores e investidores — uma conversa qualificada para começar a parceria."}
            </p>
          </Reveal>
          <Reveal delay={0.2} variant="fadeUp" className="mt-8">
            <MeridianLink href={href} tone="light">
              {en ? "Contact us" : "Fale conosco"}
            </MeridianLink>
          </Reveal>
        </div>

        {image ? (
          <Reveal delay={0.12} variant="fadeUp" className="lg:col-span-7">
            <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-[#111] sm:aspect-[16/10]">
              <Image
                src={image}
                alt={
                  imageAlt ??
                  (en
                    ? "Head Oversea — crossing markets"
                    : "Head Oversea — travessia de mercados")
                }
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
                quality={90}
              />
            </ImageReveal>
          </Reveal>
        ) : null}
      </div>
    </BackBand>
  );
}
