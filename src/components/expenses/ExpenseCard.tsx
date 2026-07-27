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
    <article className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <ReceiptText size={21} />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-[#333333]">
              {expense.category}
            </h3>

            <p className="mt-1 truncate text-sm text-muted-foreground">
              {expense.description ||
                "No description provided"}
            </p>
          </div>
        </div>

        <p className="shrink-0 text-lg font-bold text-[#333333]">
          {formatCurrency(expense.amount)}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#FBFAF5] px-3 py-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4 text-[#6B8E23]" />

        <span>
          {formatExpenseDate(expense.date)}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <Link
          href={`/expenses/edit/${expense.id}`}
          aria-disabled={deleting}
          className={`inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium transition hover:bg-accent ${
            deleting
              ? "pointer-events-none opacity-50"
              : ""
          }`}
        >
          <Edit3 className="mr-2 h-4 w-4" />
          Edit
        </Link>

        <Button
          type="button"
          variant="destructive"
          size="sm"
          disabled={deleting}
          onClick={() => onDelete(expense)}
        >
          {deleting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}

          {deleting ? "Deleting" : "Delete"}
        </Button>
      </div>
    </article>
  );
}