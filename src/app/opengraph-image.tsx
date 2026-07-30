import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#241a14",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(184,138,68,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(86,98,79,0.3), transparent 45%)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            color: "#b88a44",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Sainikpuri &middot; Secunderabad
        </div>
        <div
          style={{
            fontSize: 108,
            color: "#f8f5f1",
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          {site.name.toUpperCase()}
        </div>
        <div style={{ fontSize: 30, color: "#f8f5f1cc", marginTop: 28 }}>{site.tagline}</div>
      </div>
    ),
    { ...size },
  );
}
