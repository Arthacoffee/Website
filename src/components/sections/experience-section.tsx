import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/content/story";
import { dayParts } from "@/content/values";

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-coffee text-background py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-bronze-light">{experience.eyebrow}</Eyebrow>
          <h2 className="text-display-h2 font-display text-background mt-4">
            {experience.heading}
          </h2>
          <p className="text-body-lg text-background/70 mt-6">{experience.body}</p>
        </Reveal>

        <div className="border-background/15 mt-16 grid grid-cols-1 gap-x-10 gap-y-12 border-t pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {dayParts.map((part, i) => (
            <Reveal key={part.title} delay={i * 0.08}>
              <span className="text-caption text-bronze-light tracking-[0.1em] uppercase">
                {part.time}
              </span>
              <h3 className="font-display text-background mt-3 text-xl">
                {part.title}
              </h3>
              <p className="text-body text-background/65 mt-2">{part.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
