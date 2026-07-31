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
    <section className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-gradient-to-br from-[#0F251E] to-[#0B1D18] shadow-[0_20px_55px_rgba(0,0,0,0.2)]">
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#D4A34F]/10 blur-[70px]" />

      <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-5 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]">
            <WalletCards className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              Expenses
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-white">
              Monthly budget overview
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/38">
              Monitor your relocation spending and balance.
            </p>
          </div>
        </div>

        <Link
          href="/expenses"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#F0C86A] transition hover:text-[#FFE19A]"
        >
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.025] p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/35">
                Total spent this month
              </p>

              <p className="mt-2 break-words text-3xl font-bold tracking-[-0.04em] text-white sm:text-[34px]">
                {formatCurrency(expenses.total_expenses)}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={
                    isOverBudget
                      ? "rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-xs font-semibold text-red-300"
                      : "rounded-full border border-[#8AB59C]/15 bg-[#205C46]/35 px-3 py-1.5 text-xs font-semibold text-[#A5CEB5]"
                  }
                >
                  {expenses.budget_used_percentage}% used
                </span>

                <span className="text-xs font-medium text-white/35">
                  of {formatCurrency(expenses.monthly_budget)}
                </span>
              </div>
            </div>

            <div
              className={
                isOverBudget
                  ? "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-red-300"
                  : "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]"
              }
            >
              <span className="text-sm font-bold">
                {expenses.budget_used_percentage}%
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={
                  isOverBudget
                    ? "h-full rounded-full bg-red-400 transition-all duration-700"
                    : "h-full rounded-full bg-gradient-to-r from-[#205C46] to-[#D4A34F] transition-all duration-700"
                }
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs font-medium text-white/30">
              <span>₹0</span>

              <span className="truncate">
                {formatCurrency(expenses.monthly_budget)}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3 border-t border-white/[0.06] pt-4">
            <div
              className={
                isOverBudget
                  ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-300"
                  : "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]"
              }
            >
              <ReceiptText className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-white/80">
                {statusText}
              </p>

              <p className="mt-1 text-xs leading-5 text-white/35">
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
            accent="gold"
          />

          <ExpenseStat
            icon={TrendingUp}
            label="Top category"
            value={
              expenses.top_category?.trim() ||
              "Not available"
            }
            accent="green"
          />
        </div>

        <div className="mt-auto pt-5">
          <Link
            href="/expenses"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
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
  accent: "green" | "gold";
}

function ExpenseStat({
  icon: Icon,
  label,
  value,
  danger = false,
  accent,
}: ExpenseStatProps) {
  const isGold = accent === "gold";

  return (
    <div className="min-w-0 rounded-[16px] border border-white/[0.06] bg-white/[0.025] p-4">
      <div
        className={
          danger
            ? "flex items-center gap-2 text-red-300"
            : isGold
              ? "flex items-center gap-2 text-[#F0C86A]"
              : "flex items-center gap-2 text-[#A5CEB5]"
        }
      >
        <Icon className="h-4 w-4 shrink-0" />

        <p className="truncate text-[11px] font-bold uppercase tracking-[0.08em]">
          {label}
        </p>
      </div>

      <p
        className={
          danger
            ? "mt-3 break-words text-xl font-bold tracking-[-0.025em] text-red-300"
            : "mt-3 break-words text-xl font-bold tracking-[-0.025em] text-white"
        }
      >
        {value}
      </p>
    </div>
  );
}