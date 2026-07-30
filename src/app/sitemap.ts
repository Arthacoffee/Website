import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { journalPosts } from "@/content/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/coffee", "/kitchen", "/journal", "/visit"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const journalRoutes = journalPosts.map((post) => ({
    url: `${site.url}/journal/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...journalRoutes];
}
