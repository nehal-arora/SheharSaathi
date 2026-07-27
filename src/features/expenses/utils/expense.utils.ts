import type {
  Expense,
  ExpenseCategory,
  MonthlySummary,
} from "@/types/expenses";

/* =========================================================
   CURRENCY
========================================================= */

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/* =========================================================
   DATE FORMATTING
========================================================= */

export function formatExpenseDate(date: string): string {
  if (!date) {
    return "N/A";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

export function formatMonthYear(
  month: number,
  year: number
): string {
  const parsedDate = new Date(year, month - 1, 1);

  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

/* =========================================================
   CATEGORY LABELS
========================================================= */

export function getCategoryLabel(
  category: ExpenseCategory
): string {
  return category;
}

export function getCategoryIconName(
  category: ExpenseCategory
): string {
  const iconMap: Record<ExpenseCategory, string> = {
    Rent: "House",
    Food: "Utensils",
    Travel: "Bus",
    Shopping: "ShoppingBag",
    Utilities: "Zap",
    Healthcare: "HeartPulse",
    Education: "GraduationCap",
    Entertainment: "Film",
    Miscellaneous: "MoreHorizontal",
  };

  return iconMap[category];
}

/* =========================================================
   BUDGET HELPERS
========================================================= */

export function calculateBudgetUsage(
  totalSpent: number,
  budget: number | null
): number | null {
  if (!budget || budget <= 0) {
    return null;
  }

  return Number(
    ((totalSpent / budget) * 100).toFixed(2)
  );
}

export function calculateRemainingBudget(
  totalSpent: number,
  budget: number | null
): number | null {
  if (budget === null) {
    return null;
  }

  return budget - totalSpent;
}

export function getBudgetStatus(
  usagePercentage: number | null
): "safe" | "warning" | "danger" | "none" {
  if (usagePercentage === null) {
    return "none";
  }

  if (usagePercentage >= 100) {
    return "danger";
  }

  if (usagePercentage >= 80) {
    return "warning";
  }

  return "safe";
}

export function getBudgetStatusLabel(
  usagePercentage: number | null
): string {
  const status = getBudgetStatus(usagePercentage);

  if (status === "danger") {
    return "Budget exceeded";
  }

  if (status === "warning") {
    return "Close to budget limit";
  }

  if (status === "safe") {
    return "Within budget";
  }

  return "No budget set";
}

/* =========================================================
   SUMMARY HELPERS
========================================================= */

export function getLargestExpenseCategory(
  expenses: Expense[]
): ExpenseCategory | null {
  if (expenses.length === 0) {
    return null;
  }

  const totals = expenses.reduce<
    Record<ExpenseCategory, number>
  >(
    (accumulator, expense) => {
      accumulator[expense.category] +=
        expense.amount;

      return accumulator;
    },
    {
      Rent: 0,
      Food: 0,
      Travel: 0,
      Shopping: 0,
      Utilities: 0,
      Healthcare: 0,
      Education: 0,
      Entertainment: 0,
      Miscellaneous: 0,
    }
  );

  const entries = Object.entries(
    totals
  ) as [ExpenseCategory, number][];

  const [largestCategory] = entries.reduce(
    (largest, current) =>
      current[1] > largest[1]
        ? current
        : largest
  );

  return largestCategory;
}

export function calculateTotalSpent(
  expenses: Expense[]
): number {
  return expenses.reduce(
    (total, expense) =>
      total + expense.amount,
    0
  );
}

export function calculateAverageDailySpend(
  totalSpent: number,
  month: number,
  year: number
): number {
  const daysInMonth = new Date(
    year,
    month,
    0
  ).getDate();

  if (daysInMonth <= 0) {
    return 0;
  }

  return Number(
    (totalSpent / daysInMonth).toFixed(2)
  );
}

export function buildMonthlySummary(
  expenses: Expense[],
  month: number,
  year: number,
  budget: number | null
): MonthlySummary {
  const monthlyExpenses = expenses.filter(
    (expense) => {
      const date = new Date(
        `${expense.date}T00:00:00`
      );

      return (
        date.getMonth() + 1 === month &&
        date.getFullYear() === year
      );
    }
  );

  const totalSpent =
    calculateTotalSpent(monthlyExpenses);

  const remaining =
    calculateRemainingBudget(
      totalSpent,
      budget
    );

  const budgetUsagePercentage =
    calculateBudgetUsage(
      totalSpent,
      budget
    );

  return {
    month,
    year,
    total_spent: totalSpent,
    budget,
    remaining,
    budget_usage_percentage:
      budgetUsagePercentage,
    expense_count: monthlyExpenses.length,
    largest_category:
      getLargestExpenseCategory(
        monthlyExpenses
      ),
  };
}

/* =========================================================
   SEARCH AND SORT HELPERS
========================================================= */

export function filterExpensesBySearch(
  expenses: Expense[],
  search: string
): Expense[] {
  const searchValue = search
    .trim()
    .toLowerCase();

  if (!searchValue) {
    return expenses;
  }

  return expenses.filter((expense) => {
    const searchableText = [
      expense.category,
      expense.description ?? "",
      expense.amount.toString(),
      expense.date,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(
      searchValue
    );
  });
}

export function sortExpensesByDate(
  expenses: Expense[],
  order: "asc" | "desc" = "desc"
): Expense[] {
  return [...expenses].sort((a, b) => {
    const firstDate =
      new Date(a.date).getTime();

    const secondDate =
      new Date(b.date).getTime();

    return order === "asc"
      ? firstDate - secondDate
      : secondDate - firstDate;
  });
}

export function sortExpensesByAmount(
  expenses: Expense[],
  order: "asc" | "desc" = "desc"
): Expense[] {
  return [...expenses].sort((a, b) =>
    order === "asc"
      ? a.amount - b.amount
      : b.amount - a.amount
  );
}

/* =========================================================
   FORM HELPERS
========================================================= */

export function getTodayDateInput(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function sanitizeExpenseDescription(
  description?: string
): string {
  return description?.trim() ?? "";
}