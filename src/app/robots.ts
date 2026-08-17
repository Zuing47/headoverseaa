import type { MetadataRoute } from "next";
import { isIndexableEnv, getPublicSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const origin = getPublicSiteUrl();

  if (!isIndexableEnv()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      host: origin.replace(/^https?:\/\//, ""),
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin.replace(/^https?:\/\//, ""),
  };
}
