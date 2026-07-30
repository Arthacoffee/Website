import { Clock, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";

export function VisitTeaser() {
  return (
    <section id="visit" className="bg-stone py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <Eyebrow>Visit</Eyebrow>
          <h2 className="mt-4 text-display-h2 font-display text-coffee">
            Defence Colony Road, Sainikpuri
          </h2>
          <p className="mt-6 text-body-lg text-foreground/70">
            Table service only, three levels, lift access, and a rooftop built for the
            evening. Walk in, or reserve ahead for groups and the terrace.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            <li className="flex items-start gap-3 text-body text-foreground/75">
              <MapPin size={18} className="mt-0.5 shrink-0 text-bronze" aria-hidden="true" />
              {site.address.streetAddress}, {site.address.addressLocality} –{" "}
              {site.address.postalCode}
            </li>
            <li className="flex items-start gap-3 text-body text-foreground/75">
              <Clock size={18} className="mt-0.5 shrink-0 text-bronze" aria-hidden="true" />
              {site.hours.display}
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/visit#reserve" variant="primary">
              Reserve a Table
            </Button>
            <Button href="/visit" variant="outline" className="text-coffee">
              Get Directions
            </Button>
          </div>
        </Reveal>

        <Reveal kind="scale">
          <ImageFrame
            category="terrace"
            className="aspect-[4/3.4] w-full rounded-[var(--radius-editorial)]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
