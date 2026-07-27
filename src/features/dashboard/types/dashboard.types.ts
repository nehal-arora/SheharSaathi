export interface DashboardUser {
  id: number;
  full_name: string;
  email: string;
  city?: string;
  occupation?: string;
  profile_image?: string | null;
}

export interface DashboardHousingSummary {
  total_listings: number;
  active_listings: number;
  saved_listings: number;
  recent_listing?: {
    id: number;
    title: string;
    locality: string;
    city: string;
    rent: number;
  } | null;
}

export interface DashboardExpenseSummary {
  monthly_budget: number;
  total_expenses: number;
  remaining_budget: number;
  budget_used_percentage: number;
  top_category?: string;
}

export interface DashboardRoommateSummary {
  total_matches: number;
  favorites: number;
  pending_interests: number;
  top_match?: {
    id: number;
    name: string;
    compatibility_score: number;
    locality: string;
  } | null;
}

export interface DashboardNotification {
  id: number;
  title: string;
  message: string;
  type:
    | "housing"
    | "roommate"
    | "expense"
    | "ai"
    | "reminder"
    | "general";
  is_read: boolean;
  created_at: string;
}

export interface DashboardTransportSummary {
  nearest_metro?: string;
  metro_distance_km?: number;
  estimated_commute?: string;
  preferred_route?: string;
}

export interface DashboardAISuggestion {
  id: string;
  title: string;
  description: string;
  type:
    | "housing"
    | "roommate"
    | "expense"
    | "budget"
    | "locality"
    | "safety"
    | "transport"
    | "general";
  action_url?: string;
}

export interface DashboardData {
  user: DashboardUser;
  housing: DashboardHousingSummary;
  expenses: DashboardExpenseSummary;
  roommates: DashboardRoommateSummary;
  notifications: DashboardNotification[];
  transport: DashboardTransportSummary;
  aiSuggestions: DashboardAISuggestion[];
}