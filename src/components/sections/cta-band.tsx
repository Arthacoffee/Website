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
    <section className="bg-coffee py-24 text-center text-background md:py-28">
      <Container>
        <Reveal className="mx-auto max-w-xl">
          <Eyebrow className="text-bronze">{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-display-h2 font-display text-background">{heading}</h2>
          {body ? <p className="mx-auto mt-5 max-w-md text-body-lg text-background/70">{body}</p> : null}
          <div className="mt-9">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
