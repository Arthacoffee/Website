# Reservation System

How a table request actually moves through the site, end to end: what's
real, what's best-effort, and what still needs a human.

## The honest summary

A guest fills out the form and gets an immediate, real acknowledgement.
**Nobody's table is confirmed by this system.** A human at Artha still has
to check availability and get back to the guest — by phone, WhatsApp, or
email — before a booking is real. The website's job is to capture the
request cleanly, notify the restaurant immediately, and set the guest's
expectations honestly. It does not, and should not, pretend otherwise.

## Request flow

```
Guest fills out the form
        │
        ▼
Client-side validation (Zod, instant, no round trip)
        │
        ▼
POST /api/reservations
        │
        ▼
Rate limit check (per-IP, in-memory) ──── 429 if exceeded
        │
        ▼
Server-side validation (same Zod schema — belt and suspenders)
        │
        ▼
Honeypot check ──── if tripped: fake success, nothing sent, nothing stored
        │
        ▼
Persist the reservation (before any notification is attempted)
        │
        ▼
Restaurant notification email (Resend) ──── hard failure if this errors
        │
        ▼
Guest confirmation email (Resend, best-effort)
        │
        ▼
Guest WhatsApp acknowledgement (Cloud API, best-effort, independent of email)
        │
        ▼
Success response → guest sees the confirmation screen
```

The restaurant notification email is the only step that can fail the
whole request (`502`, with a message telling the guest to call instead).
Everything after it — the guest's own confirmation email, the WhatsApp
message — is best-effort: logged on failure, never surfaced as an error
to the guest, because the restaurant already has the request by that
point. Email and WhatsApp are also independent of *each other* — a
missing `WHATSAPP_ACCESS_TOKEN` never skips the email step, and a Resend
failure never skips the WhatsApp attempt.

Persistence happens *before* either notification is attempted and never
blocks the request even if it fails — see "Persistence" below for why
that ordering matters and what its real durability guarantee actually is.

## Validation

`src/lib/reservation.ts` defines one Zod schema
(`reservationSchema`) shared by the client form
(`src/components/sections/reservation-form.tsx`) and the server route
(`src/app/api/reservations/route.ts`). The client uses it for instant
feedback with no network round trip; the server re-runs the exact same
schema, because client-side validation is a UX convenience, never a
security boundary — a request can always arrive without having gone
through the browser at all.

Fields: name, phone, email, date, time, party size (1-75), area
preference (dining hall / rooftop / no preference), optional notes
(500 char max). Party size caps at 75 with a message directing larger
groups to call — a hard cap in a text field is a worse experience than a
phone call for a booking that size anyway.

## Spam protection

A hidden input (`artha_hp` in the DOM, tracked as `company` in the
schema and component state) sits in the form, invisible to sighted users
(positioned off-screen, not `display:none`, which some bots skip when
deciding what to fill) and unreachable by keyboard (`tabIndex={-1}`) or
screen reader (`aria-hidden="true"`). A bot that fills every field it
can find fills this one too; a human never sees it exist.

**This field caused a real production bug and was hardened twice as a
result.** Originally named/labelled "Company" — a name browser
address-autofill heuristics specifically target, even on off-screen
fields — a real guest's browser silently populated it, and the shared
Zod schema's `.max(0)` constraint rejected the whole submission with a
generic "check the highlighted fields" error that highlighted nothing a
human could see (the honeypot's own error is deliberately never
rendered, to avoid tipping off actual bots). Fixed two ways: the client
(`reservation-form.tsx`) now force-clears this value before validating
or submitting, since no sighted, keyboard, or screen-reader user can
ever legitimately populate a field with `tabIndex={-1}` and
`aria-hidden="true"` — any non-empty value there is autofill noise, not
signal. And the field was renamed away from "company"/"Company" to
reduce how often a browser tries to autofill it at all.

A second, related fix: the schema no longer constrains `company` to
`.max(0)`. That constraint made a *filled* honeypot fail generic Zod
validation before the dedicated `isSpamSubmission()` check ever ran, so
a real bot posting directly to the API got an honest `422` instead of
the intended convincing fake-success — defeating the point of a
honeypot. `isSpamSubmission()` in `src/lib/reservation.ts` is now the
sole place this field is ever acted on, for both the client's
force-cleared value and a bot's raw direct POST.

A submission with anything in that field gets a convincing success
response — no error, no hint it was caught — but no email or WhatsApp
message is ever sent, nothing is persisted, and the request is dropped
server-side before it reaches storage, Resend, or the Cloud API.

## Rate limiting

`src/lib/rate-limit.ts` is a basic in-memory, per-IP sliding window: 5
requests per 60 seconds. It's deliberately simple — this stops a single
script from hammering the endpoint in a loop, which is the actual threat
model for a low-traffic reservation form, not a distributed attack. It
resets on cold start and doesn't share state across serverless instances,
which is a real limitation if the site ever runs on more than one
instance behind a load balancer (see `docs/LAUNCH_CHECKLIST.md`) —
documented rather than hidden.

## Persistence

`src/lib/reservation-store.ts` writes every genuine reservation to disk
*before* email or WhatsApp is attempted — "never lose a reservation"
means the request has to be durable independent of whether either
notification channel is having a bad day, not just that the restaurant's
inbox happens to be reliable.

**What it actually is, honestly:** an append-only local JSON-lines file
(`.data/reservations.jsonl`, gitignored). That's genuinely durable for
local development and for a single-instance deployment — a Node server
running `next start` on one machine. It is **not** durable on
stateless/serverless hosting: Vercel functions in particular can land
each invocation on a different instance with its own ephemeral
filesystem, so a write can be invisible to the next request or gone
entirely on the next cold start.

This wasn't shipped as a fake gesture toward the requirement — it's a
real, working default that's honestly scoped to what it can guarantee,
with the swap-out point deliberately narrow: `saveReservation()`'s
signature is the only thing that matters to the rest of the codebase.
Before deploying to serverless infrastructure, replace its body with a
call to a real managed store — Vercel Postgres, Supabase, even an append
to a Google Sheet via its API — and nothing else in
`src/app/api/reservations/route.ts` needs to change. See
`docs/LAUNCH_CHECKLIST.md` for this as a launch blocker if the target is
serverless.

A storage failure is logged loudly but never blocks the request — the
restaurant notification email is still the primary, real-time way staff
learn about a reservation; the store is a durability backstop for
reconciliation, not a replacement for that notification. Spam caught by
the honeypot is never persisted — there's nothing genuine to preserve.

## Email (Resend)

`src/lib/email-templates.ts` builds two branded HTML emails (inline
styles only, table-based layout, Georgia/serif fallback fonts — the usual
constraints for HTML that has to render consistently across email
clients that don't run modern CSS):

- **Restaurant notification** → `site.email` (`sri@arthacoffee.com`),
  with `replyTo` set to the guest's own email so a reply goes straight to
  them. Subject line includes the guest's name and date for fast triage
  in an inbox.
- **Guest confirmation** → the email address they submitted. Restates
  what they asked for and how to reach the restaurant if anything needs
  to change before it's confirmed.

Both are skipped (logged to console instead) when `RESEND_API_KEY` isn't
set, so local development never needs a real key and never accidentally
emails anyone.

## WhatsApp (Business Cloud API)

`src/lib/whatsapp.ts` sends one message: a receipt, not a confirmation.
This matters enough to repeat — the message says the request was
received and will be reviewed, not that a table is booked.

**Why a template, not free text:** WhatsApp's Cloud API only allows
free-form text messages within a 24-hour window *the guest opened* by
messaging the business first. A guest who filled out a web form has never
messaged Artha's WhatsApp number — this is a business-initiated message,
which Meta requires to use a pre-approved **Message Template**. Submit
one for approval in Meta Business Manager before this can send anything;
approval typically takes 24-48 hours. Suggested template body (category:
Utility, language: English):

> Hi {{1}}, thank you for choosing Artha. We've received your reservation
> request for {{2}} at {{3}} for {{4}} guests. Our team will review
> availability and confirm your booking shortly.

The four parameters map to: guest's first name, formatted date, formatted
time, party size — exactly what `sendReservationAcknowledgement()` sends
in `src/lib/whatsapp.ts`. If the approved template's parameter count or
order ever changes, that function's `components[0].parameters` array
must change with it, or the API will reject the send.

Guest phone numbers are normalized to E.164-without-the-plus (what the
Cloud API expects) by `toWhatsAppNumber()` — a 10-digit number is assumed
Indian and gets `91` prepended, since that's the overwhelming majority of
what this form collects. Not a general phone normalizer; deliberately not
one.

Skipped (logged, not fatal) when `WHATSAPP_ACCESS_TOKEN` or
`WHATSAPP_PHONE_NUMBER_ID` aren't set.

## What happens after the acknowledgement — the part that isn't automated

The brief this system was built against describes a second step: staff
reviews the reservation, confirms it, and a *second* WhatsApp message goes
out confirming the actual booking. **That second half doesn't exist as
software.** There's no staff dashboard, no "confirm" button, no
automated second message. Today, a staff member sees the restaurant
notification email and replies to the guest directly — by phone, by
WhatsApp, however they normally would. That's a deliberate scope
boundary, not an oversight: building a real staff-facing confirmation
tool (with its own auth, its own UI, its own place to actually store
reservations as data rather than just emailing them) is a materially
larger project than a contact form, and doing it hastily would produce
something worse than the honest manual process that exists today. See
`docs/DESIGN_DECISIONS.md`.

## Reservation success screen

On success, the form shows:

> **Thank you for choosing Artha.**
> We've received your reservation request. Our team will review
> availability and confirm your booking shortly. You'll receive updates
> via email and WhatsApp.

— followed by a summary of what was actually submitted (date, time, party
size, area preference), read from the values the guest just typed, not
re-fetched from anywhere. The whole block is `role="status"
aria-live="polite"` so a screen reader announces the outcome without
needing focus moved to it.

## Environment variables

See `.env.example` for the full list with comments. Summary:

| Variable | Required for | Missing behavior |
|---|---|---|
| `RESEND_API_KEY` | Sending real email | Logs to console, skips sending |
| `RESEND_FROM` | Sending real email | Defaults to `reservations@arthacoffee.com` |
| `RESERVATION_EMAIL` | Where the notification goes | Defaults to `content/site.ts`'s `email` field |
| `WHATSAPP_ACCESS_TOKEN` | Sending WhatsApp | Logs to console, skips sending |
| `WHATSAPP_PHONE_NUMBER_ID` | Sending WhatsApp | Logs to console, skips sending |
| `WHATSAPP_TEMPLATE_NAME` | Sending WhatsApp | Defaults to `reservation_acknowledgement` |

See `docs/API_INTEGRATIONS.md` for full setup instructions for both
Resend and WhatsApp, including the exact Message Template body to submit
for approval.

## What was verified in this environment, and what wasn't

Verified directly: client and server validation (both paths, including
every error state), the honeypot fix's three concrete scenarios — a
simulated autofilled hidden field now submits successfully, a
direct-POST bot with the honeypot filled gets a fake success with
nothing persisted and no email/WhatsApp sent, and a normal submission is
unaffected — the rate limiter's 429 path, the full success screen
rendering with a real submitted payload (screenshotted), reservation
persistence actually writing to and surviving a fresh server restart
(submitted a real payload, killed the server, confirmed the record was
still on disk), and the graceful no-op fallback for Resend, WhatsApp,
and the reservation store when unconfigured (confirmed via server logs
for each).

Not verified, because it requires production credentials this sandbox
doesn't have: an actual Resend send (real API key, real domain
verification), an actual WhatsApp Cloud API send (real access token,
real approved template), or how the guest-facing acknowledgement text
reads once a template is live and its `{{n}}` parameters are populated
by Meta's own rendering rather than assumed from the API docs.
