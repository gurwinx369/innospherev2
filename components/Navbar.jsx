"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Circumference of ring r=26: 2π×26 ≈ 163.36
const RING_R = 26;
const RING_C = 2 * Math.PI * RING_R;
const RING_DRAW_MS = 800;
const RING_PAUSE_MS = 100;
const RING_DISSOLVE_MS = 200;

export default function Navbar({
  phase = 0,
  onThinkHoverStart,
  onThinkHoverEnd,
  onRingComplete,
  onDesignHoverStart,
  onDesignHoverEnd,
  onDesignRingComplete,
  onDevelopHoverStart,
  onDevelopHoverEnd,
  onDevelopRingComplete,
  onManifestoHoverStart,
  onManifestoHoverEnd,
  onManifestoRingComplete,
}) {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  // Think ring state
  const [thinkRingState, setThinkRingState] = useState("idle");
  const thinkTimerRef = useRef(null);
  const thinkDissolveTimerRef = useRef(null);

  // Design ring state
  const [designRingState, setDesignRingState] = useState("idle");
  const designTimerRef = useRef(null);
  const designDissolveTimerRef = useRef(null);

  // Develop ring state
  const [developRingState, setDevelopRingState] = useState("idle");
  const developTimerRef = useRef(null);
  const developDissolveTimerRef = useRef(null);

  // Manifesto ring state
  const [manifestoRingState, setManifestoRingState] = useState("idle");
  const manifestoTimerRef = useRef(null);
  const manifestoDissolveTimerRef = useRef(null);

  const [forceHide, setForceHide] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    const showTimer = setTimeout(() => setShow(true), 100);

    const handleHideNav = (e) => {
      setForceHide(e.detail.hidden);
    };
    document.addEventListener("hide-nav", handleHideNav);

    return () => {
      clearInterval(interval);
      clearTimeout(showTimer);
      document.removeEventListener("hide-nav", handleHideNav);
    };
  }, []);

  // Think ring: phase 1 → draw, else cancel
  useEffect(() => {
    if (phase === 1) {
      setThinkRingState("drawing");
      thinkTimerRef.current = setTimeout(() => {
        thinkDissolveTimerRef.current = setTimeout(() => {
          setThinkRingState("dissolving");
          if (onRingComplete) onRingComplete();
          setTimeout(() => setThinkRingState("idle"), RING_DISSOLVE_MS + 50);
        }, RING_PAUSE_MS);
      }, RING_DRAW_MS);
    } else {
      clearTimeout(thinkTimerRef.current);
      clearTimeout(thinkDissolveTimerRef.current);
      setThinkRingState("idle");
    }
    return () => {
      clearTimeout(thinkTimerRef.current);
      clearTimeout(thinkDissolveTimerRef.current);
    };
  }, [phase]);

  // Design ring: phase 4 → draw, else cancel
  useEffect(() => {
    if (phase === 4) {
      setDesignRingState("drawing");
      designTimerRef.current = setTimeout(() => {
        designDissolveTimerRef.current = setTimeout(() => {
          setDesignRingState("dissolving");
          if (onDesignRingComplete) onDesignRingComplete();
          setTimeout(() => setDesignRingState("idle"), RING_DISSOLVE_MS + 50);
        }, RING_PAUSE_MS);
      }, RING_DRAW_MS);
    } else {
      clearTimeout(designTimerRef.current);
      clearTimeout(designDissolveTimerRef.current);
      setDesignRingState("idle");
    }
    return () => {
      clearTimeout(designTimerRef.current);
      clearTimeout(designDissolveTimerRef.current);
    };
  }, [phase]);

  // Develop ring: phase 7 → draw, else cancel
  useEffect(() => {
    if (phase === 7) {
      setDevelopRingState("drawing");
      developTimerRef.current = setTimeout(() => {
        developDissolveTimerRef.current = setTimeout(() => {
          setDevelopRingState("dissolving");
          if (onDevelopRingComplete) onDevelopRingComplete();
          setTimeout(() => setDevelopRingState("idle"), RING_DISSOLVE_MS + 50);
        }, RING_PAUSE_MS);
      }, RING_DRAW_MS);
    } else {
      clearTimeout(developTimerRef.current);
      clearTimeout(developDissolveTimerRef.current);
      setDevelopRingState("idle");
    }
    return () => {
      clearTimeout(developTimerRef.current);
      clearTimeout(developDissolveTimerRef.current);
    };
  }, [phase]);

  // Manifesto ring: phase 10 → draw, else cancel
  useEffect(() => {
    if (phase === 10) {
      setManifestoRingState("drawing");
      manifestoTimerRef.current = setTimeout(() => {
        manifestoDissolveTimerRef.current = setTimeout(() => {
          setManifestoRingState("dissolving");
          if (onManifestoRingComplete) onManifestoRingComplete();
          setTimeout(
            () => setManifestoRingState("idle"),
            RING_DISSOLVE_MS + 50,
          );
        }, RING_PAUSE_MS);
      }, RING_DRAW_MS);
    } else {
      clearTimeout(manifestoTimerRef.current);
      clearTimeout(manifestoDissolveTimerRef.current);
      setManifestoRingState("idle");
    }
    return () => {
      clearTimeout(manifestoTimerRef.current);
      clearTimeout(manifestoDissolveTimerRef.current);
    };
  }, [phase]);

  const navLinks = ["Think.", "Design.", "Develop.", "Manifesto."];
  const isThinkActive = phase === 1 || phase === 2 || phase === 3;
  const isDesignActive = phase === 4 || phase === 5 || phase === 6;
  const isDevelopActive = phase === 7 || phase === 8 || phase === 9;
  const isManifestoActive = phase === 10 || phase === 11 || phase === 12;
  const anyActive =
    isThinkActive || isDesignActive || isDevelopActive || isManifestoActive;

  const showThinkRing =
    thinkRingState === "drawing" || thinkRingState === "dissolving";
  const showDesignRing =
    designRingState === "drawing" || designRingState === "dissolving";
  const showDevelopRing =
    developRingState === "drawing" || developRingState === "dissolving";
  const showManifestoRing =
    manifestoRingState === "drawing" || manifestoRingState === "dissolving";

  function getLinkOpacity(link) {
    if (!anyActive) return 1;
    if (isThinkActive && link === "Think.") return 1;
    if (isDesignActive && link === "Design.") return 1;
    if (isDevelopActive && link === "Develop.") return 1;
    if (isManifestoActive && link === "Manifesto.") return 1;
    return 0.25;
  }

  function renderRing(ringState) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          animation:
            ringState === "dissolving"
              ? `ringDissolve ${RING_DISSOLVE_MS}ms ease-out forwards`
              : "none",
          willChange: "transform, opacity",
        }}
      >
        <svg width={64} height={64} viewBox="0 0 64 64" className="absolute">
          <circle
            cx={32}
            cy={32}
            r={RING_R}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray={RING_C}
            strokeDashoffset={ringState === "drawing" ? 0 : RING_C}
            strokeLinecap="round"
            style={{
              animation:
                ringState === "drawing"
                  ? `ringDraw ${RING_DRAW_MS}ms ease-in-out forwards`
                  : "none",
              transformOrigin: "32px 32px",
              transform: "rotate(-90deg)",
              willChange: "stroke-dashoffset",
            }}
          />
          {/* Arrow inside SVG coordinate space */}
          <text
            x={48}
            y={35}
            fill="white"
            fontSize="14"
            textAnchor="middle"
            style={{
              opacity: ringState === "drawing" ? 1 : 0,
              transition: "opacity 400ms ease",
              fontFamily: "var(--font-mono)",
              willChange: "opacity",
            }}
          >
            →
          </text>
        </svg>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes ringDraw {
          from { stroke-dashoffset: ${RING_C}; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ringDissolve {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(1.15); }
        }
      `}</style>

      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[100] h-[60px] flex justify-center bg-transparent transition-all duration-1000 ease-in-out",
          (show && !forceHide) ? "opacity-100 translate-y-0" : forceHide ? "opacity-0 -translate-y-full" : "opacity-0 -translate-y-4",
        )}
        style={{ transitionDelay: "900ms" }}
      >
        <div className="w-full max-w-[1440px] px-[40px] flex items-center justify-between">
          {/* LEFT — Logo */}
          <div className="flex items-center gap-[10px] whitespace-nowrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L2 13C2 18.52 6.39 23 12 23C17.61 23 22 18.52 22 13L22 7L12 2Z"
                fill="white"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-courier)",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              INNOSPHERE
            </span>
            <div className="w-px h-4 bg-white/15" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 300,
                letterSpacing: "0.04em",
                color: "var(--text-muted)",
              }}
            >
              Digital Product Company.
            </span>
          </div>

          {/* CENTER — Nav links */}
          <nav>
            <ul className="flex items-center gap-[32px] flex-nowrap whitespace-nowrap list-none m-0 p-0 relative z-50 pointer-events-auto">
              {navLinks.map((link) => {
                const isThink = link === "Think.";
                const isDesign = link === "Design.";
                const isDevelop = link === "Develop.";
                const isManifesto = link === "Manifesto.";

                return (
                  <li
                    key={link}
                    className="relative flex items-center justify-center"
                  >
                    {/* SVG ring — Think */}
                    {isThink && showThinkRing && renderRing(thinkRingState)}

                    {/* SVG ring — Design */}
                    {isDesign && showDesignRing && renderRing(designRingState)}

                    {/* SVG ring — Develop */}
                    {isDevelop &&
                      showDevelopRing &&
                      renderRing(developRingState)}

                    {/* SVG ring — Manifesto */}
                    {isManifesto &&
                      showManifestoRing &&
                      renderRing(manifestoRingState)}

                    <Link
                      href="#"
                      className="relative text-[13px] font-[400] no-underline flex items-center justify-center"
                      style={{
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.05em",
                        color: "var(--text-nav)",
                        transition: "opacity 300ms ease",
                        opacity: getLinkOpacity(link),
                        willChange: "opacity",
                        pointerEvents: "auto",
                      }}
                      onMouseEnter={() => {
                        if (isThink) onThinkHoverStart?.();
                        if (isDesign) onDesignHoverStart?.();
                        if (isDevelop) onDevelopHoverStart?.();
                        if (isManifesto) onManifestoHoverStart?.();
                      }}
                      onMouseLeave={() => {
                        if (isThink) onThinkHoverEnd?.();
                        if (isDesign) onDesignHoverEnd?.();
                        if (isDevelop) onDevelopHoverEnd?.();
                        if (isManifesto) onManifestoHoverEnd?.();
                      }}
                    >
                      <span className="relative z-10 hover:text-white transition-colors">
                        {link}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT — Clock */}
          <div className="flex items-center gap-[8px] whitespace-nowrap">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 300,
                letterSpacing: "0.06em",
                color: "var(--text-muted)",
              }}
              suppressHydrationWarning
            >
              {mounted ? time : ""}
            </span>
            <button className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border)] bg-transparent hover:border-[var(--border-hover)] transition-colors">
              {new Date().getHours() >= 6 && new Date().getHours() < 18 ? (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-60"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-60"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
