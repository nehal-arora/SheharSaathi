"use client";

import Link from "next/link";
import { Home, MapPin } from "lucide-react";

interface LogoProps {
  showTagline?: boolean;
  compact?: boolean;
}

export default function Logo({
  showTagline = true,
  compact = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="SheharSaathi home"
      className="group inline-flex min-w-0 items-center gap-3 rounded-xl outline-none transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
    >
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(107,142,35,0.22)] transition-transform duration-300 group-hover:-translate-y-0.5 ${
          compact
            ? "h-10 w-10 rounded-xl"
            : "h-11 w-11 rounded-[14px] sm:h-12 sm:w-12 sm:rounded-2xl"
        }`}
      >
        <MapPin
          aria-hidden="true"
          className={`absolute opacity-35 ${
            compact ? "h-7 w-7" : "h-8 w-8"
          }`}
          strokeWidth={1.8}
        />

        <Home
          aria-hidden="true"
          className={`relative z-10 ${
            compact ? "h-4 w-4" : "h-[18px] w-[18px]"
          }`}
          strokeWidth={2.4}
        />

        <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white/15" />
        <span className="absolute -bottom-3 -left-2 h-8 w-8 rounded-full bg-black/5" />
      </div>

      <div className="min-w-0">
        <div className="flex items-baseline whitespace-nowrap text-xl font-extrabold tracking-[-0.04em] text-foreground sm:text-[22px]">
          <span className="font-[var(--font-hindi)]">शहर</span>

          <span className="font-[var(--font-manrope)] text-primary">
            Saathi
          </span>
        </div>

        {showTagline && !compact && (
          <p className="mt-1 hidden max-w-[220px] truncate text-[11px] font-medium tracking-[0.01em] text-muted-foreground xl:block">
            Making every new city feel like home
          </p>
        )}
      </div>
    </Link>
  );
}