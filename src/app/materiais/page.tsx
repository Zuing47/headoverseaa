import type { Metadata } from "next";
import { MaterialsPageView } from "@/components/pages/MaterialsPageView";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Materiais de estudo",
  description:
    "Guias Head Oversea para download — private equity, real estate, expansão Brasil–EUA, governança e narrativa institucional.",
  path: "/materiais",
  image: "/og-nyc.jpg",
  imageAlt: "Head Oversea — materiais de estudo",
  keywords: [
    "materiais",
    "guias",
    "private equity",
    "real estate",
    "Head Oversea",
    "estudo",
  ],
});

export default function MateriaisPage() {
  return <MaterialsPageView locale="pt" />;
}
