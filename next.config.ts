import type { NextConfig } from "next";

/**
 * Security headers applied to every response. Values chosen for a site
 * with no third-party embeds except a Google Maps iframe (on /visit) and
 * no inline scripts beyond Next's own — kept simple rather than a full CSP
 * that would need constant upkeep as the stack evolves.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // The site previously shipped as static .html pages (see docs/AUDIT.md).
  // Those URLs may already be indexed, bookmarked, or linked from Google
  // Business/social profiles — redirect them permanently rather than
  // letting them 404 now that the routes are clean paths.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/menu.html", destination: "/coffee", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/visit.html", destination: "/visit", permanent: true },
      { source: "/journal.html", destination: "/journal", permanent: true },
      {
        source: "/journal/brew-bar-eagle-one.html",
        destination: "/journal/why-we-built-our-brew-bar-around-one-machine",
        permanent: true,
      },
      {
        source: "/journal/four-parts-of-the-day.html",
        destination: "/journal/one-address-four-parts-of-the-day",
        permanent: true,
      },
      {
        source: "/journal/vegetarian-kitchen.html",
        destination: "/journal/a-fully-vegetarian-kitchen-done-seriously",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
