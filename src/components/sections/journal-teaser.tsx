import { journalPosts } from "@/content/journal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { JournalCard } from "@/components/sections/journal-card";

export function JournalTeaser() {
  const posts = journalPosts.slice(0, 3);

  return (
    <section id="journal" className="bg-background py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow>Journal</Eyebrow>
          <h2 className="mt-4 text-display-h2 font-display text-coffee">
            Notes from the brew bar and kitchen
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <JournalCard post={post} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <Button href="/journal" variant="outline" className="text-coffee">
            Read the Journal
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
