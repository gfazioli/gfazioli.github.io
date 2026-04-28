import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "Undolog — open source studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logoBuffer = readFileSync(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 30%, rgba(255,140,0,0.45), transparent 60%), radial-gradient(circle at 80% 80%, rgba(112,72,232,0.4), transparent 50%), #0a0a0a",
          color: "#ededed",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={180}
            height={180}
            style={{ borderRadius: 28 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 36,
                color: "#ff8c00",
                letterSpacing: 4,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Open source studio · Since 1983
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 140,
                fontWeight: 800,
                lineHeight: 1,
                marginTop: 8,
              }}
            >
              <span>Undolog</span>
              <span style={{ color: "#ff8c00" }}>.</span>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 30,
            color: "#a8a8a8",
            maxWidth: 980,
            lineHeight: 1.3,
          }}
        >
          React components, Mantine extensions, WordPress plugins, macOS apps
          and CLI tools — mostly open source.
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 24,
            color: "#666",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>gfazioli.github.io</span>
          <span style={{ color: "#ff8c00" }}>github.com/gfazioli</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
