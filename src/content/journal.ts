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
    slug: "indian-single-origin-coffee",
    category: "The Coffee",
    title: "Why We Pour Indian Coffee",
    excerpt:
      "Our beans come from single-origin estates in Nagaland, the Pulney hills, Udaigiri, and the Hoysala region.",
    metaDescription:
      "Artha's coffee comes from single-origin Indian estates in Nagaland, the Pulney hills, Udaigiri, and Hoysala.",
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
        text: "Our coffee comes from single-origin estates in Nagaland, the Pulney hills, Udaigiri, and the Hoysala region — all grown in India.",
      },
      {
        type: "p",
        text: "Washed beans come out light and floral, with a gentle acidity. Natural and honey-processed beans turn fruity and full-bodied. Anaerobic micro-lots go intense, almost wine-like. The processing changes the cup as much as the origin does.",
      },
      {
        type: "quote",
        text: "Filter coffee is where this started for us — the everyday South Indian cup, made properly, every time.",
      },
      {
        type: "p",
        text: "A tasting flight at the brew bar is three cups, three origins, poured and explained one at a time.",
      },
    ],
  },
  {
    slug: "how-we-brew",
    category: "The Coffee",
    title: "V60, Kalita Wave, Or Clever Dripper",
    excerpt:
      "The same bean tastes different depending on how it's brewed. Here's what each method actually changes.",
    metaDescription:
      "How V60, Kalita Wave, Clever Dripper, and cold brew each change the taste of the same coffee at Artha.",
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
        text: "The same bean tastes different depending on how it's brewed. A V60 pulls out brightness and clarity. A Kalita Wave comes out rounder and more even. A Clever Dripper sits closer to immersion, fuller in the mouth.",
      },
      {
        type: "p",
        text: "At the brew bar, you can pick the method and we'll match a bean to it, or tell us what you like and we'll suggest the method.",
      },
      {
        type: "quote",
        text: "A cup of filter coffee here should taste the same on your first visit as it does on your fifth.",
      },
      {
        type: "p",
        text: "Our cold brew steeps for 18 hours before it's poured.",
      },
    ],
  },
  {
    slug: "a-fully-vegetarian-kitchen-done-seriously",
    category: "The Kitchen",
    title: "A Fully Vegetarian Kitchen, Done Seriously",
    excerpt:
      "San Marzano tomatoes, De Cecco pasta, gongura and nati ghee — the ingredients behind a fully vegetarian kitchen.",
    metaDescription:
      "The ingredients behind Artha's fully vegetarian kitchen — Andhra traditional, Italian pasta, brunch, and bistro.",
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
        text: "The kitchen runs four food programmes — brunch, Andhra traditional, Italian pasta, and bistro — all from a single vegetarian pantry, egg dishes included.",
      },
      {
        type: "p",
        text: "Italian means San Marzano tomatoes and De Cecco pasta. Andhra means gongura, nati ghee, and curry leaf, cooked the way it's actually made at home.",
      },
      {
        type: "quote",
        text: 'Andhra lunch, Italian dinner, or a bistro evening — the answer to "is there anything vegetarian?" here is simply: everything.',
      },
      {
        type: "p",
        text: "Egg dishes are prepared on their own dedicated equipment, with FSSAI green-dot and brown-dot labelling, so there's no ambiguity about what's on the plate.",
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
