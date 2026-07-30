# Design System

Every constant here lives in code (`src/styles/tokens.css`,
`src/components/ui/*`) — this document explains the _reasoning_, not just
the values, so a future change is made with the same judgment rather than
by copying a nearby number.

## First principle

Every decision should be defensible against one sentence: **"Made With
Intention."** Concretely, that means: if an element exists because
websites usually have it, or because it looked interesting in isolation,
it doesn't belong. Restraint is the default; a new pattern needs a reason.

## Color

```
background   #F8F5F1   Warm off-white — the site's only background short
                        of the two dark surfaces below
foreground   #111111   Near-black body text
coffee       #3A2C25   The dark surface (hero, footer, CTA bands) and the
                        default heading/ink color on light surfaces
bronze       #B88A44   The brand accent — reserved for decorative,
                        non-text use (borders, gradients, dividers)
forest       #56624F   Used once, deliberately: the reservation success
                        icon. Not a general-purpose accent.
stone        #ECE7E2   A slightly deeper neutral than background, for
                        alternating section backgrounds
```

**There is no dark mode.** This is a decision, not an oversight: the brand
is one calm, considered room, not two. `color-scheme: light` is declared
explicitly so browsers don't fight it (auto-restyling form controls or
scrollbars for a user's dark OS preference against a site that never
offers one).

### Why bronze has two extra variants

`bronze` (#B88A44) measures 2.5–2.9:1 against `background`/`stone` and
4.31:1 against `coffee` — it **fails WCAG AA's 4.5:1 text threshold in
both directions**. No single mid-tone color can pass 4.5:1 against both a
near-white and a near-black surface; that's not a limitation of this
palette specifically, it's arithmetic. Two text-safe siblings exist for
exactly this reason:

```
bronze-ink    #816130   5.2:1 on background, 4.6:1 on stone — bronze-
                        colored text/icons on light surfaces
bronze-light  #BF9657   4.9:1 on coffee — bronze-colored text/icons on
                        the dark surfaces
```

**Rule:** if bronze is text or an icon (anything a human needs to _read_,
not just glance at as decoration), it's `bronze-ink` on light or
`bronze-light` on dark — never bare `bronze`. If it's a border, a
gradient stop, or a focus-adjacent decorative element, bare `bronze` is
correct. When in doubt, run the two colors through a contrast calculator
before shipping — don't eyeball it, this exact mistake shipped once
already (see `docs/AUDIT.md`, Part 2).

## Typography

Cormorant Garamond (display serif, `font-display`) for anything that
should feel considered and editorial: headlines, pull quotes, large
numerals. Inter (`font-sans`) for everything functional: body copy, nav,
buttons, form labels, captions.

Fluid type scale — every size is a `clamp()` that reaches the following
ceiling on a wide desktop viewport and scales down smoothly, never
requiring a separate mobile override:

| Token             | Desktop ceiling | Use                                       |
| ----------------- | --------------- | ----------------------------------------- |
| `text-hero`       | 160px           | The homepage hero headline only           |
| `text-display-h1` | 96px            | Page-intro `<h1>` on interior pages       |
| `text-display-h2` | 72px            | Section headings                          |
| `text-display-h3` | 36px            | Sub-section headings, large stat numerals |
| `text-body-lg`    | 20px            | Lead paragraphs                           |
| `text-body`       | 17px            | Default body copy                         |
| `text-caption`    | 14px            | Eyebrows, labels, metadata                |

**Cormorant Garamond has no glyph for ₹.** Any price display uses the sans
stack even inside an otherwise-serif context (see
`components/sections/menu-lanes.tsx`) — check this before setting
Cormorant Garamond on any string that might contain currency.

## Motion

One component, `ui/reveal.tsx`, is the entrance animation for every
section on the site. It fades in, blurs from 10px to 0, and rises 28px —
never longer than 0.8s, never a bounce, never a loop. `kind="scale"` (a
soft zoom-in instead of a rise) exists for photography/`ImageFrame`
placements specifically, because a large flat color block reads better
scaling in than sliding in.

`Reveal` is fully inert under `prefers-reduced-motion`: both the "hidden"
and "shown" variants explicitly set the _same_ value for every property
they touch (opacity, y, scale, filter) rather than only overriding
opacity. This isn't cosmetic — a reduced-motion variant that omits a
property doesn't reset it, it just doesn't touch whatever value the
element already had (see `docs/AUDIT.md`, Part 2, for the bug this
produced the first time).

The header's transparent → blurred-solid transition on scroll and the
mobile nav's open/close both use the same easing curve
(`cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-editorial`) as `Reveal`, so
motion feels like one system rather than several components each doing
their own thing.

**Never:** spring physics with overshoot, staggered bounces, infinite
looping decorative animation, parallax for its own sake, anything whose
purpose is "feels lively" rather than "clarifies what just happened."

## Spacing & layout

`Container` caps content width at 1400px (`--content-max`) with
responsive horizontal padding. Sections use consistent vertical rhythm —
`py-24 md:py-32` for standard sections, tighter for the compact
`PageIntro`. There is no ad-hoc `mt-[37px]`-style magic-number spacing in
the codebase; if a gap needs adjusting, it should come from Tailwind's
spacing scale, not an arbitrary value invented for one spot.

Corners are nearly square (`--radius-editorial: 2px`), not the rounded-pill
buttons and heavily-rounded cards of the previous static site. Softer
corners read as friendly/approachable; premium hospitality brands in this
register (Aesop, Aman) read as considered/precise instead — sharp corners
are a deliberate part of that register, not an default left unstyled.

## Component inventory (`ui/`)

| Component                    | Purpose                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                     | `primary` (solid coffee), `outline` (bordered, transparent), `text` (underlined link-style). Polymorphic: renders `<Link>` if given `href`, `<button>` otherwise.                                                                                                                                                                             |
| `Container`                  | Max-width + padding wrapper. Generic over `as` — forwards any prop the rendered element accepts (`aria-label`, `id`, `ref`, ...).                                                                                                                                                                                                             |
| `Eyebrow`                    | The small tracked-out label above a heading. Defaults to `bronze-ink`; pass `className="text-bronze-light"` explicitly on dark sections.                                                                                                                                                                                                      |
| `Reveal`                     | Scroll-entrance animation, see Motion above.                                                                                                                                                                                                                                                                                                  |
| `ImageFrame`                 | Photography slot — brand-toned gradient placeholder until a real `src` is supplied, then renders through `next/image` with no layout change. Categories (`interior`/`coffee`/`kitchen`/`terrace`/`people`/`lifestyle`) each map to a distinct gradient so placeholders are visually distinguishable by section even before real photos exist. |
| `FormField` / `inputClasses` | Label + input + error wrapper, shared by every field in `ReservationForm`.                                                                                                                                                                                                                                                                    |
| `SkipLink`                   | Visually-hidden-until-focused "Skip to content" link, first element in the DOM.                                                                                                                                                                                                                                                               |

## When to add a new token vs. reuse an existing one

Reuse first. A new color, size, or easing curve is justified only when an
existing one is _wrong_ for the use case, not merely "close but I'd prefer
something slightly different." The entire point of a design system is
that "slightly different" accumulates into visual noise if not resisted.
