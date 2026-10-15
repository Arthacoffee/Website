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
    body: [
      {
        type: "p",
        text: "Defence Colony Road in Sainikpuri has a genuinely good specialty coffee and dining cluster. There is a European bakery-café next door, a rooftop coffee bar about a hundred metres on, a beloved evening-only vegetarian restaurant a little further up, a French patisserie, and a fully vegan café. Each of these owns exactly one moment in the day.",
      },
      {
        type: "p",
        text: "The bakery-café serves coffee and pastry, and stops there. The evening restaurant does not open until 7pm and serves no coffee. The rooftop bar has no real food programme. No one on this street covers the whole day.",
      },
      { type: "h2", text: "So we built the whole day" },
      {
        type: "p",
        text: "Artha is organised around four windows, each with its own pace: brunch and the brew bar in the morning, an Andhra lunch, a quiet afternoon for pour-overs, and bistro with the rooftop through the evening.",
      },
      {
        type: "quote",
        text: "Nobody comes to Artha for a quick stop on the way somewhere else. They come to spend a part of their day here, and we built the menu and the rooftop around that.",
      },
      {
        type: "p",
        text: "That is the idea behind the name. If you have not been in yet, come find whichever part of the day ends up being yours.",
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
        text: "The single largest equipment decision at Artha was not the kitchen line or the cold chain. It was the espresso machine — a two-group setup at the centre of the brew bar, chosen deliberately after a long evaluation.",
      },
      { type: "h2", text: "Consistency, first and always" },
      {
        type: "p",
        text: "The machine gives independent temperature control to each group, producing a shot-to-shot consistency that single-boiler machines cannot match. This matters because the brew bar is priced at a premium: tasting flights and estate coffees only bring people back if the cup tastes the same on the fifth visit as it did on the first.",
      },
      { type: "h2", text: "Built for the evening, not just the morning" },
      {
        type: "p",
        text: "Most cafés size their espresso setup around the morning rush. Artha sized its setup for the evening, when coffee orders run alongside the full bistro menu — the load where a smaller single-group machine would have bottlenecked.",
      },
      { type: "h2", text: "A machine the Head Barista owns" },
      {
        type: "p",
        text: "Specialty coffee talent is hard to find and moves fast once trained. Rather than treat the brew bar as a station anyone can rotate through, the Head Barista role was built around full ownership of this machine, from calibration in the morning through service at night. Real ownership of serious equipment tends to retain staff better than a pay increase alone.",
      },
      {
        type: "quote",
        text: "Our Operational Director is an active specialty coffee practitioner himself — V60, Clever Dripper, cold brew — and designed the brew bar's procedure by hand, not from a manual.",
      },
      {
        type: "p",
        text: "None of this is about having the fanciest machine on the street. It is about the cup being right every time, whether that is the first pour of the morning or the last flight of the night.",
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
        text: "A \"vegetarian café\" often means a shorter menu with the meat removed. That is not the case at Artha. The kitchen runs four full food programmes — brunch, Andhra traditional, Italian pasta, and bistro — and all of it is vegetarian.",
      },
      { type: "h2", text: "Egg dishes, handled properly" },
      {
        type: "p",
        text: "The kitchen is vegetarian, including egg dishes, which are treated as their own category rather than an afterthought. They are prepared on dedicated equipment, with FSSAI green-dot and brown-dot labelling, so there is no ambiguity about what is on the plate.",
      },
      { type: "h2", text: "Range without compromise" },
      {
        type: "p",
        text: "Running Andhra gravies and Italian pasta off a single vegetarian pantry, from brunch through to bistro, is harder than keeping a smaller, single-cuisine menu. It is also the standard the kitchen was built to.",
      },
      { type: "h2", text: "An electric kitchen, for better control" },
      {
        type: "p",
        text: "The kitchen runs entirely on induction instead of gas, which gives tighter, more even heat control at every station. The cold chain is fully electric as well, keeping produce, dairy, and prepared gravies at the correct temperature through service.",
      },
      {
        type: "quote",
        text: 'Andhra lunch, Italian dinner, or a bistro evening — the answer to "is there anything vegetarian?" here is simply: everything.',
      },
      {
        type: "p",
        text: "That is what a vegetarian kitchen looks like when it is not treated as an afterthought.",
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
