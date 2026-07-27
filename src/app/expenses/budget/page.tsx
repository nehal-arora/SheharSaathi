"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  PiggyBank,
  Save,
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
    loadBudgetData();
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
      <main className="space-y-6">
        <Link
          href="/expenses"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6B8E23] transition hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Expenses
        </Link>

        <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white shadow-sm">
          <div className="flex flex-col items-center gap-3 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#6B8E23]" />

            <p className="text-sm font-medium text-muted-foreground">
              Loading budget details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-8">
      <Link
        href="/expenses"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6B8E23] transition hover:opacity-80"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Expenses
      </Link>

      <header className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
          <PiggyBank size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[#333333]">
            Monthly Budget
          </h1>

          <p className="mt-1 text-muted-foreground">
            Set a spending limit and monitor
            your monthly expenses.
          </p>
        </div>
      </header>

      <section className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#333333]">
              Select month
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Choose the month and year whose
              budget you want to manage.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="budget-month"
              className="text-sm font-semibold text-[#333333]"
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-[#6B8E23] focus-visible:ring-offset-2"
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
              className="text-sm font-semibold text-[#333333]"
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
            />
          </div>
        </div>
      </section>

      <BudgetCard
        budget={budgetAmount}
        totalSpent={totalSpent}
        remaining={remaining}
        usagePercentage={
          usagePercentage
        }
      />

      <section className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-[#333333]">
            {budget
              ? "Update budget"
              : "Set budget"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Set your planned spending limit for{" "}
            {MONTHS[selectedMonth - 1]}{" "}
            {selectedYear}.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="budget-amount"
              className="text-sm font-semibold text-[#333333]"
            >
              Budget amount
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
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/expenses"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent"
            >
              Cancel
            </Link>

            <Button
              type="submit"
              disabled={saving}
              className="bg-[#6B8E23] text-white hover:bg-[#5D7D1F]"
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
      </section>
    </main>
  );
}

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