"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  IndianRupee,
  Loader2,
  Plus,
  ReceiptText,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";

import BudgetCard from "@/components/expenses/BudgetCard";

import {
  getCategoryBreakdown,
  getExpenseDashboardSummary,
  getSpendingTrends,
} from "@/features/expenses/services/expense.service";

import { formatCurrency } from "@/features/expenses/utils/expense.utils";

import type {
  CategoryBreakdownItem,
  ExpenseDashboardSummary,
  SpendingTrendItem,
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

export default function ExpenseDashboardPage() {
  const [summary, setSummary] =
    useState<ExpenseDashboardSummary | null>(
      null
    );

  const [
    categoryBreakdown,
    setCategoryBreakdown,
  ] = useState<CategoryBreakdownItem[]>([]);

  const [spendingTrends, setSpendingTrends] =
    useState<SpendingTrendItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);

      const summaryResponse =
        await getExpenseDashboardSummary();

      const [
        categoryResponse,
        trendsResponse,
      ] = await Promise.all([
        getCategoryBreakdown(
          summaryResponse.current_month,
          summaryResponse.current_year
        ),

        getSpendingTrends(6),
      ]);

      setSummary(summaryResponse);
      setCategoryBreakdown(
        categoryResponse.categories
      );
      setSpendingTrends(
        trendsResponse.items
      );
    } catch (error) {
      console.error(
        "Unable to load expense dashboard:",
        error
      );

      toast.error(
        "Unable to load expense dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

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

        <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white shadow-sm">
          <div className="flex flex-col items-center gap-3 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#6B8E23]" />

            <p className="text-sm font-medium text-muted-foreground">
              Loading expense dashboard...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!summary) {
    return (
      <main className="space-y-6">
        <Link
          href="/expenses"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6B8E23] transition hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Expenses
        </Link>

        <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white p-6 text-center shadow-sm">
          <BarChart3 className="h-10 w-10 text-[#6B8E23]" />

          <h1 className="mt-4 text-xl font-bold text-[#333333]">
            Dashboard unavailable
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Expense dashboard data could not
            be loaded.
          </p>

          <button
            type="button"
            onClick={loadDashboard}
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-[#6B8E23] px-4 text-sm font-semibold text-white transition hover:bg-[#5D7D1F]"
          >
            Try Again
          </button>
        </section>
      </main>
    );
  }

  const currentMonthName =
    MONTHS[summary.current_month - 1];

  const budgetText =
    summary.budget !== null
      ? formatCurrency(summary.budget)
      : "Not set";

  const remainingText =
    summary.remaining !== null
      ? formatCurrency(summary.remaining)
      : "N/A";

  const largestCategory =
    summary.largest_category ??
    "No expenses";

  const maximumTrendAmount = Math.max(
    ...spendingTrends.map(
      (item) => item.total_spent
    ),
    1
  );

  return (
    <main className="space-y-8">
      <Link
        href="/expenses"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6B8E23] transition hover:opacity-80"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Expenses
      </Link>

      <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <BarChart3 size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#333333]">
              Expense Dashboard
            </h1>

            <p className="mt-1 text-muted-foreground">
              Overview for {currentMonthName}{" "}
              {summary.current_year}.
            </p>
          </div>
        </div>

        <Link
          href="/expenses/add"
          className="inline-flex h-10 items-center justify-center rounded-md bg-[#6B8E23] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5D7D1F]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Total Spent"
          value={formatCurrency(
            summary.total_spent
          )}
          description={`${summary.expense_count} recorded expenses`}
          icon={<IndianRupee size={21} />}
        />

        <DashboardStatCard
          title="Monthly Budget"
          value={budgetText}
          description="Planned spending limit"
          icon={<WalletCards size={21} />}
        />

        <DashboardStatCard
          title="Remaining"
          value={remainingText}
          description={
            summary.remaining !== null &&
            summary.remaining < 0
              ? "Budget has been exceeded"
              : "Available budget balance"
          }
          icon={<TrendingUp size={21} />}
        />

        <DashboardStatCard
          title="Largest Category"
          value={largestCategory}
          description="Highest spending category"
          icon={<ReceiptText size={21} />}
        />
      </section>

      <BudgetCard
        budget={summary.budget}
        totalSpent={summary.total_spent}
        remaining={summary.remaining}
        usagePercentage={
          summary.budget_usage_percentage
        }
      />

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
              <BarChart3 size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#333333]">
                Category Breakdown
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Spending distribution by
                category.
              </p>
            </div>
          </div>

          {categoryBreakdown.length === 0 ? (
            <p className="mt-8 rounded-xl bg-[#FBFAF5] p-6 text-center text-sm text-muted-foreground">
              No expense data available for
              this month.
            </p>
          ) : (
            <div className="mt-6 space-y-5">
              {categoryBreakdown.map(
                (item) => (
                  <div key={item.category}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#333333]">
                          {item.category}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.percentage.toFixed(
                            1
                          )}
                          % of total spending
                        </p>
                      </div>

                      <p className="text-sm font-bold text-[#333333]">
                        {formatCurrency(
                          item.amount
                        )}
                      </p>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-[#EEEADD]">
                      <div
                        className="h-full rounded-full bg-[#6B8E23] transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            Math.max(
                              item.percentage,
                              0
                            ),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
              <TrendingUp size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#333333]">
                Spending Trends
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Expenses recorded during the
                last six months.
              </p>
            </div>
          </div>

          {spendingTrends.length === 0 ? (
            <p className="mt-8 rounded-xl bg-[#FBFAF5] p-6 text-center text-sm text-muted-foreground">
              No spending trend data is
              available.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {spendingTrends.map((item) => {
                const percentage =
                  (item.total_spent /
                    maximumTrendAmount) *
                  100;

                return (
                  <div
                    key={`${item.month}-${item.year}`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-[#333333]">
                        {item.label}
                      </p>

                      <p className="text-sm font-bold text-[#333333]">
                        {formatCurrency(
                          item.total_spent
                        )}
                      </p>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-[#EEEADD]">
                      <div
                        className="h-full rounded-full bg-[#6B8E23] transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            Math.max(
                              percentage,
                              0
                            ),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#333333]">
              Recent Expenses
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your five most recently recorded
              expenses.
            </p>
          </div>

          <Link
            href="/expenses"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            View All Expenses
          </Link>
        </div>

        {summary.recent_expenses.length ===
        0 ? (
          <p className="mt-6 rounded-xl bg-[#FBFAF5] p-6 text-center text-sm text-muted-foreground">
            No recent expenses found.
          </p>
        ) : (
          <div className="mt-6 divide-y divide-[#EEEADD]">
            {summary.recent_expenses.map(
              (expense) => (
                <div
                  key={expense.id}
                  className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
                      <ReceiptText size={18} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#333333]">
                        {expense.category}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {expense.description ||
                          "No description"}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(
                          expense.date
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-[#333333]">
                    {formatCurrency(
                      expense.amount
                    )}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}

interface DashboardStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function DashboardStatCard({
  title,
  value,
  description,
  icon,
}: DashboardStatCardProps) {
  return (
    <article className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
        {icon}
      </div>

      <p className="mt-4 text-sm font-medium text-muted-foreground">
        {title}
      </p>

      <p className="mt-2 break-words text-2xl font-bold text-[#333333]">
        {value}
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(
    new Date(`${date}T00:00:00`)
  );
}