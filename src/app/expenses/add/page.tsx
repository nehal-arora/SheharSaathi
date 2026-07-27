"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ExpenseForm from "@/components/expenses/ExpenseForm";

export default function AddExpensePage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/expenses"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6B8E23] transition hover:opacity-80"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Expenses
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-[#333333]">
          Add Expense
        </h1>

        <p className="mt-2 text-muted-foreground">
          Record a new expense to keep track of your monthly spending.
        </p>
      </div>

      <ExpenseForm mode="create" />
    </main>
  );
}