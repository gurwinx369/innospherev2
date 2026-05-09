"use client";

import BlurText from "./BlurText";
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
    <div className="relative w-[100vw] h-[100vh] overflow-hidden pointer-events-none">
      {/* HERO TEXT BLOCK (centered on screen) */}
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center z-10 pointer-events-auto flex flex-col items-center">
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

        {/* Main headline */}
        <div className="whitespace-nowrap flex justify-center">
          <BlurText
            text="We make digital experiences."
            animateBy="words"
            direction="top"
            delay={2000}
            className="font-[var(--font-courier)] text-[clamp(2.5rem,5vw,4.5rem)] font-[400] tracking-[0.04em] text-white opacity-100"
          />
        </div>
      </div>

      {/* BOTTOM-LEFT CATEGORY LIST */}
      <ul
        className="absolute bottom-[60px] left-[40px] flex flex-col gap-[14px] z-10 pointer-events-auto items-start text-left"
        style={{
          opacity: showDelayed ? 0.85 : 0,
          transform: showDelayed ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 1000ms ease, transform 1000ms ease",
          transitionDelay: "700ms",
        }}
      >
        {services.map((service, idx) => (
          <li
            key={idx}
            className="text-white hover:text-[var(--text-nav)] transition-colors duration-250 cursor-default"
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

      {/* BOTTOM-RIGHT CTA BUTTON */}
      <button
        className="absolute bottom-[40px] right-[40px] z-10 bg-transparent rounded-full transition-all duration-300 pointer-events-auto flex items-center justify-center hover:shadow-[0_0_24px_rgba(124,58,237,0.3)]"
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
          transitionDelay: showDelayed ? "900ms" : "0ms", // entrance delay
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
    </div>
  );
}
