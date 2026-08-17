import { HowWeWorkPageView } from "@/components/pages/HowWeWorkPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta({
  title: "Como Atuamos",
  description:
    "O que muda quando a Head Oversea entra como sócia: operação, governança e capital trabalhados em paralelo, com metodologia comprovada e presença nos EUA.",
  path: "/como-atuamos",
});

export default function ComoAtuamosPage() {
  const content = getContent("pt");
  return (
    <>
      <InteriorJsonLd
        locale="pt"
        path="/como-atuamos"
        name="Como Atuamos"
        description="O que muda quando a Head Oversea entra como sócia: operação, governança e capital trabalhados em paralelo, com metodologia comprovada e presença nos EUA."
        crumbs={[
          homeCrumb("pt"),
          { name: "Como atuamos", path: "/como-atuamos" },
        ]}
        faq={content.faq.items}
      />
      <HowWeWorkPageView content={content} locale="pt" />
    </>
  );
}
