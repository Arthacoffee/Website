import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { MenuLanes } from "@/components/sections/menu-lanes";
import { SplitFeature } from "@/components/sections/split-feature";
import { CtaBand } from "@/components/sections/cta-band";
import { coffeeLanes } from "@/content/menu";
import { brewBarStory } from "@/content/story";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Coffee",
  description:
    "The specialty coffee programme at Artha — filter, V60, cold brew, tasting flights and espresso classics, served 10am to 11pm from a brew bar built around one machine.",
  alternates: { canonical: "/coffee" },
};

export default function CoffeePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Coffee", path: "/coffee" }]),
          ),
        }}
      />

      <PageIntro
        eyebrow="Coffee"
        heading="A brew bar built for the whole day."
        lead="Filter, V60, cold brew, tasting flights and espresso classics — poured all day, every day."
      />

      <MenuLanes lanes={coffeeLanes} />

      <SplitFeature
        eyebrow={brewBarStory.eyebrow}
        heading={brewBarStory.heading}
        paragraphs={brewBarStory.paragraphs}
        cta={{
          label: "Read the Full Story",
          href: "/journal/why-we-built-our-brew-bar-around-one-machine",
        }}
        imageCategory="coffee"
        tone="stone"
      />

      <CtaBand
        eyebrow="Ready For A Pour?"
        heading="The brew bar is open 10am to 11pm, daily."
      />
    </>
  );
}
