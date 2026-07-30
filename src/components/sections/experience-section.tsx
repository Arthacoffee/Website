import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/content/story";
import { dayParts } from "@/content/values";

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-coffee py-24 text-background md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-bronze-light">{experience.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-display-h2 font-display text-background">
            {experience.heading}
          </h2>
          <p className="mt-6 text-body-lg text-background/70">{experience.body}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 border-y border-background/15 py-10 sm:grid-cols-3">
          {experience.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <span className="font-display text-display-h3 text-bronze-light">{stat.value}</span>
              <span className="mt-2 block text-caption tracking-[0.1em] text-background/60 uppercase">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {dayParts.map((part, i) => (
            <Reveal key={part.title} delay={i * 0.08}>
              <span className="text-caption tracking-[0.1em] text-bronze-light uppercase">
                {part.time}
              </span>
              <h3 className="mt-3 font-display text-xl text-background">{part.title}</h3>
              <p className="mt-2 text-body text-background/65">{part.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
