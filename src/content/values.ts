export type Value = {
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    title: "Fully electric kitchen",
    description:
      "We don't have an LPG connection. The kitchen runs entirely on induction.",
  },
  {
    title: "Fully vegetarian",
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
      "We're table-service first. Any takeaway coffee goes out in compostable or recyclable cups.",
  },
];

export const dayParts = [
  {
    time: "10am – 12:30pm",
    title: "Brunch & Brew Bar",
    description:
      "We pour filter, V60, cold brew and espresso, and serve punugulu, avocado toast, shakshuka and pesarattu.",
  },
  {
    time: "12pm – 3pm",
    title: "Andhra Traditional",
    description:
      "We serve full Andhra meals, rice plates, and gravies for the everyday lunch.",
  },
  {
    time: "3pm – 6:30pm",
    title: "Afternoon Coffee",
    description:
      "This is a quieter window at the brew bar. We mostly pour filter and espresso, along with tasting flights and estate coffees.",
  },
  {
    time: "6:30pm – 11pm",
    title: "Bistro & Rooftop",
    description:
      "We serve Italian pasta, bistro mains, and small plates, mostly up on the terrace.",
  },
] as const;
