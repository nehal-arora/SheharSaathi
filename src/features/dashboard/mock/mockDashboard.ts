import type { DashboardData } from "../types/dashboard.types";

export const mockDashboardData: DashboardData = {
  user: {
    id: 1,
    full_name: "Nehal Arora",
    email: "nehal@example.com",
    city: "Delhi",
    occupation: "Student",
    profile_image: null,
  },

  housing: {
    total_listings: 4,
    active_listings: 3,
    saved_listings: 7,
    recent_listing: {
      id: 12,
      title: "Furnished room near Delhi University",
      locality: "Mukherjee Nagar",
      city: "Delhi",
      rent: 15000,
    },
  },

  expenses: {
    monthly_budget: 35000,
    total_expenses: 24500,
    remaining_budget: 10500,
    budget_used_percentage: 70,
    top_category: "Rent",
  },

  roommates: {
    total_matches: 8,
    favorites: 3,
    pending_interests: 2,
    top_match: {
      id: 7,
      name: "Aarav Sharma",
      compatibility_score: 91,
      locality: "Mukherjee Nagar",
    },
  },

  notifications: [
    {
      id: 1,
      title: "New roommate interest",
      message:
        "A roommate has expressed interest in your profile.",
      type: "roommate",
      is_read: false,
      created_at: "2026-07-27T10:30:00.000Z",
    },
    {
      id: 2,
      title: "Budget update",
      message:
        "You have used 70% of your monthly relocation budget.",
      type: "expense",
      is_read: false,
      created_at: "2026-07-27T08:15:00.000Z",
    },
    {
      id: 3,
      title: "Housing listing saved",
      message:
        "Your saved property in Mukherjee Nagar is still available.",
      type: "housing",
      is_read: true,
      created_at: "2026-07-26T16:45:00.000Z",
    },
  ],

  transport: {
    nearest_metro: "GTB Nagar Metro Station",
    metro_distance_km: 1.2,
    estimated_commute: "18 minutes",
    preferred_route: "Yellow Line",
  },

  aiSuggestions: [
    {
      id: "suggestion-1",
      title: "Review your monthly food expenses",
      description:
        "Your current food spending is slightly higher than your planned allocation.",
      type: "budget",
      action_url: "/budget-advisor",
    },
    {
      id: "suggestion-2",
      title: "Explore housing near GTB Nagar",
      description:
        "GTB Nagar may provide a shorter commute while remaining within your current rent range.",
      type: "locality",
      action_url: "/locality",
    },
  ],
};