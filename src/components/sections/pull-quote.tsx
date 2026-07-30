import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * A full-bleed editorial pull-quote — no quotation marks, no card, no
 * background image. Exists to give the page a place to breathe between
 * denser sections (see the homepage, where three consecutive two-column
 * "split" sections otherwise run together) rather than to introduce a new
 * visual pattern of its own.
 */
export function PullQuote({
  id,
  children,
  attribution,
}: {
  id?: string;
  children: string;
  attribution?: string;
}) {
  return (
    <section id={id} className="bg-background py-28 md:py-36">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden="true"
            className="bg-bronze mx-auto mb-10 block h-px w-12"
          />
          <p className="font-display text-coffee text-[1.75rem] leading-[1.35] font-medium italic md:text-[2.5rem]">
            {children}
          </p>
          {attribution ? (
            <span className="text-caption text-bronze-ink mt-8 block tracking-[0.14em] uppercase">
              {attribution}
            </span>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
