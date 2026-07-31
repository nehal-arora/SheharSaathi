"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  ReceiptText,
  Sparkles,
} from "lucide-react";

import ExpenseForm from "@/components/expenses/ExpenseForm";

export default function AddExpensePage() {
  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/expenses"
          className="group inline-flex items-center gap-2 rounded-xl px-1 py-2 text-sm font-semibold text-[#D4A34F] transition hover:text-[#F0C86A]"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          />
          Back to Expenses
        </Link>

        <section className="relative mt-6 overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-9">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <ReceiptText size={36} />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                  <Sparkles size={15} />
                  Expense Management
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl">
                  Add a New
                  <span className="block text-[#F0C86A]">
                    Expense
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#B8C5BF]">
                  Record your latest spending to keep your monthly
                  expense history, budget insights, and analytics
                  accurate.
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#205C46]/40 bg-[#0F251E]/75 p-5 backdrop-blur lg:w-[230px]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <Plus size={21} />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                New Record
              </p>

              <p className="mt-2 text-xl font-bold text-[#FBFAF7]">
                Quick and Simple
              </p>

              <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                Add the amount, category, date and an optional note.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <ExpenseForm mode="create" />
        </section>
      </section>
    </main>
  );
}