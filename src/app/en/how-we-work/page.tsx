import { HowWeWorkPageView } from "@/components/pages/HowWeWorkPageView";
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
  return <HowWeWorkPageView content={getContent("en")} locale="en" />;
}
