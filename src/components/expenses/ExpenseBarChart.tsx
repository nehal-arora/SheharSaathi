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
    <div className="rounded-xl border border-[#E7E2D5] bg-white px-4 py-3 shadow-lg">
      <p className="font-semibold text-[#333333]">
        {item.label}
      </p>

      <p className="mt-1 text-sm font-medium text-[#6B8E23]">
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
      <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white p-6 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2E4] text-2xl">
          📈
        </div>

        <h2 className="mt-4 text-lg font-bold text-[#333333]">
          No spending trend yet
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Monthly spending trends will
          appear once expense data is
          available.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#333333]">
          Monthly Spending Trend
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Compare your total spending
          across recent months.
        </p>
      </div>

      <div className="h-[340px] w-full">
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
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E7E2D5"
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#666666",
                fontSize: 12,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={64}
              tick={{
                fill: "#666666",
                fontSize: 12,
              }}
              tickFormatter={
                formatYAxisValue
              }
            />

            <Tooltip
              cursor={{
                fill:
                  "rgba(238, 242, 228, 0.55)",
              }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="total_spent"
              name="Total spent"
              fill="#6B8E23"
              radius={[8, 8, 0, 0]}
              maxBarSize={56}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}