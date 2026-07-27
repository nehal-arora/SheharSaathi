"use client";

import { useState } from "react";
import {
  BadgeIndianRupee,
  Calculator,
  CircleAlert,
  PiggyBank,
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

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AIHeader
          badge="AI Budget Advisor"
          title="Plan a realistic monthly relocation budget"
          description="Enter your income and estimated expenses to receive an AI-generated budget analysis, spending alerts, and savings suggestions."
          icon={<Calculator className="h-7 w-7" />}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[400px_1fr]">
          <section className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Monthly financial details
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add your expected income, living costs, and savings
              target.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={field.key}
                      className="text-sm font-medium text-gray-700"
                    >
                      {field.label}
                    </label>

                    <div className="relative mt-2">
                      <BadgeIndianRupee className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

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
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#58751d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Calculator className="h-4 w-4" />

                {loading
                  ? "Generating advice..."
                  : "Generate budget advice"}
              </button>
            </form>
          </section>

          <section>
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
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                      Total expenses
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      ₹
                      {result.total_expenses.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                      Remaining amount
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#6B8E23]">
                      ₹
                      {result.remaining_amount.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                      Savings rate
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {result.savings_rate.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <AIResultCard
                  title="AI budget advice"
                  description="A personalised overview based on the financial details you provided."
                  icon={<TrendingUp className="h-5 w-5" />}
                >
                  <p className="text-sm leading-7 text-gray-700">
                    {result.advice}
                  </p>
                </AIResultCard>

                <div className="grid gap-6 xl:grid-cols-2">
                  <AIResultCard
                    title="Spending alerts"
                    description="Areas that may require closer attention."
                    icon={<CircleAlert className="h-5 w-5" />}
                  >
                    {result.spending_alerts.length > 0 ? (
                      <ul className="space-y-3">
                        {result.spending_alerts.map((alert) => (
                          <li
                            key={alert}
                            className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                            {alert}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No major spending alerts were identified.
                      </p>
                    )}
                  </AIResultCard>

                  <AIResultCard
                    title="Savings suggestions"
                    description="Practical ideas for improving your monthly savings."
                    icon={<PiggyBank className="h-5 w-5" />}
                  >
                    {result.savings_suggestions.length > 0 ? (
                      <ul className="space-y-3">
                        {result.savings_suggestions.map(
                          (suggestion) => (
                            <li
                              key={suggestion}
                              className="flex items-start gap-3 rounded-xl bg-[#EEF2E4] p-4 text-sm leading-6 text-gray-700"
                            >
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#6B8E23]" />
                              {suggestion}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No additional savings suggestions are
                        available.
                      </p>
                    )}
                  </AIResultCard>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[460px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
                  <PiggyBank className="h-7 w-7" />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-gray-900">
                  Your budget advice will appear here
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Enter your monthly income, expected expenses, and
                  savings target to generate a personalised financial
                  plan.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}