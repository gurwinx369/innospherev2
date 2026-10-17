"use client";

import { useState, useEffect } from "react";

/**
 * Detects device capability tier once per session.
 * FULL    — capable device, no reduced-motion pref, good connection.
 * CORE    — mid-range or unknown. CSS transitions only, no infinite loops or parallax.
 * MINIMAL — low-end, slow network, or prefers-reduced-motion. Instant state only.
 */
function getDeviceTier() {
  if (typeof window === "undefined") return "CORE";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return "MINIMAL";

  const memory = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const conn = navigator.connection;
  const saveData = conn?.saveData;
  const slowNetwork =
    conn?.effectiveType && ["slow-2g", "2g", "3g"].includes(conn.effectiveType);

  if (saveData || slowNetwork || (memory && memory <= 2) || (cores && cores <= 4)) {
    return "MINIMAL";
  }

  if ((memory && memory < 8) || (cores && cores < 8) || memory === undefined) {
    return "CORE";
  }

  return "FULL";
}

export function useDeviceTier() {
  const [tier, setTier] = useState("CORE");
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setTier(getDeviceTier());
    setIsMobile(window.innerWidth < 768);
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return { tier, isMobile, isTouch };
}
