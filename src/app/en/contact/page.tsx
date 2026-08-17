import { ContactPageView } from "@/components/pages/ContactPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Talk to the Head Oversea team. Active ownership across private equity and real estate between Brazil and the United States.",
  path: "/en/contact",
  image: "/images/us-skyline-presence.jpg",
  imageAlt: "Contact Head Oversea — U.S. and Brazil investment markets",
  keywords: ["contact", "Head Oversea", "Orlando", "private equity"],
});

export default function EnglishContactPage() {
  return (
    <>
      <InteriorJsonLd
        locale="en"
        path="/en/contact"
        name="Contact"
        description="Talk to the Head Oversea team. Active ownership across private equity and real estate between Brazil and the United States."
        type="ContactPage"
        crumbs={[homeCrumb("en"), { name: "Contact", path: "/en/contact" }]}
      />
      <ContactPageView content={getContent("en")} locale="en" />
    </>
  );
}
