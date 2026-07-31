"use client";

import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#071512] px-6 py-12">

      {/* Golden Glow */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D4A34F]/10 blur-3xl" />

      {/* Green Glow */}
      <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#205C46]/20 blur-3xl" />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#123126]/30 blur-[140px]" />

      {/* Small Decorative Circle */}
      <div className="absolute right-16 top-24 h-24 w-24 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/5 backdrop-blur-sm" />

      {/* Small Decorative Circle */}
      <div className="absolute bottom-24 left-20 h-16 w-16 rounded-full border border-[#205C46]/30 bg-[#205C46]/10 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl">
        {children}
      </div>
    </main>
  );
}