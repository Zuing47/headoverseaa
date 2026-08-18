import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { getWhyFaq } from "@/lib/content/why-faq";
import { pageMeta } from "@/lib/seo";
import { WhyHeadOverseaPageView } from "@/components/pages/WhyHeadOverseaPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";

export const metadata: Metadata = pageMeta({
  title: "Por que Head Oversea | Para Investidores",
  description:
    "Por que investir com a Head Oversea: active ownership Brasil–EUA, presença operacional, deal flow seletivo e histórico em equity — para family offices e investidores institucionais.",
  path: "/por-que-head-oversea",
  image: "/images/us-skyline-presence.jpg",
  imageAlt:
    "Presença nos Estados Unidos — Head Oversea private equity e real estate",
  keywords: [
    "por que Head Oversea",
    "investir private equity Brasil EUA",
    "active ownership",
    "family office",
    "investidores institucionais",
    "Head Oversea",
  ],
});

export default function PorQueHeadOverseaPage() {
  return (
    <>
      <InteriorJsonLd
        locale="pt"
        path="/por-que-head-oversea"
        name="Por que Head Oversea | Para Investidores"
        description="Por que investir com a Head Oversea: active ownership Brasil–EUA, presença operacional, deal flow seletivo e histórico em equity — para family offices e investidores institucionais."
        crumbs={[
          homeCrumb("pt"),
          { name: "Por que Head Oversea", path: "/por-que-head-oversea" },
        ]}
        faq={getWhyFaq("pt")}
      />
      <WhyHeadOverseaPageView content={getContent("pt")} locale="pt" />
    </>
  );
}
