import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = "ARVIT AI — AAC Tablet & Therapy Tablet";
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
          position: "relative",
          background: "#05070D",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(37,99,235,0.55) 0%, rgba(5,7,13,0) 45%), radial-gradient(circle at 85% 85%, rgba(20,184,166,0.45) 0%, rgba(5,7,13,0) 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 108,
            height: 108,
            borderRadius: 28,
            background: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
            color: "white",
            fontSize: 60,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          A
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -2,
            color: "white",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          ARVIT AI
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            color: "#94A3B8",
            fontFamily: "system-ui, sans-serif",
            maxWidth: 860,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {SITE.tagline}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            height: 14,
            background: "linear-gradient(90deg, #4F46E5 0%, #06B6D4 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
