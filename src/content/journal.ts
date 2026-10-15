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
      "Why Artha runs four separate service windows across the day, from the morning brew bar to the evening rooftop.",
    metaDescription:
      "Why Artha Speciality Coffee runs four service windows across the day, from morning brew bar to evening rooftop.",
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
        text: "Artha runs four service windows across the day. Brunch and the brew bar go from 10am to 12:30pm. Andhra traditional lunch runs from 12pm to 3pm. The brew bar continues quietly from 3pm to 6:30pm, mostly pour-overs. Bistro and the rooftop run from 6:30pm to 11pm.",
      },
      {
        type: "quote",
        text: "People come to spend a part of their day here. We planned the menu and the rooftop around that.",
      },
      {
        type: "p",
        text: "Artha is a Sanskrit word for purpose. That's where the name comes from. We wanted the café to have a purpose across the whole day.",
      },
    ],
  },
  {
    slug: "why-every-cup-tastes-the-same",
    category: "The Coffee",
    title: "Why Every Cup Tastes The Same",
    excerpt:
      "The cup at Artha is meant to taste the same at 10am as it does at 11pm, on your first visit or your fifth.",
    metaDescription:
      "Why every cup at Artha's brew bar tastes the same, morning to night, visit after visit.",
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
        text: "The cup at Artha is meant to taste the same every time — the first pour of the morning, or the last order at night.",
      },
      {
        type: "p",
        text: "Our Head Barista owns the process end to end, from calibrating the espresso machine each morning through to the pour that reaches your hand. One person, one process, every cup.",
      },
      {
        type: "quote",
        text: "Our Operational Director is an active specialty coffee practitioner himself — V60, Clever Dripper, cold brew — and designed the brew bar's procedure by hand.",
      },
      {
        type: "p",
        text: "Tasting flights and estate coffees are priced at a premium, so the cup needs to taste the same on a fifth visit as it did on the first.",
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
        text: "Artha's kitchen runs four full food programmes — brunch, Andhra traditional, Italian pasta, and bistro — from a single vegetarian pantry. Egg dishes are included. They're prepared on their own dedicated equipment, with FSSAI green-dot and brown-dot labelling.",
      },
      { type: "h2", text: "One pantry, four programmes" },
      {
        type: "p",
        text: "Andhra gravies and Italian pasta come from the same pantry, from brunch through to bistro service. Running four programmes off one pantry takes real coordination day to day.",
      },
      {
        type: "quote",
        text: 'Andhra lunch, Italian dinner, or a bistro evening — the answer to "is there anything vegetarian?" here is simply: everything.',
      },
      {
        type: "p",
        text: "The menu covers Andhra, Italian, brunch, and bistro, all from the same kitchen.",
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
