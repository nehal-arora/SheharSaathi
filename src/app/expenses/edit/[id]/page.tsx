"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Loader2,
  PencilLine,
  Sparkles,
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

    void loadExpense();
  }, [expenseId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <section className="flex min-h-[520px] items-center justify-center overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
            <div className="relative text-center">
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/10 blur-3xl" />

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
                <Loader2 className="h-9 w-9 animate-spin text-[#F0C86A]" />
              </div>

              <h1 className="mt-6 text-xl font-bold text-[#FBFAF7]">
                Loading expense details
              </h1>

              <p className="mt-2 text-sm text-[#9EAEA7]">
                Preparing this expense for editing...
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (error || !expense) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative mx-auto flex min-h-[430px] max-w-3xl flex-col items-center justify-center overflow-hidden rounded-[32px] border border-red-400/20 bg-[#0D211B] p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-400/5 blur-3xl" />

          <div className="relative flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-red-400/20 bg-red-400/10 text-red-300">
              <AlertCircle size={34} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-red-300">
              Unable to load
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
              Expense Not Found
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#9EAEA7] sm:text-base">
              {error ??
                "The requested expense could not be loaded."}
            </p>

            <Link
              href="/expenses"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-6 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:bg-[#F0C86A]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Expenses
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/expenses"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#D4A34F] transition hover:text-[#F0C86A]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Expenses
        </Link>

        <section className="relative mt-6 overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-9">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <PencilLine size={36} />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                  <Sparkles size={15} />
                  Expense Management
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl">
                  Edit
                  <span className="block text-[#F0C86A]">
                    Expense
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#B8C5BF]">
                  Update the amount, category, date or description
                  and save your changes to keep your records accurate.
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#205C46]/40 bg-[#0F251E]/75 p-5 backdrop-blur lg:w-[230px]">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                Expense ID
              </p>

              <p className="mt-2 text-2xl font-bold text-[#F0C86A]">
                #{expense.id}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                Editing an existing expense record.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <ExpenseForm
            mode="edit"
            initialExpense={expense}
          />
        </section>
      </section>
    </main>
  );
}