import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import type { DashboardExpenseSummary } from "@/features/dashboard/types/dashboard.types";

interface ExpenseWidgetProps {
  expenses: DashboardExpenseSummary;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getProgressWidth(percentage: number): string {
  const safePercentage = Math.min(
    Math.max(percentage, 0),
    100
  );

  return `${safePercentage}%`;
}

export default function ExpenseWidget({
  expenses,
}: ExpenseWidgetProps) {
  const isBudgetExceeded =
    expenses.total_expenses > expenses.monthly_budget;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <WalletCards className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Monthly Expenses
            </h2>
            <p className="text-sm text-neutral-500">
              Track your relocation spending
            </p>
          </div>
        </div>

        <Link
          href="/expenses"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#6B8E23] transition hover:opacity-75"
        >
          Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500">
              Total spent
            </p>
            <p className="mt-1 text-3xl font-bold text-neutral-900">
              {formatCurrency(expenses.total_expenses)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-neutral-500">
              Monthly budget
            </p>
            <p className="mt-1 font-semibold text-neutral-800">
              {formatCurrency(expenses.monthly_budget)}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-500">
              Budget used
            </span>
            <span
              className={
                isBudgetExceeded
                  ? "font-semibold text-red-600"
                  : "font-semibold text-neutral-800"
              }
            >
              {expenses.budget_used_percentage}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
            <div
              className={
                isBudgetExceeded
                  ? "h-full rounded-full bg-red-500 transition-all"
                  : "h-full rounded-full bg-[#6B8E23] transition-all"
              }
              style={{
                width: getProgressWidth(
                  expenses.budget_used_percentage
                ),
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-neutral-50 p-4">
          <div className="flex items-center gap-2 text-neutral-500">
            <CircleDollarSign className="h-4 w-4" />
            <span className="text-xs font-medium">
              Remaining
            </span>
          </div>

          <p
            className={
              expenses.remaining_budget < 0
                ? "mt-2 text-lg font-bold text-red-600"
                : "mt-2 text-lg font-bold text-neutral-900"
            }
          >
            {formatCurrency(expenses.remaining_budget)}
          </p>
        </div>

        <div className="rounded-xl bg-neutral-50 p-4">
          <div className="flex items-center gap-2 text-neutral-500">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">
              Top category
            </span>
          </div>

          <p className="mt-2 text-lg font-bold text-neutral-900">
            {expenses.top_category ?? "Not available"}
          </p>
        </div>
      </div>

      {isBudgetExceeded && (
        <div className="mt-4 rounded-xl bg-red-50 p-3">
          <p className="text-sm font-medium text-red-700">
            You have exceeded your monthly budget.
          </p>
        </div>
      )}
    </section>
  );
}