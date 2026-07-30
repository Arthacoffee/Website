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
      <ImageFrame
        category={category}
        interactive
        className="aspect-[16/11] w-full rounded-[var(--radius-editorial)]"
      />
      <span className="text-caption text-bronze-ink mt-5 block tracking-[0.14em] uppercase">
        {post.category}
      </span>
      <h3 className="font-display text-coffee mt-2 flex items-start gap-2 text-2xl">
        {post.title}
        <ArrowUpRight
          size={18}
          className="mt-1.5 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </h3>
      <p className="text-body text-foreground/65 mt-2">{post.excerpt}</p>
    </Link>
  );
}
