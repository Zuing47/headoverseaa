import { AboutPageView } from "@/components/pages/AboutPageView";
import { AboutTeamJsonLd } from "@/components/seo/AboutTeamJsonLd";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sobre nós",
  description:
    "Conheça a Head Oversea — firma de private equity e real estate com ownership ativo entre Brasil e Estados Unidos.",
  path: "/sobre",
  image: "/images/private-equity-team-collaboration.jpg",
  imageAlt: "Head Oversea — Sobre nós",
  keywords: [
    "sobre",
    "Head Oversea",
    "time",
    "Douglas Bubna",
    "private equity",
    "active ownership",
  ],
});

export default function AboutPage() {
  const content = getContent("pt");
  return (
    <>
      <AboutTeamJsonLd team={content.about.team} locale="pt" />
      <AboutPageView content={content} locale="pt" />
    </>
  );
}
