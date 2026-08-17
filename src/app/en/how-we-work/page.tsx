import { HowWeWorkPageView } from "@/components/pages/HowWeWorkPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta({
  title: "How We Work",
  description:
    "What changes when Head Oversea joins as a partner: operations, governance, and capital worked in parallel — with proven methodology and U.S. presence.",
  path: "/en/how-we-work",
});

export default function EnHowWeWorkPage() {
  const content = getContent("en");
  return (
    <>
      <InteriorJsonLd
        locale="en"
        path="/en/how-we-work"
        name="How We Work"
        description="What changes when Head Oversea joins as a partner: operations, governance, and capital worked in parallel — with proven methodology and U.S. presence."
        crumbs={[
          homeCrumb("en"),
          { name: "How we work", path: "/en/how-we-work" },
        ]}
        faq={content.faq.items}
      />
      <HowWeWorkPageView content={content} locale="en" />
    </>
  );
}
