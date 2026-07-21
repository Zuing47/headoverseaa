import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { FoundersPageView } from "@/components/pages/FoundersPageView";

export const metadata: Metadata = {
  alternates: { canonical: "/fundadores" },
  title: "Para Fundadores",
  description:
    "Um sócio operacional que entra na empresa para estruturar governança, criar valor e conduzir capital e expansão — sem que você perca o controle da visão.",
};

export default function FundadoresPage() {
  return <FoundersPageView content={getContent("pt")} locale="pt" />;
}
