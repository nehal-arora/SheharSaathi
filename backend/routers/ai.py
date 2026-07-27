from fastapi import (
    APIRouter,
    Depends,
    status,
)
from sqlalchemy.orm import Session

from database.session import get_db
from models.user import User

from schemas.ai import (
    AIChatRequest,
    AIChatResponse,
    AIChatHistoryResponse,
    LocalityRecommendationRequest,
    LocalityRecommendationResponse,
    ScamCheckRequest,
    ScamCheckResponse,
    BudgetAdvisorRequest,
    BudgetAdvisorResponse,
    SuggestionsResponse,
)

from services.ai_service import (
    chat_with_ai,
    get_chat_history,
    clear_chat_history,
    get_locality_recommendation,
    scam_check,
    budget_advisor,
    get_suggestions,
)

from utils.dependencies import get_current_user

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


# -------------------------
# AI Chat
# -------------------------

@router.post(
    "/chat",
    response_model=AIChatResponse,
)
def ai_chat(
    chat_data: AIChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return chat_with_ai(
        chat_data,
        current_user,
        db,
    )


# -------------------------
# Chat History
# -------------------------

@router.get(
    "/chat/history",
    response_model=AIChatHistoryResponse,
)
def chat_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_chat_history(
        current_user,
        db,
    )


@router.delete(
    "/chat/history",
)
def delete_chat_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return clear_chat_history(
        current_user,
        db,
    )


# -------------------------
# Locality Recommendation
# -------------------------

@router.post(
    "/locality-recommendation",
    response_model=LocalityRecommendationResponse,
)
def locality_recommendation(
    request: LocalityRecommendationRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_locality_recommendation(
        request,
        current_user,
        db,
    )


# -------------------------
# Rental Scam Checker
# -------------------------

@router.post(
    "/scam-check",
    response_model=ScamCheckResponse,
)
def rental_scam_checker(
    request: ScamCheckRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return scam_check(
        request,
        current_user,
        db,
    )


# -------------------------
# Budget Advisor
# -------------------------

@router.post(
    "/budget-advisor",
    response_model=BudgetAdvisorResponse,
)
def ai_budget_advisor(
    request: BudgetAdvisorRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return budget_advisor(
        request,
        current_user,
        db,
    )


# -------------------------
# Suggestions
# -------------------------

@router.get(
    "/suggestions",
    response_model=SuggestionsResponse,
)
def suggestions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_suggestions(
        current_user,
        db,
    )