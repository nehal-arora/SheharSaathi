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
  Sparkles,
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
    void loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/expenses"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#D4A34F] transition hover:text-[#F0C86A]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Expenses
          </Link>

          <section className="mt-6 flex min-h-[520px] items-center justify-center overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
            <div className="relative text-center">
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/10 blur-3xl" />

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
                <Loader2 className="h-9 w-9 animate-spin text-[#F0C86A]" />
              </div>

              <h1 className="mt-6 text-xl font-bold text-[#FBFAF7]">
                Loading expense dashboard
              </h1>

              <p className="mt-2 text-sm text-[#9EAEA7]">
                Preparing your spending overview and analytics...
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (!summary) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/expenses"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#D4A34F] transition hover:text-[#F0C86A]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Expenses
          </Link>

          <section className="relative mt-6 flex min-h-[430px] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-dashed border-[#D4A34F]/25 bg-[#0D211B] p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

            <div className="relative flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                <BarChart3 size={36} />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                Analytics unavailable
              </p>

              <h1 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
                Dashboard Unavailable
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#9EAEA7] sm:text-base">
                Expense dashboard data could not be loaded.
                Try refreshing the dashboard again.
              </p>

              <button
                type="button"
                onClick={loadDashboard}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#D4A34F] px-6 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:bg-[#F0C86A]"
              >
                Try Again
              </button>
            </div>
          </section>
        </div>
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
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/expenses"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#D4A34F] transition hover:text-[#F0C86A]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Expenses
        </Link>

        <section className="relative mt-6 overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] p-7 shadow-[0_26px_80px_rgba(0,0,0,0.32)] sm:p-9">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                <Sparkles size={15} />
                Expense Analytics
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl lg:text-6xl">
                Expense
                <span className="block text-[#F0C86A]">
                  Dashboard
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#B8C5BF] sm:text-lg">
                Review your spending, budget performance,
                category distribution and recent expense
                activity for {currentMonthName}{" "}
                {summary.current_year}.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="rounded-[22px] border border-[#205C46]/40 bg-[#0F251E]/75 px-5 py-4 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                  Current Period
                </p>

                <p className="mt-2 text-xl font-bold text-[#F0C86A]">
                  {currentMonthName}
                </p>

                <p className="mt-1 font-semibold text-[#FBFAF7]">
                  {summary.current_year}
                </p>
              </div>

              <Link
                href="/expenses/add"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[22px] bg-[#D4A34F] px-6 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.24)] transition hover:-translate-y-0.5 hover:bg-[#F0C86A]"
              >
                <Plus className="h-5 w-5" />
                Add Expense
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            title="Total Spent"
            value={formatCurrency(
              summary.total_spent
            )}
            description={`${summary.expense_count} recorded expenses`}
            icon={<IndianRupee size={22} />}
          />

          <DashboardStatCard
            title="Monthly Budget"
            value={budgetText}
            description="Planned spending limit"
            icon={<WalletCards size={22} />}
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
            icon={<TrendingUp size={22} />}
            danger={
              summary.remaining !== null &&
              summary.remaining < 0
            }
          />

          <DashboardStatCard
            title="Largest Category"
            value={largestCategory}
            description="Highest spending category"
            icon={<ReceiptText size={22} />}
          />
        </section>

        <section className="mt-8">
          <BudgetCard
            budget={summary.budget}
            totalSpent={summary.total_spent}
            remaining={summary.remaining}
            usagePercentage={
              summary.budget_usage_percentage
            }
          />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <AnalyticsSection
            icon={<BarChart3 size={21} />}
            eyebrow="Category Analytics"
            title="Category Breakdown"
            description="Spending distribution across expense categories."
          >
            {categoryBreakdown.length === 0 ? (
              <EmptyAnalyticsMessage>
                No expense data is available for this month.
              </EmptyAnalyticsMessage>
            ) : (
              <div className="space-y-6">
                {categoryBreakdown.map(
                  (item) => (
                    <div key={item.category}>
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-[#FBFAF7]">
                            {item.category}
                          </p>

                          <p className="mt-1 text-xs text-[#7F9189]">
                            {item.percentage.toFixed(
                              1
                            )}
                            % of total spending
                          </p>
                        </div>

                        <p className="text-sm font-bold text-[#F0C86A]">
                          {formatCurrency(
                            item.amount
                          )}
                        </p>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-[#071512]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#B27B2D] to-[#F0C86A] transition-all duration-700"
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
          </AnalyticsSection>

          <AnalyticsSection
            icon={<TrendingUp size={21} />}
            eyebrow="Monthly Analytics"
            title="Spending Trends"
            description="Expenses recorded during the last six months."
          >
            {spendingTrends.length === 0 ? (
              <EmptyAnalyticsMessage>
                No spending trend data is available.
              </EmptyAnalyticsMessage>
            ) : (
              <div className="space-y-6">
                {spendingTrends.map((item) => {
                  const percentage =
                    (item.total_spent /
                      maximumTrendAmount) *
                    100;

                  return (
                    <div
                      key={`${item.month}-${item.year}`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <p className="text-sm font-bold text-[#FBFAF7]">
                          {item.label}
                        </p>

                        <p className="text-sm font-bold text-[#F0C86A]">
                          {formatCurrency(
                            item.total_spent
                          )}
                        </p>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-[#071512]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#205C46] to-[#8AB59C] transition-all duration-700"
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
          </AnalyticsSection>
        </section>

        <section className="relative mt-8 overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A34F]/8 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                  Latest Activity
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
                  Recent Expenses
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                  Your five most recently recorded expenses.
                </p>
              </div>

              <Link
                href="/expenses"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[#D4A34F]/25 bg-[#10271F] px-5 text-sm font-semibold text-[#F0C86A] transition hover:bg-[#D4A34F]/10"
              >
                View All Expenses
              </Link>
            </div>

            {summary.recent_expenses.length ===
            0 ? (
              <EmptyAnalyticsMessage className="mt-6">
                No recent expenses found.
              </EmptyAnalyticsMessage>
            ) : (
              <div className="mt-6 divide-y divide-[#205C46]/25">
                {summary.recent_expenses.map(
                  (expense) => (
                    <div
                      key={expense.id}
                      className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                          <ReceiptText size={20} />
                        </div>

                        <div>
                          <p className="font-bold text-[#FBFAF7]">
                            {expense.category}
                          </p>

                          <p className="mt-1 text-sm leading-6 text-[#9EAEA7]">
                            {expense.description ||
                              "No description"}
                          </p>

                          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#7F9189]">
                            <CalendarDays className="h-3.5 w-3.5 text-[#F0C86A]" />

                            {formatDate(
                              expense.date
                            )}
                          </p>
                        </div>
                      </div>

                      <p className="shrink-0 text-lg font-bold text-[#F0C86A]">
                        {formatCurrency(
                          expense.amount
                        )}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

interface DashboardStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  danger?: boolean;
}

function DashboardStatCard({
  title,
  value,
  description,
  icon,
  danger = false,
}: DashboardStatCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-[#205C46]/35 bg-[#0D211B] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A34F]/30">
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D4A34F]/8 blur-3xl" />

      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
          {icon}
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
          {title}
        </p>

        <p
          className={
            danger
              ? "mt-2 break-words text-2xl font-bold text-red-300"
              : "mt-2 break-words text-2xl font-bold text-[#FBFAF7]"
          }
        >
          {value}
        </p>

        <p className="mt-3 text-xs leading-5 text-[#9EAEA7]">
          {description}
        </p>
      </div>
    </article>
  );
}

interface AnalyticsSectionProps {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

function AnalyticsSection({
  icon,
  eyebrow,
  title,
  description,
  children,
}: AnalyticsSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4A34F]/8 blur-3xl" />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
            {icon}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
              {eyebrow}
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#FBFAF7]">
              {title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-7">
          {children}
        </div>
      </div>
    </section>
  );
}

interface EmptyAnalyticsMessageProps {
  children: React.ReactNode;
  className?: string;
}

function EmptyAnalyticsMessage({
  children,
  className = "",
}: EmptyAnalyticsMessageProps) {
  return (
    <p
      className={`rounded-[20px] border border-[#205C46]/30 bg-[#10271F] p-6 text-center text-sm leading-6 text-[#9EAEA7] ${className}`}
    >
      {children}
    </p>
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