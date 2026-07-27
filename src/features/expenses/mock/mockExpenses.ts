import type {
  Budget,
  CategoryBreakdownResponse,
  Expense,
  ExpenseDashboardSummary,
  MonthlyReport,
  MonthlySummary,
  SpendingTrendsResponse,
} from "@/types/expenses";

/* =========================================================
   MOCK EXPENSES
========================================================= */

export const mockExpenses: Expense[] = [
  {
    id: 1,
    user_id: 1,
    amount: 12000,
    category: "Rent",
    description: "Monthly apartment rent",
    date: "2026-08-01",
    created_at: "2026-08-01T09:00:00Z",
    updated_at: "2026-08-01T09:00:00Z",
  },
  {
    id: 2,
    user_id: 1,
    amount: 850,
    category: "Food",
    description: "Weekly groceries",
    date: "2026-08-03",
    created_at: "2026-08-03T12:30:00Z",
    updated_at: "2026-08-03T12:30:00Z",
  },
  {
    id: 3,
    user_id: 1,
    amount: 320,
    category: "Travel",
    description: "Metro card recharge",
    date: "2026-08-04",
    created_at: "2026-08-04T08:15:00Z",
    updated_at: "2026-08-04T08:15:00Z",
  },
  {
    id: 4,
    user_id: 1,
    amount: 1499,
    category: "Shopping",
    description: "New backpack",
    date: "2026-08-05",
    created_at: "2026-08-05T17:45:00Z",
    updated_at: "2026-08-05T17:45:00Z",
  },
  {
    id: 5,
    user_id: 1,
    amount: 1100,
    category: "Utilities",
    description: "Electricity bill",
    date: "2026-08-06",
    created_at: "2026-08-06T10:20:00Z",
    updated_at: "2026-08-06T10:20:00Z",
  },
  {
    id: 6,
    user_id: 1,
    amount: 650,
    category: "Healthcare",
    description: "Medicines",
    date: "2026-08-07",
    created_at: "2026-08-07T19:10:00Z",
    updated_at: "2026-08-07T19:10:00Z",
  },
  {
    id: 7,
    user_id: 1,
    amount: 2400,
    category: "Education",
    description: "Online course subscription",
    date: "2026-08-08",
    created_at: "2026-08-08T14:00:00Z",
    updated_at: "2026-08-08T14:00:00Z",
  },
  {
    id: 8,
    user_id: 1,
    amount: 499,
    category: "Entertainment",
    description: "Movie tickets",
    date: "2026-08-09",
    created_at: "2026-08-09T20:30:00Z",
    updated_at: "2026-08-09T20:30:00Z",
  },
  {
    id: 9,
    user_id: 1,
    amount: 280,
    category: "Food",
    description: "Lunch",
    date: "2026-08-10",
    created_at: "2026-08-10T13:15:00Z",
    updated_at: "2026-08-10T13:15:00Z",
  },
  {
    id: 10,
    user_id: 1,
    amount: 750,
    category: "Miscellaneous",
    description: "Household supplies",
    date: "2026-08-11",
    created_at: "2026-08-11T11:40:00Z",
    updated_at: "2026-08-11T11:40:00Z",
  },
  {
    id: 11,
    user_id: 1,
    amount: 460,
    category: "Travel",
    description: "Cab fare",
    date: "2026-08-12",
    created_at: "2026-08-12T21:10:00Z",
    updated_at: "2026-08-12T21:10:00Z",
  },
  {
    id: 12,
    user_id: 1,
    amount: 1250,
    category: "Food",
    description: "Dinner with friends",
    date: "2026-08-13",
    created_at: "2026-08-13T22:00:00Z",
    updated_at: "2026-08-13T22:00:00Z",
  },
];

/* =========================================================
   MOCK BUDGET
========================================================= */

export const mockBudget: Budget = {
  id: 1,
  user_id: 1,
  month: 8,
  year: 2026,
  budget_amount: 25000,
  created_at: "2026-08-01T08:00:00Z",
  updated_at: "2026-08-01T08:00:00Z",
};

/* =========================================================
   MOCK MONTHLY SUMMARY
========================================================= */

export const mockMonthlySummary: MonthlySummary = {
  month: 8,
  year: 2026,
  total_spent: 22058,
  budget: 25000,
  remaining: 2942,
  budget_usage_percentage: 88.23,
  expense_count: mockExpenses.length,
  largest_category: "Rent",
};

/* =========================================================
   MOCK CATEGORY BREAKDOWN
========================================================= */

export const mockCategoryBreakdown: CategoryBreakdownResponse = {
  month: 8,
  year: 2026,
  total_spent: 22058,
  categories: [
    {
      category: "Rent",
      amount: 12000,
      percentage: 54.4,
    },
    {
      category: "Food",
      amount: 2380,
      percentage: 10.79,
    },
    {
      category: "Travel",
      amount: 780,
      percentage: 3.54,
    },
    {
      category: "Shopping",
      amount: 1499,
      percentage: 6.8,
    },
    {
      category: "Utilities",
      amount: 1100,
      percentage: 4.99,
    },
    {
      category: "Healthcare",
      amount: 650,
      percentage: 2.95,
    },
    {
      category: "Education",
      amount: 2400,
      percentage: 10.88,
    },
    {
      category: "Entertainment",
      amount: 499,
      percentage: 2.26,
    },
    {
      category: "Miscellaneous",
      amount: 750,
      percentage: 3.4,
    },
  ],
};

/* =========================================================
   MOCK SPENDING TRENDS
========================================================= */

export const mockSpendingTrends: SpendingTrendsResponse = {
  items: [
    {
      month: 3,
      year: 2026,
      label: "Mar 2026",
      total_spent: 16800,
    },
    {
      month: 4,
      year: 2026,
      label: "Apr 2026",
      total_spent: 18250,
    },
    {
      month: 5,
      year: 2026,
      label: "May 2026",
      total_spent: 17400,
    },
    {
      month: 6,
      year: 2026,
      label: "Jun 2026",
      total_spent: 19500,
    },
    {
      month: 7,
      year: 2026,
      label: "Jul 2026",
      total_spent: 20750,
    },
    {
      month: 8,
      year: 2026,
      label: "Aug 2026",
      total_spent: 22058,
    },
  ],
};

/* =========================================================
   MOCK MONTHLY REPORT
========================================================= */

export const mockMonthlyReport: MonthlyReport = {
  month: 8,
  year: 2026,
  total_spent: 22058,
  budget: 25000,
  remaining: 2942,
  budget_usage_percentage: 88.23,
  highest_category: "Rent",
  average_daily_spend: 1696.77,
  expense_count: mockExpenses.length,
  category_breakdown: mockCategoryBreakdown.categories,
};

/* =========================================================
   MOCK DASHBOARD SUMMARY
========================================================= */

export const mockExpenseDashboardSummary: ExpenseDashboardSummary = {
  current_month: 8,
  current_year: 2026,
  total_spent: 22058,
  budget: 25000,
  remaining: 2942,
  budget_usage_percentage: 88.23,
  expense_count: mockExpenses.length,
  largest_category: "Rent",
  recent_expenses: mockExpenses
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 5)
    .map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    })),
};