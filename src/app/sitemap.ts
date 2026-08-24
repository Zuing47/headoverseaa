import type { MetadataRoute } from "next";
import { alternateLocalePath, getContent } from "@/lib/content";
import { newsRedisConfigured } from "@/lib/news/config";
import { listPublished } from "@/lib/news/store";
import { absoluteUrl, getPublicSiteUrl } from "@/lib/site";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

type Route = {
  path: string;
  altPath: string;
  priority: number;
  changeFrequency: Freq;
  lastModified?: Date;
};

function entry(
  origin: string,
  route: Route,
): MetadataRoute.Sitemap[number] {
  const isPt = !route.path.startsWith("/en") && route.path !== "/";
  const ptPath = isPt ? route.path : route.altPath;
  const enPath = isPt ? route.altPath : route.path;

  return {
    url: absoluteUrl(route.path, origin),
    ...(route.lastModified ? { lastModified: route.lastModified } : {}),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        "pt-BR": absoluteUrl(ptPath, origin),
        "en-US": absoluteUrl(enPath, origin),
        "x-default": absoluteUrl(enPath, origin),
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getPublicSiteUrl();

  const caseIds = getContent("en")
    .cases.items.filter((c) => Boolean(c.detail) && c.format !== "brand")
    .map((c) => c.id);

  const insightByLocale = {
    pt: new Map<string, Date | undefined>(),
    en: new Map<string, Date | undefined>(),
  };

  for (const item of getContent("pt").insights.items) {
    insightByLocale.pt.set(item.slug, undefined);
  }
  for (const item of getContent("en").insights.items) {
    insightByLocale.en.set(item.slug, undefined);
  }

  if (newsRedisConfigured()) {
    try {
      const published = await listPublished(100);
      for (const a of published) {
        if (a.status !== "published") continue;
        const t = Date.parse(a.publishedAt || a.updatedAt || "");
        const date = Number.isNaN(t) ? undefined : new Date(t);
        if (a.locale === "pt") insightByLocale.pt.set(a.slug, date);
        else insightByLocale.en.set(a.slug, date);
      }
    } catch {
      // static insights still listed
    }
  }

  const staticRoutes: Route[] = [
    { path: "/", altPath: "/pt", priority: 1, changeFrequency: "weekly" },
    { path: "/pt", altPath: "/", priority: 1, changeFrequency: "weekly" },
    {
      path: "/private-equity",
      altPath: "/en/private-equity",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/en/private-equity",
      altPath: "/private-equity",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/real-estate",
      altPath: "/en/real-estate",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/en/real-estate",
      altPath: "/real-estate",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/cases",
      altPath: "/en/cases",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      path: "/en/cases",
      altPath: "/cases",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    ...caseIds.flatMap((id) => [
      {
        path: `/cases/${id}`,
        altPath: `/en/cases/${id}`,
        priority: 0.8,
        changeFrequency: "monthly" as const,
      },
      {
        path: `/en/cases/${id}`,
        altPath: `/cases/${id}`,
        priority: 0.8,
        changeFrequency: "monthly" as const,
      },
    ]),
    {
      path: "/news",
      altPath: "/en/news",
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      path: "/en/news",
      altPath: "/news",
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      path: "/materiais",
      altPath: "/en/materials",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/materials",
      altPath: "/materiais",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/sobre",
      altPath: "/en/about",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/en/about",
      altPath: "/sobre",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/tese",
      altPath: "/en/thesis",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/thesis",
      altPath: "/tese",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/como-atuamos",
      altPath: "/en/how-we-work",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/how-we-work",
      altPath: "/como-atuamos",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/servicos",
      altPath: "/en/services",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/services",
      altPath: "/servicos",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/fundadores",
      altPath: "/en/founders",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/founders",
      altPath: "/fundadores",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/investidores",
      altPath: "/en/investors",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/investors",
      altPath: "/investidores",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/por-que-head-oversea",
      altPath: "/en/why-head-oversea",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/en/why-head-oversea",
      altPath: "/por-que-head-oversea",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/contato",
      altPath: "/en/contact",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/en/contact",
      altPath: "/contato",
      priority: 0.8,
      changeFrequency: "monthly",
    },
  ];

  const newsRoutes: Route[] = [];
  for (const [slug, lastModified] of insightByLocale.pt) {
    newsRoutes.push({
      path: `/news/${slug}`,
      altPath: alternateLocalePath(`/news/${slug}`),
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified,
    });
  }
  for (const [slug, lastModified] of insightByLocale.en) {
    newsRoutes.push({
      path: `/en/news/${slug}`,
      altPath: alternateLocalePath(`/en/news/${slug}`),
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified,
    });
  }

  return [...staticRoutes, ...newsRoutes].map((route) => entry(origin, route));
}
