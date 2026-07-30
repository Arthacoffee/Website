export type Value = {
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    title: "Fully electric kitchen",
    description:
      "No LPG connection — induction cooking throughout, more energy-efficient than the gas kitchen this address ran under its previous operator.",
  },
  {
    title: "Vegetarian, seriously",
    description:
      "A fully vegetarian kitchen, including egg-based dishes prepared on dedicated equipment with clear FSSAI green/brown-dot labelling.",
  },
  {
    title: "Waste segregated at source",
    description:
      "Wet and dry waste sorted across every floor, with used coffee grounds set aside for composting partnerships.",
  },
  {
    title: "Water conscious",
    description:
      "The RO system feeding our brew bar reuses reject water for cleaning, alongside low-flow fixtures across the kitchen.",
  },
  {
    title: "Sourced close to home",
    description:
      "Coffee comes from a Hyderabad-based roaster, and kitchen supplies from Hyderabad vendors wherever feasible.",
  },
  {
    title: "Packaging that breaks down",
    description:
      "Any takeaway coffee service uses compostable or recyclable cups, even though dining here is table-service first.",
  },
];

export const dayParts = [
  {
    time: "10am – 12:30pm",
    title: "Brunch & Brew Bar",
    description:
      "Filter, V60, cold brew and espresso alongside punugulu, avocado toast, shakshuka and pesarattu.",
  },
  {
    time: "12pm – 3pm",
    title: "Andhra Traditional",
    description:
      "Full Andhra meals, rice plates and gravies — the everyday vegetarian lunch, done properly.",
  },
  {
    time: "3pm – 6:30pm",
    title: "The Afternoon Pour",
    description:
      "Mostly filter and espresso — the quiet window for the brew bar's tasting flights and estate coffees.",
  },
  {
    time: "6:30pm – 11pm",
    title: "Tandoor, Bistro & Rooftop",
    description:
      "Italian pasta, Indo-Chinese, evening tandoor and small plates — best had on the terrace.",
  },
] as const;
