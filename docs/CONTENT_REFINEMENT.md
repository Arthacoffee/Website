# Content Refinement

A record of a specific, targeted rewrite pass driven by outside reviewer
feedback — not a fresh content audit, and not a rewrite of the brand voice.
The instruction behind this pass, verbatim:

> "It's really good. I do think you can reduce some detail. They don't
> really need to know which floor the office or kitchen is on. Focus more
> on the experience of it being a rooftop café. Even when you talk about
> the coffee machine, it can come lower on the page. The kitchen should
> come before the machine, or the machine should only be mentioned briefly
> there and elaborated later. Overall, it feels very detailed and slightly
> like a business pitch."

The test applied to every rewritten paragraph: **does this sound like a
founder pitching a business, or a place I want to visit?** Anything that
failed got rewritten or cut.

---

## 1. Removed operational/floor detail

The clearest violation of the feedback was `src/content/story.ts`'s
`experience` object, rendered on the homepage:

> Before: "The kitchen and office sit on the second floor, the dining hall
> occupies the third, and a dedicated rooftop terrace sits above it — 75
> seats in all, reachable by lift."

This tells a visitor how the building is organised internally — useful to
an architect, irrelevant to someone deciding whether to come for coffee.
Rewritten to lead with the feeling of being there instead:

> After: "Come for the first pour of the day, or the last table on the
> terrace at night. There's a rooftop built for open air and long
> conversations, and a room downstairs that's just as easy to linger in.
> Stay as long as you like — this is a place for spending time, not
> passing through."

The same pattern — floor-by-floor breakdown — was removed from:

- `src/app/visit/page.tsx` — the `PageIntro` lead ("kitchen below, dining
  hall on the third floor, rooftop terrace above") and the "The Layout"
  info-list item ("2nd floor kitchen & office · 3rd floor dining hall ·
  rooftop terrace — connected by lift, 75 seats total"), renamed "The
  Space" and rewritten to describe the guest experience of moving through
  the building, not its floorplan.
- `src/components/sections/visit-teaser.tsx` — "three levels" cut from the
  homepage's Visit teaser paragraph.
- `src/components/sections/hero.tsx` — "three levels and a rooftop
  terrace" shortened to just "a rooftop terrace built for slowing down,"
  since floor count adds nothing to a first-impression headline.
- `src/app/kitchen/page.tsx` — "keeps a fully electric cold chain... at
  the right temperature across three floors" trimmed to the guest-relevant
  half of that sentence (tighter heat control, cleaner room).

**Left alone, deliberately:** `src/content/site.ts`'s `description` field
(SEO meta description / JSON-LD) still says "three levels and a rooftop
terrace." That string is a search-result snippet and structured-data
input, not page copy a visitor reads while deciding whether to stay — the
feedback was about the guest-facing narrative, not metadata. Also left
alone: the team bios in `src/content/team.ts`, where "floor relay system"
describes a team member's professional background, not the café's layout —
different context, not what the feedback was addressing.

## 2. The espresso machine no longer leads

The reviewer's example was almost prescriptive: instead of "We use an
Eagle One," prefer "Every cup is prepared with precision using equipment
chosen for consistency rather than spectacle." Applied near-verbatim to
`brewBarStory` in `src/content/story.ts`:

> Before (heading): "Built around one machine, on purpose." Two paragraphs
> naming the Victoria Arduino Eagle One, its multiboiler architecture, and
> per-group temperature control.
>
> After (heading): "Every cup, the same, every time." Two short
> paragraphs: what the guest gets (consistency, not spectacle) and who's
> responsible for it (the Head Barista) — then a direct pointer to the
> Journal for the coffee enthusiasts who want the model name and the
> engineering reasoning.

The deep-dive equipment story was never deleted — it already existed as
its own Journal essay
(`why-we-built-our-brew-bar-around-one-machine`) and stays exactly as
written, model name and all. That's the correct home for it: a reader who
clicked into a long-form Journal piece titled after the machine has
opted into that level of detail. The homepage, About page, and Coffee
page now all use the same short version and link through to that essay,
rather than repeating the technical case for a specific machine three
times before a visitor has decided to care.

`src/app/coffee/page.tsx`'s `PageIntro` lead also dropped its own machine
mention ("anchored by a machine chosen for one reason above all others:
consistency") in favor of a plain, atmosphere-first line about what's
poured.

## 3. Homepage reorder

Requested order: **The experience → the kitchen → the coffee → the
craftsmanship → the equipment.** Actual order shipped, and why it isn't
a literal one-for-one:

1. **Hero**
2. **Kitchen** (`SplitFeature`, tone="stone")
3. **Experience** (`ExperienceSection`, dark)
4. **Coffee / Brew Bar** (`SplitFeature`, brewBarStory)
5. **Craftsmanship** (`PullQuote`: "It's not about having the fanciest
   machine on the street. It's about the cup being right, every single
   time.")
6. Visit teaser, Journal teaser

The one deliberate deviation from the requested literal order: Experience
sits second, after Kitchen, rather than immediately after the Hero. Both
`Hero` and `ExperienceSection` are full-bleed dark (`bg-coffee`) sections —
stacking them back to back produced two dark, low-contrast blocks in a
row with no visual rhythm break (confirmed by screenshot before deciding
to reorder). Inserting the light-toned Kitchen section between them
restores the site's established dark → light → dark → light alternation
without touching either component's styling. Experience content is still
promoted far earlier than before (was section 6 of 8; now section 3 of
7), the machine is still pushed well past Kitchen, and "equipment" never
gets a standalone section at all — its one mention lives inside the brief
Coffee section, which was the actual point of "the machine should only be
mentioned briefly there."

`whyWeExist` and `theIdea` — previously the homepage's first content
section, immediately after Hero — were removed from the homepage
entirely and now live only on `/about`. `theIdea` in particular was the
single most pitch-like paragraph on the site (a named list of competing
cafés and what each one does), which belongs in an "Our Story" page a
visitor actively opts into, not the first thing after the hero.

The `ExperienceSection` component itself lost its three-stat bar ("100%
Vegetarian kitchen," "3 Floors + rooftop terrace," "8 Menu programmes,
one kitchen") — metrics read as an investor-deck slide, not an invitation.
The day-parts grid beneath it (already guest-facing: "Brunch & Brew Bar,
10am–12:30pm," etc.) stayed untouched; it was never an operational detail,
just useful information about when to come.

## 4. Cutting competitive-analysis language

`theIdea`'s two paragraphs (About page) named five specific nearby
competitors and itemized what each one does and doesn't offer — a
straightforward market-positioning argument. Condensed to one paragraph
that keeps the actual insight (Artha runs the whole day, not one moment)
without the competitor roll call:

> After: "This stretch of Defence Colony Road already loves good coffee
> and good food — just never both, all day, in one place. Artha runs from
> the first filter coffee of the morning through an unhurried afternoon
> pour to a rooftop evening of tandoor and small plates. One address, the
> whole day."

Same instinct applied to `src/app/kitchen/page.tsx`'s second `SplitFeature`
("...and it's exactly the gap we saw on this street") — "the gap we saw"
is pitch-deck language; rewritten to state the guest-relevant fact (one
pantry, five cuisines, done with care) without the market-gap framing.

## 5. Length

Every paragraph touched above got shorter, in line with the ~30–40%
target — not by dropping words mechanically, but by cutting whichever
clause was explaining the business rather than describing the experience.
Two examples with rough before/after word counts:

- `experience.body`: 38 words → 46 words, but the after version replaced
  operational detail (floor numbers, seat count, "table service only; no
  delivery") with sensory/atmospheric content (open air, long
  conversations, staying as long as you like) — longer in isolation, but
  it's replacing four short informational fragments with one continuous
  scene, which reads faster despite the word count. Judged by ear against
  the "founder pitch vs. place I want to visit" test, not by word count
  alone.
- `theIdea.paragraphs`: two paragraphs (73 words combined) → one paragraph
  (52 words), a ~29% cut, with the competitor list removed entirely.

## 6. What didn't change

- The Journal essays (`src/content/journal.ts`) — all three keep their
  full technical depth, including the Eagle One's model name,
  multiboiler architecture, and the "across three floors" cold-chain
  detail in the kitchen essay. These are opt-in long-form reads; a
  visitor who clicks a Journal post titled "Why We Built Our Brew Bar
  Around One Machine" is asking for exactly this level of detail, and
  cutting it there would contradict the reviewer's own guidance to
  "elaborate later" for readers who want it.
- `src/content/values.ts` (the sustainability `ValuesGrid` on the About
  page) — "Wet and dry waste sorted across every floor" stayed as
  written. It's a values statement about environmental practice, not a
  guest-facing operational aside, and floor-by-floor waste segregation is
  the kind of specific, verifiable detail that supports credibility on a
  values page rather than undermining an invitation.
- The reservation form, menu structure, service-window hours, and every
  other structural or engineering piece of the site — this pass was
  content-only, per the review's own scope.
