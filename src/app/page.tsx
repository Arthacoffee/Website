import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SplitFeature } from "@/components/sections/split-feature";
import { ExperienceSection } from "@/components/sections/experience-section";
import { VisitTeaser } from "@/components/sections/visit-teaser";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { brewBarStory } from "@/content/story";
import { site } from "@/content/site";
import { restaurantJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }}
      />

      <Hero />

      <SplitFeature
        id="kitchen"
        eyebrow="The Kitchen"
        heading="Our Kitchen"
        paragraphs={[
          "We cook Andhra food for lunch, brunch in the morning, and Italian pasta and bistro food in the evening. Everything we cook is vegetarian.",
        ]}
        cta={{ label: "Explore Kitchen", href: "/kitchen" }}
        imageCategory="kitchen"
        imageSrc="/images/kitchen/banana-leaf-thali.jpg"
        imageAlt="A traditional Andhra meal served on a banana leaf"
        tone="stone"
      />

      <SplitFeature
        id="coffee-stories"
        eyebrow={brewBarStory.eyebrow}
        heading={brewBarStory.heading}
        paragraphs={[
          "Our Head Barista checks and adjusts the recipe each time we get a new batch of beans, so your coffee tastes the same no matter which day you visit.",
        ]}
        cta={{ label: "Explore Coffee", href: "/coffee" }}
        imageCategory="coffee"
        imageSrc="/images/coffee/pour-over-pour.jpg"
        imageAlt="Pouring water over a V60 filter at the Artha brew bar"
        reverse
      />

      <ExperienceSection />
      <JournalTeaser />
      <VisitTeaser />
    </>
  );
}
