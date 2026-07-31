"use client";

import Link from "next/link";
import {
  CalendarDays,
  Edit3,
  Loader2,
  ReceiptText,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  formatCurrency,
  formatExpenseDate,
} from "@/features/expenses/utils/expense.utils";

import type { Expense } from "@/types/expenses";

interface ExpenseCardProps {
  expense: Expense;
  onDelete: (expense: Expense) => void;
  deleting?: boolean;
}

export default function ExpenseCard({
  expense,
  onDelete,
  deleting = false,
}: ExpenseCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-[#205C46]/35 bg-[#0D211B] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A34F]/30 hover:shadow-[0_26px_70px_rgba(0,0,0,0.3)]">
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D4A34F]/8 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
              <ReceiptText size={22} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                Expense category
              </p>

              <h3 className="mt-1 truncate text-lg font-bold text-[#FBFAF7]">
                {expense.category}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#9EAEA7]">
                {expense.description ||
                  "No description provided"}
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-[18px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-3 text-right">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9EAEA7]">
              Amount
            </p>

            <p className="mt-1 text-lg font-bold text-[#F0C86A]">
              {formatCurrency(expense.amount)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-[18px] border border-[#205C46]/30 bg-[#10271F] px-4 py-3 text-sm text-[#B8C5BF]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#205C46]/20 text-[#F0C86A]">
            <CalendarDays className="h-4 w-4" />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7F9189]">
              Expense date
            </p>

            <p className="mt-0.5 font-semibold text-[#D6E0DB]">
              {formatExpenseDate(expense.date)}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href={`/expenses/edit/${expense.id}`}
            aria-disabled={deleting}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#205C46]/45 bg-[#10271F] px-4 text-sm font-semibold text-[#D6E0DB] transition-all duration-200 hover:border-[#D4A34F]/35 hover:text-[#F0C86A] ${
              deleting
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </Link>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={deleting}
            onClick={() => onDelete(expense)}
            className="min-h-11 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 text-sm font-semibold text-red-300 hover:bg-red-400/15 hover:text-red-200"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}

            {deleting ? "Deleting" : "Delete"}
          </Button>
        </div>
      </div>
    </article>
  );
}