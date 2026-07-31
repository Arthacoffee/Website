# Content QA

A record of the content-consistency audit run across every page in this
pass: what was checked, what was found, and what was fixed. The goal
stated in the brief this responds to was specific — "Homepage currently
mentions 8 programmes. Kitchen page mentions 5. This should never
happen." — so this audit specifically hunted for that class of bug:
numbers, counts, and claims that drift between pages.

## What was checked

- Every numeric claim (menu programme counts, hours, seating references,
  party size limits, price ranges) grepped across `src/content/*.ts` and
  every `src/app/**/page.tsx`.
- Every mention of the business's contact details (phone, email, address)
  compared against `content/site.ts`, the single source for NAP data.
- Every mention of hours/service windows compared across the homepage,
  Kitchen page, Coffee page, Visit page, and `content/site.ts`'s
  `serviceWindows`.
- FSSAI/egg-labelling language, compared across all four places it
  appears (`content/values.ts`, `content/journal.ts`, `content/menu.ts`,
  homepage).
- Floor/layout references, re-checked against the prior content-hierarchy
  pass's decisions (`docs/CONTENT_REFINEMENT.md`) to confirm nothing had
  regressed back in.
- The site's tagline ("Made With Intention") checked against every place
  it's used, to confirm it's presented as a tagline and never mislabeled
  as the brand's story (a distinction this pass was specifically asked to
  get right — see `docs/DESIGN_DECISIONS.md` for why the tagline and the
  "Our Story" narrative stayed deliberately separate).

## Findings

### Found and fixed: "five" vs. six visible menu lanes on the Kitchen page

`src/content/menu.ts`'s `kitchenLanes` array has six entries: Brunch,
Andhra Traditional, Italian Pasta, Indo-Chinese, Tandoor, and Bistro. The
Kitchen page (`src/app/kitchen/page.tsx`) renders all six as rows in a
`MenuLanes` table — but the same page's metadata description, its
`PageIntro` lead, and a `SplitFeature` heading all said "five" and named
only the five cuisine categories, never mentioning Brunch. A visitor
reading "five full food programmes" and then counting six rows in the
table directly below it would notice the mismatch immediately — this is
the exact bug shape the brief called out.

The five-cuisine framing itself isn't wrong (Andhra, Italian,
Indo-Chinese, Tandoor, and Bistro are a real, meaningful five-item set —
distinct cuisine identities, unlike Brunch which is a daypart, not a
cuisine). The fix reconciles both truths rather than picking one:

- Metadata description: "...runs five vegetarian food programmes —
  Andhra traditional, Italian pasta, Indo-Chinese, tandoor and bistro —
  **plus an all-day brunch menu**, served 10am to 11pm." (also fixed the
  overall time range, which said "12pm to 11pm" and silently excluded
  Brunch's 10am start — a second, smaller instance of the same class of
  bug, in the same sentence)
- `PageIntro` lead: "...five food programmes **and an all-day brunch**,
  from one fully vegetarian kitchen."
- `SplitFeature` heading: "Five cuisines. One vegetarian pantry, **brunch
  to bistro**."

Also added a code comment on `kitchenLanes` in `content/menu.ts` itself,
explaining the five-plus-Brunch split explicitly, so the next person who
adds or removes a lane knows there's hand-written prose elsewhere that
needs to move with it — see "What this audit can't guarantee" below for
why that comment exists instead of a fully automated fix.

### Found and fixed: homepage listed four cuisines, claimed five

`src/app/page.tsx`'s Kitchen section said "Andhra classics, Italian
pasta, Indo-Chinese, and evening tandoor — five menus..." — four cuisines
named, "five" claimed. Bistro was missing from the list. Fixed by adding
it: "...Indo-Chinese, tandoor and bistro — five menus...".

### Checked, no issue found

- Hours and service windows: consistent across `content/site.ts`,
  `content/menu.ts`, `content/values.ts` (`dayParts`), and every page
  that quotes them.
- Party size cap (75): appears in exactly one place with logic behind it
  — the reservation form's `max={75}` HTML attribute and the matching
  Zod schema validation. No other page states a seating-capacity number
  that could drift from it (the old "75 seats total" copy was already
  removed from Visit page prose in the prior content-hierarchy pass).
- Contact details: phone, email, and address are read from
  `content/site.ts` everywhere they appear — footer, Visit page, JSON-LD,
  reservation emails — with zero hardcoded duplicates found.
- FSSAI/egg-labelling wording: near-identical phrasing in all four
  locations, no factual drift.
- Tagline vs. story: "Made With Intention" is used only as a tagline
  (hero eyebrow, footer signature line, page-title suffix, OG image) —
  never presented as the brand's story. The About page's "Our Story"
  section is a separate, full narrative (see
  `docs/DESIGN_DECISIONS.md` for the rewrite).

## Re-verified in a later pass

Two rounds of copy tightening happened after the findings above (a
~20% copy-cut pass, then this final production pass) — re-ran the same
checks afterward rather than assuming nothing drifted:

- **Programme/cuisine counts**: still consistent everywhere — "five"
  appears with the same five cuisines named (Andhra, Italian,
  Indo-Chinese, Tandoor, Bistro) on the homepage, Kitchen page, and in
  the Journal essay, all correctly separate from Brunch. No new drift.
- **Floor references**: the earlier finding above said floor language
  was deliberately *kept* in the Journal essays, `content/team.ts`'s
  operational-background bio, and `content/values.ts`'s waste-sorting
  item, as opt-in deep-dive content. That's no longer accurate — the
  ~20% copy-tightening pass cut those specific phrases too ("three
  connected floors instead of one counter," "across three floors,"
  "floor relay system," "across every floor") while tightening sentences
  for length, arriving at zero floor references anywhere in the codebase
  — a stronger, simpler outcome than originally planned, confirmed by a
  fresh `grep -rn "floor"` across `src/` returning no matches.
- **Tagline usage**: "Made With Intention" now appears in a second,
  deliberate place beyond the original list (hero eyebrow, footer
  signature line, page-title suffix, OG image) — the About page's
  closing philosophy statement, added this pass so the tagline lands
  as the thesis of "Our Story" rather than its opening frame (see
  `docs/FINAL_LAUNCH_REPORT.md`). Not a duplication concern: it's the
  only other page that shows it, and About's Hero-equivalent (PageIntro)
  never shows the tagline nearby the way the homepage's Hero does, so
  there's no repeat-within-one-scroll the way there would be if it were
  added to, say, the homepage's own "Why We Exist" moment.

## What this audit can't guarantee

This is a manual, point-in-time audit, not an automated invariant. The
site's content architecture already centralizes the data that's easy to
centralize — hours, contact details, prices all live in one typed module
each and every page reads from that module directly, so those categories
of drift are structurally prevented, not just currently correct.

What it doesn't structurally prevent: hand-written marketing prose (page
headings, intro paragraphs) that *describes* a number derived from a
content array, like "five cuisines" describing `kitchenLanes.length -
1`. Deriving every such sentence from live data would make the prose
read like a report generator instead of a hospitality brand's copy — "five
cuisines" earns its place as a piece of writing precisely because it
isn't `{kitchenLanes.length} cuisines`. The trade-off accepted here is
explicit: those numbers are hand-maintained, which means they can drift
again if a future edit adds or removes a menu lane without a matching
content-QA pass. The comment left on `kitchenLanes` is the mitigation —
not a guarantee, a pointer for whoever edits that file next.
