"use client";

import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#071512] text-[#FBFAF7]">
      <main className="w-full">{children}</main>
    </div>
  );
}