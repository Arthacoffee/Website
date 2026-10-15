export type JournalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export type JournalPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  publishedAt: string; // ISO date
  body: JournalBlock[];
  /** Real photography, once available. Each falls back to a brand-toned frame when omitted. */
  cardImage?: { src: string; alt: string };
  heroImage?: { src: string; alt: string };
};

export const journalPosts: JournalPost[] = [
  {
    slug: "one-address-four-parts-of-the-day",
    category: "The Concept",
    title: "One Address, Four Parts Of The Day",
    excerpt:
      "Why we built Artha to run from the first filter coffee to the last rooftop plate, instead of owning just one occasion.",
    metaDescription:
      "Why Artha Speciality Coffee is built to run from morning brew bar to evening rooftop, instead of owning a single occasion.",
    publishedAt: "2026-06-01",
    cardImage: {
      src: "/images/interior/dining-hall.jpg",
      alt: "A quiet dining room with large windows",
    },
    heroImage: {
      src: "/images/interior/sunlit-table.jpg",
      alt: "A sunlit table in the dining room",
    },
    body: [
      {
        type: "p",
        text: "We run Artha across four service windows in a day. Brunch and the brew bar run from 10am to 12:30pm. Andhra traditional lunch runs from 12pm to 3pm. A quieter afternoon window for pour-overs runs from 3pm to 6:30pm. Bistro and the rooftop run from 6:30pm to 11pm.",
      },
      { type: "h2", text: "Most places on this street cover one window" },
      {
        type: "p",
        text: "A European bakery-café next door serves coffee and pastry in the morning. A rooftop coffee bar about a hundred metres on has limited food. A well-known vegetarian restaurant further up the road opens at 7pm and does not serve coffee at all. There is also a French patisserie and a fully vegan café nearby, each built around a single occasion. We wanted to be the one place on this road that isn't.",
      },
      {
        type: "quote",
        text: "Nobody comes to Artha for a quick stop on the way somewhere else. They come to spend a part of their day here, and we planned the menu and the rooftop around that.",
      },
      {
        type: "p",
        text: "Artha is a Sanskrit word for purpose, and that's really where the name came from — we wanted the café to have a purpose across the whole day, not just one part of it.",
      },
    ],
  },
  {
    slug: "why-we-built-our-brew-bar-around-one-machine",
    category: "The Coffee",
    title: "Why We Built Our Brew Bar Around One Machine",
    excerpt:
      "Consistency, throughput, and the reasoning behind the espresso machine at the centre of the brew bar.",
    metaDescription:
      "The reasoning behind the espresso machine at the centre of Artha's brew bar — consistency, throughput, and craft.",
    publishedAt: "2026-06-15",
    cardImage: {
      src: "/images/coffee/brew-server.jpg",
      alt: "A Hario coffee server catching filter coffee at the Artha brew bar",
    },
    heroImage: {
      src: "/images/coffee/v60-pour.jpg",
      alt: "Pouring water over a V60 filter at the Artha brew bar",
    },
    body: [
      {
        type: "p",
        text: "The biggest equipment decision we made at Artha was the espresso machine, a two-group setup at the centre of the brew bar. It took us longer to pick than most of the kitchen equipment did.",
      },
      { type: "h2", text: "Temperature control per group" },
      {
        type: "p",
        text: "The machine gives independent temperature control to each group, which gets us more shot-to-shot consistency than a single-boiler machine. We price the brew bar at a premium, and tasting flights and estate coffees only work if the cup tastes the same on a fifth visit as it did on the first.",
      },
      { type: "h2", text: "Sized for evening volume" },
      {
        type: "p",
        text: "Most cafés size their espresso setup around the morning rush. We sized ours for the evening instead, since our coffee orders run alongside the full bistro menu — a load a smaller single-group machine would have struggled with.",
      },
      { type: "h2", text: "One Head Barista, full ownership" },
      {
        type: "p",
        text: "Specialty coffee staff are hard to find and move on quickly once trained, so we built the Head Barista role around full ownership of this machine, from calibration in the morning through service at night, rather than rotating staff through it as a station.",
      },
      {
        type: "quote",
        text: "Our Operational Director is an active specialty coffee practitioner himself — V60, Clever Dripper, cold brew — and designed the brew bar's procedure by hand, not from a manual.",
      },
      {
        type: "p",
        text: "It comes down to the cup tasting the same at 10am as it does at 11pm.",
      },
    ],
  },
  {
    slug: "a-fully-vegetarian-kitchen-done-seriously",
    category: "The Kitchen",
    title: "A Fully Vegetarian Kitchen, Done Seriously",
    excerpt:
      "Andhra, Italian, brunch and bistro, all vegetarian, all from one kitchen — how that actually works.",
    metaDescription:
      "How Artha runs Andhra, Italian, brunch and bistro programmes from one fully vegetarian kitchen.",
    publishedAt: "2026-07-01",
    cardImage: {
      src: "/images/kitchen/andhra-thali.jpg",
      alt: "An Andhra thali at Artha",
    },
    heroImage: {
      src: "/images/kitchen/pasta-overhead.jpg",
      alt: "A plated pasta dish from Artha's Italian programme",
    },
    body: [
      {
        type: "p",
        text: "We run four full food programmes out of our kitchen — brunch, Andhra traditional, Italian pasta, and bistro — from a single vegetarian pantry. Egg dishes are included, and we prepare them on their own dedicated equipment, with FSSAI green-dot and brown-dot labelling.",
      },
      { type: "h2", text: "One pantry, four programmes" },
      {
        type: "p",
        text: "Andhra gravies and Italian pasta come from the same pantry, from brunch through to bistro service. Running four programmes off one pantry takes more coordination than a smaller, single-cuisine menu would, but it's what we signed up for.",
      },
      { type: "h2", text: "Induction instead of gas" },
      {
        type: "p",
        text: "Our kitchen runs entirely on induction, which gives us tighter, more even heat control at each station. The cold chain is fully electric too, keeping produce, dairy, and prepared gravies at the correct temperature through service.",
      },
      {
        type: "quote",
        text: 'Andhra lunch, Italian dinner, or a bistro evening — the answer to "is there anything vegetarian?" here is simply: everything.',
      },
      {
        type: "p",
        text: "Our menu covers Andhra, Italian, brunch, and bistro, all from the same kitchen, and none of it is shortened for being vegetarian.",
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
