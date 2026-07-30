# Artha Speciality Coffee — Website Audit

**Scope:** the static HTML/CSS/JS site as committed at `631012d`.
**Purpose:** establish a factual baseline before the Next.js migration, so nothing
good gets thrown away and nothing broken gets carried forward.

---

## 1. Strengths

Things worth explicitly preserving through the rebuild.

- **Content is already good.** The brand story ("Artha means purpose"), the
  founder bios, the four-parts-of-the-day concept, the sustainability/ESG
  copy, and the three Journal essays are well-written, specific, and true to
  the business. None of this needs to be rewritten — it needs a better frame.
- **Clear information architecture.** Home → Menu → About → Journal → Visit is
  a sane, minimal IA for a hospitality site. No orphan pages, no dead links.
- **Consistent design tokens.** `css/style.css` already centralizes color,
  type, radius, and shadow in `:root` custom properties — a good sign the
  next system will have real tokens to port rather than tokens to invent from
  scratch.
- **Working interaction layer.** Mobile nav toggle, footer year, and the
  reservation form's client-side validation/success state all function
  correctly (verified via Playwright in the previous session).
- **No dependency risk.** Zero build step, zero npm surface, zero JS
  framework — nothing to go out of date. (This is also listed as a weakness
  below; it's a tradeoff, not a pure win.)
- **Real, non-placeholder business data.** Address, hours by service window,
  phone, email, and menu pricing are the operator's actual data, not `lorem
ipsum` — the site was never a mockup.

## 2. Weaknesses

- **No component reuse.** Every page hard-codes the full header and footer
  markup (~90 lines each) independently. A single nav label change means
  editing eight files by hand. This is the single biggest source of drift
  risk in the current codebase.
- **Placeholder visuals only.** Every image is a CSS-gradient block with an
  inline SVG glyph. There is no real photography anywhere on the site —
  no interior, no coffee, no food, no rooftop, no people. For a hospitality
  brand this is the largest gap between "functional" and "world-class."
- **No design restraint at the typographic level.** One serif display size
  scaling via `clamp()` in the hero only; every other heading is a fixed,
  fairly conservative size. The type system reads as competent brochure-ware,
  not editorial-grade (no dramatic scale contrast, no large-format
  statements).
- **Reservation form is a dead end.** `data-contact-form` intercepts submit,
  shows a canned message, and discards the data. No backend, no email, no
  webhook — a guest who "reserves" today reserves nothing.
- **Map is a best-effort embed.** The keyless `google.com/maps?...&output=embed`
  iframe is undocumented/unofficial API surface — it can be rate-limited or
  silently blocked with no fallback UI if it fails (confirmed blank in a
  network-restricted preview).
- **No motion design.** Zero use of `prefers-reduced-motion`-aware animation;
  everything is static except CSS hover states. Flat, not calm — closer to
  absence of design than intentional stillness.

## 3. Opportunities

- **Photography-first storytelling.** Replacing gradient placeholders with
  real photography (or, in the interim, a disciplined set of custom
  illustrations) is the single highest-leverage change available — more than
  any code change, it is what will make the site _look_ like Aman/Aesop/Blue
  Bottle rather than a well-built template.
- **Componentized content = faster iteration.** Moving menu items, journal
  posts, and team bios into typed content modules means adding a seasonal
  menu update or a new Journal post becomes a data change, not an HTML edit.
- **Motion as a brand signal.** Slow, deliberate fade/blur/slide transitions
  (no bounce, no spin) reinforce "unhurried" — one of the brand's own stated
  values — better than any copy can.
- **Structured data for local discovery.** The report that founded this site
  is explicit that Google Maps/search discovery already converts to footfall
  on this street (White Cashew, Momo Kitchen). `Restaurant` JSON-LD, correct
  `NAP` (name/address/phone) consistency, and a sitemap are directly tied to
  revenue for this specific business, not generic SEO hygiene.
- **CMS-readiness.** Extracting menu/journal/team content into structured
  files now (even before any CMS is chosen) means a future headless CMS swap
  touches data-fetching code only, never page layout.

## 4. Technical Debt

| Item                         | Detail                                                                                                                                           | Risk                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Header/footer duplication    | Identical ~90-line blocks copy-pasted into 8 HTML files                                                                                          | High — every nav/contact change requires 8 synchronized edits; already a source of drift (see Architecture Problems) |
| No build tooling             | No bundler, no minification, no image pipeline                                                                                                   | Medium — fonts and CSS ship unminified and unbundled; every page pays full CSS weight even for the ~20% it uses      |
| Inline `style=""` attributes | e.g. `style="margin: 16px auto 0;"` in `index.html`, `style="color:var(--color-gold);"` in every CTA band                                        | Low-medium — bypasses the design system, makes a future theme change miss spots                                      |
| No JS module system          | `main.js` is a single global script, `DOMContentLoaded`-scoped, doing three unrelated things (nav, footer year, form)                            | Low — fine at this scale, would not scale past 3–4 behaviors                                                         |
| Untyped, unvalidated form    | Reservation form has HTML5 `required`/`type` validation only; no format checks (phone, party size bounds beyond `min`/`max`), no server contract | Medium — silently accepts malformed data once wired to a real backend                                                |
| Keyless Maps embed           | See Weaknesses                                                                                                                                   | Medium                                                                                                               |

## 5. Architecture Problems

- **No templating layer.** Because this is static HTML with no include
  mechanism, the "component" is copy-paste. Concretely: the phone number
  `+91 95817 63842` appears in 8 separate files. A future phone number change
  is an 8-file grep-and-replace with no compiler to catch a missed instance.
- **No route-level code ownership.** `menu.html` conflates two very different
  concerns (coffee program and food kitchen) into one page and one nav item,
  which works today but doesn't map cleanly onto the brand's own stated
  differentiator (coffee _and_ a serious kitchen, as two distinct crafts).
- **No layout composition.** Every page repeats the full `<head>` block
  (fonts, favicon, meta description) by hand; nothing enforces that a new
  page remembers the favicon or the font preconnect tags.
- **Journal is not scalable.** Each entry is a fully hand-authored HTML file
  with the entire header/footer duplicated again. Adding a 4th post means
  copying an existing post file and manually re-writing every section,
  including the unrelated CTA at the bottom.

## 6. SEO Problems

- **No structured data at all.** No `Restaurant`, `LocalBusiness`,
  `Article`, or `BreadcrumbList` JSON-LD anywhere. For a business whose own
  business case leans on Maps/search discovery, this is a direct gap between
  stated strategy and shipped code.
- **No sitemap.xml, no robots.txt.** Nothing tells crawlers what exists or
  how it's structured.
- **No canonical URLs.** Multiple accessible paths to the same content are
  possible (e.g. `/index.html` vs `/`) with no canonical tag resolving them.
- **No Open Graph / Twitter Card metadata.** Any link shared to WhatsApp,
  Instagram bio, or social — the channels this brand's own marketing section
  says it will lean on — renders with no title, no image, no description
  card.
- **Meta descriptions are page-static, not content-aware.** Fine for 8 pages,
  will not scale to a growing Journal.
- **No `og:image` / social preview image exists at all** — there is no
  photography to generate one from yet.

## 7. Accessibility Problems

- **Icon-only interactive elements** (nav hamburger, Instagram social icon)
  have `aria-label`s — good — but the hamburger's open/closed state is
  conveyed only by `aria-expanded`, with no visible focus-order test done
  against real screen readers.
- **Color contrast is mostly fine** (espresso-on-cream, cream-on-espresso)
  but several secondary text tokens (`rgba(36, 22, 16, 0.55)` used for
  Journal post meta text) sit close to WCAG AA's 4.5:1 body-text threshold
  and should be re-verified against the final palette.
- **No skip-to-content link.** Keyboard and screen-reader users must tab
  through the entire nav on every single page load before reaching `<main>`.
- **Form fields lack described errors.** Native `reportValidity()` covers
  the happy path but there's no `aria-describedby` error messaging pattern
  for a screen-reader user who submits an invalid reservation.
- **Decorative SVGs are not marked `aria-hidden`.** Every placeholder icon
  and illustration is exposed to assistive tech with no accessible name,
  which is worse than an image with empty alt text — it's ambiguous noise.
- **No `prefers-reduced-motion` handling** — moot today since there is no
  motion, but flagged because Step 9 of the redesign introduces
  Framer Motion sitewide and must respect it from day one.

## 8. Performance Problems

- **Render-blocking Google Fonts.** Two fonts (Fraunces + Inter, 7 weight/opsz
  combinations total) load via a synchronous `<link>` in `<head>` on every
  page with no `font-display` control beyond the Google-provided default and
  no self-hosting — a classic largest-contentful-paint tax.
- **No image optimization pipeline** — moot only because there are no raster
  images yet; this becomes the top performance risk the moment real
  photography is added, unless `next/image` (or equivalent responsive
  `srcset` + AVIF/WebP) is in place first.
- **Full CSS shipped on every page.** `style.css` is one global stylesheet
  covering all 8 pages' worth of components; the Home page pays the download
  cost of Journal-post typography it never uses, and vice versa.
- **No caching/versioning strategy.** Static assets (`style.css`, `main.js`,
  `favicon.svg`) have no cache-busting hash, so a deploy either
  under-invalidates (stale CSS served to returning visitors) or requires
  manual query-string busting.
- **Third-party iframe on the Visit page** (Google Maps) loads unconditionally
  with `loading="lazy"` — good — but with no user-initiated "click to load"
  gate, so it still costs a connection setup even lazily.

## 9. Branding Problems

- **Visual craft is template-grade, not editorial-grade.** The palette,
  spacing, and component shapes (pill buttons, rounded cards, drop shadows)
  read as a well-executed _café template_, not a distinctive premium
  hospitality brand. Nothing on the page would tell you this is the same
  register as Aman, Aesop, or Blue Bottle — softer shadows and rounder
  corners read as friendly/approachable, not premium/considered.
- **No real photography = no proof.** A hospitality brand's entire value
  proposition is sensory (the room, the roast, the plate) and the current
  site has zero photographic evidence of any of it.
- **Typography lacks a dominant, confident scale.** Nothing on the page
  is allowed to be _large_ — the biggest headline (`clamp(2.4rem, 4.2vw,
3.6rem)`) tops out around 58px on a wide viewport. Premium editorial
  brands routinely run hero type at 120–180px; scale itself communicates
  confidence.
- **Language is accurate but functional rather than evocative** in places
  ("Prices and availability are indicative and may vary seasonally" is
  necessary legal-adjacent copy, but it currently sits with the same visual
  weight as brand storytelling — needs de-emphasis, not rewriting).
- **"Reserve a Table" competes with nothing** — there is only one CTA style
  in use (`btn-primary`, terracotta pill) across hero, cards, and CTAs, which
  is _correct_ discipline but currently under-supported by everything else
  (type scale, imagery, motion) that should make that single CTA feel
  inevitable rather than just present.

---

## 10. Prioritized Roadmap

Ordered by leverage: what most changes the site from "functional café site"
to "digital flagship of a premium hospitality brand," for the effort
required.

1. **Component architecture migration (Next.js/React/TS).** Eliminates the
   header/footer duplication and journal hand-authoring problem in one move;
   every subsequent improvement becomes cheaper once this lands.
2. **Type scale + spacing overhaul.** Highest visual-impact, lowest-risk
   change — new tokens, same content, immediately reads more premium.
3. **Motion layer (Framer Motion, restrained).** Fade/blur/slide only,
   `prefers-reduced-motion`-aware, applied to section entrances and the
   nav's scroll-blur state.
4. **SEO foundation.** Metadata API, sitemap, robots, JSON-LD
   (`Restaurant`/`Article`/`BreadcrumbList`), Open Graph — all mechanical
   once on Next.js, and directly tied to the business's own stated
   discovery strategy.
5. **Accessibility pass.** Skip link, focus-visible states, `aria-hidden` on
   decorative SVG, described form errors, contrast re-check against final
   palette.
6. **Reservation flow hardening.** Reusable form component with real
   loading/success/error states and a documented (if not yet live) API
   contract, ready to wire to a real backend.
7. **Photography system.** Reusable `next/image`-based components for
   Interior / Coffee / Kitchen / Terrace / People / Lifestyle categories —
   architecture first, so the moment real photography exists it drops in
   with zero layout changes.
8. **CMS-readiness.** Structured `/content` modules for menu, journal, team,
   values — decouples content edits from code deploys going forward.

Items 1–6 are addressed directly in this migration. Item 7's _architecture_
is built now; the photography itself is outside this repo's scope until real
assets are supplied. Item 8 is scaffolded via `/content` but no CMS vendor is
selected here.

---

# Part 2 — Post-Migration Audit

**Scope:** the Next.js codebase as of `bf1243b`, after the migration described
above plus one additional hardening pass.
**Purpose:** an honest accounting of what the migration actually fixed, what
a second pass caught that the first one missed, and what's left — not a
victory lap.

## What Part 1's roadmap actually delivered

| Item                                                       | Status                                                                          |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Component architecture (no more copy-pasted header/footer) | Done — `components/{layout,sections,ui}`                                        |
| Type scale + spacing overhaul                              | Done — fluid tokens in `styles/tokens.css`                                      |
| Motion layer                                               | Done — single `Reveal` primitive, `prefers-reduced-motion`-aware                |
| SEO foundation                                             | Done — Metadata API, sitemap, robots, JSON-LD, OG image                         |
| Accessibility pass                                         | Done in two passes — see below, this is the one place the first pass fell short |
| Reservation flow hardening                                 | Done — validated, stateful, round-trips a real API route                        |
| Photography architecture                                   | Done (`ImageFrame`); real photography still doesn't exist                       |
| CMS-readiness                                              | Done — `/content` modules; no CMS vendor selected                               |

## What the first migration pass got wrong

Three genuine bugs shipped in the first pass and were only caught by
deliberately verifying computed styles rather than trusting screenshots:

1. **`Reveal`'s reduced-motion variant didn't reset `filter`/`transform`.**
   A visitor with `prefers-reduced-motion` enabled would see every section
   permanently stuck mid-transition (blurred, offset, semi-transparent) —
   the exact opposite of what reduced motion is supposed to guarantee.
2. **The header's `backdrop-blur` silently broke the mobile nav.**
   `backdrop-filter` establishes a new CSS containing block for
   `position: fixed` descendants; the mobile menu panel was a JSX child of
   the blurred `<header>`, so it collapsed to the header's own ~80px box
   instead of the viewport. Fixed by rendering it as a sibling instead.
3. **The brand's bronze accent (#B88A44) failed WCAG AA as text**, 2.5–2.9:1
   against the light surfaces it was used on for every eyebrow label, price,
   and icon sitewide. This wasn't a marginal miss — it was the single most
   visible color in the type system, failing on the majority of the site.

None of these were visible in a casual look at a rendered screenshot; all
three required checking `getComputedStyle()` or a contrast-ratio calculator
directly. That's the practical lesson: **a design that looks right in a
screenshot and a design that is right are not the same claim**, and this
codebase now leans on the second, harder standard.

## What a second, more adversarial pass caught

Running the "would Apple's HIG team or Stripe's design org reject this"
standard surfaced things that were correct but incomplete:

- **The favicon was still Next.js's default boilerplate icon.** Every
  browser tab showed the generic Next logo, not Artha's mark — for a
  "digital flagship" brand, an unbranded browser tab is a real failure, not
  a nitpick. Fixed with a designed monogram (`icon.svg`, `apple-icon.tsx`).
- **The old static site's URLs had no redirect story.** `/menu.html`,
  `/about.html`, `/journal/brew-bar-eagle-one.html`, etc. would all 404 the
  moment this shipped, silently discarding any link equity, bookmarks, or
  Google Business Profile links pointing at them. Fixed with permanent
  redirects in `next.config.ts`.
- **The mobile nav was a modal in behavior but not in keyboard contract.**
  No focus trap, no Escape-to-close, no focus return to the trigger button —
  a keyboard user could tab straight through it into the page behind.
  Fixed with a `useFocusTrap` hook implementing the ARIA APG dialog pattern.
- **The reservation form's outcome was silent for screen-reader users.**
  Submitting successfully replaced the form with a confirmation panel with
  no `aria-live` announcement; a failed validation left focus wherever it
  already was instead of moving to the first invalid field. Both fixed.
- **No security headers, no `viewport`/`theme-color`, no web manifest, a
  stale code comment referencing a hook that was never built.** Individually
  minor; collectively the difference between "works" and "considered."

## What's still not done, and why

These are deliberately not fixed here, with the reason stated rather than
silently deferred:

- **There is no real photography.** `ImageFrame` accepts a `src`/`alt` prop
  that switches it to `next/image` with zero layout change, and `Hero`
  accepts `videoSrc`/`posterSrc` — the architecture is done. The photography
  itself requires an actual shoot; inventing stock imagery would be worse
  than the current honest placeholder.
- **The reservation endpoint now sends real email** (restaurant
  notification + guest confirmation via Resend, plus honeypot spam
  protection and per-IP rate limiting — see `src/app/api/reservations/route.ts`),
  but it needs a production `RESEND_API_KEY` and a verified sending domain
  before it does anything beyond logging to the console. See
  `docs/LAUNCH_CHECKLIST.md`.
- **No Lighthouse/PageSpeed run has been independently verified.** This
  repo was built and tested in a sandboxed environment without a public URL
  or a real Chrome DevTools performance trace against production
  infrastructure (CDN, real network conditions). `docs/PERFORMANCE.md` lists
  every structural decision that supports a 100 score and exactly what to
  verify once the site is deployed somewhere reachable.
- **No privacy policy exists**, despite the reservation form collecting
  name, phone, email, and visit preferences. See `docs/LAUNCH_CHECKLIST.md` — this is
  called out as a launch blocker, not something to paper over with
  boilerplate legal text authored without counsel.
- **`site.geo` coordinates are approximate**, not surveyed. Fine for the
  `Restaurant` JSON-LD's general presence; not accurate enough to be the
  literal map pin without checking against the real building.

## Verdict

The site is materially better than "production ready" in the sense of
"builds and deploys without errors" — it's been through two rounds of
adversarial review that each found and fixed real, user-facing defects. It
is not yet finished in the sense that matters most for a hospitality brand:
nobody has photographed the room, and a submitted reservation only reaches
a human once a production Resend API key and verified sending domain are
actually in place (the code path is done — see
`docs/LAUNCH_CHECKLIST.md`). Code quality and design-system discipline are
no longer the limiting factor; real-world assets and operational wiring
are.
