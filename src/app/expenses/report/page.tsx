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
    loadReport();
  }, [selectedMonth, selectedYear]);

  function downloadReport() {
    if (!report) {
      toast.error(
        "Report data is not available."
      );
      return;
    }

    const reportText = createReportText(
      report
    );

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
            <FileText size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#333333]">
              Monthly Expense Report
            </h1>

            <p className="mt-1 text-muted-foreground">
              Review your spending summary and
              category-wise expenses.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={!report || loading}
          onClick={downloadReport}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </header>

      <section className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#333333]">
              Report period
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Select the month and year for
              which you want to view the report.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="report-month"
              className="text-sm font-semibold text-[#333333]"
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
              htmlFor="report-year"
              className="text-sm font-semibold text-[#333333]"
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
            />
          </div>
        </div>
      </section>

      {loading ? (
        <section className="flex min-h-[420px] items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white shadow-sm">
          <div className="flex flex-col items-center gap-3 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#6B8E23]" />

            <p className="text-sm font-medium text-muted-foreground">
              Generating monthly report...
            </p>
          </div>
        </section>
      ) : !report ? (
        <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white p-6 text-center shadow-sm">
          <FileText className="h-10 w-10 text-[#6B8E23]" />

          <h2 className="mt-4 text-xl font-bold text-[#333333]">
            Report unavailable
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            The expense report could not be
            loaded.
          </p>

          <Button
            type="button"
            className="mt-6 bg-[#6B8E23] text-white hover:bg-[#5D7D1F]"
            onClick={loadReport}
          >
            Try Again
          </Button>
        </section>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ReportCard
              title="Total Spent"
              value={formatCurrency(
                report.total_spent
              )}
              description={`${report.expense_count} recorded expenses`}
              icon={<IndianRupee size={21} />}
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
              icon={<WalletCards size={21} />}
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
              icon={<TrendingUp size={21} />}
            />

            <ReportCard
              title="Average Daily Spend"
              value={formatCurrency(
                report.average_daily_spend
              )}
              description="Average per calendar day"
              icon={<CalendarDays size={21} />}
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
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
                    Distribution of expenses by
                    category.
                  </p>
                </div>
              </div>

              {report.category_breakdown
                .length === 0 ? (
                <div className="mt-6 rounded-xl bg-[#FBFAF5] p-8 text-center">
                  <ReceiptText className="mx-auto h-9 w-9 text-[#6B8E23]" />

                  <p className="mt-3 text-sm text-muted-foreground">
                    No expenses were recorded
                    for this month.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  {report.category_breakdown.map(
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

            <aside className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-[#333333]">
                Report Summary
              </h2>

              <div className="mt-5 space-y-4">
                <SummaryRow
                  label="Report period"
                  value={`${
                    MONTHS[report.month - 1]
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

              <div className="mt-6 rounded-xl bg-[#FBFAF5] p-4">
                <p className="text-sm font-semibold text-[#333333]">
                  Spending status
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {getSpendingMessage(report)}
                </p>
              </div>
            </aside>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-[#333333]">
                Manage your expenses
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Add or review expenses to keep
                your report updated.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/expenses"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent"
              >
                View Expenses
              </Link>

              <Link
                href="/expenses/add"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#6B8E23] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5D7D1F]"
              >
                Add Expense
              </Link>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

interface ReportCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function ReportCard({
  title,
  value,
  description,
  icon,
}: ReportCardProps) {
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

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({
  label,
  value,
}: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#EEEADD] pb-4 last:border-0 last:pb-0">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="text-right text-sm font-semibold text-[#333333]">
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