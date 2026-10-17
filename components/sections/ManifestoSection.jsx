"use client";

import { useEffect, useState, useRef } from "react";
import BlurText from "@/components/ui/BlurText";
import Galaxy from "@/components/ui/Galaxy";

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

  const [phase2, setPhase2] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  const manifestoItems = [
    "Making something that people want",
    "Living With the Product",
    "Make a unique contribution",
    "Being in the details",
  ];

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
        className="hidden sm:flex"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 0,
          }}
        >
          {/* Small label — centered */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "white",
              textTransform: "uppercase",
              marginBottom: "20px",
              opacity: showDelayed ? 0.65 : 0,
              transform: showDelayed ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 800ms ease, transform 800ms ease",
              transitionDelay: "100ms",
            }}
          >
            V • V PILLARS
          </div>

          {/* ── HEADLINE — two lines, centered, editorial ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              lineHeight: 1.05,
            }}
          >
            <BlurText
              text="Pivotal contributions for our clients."
              animateBy="words"
              direction="top"
              delay={200}
              className="font-[var(--font-courier)] text-[clamp(2.8rem,5.5vw,5rem)] font-[400] tracking-[-0.01em] text-white opacity-100"
            />
          </div>
        </div>

        {/* MOBILE: headline — bottom-left editorial layout */}
        <div
          className="sm:hidden"
          style={{
            position: "absolute",
            left: "24px",
            right: "24px",
            bottom: "170px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "white",
              textTransform: "uppercase",
              marginBottom: "12px",
              opacity: 0.7,
            }}
          >
            V • V PILLARS
          </div>
          <BlurText
            text="Pivotal contributions for our clients."
            animateBy="words"
            direction="top"
            delay={200}
            className="font-[var(--font-courier)] text-[clamp(1.9rem,9.5vw,3.5rem)] font-[400] tracking-[0.01em] text-white opacity-100 text-left leading-[1.06]"
          />
        </div>

        {/* ── BOTTOM-LEFT CONTRIBUTION LIST (desktop only) ── */}
        <ul
          className="hidden sm:flex"
          style={{
            position: "absolute",
            bottom: "60px",
            left: "40px",
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

        {/* ── BOTTOM-RIGHT CTA BUTTON (desktop only) ── */}
        <button
          className="hidden sm:block"
          onClick={() => {
            setScrollProgress(1);
            setPhase2(true);
          }}
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
            e.currentTarget.style.boxShadow = "0 0 24px rgba(147,197,253,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "white";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Read our manifesto
        </button>

        {/* ── SCROLL DOWN BUTTON ANIMATION (desktop only) ── */}
        <button
          className="hidden sm:block group"
          onClick={() => {
            setScrollProgress(1);
            setPhase2(true);
            setTimeout(() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
              }
            }, 100);
          }}
          aria-label="Scroll down"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            opacity: showDelayed ? 1 : 0,
            transition: "opacity 1000ms ease",
            transitionDelay: "1000ms",
            zIndex: 20,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            className="transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
          >
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle
              cx="24" cy="24" r="22" fill="none" stroke="white" strokeWidth="1.5"
              strokeDasharray={2 * Math.PI * 22}
              strokeDashoffset={2 * Math.PI * 22 * (1 - scrollProgress)}
              strokeLinecap="round"
              style={{ transformOrigin: "24px 24px", transform: "rotate(-90deg)", transition: "stroke-dashoffset 0.1s linear" }}
            />
            <path d="M24 16 L24 32 M18 26 L24 32 L30 26" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── MOBILE: split bottom layout — left content + right icon ── */}
        <div
          className="sm:hidden"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 24px 36px",
            opacity: showDelayed ? 1 : 0,
            transform: showDelayed ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 800ms ease, transform 800ms ease",
            transitionDelay: "700ms",
          }}
        >
          {/* LEFT: contribution list + Contact us CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {contributions.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "default",
                  }}
                >
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "white", opacity: 0.5, flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => { setScrollProgress(1); setPhase2(true); }}
              style={{
                background: "transparent",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.6)",
                padding: "9px 20px",
                color: "white",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.04em",
                cursor: "pointer",
                alignSelf: "flex-start",
              }}
            >
              Contact us
            </button>
          </div>

          {/* RIGHT: scroll icon only */}
          <div style={{ pointerEvents: "none", flexShrink: 0 }}>
            <svg width="40" height="40" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <circle
                cx="24" cy="24" r="22" fill="none" stroke="white" strokeWidth="1.5"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={2 * Math.PI * 22 * (1 - scrollProgress)}
                strokeLinecap="round"
                style={{ transformOrigin: "24px 24px", transform: "rotate(-90deg)", transition: "stroke-dashoffset 0.1s linear" }}
              />
              <path d="M24 16 L24 32 M18 26 L24 32 L30 26" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================
          PHASE 2: Manifesto List (White bg)
          ========================================= */}
      <div
        ref={scrollContainerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 15,
          background: "transparent",
          overflowX: "hidden",
          overflowY: phase2 ? "auto" : "hidden",
          opacity: phase2 ? 1 : 0,
          pointerEvents: phase2 ? "auto" : "none",
          transition: "opacity 800ms ease, transform 800ms ease",
          transform: phase2 ? "translateY(0)" : "translateY(40px)",
          color: "black",
        }}
        onScroll={(e) => {
          const st = e.target.scrollTop;
          document.dispatchEvent(
            new CustomEvent("hide-nav", { detail: { hidden: st > 50 } }),
          );
        }}
      >
        {/* White background content wrapper */}
        <div
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Grain overlay for Phase 2 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              opacity: 0.05,
              pointerEvents: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "160px 160px",
              backgroundRepeat: "repeat",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "60px",
              alignItems: "center",
              width: "100%",
              padding: "120px 20px",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                marginBottom: "-30px",
                opacity: 0.8,
              }}
            >
              •
            </div>
            {manifestoItems.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredItem(idx)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  fontWeight: 400,
                  cursor: "pointer",
                  position: "relative",
                  width: "100%",
                  textAlign: "center",
                  letterSpacing: "-0.02em",
                }}
              >
                {/* The actual text */}
                <span
                  style={{
                    display: "inline-block",
                    transition:
                      "filter 500ms ease, opacity 500ms ease, transform 500ms ease",
                    filter: hoveredItem === idx ? "blur(12px)" : "none",
                    opacity:
                      hoveredItem === idx
                        ? 0.15
                        : hoveredItem !== null
                          ? 0.3
                          : 1,
                    transform: hoveredItem === idx ? "scale(0.98)" : "scale(1)",
                  }}
                >
                  {item}
                </span>

                {/* Hover Reveal Content for item 0 */}
                {idx === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                      opacity: hoveredItem === 0 ? 1 : 0,
                      transition: "opacity 500ms ease",
                      zIndex: 10,
                    }}
                  >
                    {/* Left Image (Mockup style) */}
                    <div
                      style={{
                        position: "absolute",
                        left: "15%",
                        top: "50%",
                        transform:
                          hoveredItem === 0
                            ? "translateY(-50%) rotate(-5deg) scale(1)"
                            : "translateY(-40%) rotate(-10deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
                        opacity: hoveredItem === 0 ? 1 : 0,
                        width: "220px",
                        height: "300px",
                        background: "#1a1a24",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "8px solid #2a2a35",
                        overflow: "hidden",
                      }}
                    >
                      {/* Inner content simulating screenshot */}
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(to bottom, white 40%, #f0f0f0 100%)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "20px",
                        }}
                      >
                        <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                          🏆
                        </div>
                        <div
                          style={{
                            width: "80%",
                            height: "10px",
                            background: "#ddd",
                            borderRadius: "5px",
                            marginBottom: "8px",
                          }}
                        />
                        <div
                          style={{
                            width: "60%",
                            height: "10px",
                            background: "#ddd",
                            borderRadius: "5px",
                            marginBottom: "20px",
                          }}
                        />
                        <div
                          style={{
                            width: "100%",
                            height: "30px",
                            background: "#3b82f6",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Center CTA */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "14px",
                        color: "black",
                        background: "rgba(255,255,255,0.7)",
                        padding: "16px 32px",
                        borderRadius: "99px",
                        backdropFilter: "blur(12px)",
                        transform:
                          hoveredItem === 0 ? "scale(1)" : "scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      }}
                    >
                      Discover Design Process
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          border: "1px solid black",
                          borderRadius: "50%",
                          fontSize: "16px",
                        }}
                      >
                        →
                      </span>
                    </div>

                    {/* Bottom Center-Right Image (Mockup style) */}
                    <div
                      style={{
                        position: "absolute",
                        right: "20%",
                        top: "80%",
                        transform:
                          hoveredItem === 0
                            ? "translateY(-20%) rotate(3deg) scale(1)"
                            : "translateY(-10%) rotate(8deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
                        opacity: hoveredItem === 0 ? 1 : 0,
                        width: "260px",
                        height: "360px",
                        background: "#1a1a24",
                        borderRadius: "16px",
                        boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "8px solid #2a2a35",
                        overflow: "hidden",
                      }}
                    >
                      {/* Inner content simulating Shift2Cal screenshot */}
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#111",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "20px",
                          color: "white",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            marginBottom: "40px",
                          }}
                        >
                          Shift2Cal
                        </div>
                        <div style={{ fontSize: "50px", marginBottom: "10px" }}>
                          🌾
                        </div>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#fbbf24",
                          }}
                        >
                          30k+
                        </div>
                        <div style={{ fontSize: "12px", opacity: 0.6 }}>
                          Tutti generati
                        </div>
                        <div
                          style={{
                            marginTop: "40px",
                            fontSize: "12px",
                            color: "#fbbf24",
                            textAlign: "center",
                          }}
                        >
                          Migliaia di persone stanno parlando di noi!
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover Reveal Content for item 1 */}
                {idx === 1 && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                      opacity: hoveredItem === 1 ? 1 : 0,
                      transition: "opacity 500ms ease",
                      zIndex: 10,
                    }}
                  >
                    {/* Left Image */}
                    <div
                      style={{
                        position: "absolute",
                        left: "10%",
                        top: "40%",
                        transform:
                          hoveredItem === 1
                            ? "translateY(-50%) rotate(-8deg) scale(1)"
                            : "translateY(-30%) rotate(-12deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
                        opacity: hoveredItem === 1 ? 1 : 0,
                        width: "240px",
                        height: "320px",
                        background: "#1a1a24",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "8px solid #2a2a35",
                        overflow: "hidden",
                      }}
                    >
                      {/* Mockup */}
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#064e3b",
                          display: "flex",
                          flexDirection: "column",
                          padding: "20px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "30px",
                            marginBottom: "20px",
                            color: "white",
                          }}
                        >
                          ⚡
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "8px",
                            background: "rgba(255,255,255,0.2)",
                            borderRadius: "4px",
                            marginBottom: "12px",
                          }}
                        />
                        <div
                          style={{
                            width: "80%",
                            height: "8px",
                            background: "rgba(255,255,255,0.2)",
                            borderRadius: "4px",
                            marginBottom: "12px",
                          }}
                        />
                        <div
                          style={{
                            width: "90%",
                            height: "8px",
                            background: "rgba(255,255,255,0.2)",
                            borderRadius: "4px",
                            marginBottom: "30px",
                          }}
                        />
                        <div
                          style={{
                            width: "100%",
                            height: "60px",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Right Image */}
                    <div
                      style={{
                        position: "absolute",
                        right: "10%",
                        top: "60%",
                        transform:
                          hoveredItem === 1
                            ? "translateY(-50%) rotate(6deg) scale(1)"
                            : "translateY(-30%) rotate(10deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
                        opacity: hoveredItem === 1 ? 1 : 0,
                        width: "240px",
                        height: "320px",
                        background: "#1a1a24",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "8px solid #2a2a35",
                        overflow: "hidden",
                      }}
                    >
                      {/* Mockup */}
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#022c22",
                          display: "flex",
                          flexDirection: "column",
                          padding: "20px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.2)",
                            marginBottom: "20px",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              height: "40px",
                              background: "rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                            }}
                          />
                          <div
                            style={{
                              flex: 1,
                              height: "40px",
                              background: "rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "100px",
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Center CTA */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "14px",
                        color: "black",
                        background: "rgba(255,255,255,0.7)",
                        padding: "16px 32px",
                        borderRadius: "99px",
                        backdropFilter: "blur(12px)",
                        transform:
                          hoveredItem === 1 ? "scale(1)" : "scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      }}
                    >
                      Discover Develop Process
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          border: "1px solid black",
                          borderRadius: "50%",
                          fontSize: "16px",
                        }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                )}

                {/* Hover Reveal Content for item 2 */}
                {idx === 2 && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                      opacity: hoveredItem === 2 ? 1 : 0,
                      transition: "opacity 500ms ease",
                      zIndex: 10,
                    }}
                  >
                    {/* Top image */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "-20%",
                        transform:
                          hoveredItem === 2
                            ? "translate(-50%, -50%) rotate(2deg) scale(1)"
                            : "translate(-50%, -80%) rotate(5deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
                        opacity: hoveredItem === 2 ? 1 : 0,
                        width: "300px",
                        height: "180px",
                        background: "#1a1a24",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "8px solid #2a2a35",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#8B3520",
                          padding: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            border: "4px solid rgba(255,255,255,0.3)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Bottom image */}
                    <div
                      style={{
                        position: "absolute",
                        left: "30%",
                        top: "120%",
                        transform:
                          hoveredItem === 2
                            ? "translateY(-50%) rotate(-4deg) scale(1)"
                            : "translateY(-20%) rotate(-8deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
                        opacity: hoveredItem === 2 ? 1 : 0,
                        width: "280px",
                        height: "200px",
                        background: "#1a1a24",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "8px solid #2a2a35",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#C0533A",
                          padding: "20px",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "20px",
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: "10px",
                            marginBottom: "20px",
                          }}
                        />
                        <div style={{ display: "flex", gap: "10px" }}>
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "rgba(0,0,0,0.1)",
                              borderRadius: "8px",
                            }}
                          />
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "rgba(0,0,0,0.1)",
                              borderRadius: "8px",
                            }}
                          />
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "rgba(0,0,0,0.1)",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Center CTA */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "14px",
                        color: "black",
                        background: "rgba(255,255,255,0.7)",
                        padding: "16px 32px",
                        borderRadius: "99px",
                        backdropFilter: "blur(12px)",
                        transform:
                          hoveredItem === 2 ? "scale(1)" : "scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      }}
                    >
                      Discover Think Process
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          border: "1px solid black",
                          borderRadius: "50%",
                          fontSize: "16px",
                        }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                )}

                {/* Hover Reveal Content for item 3 (Reviews) */}
                {idx === 3 && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                      opacity: hoveredItem === 3 ? 1 : 0,
                      transition: "opacity 500ms ease",
                      zIndex: 10,
                    }}
                  >
                    {/* Review Card 1 */}
                    <div
                      style={{
                        position: "absolute",
                        left: "5%",
                        top: "20%",
                        transform:
                          hoveredItem === 3
                            ? "translateY(-50%) rotate(-4deg) scale(1)"
                            : "translateY(-60%) rotate(-8deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
                        opacity: hoveredItem === 3 ? 1 : 0,
                        width: "280px",
                        background: "#111",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        padding: "24px",
                        color: "white",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "#444",
                          }}
                        />
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                            Sarah Jenkins
                          </div>
                          <div style={{ fontSize: "12px", opacity: 0.6 }}>
                            CTO, TechFlow
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          color: "#fbbf24",
                          marginBottom: "12px",
                          fontSize: "12px",
                        }}
                      >
                        ★★★★★
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.5,
                          opacity: 0.9,
                        }}
                      >
                        "Incredible attention to detail. They didn't just build
                        our app, they architected a scalable future for our
                        platform."
                      </div>
                    </div>

                    {/* Review Card 2 */}
                    <div
                      style={{
                        position: "absolute",
                        right: "5%",
                        top: "10%",
                        transform:
                          hoveredItem === 3
                            ? "translateY(-50%) rotate(3deg) scale(1)"
                            : "translateY(-60%) rotate(6deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, opacity 700ms ease 100ms",
                        opacity: hoveredItem === 3 ? 1 : 0,
                        width: "280px",
                        background: "#111",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        padding: "24px",
                        color: "white",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "#444",
                          }}
                        />
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                            Marcus Chen
                          </div>
                          <div style={{ fontSize: "12px", opacity: 0.6 }}>
                            Founder, Nova AI
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          color: "#fbbf24",
                          marginBottom: "12px",
                          fontSize: "12px",
                        }}
                      >
                        ★★★★★
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.5,
                          opacity: 0.9,
                        }}
                      >
                        "They completely transformed our business model through
                        thoughtful UX and flawless execution."
                      </div>
                    </div>

                    {/* Review Card 3 */}
                    <div
                      style={{
                        position: "absolute",
                        left: "15%",
                        top: "80%",
                        transform:
                          hoveredItem === 3
                            ? "translateY(-50%) rotate(5deg) scale(1)"
                            : "translateY(-30%) rotate(10deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, opacity 700ms ease 150ms",
                        opacity: hoveredItem === 3 ? 1 : 0,
                        width: "280px",
                        background: "#111",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        padding: "24px",
                        color: "white",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "#444",
                          }}
                        />
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                            Elena Rodriguez
                          </div>
                          <div style={{ fontSize: "12px", opacity: 0.6 }}>
                            VP Product, Shift
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          color: "#fbbf24",
                          marginBottom: "12px",
                          fontSize: "12px",
                        }}
                      >
                        ★★★★★
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.5,
                          opacity: 0.9,
                        }}
                      >
                        "Best engineering team we've ever worked with. The
                        performance gains were immediately noticeable."
                      </div>
                    </div>

                    {/* Review Card 4 */}
                    <div
                      style={{
                        position: "absolute",
                        right: "15%",
                        top: "90%",
                        transform:
                          hoveredItem === 3
                            ? "translateY(-50%) rotate(-3deg) scale(1)"
                            : "translateY(-30%) rotate(-6deg) scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, opacity 700ms ease 200ms",
                        opacity: hoveredItem === 3 ? 1 : 0,
                        width: "280px",
                        background: "#111",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        padding: "24px",
                        color: "white",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "#444",
                          }}
                        />
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                            David Park
                          </div>
                          <div style={{ fontSize: "12px", opacity: 0.6 }}>
                            CEO, FlowState
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          color: "#fbbf24",
                          marginBottom: "12px",
                          fontSize: "12px",
                        }}
                      >
                        ★★★★★
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.5,
                          opacity: 0.9,
                        }}
                      >
                        "Their process is unmatched. From ideation to launch,
                        they handled every detail with absolute precision."
                      </div>
                    </div>

                    {/* Center CTA */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "14px",
                        color: "black",
                        background: "rgba(255,255,255,0.7)",
                        padding: "16px 32px",
                        borderRadius: "99px",
                        backdropFilter: "blur(12px)",
                        transform:
                          hoveredItem === 3 ? "scale(1)" : "scale(0.9)",
                        transition:
                          "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      }}
                    >
                      Book a free call
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          border: "1px solid black",
                          borderRadius: "50%",
                          fontSize: "16px",
                        }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* ── INCLUDING BUT NOT LIMITED TO ── */}
            <div
              style={{
                padding: "160px 20px",
                background: "#f5f5f3",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  maxWidth: "1200px",
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "#555",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Deliverables.
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    fontSize: "clamp(2rem, 3vw, 2.5rem)",
                    fontWeight: 400,
                    color: "#111",
                    marginBottom: "60px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Including but not limited to.
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    border: "1px solid #d8d8d8",
                    backgroundColor: "#d8d8d8", // Creates the inner borders
                    gap: "1px", // 1px gap for borders
                  }}
                >
                  {[
                    {
                      label: "E-commerce",
                      description:
                        "The online shop where you can sell your products.",
                      icon: (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          <path d="M9 9h1m4 0h1" />
                        </svg>
                      ),
                    },
                    {
                      label: "Website",
                      description: "The place where your brand meets visitors.",
                      accent: true,
                      icon: (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <path d="M8 21h8M12 17v4" />
                        </svg>
                      ),
                    },
                    {
                      label: "AI Tool",
                      description:
                        "The smart layer that turns data into actions.",
                      icon: (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <circle cx="12" cy="10" r="2" />
                          <path d="M12 12v5M8 17h8" />
                        </svg>
                      ),
                    },
                    {
                      label: "Web App",
                      description:
                        "The online workspace where real work happens.",
                      icon: (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          <path d="M18 6l2-2" />
                        </svg>
                      ),
                    },
                    {
                      label: "Mobile App",
                      description: "The product experience users keep on hand.",
                      icon: (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="5" y="2" width="14" height="20" rx="2" />
                          <path d="M12 18h.01" />
                        </svg>
                      ),
                    },
                    {
                      label: "CMS and SaaS",
                      description:
                        "The tool where teams run content and services.",
                      accent: true,
                      icon: (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="5" y="2" width="14" height="20" rx="2" />
                          <path d="M9 7h6M9 11h4" />
                        </svg>
                      ),
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "40px 32px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0",
                        background: "#f5f5f3",
                        minHeight: "260px",
                      }}
                    >
                      {!item.empty && (
                        <>
                          <div style={{ color: "#111", marginBottom: "40px" }}>
                            {item.icon}
                          </div>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "11px",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "#111",
                              marginBottom: "16px",
                              fontWeight: 500,
                            }}
                          >
                            {item.label}
                          </span>
                          <p
                            style={{
                              fontFamily:
                                "var(--font-sans, system-ui, sans-serif)",
                              fontSize: "16px",
                              lineHeight: 1.5,
                              color: "#333",
                              margin: 0,
                            }}
                          >
                            {item.description}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── NEW SERVICES GRID ── */}
            <div
              style={{
                padding: "100px 20px 160px",
                background: "#f5f5f3",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  maxWidth: "1200px",
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "#555",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Our services. The full list!
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 400,
                    color: "#111",
                    marginBottom: "80px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                    maxWidth: "900px",
                  }}
                >
                  IMPPECCABLES designs, validates and builds digital products
                  end to end, offering strategy, design, engineering and AI
                  services that turn business ideas into scalable, user-loved
                  experiences.
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    border: "1px solid #d8d8d8",
                    backgroundColor: "#d8d8d8", // inner borders
                    gap: "1px",
                  }}
                >
                  {[
                    {
                      category: "PRODUCT VISION & STRATEGY",
                      items: [
                        "Market Research",
                        "Stakeholder Interviews",
                        "Product Vision",
                        "Product Strategy",
                      ],
                    },
                    {
                      category: "PRODUCT DESIGN",
                      items: [
                        "User Interviews",
                        "Workflows",
                        "User Journey",
                        "Technical Recommendations",
                      ],
                    },
                    {
                      category: "PROTOTYPING",
                      items: [
                        "Figma Prototyping",
                        "Visual Design Research",
                        "User Testing",
                        "Engineering Validations",
                      ],
                    },
                    {
                      category: "DELIVERY & PLANNING",
                      items: [
                        "Visual Design Approval",
                        "Roadmap",
                        "Deliverables",
                        "Milestones",
                      ],
                    },
                    {
                      category: "BRANDING",
                      items: [
                        "Brand Positioning",
                        "Product Narrative",
                        "Visual Identity System",
                        "Tone of voice",
                      ],
                    },
                    {
                      category: "UI DESIGN",
                      items: [
                        "Information Architecture",
                        "Interaction Design",
                        "Responsive Layouts",
                        "Microinteractions",
                      ],
                    },
                    {
                      category: "DESIGN SYSTEM",
                      items: [
                        "Design Tokens",
                        "Component Library",
                        "Usage Guidelines",
                        "Design Ops Support",
                      ],
                    },
                    {
                      category: "IDEATION & PROTOTYPING",
                      items: [
                        "Concept Workshops",
                        "Rapid Wireframing",
                        "Interactive Prototypes",
                        "Usability Experiments",
                      ],
                    },
                    {
                      category: "FULL STACK ENGINEERING",
                      items: [
                        "Architecture & Tech Stack",
                        "End-to-End Implementation",
                        "Performance & Scalability",
                      ],
                    },
                    {
                      category: "BACKEND AND FRONTEND DEVELOPMENT",
                      items: [
                        "API Design & Build",
                        "Frontend Feature Delivery",
                        "Security & Compliance",
                      ],
                    },
                    {
                      category: "MOBILE DEVELOPMENT",
                      items: [
                        "Native iOS & Android",
                        "Cross-Platform Frameworks",
                        "Mobile UX Optimization",
                      ],
                    },
                    {
                      category: "AI AND AUTOMATION",
                      items: [
                        "Opportunity Assessment",
                        "Data & Model Strategy",
                        "Workflow Automation Design",
                      ],
                    },
                  ].map((col, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "40px 32px",
                        background: "#f5f5f3",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        minHeight: "280px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#888",
                          marginBottom: "12px",
                        }}
                      >
                        {col.category}
                      </span>
                      {col.items.map((item, i) => (
                        <div
                          key={i}
                          style={{
                            fontFamily:
                              "var(--font-sans, system-ui, sans-serif)",
                            fontSize: "14px",
                            color: "#111",
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── CLIENT PROJECTS GRID ── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              backgroundColor: "white",
              padding: "0 80px 120px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "1440px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "40px",
                }}
              >
                {[
                  {
                    title: "ACASA",
                    subtitle: "Estate Search Engine",
                    imgSrc: "/image1.png",
                    bg: "#f97316",
                  },
                  {
                    title: "SHIFTPILOT",
                    subtitle: "AI Workforce Scheduling Platform",
                    imgSrc: "/image2.png",
                    bg: "#bfdbfe",
                  },
                  {
                    title: "BIKE-ROOM",
                    subtitle: "From Zero to Exit: Scaling E-commerce",
                    imgSrc: "/image3.png",
                    bg: "#171717",
                  },
                ].map((project, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col cursor-pointer"
                  >
                    {/* Image Container */}
                    <div
                      className="relative w-full overflow-hidden mb-[24px]"
                      style={{
                        aspectRatio: "4/5",
                        backgroundColor: project.bg,
                      }}
                    >
                      <img
                        src={project.imgSrc}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[0.95]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    {/* Labels */}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        letterSpacing: "0.06em",
                        color: "#666",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      {project.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans, system-ui, sans-serif)",
                        fontSize: "15px",
                        color: "#111",
                      }}
                    >
                      {project.subtitle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              backgroundColor: "white",
              padding: "80px 80px 160px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h2
              className="font-[var(--font-sans,system-ui,sans-serif)]"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#111",
                maxWidth: "1000px",
                letterSpacing: "-0.02em",
                marginBottom: "80px",
              }}
            >
              We think, design and develop world-class
              <br />
              digital products for forward-thinking clients.
            </h2>

            <button
              className="flex items-center cursor-pointer bg-transparent border-none"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  fontSize: "15px",
                  color: "#111",
                  marginRight: ctaHovered ? "80px" : "32px",
                  transition: "margin-right 500ms cubic-bezier(0.25,1,0.5,1)",
                }}
              >
                Be the next
              </span>
              <div className="relative flex items-center justify-center w-14 h-14">
                <div className="absolute w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: ctaHovered
                        ? "translateX(4px)"
                        : "translateX(0)",
                      transition: "transform 500ms cubic-bezier(0.25,1,0.5,1)",
                    }}
                  >
                    <path d="M2 12h20" />
                    <path d="M15 5l7 7-7 7" />
                  </svg>
                </div>
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 56 56"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="28"
                    cy="28"
                    r="26"
                    fill="none"
                    stroke="black"
                    strokeWidth="1"
                    style={{
                      strokeDasharray: 164,
                      strokeDashoffset: ctaHovered ? 0 : 164,
                      transition:
                        "stroke-dashoffset 800ms 100ms cubic-bezier(0.25,1,0.5,1)",
                    }}
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* ── FOOTER (Transparent background to show Galaxy) ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.15,
              pointerEvents: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "160px 160px",
              backgroundRepeat: "repeat",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "160px 80px 0",
              maxWidth: "1440px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "80px",
              }}
            >
              <h2
                className="font-[var(--font-courier)]"
                style={{
                  fontSize: "clamp(3rem, 6vw, 6.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Let&apos;s
                <br />
                build
                <br />
                something
                <br />
                great...
              </h2>
              <button
                className="group flex items-center bg-transparent border-none cursor-pointer"
                style={{ paddingBottom: "20px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    fontSize: "20px",
                    color: "white",
                    marginRight: "24px",
                  }}
                >
                  Work together
                </span>
                <div
                  className="flex items-center justify-center rounded-full border border-white/40 group-hover:border-white transition-colors"
                  style={{ width: "40px", height: "40px" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr 1fr",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div
                style={{
                  padding: "40px 40px 40px 0",
                  borderRight: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    opacity: 0.5,
                    textTransform: "uppercase",
                    margin: "0 0 24px 0",
                  }}
                >
                  Social
                </h4>
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {["Linkedin", "Instagram"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
              <div
                style={{
                  padding: "40px",
                  borderRight: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    opacity: 0.5,
                    textTransform: "uppercase",
                    margin: "0 0 24px 0",
                  }}
                >
                  IMPPECCABLES
                </h4>
                <div
                  style={{
                    display: "flex",
                    gap: "32px",
                    flexWrap: "wrap",
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {["Think", "Design", "Develop", "Manifesto"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div style={{ padding: "40px 0 40px 40px" }}>
                <h4
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    opacity: 0.5,
                    textTransform: "uppercase",
                    margin: "0 0 24px 0",
                  }}
                >
                  Contact
                </h4>
                <a
                  href="#"
                  className="hover:opacity-70 transition-opacity"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Contact Us
                </a>
              </div>
            </div>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr" }}
            >
              <div
                style={{
                  padding: "24px 0",
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                2026 ©
              </div>
              <div
                style={{
                  padding: "24px 40px",
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Imppeccables - a company which turns complexity into elegance.
              </div>
              <div
                style={{
                  padding: "24px 0 24px 40px",
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                  textAlign: "right",
                }}
              >
                Always with ❤️ and a lot of ☕
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
