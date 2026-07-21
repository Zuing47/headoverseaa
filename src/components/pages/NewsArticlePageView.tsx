"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BackApproach,
  BackBand,
  BackHero,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { BACK_MEDIA } from "@/lib/back-media";
import type { Insight, Locale, SiteContent } from "@/types/content";

interface NewsArticlePageViewProps {
  content: SiteContent;
  locale?: Locale;
  article: Insight;
}

export function NewsArticlePageView({
  content,
  locale = "pt",
  article,
}: NewsArticlePageViewProps) {
  const en = locale === "en";
  const indexHref = en ? "/en/insights" : "/insights";
  const paragraphs = article.body?.length
    ? article.body
    : article.description
      ? [article.description]
      : [];

  return (
    <BackShell content={content} locale={locale} withContact={false}>
      <BackHero
        eyebrow={article.category}
        title={article.title}
        subtitle={`${article.date}${article.author ? ` · ${article.author}` : ""}`}
        image={article.image || BACK_MEDIA.nycFlag}
        imageAlt={article.title}
      />

      <BackBand tone="white">
        <Reveal variant="rise">
          <Link
            href={indexHref}
            className="label-caps text-black/40 transition-colors hover:text-black"
          >
            ← {en ? "News" : "Notícias"}
          </Link>
        </Reveal>

        {!article.image ? (
          <ImageReveal className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-[#eee]">
            <Image
              src={BACK_MEDIA.sunsetPoster}
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1120px"
              className="object-cover"
              quality={90}
            />
          </ImageReveal>
        ) : null}

        <div className="mx-auto mt-12 max-w-[40rem] md:mt-16">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.08 + i * 0.05} variant="rise">
              <p className="body-editorial mb-7 text-[1.05rem] leading-[1.75] text-black/65">
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2} variant="fadeUp" className="mt-14 border-t border-black/[0.08] pt-10">
            <MeridianLink href={indexHref}>
              {en ? "Back to News" : "Voltar para Notícias"}
            </MeridianLink>
          </Reveal>
        </div>
      </BackBand>

      <BackApproach
        eyebrow={en ? "Continue" : "Continuar"}
        title={
          en
            ? "Explore more from Head Oversea."
            : "Explore mais da Head Oversea."
        }
        body={
          en
            ? "Thesis, portfolio, and how we operate across Brazil and the United States."
            : "Tese, portfólio e como operamos entre Brasil e Estados Unidos."
        }
        href={indexHref}
        cta={en ? "Back to News" : "Voltar para Notícias"}
        image={BACK_MEDIA.chrysler}
        imageAlt="Head Oversea"
        quote={
          en
            ? "Context first. Capital second."
            : "Contexto primeiro. Capital depois."
        }
      />
    </BackShell>
  );
}
