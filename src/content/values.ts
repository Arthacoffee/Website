export type Value = {
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    title: "Fully electric kitchen",
    description:
      "There's no LPG connection here. Everything runs on induction, which also happens to be more energy-efficient than the gas kitchen this address used to run.",
  },
  {
    title: "Vegetarian, seriously",
    description:
      "A fully vegetarian kitchen, egg dishes included. Those are prepared on their own dedicated equipment, with clear FSSAI green/brown-dot labelling so nobody has to guess.",
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
      "Our coffee comes from a Hyderabad-based roaster, and most kitchen supplies come from Hyderabad vendors too, wherever that's feasible.",
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
      "Full Andhra meals, rice plates, gravies. The everyday vegetarian lunch, just done properly for once.",
  },
  {
    time: "3pm – 6:30pm",
    title: "The Afternoon Pour",
    description:
      "Quieter hours at the brew bar — mostly filter and espresso, tasting flights, and estate coffees for anyone with time to sit with one.",
  },
  {
    time: "6:30pm – 11pm",
    title: "Bistro & Rooftop",
    description:
      "Italian pasta, bistro mains, small plates. Best had up on the terrace if the weather's playing along.",
  },
] as const;
