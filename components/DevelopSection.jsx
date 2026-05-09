"use client";

import { useEffect, useState } from "react";
import BlurText from "./BlurText";
import { GridScan } from "@/components/BgGridScan";

export default function DevelopSection() {
  const [showDelayed, setShowDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const pillars = [
    "Artificial Intelligence",
    "Full stack engineering",
    "Mobile Apps",
    "Marketing",
  ];

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
      {/* ── GridScan WebGL background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#9d9ef8"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* ── Noise grain overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0.1,
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
          pointerEvents: "auto",
        }}
      >
        {/* Small label */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "white",
            textTransform: "uppercase",
            marginBottom: "12px",
            opacity: 0.7,
          }}
        >
          IV • VI PILLARS
        </div>

        {/* Main headline — single line, no break */}
        <div style={{ whiteSpace: "nowrap" }}>
          <BlurText
            text="Being in the engineering details"
            animateBy="words"
            direction="top"
            delay={200}
            className="font-[var(--font-courier)] text-[clamp(2.5rem,5vw,4.5rem)] font[400] tracking-[0.04em] text-white opacity-100"
          />
        </div>
      </div>

      {/* ── BOTTOM-LEFT PILLAR LIST ── */}
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
        {pillars.map((pillar, idx) => (
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
            {pillar}
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
          e.currentTarget.style.boxShadow = "0 0 24px rgba(255,159,252,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "white";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        View case studies
      </button>
    </div>
  );
}
