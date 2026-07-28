from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from models.user import User
from models.housing import Housing
from models.expense import Expense
from models.favorite_roommate import FavoriteRoommate
from models.ai import AIChatMessage


def get_dashboard_data(
    current_user: User,
    db: Session,
):
    now = datetime.now()

    # Housing
    my_listings = (
        db.query(Housing)
        .filter(Housing.owner_id == current_user.id)
        .count()
    )

    # Replace with your Saved Housing model later if available
    saved_properties = 0

    # Expenses
    monthly_spent = (
        db.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(
            Expense.user_id == current_user.id,
            func.extract("month", Expense.date) == now.month,
            func.extract("year", Expense.date) == now.year,
        )
        .scalar()
    )
    budget_amount= 15000

    # Roommates
    favorites = (
        db.query(FavoriteRoommate)
        .filter(
            FavoriteRoommate.user_id == current_user.id
        )
        .count()
    )

    # Replace with your roommate matching module later
    matches = 0

    # Notifications (temporary)
    notifications = []

    # AI suggestion (temporary)
    ai_suggestion = {
        "title": "AI Recommendation",
        "message": "Try exploring localities near metro stations to reduce commute time."
    }

    # Transport (temporary)
    transport = {
        "nearest_metro": "Not Available",
        "distance": "-"
    }

    return {
        "user": {
            "id": current_user.id,
            "name": current_user.name,
        },
        "housing": {
            "saved_properties": saved_properties,
            "my_listings": my_listings,
        },
        "expenses": {
            "monthly_spent": float(monthly_spent),
            "budget": budget_amount,
        },
        "roommates": {
            "favorites": favorites,
            "matches": matches,
        },
        "notifications": notifications,
        "transport": transport,
        "ai_suggestion": ai_suggestion,
    }