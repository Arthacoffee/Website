# Architecture

How this codebase is put together, and why — for whoever maintains it next.

## Stack

Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS v4,
Framer Motion, Zod, Lucide icons. No CMS, no database, no auth. One
server-side integration point: `POST /api/reservations`.

## Rendering strategy

Every route is statically generated at build time (`○` in `next build`'s
output) except the reservation API route (`ƒ`, necessarily dynamic — it
handles a `POST`). The three Journal posts are pre-rendered via
`generateStaticParams` in `journal/[slug]/page.tsx` — adding a fourth post
is a data change in `content/journal.ts`, not a new template.

There is no client-side data fetching anywhere. Every page is a React
Server Component by default; `"use client"` is opted into only where a
component genuinely needs the browser (state, effects, event handlers,
Framer Motion). Grep for `"use client"` and you'll find exactly: `Header`,
`HeaderVariantProvider`/`HeaderOverDarkHero`, `Reveal`, `Hero`, and
`ReservationForm`. Everything else — every page, `Footer`, `MenuLanes`,
`SplitFeature`, `JournalCard`, `ImageFrame` — ships zero client JavaScript
of its own.

## Directory structure

```
src/
  app/                     Routes — one folder per URL segment (App Router)
    layout.tsx             Root shell: fonts, metadata defaults, chrome
    page.tsx                Home
    about/ coffee/ kitchen/ journal/ visit/
    journal/[slug]/          Dynamic route, generateStaticParams
    api/reservations/        The one server integration point
    sitemap.ts robots.ts manifest.ts   Metadata-API special files
    icon.svg apple-icon.tsx opengraph-image.tsx   Generated brand assets
  components/
    layout/                Header, Footer, header-variant-context
    sections/               Page-level composition — one section = one
                              visually distinct block of a page
    ui/                     Primitives with no page-specific knowledge —
                              Button, Container, Eyebrow, Reveal, ImageFrame,
                              FormField, SkipLink
  content/                  Typed data modules — the site's actual words,
                              numbers, and structure, kept out of JSX
  hooks/                    useScrolledPast, useBodyScrollLock, useFocusTrap
  lib/                       fonts.ts, utils.ts (cn), reservation.ts (Zod
                              schema, shared by client form and API route),
                              structured-data.ts (JSON-LD builders)
  styles/tokens.css          Design tokens — the only place color/type/motion
                              constants are defined
```

## The `ui` / `sections` / `layout` split

- **`ui/`** components know nothing about Artha. `Button` doesn't know what
  "Reserve a Table" means; `Eyebrow` doesn't know it's usually bronze. They
  take props and render. A `ui/` component should be portable to a
  completely different site with zero changes.
- **`sections/`** components know about Artha's content shape (a
  `MenuLane`, a `JournalPost`) but not about a specific page. `SplitFeature`
  is used on the homepage, `/about`, `/coffee`, and `/kitchen` with
  different content — it's the same component every time.
- **`layout/`** components are singletons: there is exactly one `Header`
  and one `Footer`, rendered once each, in the root layout.
- **`app/*/page.tsx`** files do almost nothing except import content from
  `content/` and compose it into `sections/` in an order. A page file
  should be readable top-to-bottom as "here's what this page contains," not
  as implementation.

If you're adding a new page and find yourself writing markup directly in
`page.tsx` instead of composing existing `sections/` components (or adding
a new one), that's usually a sign the section doesn't exist yet and should,
not that this page is special.

## Content-as-data

Every real piece of copy — menu items and prices, founder bios, Journal
essay bodies, sustainability values, the business's address/phone/hours —
lives in `src/content/*.ts` as typed exports, not inline in JSX. Two
reasons this matters:

1. **Editorial changes don't require touching layout code.** A price
   update, a new Journal post, a founder bio edit — all data changes.
2. **CMS-readiness.** If/when a real CMS is introduced, only the data-layer
   (`content/*.ts` → fetched-from-CMS equivalents) changes. No page or
   section component should need to change, because they already consume a
   typed shape (`MenuLane[]`, `JournalPost[]`, `TeamMember[]`), not raw
   JSX. Swapping the _source_ of that shape is the entire migration.

`Journal` posts illustrate the pattern most concretely: `body` is an array
of typed blocks (`{ type: "p" | "h2" | "quote"; text: string }`) rendered
generically in `journal/[slug]/page.tsx`, rather than a hand-authored HTML
string. Adding a CMS later means fetching that same shape from wherever the
CMS puts it; the rendering code is already CMS-shaped.

## Why a `HeaderVariantContext` instead of a page prop

The header needs to render two different ways: transparent-over-a-dark-hero
(currently only the homepage) and solid-on-light (every other page) — and
it's rendered once, in the root layout, above every page. A page can't pass
props down to a layout that already rendered above it. `HeaderOverDarkHero`
is a client component a page drops in that calls `setVariant("dark-hero")`
on mount and resets it on unmount via context — the smallest mechanism that
lets an individual page opt the shared header into a different look without
prop-drilling through the layout tree or duplicating the header per-page.

## Known structural risk: `backdrop-filter` and fixed positioning

Documented in code (`components/layout/header.tsx`) and worth repeating
here because it's non-obvious and will bite again if forgotten: any
ancestor with `filter` or `backdrop-filter` set to something other than
`none` becomes the containing block for its `position: fixed` descendants,
not the viewport. The header uses `backdrop-blur-md`. Anything
`position: fixed` must be rendered as a **sibling** of the header, not a
child, or it will size itself against the header's own ~80px box. This is
why the mobile nav panel lives outside `<header>...</header>` in the JSX.

## Extending the site

- **New page:** add `app/<route>/page.tsx`, export `metadata`, compose
  existing `sections/` components. Add it to `content/site.ts`'s
  `primaryNav`/`footerNav` if it belongs in navigation, and to
  `app/sitemap.ts`.
- **New Journal post:** add an entry to `content/journal.ts`. The route,
  metadata, JSON-LD, and sitemap entry all follow automatically.
- **New menu item/lane:** edit `content/menu.ts`.
- **New reusable visual pattern used 2+ times:** add it to
  `components/sections/`, not inline in the page that needed it first.
- **New design token:** add it to `styles/tokens.css`'s `@theme inline`
  block, not as a one-off hex value in a component's `className`.
