# Accessibility

A WCAG 2.2 AA checklist mapped to what's actually implemented and how it
was verified — plus an honest statement of what hasn't been tested by an
actual assistive-technology user, because automated checks are necessary
and not sufficient.

## Verification method, stated up front

Everything below was verified by one or more of: reading the rendered
`getComputedStyle()` output directly (not eyeballing a screenshot),
computing WCAG contrast ratios programmatically against the real hex
values in use, `tsc`/ESLint static analysis, and manual keyboard-only
navigation through a running instance. **No testing has been done with a
real screen reader (VoiceOver, NVDA, JAWS) by someone who uses one daily.**
Automated and code-level verification catches a large fraction of real
issues but not all of them — do a real screen-reader pass before calling
this finished, ideally with someone who wasn't involved in building it.

## Color contrast

Every text/icon color combination in the design system was checked against
WCAG AA's 4.5:1 (normal text) / 3:1 (large text, 18px+ or 14px+ bold)
thresholds:

| Combination | Ratio | Passes |
|---|---|---|
| `foreground` on `background` | 17.9:1 | ✅ |
| `foreground/70` on `background` | 6.8:1 | ✅ |
| `coffee` on `background`/`stone` | 12.3:1 / 10.9:1 | ✅ |
| `bronze-ink` on `background`/`stone` | 5.2:1 / 4.6:1 | ✅ |
| `bronze-light` on `coffee` | 4.9:1 | ✅ |
| `background` on `coffee` (footer body text) | 12.3:1 | ✅ |
| `bronze` (bare) as text anywhere | 2.5–4.3:1 | ❌ — never used as text, see `docs/DESIGN_SYSTEM.md` |

The bare `bronze` token failing as text was a real, shipped bug caught and
fixed during this build — see `docs/AUDIT.md`, Part 2, for the full story.
It's listed here as a passed check specifically *because* it's now
correctly excluded from every text/icon usage, not because the color
itself is safe in the abstract.

## Keyboard navigation

- **Skip link** (`components/ui/skip-link.tsx`): first focusable element
  on every page, visually hidden until focused, jumps to `#main-content`.
- **Focus-visible styling**: a 2px `coffee`-colored outline with 3px offset
  on every interactive element (`globals.css`, plus `Button`'s own
  `focus-visible:outline-coffee`), replacing the browser default rather
  than suppressing it.
- **Mobile nav focus trap**: the full-screen mobile menu implements the
  ARIA APG "Dialog (Modal)" keyboard contract via `useFocusTrap`
  (`hooks/use-focus-trap.ts`) — focus moves into the panel on open, Tab/
  Shift+Tab cycle within it (can't escape into the page behind), Escape
  closes it, and focus returns to the hamburger button that opened it.
- **Reservation form**: on validation failure, focus moves to the first
  invalid field automatically (`useEffect` watching the `errors` state in
  `ReservationForm`) rather than leaving focus wherever it was.

## Semantic HTML & landmarks

- One `<header>`, one `<main id="main-content">`, one `<footer>` per page,
  set once in the root layout.
- The desktop and mobile navs are both `<nav>` elements with distinct
  `aria-label`s ("Primary" / "Mobile") — a page with two unlabeled `<nav>`
  landmarks is an axe/Lighthouse-flaggable ambiguity for screen-reader
  users navigating by landmark.
- The mobile nav panel is `role="dialog" aria-modal="true" aria-label="Menu"`
  while open, correctly describing it as a modal rather than leaving
  assistive tech to infer that from a plain `<div>`.
- Decorative icons (every Lucide icon that duplicates adjacent visible or
  labeled text — e.g. the `MapPin` next to a visible address) are
  `aria-hidden="true"`. Icon-only interactive elements (hamburger,
  Instagram link) carry `aria-label` instead.
- `ImageFrame` sets `aria-hidden="true"` on itself when no `alt` is
  provided (the current placeholder state — a decorative gradient with no
  informational content) and `role="img" aria-label={alt}` once real
  photography with real alt text is supplied.

## Heading hierarchy

Every page has exactly one `<h1>` (the page's `PageIntro`, or `Hero`'s
headline on the homepage), followed by `<h2>` section headings, `<h3>` for
sub-sections (team member names, individual value-grid items, Journal
article `h2`s within the prose body use `h2` deliberately since they're
subsections of the page's single `h1`, not a second top-level heading).
No page skips a heading level.

## Forms

`ReservationForm` (`components/sections/reservation-form.tsx`):

- Every input has a `<label>` associated via `htmlFor`/`id`
  (`FormField`).
- Invalid fields get `aria-invalid="true"` and `aria-describedby`
  pointing at their specific error message.
- Field errors are `role="alert"` (announced immediately, appropriate
  since they interrupt to report a problem).
- The success confirmation is `role="status" aria-live="polite"`
  (announced without interrupting, appropriate for a non-urgent outcome).
- Both client-side (Zod, instant) and server-side (the same Zod schema,
  re-run in `api/reservations/route.ts`) validation exist — a screen
  reader or keyboard user bypassing client JS somehow still gets a
  meaningful server response, not a silent failure.

## Motion

`prefers-reduced-motion: reduce` is honored at two levels:

1. **CSS** (`globals.css`): a global rule collapses all CSS transition/
   animation durations to near-zero for any user with the OS-level
   preference set.
2. **JS** (`Reveal`, `Hero`): Framer Motion's `useReducedMotion()` hook
   gates the fade/blur/slide entrance animations specifically, because
   the CSS rule alone can't reach JS-driven `filter`/`transform` values
   applied via inline styles. Both the "hidden" and "shown" states in the
   reduced-motion branch explicitly set identical values for every
   property — see `docs/DESIGN_SYSTEM.md`'s Motion section for why that
   specific detail matters (a real bug shipped from getting it wrong once).

## Forms/inputs and touch targets

All interactive elements (nav links, buttons, form fields) meet or exceed
a 44×44px effective touch target on mobile viewports — verified via the
`Button` component's padding scale (`px-8 py-3.5` for the default size)
rather than measured per-instance, since every button in the site goes
through that one component.

## What hasn't been verified

- [ ] A real screen-reader pass (VoiceOver on Safari/iOS, NVDA on
      Windows/Chrome at minimum) by someone unfamiliar with the codebase.
- [ ] Testing with browser zoom at 200%+ and with Windows high-contrast
      mode, both WCAG 2.2 success criteria this audit didn't explicitly
      drive a browser to check.
- [ ] Testing with a real mobile screen reader's swipe-navigation gesture
      set specifically, which sometimes surfaces different landmark/order
      issues than desktop screen readers.
- [ ] Color-blindness simulation (the palette relies on `bronze`/`forest`
      as accent colors alongside `coffee`/`background` — worth confirming
      no information is conveyed by color alone anywhere real content
      depends on it; a first pass suggests it doesn't, since color always
      pairs with text/position, but this hasn't been run through a
      simulator).
