import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { CaseStoryPageView } from "@/components/pages/CaseStoryPageView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("en")
    .cases.items.filter((c) => Boolean(c.detail) && c.format !== "brand")
    .map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContent("en").cases.items.find(
    (c) => c.id === slug && c.detail && c.format !== "brand",
  );
  if (!item) return {};

  return pageMeta({
    title: `${item.company} | Head Oversea Case`,
    description: item.detail?.summary ?? item.description ?? item.headline,
    path: `/en/cases/${slug}`,
    image: item.image,
    imageAlt: `${item.company} — Head Oversea case`,
  });
}

export default async function CaseStoryPageEn({ params }: Props) {
  const { slug } = await params;
  const content = getContent("en");
  const item = content.cases.items.find(
    (c) => c.id === slug && c.detail && c.format !== "brand",
  );
  if (!item?.detail) notFound();

  return (
    <CaseStoryPageView content={content} locale="en" item={item} />
  );
}
