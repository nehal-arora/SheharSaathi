import Link from "next/link";
import {
  Plus,
  ReceiptText,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface ExpenseEmptyStateProps {
  hasFilters?: boolean;
  onReset?: () => void;
}

export default function ExpenseEmptyState({
  hasFilters = false,
  onReset,
}: ExpenseEmptyStateProps) {
  return (
    <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white p-6 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
        <ReceiptText size={27} />
      </div>

      <h2 className="mt-4 text-xl font-bold text-[#333333]">
        {hasFilters
          ? "No matching expenses"
          : "No expenses added yet"}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {hasFilters
          ? "No expenses match your current filters. Reset the filters and try again."
          : "Start recording your expenses to track your spending and monthly budget."}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {hasFilters && onReset ? (
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        ) : null}

        <Link
          href="/expenses/add"
          className="inline-flex h-10 items-center justify-center rounded-md bg-[#6B8E23] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5D7D1F]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Link>
      </div>
    </section>
  );
}