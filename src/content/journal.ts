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
        text: "A Sufi saint named Baba Budan is said to have carried coffee seeds out of Yemen on his way back from Mecca sometime in the 1600s and planted them in the hills near Chikmagalur, Karnataka. Those hills are still called Baba Budangiri today, and that region now carries a government geographical-indication tag for its coffee, along with Coorg, Wayanad, and Araku Valley.",
      },
      {
        type: "p",
        text: "Indian coffee is mostly grown in the shade of jungle trees instead of out in the open sun, which is part of why it tends to come out milder than coffee grown elsewhere.",
      },
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
    ],
  },
  {
    slug: "how-we-brew",
    category: "The Coffee",
    title: "The Same Bean Tastes Different By Brew Method",
    excerpt:
      "Pour the same bean through a V60, a Kalita Wave, or a Clever Dripper, and you get a different cup each time.",
    metaDescription:
      "Why the same coffee bean tastes different brewed through a V60, Kalita Wave, Clever Dripper, or cold brew.",
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
        text: "The same bean tastes different depending on how it's brewed. A V60 pulls out more brightness and clarity, a Kalita Wave rounds it out, and a Clever Dripper sits closer to immersion, so it comes out fuller in the mouth.",
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
    slug: "why-we-built-the-menu-this-way",
    category: "The Kitchen",
    title: "Why We Built The Menu This Way",
    excerpt:
      "Andhra food for the people who grew up on it, pasta and bistro alongside it, and a thali built for a proper sit-down meal.",
    metaDescription:
      "Why Artha's menu pairs traditional Andhra food with Italian and bistro dishes, and what that means for a vegetarian table.",
    publishedAt: "2026-07-15",
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
        text: "Andhra food is what a lot of our guests grew up on. Few people still have the time to cook it properly at home, so we built the kitchen to do it for them.",
      },
      {
        type: "p",
        text: "The rest of the menu sits alongside it for everyone who wants something more modern too.",
      },
      {
        type: "p",
        text: "A thali is a full, proper meal in one sitting: rice, pappu, sambar, rasam, a curry, curd, pickle, papad, all together. That's what people want when they actually sit down to eat.",
      },
      {
        type: "quote",
        text: "\"Vegetarian eating patterns have been associated with improved health outcomes including lower levels of obesity, a reduced risk of heart disease and lower blood pressure.\" — Academy of Nutrition and Dietetics",
      },
      {
        type: "p",
        text: "Our menu includes eggs, which puts it in the lacto-ovo category. A 2023 study based in Hyderabad found that group had the best health outcomes of any vegetarian diet studied.",
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
