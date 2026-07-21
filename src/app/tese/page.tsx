import { ThesisPageView } from "@/components/pages/ThesisPageView";
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
  return <ThesisPageView content={getContent("pt")} locale="pt" />;
}
