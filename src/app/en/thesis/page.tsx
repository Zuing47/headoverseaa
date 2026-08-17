import { ThesisPageView } from "@/components/pages/ThesisPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta({
  title: "Our Thesis",
  description:
    "What Head Oversea invests in and why — the active ownership criteria that define which companies we lead to long-term value.",
  path: "/en/thesis",
});

export default function EnThesisPage() {
  return (
    <>
      <InteriorJsonLd
        locale="en"
        path="/en/thesis"
        name="Our Thesis"
        description="What Head Oversea invests in and why — the active ownership criteria that define which companies we lead to long-term value."
        crumbs={[homeCrumb("en"), { name: "Thesis", path: "/en/thesis" }]}
      />
      <ThesisPageView content={getContent("en")} locale="en" />
    </>
  );
}
