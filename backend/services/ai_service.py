from sqlalchemy.orm import Session
from fastapi import HTTPException

from models.ai import AIChatMessage
from models.user import User

from schemas.ai import (
    AIChatRequest,
)


def generate_ai_response(question: str) -> str:
    """
    Placeholder AI response.
    Replace this later with Gemini/OpenAI.
    """

    return (
        "Thank you for your question. "
        "The AI integration is currently under development. "
        "Your query has been received successfully."
    )


def chat_with_ai(
    chat_data: AIChatRequest,
    current_user: User,
    db: Session,
):
    user_message = AIChatMessage(
        user_id=current_user.id,
        role="user",
        content=chat_data.question,
    )

    db.add(user_message)
    db.commit()
    db.refresh(user_message)

    answer = generate_ai_response(
        chat_data.question,
    )

    assistant_message = AIChatMessage(
        user_id=current_user.id,
        role="assistant",
        content=answer,
    )

    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)

    return {
        "answer": answer,
        "message": assistant_message,
    }


def get_chat_history(
    current_user: User,
    db: Session,
):
    messages = (
        db.query(AIChatMessage)
        .filter(
            AIChatMessage.user_id == current_user.id
        )
        .order_by(
            AIChatMessage.created_at.asc()
        )
        .all()
    )

    return {
        "items": messages,
    }


def clear_chat_history(
    current_user: User,
    db: Session,
):
    (
        db.query(AIChatMessage)
        .filter(
            AIChatMessage.user_id == current_user.id
        )
        .delete()
    )

    db.commit()

    return {
        "success": True,
        "message": "Chat history cleared successfully.",
    }

from schemas.ai import (
    LocalityRecommendationRequest,
    ScamCheckRequest,
    BudgetAdvisorRequest,
)


def get_locality_recommendation(
    request: LocalityRecommendationRequest,
    current_user: User,
    db: Session,
):
    return {
        "summary": (
            f"{request.city} recommendations generated "
            "based on your preferences."
        ),
        "recommendations": [
            {
                "id": "rohini-sector-9",
                "locality": "Rohini Sector 9",
                "city": request.city,
                "match_score": 91,
                "average_rent": 16000,
                "safety_score": 8.7,
                "transport_score": 9.1,
                "affordability_score": 8.8,
                "commute_minutes": 30,
                "nearest_metro": "Rohini East",
                "distance_to_metro_km": 1.2,
                "reasons": [
                    "Fits within your budget",
                    "Strong metro connectivity",
                    "Suitable for students",
                    "Good safety profile",
                ],
                "pros": [
                    "Affordable",
                    "Good transport",
                    "Nearby markets",
                ],
                "cons": [
                    "Can be crowded during peak hours",
                ],
            }
        ],
    }


def scam_check(
    request: ScamCheckRequest,
    current_user: User,
    db: Session,
):
    risk_score = 20

    red_flags = []

    if request.payment_requested_before_visit:
        risk_score += 35
        red_flags.append(
            "Payment requested before property visit."
        )

    if request.owner_refuses_property_visit:
        risk_score += 35
        red_flags.append(
            "Owner refuses property visit."
        )

    if request.deposit and request.rent:
        if request.deposit > request.rent * 3:
            risk_score += 20
            red_flags.append(
                "Deposit appears unusually high."
            )

    if risk_score >= 70:
        level = "High"
    elif risk_score >= 40:
        level = "Medium"
    else:
        level = "Low"

    return {
        "risk_level": level,
        "risk_score": min(risk_score, 100),
        "summary": "AI generated rental scam assessment.",
        "red_flags": red_flags,
        "positive_signals": [
            "Basic listing information provided."
        ],
        "recommendations": [
            "Visit the property before paying.",
            "Verify owner identity.",
            "Avoid advance payment.",
        ],
        "disclaimer": (
            "This is an AI-based risk assessment "
            "and not a legal guarantee."
        ),
    }


def budget_advisor(
    request: BudgetAdvisorRequest,
    current_user: User,
    db: Session,
):
    total_expenses = (
        request.housing_budget
        + request.monthly_food
        + request.monthly_transport
        + request.monthly_utilities
        + request.monthly_other_expenses
    )

    savings = (
        request.monthly_income
        - total_expenses
    )

    housing_percentage = (
        request.housing_budget
        / request.monthly_income
        * 100
    )

    if housing_percentage <= 30:
        status = "Safe"
    elif housing_percentage <= 40:
        status = "Manageable"
    elif housing_percentage <= 50:
        status = "Tight"
    else:
        status = "Risky"

    return {
        "status": status,
        "summary": "Budget analysis generated successfully.",
        "monthly_income": request.monthly_income,
        "recommended_housing_budget": (
            request.monthly_income * 0.30
        ),
        "current_housing_budget": request.housing_budget,
        "estimated_total_expenses": total_expenses,
        "estimated_savings": savings,
        "housing_percentage": round(
            housing_percentage,
            2,
        ),
        "expense_breakdown": [
            {
                "category": "Housing",
                "amount": request.housing_budget,
                "percentage": round(
                    housing_percentage,
                    2,
                ),
            },
            {
                "category": "Food",
                "amount": request.monthly_food,
                "percentage": round(
                    request.monthly_food
                    / request.monthly_income
                    * 100,
                    2,
                ),
            },
            {
                "category": "Transport",
                "amount": request.monthly_transport,
                "percentage": round(
                    request.monthly_transport
                    / request.monthly_income
                    * 100,
                    2,
                ),
            },
        ],
        "recommendations": [
            "Keep housing below 30% of income.",
            "Maintain an emergency fund.",
        ],
        "warnings": (
            ["Housing budget is relatively high."]
            if housing_percentage > 35
            else []
        ),
    }


def get_suggestions(
    current_user: User,
    db: Session,
):
    return {
        "items": [
            {
                "id": "suggestion-1",
                "type": "housing",
                "title": "Consider shared housing",
                "description": (
                    "Shared accommodation can reduce "
                    "monthly rent."
                ),
                "reason": (
                    "Matches your current preferences."
                ),
                "priority": "High",
                "action_label": "Explore Housing",
                "action_url": (
                    "/housing?city=Delhi"
                ),
                "created_at": current_user.created_at,
            }
        ]
    }    