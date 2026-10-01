import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SplitFeature } from "@/components/sections/split-feature";
import { PullQuote } from "@/components/sections/pull-quote";
import { ExperienceSection } from "@/components/sections/experience-section";
import { VisitTeaser } from "@/components/sections/visit-teaser";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { brewBarStory, whyWeExist } from "@/content/story";
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

      <PullQuote id="why-we-exist">{whyWeExist.body}</PullQuote>

      <SplitFeature
        id="kitchen"
        eyebrow="The Kitchen"
        heading="Andhra, Italian, brunch to bistro — entirely vegetarian."
        paragraphs={[
          "Andhra classics, Italian pasta, brunch and bistro — four menus, entirely vegetarian, eggs included, prepared with care.",
          "One kitchen, built to do it all properly — a vegetarian table deserves the same range as any other.",
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
        paragraphs={brewBarStory.paragraphs}
        cta={{ label: "Explore Coffee", href: "/coffee" }}
        imageCategory="coffee"
        imageSrc="/images/coffee/pour-over-pour.jpg"
        imageAlt="Pouring water over a V60 filter at the Artha brew bar"
        reverse
      />

      <PullQuote attribution="From the Journal">
        It&apos;s not about having the fanciest machine on the street. It&apos;s about
        the cup being right, every single time.
      </PullQuote>

      <ExperienceSection />
      <JournalTeaser />
      <VisitTeaser />
    </>
  );
}
