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
- [ ] **Reservation notifications.** `/api/reservations` validates a
      submission and logs it server-side — it does not currently notify
      anyone. A guest who submits a reservation today gets a "Request
      Received" confirmation that is not actually true yet. Wire this to
      a real channel (transactional email via Resend/SES, a webhook to
      whatever the front-of-house actually watches, or a lightweight CRM)
      before this form is live for real guests. The validation contract
      (`src/lib/reservation.ts`) is already the single source of truth for
      both the client and server — whatever's built should consume that
      schema, not duplicate it.
- [ ] **Real photography**, or at minimum a plan for it. The site is fully
      functional and intentionally honest with brand-toned gradient
      placeholders instead of stock photography, but a hospitality brand's
      entire value proposition is sensory — the room, the roast, the
      plate. `ImageFrame` and `Hero` are built to accept real assets with
      zero layout change (see `docs/ARCHITECTURE.md`); the photography
      itself has to come from an actual shoot.

## Domain & hosting

- [ ] Point `arthacoffee.com` (currently hardcoded in `content/site.ts`'s
      `url` field — update this first if the real domain differs) at the
      hosting provider.
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
      re-edited during this rebuild.

## Operational

- [ ] Decide on analytics (none is installed currently — that's a
      deliberate absence, not an oversight, since adding tracking is a
      decision with privacy implications that should be made explicitly,
      not defaulted into). If added, it needs to be disclosed in whatever
      privacy notice gets written (see Blockers above).
- [ ] Decide on error monitoring (Sentry or equivalent) for the
      `/api/reservations` route specifically — it's the only route that
      can fail in a way a guest actually notices in real time.
- [ ] Confirm who receives/monitors reservation notifications once that
      integration exists, and what the fallback is if it goes down (the
      footer's phone number is the honest fallback — guests can always
      call).

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
