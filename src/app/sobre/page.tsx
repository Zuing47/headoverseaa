import { AboutPageView } from "@/components/pages/AboutPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sobre nós",
  description:
    "Conheça a Head Oversea — a firma e as pessoas por trás do equity entre Brasil e Estados Unidos.",
  path: "/sobre",
  image: "/images/private-equity-team-collaboration.jpg",
  imageAlt: "Head Oversea — Sobre nós",
  keywords: ["sobre", "Head Oversea", "time", "Douglas Bubna"],
});

export default function AboutPage() {
  return <AboutPageView content={getContent("pt")} locale="pt" />;
}
