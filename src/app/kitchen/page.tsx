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
    "The kitchen at Artha runs five vegetarian programmes from one address — Andhra traditional, Italian pasta, Indo-Chinese, tandoor and bistro — served 12pm to 11pm.",
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
        lead="Andhra traditional, Italian pasta, Indo-Chinese, tandoor and bistro — five full food programmes from one fully vegetarian kitchen."
      />

      <MenuLanes lanes={kitchenLanes} note={vegetarianNote} />

      <SplitFeature
        eyebrow="Range Without Compromise"
        heading="Five cuisines. One vegetarian pantry."
        paragraphs={[
          "Running Andhra gravies, Italian pasta, Indo-Chinese wok dishes, and tandoor off a single vegetarian pantry sounds harder than a smaller menu — and it is. It's also exactly the gap we saw on this street.",
          "The kitchen runs on induction, not gas, which gives tighter heat control across every station, and keeps a fully electric cold chain holding produce, dairy and prepared gravies at the right temperature across three floors.",
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
