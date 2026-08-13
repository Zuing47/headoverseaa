import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { getPublicInsightBySlug } from "@/lib/news/public";
import { pageMeta } from "@/lib/seo";
import { NewsArticlePageView } from "@/components/pages/NewsArticlePageView";
import {
  ArticleJsonLd,
  insightDatePublished,
} from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublicInsightBySlug("pt", slug);
  if (!item) return {};

  return pageMeta({
    title: item.title,
    description: item.description ?? item.title,
    path: `/insights/${slug}`,
    image: item.image,
    imageAlt: item.title,
    type: "article",
    publishedTime: insightDatePublished(item.date),
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const content = getContent("pt");
  const article = await getPublicInsightBySlug("pt", slug);
  if (!article) notFound();

  const path = `/insights/${slug}`;

  return (
    <>
      <ArticleJsonLd article={article} locale="pt" path={path} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/pt" },
          { name: "News", path: "/insights" },
          { name: article.title, path },
        ]}
      />
      <NewsArticlePageView content={content} locale="pt" article={article} />
    </>
  );
}
