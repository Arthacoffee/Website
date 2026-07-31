# API Integrations

Every third-party integration in this codebase, what it does, exactly
what setup it needs, and — critically — what happens when that setup
hasn't been done yet. Every integration here follows the same rule:
**missing configuration degrades to a safe no-op, never a crash and
never a silent lie to a guest.** Cross-reference `.env.example` for the
exact variable names.

---

## Resend (reservation email)

**What it does:** sends the restaurant a notification email for every
reservation request, and sends the guest a confirmation email in return.
Full detail on the flow in `docs/RESERVATION_SYSTEM.md`.

**Code:** `src/app/api/reservations/route.ts`, `src/lib/email-templates.ts`.
Uses the official `resend` npm package directly — no wrapper.

**Setup:**
1. Create a Resend account, add and verify a sending domain (SPF/DKIM
   records) — unverified domains get flagged as spam or rejected
   outright.
2. Generate an API key, set `RESEND_API_KEY`.
3. Set `RESEND_FROM` to a verified address on that domain.
4. Set `RESERVATION_EMAIL` to whichever inbox should receive
   notifications (defaults to `content/site.ts`'s `email` field if
   unset).

**Unconfigured behavior:** `RESEND_API_KEY` unset → every reservation is
logged to the console instead of emailed, and the API still returns
success (so local development never needs a real key, and never
accidentally emails anyone).

---

## WhatsApp Business Cloud API

**What it does:** sends the guest a receipt-only acknowledgement message
after a reservation is submitted. Never sends a booking confirmation —
that's a manual step by staff. Full reasoning in
`docs/RESERVATION_SYSTEM.md`.

**Code:** `src/lib/whatsapp.ts`. Uses Meta's Cloud API directly via
`fetch` — no third-party WhatsApp library, no browser automation.

**Setup:**
1. A Meta Business Manager account with a verified WhatsApp Business
   phone number.
2. **A Message Template approved for business-initiated conversations.**
   This is the part that's easy to miss: a guest who fills out a web
   form has never messaged the business's WhatsApp number, so this is a
   business-initiated conversation — the Cloud API requires a
   pre-approved Message Template for that, free-form text will be
   rejected. Submit this template for approval in Meta Business Manager
   (category: Utility, language: English):

   > Hi {{1}}, thank you for choosing Artha. We've received your
   > reservation request for {{2}} at {{3}} for {{4}} guests. Our team
   > will review availability and confirm your booking shortly.

   The four parameters, in order: guest's first name, formatted date,
   formatted time, party size — this exact order is what
   `sendReservationAcknowledgement()` sends. If the approved template's
   parameters ever change, that function's `components[0].parameters`
   array has to change with it.
3. Set `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID`. Set
   `WHATSAPP_TEMPLATE_NAME` if it differs from
   `reservation_acknowledgement`.
4. `WHATSAPP_BUSINESS_ACCOUNT_ID` is part of the account setup (needed
   to manage/submit templates via API) but isn't read by any code
   path today — the send-only integration here just needs the phone
   number ID. Recorded in `.env.example` for whoever does that setup.
5. Approval for a new Message Template typically takes 24–48 hours —
   start this well before launch, not the day of.

**Unconfigured behavior:** logs and skips, independently of whether
email is configured (a WhatsApp outage never blocks the restaurant
notification email, and vice versa — see `docs/RESERVATION_SYSTEM.md`).

---

## Google Calendar

**What it does:** nothing yet. `src/lib/google-calendar.ts` is prepared
architecture — a working service-account JWT auth flow and an event-create
function, implemented with Node's built-in `crypto` (no `googleapis`
dependency) — but nothing in the codebase calls it. This is deliberate,
per the brief this was built against: reservations are still confirmed
manually by staff, and auto-creating calendar events before that manual
step exists would be jumping ahead of the actual workflow.

**Setup, whenever it's wired up:**
1. A Google Cloud project with the Calendar API enabled.
2. A service account; from its JSON key, set
   `GOOGLE_CALENDAR_CLIENT_EMAIL` and `GOOGLE_CALENDAR_PRIVATE_KEY`.
3. Share the target calendar with that service account's email address
   (Calendar settings → Share with specific people → Make changes to
   events), and set its ID as `GOOGLE_CALENDAR_ID`.
4. Call `createReservationCalendarEvent()` from wherever the staff
   confirmation step ends up living.

---

## Analytics

**Code:** `src/components/layout/analytics.tsx`, rendered once in
`src/app/layout.tsx`. Every piece here is independently opt-in — nothing
loads without its ID set, so the component is always safe to render.

| Integration | Env var | Behavior when unset |
|---|---|---|
| Google Analytics 4 | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | gtag.js never loads |
| Google Search Console verification | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Next's Metadata API omits the `<meta name="google-site-verification">` tag entirely — verified via `curl` during this pass, not assumed |
| Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` | clarity.ms script never loads |
| Vercel Web Analytics | none — gated on `process.env.VERCEL === "1"` | inert off Vercel |
| Vercel Speed Insights | none — same gate | inert off Vercel |

**Why the Vercel packages are gated on `VERCEL` rather than always-on:**
`@vercel/analytics` and `@vercel/speed-insights` are documented as safe
to include even when not deployed on Vercel — they no-op rather than
crash. In practice, "no-op" still means injecting a `<script
src="/_vercel/insights/script.js">` tag that 404s on any other host,
which is real console noise on every page load in local development (or
any non-Vercel deployment). Verified this directly: without the gate,
every page load logged two 404s and two "refused to execute script,
wrong MIME type" errors; with it, zero console errors. Gating on
Vercel's own build-time environment variable eliminates that with no
loss of functionality on an actual Vercel deployment, and needs no ID to
configure.

**Google Search Console** itself (the property verification step) isn't
something code can do — after deploying, add the property in Search
Console, choose the HTML-tag verification method, and set
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the value it gives you.

---

## Cloudinary (image pipeline)

**What it does:** nothing yet, same posture as Google Calendar —
`src/lib/cloudinary.ts` is a working delivery-URL builder, not an active
pipeline, because there's no real photography to point it at (see
`docs/IMAGE_GUIDE.md`). Deliberately just a URL builder rather than the
`cloudinary` npm SDK — the delivery URLs are plain, documented strings,
and pulling in a full SDK (with an upload/admin API surface this
codebase doesn't use) for what's fundamentally string concatenation
would be an unnecessary dependency.

**Setup, whenever real photography exists:**
1. A Cloudinary account (the free tier is generous enough for a single
   restaurant's photography).
2. Set `CLOUDINARY_CLOUD_NAME` — this alone is enough for
   `cloudinaryUrl()` to build working delivery URLs, and it also flips
   on `next.config.ts`'s `images.remotePatterns` for
   `res.cloudinary.com` automatically (next/image refuses to optimize a
   remote host that isn't explicitly allow-listed).
3. `CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET` are for the upload side
   (a future upload script or admin tool) — not read by
   `src/lib/cloudinary.ts`, which only builds read-only delivery URLs.
4. Upload images under the same category naming `ImageFrame` already
   uses (`kitchen/`, `coffee/`, `interior/`, etc. — see
   `public/images/README.md`), then pass `cloudinaryUrl("kitchen/induction-line")`
   as `ImageFrame`'s `src` prop.

The alternative — locally-hosted images under `public/images/`,
optimized automatically by Next's built-in Image Optimization API
(already configured for AVIF/WebP in `next.config.ts`) — needs no
account and no setup at all. Cloudinary is worth the extra account only
once there's enough photography that CDN-backed transformations (resize
without a rebuild, automatic format negotiation at the edge) earn their
keep. Both paths go through the same `ImageFrame` component with zero
code change either way.

---

## What was actually verified in this environment, versus documented

Verified directly, this pass: the honeypot fix's three scenarios
(autofilled real user, direct-POST bot, clean submission — see
`docs/RESERVATION_SYSTEM.md`), reservation persistence writing to disk
and surviving a fresh server start, the analytics gating (zero console
errors with and without `VERCEL` set), the Search Console verification
tag correctly appearing/disappearing based on the env var, a full
`tsc`/`eslint`/`next build` pass after every change in this document.

Not verified, because they require credentials or infrastructure this
sandbox doesn't have: an actual Resend send, an actual WhatsApp Cloud
API send, an actual Google Calendar event creation, an actual GA4/Clarity
data collection, an actual Cloudinary upload/delivery. Every integration
above is written to the letter of its provider's documented API contract
and gracefully degrades when unconfigured, but "the code is correct" and
"a human confirmed it works against the real service" are different
claims — this document makes only the first one honestly.
