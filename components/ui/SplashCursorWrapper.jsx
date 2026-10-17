"use client";

import dynamic from "next/dynamic";
import { useDeviceTier } from "@/hooks/useDeviceTier";

// Heavy WebGL fluid simulation — lazy-loaded and only rendered on FULL tier
const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), {
  ssr: false,
});

export default function SplashCursorWrapper() {
  const { tier, isTouch } = useDeviceTier();

  // Skip on MINIMAL/CORE and all touch devices (no cursor to follow)
  if (tier !== "FULL" || isTouch) return null;

  return (
    <SplashCursor
      DENSITY_DISSIPATION={3.5}
      VELOCITY_DISSIPATION={2}
      PRESSURE={0.1}
      CURL={3}
      SPLAT_RADIUS={0.2}
      SPLAT_FORCE={6000}
      COLOR_UPDATE_SPEED={10}
      SHADING
      RAINBOW_MODE={false}
      COLOR="#0184fa"
    />
  );
}
