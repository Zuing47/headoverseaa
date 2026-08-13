import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { newsRedisConfigured } from "@/lib/news/config";
import { listPublished } from "@/lib/news/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://headoversea.com";
  const lastModified = new Date();

  const caseIds = getContent("en")
    .cases.items.filter((c) => Boolean(c.detail) && c.format !== "brand")
    .map((c) => c.id);

  const insightPt = new Set(getContent("pt").insights.items.map((i) => i.slug));
  const insightEn = new Set(getContent("en").insights.items.map((i) => i.slug));

  if (newsRedisConfigured()) {
    try {
      const published = await listPublished(100);
      for (const a of published) {
        if (a.status !== "published") continue;
        if (a.locale === "pt") insightPt.add(a.slug);
        else insightEn.add(a.slug);
      }
    } catch {
      // sitemap still works with static only
    }
  }

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/pt", priority: 1, changeFrequency: "weekly" },
    { path: "/private-equity", priority: 0.9, changeFrequency: "monthly" },
    { path: "/real-estate", priority: 0.9, changeFrequency: "monthly" },
    { path: "/cases", priority: 0.9, changeFrequency: "weekly" },
    ...caseIds.map((id) => ({
      path: `/cases/${id}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/materiais", priority: 0.8, changeFrequency: "monthly" },
    ...[...insightPt].map((slug) => ({
      path: `/insights/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    { path: "/sobre", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tese", priority: 0.7, changeFrequency: "monthly" },
    { path: "/como-atuamos", priority: 0.7, changeFrequency: "monthly" },
    { path: "/servicos", priority: 0.7, changeFrequency: "monthly" },
    { path: "/fundadores", priority: 0.7, changeFrequency: "monthly" },
    { path: "/investidores", priority: 0.7, changeFrequency: "monthly" },
    { path: "/por-que-head-oversea", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contato", priority: 0.8, changeFrequency: "monthly" },
    { path: "/en/private-equity", priority: 0.9, changeFrequency: "monthly" },
    { path: "/en/real-estate", priority: 0.9, changeFrequency: "monthly" },
    { path: "/en/cases", priority: 0.9, changeFrequency: "weekly" },
    ...caseIds.map((id) => ({
      path: `/en/cases/${id}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/en/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/en/materials", priority: 0.8, changeFrequency: "monthly" },
    ...[...insightEn].map((slug) => ({
      path: `/en/insights/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    { path: "/en/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/en/why-head-oversea", priority: 0.9, changeFrequency: "monthly" },
    { path: "/en/services", priority: 0.7, changeFrequency: "monthly" },
    { path: "/en/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/en/thesis", priority: 0.7, changeFrequency: "monthly" },
    { path: "/en/how-we-work", priority: 0.7, changeFrequency: "monthly" },
    { path: "/en/founders", priority: 0.7, changeFrequency: "monthly" },
    { path: "/en/investors", priority: 0.7, changeFrequency: "monthly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
