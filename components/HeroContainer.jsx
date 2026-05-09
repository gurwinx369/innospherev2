"use client";

import { useState, useCallback, useRef } from "react";
import ColorBends from "@/components/BgLines";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ThinkSection from "@/components/ThinkSection";
import DesignSection from "@/components/DesignSection";
import DevelopSection from "@/components/DevelopSection";
import ManifestoSection from "@/components/ManifestoSection";

// phase:
//   0 = default / hero
//   1 = think hover / ring drawing
//   2 = think transitioning
//   3 = think section active
//   4 = design hover / ring drawing
//   5 = design transitioning
//   6 = design section active
//   7 = develop hover / ring drawing
//   8 = develop transitioning
//   9 = develop section active
//  10 = manifesto hover / ring drawing
//  11 = manifesto transitioning
//  12 = manifesto section active

const BG_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 0,
  willChange: "opacity, transform",
};

export default function HeroContainer() {
  const [phase, setPhase] = useState(0);
  const phase2TimerRef = useRef(null);
  const phase5TimerRef = useRef(null);
  const phase8TimerRef = useRef(null);
  const phase11TimerRef = useRef(null);

  // ── Think hover handlers ──
  const handleThinkHoverStart = useCallback(() => {
    if (phase === 0) setPhase(1);
  }, [phase]);

  const handleThinkHoverEnd = useCallback(() => {
    if (phase === 1) setPhase(0);
  }, [phase]);

  const handleRingComplete = useCallback(() => {
    setPhase(2);
    clearTimeout(phase2TimerRef.current);
    phase2TimerRef.current = setTimeout(() => setPhase(3), 700);
  }, []);

  // ── Design hover handlers ──
  const handleDesignHoverStart = useCallback(() => {
    if (phase === 0) setPhase(4);
  }, [phase]);

  const handleDesignHoverEnd = useCallback(() => {
    if (phase === 4) setPhase(0);
  }, [phase]);

  const handleDesignRingComplete = useCallback(() => {
    setPhase(5);
    clearTimeout(phase5TimerRef.current);
    phase5TimerRef.current = setTimeout(() => setPhase(6), 700);
  }, []);

  // ── Develop hover handlers ──
  const handleDevelopHoverStart = useCallback(() => {
    if (phase === 0) setPhase(7);
  }, [phase]);

  const handleDevelopHoverEnd = useCallback(() => {
    if (phase === 7) setPhase(0);
  }, [phase]);

  const handleDevelopRingComplete = useCallback(() => {
    setPhase(8);
    clearTimeout(phase8TimerRef.current);
    phase8TimerRef.current = setTimeout(() => setPhase(9), 700);
  }, []);

  // ── Manifesto hover handlers ──
  const handleManifestoHoverStart = useCallback(() => {
    if (phase === 0) setPhase(10);
  }, [phase]);

  const handleManifestoHoverEnd = useCallback(() => {
    if (phase === 10) setPhase(0);
  }, [phase]);

  const handleManifestoRingComplete = useCallback(() => {
    setPhase(11);
    clearTimeout(phase11TimerRef.current);
    phase11TimerRef.current = setTimeout(() => setPhase(12), 700);
  }, []);

  // ── Opacity / transform derivations ──
  const isThinkPhase = phase >= 1 && phase <= 3;
  const isDesignPhase = phase >= 4 && phase <= 6;
  const isDevelopPhase = phase >= 7 && phase <= 9;
  const isManifestoPhase = phase >= 10 && phase <= 12;

  // Default BG fades out once we commit to any section
  const defaultBgOpacity =
    (phase >= 2 && phase <= 3) ||
    (phase >= 5 && phase <= 6) ||
    (phase >= 8 && phase <= 9) ||
    phase >= 11
      ? 0
      : 1;
  const defaultBgScale =
    phase === 1 || phase === 4 || phase === 7 || phase === 10
      ? "scale(1.08)"
      : "scale(1)";

  const thinkBgOpacity =
    phase === 0 ? 0 : phase === 1 ? 0.45 : phase >= 2 && phase <= 3 ? 1 : 0;
  const designBgOpacity =
    phase < 4 ? 0 : phase === 4 ? 0.45 : phase >= 5 && phase <= 6 ? 1 : 0;
  const developBgOpacity =
    phase < 7 ? 0 : phase === 7 ? 0.45 : phase >= 8 && phase <= 9 ? 1 : 0;
  const manifestoBgOpacity =
    phase < 10 ? 0 : phase === 10 ? 0.45 : phase >= 11 && phase <= 12 ? 1 : 0;

  const heroOpacity =
    phase === 0
      ? 1
      : phase === 1 || phase === 4 || phase === 7 || phase === 10
        ? 0.3
        : 0;

  return (
    <>
      {/* ── DEFAULT BACKGROUND (dark liquid ColorBends) ── */}
      <div
        style={{
          ...BG_STYLE,
          opacity: defaultBgOpacity,
          transform: defaultBgScale,
          transition: "opacity 500ms ease, transform 800ms ease-in-out",
        }}
      >
        <ColorBends
          colors={["#1452b8", "#1e46a0"]}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.15}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          className="w-full h-full"
        />
      </div>

      {/* ── THINK BACKGROUND (warm terracotta ColorBends) ── */}
      <div
        style={{
          ...BG_STYLE,
          opacity: thinkBgOpacity,
          transition: "opacity 640ms ease",
          pointerEvents: "none",
        }}
      >
        <ColorBends
          colors={["#C0533A", "#8B3520", "#4A1A0D", "#7A2D1E"]}
          speed={0.15}
          scale={1.1}
          frequency={0.85}
          warpStrength={1.4}
          mouseInfluence={0.6}
          parallax={0.3}
          noise={0.08}
          iterations={2}
          intensity={1.2}
          bandWidth={5}
          rotation={45}
          className="w-full h-full"
        />
      </div>

      {/* ── DESIGN BACKGROUND (violet/indigo ColorBends) ── */}
      <div
        style={{
          ...BG_STYLE,
          opacity: designBgOpacity,
          transition: "opacity 640ms ease",
          pointerEvents: "none",
        }}
      >
        <ColorBends
          colors={["#4c1d95", "#6d28d9", "#1e1b4b", "#312e81"]}
          speed={0.15}
          scale={1.1}
          frequency={0.85}
          warpStrength={1.2}
          mouseInfluence={0.6}
          parallax={0.3}
          noise={0.08}
          iterations={2}
          intensity={1.2}
          bandWidth={5}
          rotation={-45}
          className="w-full h-full"
        />
      </div>

      {/* ── DEVELOP BACKGROUND (dark emerald/teal ColorBends) ── */}
      <div
        style={{
          ...BG_STYLE,
          opacity: developBgOpacity,
          transition: "opacity 640ms ease",
          pointerEvents: "none",
        }}
      >
        <ColorBends
          colors={["#064e3b", "#065f46", "#022c22", "#134e4a"]}
          speed={0.15}
          scale={1.1}
          frequency={0.9}
          warpStrength={1.3}
          mouseInfluence={0.6}
          parallax={0.3}
          noise={0.08}
          iterations={2}
          intensity={1.2}
          bandWidth={5}
          rotation={15}
          className="w-full h-full"
        />
      </div>

      {/* ── MANIFESTO BACKGROUND (deep indigo/cobalt ColorBends) ── */}
      <div
        style={{
          ...BG_STYLE,
          opacity: manifestoBgOpacity,
          transition: "opacity 640ms ease",
          pointerEvents: "none",
        }}
      >
        <ColorBends
          colors={["#0f0c29", "#1a1040", "#302b63", "#24243e"]}
          speed={0.12}
          scale={1.1}
          frequency={0.8}
          warpStrength={1.1}
          mouseInfluence={0.5}
          parallax={0.3}
          noise={0.06}
          iterations={2}
          intensity={1.1}
          bandWidth={5}
          rotation={-20}
          className="w-full h-full"
        />
      </div>

      {/* ── NOISE GRAIN OVERLAY ── */}
      <div
        style={{
          ...BG_STYLE,
          zIndex: 1,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ── MAIN ── */}
      <main
        className="relative w-full h-screen"
        style={{ background: "transparent" }}
      >
        <Navbar
          phase={phase}
          onThinkHoverStart={handleThinkHoverStart}
          onThinkHoverEnd={handleThinkHoverEnd}
          onRingComplete={handleRingComplete}
          onDesignHoverStart={handleDesignHoverStart}
          onDesignHoverEnd={handleDesignHoverEnd}
          onDesignRingComplete={handleDesignRingComplete}
          onDevelopHoverStart={handleDevelopHoverStart}
          onDevelopHoverEnd={handleDevelopHoverEnd}
          onDevelopRingComplete={handleDevelopRingComplete}
          onManifestoHoverStart={handleManifestoHoverStart}
          onManifestoHoverEnd={handleManifestoHoverEnd}
          onManifestoRingComplete={handleManifestoRingComplete}
        />

        {/* Hero content wrapper */}
        <div
          style={{
            opacity: heroOpacity,
            transform: phase >= 2 ? "translateY(-12px)" : "translateY(0)",
            transition: "opacity 600ms ease, transform 300ms ease",
            willChange: "opacity, transform",
            pointerEvents: phase >= 2 ? "none" : "auto",
          }}
        >
          <HeroSection />
        </div>

        {/* Think section — mounts at phase 3 */}
        {phase === 3 && <ThinkSection />}

        {/* Design section — mounts at phase 6 */}
        {phase === 6 && <DesignSection />}

        {/* Develop section — mounts at phase 9 */}
        {phase >= 9 && phase < 12 && <DevelopSection />}

        {/* Manifesto section — mounts at phase 12 */}
        {phase >= 12 && <ManifestoSection />}
      </main>
    </>
  );
}
