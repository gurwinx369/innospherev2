"use client";

import { useEffect, useState } from "react";
import BlurText from "./BlurText";
import LineWaves from "@/components/LineWaves";

export default function DesignSection() {
  const [showDelayed, setShowDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 3 out of 4 pillars from ThinkSection (omitting "Marketing")
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
      {/* ── LineWaves WebGL background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <LineWaves
          speed={0.25}
          innerLineCount={28.0}
          outerLineCount={32.0}
          warpIntensity={0.8}
          rotation={-30}
          edgeFadeWidth={0.1}
          colorCycleSpeed={0.6}
          brightness={0.18}
          color1="#024cc6"
          color2="#6184be"
          color3="#3B82F6"
          enableMouseInteraction={true}
          mouseInfluence={1.8}
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
          III • VI PILLARS
        </div>

        {/* Main headline — single line, no break */}
        <div style={{ whiteSpace: "nowrap" }}>
          <BlurText
            text="Breathing with the design"
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
            {/* Bullet dot */}
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
          e.currentTarget.style.boxShadow = "0 0 24px rgba(167,139,250,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "white";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        See our work
      </button>
    </div>
  );
}
