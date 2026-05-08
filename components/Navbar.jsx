"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

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

    return () => {
      clearInterval(interval);
      clearTimeout(showTimer);
    };
  }, []);

  const navLinks = ["Think.", "Design.", "Develop.", "Manifesto."];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-[100] h-[60px] flex justify-center bg-transparent transition-all duration-1000 ease-in-out",
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
      )}
      style={{ transitionDelay: "900ms" }}
    >
      <div className="w-full max-w-[1440px] px-[40px] flex items-center justify-between">
        {/* LEFT — Logo block */}
        <div className="flex items-center gap-[10px] whitespace-nowrap">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
            {navLinks.map((link) => (
              <li
                key={link}
                className="relative flex items-center justify-center"
              >
                <Link
                  href="#"
                  className="relative text-[13px] font-[400] no-underline"
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.05em",
                    color: "var(--text-nav)",
                    transition: "color 300ms ease",
                  }}
                >
                  <span className="relative z-10 hover:text-white transition-colors">
                    {link}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT */}
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
  );
}
