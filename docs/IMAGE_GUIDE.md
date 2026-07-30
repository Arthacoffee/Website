# Image Guide

Every photography placeholder on the site today, exactly where it lives in
code, and what it should become once Artha has real photography. Nothing
here is stock — every placeholder is a brand-toned CSS gradient
(`components/ui/image-frame.tsx`), deliberately so nothing on the site
today misrepresents the room, the food, or the people.

## How to read this document

Each entry lists: **where** (file + line context), **what it shows today**
(gradient category), **what it should show** (the actual subject), and a
**priority**. Replace by dropping a `src`/`alt` (and `priority` for
above-the-fold images) onto the relevant `<ImageFrame>` or `<Hero>` call —
see `docs/ARCHITECTURE.md` for why that's a zero-layout-change swap.

**Priority key:**
🔴 High — above the fold or on the homepage; shapes first impression.
🟡 Medium — interior pages, still load-bearing for the page's argument.
🟢 Low — supporting/decorative; fine to leave placeholder longest.

---

## Homepage (`/`, `src/app/page.tsx`)

Two placements that existed in an earlier draft — a "Why We Exist" split
and an "Experience" section image — no longer exist in the code. Both
sections are now text-only (a full-bleed `PullQuote` and a dark
statement-plus-daypart-grid section respectively), a deliberate choice
from the content-hierarchy pass to let those two moments read as
atmosphere rather than another image-plus-copy block — see
`docs/CONTENT_REFINEMENT.md`. What's actually left with an `ImageFrame`:

| #   | Where                                            | Shows today                | Should show                                                                                                                                                                                                                                                             | Priority |
| --- | ------------------------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | `Hero` component background                      | Brand gradient (no image)  | The room itself — ideally a short, muted, autoplay video of the rooftop or brew bar at golden hour, via `Hero`'s existing `videoSrc`/`posterSrc` props. If video isn't feasible at launch, a single still of the rooftop terrace at dusk, guests present but not posed. | 🔴       |
| 2   | "The Kitchen" split, `imageCategory="kitchen"` (now comes right after the Hero) | Forest-toned gradient      | The induction line or a plated dish from one of the kitchen's five cuisine programmes — ideally one dish, well-lit, not a spread (the copy is about range, the photo doesn't need to prove it by cramming five plates in frame).                                                  | 🔴       |
| 3   | "At The Brew Bar" split, `imageCategory="coffee"`, `id="coffee-stories"` | Coffee-toned gradient      | The Victoria Arduino Eagle One itself, or the Head Barista mid-pour on it. This is the single most name-checked piece of equipment in the site's copy (Journal, About, Coffee page) — it deserves to actually be seen, even though the surrounding copy now mentions it only briefly (see `docs/CONTENT_REFINEMENT.md`).                                                  | 🔴       |
| 4   | Visit teaser, `imageCategory="terrace"`          | Bronze-toned gradient      | The rooftop terrace, daytime or early evening, seating visible. This is the image most likely to make someone decide to come specifically for the rooftop.                                                                                                              | 🔴       |
| 5–7 | Journal teaser cards (`JournalCard` × 3)         | Category-matched gradients | See **Journal**, below — same three images reused.                                                                                                                                                                                                                      | 🟡       |

## About (`/about`, `src/app/about/page.tsx`)

The old "The Idea" split (an `ImageFrame` next to a market-positioning
paragraph) was removed when "Our Story" was rewritten into a full prose
narrative — that section is now text-only by design, the same reasoning
as the homepage's "Why We Exist" pull-quote above. What's left with an
`ImageFrame`:

| #   | Where                                                        | Shows today            | Should show                                                                                                                                                                                                  | Priority |
| --- | ------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 8   | Team card — Smt. Sri Lakshmi Tatavarthi, `category="people"` | Coffee/forest gradient | A real portrait. Natural light, no forced smile, ideally in the space rather than a studio headshot — see Photography Direction below for what "no fake smiling people" means in practice.                   | 🟡       |
| 9   | Team card — Sri Teja Behara, `category="people"`             | Coffee/forest gradient | Same brief as #8. Consider photographing him at the brew bar specifically, since the copy ties him directly to it.                                                                                          | 🟡       |
| 10  | "At The Brew Bar" split, `imageCategory="coffee"`            | Coffee-toned gradient  | Could reuse #3, or a detail shot — hands on the portafilter, the grinder's dosing readout. A close, textural image works well here since the surrounding copy is already about the _equipment specifically_. | 🟡       |

## Coffee (`/coffee`) & Kitchen (`/kitchen`)

| #   | Where                                         | Shows today           | Should show                                                                                                                                                                                                                                                                         | Priority |
| --- | --------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 11  | Coffee page split, `imageCategory="coffee"`   | Coffee-toned gradient | Reuse #3 or #10 — these three coffee-category placements (homepage, About, Coffee page) don't all need distinct photos; one strong brew-bar image used consistently reinforces the machine as the coffee program's signature, rather than diluting it across three different shots. | 🟡       |
| 12  | Kitchen page split, `imageCategory="kitchen"` | Forest-toned gradient | Reuse #2, or a second dish from a different one of the five cuisine programmes (if #2 is Italian, this could be Andhra, for range).                                                                                                                                                         | 🟡       |

## Journal (`/journal` index + `/journal/[slug]`)

The same three category mappings appear in three places each — the
homepage teaser, the Journal index grid, and the individual post's cover
image — six total placements, but only **three photos needed**, reused:

| Post                                           | Category   | Should show                                                                                                                                                                                                   | Priority |
| ---------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| "One Address, Four Parts Of The Day"           | `interior` | A single frame that reads as "a full day" — a dining hall shot in warm afternoon light, or a still-life of a filter coffee next to a plate, implying the day's range in one image. This is now the site's only `interior`-category placement, since the homepage and About pages both moved to text-only sections — so it's worth getting right rather than treating as a leftover. | 🟡       |
| "Why We Built Our Brew Bar Around One Machine" | `coffee`   | The Eagle One again (#3/#10/#11) — consistency here is a feature: the same machine photographed the same way each time it's referenced reinforces it as a specific, real object, not a stock "espresso machine."  | 🟡       |
| "A Fully Vegetarian Kitchen, Done Seriously"   | `kitchen`  | A wider kitchen shot — the induction line active, a cook mid-plate — distinct from the homepage Kitchen split's single-dish focus, since this essay is about _range and process_, not one dish.               | 🟡       |

## Visit (`/visit`)

No `ImageFrame` currently — the page relies on the Google Maps embed and
the reservation form instead of a photo. Worth considering a single
exterior/street-level shot (the building entrance, street signage) once
available, so someone arriving by Maps has a visual to match against the
real street — 🟢 low priority, but genuinely useful for wayfinding, which
is the whole point of this page.

## Not photography — leave these generated

- `app/icon.svg` / `app/apple-icon.tsx` — the brand monogram. Vector/generated by design; there's no "real photo" version of a favicon.
- `app/opengraph-image.tsx` — generated social-share card. Revisit _after_ real photography exists (see `docs/SEO.md`) — a real photo will likely outperform the generated card once available, but the generated one is correct in the meantime.

---

## Photography direction (brief for whoever shoots this)

The placeholders were deliberately built as abstract brand-toned gradients
rather than stock photography specifically so nothing on the live site
misrepresents Artha before the real thing exists. When real photography
replaces them, it should read as **one publication**, not a stock library —
concretely:

- **Natural light only.** No on-camera flash, no obviously staged studio
  lighting. Shoot during service, in the light the room actually has at
  that hour — morning brew-bar shots in morning light, rooftop shots at
  golden hour.
- **Real textures, not styled ones.** The induction line's actual steel,
  the actual stone/wood finishes of the space, the actual ceramic the
  coffee is served in — not props brought in to "look the part."
- **Warm neutrals.** Consistent with the site's palette
  (`docs/DESIGN_SYSTEM.md`) — coffee, bronze, stone tones should dominate;
  avoid cool-toned or high-saturation shots that would visually clash with
  the rest of the page around them.
- **Editorial composition.** Negative space, asymmetry, a single clear
  subject per frame — closer to a magazine spread (Kinfolk, Apartamento)
  than a menu-app product shot. Most placements on this site are large,
  wide-aspect single images (`aspect-[4/3.2]`, `aspect-[16/9]`,
  `aspect-[16/11]`) — compose for that crop, not a square Instagram grid.
- **No posed smiling.** If people are in frame (team portraits, a guest at
  a table), the moment should be real or read as real — mid-conversation,
  mid-pour, looking at what they're doing rather than at the camera.
- **No AI-generated imagery**, for the same reason the placeholders are
  abstract gradients rather than stock photos: a hospitality brand's
  entire premise is that the room is real. A visitor who shows up expecting
  what they saw on the site and finds something different is the single
  worst outcome a photography choice can produce here.

## Technical notes for whoever does the swap

- Pass `src` + meaningful `alt` text to `<ImageFrame>` — `alt` should
  describe the image for someone who can't see it, not restate the
  section's heading (e.g. `alt="Filter coffee being poured at the brew
bar"`, not `alt="Coffee Stories"`).
- Set `priority` on whichever image is the single largest above-the-fold
  element per page (the homepage Hero, if a still image is used instead of
  video) — everything else should lazy-load by default, which `ImageFrame`
  already does via `next/image`.
- Tune `sizes` per placement rather than leaving the current `100vw`
  default everywhere once real images exist — see
  `docs/PERFORMANCE.md`'s pre-launch checklist.
- Reused images (the coffee-category and Journal-category placements
  especially) should be the literal same file, not re-shot near-duplicates
  — consistency is doing real work here, not laziness.
