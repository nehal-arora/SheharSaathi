"use client";

import { useState } from "react";
import {
  BadgeIndianRupee,
  Calculator,
  CircleAlert,
  PiggyBank,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import AIErrorState from "@/components/ai/AIErrorState";
import AIHeader from "@/components/ai/AIHeader";
import AILoadingState from "@/components/ai/AILoadingState";
import AIResultCard from "@/components/ai/AIResultCard";

import { getBudgetAdvice } from "@/features/ai/services/ai.service";

import type {
  BudgetAdviceRequest,
  BudgetAdviceResponse,
} from "@/features/ai/types";

const initialForm: BudgetAdviceRequest = {
  monthly_income: 50000,
  monthly_budget: 35000,
  rent: 15000,
  food: 6000,
  transport: 3000,
  utilities: 2500,
  other_expenses: 3500,
  savings: 5000,
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BudgetAdvisorPage() {
  const [form, setForm] =
    useState<BudgetAdviceRequest>(initialForm);

  const [result, setResult] =
    useState<BudgetAdviceResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: keyof BudgetAdviceRequest,
    value: number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function generateAdvice() {
    try {
      setLoading(true);
      setError("");

      const response = await getBudgetAdvice(form);

      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate budget advice."
      );

      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    await generateAdvice();
  }

  const fields: Array<{
    key: keyof BudgetAdviceRequest;
    label: string;
    placeholder: string;
  }> = [
    {
      key: "monthly_income",
      label: "Monthly income",
      placeholder: "50000",
    },
    {
      key: "monthly_budget",
      label: "Target monthly budget",
      placeholder: "35000",
    },
    {
      key: "rent",
      label: "Rent",
      placeholder: "15000",
    },
    {
      key: "food",
      label: "Food",
      placeholder: "6000",
    },
    {
      key: "transport",
      label: "Transport",
      placeholder: "3000",
    },
    {
      key: "utilities",
      label: "Utilities",
      placeholder: "2500",
    },
    {
      key: "other_expenses",
      label: "Other expenses",
      placeholder: "3500",
    },
    {
      key: "savings",
      label: "Planned savings",
      placeholder: "5000",
    },
  ];

  const totalExpenses =
    result?.total_expenses ??
    result?.estimated_total_expenses ??
    0;

  const remainingAmount =
    result?.remaining_amount ??
    result?.estimated_savings ??
    0;

  const savingsRate =
    result?.savings_rate ??
    (result?.monthly_income && result.monthly_income > 0
      ? (remainingAmount / result.monthly_income) * 100
      : 0);

  const advice =
    result?.advice ??
    result?.summary ??
    "No budget summary was returned.";

  const spendingAlerts = Array.isArray(
    result?.spending_alerts
  )
    ? result.spending_alerts
    : Array.isArray(result?.warnings)
      ? result.warnings
      : [];

  const savingsSuggestions = Array.isArray(
    result?.savings_suggestions
  )
    ? result.savings_suggestions
    : Array.isArray(result?.recommendations)
      ? result.recommendations
      : [];

  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <AIHeader
          badge="AI Budget Advisor"
          title="Plan a realistic monthly relocation budget"
          description="Enter your income and estimated expenses to receive an AI-generated budget analysis, spending alerts, and savings suggestions."
          icon={<Calculator className="h-7 w-7" />}
        />

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
          <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] lg:sticky lg:top-6">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D4A34F]/8 blur-3xl" />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <BadgeIndianRupee className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                    Financial Inputs
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#FBFAF7]">
                    Monthly Financial Details
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                    Add your expected income, living costs and savings target.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-6"
              >
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  {fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <label
                        htmlFor={field.key}
                        className="text-sm font-semibold text-[#D6E0DB]"
                      >
                        {field.label}
                      </label>

                      <div className="relative">
                        <BadgeIndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F0C86A]" />

                        <input
                          id={field.key}
                          type="number"
                          min={0}
                          value={form[field.key]}
                          onChange={(event) =>
                            updateField(
                              field.key,
                              Number(event.target.value)
                            )
                          }
                          placeholder={field.placeholder}
                          className="h-12 w-full rounded-[18px] border border-[#205C46]/40 bg-[#10271F] pl-11 pr-4 text-sm text-[#FBFAF7] outline-none transition placeholder:text-[#6F8179] hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-5 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:bg-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Calculator className="h-4 w-4" />

                  {loading
                    ? "Generating advice..."
                    : "Generate Budget Advice"}
                </button>
              </form>
            </div>
          </section>

          <section className="min-w-0">
            {loading ? (
              <AILoadingState
                title="Preparing your budget analysis"
                description="शहरSaathi is reviewing your income, expenses, spending balance, and savings target."
              />
            ) : error ? (
              <AIErrorState
                title="Unable to generate budget advice"
                message={error}
                onRetry={generateAdvice}
                retrying={loading}
              />
            ) : result ? (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <BudgetMetric
                    title="Total expenses"
                    value={formatCurrency(totalExpenses)}
                    tone="default"
                  />

                  <BudgetMetric
                    title="Remaining amount"
                    value={formatCurrency(remainingAmount)}
                    tone="positive"
                  />

                  <BudgetMetric
                    title="Savings rate"
                    value={`${savingsRate.toFixed(1)}%`}
                    tone="default"
                  />
                </div>

                <AIResultCard
                  title="AI budget advice"
                  description="A personalised overview based on the financial details you provided."
                  icon={<TrendingUp className="h-5 w-5" />}
                >
                  <p className="text-sm leading-7 text-[#D6E0DB]">
                    {advice}
                  </p>
                </AIResultCard>

                <div className="grid gap-6 xl:grid-cols-2">
                  <AIResultCard
                    title="Spending alerts"
                    description="Areas that may require closer attention."
                    icon={<CircleAlert className="h-5 w-5" />}
                  >
                    {spendingAlerts.length > 0 ? (
                      <ul className="space-y-3">
                        {spendingAlerts.map((alert, index) => (
                          <li
                            key={`${alert}-${index}`}
                            className="flex items-start gap-3 rounded-[18px] border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-300" />
                            {alert}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm leading-6 text-[#9EAEA7]">
                        No major spending alerts were identified.
                      </p>
                    )}
                  </AIResultCard>

                  <AIResultCard
                    title="Savings suggestions"
                    description="Practical ideas for improving your monthly savings."
                    icon={<PiggyBank className="h-5 w-5" />}
                  >
                    {savingsSuggestions.length > 0 ? (
                      <ul className="space-y-3">
                        {savingsSuggestions.map(
                          (suggestion, index) => (
                            <li
                              key={`${suggestion}-${index}`}
                              className="flex items-start gap-3 rounded-[18px] border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100"
                            >
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
                              {suggestion}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm leading-6 text-[#9EAEA7]">
                        No additional savings suggestions are available.
                      </p>
                    )}
                  </AIResultCard>
                </div>
              </div>
            ) : (
              <section className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/25 bg-[#0D211B] px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

                <div className="relative flex flex-col items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                    <PiggyBank className="h-10 w-10" />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                    AI Financial Planning
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
                    Your Budget Advice Will Appear Here
                  </h2>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-[#9EAEA7] sm:text-base">
                    Enter your monthly income, expected expenses and savings
                    target to generate a personalised financial plan.
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#205C46]/40 bg-[#10271F] px-4 py-2 text-sm font-semibold text-[#D6E0DB]">
                    <Sparkles className="h-4 w-4 text-[#F0C86A]" />
                    Smart financial analysis
                  </div>
                </div>
              </section>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

interface BudgetMetricProps {
  title: string;
  value: string;
  tone?: "default" | "positive";
}

function BudgetMetric({
  title,
  value,
  tone = "default",
}: BudgetMetricProps) {
  return (
    <article className="relative overflow-hidden rounded-[24px] border border-[#205C46]/35 bg-[#0D211B] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4A34F]/8 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
          {title}
        </p>

        <p
          className={
            tone === "positive"
              ? "mt-3 break-words text-2xl font-bold text-emerald-300"
              : "mt-3 break-words text-2xl font-bold text-[#FBFAF7]"
          }
        >
          {value}
        </p>
      </div>
    </article>
  );
}