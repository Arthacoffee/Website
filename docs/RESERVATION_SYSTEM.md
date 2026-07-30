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
Honeypot check ──── if tripped: fake success, nothing sent, request dropped
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

A hidden `company` field (`z.string().max(0)`) sits in the form,
invisible to sighted users (positioned off-screen, not `display:none`,
which some bots skip when deciding what to fill) and unreachable by
keyboard (`tabIndex={-1}`) or screen reader (`aria-hidden="true"`). A bot
that fills every field it can find fills this one too; a human never
sees it exist. A submission with anything in that field gets a
convincing success response — no error, no hint it was caught — but no
email or WhatsApp message is ever sent, and the request is dropped
server-side before it reaches Resend or the Cloud API.

## Rate limiting

`src/lib/rate-limit.ts` is a basic in-memory, per-IP sliding window: 5
requests per 60 seconds. It's deliberately simple — this stops a single
script from hammering the endpoint in a loop, which is the actual threat
model for a low-traffic reservation form, not a distributed attack. It
resets on cold start and doesn't share state across serverless instances,
which is a real limitation if the site ever runs on more than one
instance behind a load balancer (see `docs/LAUNCH_CHECKLIST.md`) —
documented rather than hidden.

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
| `RESERVATIONS_FROM_EMAIL` | Sending real email | Defaults to `reservations@arthacoffee.com` |
| `WHATSAPP_ACCESS_TOKEN` | Sending WhatsApp | Logs to console, skips sending |
| `WHATSAPP_PHONE_NUMBER_ID` | Sending WhatsApp | Logs to console, skips sending |
| `WHATSAPP_TEMPLATE_NAME` | Sending WhatsApp | Defaults to `reservation_acknowledgement` |

## What was verified in this environment, and what wasn't

Verified directly: client and server validation (both paths, including
every error state), the honeypot (a submission with the field filled
returns success but the route's early-return path was read and confirmed
never to reach the email/WhatsApp calls), the rate limiter's 429 path,
the full success screen rendering with a real submitted payload
(screenshotted), and the graceful no-op fallback for both Resend and
WhatsApp when their env vars are unset (confirmed via server logs).

Not verified, because it requires production credentials this sandbox
doesn't have: an actual Resend send (real API key, real domain
verification), an actual WhatsApp Cloud API send (real access token,
real approved template), or how the guest-facing acknowledgement text
reads once a template is live and its `{{n}}` parameters are populated
by Meta's own rendering rather than assumed from the API docs.
