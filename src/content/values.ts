export type Value = {
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    title: "Fully electric kitchen",
    description:
      "There is no LPG connection. The kitchen runs entirely on induction, which is also more energy-efficient than the gas setup this address used before.",
  },
  {
    title: "Vegetarian, seriously",
    description:
      "A fully vegetarian kitchen, including egg dishes. These are prepared on dedicated equipment, with FSSAI green/brown-dot labelling.",
  },
  {
    title: "Waste segregated at source",
    description:
      "Wet and dry waste get sorted at every station. Used coffee grounds are set aside separately for composting partnerships.",
  },
  {
    title: "Water conscious",
    description:
      "The RO system feeding our brew bar reuses its reject water for cleaning. We've also got low-flow fixtures throughout the space.",
  },
  {
    title: "Sourced close to home",
    description:
      "The coffee comes from a Hyderabad-based roaster, and most kitchen supplies come from Hyderabad vendors where feasible.",
  },
  {
    title: "Packaging that breaks down",
    description:
      "The café is table-service first. Any takeaway coffee goes out in compostable or recyclable cups.",
  },
];

export const dayParts = [
  {
    time: "10am – 12:30pm",
    title: "Brunch & Brew Bar",
    description:
      "Filter, V60, cold brew and espresso, plus punugulu, avocado toast, shakshuka and pesarattu.",
  },
  {
    time: "12pm – 3pm",
    title: "Andhra Traditional",
    description:
      "Full Andhra meals, rice plates, and gravies — the everyday vegetarian lunch, prepared properly.",
  },
  {
    time: "3pm – 6:30pm",
    title: "The Afternoon Pour",
    description:
      "Quieter hours at the brew bar — mostly filter and espresso, along with tasting flights and estate coffees.",
  },
  {
    time: "6:30pm – 11pm",
    title: "Bistro & Rooftop",
    description:
      "Italian pasta, bistro mains, and small plates, served up on the terrace.",
  },
] as const;
