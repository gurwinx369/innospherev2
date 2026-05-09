"use client";

import { useEffect, useState, useRef } from "react";
import BlurText from "./BlurText";
import LineWaves from "@/components/LineWaves";

export default function DesignSection() {
  const [showDelayed, setShowDelayed] = useState(false);
  const [phase2, setPhase2] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const handleWheel = (e) => {
      if (!phase2) {
        if (e.deltaY > 0) {
          setScrollProgress((prev) => {
            const next = prev + 0.03;
            if (next >= 1) {
              setPhase2(true);
              return 1;
            }
            return next;
          });
        } else {
          setScrollProgress((prev) => Math.max(0, prev - 0.05));
        }
      } else {
        if (e.deltaY < 0 && scrollContainerRef.current?.scrollTop === 0) {
          setPhase2(false);
          setScrollProgress(0.9);
        }
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [phase2]);

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

      {/* ── Black darkening overlay (Phase 2 Only) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          opacity: phase2 ? 1 : 0,
          transition: "opacity 800ms ease",
          pointerEvents: "none",
        }}
      />

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

      {/* =========================================
          PHASE 1: Intro
          ========================================= */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          opacity: phase2 ? 0 : 1,
          pointerEvents: phase2 ? "none" : "auto",
          transition: "opacity 800ms ease, transform 800ms ease",
          transform: phase2 ? "translateY(-40px)" : "translateY(0)",
        }}
      >
        {/* ── CENTER TEXT BLOCK ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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

        {/* ── SCROLL PROGRESS INDICATOR ── */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: showDelayed ? 1 : 0,
            transition: "opacity 1000ms ease",
            transitionDelay: "1000ms",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray={2 * Math.PI * 22}
              strokeDashoffset={2 * Math.PI * 22 * (1 - scrollProgress)}
              strokeLinecap="round"
              style={{
                transformOrigin: "24px 24px",
                transform: "rotate(-90deg)",
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
            <path
              d="M24 16 L24 32 M18 26 L24 32 L30 26"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* =========================================
          PHASE 2: Process Detail
          ========================================= */}
      <div
        ref={scrollContainerRef}
        style={{
          position: "absolute",
          top: "100px",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 15,
          overflowY: phase2 ? "auto" : "hidden",
          opacity: phase2 ? 1 : 0,
          pointerEvents: phase2 ? "auto" : "none",
          transition: "opacity 800ms ease, transform 800ms ease",
          transform: phase2 ? "translateY(0)" : "translateY(40px)",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px 80px",
          color: "white",
          maskImage:
            "linear-gradient(to bottom, transparent 0px, black 40px, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0px, black 40px, black 100%)",
        }}
      >
        <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
          <h2
            className="font-[var(--font-courier)] text-[clamp(2.5rem,5vw,4.5rem)] font-[400] tracking-[0.04em] text-white"
            style={{
              lineHeight: 1.2,
              marginBottom: "30px",
            }}
          >
            Breathing with the design
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.85)",
              maxWidth: "680px",
            }}
          >
            Shape a product identity users recognize, trust and enjoy every day
            across brand, interface and system design.
          </p>
        </div>

        {/* ── GRID SECTION ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {/* Vertical dividers */}
          <div
            style={{
              position: "absolute",
              left: "25%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "75%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(255,255,255,0.15)",
            }}
          />

          {/* Row 1: Headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              padding: "24px 0",
            }}
          >
            {[
              "Branding",
              "UI Design",
              "Design System",
              "Ideation & Prototyping",
            ].map((title, i) => (
              <div
                key={i}
                style={{
                  padding: "0 40px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  opacity: 0.6,
                  letterSpacing: "0.05em",
                }}
              >
                {title}
              </div>
            ))}
          </div>

          {/* Horizontal Timeline Line */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "1px",
              background: "rgba(255,255,255,0.3)",
            }}
          >
            {/* White dot */}
            <div
              style={{
                position: "absolute",
                left: "25%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
            />
          </div>

          {/* Row 2: Lists */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              padding: "40px 0",
            }}
          >
            <div
              style={{
                padding: "0 40px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                "Brand Positioning",
                "Product Narrative",
                "Visual Identity System",
                "Voice and Tone",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: "15px",
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "0 40px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                "Information Architecture",
                "Interaction Design",
                "Responsive Layouts",
                "Microinteractions",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: "15px",
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "0 40px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                "Design Tokens",
                "Component Library",
                "Usage Guidelines",
                "Design Ops Support",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: "15px",
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "0 40px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                "Concept Workshops",
                "Rapid Wireframing",
                "Interactive Prototypes",
                "Usability Experiments",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: "15px",
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div
          style={{
            marginTop: "40px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.39 0 4.68.94 6.36 2.64L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
          Each individual step involves reiterative processes, depending on
          feedback from Stakeholders and Users.
        </div>
      </div>
    </div>
  );
}
