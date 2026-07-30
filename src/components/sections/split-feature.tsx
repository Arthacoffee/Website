import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ImageFrame, type ImageCategory } from "@/components/ui/image-frame";
import { cn } from "@/lib/utils";

export function SplitFeature({
  id,
  eyebrow,
  heading,
  paragraphs,
  cta,
  imageCategory,
  imageIcon,
  reverse = false,
  tone = "light",
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  imageCategory: ImageCategory;
  imageIcon?: LucideIcon;
  reverse?: boolean;
  tone?: "light" | "stone";
}) {
  return (
    <section id={id} className={cn("py-24 md:py-32", tone === "stone" ? "bg-stone" : "bg-background")}>
      <Container
        className={cn(
          "grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20",
          reverse && "md:[&>*:first-child]:order-2",
        )}
      >
        <Reveal kind="scale">
          <ImageFrame
            category={imageCategory}
            icon={imageIcon}
            className="aspect-[4/3.2] w-full rounded-[var(--radius-editorial)]"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-display-h2 font-display text-coffee">{heading}</h2>
          <div className="mt-6 flex flex-col gap-4">
            {paragraphs.map((p) => (
              <p key={p} className="text-body-lg text-foreground/70">
                {p}
              </p>
            ))}
          </div>
          {cta ? (
            <div className="mt-8">
              <Button href={cta.href} variant="outline" className="text-coffee">
                {cta.label}
              </Button>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
