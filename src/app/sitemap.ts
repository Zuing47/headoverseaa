import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://headoversea.com";
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/pt", priority: 1, changeFrequency: "weekly" },
    { path: "/private-equity", priority: 0.9, changeFrequency: "monthly" },
    { path: "/real-estate", priority: 0.9, changeFrequency: "monthly" },
    { path: "/cases", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cases/riolaser", priority: 0.8, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/materiais", priority: 0.8, changeFrequency: "monthly" },
    { path: "/insights/presenca-operacional-eua", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insights/riolaser-mercado-americano", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insights/real-estate-dois-mercados", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insights/governanca-ativa-ownership", priority: 0.7, changeFrequency: "monthly" },
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
    { path: "/en/cases/riolaser", priority: 0.8, changeFrequency: "monthly" },
    { path: "/en/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/en/materials", priority: 0.8, changeFrequency: "monthly" },
    { path: "/en/insights/us-operational-presence", priority: 0.7, changeFrequency: "monthly" },
    { path: "/en/insights/riolaser-us-market", priority: 0.7, changeFrequency: "monthly" },
    { path: "/en/insights/real-estate-two-markets", priority: 0.7, changeFrequency: "monthly" },
    { path: "/en/insights/active-governance-ownership", priority: 0.7, changeFrequency: "monthly" },
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
