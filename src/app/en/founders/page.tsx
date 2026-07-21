import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { FoundersPageView } from "@/components/pages/FoundersPageView";

export const metadata: Metadata = pageMeta({
  title: "For Founders",
  description:
    "An operating partner who joins the company to structure governance, create value, and lead capital and expansion — without losing control of the vision.",
  path: "/en/founders",
});

export default function EnFoundersPage() {
  return <FoundersPageView content={getContent("en")} locale="en" />;
}
