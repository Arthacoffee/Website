import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function CtaBand({
  eyebrow,
  heading,
  body,
  cta = { label: "Reserve a Table", href: "/visit#reserve" },
}: {
  eyebrow: string;
  heading: string;
  body?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="bg-coffee text-background py-24 text-center md:py-28">
      <Container>
        <Reveal className="mx-auto max-w-xl">
          <Eyebrow className="text-bronze-light">{eyebrow}</Eyebrow>
          <h2 className="text-display-h2 font-display text-background mt-4">
            {heading}
          </h2>
          {body ? (
            <p className="text-body-lg text-background/70 mx-auto mt-5 max-w-md">
              {body}
            </p>
          ) : null}
          <div className="mt-9">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
