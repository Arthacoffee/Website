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
        text: "Walk down Defence Colony Road in Sainikpuri and you'll find a genuinely good specialty coffee and dining cluster — a European bakery-café next door, a rooftop coffee bar a hundred metres on, a beloved evening-only vegetarian restaurant a little further, a French patisserie, a fully vegan café. It's a strong street. But look closely and every single one of them owns exactly one moment in the day.",
      },
      {
        type: "p",
        text: "The bakery-café does coffee and pastry, and stops there. The evening restaurant doesn't open until 7pm and serves no coffee at all. The rooftop coffee bar has no real meal programme. Nobody on this street runs the whole day.",
      },
      { type: "h2", text: "So we built the whole day" },
      {
        type: "p",
        text: "Artha is organised around four distinct windows, each with its own character, menu emphasis, and pace — brunch and the brew bar in the morning, an Andhra traditional lunch, a quiet afternoon pour, and tandoor, bistro and rooftop through the evening.",
      },
      {
        type: "quote",
        text: "Nobody comes to Artha for a quick stop on the way somewhere else. They come to spend a part of their day here — and we built the menu, the floors, and the rooftop around that.",
      },
      {
        type: "p",
        text: "That's the whole idea behind the name, and behind three connected floors instead of one counter. If you haven't been in yet, come find the part of the day that's yours.",
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
        text: "The single largest equipment decision at Artha wasn't the tandoor, the induction line, or the cold chain — it was a two-group espresso machine: the Victoria Arduino Eagle One. It sits at the centre of the brew bar, and choosing it was deliberate rather than aspirational.",
      },
      { type: "h2", text: "Consistency, first and always" },
      {
        type: "p",
        text: "The Eagle One's multiboiler architecture gives independent temperature control to each group — which means shot-to-shot consistency at a level single-boiler machines simply can't match. That matters because the brew bar is priced at a genuine premium. Tasting flights, estate coffees, and house pours only earn repeat visits if the cup tastes exactly the same on your fifth visit as it did on your first.",
      },
      { type: "h2", text: "Built for the evening, not just the morning" },
      {
        type: "p",
        text: "Most cafés size their espresso setup for the morning rush. We sized ours for the evening — the window when coffee orders run alongside the bistro and tandoor menus, and a single-group machine would have bottlenecked exactly the part of the day that matters most.",
      },
      { type: "h2", text: "A machine our Head Barista owns" },
      {
        type: "p",
        text: "Specialty coffee talent is scarce, and it moves fast. Rather than treat the brew bar as a fixed station anyone can staff, we built the Head Barista role around full ownership of this machine and the entire brew bar programme — from calibration to service. Giving someone real ownership of serious equipment is, in our experience, a far better retention strategy than a pay bump alone.",
      },
      {
        type: "quote",
        text: "Our Operational Director is an active specialty coffee practitioner himself — V60, Clever Dripper, cold brew — and designed the brew bar's standard operating procedure by hand, not from a manual.",
      },
      {
        type: "p",
        text: "None of this is about having the fanciest machine on the street. It's about the cup being right, every single time, whether you're here for the first pour of the morning or the last flight of the night.",
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
        text: '"Vegetarian café" often means a shorter menu with the meat quietly removed. That\'s not what we set out to build. Artha runs five full food programmes — Andhra traditional, Italian pasta, Indo-Chinese, evening tandoor, and a bistro small-plates menu — entirely vegetarian, from one kitchen.',
      },
      { type: "h2", text: "Egg dishes, handled properly" },
      {
        type: "p",
        text: "Our kitchen is vegetarian including egg-based preparations, which we treat as their own category rather than an afterthought: egg dishes are prepared on dedicated equipment, with clear FSSAI green-dot and brown-dot labelling so there's never any ambiguity about what's on your plate.",
      },
      { type: "h2", text: "Range without compromise" },
      {
        type: "p",
        text: "Running Andhra gravies, Italian pasta, Indo-Chinese wok dishes, and tandoor off a single vegetarian pantry sounds harder than running a smaller, singular menu — and it is. It's also exactly the gap we saw on this street: plenty of specialty coffee, plenty of single-cuisine dining, and nowhere that took a full vegetarian table seriously enough to do all of it well.",
      },
      { type: "h2", text: "An electric kitchen, built for control" },
      {
        type: "p",
        text: "The kitchen runs on induction, not gas — which gives our cooks tighter, more even heat control across every station, and lets a fully electric cold chain keep produce, dairy, and prepared gravies at the right temperature across three floors.",
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
