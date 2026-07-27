from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, ConfigDict


# -----------------------------
# Chat
# -----------------------------

class AIChatRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        max_length=2000,
    )


class AIChatMessageResponse(BaseModel):
    id: int
    user_id: int
    role: Literal["user", "assistant"]
    content: str
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class AIChatResponse(BaseModel):
    answer: str
    message: AIChatMessageResponse


class AIChatHistoryResponse(BaseModel):
    items: list[AIChatMessageResponse]


# -----------------------------
# Locality Recommendation
# -----------------------------

class LocalityRecommendationRequest(BaseModel):
    city: str = Field(..., max_length=100)
    budget: float = Field(..., gt=0)
    occupation: str

    workplace_or_college: str | None = None

    preferred_localities: list[str] = []

    transport_preference: str | None = None

    safety_priority: str | None = None

    maximum_commute_minutes: int | None = None

    sharing_preference: str | None = None


class LocalityRecommendationItem(BaseModel):
    id: str
    locality: str
    city: str

    match_score: float

    average_rent: float

    safety_score: float

    transport_score: float

    affordability_score: float

    commute_minutes: int

    nearest_metro: str

    distance_to_metro_km: float

    reasons: list[str]

    pros: list[str]

    cons: list[str]


class LocalityRecommendationResponse(BaseModel):
    summary: str

    recommendations: list[
        LocalityRecommendationItem
    ]


# -----------------------------
# Scam Checker
# -----------------------------

class ScamCheckRequest(BaseModel):
    listing_text: str = Field(
        ...,
        max_length=5000,
    )

    rent: float | None = None

    deposit: float | None = None

    city: str | None = None

    locality: str | None = None

    contact_method: str | None = None

    payment_requested_before_visit: bool = False

    owner_refuses_property_visit: bool = False

    listing_url: str | None = None


class ScamCheckResponse(BaseModel):
    risk_level: Literal[
        "Low",
        "Medium",
        "High",
    ]

    risk_score: int

    summary: str

    red_flags: list[str]

    positive_signals: list[str]

    recommendations: list[str]

    disclaimer: str


# -----------------------------
# Budget Advisor
# -----------------------------

class BudgetAdvisorRequest(BaseModel):
    monthly_income: float = Field(..., gt=0)

    housing_budget: float = Field(..., gt=0)

    city: str

    locality: str

    sharing_type: str

    monthly_transport: float = Field(..., ge=0)

    monthly_food: float = Field(..., ge=0)

    monthly_utilities: float = Field(..., ge=0)

    monthly_other_expenses: float = Field(..., ge=0)

    savings_goal: float = Field(..., ge=0)


class ExpenseBreakdownItem(BaseModel):
    category: str

    amount: float

    percentage: float


class BudgetAdvisorResponse(BaseModel):
    status: Literal[
        "Safe",
        "Manageable",
        "Tight",
        "Risky",
    ]

    summary: str

    monthly_income: float

    recommended_housing_budget: float

    current_housing_budget: float

    estimated_total_expenses: float

    estimated_savings: float

    housing_percentage: float

    expense_breakdown: list[
        ExpenseBreakdownItem
    ]

    recommendations: list[str]

    warnings: list[str]


# -----------------------------
# Suggestions
# -----------------------------

class SuggestionItem(BaseModel):
    id: str

    type: Literal[
        "housing",
        "roommate",
        "budget",
        "locality",
        "safety",
        "transport",
        "expense",
        "general",
    ]

    title: str

    description: str

    reason: str

    priority: Literal[
        "Low",
        "Medium",
        "High",
    ]

    action_label: str

    action_url: str

    created_at: datetime


class SuggestionsResponse(BaseModel):
    items: list[
        SuggestionItem
    ]