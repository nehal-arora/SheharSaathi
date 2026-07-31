"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  Download,
  FileText,
  IndianRupee,
  Loader2,
  ReceiptText,
  Sparkles,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getMonthlyReport } from "@/features/expenses/services/expense.service";

import { formatCurrency } from "@/features/expenses/utils/expense.utils";

import type { MonthlyReport } from "@/types/expenses";

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

export default function ExpenseReportPage() {
  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] =
    useState(currentDate.getMonth() + 1);

  const [selectedYear, setSelectedYear] =
    useState(currentDate.getFullYear());

  const [report, setReport] =
    useState<MonthlyReport | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadReport() {
    try {
      setLoading(true);

      const response = await getMonthlyReport(
        selectedMonth,
        selectedYear
      );

      setReport(response);
    } catch (error) {
      console.error(
        "Unable to load monthly report:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to load monthly report."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadReport();
  }, [selectedMonth, selectedYear]);

  function downloadReport() {
    if (!report) {
      toast.error(
        "Report data is not available."
      );

      return;
    }

    const reportText =
      createReportText(report);

    const blob = new Blob([reportText], {
      type: "text/plain;charset=utf-8",
    });

    const fileUrl =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = fileUrl;

    link.download = `expense-report-${report.year}-${String(
      report.month
    ).padStart(2, "0")}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(fileUrl);

    toast.success(
      "Expense report downloaded."
    );
  }

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
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <FileText size={36} />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                  <Sparkles size={15} />

                  Financial Report
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl lg:text-6xl">
                  Monthly Expense
                  <span className="block text-[#F0C86A]">
                    Report
                  </span>
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[#B8C5BF] sm:text-lg">
                  Review your monthly spending, budget
                  usage, category distribution and
                  overall financial activity.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={!report || loading}
              onClick={downloadReport}
              className="min-h-14 rounded-[22px] border-[#D4A34F]/30 bg-[#D4A34F]/10 px-6 font-bold text-[#F0C86A] hover:bg-[#D4A34F]/15 hover:text-[#F0C86A] disabled:opacity-40"
            >
              <Download className="mr-2 h-5 w-5" />

              Download Report
            </Button>
          </div>
        </section>

        <section className="relative mt-8 overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A34F]/8 blur-3xl" />

          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                  Report Period
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#FBFAF7]">
                  Select Month and Year
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                  Choose the period whose expense report
                  you want to review.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="report-month"
                  className="text-sm font-semibold text-[#D6E0DB]"
                >
                  Month
                </label>

                <select
                  id="report-month"
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
                  htmlFor="report-year"
                  className="text-sm font-semibold text-[#D6E0DB]"
                >
                  Year
                </label>

                <Input
                  id="report-year"
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
          </div>
        </section>

        <section className="mt-8">
          {loading ? (
            <section className="flex min-h-[460px] items-center justify-center overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
              <div className="relative text-center">
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/10 blur-3xl" />

                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
                  <Loader2 className="h-9 w-9 animate-spin text-[#F0C86A]" />
                </div>

                <h2 className="mt-6 text-xl font-bold text-[#FBFAF7]">
                  Generating monthly report
                </h2>

                <p className="mt-2 text-sm text-[#9EAEA7]">
                  Preparing your spending summary and
                  category insights...
                </p>
              </div>
            </section>
          ) : !report ? (
            <section className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/25 bg-[#0D211B] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

              <div className="relative flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <FileText size={36} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                  Report unavailable
                </p>

                <h2 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
                  Unable to Load Report
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#9EAEA7] sm:text-base">
                  The selected monthly expense report
                  could not be loaded. Try requesting
                  the report again.
                </p>

                <Button
                  type="button"
                  onClick={loadReport}
                  className="mt-8 min-h-12 rounded-2xl bg-[#D4A34F] px-6 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] hover:bg-[#F0C86A]"
                >
                  Try Again
                </Button>
              </div>
            </section>
          ) : (
            <div className="space-y-8">
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <ReportCard
                  title="Total Spent"
                  value={formatCurrency(
                    report.total_spent
                  )}
                  description={`${report.expense_count} recorded expenses`}
                  icon={<IndianRupee size={22} />}
                />

                <ReportCard
                  title="Monthly Budget"
                  value={
                    report.budget !== null
                      ? formatCurrency(
                          report.budget
                        )
                      : "Not set"
                  }
                  description="Planned monthly limit"
                  icon={<WalletCards size={22} />}
                />

                <ReportCard
                  title="Remaining"
                  value={
                    report.remaining !== null
                      ? formatCurrency(
                          report.remaining
                        )
                      : "N/A"
                  }
                  description={
                    report.remaining !== null &&
                    report.remaining < 0
                      ? "Budget exceeded"
                      : "Available balance"
                  }
                  icon={<TrendingUp size={22} />}
                  danger={
                    report.remaining !== null &&
                    report.remaining < 0
                  }
                />

                <ReportCard
                  title="Average Daily Spend"
                  value={formatCurrency(
                    report.average_daily_spend
                  )}
                  description="Average per calendar day"
                  icon={<CalendarDays size={22} />}
                />
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4A34F]/8 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                        <BarChart3 size={22} />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                          Category Analytics
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-[#FBFAF7]">
                          Category Breakdown
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                          Distribution of expenses across
                          all categories.
                        </p>
                      </div>
                    </div>

                    {report.category_breakdown
                      .length === 0 ? (
                      <div className="mt-7 rounded-[22px] border border-[#205C46]/30 bg-[#10271F] p-8 text-center">
                        <ReceiptText className="mx-auto h-10 w-10 text-[#F0C86A]" />

                        <p className="mt-4 text-sm leading-6 text-[#9EAEA7]">
                          No expenses were recorded for
                          this month.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-7 space-y-6">
                        {report.category_breakdown.map(
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
                  </div>
                </section>

                <aside className="relative overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4A34F]/8 blur-3xl" />

                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                      Report Insights
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
                      Report Summary
                    </h2>

                    <div className="mt-6 space-y-4">
                      <SummaryRow
                        label="Report period"
                        value={`${
                          MONTHS[
                            report.month - 1
                          ]
                        } ${report.year}`}
                      />

                      <SummaryRow
                        label="Highest category"
                        value={
                          report.highest_category ??
                          "No expenses"
                        }
                      />

                      <SummaryRow
                        label="Expense count"
                        value={String(
                          report.expense_count
                        )}
                      />

                      <SummaryRow
                        label="Budget usage"
                        value={
                          report.budget_usage_percentage !==
                          null
                            ? `${report.budget_usage_percentage.toFixed(
                                1
                              )}%`
                            : "No budget"
                        }
                      />
                    </div>

                    <div className="mt-7 rounded-[22px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 p-5">
                      <div className="flex items-center gap-2 text-[#F0C86A]">
                        <Sparkles size={17} />

                        <p className="text-sm font-bold">
                          Spending Status
                        </p>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-[#B8C5BF]">
                        {getSpendingMessage(report)}
                      </p>
                    </div>
                  </div>
                </aside>
              </section>

              <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A34F]/8 blur-3xl" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                      Expense Management
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
                      Keep Your Report Updated
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#9EAEA7]">
                      Add new expenses or review existing
                      records to keep monthly insights accurate.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/expenses"
                      className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#205C46]/45 bg-[#10271F] px-5 text-sm font-semibold text-[#D6E0DB] transition hover:border-[#D4A34F]/35 hover:bg-[#D4A34F]/10 hover:text-[#F0C86A]"
                    >
                      View Expenses
                    </Link>

                    <Link
                      href="/expenses/add"
                      className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#D4A34F] px-5 text-sm font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:bg-[#F0C86A]"
                    >
                      Add Expense
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

const inputClasses =
  "h-12 rounded-[18px] border-[#205C46]/40 bg-[#10271F] px-4 text-sm text-[#FBFAF7] outline-none transition hover:border-[#205C46]/70 focus-visible:border-[#D4A34F] focus-visible:ring-4 focus-visible:ring-[#D4A34F]/10";

const selectClasses =
  "h-12 w-full rounded-[18px] border border-[#205C46]/40 bg-[#10271F] px-4 text-sm text-[#FBFAF7] outline-none transition hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10";

interface ReportCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  danger?: boolean;
}

function ReportCard({
  title,
  value,
  description,
  icon,
  danger = false,
}: ReportCardProps) {
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

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({
  label,
  value,
}: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#205C46]/25 pb-4 last:border-0 last:pb-0">
      <p className="text-sm text-[#7F9189]">
        {label}
      </p>

      <p className="text-right text-sm font-semibold text-[#FBFAF7]">
        {value}
      </p>
    </div>
  );
}

function getSpendingMessage(
  report: MonthlyReport
): string {
  if (report.budget === null) {
    return "No monthly budget has been set. Set a budget to compare your spending against a planned limit.";
  }

  if (
    report.remaining !== null &&
    report.remaining < 0
  ) {
    return "Your spending has exceeded the monthly budget. Review the highest spending categories and reduce avoidable expenses.";
  }

  if (
    report.budget_usage_percentage !==
      null &&
    report.budget_usage_percentage >= 80
  ) {
    return "You are close to your monthly budget limit. Monitor upcoming expenses carefully.";
  }

  return "Your spending is currently within the monthly budget.";
}

function createReportText(
  report: MonthlyReport
): string {
  const monthName =
    MONTHS[report.month - 1];

  const categoryLines =
    report.category_breakdown.length > 0
      ? report.category_breakdown
          .map(
            (item) =>
              `${item.category}: ${formatCurrency(
                item.amount
              )} (${item.percentage.toFixed(
                1
              )}%)`
          )
          .join("\n")
      : "No category expenses recorded.";

  return [
    "शहरSaathi Monthly Expense Report",
    "",
    `Period: ${monthName} ${report.year}`,
    `Total Spent: ${formatCurrency(
      report.total_spent
    )}`,
    `Budget: ${
      report.budget !== null
        ? formatCurrency(report.budget)
        : "Not set"
    }`,
    `Remaining: ${
      report.remaining !== null
        ? formatCurrency(
            report.remaining
          )
        : "N/A"
    }`,
    `Budget Usage: ${
      report.budget_usage_percentage !==
      null
        ? `${report.budget_usage_percentage.toFixed(
            1
          )}%`
        : "N/A"
    }`,
    `Expense Count: ${report.expense_count}`,
    `Highest Category: ${
      report.highest_category ??
      "No expenses"
    }`,
    `Average Daily Spend: ${formatCurrency(
      report.average_daily_spend
    )}`,
    "",
    "Category Breakdown",
    categoryLines,
  ].join("\n");
}