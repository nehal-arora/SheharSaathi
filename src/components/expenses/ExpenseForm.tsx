"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  IndianRupee,
  Loader2,
  Save,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  createExpense,
  updateExpense,
} from "@/features/expenses/services/expense.service";

import {
  EXPENSE_CATEGORIES,
  type Expense,
  type ExpenseCategory,
  type ExpenseFormValues,
} from "@/types/expenses";

import {
  getTodayDateInput,
  sanitizeExpenseDescription,
} from "@/features/expenses/utils/expense.utils";

interface ExpenseFormProps {
  mode?: "create" | "edit";
  initialExpense?: Expense;
}

interface ExpenseFormErrors {
  amount?: string;
  category?: string;
  description?: string;
  date?: string;
}

const defaultFormValues: ExpenseFormValues = {
  amount: 0,
  category: "Food",
  description: "",
  date: getTodayDateInput(),
};

export default function ExpenseForm({
  mode = "create",
  initialExpense,
}: ExpenseFormProps) {
  const router = useRouter();

  const [formValues, setFormValues] =
    useState<ExpenseFormValues>(
      defaultFormValues
    );

  const [errors, setErrors] =
    useState<ExpenseFormErrors>({});

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (
      mode === "edit" &&
      initialExpense
    ) {
      setFormValues({
        amount: initialExpense.amount,
        category:
          initialExpense.category,
        description:
          initialExpense.description ??
          "",
        date: initialExpense.date,
      });
    }
  }, [mode, initialExpense]);

  function handleInputChange(
    field: keyof ExpenseFormValues,
    value: string
  ) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]:
        field === "amount"
          ? Number(value)
          : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  }

  function validateForm(): boolean {
    const newErrors: ExpenseFormErrors =
      {};

    if (
      !Number.isFinite(
        formValues.amount
      ) ||
      formValues.amount <= 0
    ) {
      newErrors.amount =
        "Enter an amount greater than 0.";
    }

    if (!formValues.category) {
      newErrors.category =
        "Select an expense category.";
    }

    if (
      formValues.description.length >
      250
    ) {
      newErrors.description =
        "Description cannot exceed 250 characters.";
    }

    if (!formValues.date) {
      newErrors.date =
        "Select the expense date.";
    }

    const selectedDate = new Date(
      `${formValues.date}T00:00:00`
    );

    if (
      Number.isNaN(
        selectedDate.getTime()
      )
    ) {
      newErrors.date =
        "Select a valid date.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length ===
      0
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        amount: Number(
          formValues.amount
        ),
        category:
          formValues.category,
        description:
          sanitizeExpenseDescription(
            formValues.description
          ),
        date: formValues.date,
      };

      if (
        mode === "edit" &&
        initialExpense
      ) {
        await updateExpense(
          initialExpense.id,
          payload
        );

        toast.success(
          "Expense updated successfully."
        );
      } else {
        await createExpense(payload);

        toast.success(
          "Expense added successfully."
        );
      }

      router.push("/expenses");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.push("/expenses");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Amount */}

        <div className="space-y-2">
          <label
            htmlFor="expense-amount"
            className="text-sm font-semibold text-[#333333]"
          >
            Amount
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <IndianRupee
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B8E23]"
            />

            <Input
              id="expense-amount"
              type="number"
              min="1"
              step="1"
              value={
                formValues.amount || ""
              }
              onChange={(event) =>
                handleInputChange(
                  "amount",
                  event.target.value
                )
              }
              placeholder="Enter amount"
              className="h-11 pl-10"
              disabled={loading}
            />
          </div>

          {errors.amount && (
            <p className="text-sm text-red-500">
              {errors.amount}
            </p>
          )}
        </div>

        {/* Category */}

        <div className="space-y-2">
          <label
            htmlFor="expense-category"
            className="text-sm font-semibold text-[#333333]"
          >
            Category
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <Tag
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B8E23]"
            />

            <select
              id="expense-category"
              value={
                formValues.category
              }
              onChange={(event) =>
                handleInputChange(
                  "category",
                  event.target
                    .value as ExpenseCategory
                )
              }
              disabled={loading}
              className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
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

          {errors.category && (
            <p className="text-sm text-red-500">
              {errors.category}
            </p>
          )}
        </div>

        {/* Date */}

        <div className="space-y-2">
          <label
            htmlFor="expense-date"
            className="text-sm font-semibold text-[#333333]"
          >
            Date
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B8E23]"
            />

            <Input
              id="expense-date"
              type="date"
              value={formValues.date}
              onChange={(event) =>
                handleInputChange(
                  "date",
                  event.target.value
                )
              }
              className="h-11 pl-10"
              disabled={loading}
            />
          </div>

          {errors.date && (
            <p className="text-sm text-red-500">
              {errors.date}
            </p>
          )}
        </div>
      </div>

      {/* Description */}

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="expense-description"
            className="text-sm font-semibold text-[#333333]"
          >
            Description
          </label>

          <span className="text-xs text-muted-foreground">
            {
              formValues.description
                .length
            }
            /250
          </span>
        </div>

        <textarea
          id="expense-description"
          value={
            formValues.description
          }
          onChange={(event) =>
            handleInputChange(
              "description",
              event.target.value
            )
          }
          placeholder="Add a short note about this expense"
          rows={5}
          maxLength={250}
          disabled={loading}
          className="w-full resize-none rounded-md border border-input bg-background px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/20 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {errors.description && (
          <p className="text-sm text-red-500">
            {errors.description}
          </p>
        )}
      </div>

      {/* Actions */}

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={loading}
          className="sm:min-w-28"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="bg-[#6B8E23] text-white hover:bg-[#5d7d1f] sm:min-w-36"
        >
          {loading ? (
            <>
              <Loader2
                size={17}
                className="mr-2 animate-spin"
              />
              {mode === "edit"
                ? "Updating..."
                : "Saving..."}
            </>
          ) : (
            <>
              <Save
                size={17}
                className="mr-2"
              />
              {mode === "edit"
                ? "Update Expense"
                : "Save Expense"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}