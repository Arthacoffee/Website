import { Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { values } from "@/content/values";

export function ValuesGrid({
  eyebrow = "How We Run The Kitchen",
  heading = "Vegetarian, electric, and built to last.",
}: {
  eyebrow?: string;
  heading?: string;
}) {
  return (
    <section className="bg-stone py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-display-h2 font-display text-coffee">{heading}</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={(i % 3) * 0.08}>
              <Leaf size={22} className="text-bronze-ink" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl text-coffee">{value.title}</h3>
              <p className="mt-2 text-body text-foreground/65">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
