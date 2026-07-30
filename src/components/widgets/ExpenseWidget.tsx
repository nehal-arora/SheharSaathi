import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  CircleDollarSign,
  ReceiptText,
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
  }).format(Number(amount) || 0);
}

function clampPercentage(value: number): number {
  return Math.min(Math.max(Number(value) || 0, 0), 100);
}

export default function ExpenseWidget({
  expenses,
}: ExpenseWidgetProps) {
  const progress = clampPercentage(
    expenses.budget_used_percentage
  );

  const hasBudget = expenses.monthly_budget > 0;

  const isOverBudget =
    hasBudget &&
    expenses.total_expenses > expenses.monthly_budget;

  const statusText = !hasBudget
    ? "Budget not configured"
    : isOverBudget
      ? "Monthly budget exceeded"
      : "Your spending is within budget";

  return (
    <section className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-[#E4E5DE] bg-white shadow-[0_12px_34px_rgba(36,43,29,0.045)]">
      {/* Header */}

      <div className="flex items-start justify-between gap-4 border-b border-[#ECEDE7] px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E7] text-[#6B8E23]">
            <WalletCards className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B8E23]">
              Expenses
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-[#252820]">
              Monthly budget overview
            </h2>

            <p className="mt-1 text-sm text-[#85887F]">
              Monitor your relocation spending and balance.
            </p>
          </div>
        </div>

        <Link
          href="/expenses"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#5F7E20] transition hover:text-[#486317]"
        >
          View all

          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="rounded-[20px] border border-[#E4E8DC] bg-[#F5F7F1] p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#7A7D75]">
                Total spent this month
              </p>

              <p className="mt-2 break-words text-3xl font-bold tracking-[-0.04em] text-[#26311D] sm:text-[34px]">
                {formatCurrency(expenses.total_expenses)}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={
                    isOverBudget
                      ? "rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                      : "rounded-full bg-[#E7EEDB] px-3 py-1.5 text-xs font-semibold text-[#5F7E20]"
                  }
                >
                  {expenses.budget_used_percentage}% used
                </span>

                <span className="text-xs font-medium text-[#85887F]">
                  of {formatCurrency(expenses.monthly_budget)}
                </span>
              </div>
            </div>

            <div
              className={
                isOverBudget
                  ? "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700"
                  : "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#E7EEDB] text-[#5F7E20]"
              }
            >
              <span className="text-sm font-bold">
                {expenses.budget_used_percentage}%
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-2.5 overflow-hidden rounded-full bg-[#DFE3D8]">
              <div
                className={
                  isOverBudget
                    ? "h-full rounded-full bg-red-500 transition-all duration-700"
                    : "h-full rounded-full bg-[#6B8E23] transition-all duration-700"
                }
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs font-medium text-[#85887F]">
              <span>₹0</span>

              <span className="truncate">
                {formatCurrency(expenses.monthly_budget)}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3 border-t border-[#E0E5D8] pt-4">
            <div
              className={
                isOverBudget
                  ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700"
                  : "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#6B8E23]"
              }
            >
              <ReceiptText className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#353A31]">
                {statusText}
              </p>

              <p className="mt-1 text-xs leading-5 text-[#85887F]">
                Add expenses regularly to keep your dashboard
                insights accurate.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ExpenseStat
            icon={CircleDollarSign}
            label="Remaining budget"
            value={formatCurrency(
              expenses.remaining_budget
            )}
            danger={expenses.remaining_budget < 0}
          />

          <ExpenseStat
            icon={TrendingUp}
            label="Top category"
            value={
              expenses.top_category?.trim() ||
              "Not available"
            }
          />
        </div>

        <div className="mt-auto pt-5">
          <Link
            href="/expenses"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#26311D] px-5 text-sm font-semibold text-white transition hover:bg-[#354329]"
          >
            Manage expenses

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ExpenseStatProps {
  icon: ComponentType<{
    className?: string;
  }>;
  label: string;
  value: string;
  danger?: boolean;
}

function ExpenseStat({
  icon: Icon,
  label,
  value,
  danger = false,
}: ExpenseStatProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#E8E9E3] bg-[#FAFAF7] p-4">
      <div className="flex items-center gap-2 text-[#6B8E23]">
        <Icon className="h-4 w-4 shrink-0" />

        <p className="truncate text-[11px] font-bold uppercase tracking-[0.08em]">
          {label}
        </p>
      </div>

      <p
        className={
          danger
            ? "mt-3 break-words text-xl font-bold tracking-[-0.025em] text-red-700"
            : "mt-3 break-words text-xl font-bold tracking-[-0.025em] text-[#252820]"
        }
      >
        {value}
      </p>
    </div>
  );
}