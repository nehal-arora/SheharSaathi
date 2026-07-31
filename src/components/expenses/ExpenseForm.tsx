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
      className="relative overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-8"
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/8 blur-3xl" />

      <div className="relative space-y-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
            Expense details
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
            {mode === "edit"
              ? "Update Expense"
              : "Add New Expense"}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9EAEA7]">
            Enter the amount, category, date and
            an optional note for this expense.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            label="Amount"
            required
            error={errors.amount}
          >
            <div className="relative">
              <IndianRupee
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#F0C86A]"
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
                className={`${inputClasses} pl-11`}
                disabled={loading}
              />
            </div>
          </FormField>

          <FormField
            label="Category"
            required
            error={errors.category}
          >
            <div className="relative">
              <Tag
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#F0C86A]"
              />

              <select
                id="expense-category"
                value={formValues.category}
                onChange={(event) =>
                  handleInputChange(
                    "category",
                    event.target
                      .value as ExpenseCategory
                  )
                }
                disabled={loading}
                className={`${selectClasses} pl-11`}
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
          </FormField>

          <FormField
            label="Date"
            required
            error={errors.date}
          >
            <div className="relative">
              <CalendarDays
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#F0C86A]"
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
                className={`${inputClasses} pl-11`}
                disabled={loading}
              />
            </div>
          </FormField>
        </div>

        <FormField
          label="Description"
          error={errors.description}
          helper={`${formValues.description.length}/250`}
        >
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
            className="w-full resize-none rounded-[20px] border border-[#205C46]/40 bg-[#10271F] px-4 py-4 text-sm leading-6 text-[#FBFAF7] outline-none transition placeholder:text-[#6F8179] hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </FormField>

        <div className="flex flex-col-reverse gap-3 border-t border-[#205C46]/25 pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            className="min-h-12 rounded-2xl border-[#205C46]/45 bg-[#10271F] px-6 font-semibold text-[#D6E0DB] hover:border-[#D4A34F]/35 hover:bg-[#D4A34F]/10 hover:text-[#F0C86A] sm:min-w-28"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="min-h-12 rounded-2xl bg-[#D4A34F] px-6 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] hover:bg-[#F0C86A] sm:min-w-40"
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
      </div>
    </form>
  );
}

const inputClasses =
  "h-12 rounded-[18px] border-[#205C46]/40 bg-[#10271F] px-4 text-sm text-[#FBFAF7] outline-none transition placeholder:text-[#6F8179] hover:border-[#205C46]/70 focus-visible:border-[#D4A34F] focus-visible:ring-4 focus-visible:ring-[#D4A34F]/10 disabled:cursor-not-allowed disabled:opacity-50";

const selectClasses =
  "h-12 w-full rounded-[18px] border border-[#205C46]/40 bg-[#10271F] px-4 text-sm text-[#FBFAF7] outline-none transition hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10 disabled:cursor-not-allowed disabled:opacity-50";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}

function FormField({
  label,
  required = false,
  error,
  helper,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-[#D6E0DB]">
          {label}

          {required && (
            <span className="ml-1 text-red-300">
              *
            </span>
          )}
        </label>

        {helper && (
          <span className="text-xs font-medium text-[#7F9189]">
            {helper}
          </span>
        )}
      </div>

      {children}

      {error && (
        <p className="text-sm font-medium text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}