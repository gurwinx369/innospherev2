"use client";

import { useEffect, useState, useRef } from "react";
import BlurText from "./BlurText";
import FloatingLines from "@/components/BgFloatingLines";
import ScrollVelocity from "./ScrollVelocity";
import { cn } from "@/lib/utils";

export default function ThinkSection() {
  const [showDelayed, setShowDelayed] = useState(false);
  const [phase2, setPhase2] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

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
            const next = prev + 0.03; // Adjust sensitivity
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
        // In Phase 2, if we scroll up and are at the top of the container, go back to Phase 1
        if (e.deltaY < 0 && scrollContainerRef.current?.scrollTop === 0) {
          setPhase2(false);
          setScrollProgress(0.9);
        }
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [phase2]);

  const categories = [
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
        zIndex: 10,
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* ── FloatingLines WebGL background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <FloatingLines
          linesGradient={[
            "#0033cc",
            "#1452b8",
            "#4fa8ff",
            "#80d4ff",
            "#ffffff",
          ]}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={8}
          lineDistance={4}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax
          animationSpeed={1}
          mixBlendMode="normal"
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
            II • V PILLARS
          </div>

          {/* Main headline */}
          <div style={{ whiteSpace: "nowrap" }}>
            <BlurText
              text="Making products that people love"
              animateBy="words"
              direction="top"
              delay={200}
              className="font-[var(--font-courier)] text-[clamp(2.5rem,5vw,4.5rem)] font[400] tracking-[0.04em] text-white opacity-100"
            />
          </div>
        </div>

        {/* ── BOTTOM-LEFT CATEGORY LIST ── */}
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
          {categories.map((cat, idx) => (
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
              {cat}
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
            e.currentTarget.style.boxShadow = "0 0 24px rgba(124,58,237,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "white";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Book a free call
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
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 15,
          overflowX: "hidden",
          overflowY: phase2 ? "auto" : "hidden",
          opacity: phase2 ? 1 : 0,
          pointerEvents: phase2 ? "auto" : "none",
          transition: "opacity 800ms ease, transform 800ms ease",
          transform: phase2 ? "translateY(0)" : "translateY(40px)",
          display: "flex",
          flexDirection: "column",
          color: "white",
        }}
        onScroll={(e) => {
          const st = e.target.scrollTop;
          if (st > 50) {
            document.dispatchEvent(
              new CustomEvent("hide-nav", { detail: { hidden: true } }),
            );
          } else {
            document.dispatchEvent(
              new CustomEvent("hide-nav", { detail: { hidden: false } }),
            );
          }
        }}
      >
        {/* ── OLD DARK PROCESS SECTION ── */}
        <div style={{ padding: "120px 80px 120px", flexShrink: 0 }}>
          <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
            <h2
              className="font-[var(--font-courier)] text-[clamp(2.5rem,5vw,4.5rem)] font-[400] tracking-[0.04em] text-white"
              style={{
                lineHeight: 1.2,
                marginBottom: "30px",
              }}
            >
              Making products that people love
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
              Design the right digital product before you build it: INNOSPHERE
              turns ideas, data and user insight into a clear, validated product
              direction.
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
                "Product Vision & Strategy",
                "Product Design",
                "Prototyping",
                "Delivery & Planning",
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
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "white",
                  boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                }}
              />
              {/* Right arrow */}
              <div
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                →
              </div>
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
                  "Market Research",
                  "Stakeholder Interviews",
                  "Product Vision",
                  "Product Strategy",
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
                  "User Interviews",
                  "Workflows",
                  "User Journey",
                  "Technical Recommendations",
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
                  "Figma Prototyping",
                  "Visual Design Research",
                  "User Testing",
                  "Engineering Validations",
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
                  "Visual Design Approbation",
                  "Roadmap",
                  "Deliverables",
                  "Milestones",
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

        {/* ── NEW WHITE SECTION ── */}
        <div style={{ backgroundColor: "#fff", color: "black", flexShrink: 0 }}>
          <div
            style={{
              padding: "120px 80px 120px",
              display: "flex",
              flexDirection: "column",
              maxWidth: "1440px",
              margin: "0 auto",
            }}
          >
            {/* Top row: Headline and Description */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "80px",
                gap: "40px",
              }}
            >
              {/* Left side */}
              <div style={{ flex: 1, position: "relative" }}>
                <h2
                  className="font-[var(--font-courier)]"
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    margin: 0,
                    textTransform: "none",
                  }}
                >
                  Unleash Your
                  <br />
                  Product&apos;s Potential
                </h2>
                <div style={{ marginTop: "40px", marginLeft: "120px" }}>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "black",
                    }}
                  />
                </div>
              </div>
              {/* Right side */}
              <div style={{ flex: 1, maxWidth: "500px", marginTop: "16px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-sans, system-ui, sans-serif)",
                    fontSize: "17px",
                    lineHeight: 1.6,
                    color: "#222",
                    margin: 0,
                  }}
                >
                  Unleash your product&apos;s potential by grounding every
                  decision in research, strategy and real user needs, so you
                  only invest in digital products the market actually wants.
                </p>
              </div>
            </div>

            {/* Grid row: 2x2 Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >
              {[
                {
                  title: "PRODUCT VISION",
                  description:
                    "Define a sharp digital product vision grounded in market reality. INNOSPHERE aligns stakeholders, data and business goals to shape a winning product strategy.",
                },
                {
                  title: "PRODUCT DESIGN",
                  description:
                    "Turn strategy into user-centric experiences. INNOSPHERE maps journeys, workflows and UX foundations that make your digital product intuitive and effective.",
                },
                {
                  title: "PROTOTYPING",
                  description:
                    "Prototype fast, learn fast. INNOSPHERE builds realistic product prototypes to validate ideas, UX and technology before you commit development resources.",
                },
                {
                  title: "DELIVERY & PLANNING",
                  description:
                    "From concept to delivery, INNOSPHERE structures plans, assets and milestones so your teams can build the product with clarity, speed and alignment.",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col bg-[#f5f5f5] p-[48px] cursor-pointer transition-all duration-500 hover:bg-[#eaeaea] overflow-hidden"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: "40px",
                    }}
                  >
                    {card.title}
                  </span>

                  <p
                    style={{
                      fontFamily: "var(--font-sans, system-ui, sans-serif)",
                      fontSize: "20px",
                      lineHeight: 1.5,
                      color: "#111",
                      margin: 0,
                      maxWidth: "90%",
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── SCROLL VELOCITY TEXT ── */}
          <div
            style={{
              marginTop: "120px",
              marginBottom: "120px",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <ScrollVelocity
              texts={[
                "Complex problems to product execution \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 ",
              ]}
              velocity={50}
              scrollContainerRef={scrollContainerRef}
              className="font-[var(--font-poppins)] text-[clamp(4rem,10vw,8rem)] font-[400] tracking-[-0.04em] text-black"
            />
          </div>

          {/* ── CLIENT PROJECTS GRID ── */}
          <div
            style={{
              padding: "0 80px 120px",
              display: "flex",
              flexDirection: "column",
              maxWidth: "1440px",
              margin: "0 auto",
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
                    style={{ aspectRatio: "4/5", backgroundColor: project.bg }}
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

          {/* ── BOTTOM CTA SECTION ── */}
          <div
            style={{
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
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  fontSize: "15px",
                  color: "#111",
                  marginRight: hovered ? "80px" : "32px",
                  transition: "margin-right 500ms cubic-bezier(0.25,1,0.5,1)",
                }}
              >
                Be the next
              </span>

              <div className="relative flex items-center justify-center w-14 h-14">
                {/* Solid black circle */}
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
                      transform: hovered ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 500ms cubic-bezier(0.25,1,0.5,1)",
                    }}
                  >
                    <path d="M2 12h20" />
                    <path d="M15 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Drawing ring */}
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
                      strokeDashoffset: hovered ? 0 : 164,
                      transition:
                        "stroke-dashoffset 800ms 100ms cubic-bezier(0.25,1,0.5,1)",
                    }}
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* ── FOOTER SECTION ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* Local noise grain overlay for the footer */}
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
            {/* Top Row: Let's build... and Work together */}
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
                  textTransform: "none",
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
                  Work togheter
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

            {/* Links Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr 1fr",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {/* Column 1: SOCIAL */}
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
                  <a
                    href="#"
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Linkedin
                  </a>
                  <a
                    href="#"
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Instagram
                  </a>
                </div>
              </div>

              {/* Column 2: LOUD */}
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
                  Innosphere
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

              {/* Column 3: CONTACT */}
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
                  {["Contact Us"].map((item) => (
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
            </div>

            {/* Bottom Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr 1fr",
              }}
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
                Innosphere digital - a company which turns complexity into
                elegance.
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
