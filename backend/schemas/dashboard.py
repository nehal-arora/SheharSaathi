from pydantic import BaseModel


class DashboardUser(BaseModel):
    id: int
    name: str


class HousingSummary(BaseModel):
    saved_properties: int
    my_listings: int


class ExpenseSummary(BaseModel):
    monthly_spent: float
    budget: float | None


class RoommateSummary(BaseModel):
    favorites: int
    matches: int


class DashboardNotification(BaseModel):
    id: int
    title: str
    message: str
    type: str


class TransportSummary(BaseModel):
    nearest_metro: str
    distance: str


class AISuggestion(BaseModel):
    title: str
    message: str


class DashboardResponse(BaseModel):
    user: DashboardUser
    housing: HousingSummary
    expenses: ExpenseSummary
    roommates: RoommateSummary
    notifications: list[DashboardNotification]
    transport: TransportSummary
    ai_suggestion: AISuggestion