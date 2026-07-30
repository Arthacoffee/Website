# Artha Speciality Coffee — Website

The digital flagship for Artha Speciality Coffee, a specialty coffee house and
full-meal vegetarian restaurant across three levels and a rooftop terrace on
Defence Colony Road, Sainikpuri, Secunderabad.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4,
and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Other scripts:

```bash
npm run build         # production build
npm run start          # serve the production build
npm run lint            # ESLint
npm run typecheck   # tsc --noEmit
npm run format         # Prettier (writes)
npm run format:check
```

## Structure

```
src/
  app/                Routes (App Router) — one folder per URL segment
    about/            Our Story
    coffee/           Coffee menu
    kitchen/          Kitchen menu
    journal/          Journal index + journal/[slug]
    visit/            Location, hours, reservations
    api/reservations/ Reservation intake route handler
    sitemap.ts, robots.ts, opengraph-image.tsx
    layout.tsx, page.tsx (Home), globals.css
  components/
    layout/           Header, Footer, header-variant-context
    sections/         Page-level composition (Hero, SplitFeature, MenuLanes, …)
    ui/               Reusable primitives (Button, Container, Eyebrow, Reveal, …)
  content/            Typed content modules — menu, journal posts, team,
                       values, site-wide config (NAP, nav, hours)
  hooks/              useScrolledPast, useBodyScrollLock
  lib/                fonts, utils, reservation validation, structured data
  styles/tokens.css   Design tokens (color, type scale, motion easing)
```

Every page's real content — the founder bios, the brand story, the Journal
essays, the menu — lives in `src/content/`, not hardcoded in JSX, so an
editorial change is a data change, not a layout change.

## Design system

- **Palette**: fixed light theme — `background` `#F8F5F1`, `foreground`
  `#111111`, `coffee` `#3A2C25`, `bronze` `#B88A44`, `forest` `#56624F`,
  `stone` `#ECE7E2`, defined in `src/styles/tokens.css`.
- **Bronze has two text-safe siblings**, `bronze-ink` and `bronze-light`: the
  brand bronze fails WCAG AA as running text against both the light and dark
  surfaces it sits on, so text/icon usages use whichever variant clears
  4.5:1 for that surface. `bronze` itself stays for decorative use only
  (borders, gradients). See the `fix: raise bronze text/icon contrast to WCAG
  AA` commit for the full reasoning.
- **Type**: Cormorant Garamond (display) + Inter (body), loaded via
  `next/font`. Fluid scale peaking at hero 160px / h1 96px / h2 72px / body
  20px / caption 14px on desktop.
- **Motion**: a single `Reveal` component (fade + blur + small slide, ≤0.8s,
  `prefers-reduced-motion`-aware) used for every scroll-entrance animation.
  Never bounces, never spins.

## Notes for going live

- **Reservation form** (`/visit`) is wired to a real endpoint
  (`/api/reservations`) with Zod validation and loading/success/error states,
  but that endpoint only logs the request — it isn't connected to a real
  notification channel yet. Wire it to email (Resend/SES), a webhook, or a
  CRM before relying on it for real bookings.
- **Map embed**: `/visit` uses a keyless Google Maps embed
  (`google.com/maps?...&output=embed`). For a more robust, quota-tracked
  embed, switch to the Google Maps Embed API with an API key.
- **Photography**: there is no real photography yet. `ImageFrame`
  (`src/components/ui/image-frame.tsx`) renders a brand-toned gradient frame
  as a placeholder and accepts a `src`/`alt` prop that switches it to
  `next/image` with zero layout change — drop photos in via that prop,
  category by category (interior / coffee / kitchen / terrace / people /
  lifestyle), when they exist. The Hero component similarly accepts
  `videoSrc`/`posterSrc` for a future cinematic video background.
- **OG image**: `opengraph-image.tsx` generates a branded share card at
  build time (no photography dependency). Revisit once real photography
  exists.
- **`site.geo`** in `src/content/site.ts` holds approximate coordinates —
  replace with the surveyed lat/long before relying on it for map accuracy.
- **Instagram**: the footer/social link points at `instagram.com` as a
  placeholder — update `site.social.instagram` and the footer link once the
  account exists.

See `docs/AUDIT.md` for the full pre-migration audit this rebuild was based
on — what was kept, what changed, and why.
