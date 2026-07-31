# public/images

Folder structure for local, optimized photography — matches the
categories `ImageFrame` already understands
(`src/components/ui/image-frame.tsx`). Currently empty: real photography
hasn't been shot yet (see `docs/IMAGE_GUIDE.md` for exactly what belongs
where and why). This structure exists so that when it has, there's an
obvious place for each file rather than a flat dump.

| Folder | What goes here |
|---|---|
| `hero/` | The homepage hero background/video and its poster frame. Highest priority — the very first thing a visitor sees. |
| `coffee/` | The Victoria Arduino Eagle One, the brew bar, pours — used across Home, About, and the Coffee page. |
| `kitchen/` | The induction line, plated dishes from the five cuisine programmes. |
| `journal/` | Cover images for the three Journal essays, if distinct from the coffee/kitchen/interior shots they'd otherwise reuse. |
| `interior/` | The dining hall and rooftop terrace — the room itself, not food or people. |
| `textures/` | Small supporting texture/detail crops (wood grain, ceramic, steel) for decorative use — not a primary subject on its own. |

Two ways a file in here actually gets used, once it exists:

1. **Local, unoptimized-at-rest**: reference it directly —
   `<ImageFrame src="/images/kitchen/induction-line.jpg" .../>`. Next.js's
   built-in Image Optimization API (already configured in
   `next.config.ts` for AVIF/WebP) handles resizing and format
   negotiation per request; nothing else to set up.
2. **Cloudinary-hosted**: use `cloudinaryUrl()` from `src/lib/cloudinary.ts`
   instead of a local path — useful once there's enough photography that
   a CDN-backed asset pipeline (automatic transformations, no rebuild to
   swap an image) is worth the extra account to manage. Requires
   `CLOUDINARY_CLOUD_NAME` set — see `.env.example` and
   `docs/API_INTEGRATIONS.md`.

Neither is wired up by default. `ImageFrame` renders its brand-toned
gradient placeholder until a `src` prop is actually passed — see
`docs/IMAGE_GUIDE.md` for the full placement-by-placement list of what
still needs a `src`.
