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
    "The kitchen at Artha runs four vegetarian food programmes — brunch, Andhra traditional, Italian pasta and bistro — served 10am to 11pm.",
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
        heading="A full vegetarian table, taken seriously."
        lead="Andhra traditional, Italian pasta, brunch and bistro — four food programmes, from one vegetarian kitchen."
      />

      <MenuLanes lanes={kitchenLanes} note={vegetarianNote} />

      <SplitFeature
        eyebrow="Range Without Compromise"
        heading="Four programmes. One vegetarian pantry, brunch to bistro."
        paragraphs={[
          "Andhra gravies and Italian pasta — all from one vegetarian pantry, brunch to bistro. More care than a smaller menu. Worth it.",
          "The kitchen runs on induction, not gas — tighter heat control, a cleaner, cooler room.",
        ]}
        cta={{
          label: "Read the Full Story",
          href: "/journal/a-fully-vegetarian-kitchen-done-seriously",
        }}
        imageCategory="kitchen"
        imageSrc="/images/kitchen/pasta-plating.jpg"
        imageAlt="Finishing a pasta dish at the Artha kitchen"
        reverse
        tone="stone"
      />

      <CtaBand
        eyebrow="Hungry?"
        heading="Table service only — walk in or reserve ahead."
      />
    </>
  );
}
