"use client";

import Link from "next/link";
import {
  Plus,
  ReceiptText,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface ExpenseEmptyStateProps {
  hasFilters?: boolean;
  onReset?: () => void;
}

export default function ExpenseEmptyState({
  hasFilters = false,
  onReset,
}: ExpenseEmptyStateProps) {
  return (
    <section className="relative flex min-h-[430px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/25 bg-[#0D211B] px-8 py-12 text-center shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
      {/* Glow */}

      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

      <div className="relative flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
          <ReceiptText size={36} />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.20em] text-[#D4A34F]">
          Expense Manager
        </p>

        <h2 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
          {hasFilters
            ? "No matching expenses"
            : "No expenses added yet"}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-[#9EAEA7] sm:text-base">
          {hasFilters
            ? "No expenses match your selected filters. Try modifying or clearing your filters to discover more records."
            : "Start recording your daily expenses to monitor spending, analyze trends, and stay within your monthly budget."}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {hasFilters && onReset && (
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              className="min-h-12 rounded-2xl border-[#D4A34F]/25 bg-[#10271F] px-6 font-semibold text-[#F0C86A] hover:bg-[#D4A34F]/10 hover:text-[#F0C86A]"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          )}

          <Link
            href="/expenses/add"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-6 font-bold text-[#071512] shadow-[0_10px_25px_rgba(212,163,79,0.25)] transition hover:-translate-y-0.5 hover:bg-[#F0C86A]"
          >
            <Plus size={18} />
            Add Expense
          </Link>
        </div>
      </div>
    </section>
  );
}