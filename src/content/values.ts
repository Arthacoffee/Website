export type Value = {
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    title: "Fully electric kitchen",
    description:
      "We don't have an LPG connection. The kitchen runs entirely on induction, which is also more energy-efficient than the gas setup this address used before.",
  },
  {
    title: "Vegetarian, seriously",
    description:
      "We run a fully vegetarian kitchen, egg dishes included, and prepare those on their own dedicated equipment with FSSAI green/brown-dot labelling.",
  },
  {
    title: "Waste segregated at source",
    description:
      "We sort wet and dry waste at every station, and set used coffee grounds aside separately for composting partnerships.",
  },
  {
    title: "Water conscious",
    description:
      "The RO system feeding our brew bar reuses its reject water for cleaning, and we've got low-flow fixtures throughout the space.",
  },
  {
    title: "Sourced close to home",
    description:
      "We get our coffee from a Hyderabad-based roaster, and most kitchen supplies from Hyderabad vendors where feasible.",
  },
  {
    title: "Packaging that breaks down",
    description:
      "We're table-service first, but any takeaway coffee still goes out in compostable or recyclable cups.",
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
