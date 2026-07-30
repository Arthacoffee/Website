# Design Decisions: What Wasn't Built, and Why

Restraint is a decision, not an absence of one. This document exists so
that "why didn't you just add X" has a real answer on record, rather than
forcing whoever reads the codebase next to guess whether something was
missed or deliberately left out.

## A staff dashboard to confirm reservations and trigger the second WhatsApp

**Considered:** building a real backend for reservations — a database
table instead of an email, a staff-facing page to view pending requests,
a "confirm" action that both updates the record and fires the second
("your table is confirmed") WhatsApp message the brief describes.

**Not built.** This is a materially different piece of software from a
contact form: it needs authentication, a data store, a UI for staff who
aren't the person maintaining this codebase, and a real answer to "what
happens when two staff members try to confirm the same slot." Building a
thin version of that hastily — no auth, a public URL, a spreadsheet
pretending to be a database — would be worse than the honest state that
exists today: a restaurant-notification email a staff member reads and
replies to by phone or WhatsApp, manually. The system does exactly what
it claims to do (acknowledge receipt, notify staff) and nothing it
doesn't (auto-confirm a booking no human has checked). See
`docs/RESERVATION_SYSTEM.md` for the full flow and
`docs/LAUNCH_CHECKLIST.md` for what this means operationally at launch.

## Deriving "five cuisines" and similar copy from the content arrays

**Considered:** when the content-QA pass found the Kitchen page's "five"
claim didn't match its six-row menu table (see `docs/CONTENT_QA.md`), the
structurally bulletproof fix would be computing the count from
`kitchenLanes.length` at render time instead of writing "five" by hand.

**Not built, deliberately.** Marketing prose that reads
`{kitchenLanes.length} cuisines` in the source doesn't read as writing —
it reads as a report. "Five cuisines. One vegetarian pantry, brunch to
bistro." is a sentence someone wrote on purpose; a derived count would
optimize away the part that makes it sound human, in service of a
correctness guarantee that a single content-QA pass already provides
manually. The trade-off is explicit and documented (a code comment on
`kitchenLanes` itself) rather than silent: these numbers can drift again
if a lane is added without a matching prose update, and that's an
accepted cost of copy that still sounds like copy.

## Real photography

**Considered, wanted, not possible in this environment.** Every image
placement on the site uses an abstract, brand-toned gradient system
(`ImageFrame`, documented fully in `docs/IMAGE_GUIDE.md`) instead of
photography. This pass's brief asked for "editorial-quality royalty-free
photography" as an interim measure. Image CDNs (Unsplash and similar)
are network-blocked in this sandboxed environment — confirmed by direct
`curl` test, not assumed — so no photography, stock or otherwise, could
actually be fetched and committed. Fabricating placeholder images that
claim to be "editorial photography" while actually being generated
gradients would be dishonest in a way the current, openly-abstract
placeholder system isn't. This remains the single highest-leverage gap
between the current site and a genuinely finished hospitality flagship —
stated plainly in `docs/VISUAL_REVIEW.md` and repeated here rather than
softened.

## Live Lighthouse / PageSpeed verification

**Considered, not possible in this environment.** The brief asks for
95+/100/100/100 Lighthouse targets. Every structural decision that
supports those numbers is in place and documented in
`docs/PERFORMANCE.md` (static rendering, minimal client JS, font/CLS
mitigations) — but this sandbox has no public URL to run a real
Lighthouse trace against, and reporting invented scores would be worse
than reporting none. This is listed as an explicit open item in
`docs/LAUNCH_CHECKLIST.md`, not silently assumed passing.

## Automatic reservation confirmation

**Considered and rejected outright**, not just deprioritized. The brief
was explicit that reservations must never auto-confirm, and the
architecture respects that at every layer: the success screen says
"we've received your request," never "you're confirmed"; the WhatsApp
message uses acknowledgement language only; there is no code path
anywhere that marks a reservation as booked without a human involved.
This one wasn't a resource trade-off — it would have been actively wrong
to build it.

## A custom cursor or additional decorative motion

**Considered in an earlier pass, still holds.** A custom cursor (dot,
ring, magnetic hover-follow) reads as *technique* on most sites that use
one — it draws attention to the build rather than the content, which
cuts against the "calm, quiet, editorial" register this brand is going
for (see `docs/VISUAL_REVIEW.md`'s self-critique for the original
reasoning). Re-affirmed rather than revisited this pass: nothing in the
current brief's emphasis on "warm, quiet, editorial, confident, human"
microcopy argues for more decorative motion, if anything it argues
against it.

## Renumbering the Kitchen page to "six" instead of keeping "five plus brunch"

**Considered as the alternative fix** to the five-vs-six inconsistency
in `docs/CONTENT_QA.md`. Renaming every "five cuisines" mention to "six
menus" and folding Brunch into the count was the more literal fix, but it
would have flattened a genuine distinction: Andhra, Italian, Indo-Chinese,
Tandoor, and Bistro are five separate *cuisine* identities — the thing
the Kitchen page is actually proud of — while Brunch is a *daypart*, not
a cuisine, serving a mixed menu (punugulu next to avocado toast) that
doesn't have its own cuisine identity the way the other five do.
"Five cuisines, and brunch besides" is a more honest sentence than "six
menus," even though both are numerically defensible. Chose honesty about
what's actually being counted over a simpler, flatter number.

## A dedicated "Community" or social-proof section

**Considered, not added.** The brief's content principles talk about
"what kind of community we hope to build," which the About page's new
"Our Story" narrative answers directly in prose (see its closing
paragraph). A separate testimonials/community section — guest quotes,
an Instagram feed embed, a "regulars" showcase — was considered and set
aside: the site has no real guest testimonials to draw from yet (it
hasn't opened), and fabricating quotes or a social feed would be exactly
the kind of dishonest content this whole pass was working to remove.
Worth revisiting once the café has been open long enough to have real
guest voices to feature.
