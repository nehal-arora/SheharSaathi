from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from models.user import User
from models.housing import Housing
from models.expense import Expense
from models.favorite_roommate import FavoriteRoommate
from models.notification import Notification


def get_dashboard_data(
    current_user: User,
    db: Session,
):
    now = datetime.now()

    # =====================================================
    # USER
    # =====================================================

    user_data = {
        "id": current_user.id,
        "full_name": current_user.name,
        "email": current_user.email,
        "city": getattr(current_user, "city", None),
        "occupation": getattr(current_user, "occupation", None),
        "profile_image": getattr(current_user, "profile_image", None),
    }

    # =====================================================
    # HOUSING
    # =====================================================

    total_listings = (
        db.query(Housing)
        .filter(Housing.owner_id == current_user.id)
        .count()
    )

    active_listings = (
        db.query(Housing)
        .filter(
            Housing.owner_id == current_user.id,
            Housing.available.is_(True),
        )
        .count()
    )

    # TODO: Replace with Saved Housing table later
    saved_listings = 0

    latest_listing = (
        db.query(Housing)
        .filter(Housing.owner_id == current_user.id)
        .order_by(Housing.created_at.desc())
        .first()
    )

    recent_listing = None

    if latest_listing:
        recent_listing = {
            "id": latest_listing.id,
            "title": latest_listing.title,
            "locality": latest_listing.locality,
            "city": latest_listing.city,
            "rent": float(latest_listing.rent),
        }

    housing_data = {
        "total_listings": total_listings,
        "active_listings": active_listings,
        "saved_listings": saved_listings,
        "recent_listing": recent_listing,
    }

    # =====================================================
    # EXPENSES
    # =====================================================

    total_expenses = (
        db.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(
            Expense.user_id == current_user.id,
            func.extract("month", Expense.date) == now.month,
            func.extract("year", Expense.date) == now.year,
        )
        .scalar()
    )

    top_category = (
        db.query(
            Expense.category,
            func.sum(Expense.amount).label("total"),
        )
        .filter(
            Expense.user_id == current_user.id,
            func.extract("month", Expense.date) == now.month,
            func.extract("year", Expense.date) == now.year,
        )
        .group_by(Expense.category)
        .order_by(func.sum(Expense.amount).desc())
        .first()
    )

    monthly_budget = None
    remaining_budget = None
    budget_used_percentage = None

    expense_data = {
        "monthly_budget": monthly_budget,
        "total_expenses": float(total_expenses),
        "remaining_budget": remaining_budget,
        "budget_used_percentage": budget_used_percentage,
        "top_category": (
            top_category.category
            if top_category
            else None
        ),
    }

    # =====================================================
    # ROOMMATES
    # =====================================================

    favorites = (
        db.query(FavoriteRoommate)
        .filter(
            FavoriteRoommate.user_id == current_user.id
        )
        .count()
    )

    roommate_data = {
        "total_matches": 0,
        "favorites": favorites,
        "pending_interests": 0,
        "top_match": None,
    }

    # =====================================================
    # NOTIFICATIONS
    # =====================================================

    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .limit(5)
        .all()
    )

    notification_data = []

    for notification in notifications:
        notification_data.append(
            {
                "id": notification.id,
                "title": notification.title,
                "message": notification.message,
                "type": notification.type,
                "is_read": notification.is_read,
                "created_at": notification.created_at,
            }
        )

    # =====================================================
    # TRANSPORT
    # =====================================================

    transport_data = {
        "nearest_metro": None,
        "metro_distance_km": None,
        "estimated_commute": None,
        "preferred_route": None,
    }

    # =====================================================
    # AI SUGGESTIONS
    # =====================================================

    ai_suggestions = []

    # =====================================================
    # FINAL RESPONSE
    # =====================================================

    return {
        "user": user_data,
        "housing": housing_data,
        "expenses": expense_data,
        "roommates": roommate_data,
        "notifications": notification_data,
        "transport": transport_data,
        "aiSuggestions": ai_suggestions,
    }