import { site } from "@/content/site";
import type { JournalPost } from "@/content/journal";

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.fullName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    servesCuisine: ["Coffee", "Andhra", "Italian", "Indo-Chinese", "Vegetarian"],
    priceRange: "₹₹",
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      postalCode: site.address.postalCode,
      addressCountry: site.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    sameAs: site.social.instagram ? [site.social.instagram] : undefined,
  };
}

export function articleJsonLd(post: JournalPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: site.fullName,
    },
    publisher: {
      "@type": "Organization",
      name: site.fullName,
    },
    mainEntityOfPage: `${site.url}/journal/${post.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const withHome = [{ name: "Home", path: "" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: withHome.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
