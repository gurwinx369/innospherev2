"use client";

import BlurText from "@/components/ui/BlurText";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [showDelayed, setShowDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    "Artificial Intelligence",
    "Full stack engineering",
    "Mobile Apps",
    "Marketing",
  ];

  return (
    <div
      className="relative w-screen overflow-hidden pointer-events-none"
      style={{ height: "100dvh" }}
    >
      {/* HERO TEXT BLOCK — centered, full width with padding so text wraps safely */}
      {/* DESKTOP headline — centered, hidden on mobile */}
      <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-auto flex-col items-center w-full px-10">
        {/* Dot */}
        <div className="w-[8px] h-[8px] rounded-full bg-white mb-[8px]" />

        {/* Small label */}
        <div
          className="uppercase mb-[12px] opacity-70"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "white",
          }}
        >
          I • V PILLARS
        </div>

        {/* Main headline — allow wrapping on small screens */}
        <BlurText
          text="We make digital experiences."
          animateBy="words"
          direction="top"
          delay={2000}
          className="font-[var(--font-courier)] text-[clamp(2rem,7vw,4.5rem)] font-[400] tracking-[0.04em] text-white opacity-100 text-center leading-tight"
        />
      </div>

      {/* MOBILE: headline — bottom-left editorial layout */}
      <div
        className="sm:hidden absolute z-10 pointer-events-auto"
        style={{
          left: '24px',
          right: '24px',
          bottom: '130px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'white',
            textTransform: 'uppercase',
            marginBottom: '12px',
            opacity: 0.7,
          }}
        >
          I • V PILLARS
        </div>
        <BlurText
          text="We make digital experiences."
          animateBy="words"
          direction="top"
          delay={2000}
          className="font-[var(--font-courier)] text-[clamp(2rem,10vw,3.5rem)] font-[400] tracking-[0.01em] text-white opacity-100 text-left leading-[1.06]"
        />
      </div>

      {/* ── DESKTOP: bottom-left category list ── */}
      <ul
        className="hidden sm:flex absolute bottom-[60px] left-[40px] flex-col gap-[14px] z-10 pointer-events-auto items-start text-left"
        style={{
          opacity: showDelayed ? 0.85 : 0,
          transform: showDelayed ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 800ms ease, transform 800ms ease",
          transitionDelay: "700ms",
        }}
      >
        {services.map((service, idx) => (
          <li
            key={idx}
            className="text-white cursor-default"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {service}
          </li>
        ))}
      </ul>

      {/* ── DESKTOP: bottom-right CTA ── */}
      <button
        className="hidden sm:flex absolute bottom-[40px] right-[40px] z-10 bg-transparent rounded-full pointer-events-auto items-center justify-center hover:shadow-[0_0_24px_rgba(124,58,237,0.3)]"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          border: "1px solid white",
          padding: "10px 24px",
          color: "white",
          opacity: showDelayed ? 1 : 0,
          transform: showDelayed ? "translateY(0)" : "translateY(16px)",
          transition:
            "opacity 300ms ease, transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
          transitionDelay: showDelayed ? "900ms" : "0ms",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "white";
        }}
      >
        Book a free call
      </button>

      {/* ── MOBILE: split bottom layout — left services + right CTA ── */}
      <div
        className="sm:hidden absolute bottom-0 left-0 right-0 z-10 pointer-events-auto flex items-end justify-between px-6 pb-10"
        style={{
          opacity: showDelayed ? 1 : 0,
          transform: showDelayed ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 800ms ease, transform 800ms ease",
          transitionDelay: "700ms",
        }}
      >
        {/* LEFT: service list */}
        <ul className="flex flex-col gap-[8px] items-start text-left">
          {services.map((service, idx) => (
            <li
              key={idx}
              className="cursor-default flex items-center gap-2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <span
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "white",
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
              {service}
            </li>
          ))}
        </ul>

        {/* RIGHT: Contact us CTA button */}
        <button
          className="bg-transparent rounded-full active:scale-95 transition-all flex-shrink-0 hover:border-white"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            border: "1px solid rgba(255,255,255,0.6)",
            padding: "9px 20px",
            color: "white",
            letterSpacing: "0.04em",
          }}
        >
          Contact us
        </button>
      </div>
    </div>
  );
}
