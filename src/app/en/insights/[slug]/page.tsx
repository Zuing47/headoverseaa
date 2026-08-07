import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { NewsArticlePageView } from "@/components/pages/NewsArticlePageView";
import {
  ArticleJsonLd,
  insightDatePublished,
} from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("en").insights.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContent("en").insights.items.find((a) => a.slug === slug);
  if (!item) return {};

  return pageMeta({
    title: item.title,
    description: item.description ?? item.title,
    path: `/en/insights/${slug}`,
    image: item.image,
    imageAlt: item.title,
    type: "article",
    publishedTime: insightDatePublished(item.date),
  });
}

export default async function EnglishNewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const content = getContent("en");
  const article = content.insights.items.find((a) => a.slug === slug);
  if (!article) notFound();

  const path = `/en/insights/${slug}`;

  return (
    <>
      <ArticleJsonLd article={article} locale="en" path={path} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "News", path: "/en/insights" },
          { name: article.title, path },
        ]}
      />
      <NewsArticlePageView content={content} locale="en" article={article} />
    </>
  );
}
