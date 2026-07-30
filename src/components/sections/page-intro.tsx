import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

/** Consistent interior-page opener: eyebrow, large display heading, lead copy. */
export function PageIntro({
  eyebrow,
  heading,
  lead,
  children,
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-stone pt-40 pb-20 md:pt-48 md:pb-28">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-display-h1 font-display text-coffee">{heading}</h1>
          {lead ? (
            <p className="mx-auto mt-6 max-w-2xl text-body-lg text-foreground/70">{lead}</p>
          ) : null}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
