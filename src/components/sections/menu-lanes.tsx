import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { MenuLane } from "@/content/menu";

export function MenuLanes({ lanes, note }: { lanes: MenuLane[]; note?: string }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <Container>
        <div>
          {lanes.map((lane, i) => (
            <Reveal key={lane.slug} delay={Math.min(i * 0.05, 0.3)}>
              <div className="grid grid-cols-1 gap-3 border-t border-stone py-9 last:border-b md:grid-cols-[1.1fr_0.5fr_2fr] md:items-baseline md:gap-10">
                <div>
                  <span className="block text-caption font-medium tracking-[0.1em] text-bronze uppercase">
                    {lane.hours}
                  </span>
                  <h3 className="mt-1 font-display text-2xl text-coffee">{lane.name}</h3>
                </div>
                {/* Cormorant Garamond has no glyph for ₹, so pricing stays on the sans stack. */}
                <div className="font-sans text-lg font-medium text-bronze">{lane.priceRange}</div>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {lane.items.map((item) => (
                    <li key={item} className="text-body text-foreground/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {note ? (
          <Reveal className="mt-10 border-l-2 border-bronze bg-stone p-6 text-body text-foreground/70">
            {note}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
