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
        heading="One vegetarian kitchen, open all day."
        lead="We cook Andhra meals for lunch, pasta and small plates in the evening, and brunch in the morning. Everything is vegetarian."
      />

      <MenuLanes lanes={kitchenLanes} note={vegetarianNote} />

      <SplitFeature
        eyebrow="The Menu"
        heading="Why we cook all four."
        paragraphs={[
          "Most of our guests grew up on Andhra food, so we make a proper thali for lunch. The rest of the menu is there for when you want brunch with your morning coffee, or pasta and small plates on the rooftop at night.",
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
        eyebrow="Come Eat"
        heading="Walk in anytime, or book a table for your group."
      />
    </>
  );
}
