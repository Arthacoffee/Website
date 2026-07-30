/**
 * Single source of truth for business identity (NAP), navigation, and
 * social links. Consumed by layout chrome, footer, and SEO/JSON-LD so a
 * detail never drifts between the two.
 */

export const site = {
  name: "Artha",
  fullName: "Artha Speciality Coffee",
  tagline: "Made With Intention.",
  description:
    "A destination for specialty coffee, thoughtful vegetarian food, and unhurried moments — three levels and a rooftop terrace on Defence Colony Road, Sainikpuri, Secunderabad.",
  url: "https://arthacoffee.com",
  locale: "en_IN",
  address: {
    streetAddress: "Plot No. 820, Defence Colony Road, Sainikpuri",
    addressLocality: "Secunderabad",
    addressRegion: "Telangana",
    postalCode: "500094",
    addressCountry: "IN",
  },
  geo: {
    // Approximate — Sainikpuri, Secunderabad. Replace with surveyed
    // coordinates before relying on this for map pins.
    latitude: 17.4863,
    longitude: 78.5455,
  },
  phone: "+91 95817 63842",
  phoneHref: "tel:+919581763842",
  email: "sri@arthacoffee.com",
  hours: {
    opens: "10:00",
    closes: "23:00",
    display: "Daily — 10:00am to 11:00pm",
  },
  social: {
    instagram: "",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Coffee", href: "/coffee" },
  { label: "Kitchen", href: "/kitchen" },
  { label: "Journal", href: "/journal" },
  { label: "Visit", href: "/visit" },
];

export const reserveNav: NavItem = { label: "Reserve", href: "/visit#reserve" };

export const footerNav: NavItem[] = [
  { label: "Coffee", href: "/coffee" },
  { label: "Kitchen", href: "/kitchen" },
  { label: "Journal", href: "/journal" },
  { label: "Visit", href: "/visit" },
  { label: "Our Story", href: "/about" },
];

export const serviceWindows = [
  { label: "Brunch & Brew Bar", hours: "10:00am – 12:30pm" },
  { label: "Andhra Traditional Lunch", hours: "12:00pm – 3:00pm" },
  { label: "Afternoon Pour", hours: "3:00pm – 6:30pm" },
  { label: "Bistro", hours: "6:30pm – 11:00pm" },
  { label: "Tandoor", hours: "7:00pm – 11:00pm" },
  { label: "Coffee & Desserts", hours: "10:00am – 11:00pm" },
] as const;
