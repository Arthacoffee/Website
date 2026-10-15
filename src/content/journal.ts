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
        text: "Walk down Defence Colony Road in Sainikpuri and you'll actually find a pretty good specialty coffee and dining cluster. There's a European bakery-café next door, a rooftop coffee bar about a hundred metres on, a beloved evening-only vegetarian restaurant a little further up, a French patisserie, a fully vegan café. Good company, honestly. But every single one of them owns exactly one moment in the day and nothing else.",
      },
      {
        type: "p",
        text: "The bakery-café does coffee and pastry, full stop. The evening restaurant doesn't even open until 7pm and serves no coffee at all. The rooftop bar has no real food programme to speak of. Nobody on this street is trying to run the whole day.",
      },
      { type: "h2", text: "So we built the whole day" },
      {
        type: "p",
        text: "Artha is organised around four windows, and each one has its own pace. Brunch and the brew bar in the morning. An Andhra lunch. A quiet afternoon for pour-overs. Then bistro and the rooftop take over through the evening.",
      },
      {
        type: "quote",
        text: "Nobody comes to Artha for a quick stop on the way somewhere else. They come to spend a part of their day here, and we built the menu and the rooftop around that.",
      },
      {
        type: "p",
        text: "That's really the whole idea behind the name, if you're wondering. If you haven't been in yet, come find whichever part of the day ends up being yours.",
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
        text: "If you asked us what the single largest equipment decision at Artha was, most people would probably guess something in the kitchen, or maybe the cold chain. It was actually the espresso machine — a two-group setup at the centre of the brew bar. We spent a long time on this one, on purpose.",
      },
      { type: "h2", text: "Consistency, first and always" },
      {
        type: "p",
        text: "What matters most is that it gives independent temperature control to each group, so you get a shot-to-shot consistency that single-boiler machines just can't manage. That's not a small thing when the brew bar is priced at a genuine premium. Tasting flights and estate coffees only bring people back if the cup tastes the same on their fifth visit as it did on their first.",
      },
      { type: "h2", text: "Built for the evening, not just the morning" },
      {
        type: "p",
        text: "Most cafés size their espresso setup around the morning rush. We sized ours for the evening instead, when coffee orders run alongside the full bistro menu. That's exactly the kind of load where a smaller single-group machine would have bottlenecked badly.",
      },
      { type: "h2", text: "A machine our Head Barista owns" },
      {
        type: "p",
        text: "Good specialty coffee talent is hard to find and it moves fast once it's trained. So rather than treat the brew bar like a station anyone can be rotated through, we built the Head Barista role around owning this machine completely — calibration in the morning, all the way to service at night. In our experience, giving someone real ownership of serious equipment keeps them around longer than a pay bump ever does.",
      },
      {
        type: "quote",
        text: "Our Operational Director is an active specialty coffee practitioner himself — V60, Clever Dripper, cold brew — and designed the brew bar's procedure by hand, not from a manual.",
      },
      {
        type: "p",
        text: "None of this was ever really about having the fanciest machine on the street. It was about the cup being right every time, whether that's the first pour of the morning or the last flight of the night.",
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
        text: "Usually when a place calls itself a \"vegetarian café,\" what that really means is a shorter menu with the meat quietly taken off it. That's not what's happening here. Artha runs four full food programmes out of one kitchen — brunch, Andhra traditional, Italian pasta, and bistro — and all of it is vegetarian.",
      },
      { type: "h2", text: "Egg dishes, handled properly" },
      {
        type: "p",
        text: "Our kitchen is vegetarian, egg dishes included, and we treat those as their own category rather than something tacked on. They're prepared on their own dedicated equipment, with clear FSSAI green-dot and brown-dot labelling, so you're never left guessing what's actually on your plate.",
      },
      { type: "h2", text: "Range without compromise" },
      {
        type: "p",
        text: "Running Andhra gravies and Italian pasta off a single vegetarian pantry, brunch all the way through to bistro, is genuinely harder than keeping a smaller, single-cuisine menu. We think it's worth the extra work. Nowhere else on this street has taken a full vegetarian table seriously enough to actually do all of it well.",
      },
      { type: "h2", text: "An electric kitchen, built for control" },
      {
        type: "p",
        text: "The kitchen runs entirely on induction instead of gas, which gives tighter, more even heat control at every station. The cold chain is fully electric too, keeping produce, dairy, and prepared gravies at the right temperature throughout service.",
      },
      {
        type: "quote",
        text: 'Andhra lunch, Italian dinner, or a bistro evening — the answer to "is there anything vegetarian?" here is simply: everything.',
      },
      {
        type: "p",
        text: "That's roughly what a vegetarian kitchen looks like when nobody treats it as an afterthought. Come try it and see for yourself.",
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
