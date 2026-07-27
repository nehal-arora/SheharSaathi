export const EXPENSE_CATEGORIES = [
  "Rent",
  "Food",
  "Travel",
  "Shopping",
  "Utilities",
  "Healthcare",
  "Education",
  "Entertainment",
  "Miscellaneous",
] as const;

export type ExpenseCategory =
  (typeof EXPENSE_CATEGORIES)[number];

export type ExpenseSortField =
  | "date"
  | "amount"
  | "created_at";

export type SortOrder = "asc" | "desc";

/* =========================================================
   CORE EXPENSE TYPES
========================================================= */

export interface Expense {
  id: number;
  user_id: number;

  amount: number;
  category: ExpenseCategory;
  description: string | null;
  date: string;

  created_at: string;
  updated_at: string;
}

export interface CreateExpenseInput {
  amount: number;
  category: ExpenseCategory;
  description?: string;
  date: string;
}

export interface UpdateExpenseInput {
  amount?: number;
  category?: ExpenseCategory;
  description?: string;
  date?: string;
}

/* =========================================================
   LISTING, FILTERS AND PAGINATION
========================================================= */

export interface ExpenseFilters {
  page?: number;
  limit?: number;

  search?: string;
  category?: ExpenseCategory | "All";

  start_date?: string;
  end_date?: string;

  min_amount?: number;
  max_amount?: number;

  sort_by?: ExpenseSortField;
  sort_order?: SortOrder;
}

export interface ExpenseListResponse {
  items: Expense[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

/* =========================================================
   BUDGET TYPES
========================================================= */

export interface Budget {
  id: number;
  user_id: number;

  month: number;
  year: number;
  budget_amount: number;

  created_at: string;
  updated_at: string;
}

export interface CreateBudgetInput {
  month: number;
  year: number;
  budget_amount: number;
}

/* =========================================================
   ANALYTICS TYPES
========================================================= */

export interface CategoryBreakdownItem {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
}

export interface CategoryBreakdownResponse {
  month: number;
  year: number;
  total_spent: number;
  categories: CategoryBreakdownItem[];
}

export interface MonthlySummary {
  month: number;
  year: number;

  total_spent: number;
  budget: number | null;
  remaining: number | null;
  budget_usage_percentage: number | null;

  expense_count: number;
  largest_category: ExpenseCategory | null;
}

export interface SpendingTrendItem {
  month: number;
  year: number;
  label: string;
  total_spent: number;
}

export interface SpendingTrendsResponse {
  items: SpendingTrendItem[];
}

/* =========================================================
   REPORT TYPES
========================================================= */

export interface MonthlyReport {
  month: number;
  year: number;

  total_spent: number;
  budget: number | null;
  remaining: number | null;
  budget_usage_percentage: number | null;

  highest_category: ExpenseCategory | null;
  average_daily_spend: number;
  expense_count: number;

  category_breakdown: CategoryBreakdownItem[];
}

/* =========================================================
   DASHBOARD SUMMARY TYPES
========================================================= */

export interface RecentExpense {
  id: number;
  amount: number;
  category: ExpenseCategory;
  description: string | null;
  date: string;
}

export interface ExpenseDashboardSummary {
  current_month: number;
  current_year: number;

  total_spent: number;
  budget: number | null;
  remaining: number | null;
  budget_usage_percentage: number | null;

  expense_count: number;
  largest_category: ExpenseCategory | null;

  recent_expenses: RecentExpense[];
}

/* =========================================================
   UI SUPPORT TYPES
========================================================= */

export interface ExpenseFormValues {
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
}

export interface ExpenseAnalyticsCardData {
  title: string;
  value: string;
  description?: string;
}

export interface ExpenseDeleteResponse {
  success: boolean;
  message: string;
}