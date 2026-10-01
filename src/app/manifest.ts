import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5f1",
    theme_color: "#3a2c25",
    icons: [
      { src: "/images/logo/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/images/logo/icon-512.png", type: "image/png", sizes: "512x512" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
