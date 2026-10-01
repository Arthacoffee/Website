export type MenuLane = {
  slug: string;
  name: string;
  hours: string;
  priceRange: string;
  items: string[];
};

/** The brew bar and dessert case — served from the coffee counter. */
export const coffeeLanes: MenuLane[] = [
  {
    slug: "brew-bar",
    name: "Specialty Coffee & Brew Bar",
    hours: "10am – 11pm",
    priceRange: "₹110 – ₹650",
    items: ["Filter Coffee", "V60", "Cold Brew", "Tasting Flight", "Espresso Classics"],
  },
  {
    slug: "desserts",
    name: "Desserts",
    hours: "10am – 11pm",
    priceRange: "₹210 – ₹350",
    items: ["Tiramisu", "Double Ka Meetha", "Dark Chocolate Brownie", "Kulfi"],
  },
];

/**
 * The full-meal vegetarian kitchen: four programmes — brunch, Andhra
 * traditional, Italian pasta, and bistro. Indo-Chinese and tandoor are no
 * longer on the menu; prose elsewhere ("four programmes") counts these
 * four lanes, so update both together if a lane is ever added or removed
 * here.
 */
export const kitchenLanes: MenuLane[] = [
  {
    slug: "brunch",
    name: "Brunch",
    hours: "10am – 12:30pm",
    priceRange: "₹200 – ₹340",
    items: ["Punugulu", "Avocado Toast", "Shakshuka", "Pesarattu"],
  },
  {
    slug: "andhra-traditional",
    name: "Andhra Traditional",
    hours: "12pm – 3pm",
    priceRange: "₹120 – ₹350",
    items: ["Andhra Thali", "Full Andhra Meal", "Nati Ghee Roast", "Gongura Paneer"],
  },
  {
    slug: "italian-pasta",
    name: "Italian Pasta",
    hours: "12pm – 11pm",
    priceRange: "₹360 – ₹550",
    items: ["Pomodoro", "Cacio e Pepe", "Pesto", "Mushroom Risotto"],
  },
  {
    slug: "bistro",
    name: "Bistro",
    hours: "6:30pm – 11pm",
    priceRange: "₹200 – ₹420",
    items: ["Soups", "Small Plates", "Grilled Herb Paneer", "Baked Pasta"],
  },
];

export const vegetarianNote =
  "100% vegetarian kitchen. All dishes, including egg-based preparations, are made on dedicated equipment with clear FSSAI green/brown-dot labelling. Prices and availability are indicative and may vary seasonally — please confirm with the team when you visit.";
