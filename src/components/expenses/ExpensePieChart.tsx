"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { CategoryBreakdownItem } from "@/types/expenses";

import { formatCurrency } from "@/features/expenses/utils/expense.utils";

interface ExpensePieChartProps {
  data: CategoryBreakdownItem[];
}

const CHART_COLORS = [
  "#6B8E23",
  "#D6C7A1",
  "#8FAF4D",
  "#B59F68",
  "#7A9E35",
  "#C8B98D",
  "#98B85F",
  "#A78D52",
  "#BBCD8A",
];

interface TooltipPayloadItem {
  value?: number;
  payload?: CategoryBreakdownItem;
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
        {item.category}
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        {formatCurrency(item.amount)}
      </p>

      <p className="mt-1 text-sm font-medium text-[#6B8E23]">
        {item.percentage.toFixed(1)}%
      </p>
    </div>
  );
}

export default function ExpensePieChart({
  data,
}: ExpensePieChartProps) {
  const hasData =
    data.length > 0 &&
    data.some((item) => item.amount > 0);

  if (!hasData) {
    return (
      <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white p-6 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2E4] text-2xl">
          📊
        </div>

        <h2 className="mt-4 text-lg font-bold text-[#333333]">
          No category data
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Add expenses to see how your spending is distributed across categories.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#333333]">
          Spending by Category
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          See which categories make up most of your monthly expenses.
        </p>
      </div>

      <div className="h-[340px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="45%"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((item, index) => (
                <Cell
                  key={`${item.category}-${index}`}
                  fill={
                    CHART_COLORS[
                      index %
                        CHART_COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              content={<CustomTooltip />}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value: string) => (
                <span className="text-sm text-[#333333]">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}