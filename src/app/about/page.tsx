import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { PullQuote } from "@/components/sections/pull-quote";
import { TeamCard } from "@/components/sections/team-card";
import { ValuesGrid } from "@/components/sections/values-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ourStory, philosophy } from "@/content/story";
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
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Our Story", path: "/about" }]),
          ),
        }}
      />

      <PageIntro eyebrow={ourStory.eyebrow} heading={ourStory.heading} />

      <section className="bg-background pt-4 pb-24 md:pt-8 md:pb-32">
        <Container>
          <Reveal className="mx-auto max-w-2xl">
            <div className="flex flex-col gap-6">
              {ourStory.paragraphs.map((p) => (
                <p key={p} className="text-body-lg text-foreground/75 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-background py-24 md:py-32">
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <Eyebrow>Who&apos;s Behind It</Eyebrow>
            <h2 className="text-display-h2 font-display text-coffee mt-4">
              Between them, nineteen years in F&amp;B and eight years in
              operations.
            </h2>
          </Reveal>

          <div className="mt-14">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <ValuesGrid />

      <PullQuote>{philosophy.body}</PullQuote>

      <CtaBand
        eyebrow="Come See It For Yourself"
        heading="We have a rooftop upstairs and a kitchen downstairs, open 10am to 11pm daily."
      />
    </>
  );
}
