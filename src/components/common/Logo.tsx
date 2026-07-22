"use client";

import Link from "next/link";

interface LogoProps {
  showTagline?: boolean;
}

export default function Logo({
  showTagline = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-90"
    >
      {/* Logo Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B8E23] text-2xl shadow-md">
        🏡
      </div>

      <div className="flex flex-col leading-none">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#333333]">
          <span className="font-[var(--font-hindi)]">
            शहर
          </span>

          <span className="font-[var(--font-manrope)] text-[#6B8E23]">
            Saathi
          </span>
        </h1>

        {showTagline && (
          <p className="mt-1 text-xs text-gray-500">
            Making Every New City Feel Like Home
          </p>
        )}
      </div>
    </Link>
  );
}