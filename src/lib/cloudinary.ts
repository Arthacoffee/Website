/**
 * Cloudinary delivery URL builder — architecture for when real photography
 * exists, not a working image pipeline today (there are no images to
 * point it at yet; see docs/IMAGE_GUIDE.md for why).
 *
 * Deliberately just a URL builder, not the `cloudinary` npm SDK: Cloudinary's
 * delivery URLs are plain, well-documented strings
 * (res.cloudinary.com/<cloud>/image/upload/<transforms>/<public_id>) —
 * pulling in a full SDK (with its own upload/admin API surface this
 * codebase doesn't use) for what's fundamentally string concatenation
 * would be exactly the unnecessary dependency this pass was told to avoid.
 * `CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET` are for the *upload* side
 * (a future admin tool or upload script) and aren't read here — this file
 * only builds read-only delivery URLs, which need just the cloud name.
 *
 * Usage once photography exists:
 *   <ImageFrame category="kitchen" src={cloudinaryUrl("kitchen/induction-line")} .../>
 * and add the cloud's hostname to next.config.ts's images.remotePatterns
 * (already wired to do so automatically once CLOUDINARY_CLOUD_NAME is set).
 */

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export type CloudinaryTransform = {
  width?: number;
  height?: number;
  /** Cloudinary crop mode — "fill" (default) covers the target box, cropping as needed. */
  crop?: "fill" | "fit" | "scale";
  /** "auto" (default) lets Cloudinary pick AVIF/WebP/etc. per requesting browser. */
  format?: "auto" | "avif" | "webp";
  /** "auto" (default) picks a quality level Cloudinary judges visually lossless. */
  quality?: "auto" | number;
};

/**
 * Builds a Cloudinary delivery URL for a given public ID. Returns `null`
 * when `CLOUDINARY_CLOUD_NAME` isn't set, so a call site can fall back to
 * `ImageFrame`'s brand-gradient placeholder rather than render a broken
 * image URL.
 */
export function cloudinaryUrl(
  publicId: string,
  transform: CloudinaryTransform = {},
): string | null {
  if (!CLOUD_NAME) return null;

  const { width, height, crop = "fill", format = "auto", quality = "auto" } = transform;

  const params = [
    `f_${format}`,
    `q_${quality}`,
    `c_${crop}`,
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params}/${publicId}`;
}
