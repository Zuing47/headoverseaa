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

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublicInsightBySlug("en", slug);
  if (!item) return { robots: { index: false, follow: true } };

  return pageMeta({
    title: item.title,
    description: item.description ?? item.title,
    path: `/en/insights/${slug}`,
    image: item.image,
    imageAlt: item.title,
    type: "article",
    publishedTime: insightDatePublished(item.date, item.dateIso),
  });
}

export default async function EnglishNewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const content = getContent("en");
  const article = await getPublicInsightBySlug("en", slug);
  if (!article) notFound();

  const path = `/en/insights/${slug}`;

  return (
    <>
      <ArticleJsonLd
        article={article}
        locale="en"
        path={path}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "News", path: "/en/insights" },
          { name: article.title, path },
        ]}
      />
      <NewsArticlePageView content={content} locale="en" article={article} />
    </>
  );
}
