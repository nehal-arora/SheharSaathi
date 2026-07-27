import {
  AlertTriangle,
  CheckCircle2,
  IndianRupee,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

import {
  formatCurrency,
  getBudgetStatus,
  getBudgetStatusLabel,
} from "@/features/expenses/utils/expense.utils";

interface BudgetCardProps {
  budget: number | null;
  totalSpent: number;
  remaining: number | null;
  usagePercentage: number | null;
}

export default function BudgetCard({
  budget,
  totalSpent,
  remaining,
  usagePercentage,
}: BudgetCardProps) {
  const budgetStatus =
    getBudgetStatus(usagePercentage);

  const progressValue = Math.min(
    Math.max(usagePercentage ?? 0, 0),
    100
  );

  const hasBudget = budget !== null;

  const statusStyles = {
    safe: {
      container:
        "border-green-200 bg-green-50",
      icon: "bg-green-100 text-green-700",
      text: "text-green-700",
      progress: "bg-green-600",
    },
    warning: {
      container:
        "border-amber-200 bg-amber-50",
      icon: "bg-amber-100 text-amber-700",
      text: "text-amber-700",
      progress: "bg-amber-500",
    },
    danger: {
      container:
        "border-red-200 bg-red-50",
      icon: "bg-red-100 text-red-700",
      text: "text-red-700",
      progress: "bg-red-600",
    },
    none: {
      container:
        "border-[#E7E2D5] bg-[#FBFAF5]",
      icon: "bg-[#EEF2E4] text-[#6B8E23]",
      text: "text-muted-foreground",
      progress: "bg-[#6B8E23]",
    },
  };

  const currentStyles =
    statusStyles[budgetStatus];

  function renderStatusIcon() {
    if (budgetStatus === "danger") {
      return <AlertTriangle size={18} />;
    }

    if (budgetStatus === "safe") {
      return <CheckCircle2 size={18} />;
    }

    return <TrendingUp size={18} />;
  }

  return (
    <section className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
              <PiggyBank size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#333333]">
                Monthly Budget
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Track how much of your budget
                has been used.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-[#EEF2E4] px-3 py-1 text-sm font-semibold text-[#6B8E23]">
            <IndianRupee size={15} />
            Budget
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-[#FBFAF5] p-4">
            <p className="text-sm text-muted-foreground">
              Budget
            </p>

            <p className="mt-2 text-xl font-bold text-[#333333]">
              {hasBudget
                ? formatCurrency(budget)
                : "Not set"}
            </p>
          </div>

          <div className="rounded-xl bg-[#FBFAF5] p-4">
            <p className="text-sm text-muted-foreground">
              Spent
            </p>

            <p className="mt-2 text-xl font-bold text-[#333333]">
              {formatCurrency(totalSpent)}
            </p>
          </div>

          <div className="rounded-xl bg-[#FBFAF5] p-4">
            <p className="text-sm text-muted-foreground">
              Remaining
            </p>

            <p
              className={`mt-2 text-xl font-bold ${
                remaining !== null &&
                remaining < 0
                  ? "text-red-600"
                  : "text-[#333333]"
              }`}
            >
              {remaining !== null
                ? formatCurrency(remaining)
                : "N/A"}
            </p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-[#333333]">
              Budget usage
            </p>

            <p className="text-sm font-semibold text-[#333333]">
              {usagePercentage !== null
                ? `${usagePercentage.toFixed(1)}%`
                : "No budget"}
            </p>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-[#EEEADD]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${currentStyles.progress}`}
              style={{
                width: `${progressValue}%`,
              }}
            />
          </div>
        </div>

        <div
          className={`flex items-start gap-3 rounded-xl border p-4 ${currentStyles.container}`}
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${currentStyles.icon}`}
          >
            {renderStatusIcon()}
          </div>

          <div>
            <p
              className={`font-semibold ${currentStyles.text}`}
            >
              {getBudgetStatusLabel(
                usagePercentage
              )}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {!hasBudget
                ? "Set a monthly budget to monitor your spending limit."
                : budgetStatus === "danger"
                  ? "Your spending has crossed the monthly budget."
                  : budgetStatus === "warning"
                    ? "You are close to your monthly budget limit."
                    : "Your expenses are currently within the planned budget."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}