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
      "The RO system feeding our brew bar reuses its reject water for cleaning, and we've got low-flow fixtures throughout the café.",
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
    time: "10:00am – 12:30pm",
    title: "Morning & Brunch",
    description:
      "We serve coffee with punugulu, avocado toast, shakshuka, and pesarattu.",
  },
  {
    time: "12:00pm – 3:00pm",
    title: "Andhra Lunch",
    description: "We serve traditional Andhra thalis, rice plates, and gravies.",
  },
  {
    time: "3:00pm – 6:30pm",
    title: "Afternoon Coffee",
    description:
      "We serve filter coffee, espresso drinks, tasting flights, and estate coffees.",
  },
  {
    time: "6:30pm – 11:00pm",
    title: "Evening Bistro",
    description: "We serve Italian pasta, soups, and small plates.",
  },
] as const;
