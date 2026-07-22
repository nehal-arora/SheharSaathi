"use client";

import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div className="rounded-[32px] border border-[#E6E2D6] bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur md:p-10">

      {children}

    </div>
  );
}