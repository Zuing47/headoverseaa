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
  const item = await getPublicInsightBySlug("pt", slug);
  if (!item) return { robots: { index: false, follow: true } };

  return pageMeta({
    title: item.title,
    description: item.description ?? item.title,
    path: `/news/${slug}`,
    image: item.image,
    imageAlt: item.title,
    type: "article",
    publishedTime: insightDatePublished(item.date, item.dateIso),
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const content = getContent("pt");
  const article = await getPublicInsightBySlug("pt", slug);
  if (!article) notFound();

  const path = `/news/${slug}`;

  return (
    <>
      <ArticleJsonLd
        article={article}
        locale="pt"
        path={path}
        crumbs={[
          { name: "Home", path: "/pt" },
          { name: "Notícias", path: "/news" },
          { name: article.title, path },
        ]}
      />
      <NewsArticlePageView content={content} locale="pt" article={article} />
    </>
  );
}
