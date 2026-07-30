import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/page-intro";
import { JournalCard } from "@/components/sections/journal-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { journalPosts } from "@/content/journal";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the brew bar and kitchen at Artha Speciality Coffee, Sainikpuri.",
  alternates: { canonical: "/journal" },
};

export default function JournalIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Journal", path: "/journal" }]),
          ),
        }}
      />

      <PageIntro
        eyebrow="Journal"
        heading="Notes from the brew bar and kitchen"
        lead="Short reads on the coffee, the food, and the idea behind Artha."
      />

      <section className="bg-background pt-4 pb-20 md:pt-8 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {journalPosts.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i * 0.08, 0.24)}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
