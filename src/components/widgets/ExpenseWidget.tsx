import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  PieChart,
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
  }).format(amount);
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

  const isOverBudget =
    expenses.total_expenses > expenses.monthly_budget;

  const hasBudget = expenses.monthly_budget > 0;

  return (
    <section className="relative overflow-hidden rounded-[34px] bg-[#252019] text-white shadow-[0_28px_75px_rgba(55,42,23,0.2)]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#E9B958]/20 blur-[85px]" />

      <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#C77E2C]/15 blur-[90px]" />

      <div className="relative p-6 sm:p-7">
        {/* Header */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-white/10 text-[#F3C968] backdrop-blur">
              <WalletCards className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#E2B85A]">
                Expense control
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                Monthly budget
              </h2>

              <p className="mt-1.5 text-sm text-white/50">
                Track your relocation spending.
              </p>
            </div>
          </div>

          <Link
            href="/expenses"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-[#E2B85A] hover:text-[#2B2115]"
            aria-label="View expenses"
          >
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Main amount */}

        <div className="mt-8">
          <p className="text-sm font-semibold text-white/45">
            Total spent
          </p>

          <p className="mt-2 break-words text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            {formatCurrency(expenses.total_expenses)}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={
                isOverBudget
                  ? "rounded-full bg-red-400/15 px-3 py-1.5 text-xs font-extrabold text-red-300"
                  : "rounded-full bg-[#E2B85A]/15 px-3 py-1.5 text-xs font-extrabold text-[#F3C968]"
              }
            >
              {expenses.budget_used_percentage}% used
            </span>

            <span className="text-xs font-medium text-white/40">
              of {formatCurrency(expenses.monthly_budget)}
            </span>
          </div>
        </div>

        {/* Budget visual */}

        <div className="mt-7 rounded-[26px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-white/40">
                Budget status
              </p>

              <p className="mt-2 text-lg font-black">
                {isOverBudget
                  ? "Budget exceeded"
                  : hasBudget
                    ? "Spending is being tracked"
                    : "Budget not configured"}
              </p>
            </div>

            <div
              className={
                isOverBudget
                  ? "flex h-14 w-14 items-center justify-center rounded-full bg-red-400/15 text-red-300"
                  : "flex h-14 w-14 items-center justify-center rounded-full bg-[#E2B85A]/15 text-[#F3C968]"
              }
            >
              <span className="text-sm font-black">
                {expenses.budget_used_percentage}%
              </span>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className={
                isOverBudget
                  ? "h-full rounded-full bg-gradient-to-r from-red-500 to-red-300 transition-all duration-700"
                  : "h-full rounded-full bg-gradient-to-r from-[#C98527] via-[#E3AE45] to-[#F1D079] transition-all duration-700"
              }
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-white/35">
            <span>₹0</span>
            <span>
              {formatCurrency(expenses.monthly_budget)}
            </span>
          </div>
        </div>

        {/* Lower stats */}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ExpenseStat
            icon={CircleDollarSign}
            label="Remaining"
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

        {/* Bottom action */}

        <div className="mt-5 flex flex-col gap-4 rounded-[24px] bg-[#F4D47D] p-5 text-[#332615] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#332615]/10">
              <ReceiptText className="h-5 w-5" />
            </div>

            <div>
              <p className="font-black">
                Keep your records updated
              </p>

              <p className="mt-1 text-sm leading-5 text-[#6F5730]">
                Add expenses regularly for more accurate budget insights.
              </p>
            </div>
          </div>

          <Link
            href="/expenses"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-2xl bg-[#332615] px-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#49371E] sm:self-center"
          >
            <PieChart className="h-4 w-4" />
            View expenses
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ExpenseStatProps {
  icon: React.ComponentType<{
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
    <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
      <div className="flex items-center gap-2 text-white/40">
        <Icon className="h-4 w-4" />

        <p className="text-xs font-bold uppercase tracking-[0.12em]">
          {label}
        </p>
      </div>

      <p
        className={
          danger
            ? "mt-3 break-words text-xl font-black text-red-300"
            : "mt-3 break-words text-xl font-black text-white"
        }
      >
        {value}
      </p>
    </div>
  );
}