"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ReceiptText,
  Sparkles,
  WalletCards,
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
    void loadExpenses(filters);
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
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Hero */}

        <section className="relative overflow-hidden rounded-[32px] border border-[#205C46]/40 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] p-6 shadow-[0_26px_80px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/30 bg-[#D4A34F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                <Sparkles size={15} />
                Personal Finance Workspace
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl lg:text-6xl">
                Expense
                <span className="block text-[#D4A34F]">
                  Tracker
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#B8C8C1] sm:text-lg">
                Record, organize and review your
                relocation expenses from one clear
                financial workspace.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:items-stretch">
              <div className="flex min-w-[190px] items-center gap-4 rounded-[22px] border border-[#205C46]/40 bg-[#0F251E]/75 px-5 py-4 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <WalletCards size={24} />
                </div>

                <div>
                  <p className="text-2xl font-bold text-[#FBFAF7]">
                    {expenseResponse.total}
                  </p>

                  <p className="text-sm text-[#9EAEA7]">
                    Total expenses
                  </p>
                </div>
              </div>

              <Link
                href="/expenses/add"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[22px] bg-[#D4A34F] px-6 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.24)] transition hover:-translate-y-0.5 hover:bg-[#F0C86A]"
              >
                <Plus size={19} />
                Add Expense
              </Link>
            </div>
          </div>
        </section>

        {/* Filters */}

        <section className="mt-8">
          <ExpenseFilters
            filters={filters}
            onChange={handleFiltersChange}
          />
        </section>

        {/* Expense content */}

        <section className="mt-8">
          {loading ? (
            <div className="rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-6">
              <ExpenseSkeleton />
            </div>
          ) : expenseResponse.items.length ===
            0 ? (
            <section className="relative flex min-h-[430px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/30 bg-[#0D211B] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

              <div className="relative flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <ReceiptText size={36} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                  Expense Management
                </p>

                <h2 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
                  {hasActiveFilters
                    ? "No matching expenses"
                    : "No expenses added yet"}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#9EAEA7] sm:text-base">
                  {hasActiveFilters
                    ? "No expenses match the selected filters. Try adjusting or clearing your current filter settings."
                    : "Start recording your spending to view expenses and understand your monthly relocation costs."}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {hasActiveFilters && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetFilters}
                      className="min-h-12 rounded-2xl border-[#D4A34F]/30 bg-[#10271F] px-6 font-semibold text-[#F0C86A] hover:bg-[#D4A34F]/10 hover:text-[#F0C86A]"
                    >
                      Reset Filters
                    </Button>
                  )}

                  <Link
                    href="/expenses/add"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-6 font-bold text-[#071512] transition hover:bg-[#F0C86A]"
                  >
                    <Plus size={18} />
                    Add Expense
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <>
              {/* Mobile cards */}

              <div className="grid gap-5 lg:hidden">
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

              {/* Desktop table */}

              <div className="hidden lg:block">
                <ExpenseTable
                  expenses={
                    expenseResponse.items
                  }
                  onDelete={handleDelete}
                  deletingId={deletingId}
                />
              </div>

              {/* Pagination */}

              <section className="mt-6 flex flex-col gap-5 rounded-[26px] border border-[#205C46]/40 bg-[#0D211B] px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#9EAEA7]">
                  Showing{" "}
                  <span className="font-bold text-[#FBFAF7]">
                    {startItem}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-[#FBFAF7]">
                    {endItem}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-[#F0C86A]">
                    {expenseResponse.total}
                  </span>{" "}
                  expenses
                </p>

                <div className="flex flex-wrap items-center gap-2">
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
                    className="min-h-11 rounded-xl border-[#205C46]/50 bg-[#10271F] px-4 text-[#D6E0DB] hover:border-[#D4A34F]/40 hover:bg-[#D4A34F]/10 hover:text-[#F0C86A]"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>

                  <span className="min-w-[112px] rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-2.5 text-center text-sm font-bold text-[#F0C86A]">
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
                    className="min-h-11 rounded-xl border-[#205C46]/50 bg-[#10271F] px-4 text-[#D6E0DB] hover:border-[#D4A34F]/40 hover:bg-[#D4A34F]/10 hover:text-[#F0C86A]"
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </section>
            </>
          )}
        </section>
      </section>
    </main>
  );
}