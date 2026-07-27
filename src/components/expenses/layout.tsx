"use client";

import type { ReactNode } from "react";

import ExpenseNavigation from "@/components/expenses/ExpenseNavigation";

interface ExpensesLayoutProps {
  children: ReactNode;
}

export default function ExpensesLayout({
  children,
}: ExpensesLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FBFAF5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <ExpenseNavigation />
        </div>

        {children}
      </div>
    </div>
  );
}