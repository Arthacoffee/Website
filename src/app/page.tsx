import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SplitFeature } from "@/components/sections/split-feature";
import { ExperienceSection } from "@/components/sections/experience-section";
import { VisitTeaser } from "@/components/sections/visit-teaser";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { whyWeExist, brewBarStory } from "@/content/story";
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
        id="why-we-exist"
        eyebrow={whyWeExist.eyebrow}
        heading={whyWeExist.heading}
        paragraphs={[whyWeExist.body]}
        cta={{ label: "Our Story", href: "/about" }}
        imageCategory="interior"
        tone="stone"
      />

      <SplitFeature
        id="coffee-stories"
        eyebrow="Coffee Stories"
        heading={brewBarStory.heading}
        paragraphs={brewBarStory.paragraphs}
        cta={{ label: "Explore Coffee", href: "/coffee" }}
        imageCategory="coffee"
        reverse
      />

      <SplitFeature
        id="kitchen"
        eyebrow="The Kitchen"
        heading="Andhra, Italian, Indo-Chinese, tandoor — entirely vegetarian."
        paragraphs={[
          "Five full food programmes from one fully vegetarian kitchen, including egg dishes prepared on dedicated equipment with clear FSSAI labelling.",
          "Running this much range off a single vegetarian pantry is harder than a smaller menu — and it's exactly the gap we saw on this street.",
        ]}
        cta={{ label: "Explore Kitchen", href: "/kitchen" }}
        imageCategory="kitchen"
        tone="stone"
      />

      <ExperienceSection />
      <VisitTeaser />
      <JournalTeaser />
    </>
  );
}
