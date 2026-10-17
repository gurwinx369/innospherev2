"use client";

import { useState, useCallback, useRef } from "react";
import ColorBends from "@/components/ui/BgLines";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ThinkSection from "@/components/sections/ThinkSection";
import DesignSection from "@/components/sections/DesignSection";
import DevelopSection from "@/components/sections/DevelopSection";
import ManifestoSection from "@/components/sections/ManifestoSection";

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
  const [returnPhase, setReturnPhase] = useState(0);
  const phase2TimerRef = useRef(null);
  const phase5TimerRef = useRef(null);
  const phase8TimerRef = useRef(null);
  const phase11TimerRef = useRef(null);

  // ── Think hover handlers ──
  const handleThinkHoverStart = useCallback(() => {
    if (phase < 1 || phase > 3) {
      if ([0, 3, 6, 9, 12].includes(phase)) setReturnPhase(phase);
      setPhase(1);
    }
  }, [phase]);

  const handleThinkHoverEnd = useCallback(() => {
    if (phase === 1) setPhase(returnPhase);
  }, [phase, returnPhase]);

  const handleRingComplete = useCallback(() => {
    setPhase(2);
    clearTimeout(phase2TimerRef.current);
    phase2TimerRef.current = setTimeout(() => setPhase(3), 700);
  }, []);

  // ── Design hover handlers ──
  const handleDesignHoverStart = useCallback(() => {
    if (phase < 4 || phase > 6) {
      if ([0, 3, 6, 9, 12].includes(phase)) setReturnPhase(phase);
      setPhase(4);
    }
  }, [phase]);

  const handleDesignHoverEnd = useCallback(() => {
    if (phase === 4) setPhase(returnPhase);
  }, [phase, returnPhase]);

  const handleDesignRingComplete = useCallback(() => {
    setPhase(5);
    clearTimeout(phase5TimerRef.current);
    phase5TimerRef.current = setTimeout(() => setPhase(6), 700);
  }, []);

  // ── Develop hover handlers ──
  const handleDevelopHoverStart = useCallback(() => {
    if (phase < 7 || phase > 9) {
      if ([0, 3, 6, 9, 12].includes(phase)) setReturnPhase(phase);
      setPhase(7);
    }
  }, [phase]);

  const handleDevelopHoverEnd = useCallback(() => {
    if (phase === 7) setPhase(returnPhase);
  }, [phase, returnPhase]);

  const handleDevelopRingComplete = useCallback(() => {
    setPhase(8);
    clearTimeout(phase8TimerRef.current);
    phase8TimerRef.current = setTimeout(() => setPhase(9), 700);
  }, []);

  // ── Manifesto hover handlers ──
  const handleManifestoHoverStart = useCallback(() => {
    if (phase < 10 || phase > 12) {
      if ([0, 3, 6, 9, 12].includes(phase)) setReturnPhase(phase);
      setPhase(10);
    }
  }, [phase]);

  const handleManifestoHoverEnd = useCallback(() => {
    if (phase === 10) setPhase(returnPhase);
  }, [phase, returnPhase]);

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

  // The effective section to render components for during transitions/hovering
  const activeSectionPhase = [1, 4, 7, 10].includes(phase)
    ? returnPhase
    : phase;

  // Default BG fades out once we commit to any section
  const defaultBgOpacity =
    (activeSectionPhase >= 2 && activeSectionPhase <= 3) ||
    (activeSectionPhase >= 5 && activeSectionPhase <= 6) ||
    (activeSectionPhase >= 8 && activeSectionPhase <= 9) ||
    activeSectionPhase >= 11
      ? 0
      : 1;
  const defaultBgScale =
    phase === 1 || phase === 4 || phase === 7 || phase === 10
      ? "scale(1.08)"
      : "scale(1)";

  const getBgOpacity = (sectionPhaseStart) => {
    const isActivePhase =
      phase >= sectionPhaseStart + 1 && phase <= sectionPhaseStart + 2;
    if (isActivePhase) return 1;
    const isHovering = phase === sectionPhaseStart;
    if (isHovering) return 0.45;
    const isActiveSection =
      activeSectionPhase >= sectionPhaseStart + 1 &&
      activeSectionPhase <= sectionPhaseStart + 2;
    if (isActiveSection) return 1;
    return 0;
  };

  const getBgZIndex = (sectionPhaseStart) => {
    if (phase === sectionPhaseStart) return 2;
    const isActiveSection =
      activeSectionPhase >= sectionPhaseStart + 1 &&
      activeSectionPhase <= sectionPhaseStart + 2;
    if (isActiveSection) return 1;
    return 0;
  };

  const thinkBgOpacity = getBgOpacity(1);
  const designBgOpacity = getBgOpacity(4);
  const developBgOpacity = getBgOpacity(7);
  const manifestoBgOpacity = getBgOpacity(10);

  const heroOpacity = activeSectionPhase === 0 ? (phase === 0 ? 1 : 0.3) : 0;

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
          zIndex: getBgZIndex(1),
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
          zIndex: getBgZIndex(4),
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
          zIndex: getBgZIndex(7),
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
          zIndex: getBgZIndex(10),
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
            transform:
              activeSectionPhase >= 2 ? "translateY(-12px)" : "translateY(0)",
            transition: "opacity 600ms ease, transform 300ms ease",
            willChange: "opacity, transform",
            pointerEvents: activeSectionPhase >= 2 ? "none" : "auto",
          }}
        >
          <HeroSection />
        </div>

        {/* Think section — mounts at phase 3 */}
        {activeSectionPhase === 3 && <ThinkSection />}

        {/* Design section — mounts at phase 6 */}
        {activeSectionPhase === 6 && <DesignSection />}

        {/* Develop section — mounts at phase 9 */}
        {activeSectionPhase >= 9 && activeSectionPhase < 12 && (
          <DevelopSection />
        )}

        {/* Manifesto section — mounts at phase 12 */}
        {activeSectionPhase >= 12 && <ManifestoSection />}
      </main>
    </>
  );
}
