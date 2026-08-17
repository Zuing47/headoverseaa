import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { FoundersPageView } from "@/components/pages/FoundersPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Para Fundadores",
  description:
    "Um sócio operacional que entra na empresa para estruturar governança, criar valor e conduzir capital e expansão — sem que você perca o controle da visão.",
  path: "/fundadores",
  keywords: [
    "fundadores",
    "private equity",
    "vender participação",
    "Head Oversea",
    "governança",
  ],
});

export default function FundadoresPage() {
  return (
    <>
      <InteriorJsonLd
        locale="pt"
        path="/fundadores"
        name="Para Fundadores"
        description="Um sócio operacional que entra na empresa para estruturar governança, criar valor e conduzir capital e expansão — sem que você perca o controle da visão."
        crumbs={[
          homeCrumb("pt"),
          { name: "Fundadores", path: "/fundadores" },
        ]}
      />
      <FoundersPageView content={getContent("pt")} locale="pt" />
    </>
  );
}
