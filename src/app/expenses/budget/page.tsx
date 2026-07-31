"use client";

import {
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  PiggyBank,
  Save,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import BudgetCard from "@/components/expenses/BudgetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  getBudget,
  getExpenses,
  setBudget,
} from "@/features/expenses/services/expense.service";

import {
  calculateBudgetUsage,
  calculateRemainingBudget,
  calculateTotalSpent,
} from "@/features/expenses/utils/expense.utils";

import type {
  Budget,
  Expense,
} from "@/types/expenses";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ExpenseBudgetPage() {
  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] =
    useState(currentDate.getMonth() + 1);

  const [selectedYear, setSelectedYear] =
    useState(currentDate.getFullYear());

  const [budgetInput, setBudgetInput] =
    useState("");

  const [budget, setBudgetState] =
    useState<Budget | null>(null);

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  async function loadBudgetData() {
    try {
      setLoading(true);

      const [budgetResponse, expenseResponse] =
        await Promise.all([
          getBudget(
            selectedMonth,
            selectedYear
          ),

          getExpenses({
            page: 1,
            limit: 1000,
            start_date: `${selectedYear}-${String(
              selectedMonth
            ).padStart(2, "0")}-01`,
            end_date: getLastDateOfMonth(
              selectedMonth,
              selectedYear
            ),
          }),
        ]);

      setBudgetState(budgetResponse);
      setExpenses(expenseResponse.items);

      setBudgetInput(
        budgetResponse
          ? String(
              budgetResponse.budget_amount
            )
          : ""
      );
    } catch (error) {
      console.error(
        "Unable to load budget data:",
        error
      );

      toast.error(
        "Unable to load budget details."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadBudgetData();
  }, [selectedMonth, selectedYear]);

  const totalSpent = useMemo(
    () => calculateTotalSpent(expenses),
    [expenses]
  );

  const budgetAmount =
    budget?.budget_amount ?? null;

  const remaining =
    calculateRemainingBudget(
      totalSpent,
      budgetAmount
    );

  const usagePercentage =
    calculateBudgetUsage(
      totalSpent,
      budgetAmount
    );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const parsedBudget =
      Number(budgetInput);

    if (
      !Number.isFinite(parsedBudget) ||
      parsedBudget <= 0
    ) {
      toast.error(
        "Enter a valid budget greater than 0."
      );

      return;
    }

    try {
      setSaving(true);

      const savedBudget =
        await setBudget({
          month: selectedMonth,
          year: selectedYear,
          budget_amount: parsedBudget,
        });

      setBudgetState(savedBudget);

      toast.success(
        "Monthly budget saved successfully."
      );
    } catch (error) {
      console.error(
        "Unable to save budget:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to save the budget."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/expenses"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#D4A34F] transition hover:text-[#F0C86A]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Expenses
          </Link>

          <section className="mt-6 flex min-h-[500px] items-center justify-center overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
            <div className="relative text-center">
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/10 blur-3xl" />

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
                <Loader2 className="h-9 w-9 animate-spin text-[#F0C86A]" />
              </div>

              <h1 className="mt-6 text-xl font-bold text-[#FBFAF7]">
                Loading budget details
              </h1>

              <p className="mt-2 text-sm text-[#9EAEA7]">
                Preparing your monthly spending overview...
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
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

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <PiggyBank size={36} />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                  <Sparkles size={15} />
                  Budget Planning
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl">
                  Monthly
                  <span className="block text-[#F0C86A]">
                    Budget
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#B8C5BF]">
                  Set your spending limit, review monthly expenses,
                  and understand how much of your planned budget
                  remains.
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#205C46]/40 bg-[#0F251E]/75 p-5 backdrop-blur lg:w-[240px]">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                Selected Period
              </p>

              <p className="mt-2 text-2xl font-bold text-[#F0C86A]">
                {MONTHS[selectedMonth - 1]}
              </p>

              <p className="mt-1 text-lg font-semibold text-[#FBFAF7]">
                {selectedYear}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
              <CalendarDays size={22} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                Budget Period
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#FBFAF7]">
                Select Month and Year
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                Choose the period whose budget and expenses you want
                to review.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="budget-month"
                className="text-sm font-semibold text-[#D6E0DB]"
              >
                Month
              </label>

              <select
                id="budget-month"
                value={selectedMonth}
                onChange={(event) =>
                  setSelectedMonth(
                    Number(event.target.value)
                  )
                }
                className={selectClasses}
              >
                {MONTHS.map(
                  (month, index) => (
                    <option
                      key={month}
                      value={index + 1}
                    >
                      {month}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="budget-year"
                className="text-sm font-semibold text-[#D6E0DB]"
              >
                Year
              </label>

              <Input
                id="budget-year"
                type="number"
                min={2000}
                max={2100}
                value={selectedYear}
                onChange={(event) =>
                  setSelectedYear(
                    Number(event.target.value)
                  )
                }
                className={inputClasses}
              />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <BudgetCard
            budget={budgetAmount}
            totalSpent={totalSpent}
            remaining={remaining}
            usagePercentage={
              usagePercentage
            }
          />
        </section>

        <section className="relative mt-8 overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A34F]/8 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
              Monthly Limit
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
              {budget
                ? "Update Budget"
                : "Set Budget"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
              Set your planned spending limit for{" "}
              <span className="font-semibold text-[#D6E0DB]">
                {MONTHS[selectedMonth - 1]}{" "}
                {selectedYear}
              </span>
              .
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-6"
            >
              <div className="space-y-2">
                <label
                  htmlFor="budget-amount"
                  className="text-sm font-semibold text-[#D6E0DB]"
                >
                  Budget Amount
                </label>

                <Input
                  id="budget-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={budgetInput}
                  onChange={(event) =>
                    setBudgetInput(
                      event.target.value
                    )
                  }
                  placeholder="Enter monthly budget"
                  required
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-[#205C46]/25 pt-6 sm:flex-row sm:justify-end">
                <Link
                  href="/expenses"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#205C46]/45 bg-[#10271F] px-6 text-sm font-semibold text-[#D6E0DB] transition hover:border-[#D4A34F]/35 hover:bg-[#D4A34F]/10 hover:text-[#F0C86A]"
                >
                  Cancel
                </Link>

                <Button
                  type="submit"
                  disabled={saving}
                  className="min-h-12 rounded-2xl bg-[#D4A34F] px-6 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] hover:bg-[#F0C86A]"
                >
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save Budget"}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}

const inputClasses =
  "h-12 rounded-[18px] border-[#205C46]/40 bg-[#10271F] px-4 text-sm text-[#FBFAF7] outline-none transition placeholder:text-[#6F8179] hover:border-[#205C46]/70 focus-visible:border-[#D4A34F] focus-visible:ring-4 focus-visible:ring-[#D4A34F]/10";

const selectClasses =
  "h-12 w-full rounded-[18px] border border-[#205C46]/40 bg-[#10271F] px-4 text-sm text-[#FBFAF7] outline-none transition hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10";

function getLastDateOfMonth(
  month: number,
  year: number
): string {
  const lastDay = new Date(
    year,
    month,
    0
  ).getDate();

  return `${year}-${String(month).padStart(
    2,
    "0"
  )}-${String(lastDay).padStart(2, "0")}`;
}