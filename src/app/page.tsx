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
  title: `${site.fullName} — ${site.tagline}`,
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
        heading="Andhra, Italian, brunch to bistro — entirely vegetarian."
        paragraphs={[
          "Our Andhra classics, Italian pasta, brunch, and bistro — four menus, all vegetarian, eggs included.",
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
          "We make every cup on the same machine, by the same Head Barista, calibration to pour.",
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
