import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { SplitFeature } from "@/components/sections/split-feature";
import { TeamCard } from "@/components/sections/team-card";
import { ValuesGrid } from "@/components/sections/values-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { whyWeExist, theIdea, brewBarStory } from "@/content/story";
import { team } from "@/content/team";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why Artha Speciality Coffee exists, who built it, and how a 19-year F&B career and an 8-year operations career came together on Defence Colony Road.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Our Story", path: "/about" }])),
        }}
      />

      <PageIntro eyebrow={whyWeExist.eyebrow} heading={whyWeExist.heading} lead={whyWeExist.body} />

      <SplitFeature
        eyebrow={theIdea.eyebrow}
        heading={theIdea.heading}
        paragraphs={theIdea.paragraphs}
        imageCategory="interior"
      />

      <section className="bg-background py-24 md:py-32">
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <Eyebrow>Who&apos;s Behind It</Eyebrow>
            <h2 className="mt-4 text-display-h2 font-display text-coffee">
              Nineteen years of selling F&amp;B. Eight years of fixing it.
            </h2>
          </Reveal>

          <div className="mt-14">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <SplitFeature
        eyebrow={brewBarStory.eyebrow}
        heading={brewBarStory.heading}
        paragraphs={brewBarStory.paragraphs}
        imageCategory="coffee"
        reverse
        tone="stone"
      />

      <ValuesGrid />

      <CtaBand
        eyebrow="Come See It For Yourself"
        heading="Three floors, one kitchen, and a rooftop waiting for you."
      />
    </>
  );
}
