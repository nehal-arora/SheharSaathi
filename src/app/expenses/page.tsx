"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ReceiptText,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import ExpenseCard from "@/components/expenses/ExpenseCard";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import ExpenseFilters from "@/components/expenses/ExpenseFilters";
import ExpenseSkeleton from "@/components/expenses/ExpenseSkeleton";

import {
  deleteExpense,
  getExpenses,
} from "@/features/expenses/services/expense.service";

import type {
  Expense,
  ExpenseFilters as ExpenseFiltersType,
  ExpenseListResponse,
} from "@/types/expenses";

const PAGE_SIZE = 10;

const defaultFilters: ExpenseFiltersType = {
  page: 1,
  limit: PAGE_SIZE,
  search: "",
  category: "All",
  start_date: "",
  end_date: "",
  min_amount: undefined,
  max_amount: undefined,
  sort_by: "date",
  sort_order: "desc",
};

export default function ExpensesPage() {
  const [expenseResponse, setExpenseResponse] =
    useState<ExpenseListResponse>({
      items: [],
      page: 1,
      limit: PAGE_SIZE,
      total: 0,
      total_pages: 1,
    });

  const [filters, setFilters] =
    useState<ExpenseFiltersType>(defaultFilters);

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  async function loadExpenses(
    activeFilters: ExpenseFiltersType = filters
  ) {
    try {
      setLoading(true);

      const response = await getExpenses({
        ...activeFilters,
        page: activeFilters.page ?? 1,
        limit: PAGE_SIZE,
      });

      setExpenseResponse(response);
    } catch (error) {
      console.error(
        "Unable to load expenses:",
        error
      );

      toast.error("Unable to load expenses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExpenses(filters);
  }, [filters]);

  function handleFiltersChange(
    updatedFilters: ExpenseFiltersType
  ) {
    setFilters({
      ...updatedFilters,
      page: 1,
      limit: PAGE_SIZE,
    });
  }

  async function handleDelete(
    expense: Expense
  ) {
    const confirmed = window.confirm(
      `Delete this ${expense.category.toLowerCase()} expense?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(expense.id);

      await deleteExpense(expense.id);

      toast.success(
        "Expense deleted successfully."
      );

      const currentPage =
        expenseResponse.page;

      const pageWillBecomeEmpty =
        expenseResponse.items.length === 1 &&
        currentPage > 1;

      const nextFilters = {
        ...filters,
        page: pageWillBecomeEmpty
          ? currentPage - 1
          : currentPage,
      };

      if (pageWillBecomeEmpty) {
        setFilters(nextFilters);
      } else {
        await loadExpenses(nextFilters);
      }
    } catch (error) {
      console.error(
        "Unable to delete expense:",
        error
      );

      toast.error(
        "Unable to delete the expense."
      );
    } finally {
      setDeletingId(null);
    }
  }

  function handlePageChange(
    nextPage: number
  ) {
    if (
      nextPage < 1 ||
      nextPage > expenseResponse.total_pages ||
      nextPage === expenseResponse.page
    ) {
      return;
    }

    setFilters((currentFilters) => ({
      ...currentFilters,
      page: nextPage,
    }));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  const hasActiveFilters =
    Boolean(filters.search?.trim()) ||
    (filters.category !== undefined &&
      filters.category !== "All") ||
    Boolean(filters.start_date) ||
    Boolean(filters.end_date) ||
    filters.min_amount !== undefined ||
    filters.max_amount !== undefined;

  const startItem =
    expenseResponse.total === 0
      ? 0
      : (expenseResponse.page - 1) *
          expenseResponse.limit +
        1;

  const endItem = Math.min(
    expenseResponse.page *
      expenseResponse.limit,
    expenseResponse.total
  );

  return (
    <main>
      <div className="space-y-8">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
              <ReceiptText size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#333333]">
                Expense Tracker
              </h1>

              <p className="mt-1 text-muted-foreground">
                Manage and track all your
                monthly expenses.
              </p>
            </div>
          </div>

          <Link
            href="/expenses/add"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#6B8E23] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5D7D1F]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Link>
        </header>

        <ExpenseFilters
          filters={filters}
          onChange={handleFiltersChange}
        />

        {loading ? (
          <ExpenseSkeleton />
        ) : expenseResponse.items.length ===
          0 ? (
          <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-[#E7E2D5] bg-white p-6 text-center shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
              <ReceiptText size={27} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#333333]">
              {hasActiveFilters
                ? "No matching expenses"
                : "No expenses added yet"}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {hasActiveFilters
                ? "No expenses match the selected filters. Try changing or resetting them."
                : "Start recording your spending to view expenses and monthly analytics."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {hasActiveFilters ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetFilters}
                >
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
        ) : (
          <>
            <div className="grid gap-4 lg:hidden">
              {expenseResponse.items.map(
                (expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onDelete={handleDelete}
                    deleting={
                      deletingId === expense.id
                    }
                  />
                )
              )}
            </div>

            <div className="hidden lg:block">
              <ExpenseTable
                expenses={expenseResponse.items}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            </div>

            <section className="flex flex-col gap-4 rounded-2xl border border-[#E7E2D5] bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-[#333333]">
                  {startItem}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#333333]">
                  {endItem}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#333333]">
                  {expenseResponse.total}
                </span>{" "}
                expenses
              </p>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={
                    expenseResponse.page <= 1
                  }
                  onClick={() =>
                    handlePageChange(
                      expenseResponse.page - 1
                    )
                  }
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                <span className="min-w-[92px] text-center text-sm font-semibold text-[#333333]">
                  Page {expenseResponse.page} of{" "}
                  {expenseResponse.total_pages}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={
                    expenseResponse.page >=
                    expenseResponse.total_pages
                  }
                  onClick={() =>
                    handlePageChange(
                      expenseResponse.page + 1
                    )
                  }
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}