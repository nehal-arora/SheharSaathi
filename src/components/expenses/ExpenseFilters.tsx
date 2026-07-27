"use client";

import {
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  EXPENSE_CATEGORIES,
  type ExpenseCategory,
  type ExpenseFilters as ExpenseFiltersType,
  type ExpenseSortField,
  type SortOrder,
} from "@/types/expenses";

interface ExpenseFiltersProps {
  filters: ExpenseFiltersType;
  onChange: (
    filters: ExpenseFiltersType
  ) => void;
  disabled?: boolean;
}

export default function ExpenseFilters({
  filters,
  onChange,
  disabled = false,
}: ExpenseFiltersProps) {
  function updateFilter<
    Key extends keyof ExpenseFiltersType,
  >(
    key: Key,
    value: ExpenseFiltersType[Key]
  ) {
    onChange({
      ...filters,
      [key]: value,
      page: 1,
    });
  }

  function resetFilters() {
    onChange({
      page: 1,
      limit: filters.limit ?? 10,
      search: "",
      category: "All",
      start_date: "",
      end_date: "",
      min_amount: undefined,
      max_amount: undefined,
      sort_by: "date",
      sort_order: "desc",
    });
  }

  const hasActiveFilters = Boolean(
    filters.search ||
      (filters.category &&
        filters.category !== "All") ||
      filters.start_date ||
      filters.end_date ||
      filters.min_amount !== undefined ||
      filters.max_amount !== undefined ||
      filters.sort_by !== "date" ||
      filters.sort_order !== "desc"
  );

  return (
    <section className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <SlidersHorizontal size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#333333]">
              Search and filters
            </h2>

            <p className="text-sm text-muted-foreground">
              Find expenses by category,
              date or amount.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetFilters}
          disabled={
            disabled || !hasActiveFilters
          }
          className="border-[#D8D1BF] text-[#333333] hover:bg-[#FBFAF5]"
        >
          <RotateCcw
            size={15}
            className="mr-2"
          />
          Reset filters
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Search */}

        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="expense-search"
            className="text-sm font-medium text-[#333333]"
          >
            Search
          </label>

          <div className="relative">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              id="expense-search"
              type="search"
              value={filters.search ?? ""}
              onChange={(event) =>
                updateFilter(
                  "search",
                  event.target.value
                )
              }
              placeholder="Search description, category or amount"
              disabled={disabled}
              className="h-11 pl-10"
            />
          </div>
        </div>

        {/* Category */}

        <div className="space-y-2">
          <label
            htmlFor="expense-filter-category"
            className="text-sm font-medium text-[#333333]"
          >
            Category
          </label>

          <select
            id="expense-filter-category"
            value={
              filters.category ?? "All"
            }
            onChange={(event) =>
              updateFilter(
                "category",
                event.target.value as
                  | ExpenseCategory
                  | "All"
              )
            }
            disabled={disabled}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="All">
              All categories
            </option>

            {EXPENSE_CATEGORIES.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        {/* Sort */}

        <div className="space-y-2">
          <label
            htmlFor="expense-sort"
            className="text-sm font-medium text-[#333333]"
          >
            Sort by
          </label>

          <select
            id="expense-sort"
            value={`${filters.sort_by ?? "date"}-${filters.sort_order ?? "desc"}`}
            onChange={(event) => {
              const [sortBy, sortOrder] =
                event.target.value.split(
                  "-"
                ) as [
                  ExpenseSortField,
                  SortOrder,
                ];

              onChange({
                ...filters,
                page: 1,
                sort_by: sortBy,
                sort_order: sortOrder,
              });
            }}
            disabled={disabled}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="date-desc">
              Newest first
            </option>

            <option value="date-asc">
              Oldest first
            </option>

            <option value="amount-desc">
              Highest amount
            </option>

            <option value="amount-asc">
              Lowest amount
            </option>

            <option value="created_at-desc">
              Recently added
            </option>
          </select>
        </div>

        {/* Start date */}

        <div className="space-y-2">
          <label
            htmlFor="expense-start-date"
            className="text-sm font-medium text-[#333333]"
          >
            Start date
          </label>

          <Input
            id="expense-start-date"
            type="date"
            value={
              filters.start_date ?? ""
            }
            onChange={(event) =>
              updateFilter(
                "start_date",
                event.target.value
              )
            }
            disabled={disabled}
            className="h-11"
          />
        </div>

        {/* End date */}

        <div className="space-y-2">
          <label
            htmlFor="expense-end-date"
            className="text-sm font-medium text-[#333333]"
          >
            End date
          </label>

          <Input
            id="expense-end-date"
            type="date"
            value={filters.end_date ?? ""}
            onChange={(event) =>
              updateFilter(
                "end_date",
                event.target.value
              )
            }
            disabled={disabled}
            className="h-11"
          />
        </div>

        {/* Minimum amount */}

        <div className="space-y-2">
          <label
            htmlFor="expense-min-amount"
            className="text-sm font-medium text-[#333333]"
          >
            Minimum amount
          </label>

          <Input
            id="expense-min-amount"
            type="number"
            min="0"
            step="1"
            value={
              filters.min_amount ?? ""
            }
            onChange={(event) =>
              updateFilter(
                "min_amount",
                event.target.value
                  ? Number(
                      event.target.value
                    )
                  : undefined
              )
            }
            placeholder="0"
            disabled={disabled}
            className="h-11"
          />
        </div>

        {/* Maximum amount */}

        <div className="space-y-2">
          <label
            htmlFor="expense-max-amount"
            className="text-sm font-medium text-[#333333]"
          >
            Maximum amount
          </label>

          <Input
            id="expense-max-amount"
            type="number"
            min="0"
            step="1"
            value={
              filters.max_amount ?? ""
            }
            onChange={(event) =>
              updateFilter(
                "max_amount",
                event.target.value
                  ? Number(
                      event.target.value
                    )
                  : undefined
              )
            }
            placeholder="No limit"
            disabled={disabled}
            className="h-11"
          />
        </div>
      </div>
    </section>
  );
}