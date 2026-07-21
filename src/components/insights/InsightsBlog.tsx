import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { getContent } from "@/lib/content";
import type { Insight, Locale } from "@/types/content";

const COPY = {
  pt: {
    badge: "Notícias",
    heading: "Perspectivas",
    subtitle:
      "Análises, teses e bastidores sobre active ownership, capital e governança entre Brasil e Estados Unidos.",
    viewAll: "Ver todas as notícias",
    mustRead: "Leitura obrigatória",
  },
  en: {
    badge: "News",
    heading: "Perspectives",
    subtitle:
      "Analysis, theses, and the inside view on active ownership, capital, and governance between Brazil and the U.S.",
    viewAll: "View all posts",
    mustRead: "Must read",
  },
} as const;

function Corners() {
  return (
    <>
      <span className="pointer-events-none absolute left-[15px] top-[15px] h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute right-[15px] top-[15px] h-3 w-3 border-r-[1.5px] border-t-[1.5px] border-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-[15px] left-[15px] h-3 w-3 border-b-[1.5px] border-l-[1.5px] border-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-[15px] right-[15px] h-3 w-3 border-b-[1.5px] border-r-[1.5px] border-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </>
  );
}

function CategoryBadge({ label, color }: { label: string; color?: string }) {
  return (
    <span
      className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
      style={{ background: color ?? "var(--champagne-deep)" }}
    >
      {label}
    </span>
  );
}

function InsightMedia({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`group relative overflow-hidden bg-graphite ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.08]"
      />
      <span className="pointer-events-none absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-[70px] w-[70px] scale-[0.7] items-center justify-center rounded-full bg-white/20 text-3xl font-light leading-none text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          +
        </span>
      </span>
      <Corners />
    </div>
  );
}

export function InsightsBlog({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const t = COPY[locale];
  const items = content.insights.items;
  const featured = items[0];
  const rest = items.slice(1, 4);

  return (
    <section className="bg-obsidian pb-28 pt-32 md:pt-40">
      <Container>
        {/* Header */}
        <FadeIn>
          <span className="inline-block rounded-lg bg-graphite px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-stone">
            {t.badge}
          </span>
        </FadeIn>
        <div className="mt-6 flex flex-col gap-8 border-b border-border pb-14 md:flex-row md:items-end md:justify-between">
          <FadeIn>
            <h1 className="text-metallic font-display font-light leading-none tracking-tight [font-size:clamp(3rem,7vw,5rem)]">
              {t.heading}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col gap-6 md:max-w-[480px] md:items-start">
            <p className="text-lg font-light leading-relaxed text-stone">{t.subtitle}</p>
            <Link
              href={featured?.href ?? "#"}
              className="inline-flex w-max items-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-semibold text-obsidian transition-transform duration-300 hover:scale-[1.02]"
            >
              {t.viewAll}
            </Link>
          </FadeIn>
        </div>

        {/* Featured */}
        {featured && <Featured post={featured} mustRead={t.mustRead} />}

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <FadeIn key={post.title} delay={i * 0.08}>
              <Link href={post.href} className="block">
                <InsightMedia
                  src={post.image ?? "/images/nyc-chrysler-building-midtown.jpg"}
                  alt={post.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[16/10] w-full rounded-[20px]"
                />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-medium leading-snug text-ivory">
                    {post.title}
                  </h3>
                  <CategoryBadge label={post.category} color={post.categoryColor} />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Featured({ post, mustRead }: { post: Insight; mustRead: string }) {
  return (
    <FadeIn>
      <article className="grid min-h-[520px] overflow-hidden rounded-[20px] border border-border bg-charcoal lg:grid-cols-2">
        <InsightMedia
          src={post.image ?? "/images/nyc-chrysler-building-midtown.jpg"}
          alt={post.title}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="min-h-[280px] w-full lg:min-h-full"
        />
        <div className="flex flex-col p-10 md:p-14 lg:p-[60px]">
          <span className="w-max rounded-[20px] bg-ivory px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-obsidian">
            {mustRead}
          </span>
          <Link href={post.href}>
            <h2 className="mt-8 font-display font-medium leading-[1.05] tracking-tight text-ivory transition-colors hover:text-champagne [font-size:clamp(2rem,3.5vw,3rem)]">
              {post.title}
            </h2>
          </Link>
          {post.description && (
            <p className="mt-6 max-w-md text-[17px] font-light leading-relaxed text-stone">
              {post.description}
            </p>
          )}
          <div className="mt-auto flex items-center justify-between gap-4 pt-10">
            <span className="text-sm text-stone">{post.author}</span>
            <CategoryBadge label={post.category} color={post.categoryColor} />
          </div>
        </div>
      </article>
    </FadeIn>
  );
}
