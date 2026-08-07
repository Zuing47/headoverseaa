import { ServicesPageView } from "@/components/pages/ServicesPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "How we work",
  description:
    "Private equity and real estate with active ownership — governance, operations, and capital across the Brazil–United States corridor.",
  path: "/en/services",
  keywords: [
    "private equity",
    "real estate",
    "active ownership",
    "Head Oversea",
    "Brazil United States",
  ],
});

export default function EnglishServicesPage() {
  return <ServicesPageView content={getContent("en")} locale="en" />;
}
