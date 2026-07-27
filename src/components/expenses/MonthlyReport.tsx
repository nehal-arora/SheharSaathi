import {
  CalendarDays,
  ChartNoAxesCombined,
  CircleDollarSign,
  ReceiptText,
  Trophy,
  WalletCards,
} from "lucide-react";

import type { MonthlyReport as MonthlyReportType } from "@/types/expenses";

import {
  formatCurrency,
  formatMonthYear,
} from "@/features/expenses/utils/expense.utils";

interface MonthlyReportProps {
  report: MonthlyReportType;
}

export default function MonthlyReport({
  report,
}: MonthlyReportProps) {
  const summaryItems = [
    {
      title: "Total Spent",
      value: formatCurrency(report.total_spent),
      description: "Total expenses recorded this month",
      icon: CircleDollarSign,
    },
    {
      title: "Monthly Budget",
      value:
        report.budget !== null
          ? formatCurrency(report.budget)
          : "Not set",
      description: "Your planned spending limit",
      icon: WalletCards,
    },
    {
      title: "Remaining",
      value:
        report.remaining !== null
          ? formatCurrency(report.remaining)
          : "N/A",
      description:
        report.remaining !== null &&
        report.remaining < 0
          ? "Amount spent above your budget"
          : "Budget left for this month",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Expense Count",
      value: report.expense_count.toString(),
      description: "Number of expenses recorded",
      icon: ReceiptText,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
              <CalendarDays size={23} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#333333]">
                Monthly Expense Report
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                A complete spending summary for{" "}
                {formatMonthYear(
                  report.month,
                  report.year
                )}
                .
              </p>
            </div>
          </div>

          <div className="rounded-full bg-[#EEF2E4] px-4 py-2 text-sm font-semibold text-[#6B8E23]">
            {formatMonthYear(
              report.month,
              report.year
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${
                      item.title === "Remaining" &&
                      report.remaining !== null &&
                      report.remaining < 0
                        ? "text-red-600"
                        : "text-[#333333]"
                    }`}
                  >
                    {item.value}
                  </p>

                  <p className="mt-2 text-sm leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
                  <Icon size={21} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
              <Trophy size={21} />
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Highest Spending Category
              </p>

              <p className="mt-2 text-2xl font-bold text-[#333333]">
                {report.highest_category ??
                  "No expenses"}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                The category with the highest total spending this month.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
              <ChartNoAxesCombined size={21} />
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Average Daily Spend
              </p>

              <p className="mt-2 text-2xl font-bold text-[#333333]">
                {formatCurrency(
                  report.average_daily_spend
                )}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Average spending calculated across all days of the month.
              </p>
            </div>
          </div>
        </article>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#E7E2D5] bg-white shadow-sm">
        <div className="border-b border-[#E7E2D5] px-5 py-5 sm:px-6">
          <h3 className="text-lg font-bold text-[#333333]">
            Category Breakdown
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Detailed spending distribution across all categories.
          </p>
        </div>

        {report.category_breakdown.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-semibold text-[#333333]">
              No expense data available
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Category details will appear after expenses are added.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse">
              <thead className="bg-[#FBFAF5]">
                <tr className="border-b border-[#E7E2D5] text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-6">
                    Category
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-6">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-6">
                    Share
                  </th>
                </tr>
              </thead>

              <tbody>
                {report.category_breakdown.map(
                  (item) => (
                    <tr
                      key={item.category}
                      className="border-b border-[#EEEADD] last:border-b-0"
                    >
                      <td className="px-5 py-4 font-medium text-[#333333] sm:px-6">
                        {item.category}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-[#333333] sm:px-6">
                        {formatCurrency(
                          item.amount
                        )}
                      </td>

                      <td className="px-5 py-4 text-right sm:px-6">
                        <span className="inline-flex rounded-full bg-[#EEF2E4] px-3 py-1 text-sm font-semibold text-[#6B8E23]">
                          {item.percentage.toFixed(
                            1
                          )}
                          %
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}