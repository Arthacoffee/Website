import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { MenuLanes } from "@/components/sections/menu-lanes";
import { SplitFeature } from "@/components/sections/split-feature";
import { CtaBand } from "@/components/sections/cta-band";
import { kitchenLanes, vegetarianNote } from "@/content/menu";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Kitchen",
  description:
    "The kitchen at Artha runs four vegetarian menus: brunch, Andhra traditional, Italian pasta, and bistro, served 10am to 11pm.",
  alternates: { canonical: "/kitchen" },
};

export default function KitchenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Kitchen", path: "/kitchen" }]),
          ),
        }}
      />

      <PageIntro
        eyebrow="Kitchen"
        heading="Vegetarian Food"
        lead="We cook Andhra food, brunch, Italian pasta, and bistro food. Everything we cook is vegetarian."
      />

      <MenuLanes lanes={kitchenLanes} note={vegetarianNote} />

      <SplitFeature
        eyebrow="The Menu"
        heading="What we serve."
        paragraphs={[
          "Andhra food is what a lot of our guests grew up on. Few people still have the time to cook it at home, so we built our kitchen to make it for them. We also serve brunch in the morning, and Italian pasta and bistro food in the evening for anyone who wants something more modern. When you sit down for lunch, our thali is a full meal in one sitting: rice, pappu, sambar, rasam, a curry, curd, pickle, and papad, all together. Everything we cook is 100% vegetarian.",
        ]}
        cta={{
          label: "Read the Full Story",
          href: "/journal/why-we-built-the-menu-this-way",
        }}
        imageCategory="kitchen"
        imageSrc="/images/kitchen/pasta-plating.jpg"
        imageAlt="Finishing a pasta dish at the Artha kitchen"
        reverse
        tone="stone"
      />

      <CtaBand
        eyebrow="Visit Us"
        heading="Walk in anytime, or book a table for your group."
      />
    </>
  );
}
