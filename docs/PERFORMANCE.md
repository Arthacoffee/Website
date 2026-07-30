# Performance

Structural decisions that support a 100 Lighthouse Performance score, and
an honest statement of what's been measured versus what still needs
verifying against a real deployment.

## Measurement caveat, stated up front

This codebase was built and tested in a sandboxed environment without a
public URL — there is no live Chrome DevTools trace, no PageSpeed Insights
run, no CDN or real network conditions to measure against. Everything
below is a structural claim ("this choice removes a whole category of
performance problem") verified via `next build`'s own output, not an
independently measured score. **Run Lighthouse against the actual
production deployment before quoting a number.** A checklist for that is
at the bottom of this doc and in `docs/LAUNCH_CHECKLIST.md`.

## Rendering: fully static

Every route is prerendered at build time (`○ Static` in the table below)
except the reservation API route, which necessarily runs per-request.
There is no server-side data fetching on any page render and no
client-side data fetching anywhere — pages ship as static HTML the CDN can
cache indefinitely, which is the single biggest lever for LCP (Largest
Contentful Paint) and TTFB (Time to First Byte) available: there's no
database query or API call in the critical path of a single page load.

```
Route                        First Load JS
/                              154 kB
/about /coffee /kitchen        151–152 kB
/journal, /journal/[slug]      152 kB
/visit                          168 kB   (largest — the reservation form)
+ shared by every route         102 kB
```

`First Load JS` here is the _entire_ JS payload for a cold visit to that
route, shared chunks included — there's no separate bundle-analyzer step
run, but 150–170kB total (pre-compression; gzip/brotli over the wire will
be meaningfully smaller) for a marketing site with animation and a
validated form is a reasonable number, not something requiring immediate
surgery. `/visit` is the largest because it's the only route shipping
Zod's validation library and the reservation form's client logic.

## JavaScript: minimal client-side surface

Exactly five components are `"use client"` (see `docs/ARCHITECTURE.md` for
the list and reasoning) — everything else, including every page itself, is
a React Server Component shipping zero JS of its own. This isn't a
performance optimization bolted on after the fact; it's a consequence of
the `ui`/`sections`/`layout` split only reaching for interactivity where a
component genuinely needs the browser (motion, form state, scroll
position).

## Fonts

Cormorant Garamond and Inter load via `next/font/google`
(`src/lib/fonts.ts`), which:

- Self-hosts the font files at build time (no runtime request to
  `fonts.googleapis.com`, no render-blocking third-party connection).
- Sets `display: "swap"` — text renders in a fallback font immediately
  rather than staying invisible until the webfont arrives (avoids
  Flash-of-Invisible-Text and the LCP penalty that comes with it).
- Uses Next's automatic font-metric matching to size the fallback font's
  fallback metrics to the real font, minimizing the layout shift when the
  swap happens (a direct CLS — Cumulative Layout Shift — mitigation).

## Images: architecture ready, no assets yet to optimize

There is no real photography in this repository yet (`docs/AUDIT.md`).
`ImageFrame` (`components/ui/image-frame.tsx`) is built so that dropping a
real photo in is a `src`/`alt` prop away from rendering through
`next/image` — which handles responsive `srcset` generation, automatic
AVIF/WebP format negotiation, and lazy-loading below the fold, all with no
component-level code change required. The photography _placeholders_
(gradient fills) are pure CSS, so there's no image weight at all until
real assets exist — the honest performance number today for images is
zero bytes, which won't survive first contact with real photography and
isn't meant to.

The `Hero` component's optional `videoSrc` should, when used, be paired
with `posterSrc` (already wired) and a compressed, short, muted-autoplay
video — a large unoptimized video background is the single most likely
way this site's LCP regresses once real assets land.

## Layout stability (CLS)

- Every `ImageFrame` usage sets an explicit `aspect-[...]` class, so the
  placeholder (and later, the real photo) reserves its layout space before
  any content loads — no shift when an image appears.
- Font-metric matching (above) removes the swap-triggered shift.
- The header's transparent → solid transition on scroll is a
  `background-color`/`backdrop-filter` change, not a height or padding
  change — the page content underneath never jumps.

## Interaction responsiveness (INP)

- Framer Motion's `Reveal` animations are GPU-friendly properties
  (`opacity`, `filter`, `transform`) rather than properties that force
  layout recalculation.
- The reservation form validates client-side with Zod synchronously on
  submit — no debounce-and-wait pattern that could feel laggy — and moves
  focus programmatically rather than relying on a slow re-render to guide
  the user.

## Before quoting a Lighthouse number, verify

- [ ] Run Lighthouse (mobile + desktop) against the real production URL,
      not `localhost` — CDN, TLS handshake, and real network conditions
      all affect the score `next build`'s local numbers can't predict.
- [ ] Confirm real photography, once added, is served at reasonable
      dimensions (`next/image`'s `sizes` prop tuned per placement, not left
      at the current placeholder's `100vw` default everywhere).
- [ ] Re-check bundle size after Zod/Framer Motion version bumps — both are
      the largest third-party dependencies in the client bundle.
- [ ] If a video hero background is added, verify its LCP/CLS impact
      specifically — video is the highest-risk addition to this site's
      current performance profile.
