import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { NewsArticlePageView } from "@/components/pages/NewsArticlePageView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("pt").insights.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContent("pt").insights.items.find((a) => a.slug === slug);
  if (!item) return {};

  return pageMeta({
    title: item.title,
    description: item.description ?? item.title,
    path: `/insights/${slug}`,
    image: item.image,
    imageAlt: item.title,
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const content = getContent("pt");
  const article = content.insights.items.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <NewsArticlePageView content={content} locale="pt" article={article} />
  );
}
