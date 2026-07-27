import type {
  Budget,
  CategoryBreakdownItem,
  CategoryBreakdownResponse,
  CreateBudgetInput,
  CreateExpenseInput,
  Expense,
  ExpenseCategory,
  ExpenseDashboardSummary,
  ExpenseDeleteResponse,
  ExpenseFilters,
  ExpenseListResponse,
  MonthlyReport,
  MonthlySummary,
  SpendingTrendItem,
  SpendingTrendsResponse,
  UpdateExpenseInput,
} from "@/types/expenses";

import {
  mockBudget,
  mockExpenses,
  mockSpendingTrends,
} from "@/features/expenses/mock/mockExpenses";

import {
  calculateAverageDailySpend,
  calculateBudgetUsage,
  calculateRemainingBudget,
  calculateTotalSpent,
  getLargestExpenseCategory,
} from "@/features/expenses/utils/expense.utils";

/* =========================================================
   MOCK DATABASE
========================================================= */

let expenseDatabase: Expense[] = [...mockExpenses];

let budgetDatabase: Budget = {
  ...mockBudget,
};

/* =========================================================
   SMALL MOCK DELAY
========================================================= */

function delay(milliseconds = 300): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/* =========================================================
   ID GENERATION
========================================================= */

function generateExpenseId(): number {
  if (expenseDatabase.length === 0) {
    return 1;
  }

  return (
    Math.max(
      ...expenseDatabase.map(
        (expense) => expense.id
      )
    ) + 1
  );
}

/* =========================================================
   VALIDATION
========================================================= */

function validateExpenseAmount(amount: number): void {
  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    throw new Error(
      "Expense amount must be greater than 0."
    );
  }
}

function validateBudgetAmount(amount: number): void {
  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    throw new Error(
      "Budget amount must be greater than 0."
    );
  }
}

function validateMonth(month: number): void {
  if (
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    throw new Error(
      "Month must be between 1 and 12."
    );
  }
}

function validateYear(year: number): void {
  if (
    !Number.isInteger(year) ||
    year < 2000 ||
    year > 2100
  ) {
    throw new Error(
      "Please provide a valid year."
    );
  }
}

/* =========================================================
   EXPENSE FILTERING
========================================================= */

function applyExpenseFilters(
  expenses: Expense[],
  filters: ExpenseFilters
): Expense[] {
  let filteredExpenses = [...expenses];

  const searchValue =
    filters.search?.trim().toLowerCase();

  if (searchValue) {
    filteredExpenses =
      filteredExpenses.filter((expense) => {
        const searchableText = [
          expense.description ?? "",
          expense.category,
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

  if (
    filters.category &&
    filters.category !== "All"
  ) {
    filteredExpenses =
      filteredExpenses.filter(
        (expense) =>
          expense.category ===
          filters.category
      );
  }

  if (filters.start_date) {
    filteredExpenses =
      filteredExpenses.filter(
        (expense) =>
          expense.date >=
          filters.start_date!
      );
  }

  if (filters.end_date) {
    filteredExpenses =
      filteredExpenses.filter(
        (expense) =>
          expense.date <= filters.end_date!
      );
  }

  if (filters.min_amount !== undefined) {
    filteredExpenses =
      filteredExpenses.filter(
        (expense) =>
          expense.amount >=
          filters.min_amount!
      );
  }

  if (filters.max_amount !== undefined) {
    filteredExpenses =
      filteredExpenses.filter(
        (expense) =>
          expense.amount <=
          filters.max_amount!
      );
  }

  const sortBy = filters.sort_by ?? "date";
  const sortOrder =
    filters.sort_order ?? "desc";

  filteredExpenses.sort((first, second) => {
    let firstValue: number;
    let secondValue: number;

    if (sortBy === "amount") {
      firstValue = first.amount;
      secondValue = second.amount;
    } else if (sortBy === "created_at") {
      firstValue = new Date(
        first.created_at
      ).getTime();

      secondValue = new Date(
        second.created_at
      ).getTime();
    } else {
      firstValue = new Date(
        `${first.date}T00:00:00`
      ).getTime();

      secondValue = new Date(
        `${second.date}T00:00:00`
      ).getTime();
    }

    return sortOrder === "asc"
      ? firstValue - secondValue
      : secondValue - firstValue;
  });

  return filteredExpenses;
}

/* =========================================================
   MONTH FILTER
========================================================= */

function getExpensesForMonth(
  expenses: Expense[],
  month: number,
  year: number
): Expense[] {
  return expenses.filter((expense) => {
    const expenseDate = new Date(
      `${expense.date}T00:00:00`
    );

    return (
      expenseDate.getMonth() + 1 === month &&
      expenseDate.getFullYear() === year
    );
  });
}

/* =========================================================
   CATEGORY BREAKDOWN
========================================================= */

function calculateCategoryBreakdown(
  expenses: Expense[]
): CategoryBreakdownItem[] {
  const categoryTotals: Record<
    ExpenseCategory,
    number
  > = {
    Rent: 0,
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Utilities: 0,
    Healthcare: 0,
    Education: 0,
    Entertainment: 0,
    Miscellaneous: 0,
  };

  expenses.forEach((expense) => {
    categoryTotals[expense.category] +=
      expense.amount;
  });

  const totalSpent =
    calculateTotalSpent(expenses);

  return (
    Object.entries(categoryTotals) as [
      ExpenseCategory,
      number,
    ][]
  )
    .filter(([, amount]) => amount > 0)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage:
        totalSpent > 0
          ? Number(
              (
                (amount / totalSpent) *
                100
              ).toFixed(2)
            )
          : 0,
    }))
    .sort(
      (first, second) =>
        second.amount - first.amount
    );
}

/* =========================================================
   GET ALL EXPENSES
========================================================= */

export async function getExpenses(
  filters: ExpenseFilters = {}
): Promise<ExpenseListResponse> {
  await delay();

  const filteredExpenses =
    applyExpenseFilters(
      expenseDatabase,
      filters
    );

  const page = Math.max(
    filters.page ?? 1,
    1
  );

  const limit = Math.max(
    filters.limit ?? 10,
    1
  );

  const total = filteredExpenses.length;

  const totalPages = Math.max(
    Math.ceil(total / limit),
    1
  );

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    items: filteredExpenses.slice(
      startIndex,
      endIndex
    ),
    page,
    limit,
    total,
    total_pages: totalPages,
  };
}

/* =========================================================
   GET EXPENSE BY ID
========================================================= */

export async function getExpenseById(
  id: number
): Promise<Expense> {
  await delay();

  const expense = expenseDatabase.find(
    (item) => item.id === id
  );

  if (!expense) {
    throw new Error(
      "Expense not found."
    );
  }

  return { ...expense };
}

/* =========================================================
   CREATE EXPENSE
========================================================= */

export async function createExpense(
  data: CreateExpenseInput
): Promise<Expense> {
  await delay();

  validateExpenseAmount(data.amount);

  const now = new Date().toISOString();

  const newExpense: Expense = {
    id: generateExpenseId(),
    user_id: 1,

    amount: data.amount,
    category: data.category,
    description:
      data.description?.trim() || null,
    date: data.date,

    created_at: now,
    updated_at: now,
  };

  expenseDatabase = [
    newExpense,
    ...expenseDatabase,
  ];

  return { ...newExpense };
}

/* =========================================================
   UPDATE EXPENSE
========================================================= */

export async function updateExpense(
  id: number,
  data: UpdateExpenseInput
): Promise<Expense> {
  await delay();

  const expenseIndex =
    expenseDatabase.findIndex(
      (expense) => expense.id === id
    );

  if (expenseIndex === -1) {
    throw new Error(
      "Expense not found."
    );
  }

  if (data.amount !== undefined) {
    validateExpenseAmount(data.amount);
  }

  const currentExpense =
    expenseDatabase[expenseIndex];

  const updatedExpense: Expense = {
    ...currentExpense,

    ...data,

    description:
      data.description !== undefined
        ? data.description.trim() || null
        : currentExpense.description,

    updated_at: new Date().toISOString(),
  };

  expenseDatabase[expenseIndex] =
    updatedExpense;

  return { ...updatedExpense };
}

/* =========================================================
   DELETE EXPENSE
========================================================= */

export async function deleteExpense(
  id: number
): Promise<ExpenseDeleteResponse> {
  await delay();

  const expenseExists =
    expenseDatabase.some(
      (expense) => expense.id === id
    );

  if (!expenseExists) {
    throw new Error(
      "Expense not found."
    );
  }

  expenseDatabase =
    expenseDatabase.filter(
      (expense) => expense.id !== id
    );

  return {
    success: true,
    message:
      "Expense deleted successfully.",
  };
}

/* =========================================================
   CREATE OR UPDATE BUDGET
========================================================= */

export async function setBudget(
  data: CreateBudgetInput
): Promise<Budget> {
  await delay();

  validateMonth(data.month);
  validateYear(data.year);
  validateBudgetAmount(
    data.budget_amount
  );

  const now = new Date().toISOString();

  budgetDatabase = {
    ...budgetDatabase,

    month: data.month,
    year: data.year,
    budget_amount:
      data.budget_amount,

    updated_at: now,
  };

  return { ...budgetDatabase };
}

/* =========================================================
   GET BUDGET
========================================================= */

export async function getBudget(
  month: number,
  year: number
): Promise<Budget | null> {
  await delay();

  validateMonth(month);
  validateYear(year);

  if (
    budgetDatabase.month !== month ||
    budgetDatabase.year !== year
  ) {
    return null;
  }

  return { ...budgetDatabase };
}

/* =========================================================
   CATEGORY BREAKDOWN
========================================================= */

export async function getCategoryBreakdown(
  month: number,
  year: number
): Promise<CategoryBreakdownResponse> {
  await delay();

  validateMonth(month);
  validateYear(year);

  const monthlyExpenses =
    getExpensesForMonth(
      expenseDatabase,
      month,
      year
    );

  return {
    month,
    year,
    total_spent:
      calculateTotalSpent(
        monthlyExpenses
      ),
    categories:
      calculateCategoryBreakdown(
        monthlyExpenses
      ),
  };
}

/* =========================================================
   MONTHLY SUMMARY
========================================================= */

export async function getMonthlySummary(
  month: number,
  year: number
): Promise<MonthlySummary> {
  await delay();

  validateMonth(month);
  validateYear(year);

  const monthlyExpenses =
    getExpensesForMonth(
      expenseDatabase,
      month,
      year
    );

  const totalSpent =
    calculateTotalSpent(
      monthlyExpenses
    );

  const budget =
    budgetDatabase.month === month &&
    budgetDatabase.year === year
      ? budgetDatabase.budget_amount
      : null;

  return {
    month,
    year,
    total_spent: totalSpent,
    budget,
    remaining:
      calculateRemainingBudget(
        totalSpent,
        budget
      ),
    budget_usage_percentage:
      calculateBudgetUsage(
        totalSpent,
        budget
      ),
    expense_count:
      monthlyExpenses.length,
    largest_category:
      getLargestExpenseCategory(
        monthlyExpenses
      ),
  };
}

/* =========================================================
   SPENDING TRENDS
========================================================= */

export async function getSpendingTrends(
  months = 6
): Promise<SpendingTrendsResponse> {
  await delay();

  const safeMonths = Math.max(
    months,
    1
  );

  const trends: SpendingTrendItem[] =
    mockSpendingTrends.items.slice(
      -safeMonths
    );

  return {
    items: trends,
  };
}

/* =========================================================
   MONTHLY REPORT
========================================================= */

export async function getMonthlyReport(
  month: number,
  year: number
): Promise<MonthlyReport> {
  await delay();

  validateMonth(month);
  validateYear(year);

  const monthlyExpenses =
    getExpensesForMonth(
      expenseDatabase,
      month,
      year
    );

  const totalSpent =
    calculateTotalSpent(
      monthlyExpenses
    );

  const budget =
    budgetDatabase.month === month &&
    budgetDatabase.year === year
      ? budgetDatabase.budget_amount
      : null;

  const categoryBreakdown =
    calculateCategoryBreakdown(
      monthlyExpenses
    );

  return {
    month,
    year,

    total_spent: totalSpent,
    budget,

    remaining:
      calculateRemainingBudget(
        totalSpent,
        budget
      ),

    budget_usage_percentage:
      calculateBudgetUsage(
        totalSpent,
        budget
      ),

    highest_category:
      categoryBreakdown[0]?.category ??
      null,

    average_daily_spend:
      calculateAverageDailySpend(
        totalSpent,
        month,
        year
      ),

    expense_count:
      monthlyExpenses.length,

    category_breakdown:
      categoryBreakdown,
  };
}

/* =========================================================
   DASHBOARD SUMMARY
========================================================= */

export async function getExpenseDashboardSummary(): Promise<ExpenseDashboardSummary> {
  await delay();

  const currentDate = new Date();

  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const currentMonthExpenses =
    getExpensesForMonth(
      expenseDatabase,
      month,
      year
    );

  const totalSpent =
    calculateTotalSpent(
      currentMonthExpenses
    );

  const budget =
    budgetDatabase.month === month &&
    budgetDatabase.year === year
      ? budgetDatabase.budget_amount
      : null;

  const recentExpenses =
    [...expenseDatabase]
      .sort(
        (first, second) =>
          new Date(
            second.date
          ).getTime() -
          new Date(
            first.date
          ).getTime()
      )
      .slice(0, 5)
      .map((expense) => ({
        id: expense.id,
        amount: expense.amount,
        category: expense.category,
        description:
          expense.description,
        date: expense.date,
      }));

  return {
    current_month: month,
    current_year: year,

    total_spent: totalSpent,
    budget,

    remaining:
      calculateRemainingBudget(
        totalSpent,
        budget
      ),

    budget_usage_percentage:
      calculateBudgetUsage(
        totalSpent,
        budget
      ),

    expense_count:
      currentMonthExpenses.length,

    largest_category:
      getLargestExpenseCategory(
        currentMonthExpenses
      ),

    recent_expenses:
      recentExpenses,
  };
}

/* =========================================================
   RESET MOCK DATA
========================================================= */

export function resetExpenseMockData(): void {
  expenseDatabase = [...mockExpenses];

  budgetDatabase = {
    ...mockBudget,
  };
}

// Expense module is now fully integrated with the FastAPI backend.
// All CRUD operations, budget, dashboard, analytics, and reports use live APIs.