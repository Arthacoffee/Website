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
        heading="Andhra, Italian, Indo-Chinese, tandoor — entirely vegetarian."
        paragraphs={[
          "Andhra classics, Italian pasta, Indo-Chinese, tandoor and bistro — five menus, entirely vegetarian, including egg dishes prepared with dedicated equipment and clear labelling.",
          "One kitchen, built to do all of it properly — because a vegetarian table deserves the same range as any other.",
        ]}
        cta={{ label: "Explore Kitchen", href: "/kitchen" }}
        imageCategory="kitchen"
        tone="stone"
      />

      <SplitFeature
        id="coffee-stories"
        eyebrow={brewBarStory.eyebrow}
        heading={brewBarStory.heading}
        paragraphs={brewBarStory.paragraphs}
        cta={{ label: "Explore Coffee", href: "/coffee" }}
        imageCategory="coffee"
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
