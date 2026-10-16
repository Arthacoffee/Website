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
    "Artha's specialty coffee menu: filter, V60, cold brew, tasting flights, and espresso classics, served 10am to 11pm from one brew bar.",
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
        heading="A brew bar that runs the whole day."
        lead="Filter, V60, cold brew, tasting flights, and espresso classics, poured all day, every day."
      />

      <MenuLanes lanes={coffeeLanes} />

      <SplitFeature
        eyebrow={brewBarStory.eyebrow}
        heading={brewBarStory.heading}
        paragraphs={[
          "Our Head Barista dials in every roast on one machine, so a cup you order on a Tuesday afternoon tastes just as good as your Sunday morning one.",
        ]}
        cta={{
          label: "Read the Full Story",
          href: "/journal/how-we-brew",
        }}
        imageCategory="coffee"
        imageSrc="/images/coffee/espresso-pull.jpg"
        imageAlt="An espresso shot pulling at Artha's brew bar"
        tone="stone"
      />

      <CtaBand
        eyebrow="Ready For A Pour?"
        heading="The brew bar is open 10am to 11pm, daily."
      />
    </>
  );
}
