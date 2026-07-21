import { ContactPageView } from "@/components/pages/ContactPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contato",
  description:
    "Fale com a equipe Head Oversea. Ownership ativo em private equity e real estate entre Brasil e Estados Unidos.",
  path: "/contato",
  image: "/images/us-skyline-presence.jpg",
  imageAlt: "Contact Head Oversea — U.S. and Brazil investment markets",
  keywords: ["contato", "Head Oversea", "Orlando", "private equity"],
});

export default function ContactPage() {
  return <ContactPageView content={getContent("pt")} locale="pt" />;
}
