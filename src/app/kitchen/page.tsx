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
    "The kitchen at Artha runs five vegetarian food programmes — Andhra traditional, Italian pasta, Indo-Chinese, tandoor and bistro — plus an all-day brunch menu, served 10am to 11pm.",
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
        lead="Andhra traditional, Italian pasta, Indo-Chinese, tandoor and bistro — five food programmes and an all-day brunch, from one fully vegetarian kitchen."
      />

      <MenuLanes lanes={kitchenLanes} note={vegetarianNote} />

      <SplitFeature
        eyebrow="Range Without Compromise"
        heading="Five cuisines. One vegetarian pantry, brunch to bistro."
        paragraphs={[
          "Andhra gravies, Italian pasta, Indo-Chinese wok dishes, and tandoor — all from one vegetarian pantry. It takes more care than a smaller menu, and it's worth it.",
          "The kitchen runs on induction, not gas, for tighter heat control and a cleaner, cooler room.",
        ]}
        cta={{
          label: "Read the Full Story",
          href: "/journal/a-fully-vegetarian-kitchen-done-seriously",
        }}
        imageCategory="kitchen"
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
