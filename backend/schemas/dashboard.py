from datetime import datetime

from pydantic import BaseModel


# ==========================
# USER
# ==========================

class DashboardUser(BaseModel):
    id: int
    full_name: str
    email: str
    city: str | None = None
    occupation: str | None = None
    profile_image: str | None = None


# ==========================
# HOUSING
# ==========================

class RecentListing(BaseModel):
    id: int
    title: str
    locality: str
    city: str
    rent: float


class HousingSummary(BaseModel):
    total_listings: int
    active_listings: int
    saved_listings: int
    recent_listing: RecentListing | None = None


# ==========================
# EXPENSES
# ==========================

class ExpenseSummary(BaseModel):
    monthly_budget: float | None = None
    total_expenses: float
    remaining_budget: float | None = None
    budget_used_percentage: float | None = None
    top_category: str | None = None


# ==========================
# ROOMMATES
# ==========================

class TopMatch(BaseModel):
    id: int
    name: str
    compatibility_score: int
    locality: str


class RoommateSummary(BaseModel):
    total_matches: int
    favorites: int
    pending_interests: int
    top_match: TopMatch | None = None


# ==========================
# NOTIFICATIONS
# ==========================

class DashboardNotification(BaseModel):
    id: int
    title: str
    message: str
    type: str
    is_read: bool
    created_at: datetime


# ==========================
# TRANSPORT
# ==========================

class TransportSummary(BaseModel):
    nearest_metro: str | None = None
    metro_distance_km: float | None = None
    estimated_commute: str | None = None
    preferred_route: str | None = None


# ==========================
# AI SUGGESTIONS
# ==========================

class DashboardAISuggestion(BaseModel):
    id: str
    title: str
    description: str
    type: str
    action_url: str | None = None


# ==========================
# COMPLETE RESPONSE
# ==========================

class DashboardResponse(BaseModel):
    user: DashboardUser
    housing: HousingSummary
    expenses: ExpenseSummary
    roommates: RoommateSummary
    notifications: list[DashboardNotification]
    transport: TransportSummary
    aiSuggestions: list[DashboardAISuggestion]