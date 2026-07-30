import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { JournalPost } from "@/content/journal";
import { ImageFrame, type ImageCategory } from "@/components/ui/image-frame";

const categoryImage: Record<string, ImageCategory> = {
  "The Concept": "interior",
  "The Coffee": "coffee",
  "The Kitchen": "kitchen",
};

export function JournalCard({ post }: { post: JournalPost }) {
  const category = categoryImage[post.category] ?? "lifestyle";

  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <ImageFrame category={category} className="aspect-[16/11] w-full rounded-[var(--radius-editorial)]" />
      <span className="mt-5 block text-caption tracking-[0.14em] text-bronze uppercase">
        {post.category}
      </span>
      <h3 className="mt-2 flex items-start gap-2 font-display text-2xl text-coffee">
        {post.title}
        <ArrowUpRight
          size={18}
          className="mt-1.5 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </h3>
      <p className="mt-2 text-body text-foreground/65">{post.excerpt}</p>
    </Link>
  );
}
