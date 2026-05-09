"use client";

import { useEffect, useState } from "react";
import BlurText from "./BlurText";
import Galaxy from "@/components/Galaxy";

const contributions = [
  "Product Strategy",
  "Brand Identity",
  "Growth Systems",
  "Market Expansion",
];

export default function ManifestoSection() {
  const [showDelayed, setShowDelayed] = useState(false);
  const [lineOneVisible, setLineOneVisible] = useState(false);
  const [lineTwoVisible, setLineTwoVisible] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setShowDelayed(true), 100);
    const t1 = setTimeout(() => setLineOneVisible(true), 200);
    const t2 = setTimeout(() => setLineTwoVisible(true), 600);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 10,
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* ── Galaxy WebGL background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Galaxy
          focal={[0.5, 0.5]}
          rotation={[1.0, 0.0]}
          starSpeed={0.4}
          density={1.2}
          hueShift={210}
          speed={0.6}
          mouseInteraction={true}
          glowIntensity={0.45}
          saturation={0.6}
          mouseRepulsion={false}
          twinkleIntensity={0.5}
          rotationSpeed={0.012}
          autoCenterRepulsion={0}
          transparent={false}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* ── Deep radial vignette ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* ── Noise grain overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0.08,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── CENTER TEXT BLOCK ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          pointerEvents: "auto",
        }}
      >
        {/* Small label */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.22em",
            color: "white",
            textTransform: "uppercase",
            marginBottom: "28px",
            opacity: showDelayed ? 0.65 : 0,
            transform: showDelayed ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 800ms ease, transform 800ms ease",
            transitionDelay: "100ms",
          }}
        >
          V • VI PILLARS
        </div>

        {/* ── HEADLINE — two lines, staggered ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
          }}
        >
          {/* Line 1 — "Our pivotal contributions" */}
          <div
            style={{
              opacity: lineOneVisible ? 1 : 0,
              transform: lineOneVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-courier)",
                fontSize: "clamp(2.6rem, 5.2vw, 4.8rem)",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "white",
                display: "block",
                lineHeight: 1.1,
              }}
            >
              Our pivotal contributions
            </span>
          </div>

          {/* Decorative divider line between the two headline lines */}
          <div
            style={{
              width: showDelayed ? "100%" : "0%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              margin: "6px 0",
              transition: "width 1200ms cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "700ms",
            }}
          />

          {/* Line 2 — "to the businesses" — italic, slightly smaller, offset right for visual tension */}
          <div
            style={{
              opacity: lineTwoVisible ? 1 : 0,
              transform: lineTwoVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
              whiteSpace: "nowrap",
              alignSelf: "flex-end",
              paddingRight: "clamp(0px, 1.5vw, 24px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-courier)",
                fontSize: "clamp(2.0rem, 4vw, 3.6rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.72)",
                display: "block",
                lineHeight: 1.15,
              }}
            >
              to the businesses.
            </span>
          </div>
        </div>

        {/* Sub-caption */}
        <div
          style={{
            marginTop: "32px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "480px",
            lineHeight: 1.7,
            opacity: showDelayed ? 1 : 0,
            transform: showDelayed ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1000ms ease, transform 1000ms ease",
            transitionDelay: "1100ms",
            textAlign: "center",
          }}
        >
          Building the frameworks that let great companies grow faster,
          <br />
          scale smarter, and operate with conviction.
        </div>
      </div>

      {/* ── BOTTOM-LEFT CONTRIBUTION LIST ── */}
      <ul
        style={{
          position: "absolute",
          bottom: "60px",
          left: "40px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          alignItems: "flex-start",
          textAlign: "left",
          listStyle: "none",
          margin: 0,
          padding: 0,
          opacity: showDelayed ? 0.85 : 0,
          transform: showDelayed ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 1000ms ease, transform 1000ms ease",
          transitionDelay: "700ms",
          pointerEvents: "auto",
        }}
      >
        {contributions.map((item, idx) => (
          <li
            key={idx}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "white",
              cursor: "default",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "white",
                opacity: 0.6,
                flexShrink: 0,
              }}
            />
            {item}
          </li>
        ))}
      </ul>

      {/* ── BOTTOM-RIGHT CTA BUTTON ── */}
      <button
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          zIndex: 10,
          background: "transparent",
          borderRadius: "9999px",
          border: "1px solid white",
          padding: "10px 24px",
          color: "white",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          cursor: "pointer",
          opacity: showDelayed ? 1 : 0,
          transform: showDelayed ? "translateY(0)" : "translateY(16px)",
          transition:
            "opacity 300ms ease, transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
          transitionDelay: showDelayed ? "900ms" : "0ms",
          pointerEvents: "auto",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-hover)";
          e.currentTarget.style.boxShadow = "0 0 24px rgba(147,197,253,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "white";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Read our manifesto
      </button>
    </div>
  );
}
