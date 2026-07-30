import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ImageFrame, type ImageCategory } from "@/components/ui/image-frame";
import { CtaBand } from "@/components/sections/cta-band";
import { getJournalPost, journalPosts } from "@/content/journal";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

const categoryImage: Record<string, ImageCategory> = {
  "The Concept": "interior",
  "The Coffee": "coffee",
  "The Kitchen": "kitchen",
};

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const category = categoryImage[post.category] ?? "lifestyle";
  const date = new Date(post.publishedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Journal", path: "/journal" },
              { name: post.title, path: `/journal/${post.slug}` },
            ]),
          ),
        }}
      />

      <article className="bg-background pt-36 pb-20 md:pt-44">
        <Container className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/journal"
              className="text-bronze-ink inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.04em] uppercase"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Journal
            </Link>

            <Eyebrow className="mt-8">{post.category}</Eyebrow>
            <h1 className="text-display-h1 font-display text-coffee mt-4">
              {post.title}
            </h1>
            <p className="text-caption text-foreground/50 mt-5">
              {date} · Artha Journal
            </p>
          </Reveal>

          <Reveal kind="scale" className="mt-10">
            <ImageFrame
              category={category}
              className="aspect-[16/9] w-full rounded-[var(--radius-editorial)]"
            />
          </Reveal>

          <Reveal delay={0.1} className="prose-editorial mt-12">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return <h2 key={i}>{block.text}</h2>;
              }
              if (block.type === "quote") {
                return <blockquote key={i}>{block.text}</blockquote>;
              }
              return <p key={i}>{block.text}</p>;
            })}
          </Reveal>
        </Container>
      </article>

      <CtaBand eyebrow="Taste It Yourself" heading="Come find your part of the day." />
    </>
  );
}
