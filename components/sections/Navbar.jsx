"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ScrambledText from "@/components/ui/ScrambledText";

// Circumference of ring r=26: 2π×26 ≈ 163.36
const RING_R = 26;
const RING_C = 2 * Math.PI * RING_R;
const RING_DRAW_MS = 800;
const RING_PAUSE_MS = 100;
const RING_DISSOLVE_MS = 200;

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
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
  );
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
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
  );
}

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Controls whether the "MENU" label is visible (fades out after load)
  const [menuLabelVisible, setMenuLabelVisible] = useState(true);
  const [isBurgerHovered, setIsBurgerHovered] = useState(false);

  // Ring states
  const [thinkRingState, setThinkRingState] = useState("idle");
  const [designRingState, setDesignRingState] = useState("idle");
  const [developRingState, setDevelopRingState] = useState("idle");
  const [manifestoRingState, setManifestoRingState] = useState("idle");

  const thinkTimerRef = useRef(null);
  const thinkDissolveTimerRef = useRef(null);
  const designTimerRef = useRef(null);
  const designDissolveTimerRef = useRef(null);
  const developTimerRef = useRef(null);
  const developDissolveTimerRef = useRef(null);
  const manifestoTimerRef = useRef(null);
  const manifestoDissolveTimerRef = useRef(null);

  const [forceHide, setForceHide] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 0);
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

    // After the navbar appears (~1.0s), show MENU with ScrambledText, then fade out smoothly around 2.6s
    const menuLabelTimer = setTimeout(() => setMenuLabelVisible(false), 2600);

    const handleHideNav = (e) => {
      setForceHide(e.detail.hidden);
    };
    document.addEventListener("hide-nav", handleHideNav);

    return () => {
      clearTimeout(mountTimer);
      clearInterval(interval);
      clearTimeout(showTimer);
      clearTimeout(menuLabelTimer);
      document.removeEventListener("hide-nav", handleHideNav);
    };
  }, []);

  // Close mobile menu when phase changes (user navigated)
  useEffect(() => {
    if (phase > 0) {
      const closeTimer = setTimeout(() => setMobileMenuOpen(false), 0);
      return () => clearTimeout(closeTimer);
    }
  }, [phase]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // ── Ring animation helpers ──
  function startRing(setState, timerRef, dissolveTimerRef, onComplete) {
    setState("drawing");
    timerRef.current = setTimeout(() => {
      dissolveTimerRef.current = setTimeout(() => {
        setState("dissolving");
        if (onComplete) onComplete();
        setTimeout(() => setState("idle"), RING_DISSOLVE_MS + 50);
      }, RING_PAUSE_MS);
    }, RING_DRAW_MS);
  }

  function cancelRing(setState, timerRef, dissolveTimerRef) {
    clearTimeout(timerRef.current);
    clearTimeout(dissolveTimerRef.current);
    setState("idle");
  }

  // Think ring
  useEffect(() => {
    if (phase === 1) {
      startRing(
        setThinkRingState,
        thinkTimerRef,
        thinkDissolveTimerRef,
        onRingComplete,
      );
    } else {
      cancelRing(setThinkRingState, thinkTimerRef, thinkDissolveTimerRef);
    }
    return () =>
      cancelRing(setThinkRingState, thinkTimerRef, thinkDissolveTimerRef);
  }, [phase]);

  // Design ring
  useEffect(() => {
    if (phase === 4) {
      startRing(
        setDesignRingState,
        designTimerRef,
        designDissolveTimerRef,
        onDesignRingComplete,
      );
    } else {
      cancelRing(setDesignRingState, designTimerRef, designDissolveTimerRef);
    }
    return () =>
      cancelRing(setDesignRingState, designTimerRef, designDissolveTimerRef);
  }, [phase]);

  // Develop ring
  useEffect(() => {
    if (phase === 7) {
      startRing(
        setDevelopRingState,
        developTimerRef,
        developDissolveTimerRef,
        onDevelopRingComplete,
      );
    } else {
      cancelRing(setDevelopRingState, developTimerRef, developDissolveTimerRef);
    }
    return () =>
      cancelRing(setDevelopRingState, developTimerRef, developDissolveTimerRef);
  }, [phase]);

  // Manifesto ring
  useEffect(() => {
    if (phase === 10) {
      startRing(
        setManifestoRingState,
        manifestoTimerRef,
        manifestoDissolveTimerRef,
        onManifestoRingComplete,
      );
    } else {
      cancelRing(
        setManifestoRingState,
        manifestoTimerRef,
        manifestoDissolveTimerRef,
      );
    }
    return () =>
      cancelRing(
        setManifestoRingState,
        manifestoTimerRef,
        manifestoDissolveTimerRef,
      );
  }, [phase]);

  const isThinkActive = phase >= 1 && phase <= 3;
  const isDesignActive = phase >= 4 && phase <= 6;
  const isDevelopActive = phase >= 7 && phase <= 9;
  const isManifestoActive = phase >= 10 && phase <= 12;
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

  // ── Mobile nav link tap handler — triggers the ring animation directly ──
  const handleMobileTap = useCallback(
    (link) => {
      if (link === "Think.") onThinkHoverStart?.();
      if (link === "Design.") onDesignHoverStart?.();
      if (link === "Develop.") onDevelopHoverStart?.();
      if (link === "Manifesto.") onManifestoHoverStart?.();
      setMobileMenuOpen(false);
    },
    [
      onThinkHoverStart,
      onDesignHoverStart,
      onDevelopHoverStart,
      onManifestoHoverStart,
    ],
  );

  const navLinks = [
    {
      label: "Think.",
      isActive: isThinkActive,
      showRing: showThinkRing,
      ringState: thinkRingState,
      onStart: onThinkHoverStart,
      onEnd: onThinkHoverEnd,
    },
    {
      label: "Design.",
      isActive: isDesignActive,
      showRing: showDesignRing,
      ringState: designRingState,
      onStart: onDesignHoverStart,
      onEnd: onDesignHoverEnd,
    },
    {
      label: "Develop.",
      isActive: isDevelopActive,
      showRing: showDevelopRing,
      ringState: developRingState,
      onStart: onDevelopHoverStart,
      onEnd: onDevelopHoverEnd,
    },
    {
      label: "Manifesto.",
      isActive: isManifestoActive,
      showRing: showManifestoRing,
      ringState: manifestoRingState,
      onStart: onManifestoHoverStart,
      onEnd: onManifestoHoverEnd,
    },
  ];

  const isDaytime =
    mounted && new Date().getHours() >= 6 && new Date().getHours() < 18;

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
        @keyframes mobileMenuSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[100] h-[56px] md:h-[60px] flex justify-center bg-transparent transition-all duration-1000 ease-in-out",
          show && !forceHide
            ? "opacity-100 translate-y-0"
            : forceHide
              ? "opacity-0 -translate-y-full"
              : "opacity-0 -translate-y-4",
        )}
        style={{ transitionDelay: "900ms" }}
      >
        <div className="w-full max-w-[1440px] px-4 sm:px-6 md:px-10 flex items-center justify-between">
          {/* LEFT — Logo */}
          <div className="flex items-center gap-[10px] whitespace-nowrap flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
              Imppeccables
            </span>
            <div className="hidden sm:block w-px h-4 bg-white/15 flex-shrink-0" />
            <span
              className="hidden sm:block"
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

          {/* CENTER — Desktop Nav links */}
          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex items-center gap-[32px] flex-nowrap whitespace-nowrap list-none m-0 p-0 relative z-50 pointer-events-auto">
              {navLinks.map(
                ({ label, showRing, ringState, onStart, onEnd }) => (
                  <li
                    key={label}
                    className="relative flex items-center justify-center"
                  >
                    {showRing && renderRing(ringState)}
                    <Link
                      href="#"
                      className="relative text-[13px] font-[400] no-underline flex items-center justify-center"
                      style={{
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.05em",
                        color: "var(--text-nav)",
                        transition: "opacity 300ms ease",
                        opacity: getLinkOpacity(label),
                        willChange: "opacity",
                        pointerEvents: "auto",
                      }}
                      onMouseEnter={onStart}
                      onMouseLeave={onEnd}
                    >
                      <span className="relative z-10 hover:text-white transition-colors">
                        {label}
                      </span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* RIGHT — Time + sun/moon (mobile & desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-2 sm:gap-[8px] whitespace-nowrap flex-shrink-0">

            {/* ── Time display — desktop: always visible, mobile: visible alongside icon ── */}
            <span
              className="hidden sm:block"
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

            {/* ── Sun/Moon + time on mobile (compact pill) ── */}
            <div
              className="md:hidden flex items-center gap-[6px] px-[8px] py-[5px] rounded-full border border-white/10"
              suppressHydrationWarning
            >
              {mounted && (isDaytime ? <SunIcon /> : <MoonIcon />)}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 300,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.55)",
                }}
                suppressHydrationWarning
              >
                {mounted ? time : ""}
              </span>
            </div>

            {/* ── Day/Night toggle button — desktop only ── */}
            <button
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border)] bg-transparent hover:border-[var(--border-hover)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDaytime ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* ── Mobile hamburger — replicate ownitt.fr style: pill with ScrambledText MENU + two bars (upper long, lower short) ── */}
            <button
              id="mobile-menu-toggle"
              className={cn(
                "md:hidden flex items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md active:scale-95 transition-all duration-500 overflow-hidden",
                (menuLabelVisible || isBurgerHovered) && !mobileMenuOpen
                  ? "px-3.5 h-[36px]"
                  : "w-[44px] h-[36px] px-0",
              )}
              style={{
                transition:
                  "width 500ms cubic-bezier(0.16, 1, 0.3, 1), padding 500ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease, background-color 300ms ease",
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onMouseEnter={() => setIsBurgerHovered(true)}
              onMouseLeave={() => setIsBurgerHovered(false)}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {/* "MENU" label — animated via ScrambledText, smoothly collapses and fades out */}
              <div
                className="overflow-hidden flex items-center"
                style={{
                  maxWidth:
                    (menuLabelVisible || isBurgerHovered) && !mobileMenuOpen
                      ? "52px"
                      : "0px",
                  opacity:
                    (menuLabelVisible || isBurgerHovered) && !mobileMenuOpen
                      ? 1
                      : 0,
                  marginRight:
                    (menuLabelVisible || isBurgerHovered) && !mobileMenuOpen
                      ? "8px"
                      : "0px",
                  transition:
                    "max-width 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease, margin-right 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  pointerEvents: "none",
                }}
              >
                <ScrambledText
                  delay={0.6}
                  duration={0.7}
                  speed={0.4}
                  scrambleChars=".:/<>-_=+*"
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/85 whitespace-nowrap"
                >
                  MENU
                </ScrambledText>
              </div>

              {/* Two-bar hamburger icon matching ownitt.fr — upper bar is long, lower bar is shorter */}
              <div className="relative flex flex-col items-center justify-center gap-[5px] w-[20px] h-[14px] flex-shrink-0">
                {/* Upper bar — long */}
                <span
                  className="block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center"
                  style={{
                    width: mobileMenuOpen ? "18px" : "20px",
                    transform: mobileMenuOpen
                      ? "translateY(3.25px) rotate(45deg)"
                      : "translateY(0) rotate(0deg)",
                  }}
                />
                {/* Lower bar — shorter (expands on hover or transforms into X on open) */}
                <span
                  className="block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center"
                  style={{
                    width: mobileMenuOpen
                      ? "18px"
                      : isBurgerHovered
                        ? "20px"
                        : "13px",
                    transform: mobileMenuOpen
                      ? "translateY(-3.25px) rotate(-45deg)"
                      : "translateY(0) rotate(0deg)",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[90] flex flex-col pt-[56px]"
          style={{ animation: "mobileMenuSlideIn 200ms ease forwards" }}
        >
          {/* Backdrop — tap outside to close */}
          <div
            className="absolute inset-0 bg-[#07070E]/96 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu nav links only — no extra dividers or metadata */}
          <nav
            className="relative z-10 flex flex-col px-6 pt-6 pb-12"
            aria-label="Mobile navigation"
          >
            {navLinks.map(({ label, isActive }) => (
              <button
                key={label}
                className="w-full text-left py-[18px] border-b border-white/8 last:border-0 flex items-center justify-between group active:opacity-60 transition-opacity duration-150"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "20px",
                  letterSpacing: "0.04em",
                  color: isActive ? "white" : "var(--text-nav)",
                }}
                onClick={() => handleMobileTap(label)}
              >
                <span>{label}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-30 group-active:opacity-80 transition-opacity duration-150"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
