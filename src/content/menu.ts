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
 * The full-meal vegetarian kitchen: five cuisine programmes (Andhra
 * traditional, Italian pasta, Indo-Chinese, tandoor, bistro) plus the
 * all-day brunch lane. Six lanes total, one kitchen — prose elsewhere
 * ("five programmes") counts the cuisines and lists brunch separately;
 * update both together if a lane is ever added or removed here.
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
    priceRange: "₹160 – ₹350",
    items: ["Full Andhra Meal", "Rice Plates", "Gravies", "Thali"],
  },
  {
    slug: "italian-pasta",
    name: "Italian Pasta",
    hours: "12pm – 11pm",
    priceRange: "₹360 – ₹550",
    items: ["Pomodoro", "Cacio e Pepe", "Pesto", "Mushroom Risotto"],
  },
  {
    slug: "indo-chinese",
    name: "Indo-Chinese",
    hours: "12pm – 11pm",
    priceRange: "₹320 – ₹420",
    items: ["Hakka Noodles", "Fried Rice", "Manchurian", "Chilli Paneer"],
  },
  {
    slug: "tandoor",
    name: "Tandoor",
    hours: "7pm – 11pm",
    priceRange: "₹40 – ₹720",
    items: ["Paneer Tikka", "Seekh Kebab", "Naan", "Mixed Platter"],
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
