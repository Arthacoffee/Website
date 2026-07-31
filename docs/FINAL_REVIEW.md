# Final Review

The instruction behind this pass, in full: remove friction. No new
sections, no redesign — subtraction and refinement only. Shorten copy by
roughly 20%. Increase whitespace where it earns its keep. Replace
explanation with atmosphere, information with emotion. Polish every
transition, hover, loading, empty, success, and error state. And for
every component: *would removing this make the experience better?* If
yes, remove it. If no, refine it.

This document is the record of that pass — what changed, what was
tested, and, just as important, what was looked at and deliberately left
alone.

---

## An interrupt, fixed first: a real user was being blocked

Mid-pass, a screenshot arrived showing a guest hitting "Please check the
highlighted fields" with no field actually highlighted — a real bug in
production copy, not a polish item. That took priority over the
refinement work in progress.

**Root cause:** the reservation form's spam honeypot — a hidden input
named `company`, invisible and untabbable to real users — was still
being populated by browser autofill (Chrome and others target
`company`/`organization`-shaped fields even when off-screen). The shared
Zod schema rejected any non-empty value there, so an autofilled browser
silently failed the *entire* submission with a generic error that
pointed at nothing, because the honeypot's own error was deliberately
never rendered to avoid tipping off actual bots.

**Fixed two ways:**

1. `src/components/sections/reservation-form.tsx` now force-clears the
   honeypot value before validating or submitting. No sighted, keyboard,
   or screen-reader user can ever legitimately type into a field with
   `tabIndex={-1}` and `aria-hidden="true"` — so any non-empty value that
   shows up there is autofill noise, never signal, and treating it as
   signal was the actual bug.
2. The field itself was renamed from `company`/"Company" to
   `artha_hp`/"Leave this field blank" — a name and label autofill
   heuristics won't match, reducing how often this happens at all.

**A second, related bug found while verifying the fix:** the schema's
`company: z.string().max(0)` constraint made a *filled* honeypot fail
generic validation before the dedicated `isSpamSubmission()` check ever
ran — so a real spam bot posting directly to the API got an honest `422`
instead of the intended convincing fake-success, defeating the point of
having a honeypot in the first place. Removed the constraint;
`isSpamSubmission()` in `src/lib/reservation.ts` is now the sole place
that field is ever acted on.

**Verified, not assumed:** a simulated autofilled hidden field now
submits successfully end-to-end; a direct POST to `/api/reservations`
with the honeypot filled gets `{"ok":true}` with no email or WhatsApp
sent (confirmed via server logs); a normal submission is unaffected.
Shipped as its own commit ahead of the refinement work below, since a
production bug fix shouldn't wait on a copy pass.

---

## Copy: cut, not just trimmed

Every paragraph below was reduced by removing the clause that *explained*
rather than *evoked* — the target was roughly 20%, applied unevenly:
paragraphs that were already lean (the day-parts grid, the Coffee page's
lead) got left alone rather than cut for the sake of a number, and
paragraphs still carrying leftover market-positioning or operational
language got cut harder.

### `src/content/story.ts` — the highest-leverage file (reused across Home and About)

- `whyWeExist.body`: 30 words → 23 words (23%). Cut "somewhere worth
  spending real time, not just passing through" — the sentiment already
  lives in `experience.body` a few sections later; saying it twice on
  the same visit was the actual friction, not the word count.
- `ourStory` (all five paragraphs, About page's "Our Story"): ~237 words
  → ~196 words (17%). Consistently cut the *justification* clause from
  each paragraph — "not with a business plan, but with the belief that,"
  "We built Artha around that instinct: a place where," "you bring your"
  — replacing each with the direct, atmospheric statement underneath it.
  Paragraph 3 (hospitality) barely moved; it was already doing exactly
  what this pass asked for and cutting it further would have cost more
  than it saved.
- `experience.body`: 56 words → 40 words (29%) — the largest single cut.
  Dropped "this is a place for spending time, not passing through," a
  near-verbatim repeat of `whyWeExist`'s sentiment two sections earlier.
- `brewBarStory`: both paragraphs tightened (~10% and ~29%); the second
  turned into a direct question ("Want the full story...? It's all in
  the Journal") rather than a flat statement, which reads faster without
  losing anything.

### Page copy

- **Homepage** (`src/app/page.tsx`): Kitchen section's first paragraph
  dropped "prepared with dedicated equipment and clear labelling" — the
  full FSSAI/equipment detail stays intact one click away on the Kitchen
  page itself (`vegetarianNote` in `content/menu.ts`); the homepage
  teases, it doesn't need to fully explain. Second paragraph tightened
  ~10%.
- **Kitchen page**: `PageIntro` lead and the "Range Without Compromise"
  `SplitFeature` both tightened (~9% and ~18–20%). The second paragraph
  there now reads as three short fragments ("More care than a smaller
  menu. Worth it.") instead of one long clause — punchier, more
  confident, less like a justification.
- **Visit page** + `visit-teaser.tsx`: lead copy, "The Space" info item,
  and the reservation panel's intro all tightened 15–20%. "Rooftop
  terrace" simplified to "rooftop" in three places where "terrace" was
  doing no work "rooftop" wasn't already doing alone.
- **404 page**: lead copy cut from 16 words to 12 (25%) — "The page
  you're looking for doesn't exist, or has moved" became "This page
  doesn't exist, or has moved," which says the same thing with less
  throat-clearing.
- **`site.description`** (meta description, JSON-LD, *and* the visible
  footer paragraph — it's genuinely on-page copy, not just an invisible
  tag): 24 words → 16 words (33%). Dropped "three levels" (the last
  lingering floor-count reference on the site, consistent with the
  content-hierarchy work from an earlier pass) and "Defence Colony Road"
  (redundant — the exact street address is printed two inches away in
  the same footer column).

### Journal essays — a lighter touch, deliberately

The three long-form essays (`src/content/journal.ts`) are the site's
one piece of content explicitly meant to go deep — a reader who clicks
into "Why We Built Our Brew Bar Around One Machine" is opting into
detail, and gutting that would work against what those pages are for.
They were tightened at the sentence level (cutting filler like "which
means," "simply," redundant restatements — essay two said "the cup
tastes exactly the same... as it did on your first," which became "the
cup tastes the same... as your first") rather than cut at the paragraph
level. Total reduction across all three: roughly 10–15%, well under the
20% target everywhere else, on purpose.

Two small fixes rode along with the tightening: essay one's closing
paragraph dropped "behind three connected floors instead of one
counter," and essay three's kitchen paragraph dropped "across three
floors" — both leftover floor-specific language that a much earlier
content-hierarchy pass removed from every guest-facing page but had
missed inside these two essays. Also cut "the gap we saw on this
street" from essay three (Andhra/Italian/Indo-Chinese range) — the last
piece of competitor-framing pitch language anywhere on the site.

### `values.ts` and `team.ts`

Sustainability values tightened lightly (10–15% each); "across every
floor" in the waste-segregation item became "at every station" — same
fact, no floor reference. Team bios cut "salaried" and "proprietorship
extension" (HR/legal jargon that added nothing for a guest reading a
founder's bio) and "floor relay system" (operational detail, not
guest-relevant), landing at roughly 13–14% shorter each while keeping
every credential and fact intact.

---

## Whitespace, states, and transitions

**Whitespace:** reviewed every page after the copy cuts landed, since
shorter copy can leave a section looking accidentally cramped or
accidentally empty depending on how its container was sized. No section
needed a manual whitespace increase — the existing `py-24 md:py-32`
rhythm and `max-w-2xl`/`max-w-3xl` prose widths already give shorter
paragraphs room to breathe without looking lost. Confirmed visually
(screenshots at 1440px on Home, About, Kitchen) rather than assumed.

**Hover states:** audited every interactive element. `Button`'s three
variants, `ImageFrame`'s interactive hover-zoom (used on `JournalCard`),
and every text link's underline/opacity treatment were all already
present and consistent from earlier passes — nothing missing found.
Explicitly did *not* add a hover treatment to `MenuLanes` rows: they are
reference information, not links or buttons, and giving a non-interactive
row a hover effect would imply an interaction that doesn't exist — that
would be adding friction (a false affordance), not removing it.

**Loading state:** the reservation form's `Loader2` spinner + "Sending…"
label was already in place and unchanged — it does exactly one thing,
clearly, and passing it through the "would removing this make it
better" test, removing it would make a multi-second network request feel
broken, not calmer.

**Empty states:** none exist in this codebase, and none were fabricated
to fill this brief's checklist. Every list on the site — menu lanes,
journal posts, team members, values — is static content with a fixed,
always-populated shape; there is no user-generated or dynamically-fetched
list that could ever render zero items. Inventing an empty-state design
for a state that structurally cannot occur would be decoration, not
refinement.

**Success state:** unchanged from the previous pass — the exact
requested confirmation copy plus a summary card of what was submitted.
Already re-verified working end-to-end during the honeypot bug fix
above, so it's confirmed current, not just assumed unaffected.

**Error states:** reviewed all three (`"Please check the highlighted
fields."`, `"We couldn't reach the server. Please call us instead."`,
`"Too many requests. Please try again shortly."`) — all short, calm,
specific about what to do next, no changes needed. The honeypot fix
above is, functionally, an error-state fix: the actual defect was a
false error appearing when nothing was wrong.

**Transitions:** spot-checked durations and easing across `Button`,
`Reveal`, `Hero`, and the header's scroll-state change — all already
converge on the same `duration-300`/`duration-500` and shared
`ease-[var(--ease-editorial)]`/cubic-bezier tokens from earlier passes.
No drift found.

---

## The removal test, applied

Per the brief: *would removing this make the experience better?* Run
against every component, not just the ones that got edited.

| Component | Verdict | Why |
|---|---|---|
| Homepage's second `PullQuote` (craftsmanship) | **Keep, refined** | Its wording was tightened but the section itself earns its place — it's the one moment on the page that isn't explaining anything, purely atmosphere. |
| `ExperienceSection`'s day-parts grid | **Keep, untouched** | Already the most atmosphere-forward, least explanatory block on the site (four short scenes, no justification). A model for what the rest of the pass was cutting toward. |
| Reservation form's "Notes (optional)" field | **Keep** | Considered removing to shorten the form further. Kept: it's explicitly optional, adds no required friction, and is the one place a guest can flag something (an anniversary, a wheelchair-accessible seat) that the other seven fields can't capture. Removing an optional field to hit a "fewer fields" instinct isn't the same as removing friction. |
| `MenuLanes` row hover state | **Left absent, on purpose** | See Whitespace/states above — adding one would be a false affordance, not a refinement. |
| The Visit page's Google Maps iframe | **Keep** | Considered whether an unreliable third-party embed (blocked entirely in this sandbox, and a known "best-effort" per `docs/AUDIT.md`) belongs on a calm, self-contained page. Kept: it's the one piece of the page a guest actually needs functionally (wayfinding), not decoration, and its failure mode already degrades gracefully rather than breaking the page. |
| Team bios' credential lists (PGDM, Lean Six Sigma) | **Keep, trimmed not removed** | Considered cutting entirely as "explanation over atmosphere." Kept: a founder's professional credibility is the actual point of that section — Aesop's and Aman's own "About" pages don't hide who's behind the brand, they state it plainly and once. Trimmed the jargon around the credentials, not the credentials. |
| `whyWeExist` as a separate homepage moment (the first `PullQuote`) | **Keep** | Considered folding it into the Hero subhead to remove a whole section. Kept separate: the Hero is already doing scene-setting work (image, tagline, headline); asking it to also carry the brand's etymology would crowd the one moment that's supposed to be pure atmosphere. |

---

## What this pass did not touch, and why

- **No components were added, removed, or restructured.** Every change
  above is a copy edit inside an existing component or a one-line prop
  change (`PullQuote` gained an optional `id` prop in an earlier pass,
  reused here — nothing new this time). Consistent with "do not add new
  sections, do not redesign."
- **No layout, spacing scale, or color token changed.** The design
  system reviewed clean; there was nothing in it asking to be removed.
- **Real photography, live Lighthouse verification, and WhatsApp/email
  delivery remain unverifiable in this sandbox** for the same reasons
  documented in `docs/DESIGN_DECISIONS.md` from the previous pass —
  network-blocked image CDNs, no public URL, no production credentials.
  Nothing changed about those constraints this pass, so nothing new is
  claimed here either.

## Verification

`tsc --noEmit`, `eslint .`, and `next build` all pass clean after every
change in this document. The homepage, About, and Kitchen pages were
re-screenshotted at 1440px after the copy cuts landed, confirming no
layout regression, no text overflow, no orphaned whitespace. The
honeypot fix was verified against three concrete scenarios (autofilled
real user, direct-POST bot, and a normal clean submission) via a
headless browser and direct API calls, not inferred from reading the
code.
