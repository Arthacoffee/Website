import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS applies its own squircle mask on home-screen icons, so this ships as
 * a plain filled square — the same monogram as icon.svg, scaled up. Kept
 * as a separate file (rather than sharing JSX with icon.svg) because one
 * target is a static vector asset and the other a build-time raster; the
 * path geometry is copied intentionally, not duplicated logic.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#3a2c25",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path
            d="M32 14 L18 50"
            stroke="#F8F5F1"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M32 14 L46 50"
            stroke="#F8F5F1"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M23.5 39 L40.5 39"
            stroke="#B88A44"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
