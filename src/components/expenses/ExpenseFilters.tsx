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
    <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-6">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A34F]/8 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
              <SlidersHorizontal size={21} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                Expense Controls
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#FBFAF7]">
                Search and Filters
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#9EAEA7]">
                Find expenses by category, date,
                amount or description.
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
            className="min-h-11 rounded-2xl border-[#D4A34F]/25 bg-[#10271F] px-4 font-semibold text-[#F0C86A] hover:bg-[#D4A34F]/10 hover:text-[#F0C86A] disabled:opacity-40"
          >
            <RotateCcw
              size={16}
              className="mr-2"
            />
            Reset Filters
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2 md:col-span-2">
            <FilterLabel htmlFor="expense-search">
              Search
            </FilterLabel>

            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7F9189]"
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
                className={inputClasses + " pl-11"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <FilterLabel htmlFor="expense-filter-category">
              Category
            </FilterLabel>

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
              className={selectClasses}
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

          <div className="space-y-2">
            <FilterLabel htmlFor="expense-sort">
              Sort By
            </FilterLabel>

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
              className={selectClasses}
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

          <div className="space-y-2">
            <FilterLabel htmlFor="expense-start-date">
              Start Date
            </FilterLabel>

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
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <FilterLabel htmlFor="expense-end-date">
              End Date
            </FilterLabel>

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
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <FilterLabel htmlFor="expense-min-amount">
              Minimum Amount
            </FilterLabel>

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
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <FilterLabel htmlFor="expense-max-amount">
              Maximum Amount
            </FilterLabel>

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
              className={inputClasses}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClasses =
  "h-12 rounded-2xl border-[#205C46]/40 bg-[#10271F] px-4 text-sm text-[#FBFAF7] placeholder:text-[#6F8179] outline-none transition hover:border-[#205C46]/70 focus-visible:border-[#D4A34F] focus-visible:ring-4 focus-visible:ring-[#D4A34F]/10 disabled:cursor-not-allowed disabled:opacity-50";

const selectClasses =
  "h-12 w-full cursor-pointer rounded-2xl border border-[#205C46]/40 bg-[#10271F] px-4 text-sm text-[#FBFAF7] outline-none transition hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10 disabled:cursor-not-allowed disabled:opacity-50";

interface FilterLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

function FilterLabel({
  htmlFor,
  children,
}: FilterLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-[#D6E0DB]"
    >
      {children}
    </label>
  );
}