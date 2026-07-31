# Launch Checklist

Everything that needs to happen between "this code is good" and "this is
live and actually serving guests." Grouped by who needs to act — most of
this is not a coding task.

## Blockers — do not launch without these

- [ ] **Privacy notice.** The reservation form collects name, phone,
      email, and dining preferences. This site currently has **no privacy
      policy or data-handling notice anywhere** — that's a real gap for any
      business collecting personal data, not a nice-to-have. This needs
      actual legal input (India's DPDP Act, not just a copy-pasted
      boilerplate template) — it wasn't fabricated here because inventing
      confident-sounding legal text without counsel is worse than leaving
      the gap visible.
- [ ] **Reservation notifications — set the production API key.**
      `/api/reservations` now sends a real notification email to the
      restaurant and a confirmation to the guest via Resend
      (`src/lib/email-templates.ts`, `src/app/api/reservations/route.ts`).
      Without `RESEND_API_KEY` set in the production environment it falls
      back to `console.info` and no email goes out — the "Request
      Received" message a guest sees would not be true yet. Before launch:
      create a Resend account, verify the sending domain (SPF/DKIM records
      on `arthacoffee.com` — unverified domains get flagged as spam or
      rejected outright), set `RESEND_API_KEY`, `RESEND_FROM`, and
      `RESERVATION_EMAIL` in the hosting provider's environment variables
      (see `.env.example`), and send a real test reservation through the
      deployed form to confirm both emails arrive.
- [ ] **Reservation persistence isn't durable on serverless hosting.**
      `src/lib/reservation-store.ts` writes every reservation to a local
      file before any notification is attempted — genuinely durable on a
      single-instance Node deployment, but Vercel functions (and most
      serverless hosts) have ephemeral, non-shared filesystems, so a
      write there can vanish on the next cold start. If deploying to
      Vercel or similar, replace `saveReservation()`'s body with a call
      to a real managed store (Vercel Postgres, Supabase, even an append
      to a Google Sheet) before launch — see `docs/RESERVATION_SYSTEM.md`
      for exactly what needs to change (just that one function).
- [ ] **Rate limiting is single-instance.** `src/lib/rate-limit.ts` is an
      in-memory per-IP limiter — it resets on cold start and doesn't share
      state across serverless instances. Fine for a low-traffic reservation
      form; replace with Upstash Redis (or similar) if the site ever runs
      on more than one instance behind a load balancer.
- [ ] **WhatsApp acknowledgement needs a Meta Business setup, or it stays
      silent.** `src/lib/whatsapp.ts` sends a guest acknowledgement (never
      a confirmed booking) via the WhatsApp Business Cloud API. Without
      `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` set, it logs
      and skips — email remains the record either way, so this is not a
      hard blocker, but the reservation success screen promises "updates
      via email and WhatsApp," so treat it as one if that promise matters.
      Requires: a Meta Business Manager account, a verified WhatsApp
      Business phone number, and a Message Template approved for
      business-initiated conversations (see `docs/RESERVATION_SYSTEM.md`
      for the exact template text to submit for approval — Meta review
      typically takes 24-48 hours, so start this well before launch).
- [ ] **No staff interface exists to send the confirmation WhatsApp.** The
      code only sends the *acknowledgement* message ("we've received your
      request") — by design, since automatically confirming a booking
      before a human checks availability would be dishonest. There is
      currently no dashboard or tool for staff to mark a reservation
      confirmed and trigger a second WhatsApp message; that half of the
      workflow described in the brief is a manual phone/WhatsApp reply
      from staff today, not a system. Building a real staff-facing
      confirm-and-notify tool is out of scope for this pass — see
      `docs/DESIGN_DECISIONS.md`.
- [ ] **Real photography**, or at minimum a plan for it. The site is fully
      functional and intentionally honest with brand-toned gradient
      placeholders instead of stock photography, but a hospitality brand's
      entire value proposition is sensory — the room, the roast, the
      plate. `ImageFrame` and `Hero` are built to accept real assets with
      zero layout change (see `docs/ARCHITECTURE.md`); the photography
      itself has to come from an actual shoot.

## Domain & hosting

- [ ] Set `NEXT_PUBLIC_SITE_URL` if the real domain differs from
      `arthacoffee.com` — `content/site.ts`'s `url` field reads from this
      env var (falling back to `https://arthacoffee.com`), and feeds
      `metadataBase`, Open Graph, JSON-LD, and the sitemap from that one
      place.
- [ ] Deploy — this is a standard Next.js 15 App Router app; any host with
      first-class Next support (Vercel, or a Node server running
      `next start`) works with no code changes. If deploying somewhere
      other than Vercel, confirm the `images` and edge-function behavior
      Next expects is actually supported.
- [ ] Confirm HTTPS is enforced (redirect HTTP → HTTPS at the host/CDN
      level — not something this codebase handles).
- [ ] Re-verify the redirect rules in `next.config.ts` actually fire on
      the production host — some hosts handle Next's `redirects()` config
      differently than `next start` does locally.

## SEO — see `docs/SEO.md` for full detail

- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools.
- [ ] Run the live homepage + one Journal post through Google's Rich
      Results Test.
- [ ] Verify Open Graph preview rendering in WhatsApp, Instagram bio link,
      and iMessage specifically (each caches/renders differently).
- [ ] Claim/verify Google Business Profile; confirm NAP matches
      `content/site.ts` exactly.
- [ ] Replace the approximate `site.geo` coordinates with the real
      surveyed lat/long.

## Performance — see `docs/PERFORMANCE.md` for full detail

- [ ] Run Lighthouse (mobile + desktop) against the real production URL.
- [ ] If/when a hero video background is added, re-run Lighthouse
      specifically for LCP/CLS regression.

## Accessibility — see `docs/ACCESSIBILITY.md` for full detail

- [ ] A real screen-reader pass (VoiceOver + NVDA at minimum) by someone
      not involved in building the site.
- [ ] Browser zoom to 200% and Windows high-contrast mode spot-check.

## Content review

- [ ] Confirm every price in `content/menu.ts` matches what the kitchen
      actually charges today — the note on the Coffee/Kitchen pages
      already says pricing is "indicative and may vary seasonally," but
      stale numbers at launch undermine that disclaimer's credibility.
- [ ] Confirm `content/site.ts`'s hours, phone, and email are current.
- [ ] Fill in `site.social.instagram` once the account exists (currently
      an empty string, which correctly omits the field from JSON-LD and
      leaves the footer icon pointed at a placeholder).
- [ ] Proofread the three Journal essays one more time with fresh eyes —
      they're carried over from the original site and haven't been
      re-edited during this rebuild (they were deliberately left as the
      deep-dive, full-detail version of the brew bar/kitchen/concept
      stories during the content hierarchy pass — see
      `docs/CONTENT_REFINEMENT.md`).

## Operational

- [ ] **Analytics are wired up but opt-in — decide whether to turn them
      on.** GA4, Microsoft Clarity, and Google Search Console
      verification (`src/components/layout/analytics.tsx`) all load
      nothing until their env var is set (`NEXT_PUBLIC_GA_MEASUREMENT_ID`,
      `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` —
      see `docs/API_INTEGRATIONS.md`); Vercel Web Analytics and Speed
      Insights need no ID and activate automatically on Vercel. Whether
      to actually set the GA4/Clarity IDs is still a decision with
      privacy implications, same reasoning as before — just no longer a
      coding gap. If turned on, disclose it in whatever privacy notice
      gets written (see Blockers above).
- [ ] Decide on error monitoring (Sentry or equivalent) for the
      `/api/reservations` route specifically — it's the only route that
      can fail in a way a guest actually notices in real time.
- [ ] Confirm `sri@arthacoffee.com` (the address reservation notifications
      send to — `content/site.ts`'s `email` field) is actually monitored
      day-to-day, and what the fallback is if Resend delivery fails (the
      footer's phone number is the honest fallback — guests can always
      call). The endpoint fails the guest's request with a clear error if
      the restaurant notification email itself fails to send, so a silent
      failure shouldn't reach a guest — but a monitored inbox is still the
      real safety net.

## Final pre-launch QA pass

- [ ] Every nav link, every CTA button, every footer link — click through
      all of them on the deployed site, not just localhost.
- [ ] Submit the reservation form successfully and via every validation
      error path, on the deployed site.
- [ ] Test on a real iPhone Safari and a real Android Chrome — emulators
      and Playwright viewports catch most things but not everything
      (notably: iOS Safari's viewport/scroll quirks, and how the mobile
      nav's focus trap behaves with iOS VoiceOver specifically).
- [ ] Confirm the favicon and Apple touch icon actually render correctly
      in a real browser tab and on an actual iOS "Add to Home Screen" —
      verified locally during this build, worth re-confirming post-deploy
      since icon caching behaves unpredictably across CDNs and browsers.
