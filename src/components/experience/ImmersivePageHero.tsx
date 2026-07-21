import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ImmersiveNav } from "@/components/experience/ImmersiveNav";
import { Reveal } from "@/components/experience/Reveal";
import type { SiteContent, Locale } from "@/types/content";

interface ImmersivePageHeroProps {
  content: SiteContent;
  locale?: Locale;
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
}

/** Compact photo hero band with the shared solid header — used across inner immersive pages. */
export function ImmersivePageHero({
  content,
  locale = "pt",
  eyebrow,
  title,
  subtitle,
  image = "/images/about.jpg",
}: ImmersivePageHeroProps) {
  return (
    <section className="relative flex h-[58vh] min-h-[480px] flex-col overflow-hidden">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-center" />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(7,7,8,0.7) 0%, rgba(7,7,8,0.5) 40%, rgba(7,7,8,0.92) 100%)",
        }}
      />
      <ImmersiveNav content={content} locale={locale} />
      <Container className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end pt-24 pb-12 md:pt-28">
        <Reveal immediate as="p" delay={0.1} y={20} className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-champagne">
          {eyebrow}
        </Reveal>
        <Reveal
          immediate
          as="h1"
          delay={0.2}
          y={40}
          className="text-metallic font-display max-w-3xl font-normal leading-[1.05] tracking-tight [font-size:clamp(1.9rem,4vw,3.4rem)]"
        >
          {title}
        </Reveal>
        {subtitle && (
          <Reveal immediate as="p" delay={0.35} y={20} className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/70 md:text-base">
            {subtitle}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
