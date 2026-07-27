"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import ExpenseForm from "@/components/expenses/ExpenseForm";

import { getExpenseById } from "@/features/expenses/services/expense.service";

import type { Expense } from "@/types/expenses";

export default function EditExpensePage() {
  const params = useParams<{ id: string }>();

  const [expense, setExpense] =
    useState<Expense | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const expenseId = Number(params.id);

  useEffect(() => {
    async function loadExpense() {
      if (
        !Number.isInteger(expenseId) ||
        expenseId <= 0
      ) {
        setError("Invalid expense ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response =
          await getExpenseById(expenseId);

        setExpense(response);
      } catch (loadError) {
        console.error(
          "Unable to load expense:",
          loadError
        );

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load the expense."
        );
      } finally {
        setLoading(false);
      }
    }

    loadExpense();
  }, [expenseId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl">
        <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white shadow-sm">
          <div className="flex flex-col items-center gap-3 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#6B8E23]" />

            <p className="text-sm font-medium text-muted-foreground">
              Loading expense details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !expense) {
    return (
      <main className="mx-auto max-w-3xl">
        <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle size={28} />
          </div>

          <h1 className="mt-4 text-xl font-bold text-[#333333]">
            Expense not found
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {error ??
              "The requested expense could not be loaded."}
          </p>

          <Link
            href="/expenses"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-[#6B8E23] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5D7D1F]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Expenses
          </Link>
        </section>
      </main>
    );
  }

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
          Edit Expense
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update the expense information and save your changes.
        </p>
      </div>

      <ExpenseForm
        mode="edit"
        initialExpense={expense}
      />
    </main>
  );
}