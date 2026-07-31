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
        text: "Walk down Defence Colony Road in Sainikpuri and you'll find a genuinely good specialty coffee and dining cluster — a European bakery-café next door, a rooftop coffee bar a hundred metres on, a beloved evening-only vegetarian restaurant a little further, a French patisserie, a fully vegan café. But each one owns exactly one moment in the day.",
      },
      {
        type: "p",
        text: "The bakery-café does coffee and pastry, and stops there. The evening restaurant doesn't open until 7pm and serves no coffee at all. The rooftop coffee bar has no real meal programme. Nobody on this street runs the whole day.",
      },
      { type: "h2", text: "So we built the whole day" },
      {
        type: "p",
        text: "Artha is organised around four windows, each with its own character and pace — brunch and the brew bar in the morning, an Andhra lunch, a quiet afternoon pour, tandoor and rooftop through the evening.",
      },
      {
        type: "quote",
        text: "Nobody comes to Artha for a quick stop on the way somewhere else. They come to spend a part of their day here — and we built the menu and the rooftop around that.",
      },
      {
        type: "p",
        text: "That's the whole idea behind the name. If you haven't been in yet, come find the part of the day that's yours.",
      },
    ],
  },
  {
    slug: "why-we-built-our-brew-bar-around-one-machine",
    category: "The Coffee",
    title: "Why We Built Our Brew Bar Around One Machine",
    excerpt:
      "Consistency, throughput, and the reasoning behind the Victoria Arduino Eagle One at the centre of the brew bar.",
    metaDescription:
      "The reasoning behind the Victoria Arduino Eagle One at the centre of Artha's brew bar — consistency, throughput, and craft.",
    publishedAt: "2026-06-15",
    body: [
      {
        type: "p",
        text: "The single largest equipment decision at Artha wasn't the tandoor or the cold chain — it was a two-group espresso machine, the Victoria Arduino Eagle One, at the centre of the brew bar. Choosing it was deliberate, not aspirational.",
      },
      { type: "h2", text: "Consistency, first and always" },
      {
        type: "p",
        text: "The Eagle One's multiboiler architecture gives independent temperature control to each group — shot-to-shot consistency single-boiler machines can't match. That matters because the brew bar is priced at a genuine premium: tasting flights and estate coffees only earn repeat visits if the cup tastes the same on your fifth visit as your first.",
      },
      { type: "h2", text: "Built for the evening, not just the morning" },
      {
        type: "p",
        text: "Most cafés size their espresso setup for the morning rush. We sized ours for the evening, when coffee orders run alongside the bistro and tandoor menus — exactly where a single-group machine would have bottlenecked.",
      },
      { type: "h2", text: "A machine our Head Barista owns" },
      {
        type: "p",
        text: "Specialty coffee talent is scarce, and it moves fast. Rather than treat the brew bar as a station anyone can staff, we built the Head Barista role around full ownership of this machine, calibration to service. Real ownership of serious equipment is, in our experience, a far better retention strategy than a pay bump alone.",
      },
      {
        type: "quote",
        text: "Our Operational Director is an active specialty coffee practitioner himself — V60, Clever Dripper, cold brew — and designed the brew bar's procedure by hand, not from a manual.",
      },
      {
        type: "p",
        text: "None of this is about having the fanciest machine on the street. It's about the cup being right, every time — first pour of the morning, or last flight of the night.",
      },
    ],
  },
  {
    slug: "a-fully-vegetarian-kitchen-done-seriously",
    category: "The Kitchen",
    title: "A Fully Vegetarian Kitchen, Done Seriously",
    excerpt:
      "Andhra, Italian, Indo-Chinese and tandoor, all vegetarian, all from one kitchen — how that actually works.",
    metaDescription:
      "How Artha runs Andhra, Italian, Indo-Chinese and tandoor programmes from one fully vegetarian kitchen.",
    publishedAt: "2026-07-01",
    body: [
      {
        type: "p",
        text: '"Vegetarian café" often means a shorter menu with the meat quietly removed. Not here. Artha runs five full food programmes — Andhra traditional, Italian pasta, Indo-Chinese, tandoor, bistro — entirely vegetarian, from one kitchen.',
      },
      { type: "h2", text: "Egg dishes, handled properly" },
      {
        type: "p",
        text: "Our kitchen is vegetarian including egg-based preparations, treated as their own category, not an afterthought — prepared on dedicated equipment, with clear FSSAI green-dot and brown-dot labelling, so there's never any ambiguity about what's on your plate.",
      },
      { type: "h2", text: "Range without compromise" },
      {
        type: "p",
        text: "Running Andhra gravies, Italian pasta, Indo-Chinese wok dishes, and tandoor off a single vegetarian pantry is harder than a smaller, singular menu. It's also worth it — nowhere on this street took a full vegetarian table seriously enough to do all of it well.",
      },
      { type: "h2", text: "An electric kitchen, built for control" },
      {
        type: "p",
        text: "The kitchen runs on induction, not gas — tighter, more even heat control at every station, and a fully electric cold chain keeping produce, dairy, and prepared gravies at the right temperature.",
      },
      {
        type: "quote",
        text: 'Andhra lunch, Italian dinner, an Indo-Chinese craving, or a tandoor evening — the answer to "is there anything vegetarian?" here is simply: everything.',
      },
      {
        type: "p",
        text: "That's what a serious vegetarian kitchen looks like when it isn't an afterthought. Come try it.",
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
