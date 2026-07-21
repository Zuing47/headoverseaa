import { ServicesPageView } from "@/components/pages/ServicesPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: alternates("/en/services"),
  title: "Services",
  description:
    "Equity by Service, Internationalization, M&A Advisory, and Real Estate — four pillars of the Equity Builders thesis.",
};

export default function EnglishServicesPage() {
  return <ServicesPageView content={getContent("en")} locale="en" />;
}
