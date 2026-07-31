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
        "border-emerald-400/20 bg-emerald-400/10",
      icon:
        "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
      text: "text-emerald-300",
      progress:
        "bg-gradient-to-r from-emerald-500 to-emerald-300",
    },

    warning: {
      container:
        "border-amber-400/20 bg-amber-400/10",
      icon:
        "border border-amber-400/20 bg-amber-400/10 text-amber-300",
      text: "text-amber-300",
      progress:
        "bg-gradient-to-r from-amber-500 to-[#F0C86A]",
    },

    danger: {
      container:
        "border-red-400/20 bg-red-400/10",
      icon:
        "border border-red-400/20 bg-red-400/10 text-red-300",
      text: "text-red-300",
      progress:
        "bg-gradient-to-r from-red-600 to-red-400",
    },

    none: {
      container:
        "border-[#205C46]/35 bg-[#10271F]",
      icon:
        "border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]",
      text: "text-[#D6E0DB]",
      progress:
        "bg-gradient-to-r from-[#B27B2D] to-[#F0C86A]",
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
    <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#D4A34F]/10 blur-3xl" />

      <div className="relative flex flex-col gap-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
              <PiggyBank size={25} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                Budget overview
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
                Monthly Budget
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#9EAEA7]">
                Track your planned budget, current
                spending and the amount remaining for
                the month.
              </p>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-2 text-sm font-bold text-[#F0C86A]">
            <IndianRupee size={15} />
            Monthly Plan
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <BudgetStat
            label="Budget"
            value={
              hasBudget
                ? formatCurrency(budget)
                : "Not set"
            }
          />

          <BudgetStat
            label="Spent"
            value={formatCurrency(totalSpent)}
          />

          <BudgetStat
            label="Remaining"
            value={
              remaining !== null
                ? formatCurrency(remaining)
                : "N/A"
            }
            danger={
              remaining !== null &&
              remaining < 0
            }
          />
        </div>

        <div className="rounded-[24px] border border-[#205C46]/30 bg-[#10271F] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#D6E0DB]">
                Budget usage
              </p>

              <p className="mt-1 text-xs text-[#7F9189]">
                Percentage of your monthly
                budget already used.
              </p>
            </div>

            <div className="rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-2 text-sm font-bold text-[#F0C86A]">
              {usagePercentage !== null
                ? `${usagePercentage.toFixed(1)}%`
                : "No budget"}
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#071512]">
            <div
              className={`h-full rounded-full transition-all duration-700 ${currentStyles.progress}`}
              style={{
                width: `${progressValue}%`,
              }}
            />
          </div>
        </div>

        <div
          className={`flex items-start gap-4 rounded-[22px] border p-5 ${currentStyles.container}`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${currentStyles.icon}`}
          >
            {renderStatusIcon()}
          </div>

          <div>
            <p
              className={`font-bold ${currentStyles.text}`}
            >
              {getBudgetStatusLabel(
                usagePercentage
              )}
            </p>

            <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
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

interface BudgetStatProps {
  label: string;
  value: string;
  danger?: boolean;
}

function BudgetStat({
  label,
  value,
  danger = false,
}: BudgetStatProps) {
  return (
    <div className="rounded-[22px] border border-[#205C46]/30 bg-[#10271F] p-5 transition hover:border-[#D4A34F]/25">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
        {label}
      </p>

      <p
        className={
          danger
            ? "mt-3 break-words text-2xl font-bold text-red-300"
            : "mt-3 break-words text-2xl font-bold text-[#FBFAF7]"
        }
      >
        {value}
      </p>
    </div>
  );
}