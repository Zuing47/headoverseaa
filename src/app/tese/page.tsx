import { ThesisPageView } from "@/components/pages/ThesisPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta({
  title: "Nossa Tese",
  description:
    "No que a Head Oversea investe e por quê — o critério de active ownership que define quais empresas conduzimos a valor de longo prazo.",
  path: "/tese",
});

export default function TesePage() {
  return (
    <>
      <InteriorJsonLd
        locale="pt"
        path="/tese"
        name="Nossa Tese"
        description="No que a Head Oversea investe e por quê — o critério de active ownership que define quais empresas conduzimos a valor de longo prazo."
        crumbs={[homeCrumb("pt"), { name: "Tese", path: "/tese" }]}
      />
      <ThesisPageView content={getContent("pt")} locale="pt" />
    </>
  );
}
