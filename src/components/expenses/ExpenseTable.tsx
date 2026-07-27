"use client";

import Link from "next/link";
import {
  Edit3,
  Loader2,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  formatCurrency,
  formatExpenseDate,
} from "@/features/expenses/utils/expense.utils";

import type { Expense } from "@/types/expenses";

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (expense: Expense) => void;
  deletingId?: number | null;
}

export default function ExpenseTable({
  expenses,
  onDelete,
  deletingId = null,
}: ExpenseTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7E2D5] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead className="border-b border-[#E7E2D5] bg-[#FBFAF5]">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#333333]">
                Category
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-[#333333]">
                Description
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-[#333333]">
                Date
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-[#333333]">
                Amount
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-[#333333]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EEEADD]">
            {expenses.map((expense) => {
              const deleting =
                deletingId === expense.id;

              return (
                <tr
                  key={expense.id}
                  className="transition hover:bg-[#FBFAF5]"
                >
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-[#EEF2E4] px-3 py-1 text-sm font-semibold text-[#6B8E23]">
                      {expense.category}
                    </span>
                  </td>

                  <td className="max-w-[280px] px-5 py-4 text-sm text-[#555555]">
                    <p className="truncate">
                      {expense.description ||
                        "No description"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#555555]">
                    {formatExpenseDate(
                      expense.date
                    )}
                  </td>

                  <td className="px-5 py-4 text-right font-bold text-[#333333]">
                    {formatCurrency(
                      expense.amount
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/expenses/edit/${expense.id}`}
                        aria-disabled={deleting}
                        className={`inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium transition hover:bg-accent ${
                          deleting
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                      >
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit
                      </Link>

                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        disabled={deleting}
                        onClick={() =>
                          onDelete(expense)
                        }
                      >
                        {deleting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-4 w-4" />
                        )}

                        {deleting
                          ? "Deleting"
                          : "Delete"}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}