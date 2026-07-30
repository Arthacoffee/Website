# SEO

What's implemented, why it's structured this way, and what still needs a
human to click a button on a real domain before it counts as "done."

## Why SEO matters specifically for this business

This isn't generic hygiene. The project report that founded Artha is
explicit that two neighboring businesses (White Cashew, 4.6★/2,300+
reviews; Momo Kitchen, 4,744 Zomato ratings) already prove that Google
Maps and search discovery convert directly to footfall on this exact
street. Structured data and correct NAP (name/address/phone) consistency
are tied to walk-in revenue for this specific business, not an abstract
best practice.

## Metadata API

Every route exports its own `metadata` (static) or `generateMetadata`
(dynamic, for `journal/[slug]`) rather than relying on the root layout's
defaults everywhere. The root layout (`app/layout.tsx`) sets:

- `metadataBase` — so every relative URL used elsewhere in metadata
  resolves against `site.url` (`src/content/site.ts`) rather than needing
  to be written absolute every time.
- A `title` template (`%s — Artha`) — every page's own `title` (e.g.
  `"Coffee"`) automatically becomes `"Coffee — Artha"` without repeating
  the suffix per page.
- Default `description`, `openGraph`, `twitter`, `robots` — inherited by
  any route that doesn't override them, overridden by every route that
  should say something more specific (all of them currently do).

**Canonical URLs**: every page sets `alternates: { canonical: "/path" }`
explicitly rather than relying on Next to infer it — deliberate, since
inference can be wrong the moment query parameters or trailing slashes are
involved.

## Structured data (JSON-LD)

Three schema types, built by `src/lib/structured-data.ts` and inlined per
page via `<script type="application/ld+json">`:

| Schema           | Where               | Purpose                                                                                                                                        |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `Restaurant`     | Homepage only       | Name, address, geo, phone, cuisine, hours, price range — the record most likely to power a Google Business-style knowledge panel or map result |
| `Article`        | Each Journal post   | Headline, description, publish date, author/publisher — qualifies Journal essays for article-rich search results                               |
| `BreadcrumbList` | Every interior page | Home → Section (→ Post) — powers the breadcrumb trail Google sometimes shows under a search result instead of the raw URL                      |

`breadcrumbJsonLd()` always prepends a `Home` entry automatically — call
sites pass only the page-specific trail after Home.

**Verification status:** the JSON-LD has been checked for structural
validity (each block parses as valid JSON and matches its declared
`@type`'s required fields) but has **not** been run through Google's Rich
Results Test or Schema.org validator against a live URL, since this
codebase was built without a public deployment to point either tool at.
Do this before launch — it's a five-minute check once the domain is live,
listed in `docs/LAUNCH_CHECKLIST.md`.

## Sitemap & robots

`app/sitemap.ts` and `app/robots.ts` use Next's Metadata API special
files (not static `public/` files) so they're generated from the same
`content/journal.ts` data as the actual pages — adding a Journal post adds
its sitemap entry automatically, nothing to remember to update by hand.
`robots.ts` disallows `/api/` (no reason for a crawler to hit the
reservation endpoint) and points at the sitemap.

## Open Graph image

There is no real photography yet (see `docs/AUDIT.md`). Rather than ship
no social-preview image, or a generic stock photo that misrepresents the
brand, `app/opengraph-image.tsx` generates a branded card at build time
via `next/og`'s `ImageResponse` — wordmark, tagline, brand gradient, no
photography dependency. Revisit once real photography exists; a photo of
the room will out-perform a generated card on click-through, but a
generated card outperforms _nothing_.

## Redirects (link equity from the previous site)

The site previously shipped as static `.html` pages (`docs/AUDIT.md`,
Part 1). `next.config.ts` permanently redirects (`308`) every one of
those paths to its new equivalent, including the three Journal posts
whose slugs changed entirely between the static site and this one (e.g.
`/journal/brew-bar-eagle-one.html` →
`/journal/why-we-built-our-brew-bar-around-one-machine`). This protects
against 404s from anything that already links the old paths — a Google
Business Profile link, a shared social post, a browser bookmark — none of
which this team necessarily controls or can update directly.

## What's not done, and needs a human + a live domain

- [ ] Submit the sitemap to Google Search Console (and Bing Webmaster
      Tools) once the domain is live.
- [ ] Run the deployed homepage and one Journal post through Google's Rich
      Results Test.
- [ ] Verify the Open Graph image actually renders correctly when a link
      is pasted into WhatsApp, Instagram bio, and iMessage specifically —
      each platform's crawler/cache behaves slightly differently.
- [ ] Claim/verify the Google Business Profile and confirm its NAP data
      matches `content/site.ts` exactly (a mismatch between GBP and
      on-site structured data is a known ranking-confusion factor).
- [ ] Replace `site.geo` (approximate coordinates) with the surveyed
      lat/long for the actual building.
- [ ] Fill in `site.social.instagram` once the account exists — it's
      currently an empty string, which correctly omits `sameAs` from the
      `Restaurant` schema rather than emitting a broken link.
