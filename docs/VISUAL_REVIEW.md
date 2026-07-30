# Visual Review

> **Note:** a later content-hierarchy pass reordered the homepage
> sections referenced below (Kitchen and Experience now come before the
> Coffee/brew-bar section, per reviewer feedback on content priority —
> see `docs/CONTENT_REFINEMENT.md`) and shortened several of the
> paragraphs this review discusses. The structural and visual findings
> here — the repetition problem this pass fixed, the `PullQuote`
> component it introduced, the scores below — are still accurate as a
> record of that pass; only the specific section order has since moved.
>
> **Second update**, from a later final-production pass: the homepage
> order moved again (now Hero → Why We Exist → Kitchen → Coffee →
> Craftsmanship → Experience → Journal → Visit), "Our Story" on the About
> page was rewritten from a market-positioning paragraph into an actual
> narrative, and two real issues this review's self-critique didn't catch
> were found and fixed — a footer target-size violation and a
> non-functional focus-ring utility class (both below WCAG 2.2 AA
> requirements; see `docs/AUDIT.md`'s "Part 3" section and
> `docs/CONTENT_QA.md` for full detail). The photography gap named in
> this review's score table is unchanged and remains the site's largest
> open item.

A design critique of this pass's own work, written the way an outside
studio would write it about someone else's project — not a list of
accomplishments dressed up as a review.

## Scope of this pass

Explicitly polish-only, per instruction: no framework migration, no folder
reorganization, no rewrite. Every change below is additive or a targeted
fix to an existing component, verified against the running site (screenshots

- computed-style/DOM checks, not assumed), at desktop (1440, 1024), tablet
  (768–1024), and mobile (320, 375, 390) viewports.

---

## Every improvement made this pass

### Structural / repetition

- **Homepage's three consecutive split-image-text sections** (Why We
  Exist → Coffee Stories → Kitchen) were the single most repetitive
  stretch on the site, confirmed visually at both 1440px and 320px (a
  10,764px-tall page at 320px, all three sections reading nearly
  identically). Added `PullQuote` — a full-bleed centered editorial quote
  with no card, no image, no quotation marks — between Coffee Stories and
  Kitchen, using an existing Journal line rather than new copy.
- **A ~200px dead-space band** was stacking between every `PageIntro` and
  the section immediately following it, on Coffee, Kitchen, Journal, and
  Visit specifically (worst where the following section is a plain text
  list with no image to make the gap read as intentional). Root cause:
  `PageIntro`'s bottom padding and the next section's top padding were
  both full-size and additive. Fixed at both ends; verified before/after
  via screenshot on Coffee (the clearest case) and spot-checked on
  Journal/Visit.

### Motion & interaction

- Added a slow (700ms), subtle (1.045×) hover-zoom to `ImageFrame` when
  used inside a real link (`interactive` prop), wired into `JournalCard`
  specifically — the one photography placement that's actually clickable.
  Verified the CSS `scale` property (Tailwind v4's native transform
  mechanism here, not the `transform` property) actually changes on
  `:hover` via Playwright, not assumed from the class name being present.
- Confirmed no other animation on the site exceeds 800ms, bounces, spins,
  or loops decoratively — this was already true from the prior pass and
  re-verified rather than re-litigated.

### Missing pieces

- **The 404 page was Next's bare, unbranded default** — no header, no
  footer, no brand voice, on the one page a visitor is most likely to be
  frustrated on. Built a real one in the existing design system, with
  on-brand microcopy and three recovery paths.

### Documentation

- `docs/IMAGE_GUIDE.md` — every photography placeholder in the codebase,
  where it lives, what it should become, and an explicit photography
  direction brief (natural light, real textures, editorial composition,
  no stock, no AI, no posed smiling) for whoever shoots it.
- This document.

---

## Self-critique: what's still wrong

Reviewing this as if it were someone else's submission:

1. **The site's photography ceiling is still zero.** Every visual
   improvement this pass made — the pull-quote, the hover-zoom, the
   spacing fixes — is real, but all of it is arranging _placeholders_.
   The single highest-leverage lever for "exceptional" versus "well-built"
   is a real photograph of the actual room, and no amount of component
   polish substitutes for it. This isn't a criticism of the placeholder
   system (deliberately abstract rather than misleading stock photography
   — see `docs/IMAGE_GUIDE.md`), it's a statement of what's actually
   capping the site's ceiling right now.
2. **Only one hero treatment exists.** `Hero` architecturally supports a
   video background (`videoSrc`/`posterSrc`) but none is wired up — the
   homepage's first impression is still a static gradient. This is the
   most visible single gap between "current state" and "what the
   component already supports."
3. **The pull-quote fix treats a symptom on one page.** Homepage was the
   worst offender, so it got fixed; About, Coffee, and Kitchen all also
   lean on `SplitFeature` as their primary content pattern and would
   benefit from the same kind of rhythm-breaking device if the site grows
   (a fourth Journal essay, a second team member added, etc. — worth
   watching rather than pre-solving for content that doesn't exist yet).
4. **Reservation form length wasn't reconsidered.** Eight fields (name,
   phone, email, date, time, party size, area preference, notes) is
   defensible for what it needs to capture, but a genuinely "exceptional"
   review would ask whether every field earns its place versus a shorter
   form with details collected on confirmation. Left as-is this pass
   because shortening it is a product decision (what data the business
   actually needs at booking time), not a visual one — flagging it here
   rather than silently deciding it myself.
5. **Verification coverage is real but not exhaustive.** Every shared
   component (`PageIntro`, `SplitFeature`, `MenuLanes`, the nav, the
   footer) was checked at the full breakpoint range because a bug in a
   shared component would surface everywhere it's used — but that means
   coverage is "every component at every breakpoint," not literally "every
   page at every breakpoint" as six separate checks each. Stated plainly
   rather than implying more individual screenshots were taken than were.
6. **No custom cursor treatment.** The brief's micro-details list included
   "cursor interactions." Deliberately skipped: a custom cursor (dot, ring,
   magnetic follow) reads as _technique_ on most sites that use one, which
   cuts against "calm, quiet, nothing loud" — the hover-zoom already gives
   photography a felt response to the cursor without adding a decorative
   layer on top of the pointer itself. Recorded here as a considered
   omission, not an oversight, so it can be revisited and overridden if
   the brand direction disagrees.

## Recommendations for replacing stock photography after the café opens

Full detail in `docs/IMAGE_GUIDE.md`; the shortest version:

1. Shoot the brew bar (the Victoria Arduino Eagle One) and the rooftop
   terrace first — they're referenced most often in copy across Home,
   About, Coffee, and the Journal, and reusing the _same_ photo for the
   _same_ subject across pages is a feature (consistency reads as a real
   object, not a stock library), not corner-cutting.
2. Shoot during actual service, in the room's real light, at the hour that
   matches each placement (brew bar in morning light, rooftop at golden
   hour) — not a staged after-hours shoot with artificial lighting.
3. Team portraits should be in the space, not studio headshots — mid-task
   if possible (Sri Teja at the brew bar specifically, given the copy ties
   him to it directly).
4. Hold the video-hero idea in reserve rather than rushing it — a short,
   well-shot, muted-autoplay loop is a meaningfully bigger production lift
   than stills, and a strong still hero with real photography will already
   be a large improvement over the current gradient on its own.

## Final design score: 88 / 100

| Dimension                | Score  | Why                                                                                                                                                               |
| ------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual/editorial design  | 87/100 | Strong, disciplined system; repetition issue found and fixed this pass; ceiling capped by placeholder photography (see Self-critique #1)                          |
| Typography               | 93/100 | Fluid scale holds up across all tested breakpoints; rhythm issue (dead space) found and fixed; restrained, no decorative abuse                                    |
| Motion                   | 91/100 | Every animation purposeful, under 800ms, reduced-motion-safe, verified working (not assumed); only one hero treatment limits range                                |
| Accessibility            | 94/100 | Contrast math, keyboard traps, live regions, landmarks all verified programmatically; real screen-reader/zoom testing still outstanding (`docs/ACCESSIBILITY.md`) |
| Content & voice          | 89/100 | Brand voice preserved and not rewritten; genuinely tight already; pull-quote reuse is intentional, not filler                                                     |
| Performance (structural) | 88/100 | Fully static rendering, minimal client JS, font/CLS mitigations in place; no live Lighthouse run against production (`docs/PERFORMANCE.md`)                       |

**88/100, composite.** This is a codebase and design system that would
not embarrass itself next to Aesop or Blue Bottle's actual production
sites on component quality, typography discipline, or accessibility rigor
— and would visibly lose to them today on exactly one axis: they have
real photography of a real room, and this site, honestly, still doesn't.
Close that one gap and the score moves; nothing else currently holds it
back as much.
