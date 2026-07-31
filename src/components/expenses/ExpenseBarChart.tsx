"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SpendingTrendItem } from "@/types/expenses";

import { formatCurrency } from "@/features/expenses/utils/expense.utils";

interface ExpenseBarChartProps {
  data: SpendingTrendItem[];
}

interface TooltipPayloadItem {
  value?: number;
  payload?: SpendingTrendItem;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({
  active,
  payload,
}: CustomTooltipProps) {
  if (
    !active ||
    !payload ||
    payload.length === 0
  ) {
    return null;
  }

  const item = payload[0].payload;

  if (!item) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[#D4A34F]/20 bg-[#0D211B] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      <p className="font-semibold text-[#FBFAF7]">
        {item.label}
      </p>

      <p className="mt-1 text-sm font-bold text-[#F0C86A]">
        {formatCurrency(item.total_spent)}
      </p>
    </div>
  );
}

function formatYAxisValue(value: number): string {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${Math.round(value / 1000)}K`;
  }

  return `₹${value}`;
}

export default function ExpenseBarChart({
  data,
}: ExpenseBarChartProps) {
  const hasData =
    data.length > 0 &&
    data.some(
      (item) => item.total_spent > 0
    );

  if (!hasData) {
    return (
      <section className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/25 bg-[#0D211B] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

        <div className="relative flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-3xl">
            📈
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
            Spending analytics
          </p>

          <h2 className="mt-3 text-2xl font-bold text-[#FBFAF7]">
            No spending trend yet
          </h2>

          <p className="mt-3 max-w-md text-sm leading-7 text-[#9EAEA7]">
            Monthly spending trends will appear
            here once expense data becomes
            available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A34F]/8 blur-3xl" />

      <div className="relative">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
            Monthly analytics
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
            Monthly Spending Trend
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
            Compare your total spending across
            recent months.
          </p>
        </div>

        <div className="h-[340px] w-full rounded-[24px] border border-[#205C46]/25 bg-[#10271F] p-3 sm:p-5">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 5,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="expenseBarGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#F0C86A"
                  />

                  <stop
                    offset="100%"
                    stopColor="#D4A34F"
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="rgba(138,181,156,0.16)"
              />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#9EAEA7",
                  fontSize: 12,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                width={64}
                tick={{
                  fill: "#9EAEA7",
                  fontSize: 12,
                }}
                tickFormatter={
                  formatYAxisValue
                }
              />

              <Tooltip
                cursor={{
                  fill:
                    "rgba(212,163,79,0.07)",
                }}
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="total_spent"
                name="Total spent"
                fill="url(#expenseBarGradient)"
                radius={[10, 10, 0, 0]}
                maxBarSize={56}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}