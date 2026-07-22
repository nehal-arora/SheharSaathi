"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FBFAF5] px-6 py-12">

      {/* Background Blur 1 */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#EEF2E4] blur-3xl opacity-70" />

      {/* Background Blur 2 */}
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#D6C7A1]/40 blur-3xl" />

      {/* Background Blur 3 */}
      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-50 blur-3xl" />

      {/* Authentication Card */}
      <div className="relative z-10 w-full max-w-lg">
        {children}
      </div>

    </main>
  );
}