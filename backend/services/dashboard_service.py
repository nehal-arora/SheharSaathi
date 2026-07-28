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

    # =========================
    # HOUSING
    # =========================

    total_listings = (
        db.query(Housing)
        .filter(Housing.owner_id == current_user.id)
        .count()
    )

    active_listings = (
        db.query(Housing)
        .filter(
            Housing.owner_id == current_user.id,
            Housing.available == True,
        )
        .count()
    )

    # Replace later when Saved Housing module is built
    saved_listings = 0

    recent_listing = (
        db.query(Housing)
        .filter(Housing.owner_id == current_user.id)
        .order_by(Housing.created_at.desc())
        .first()
    )

    if recent_listing:
        recent_listing_data = {
            "id": recent_listing.id,
            "title": recent_listing.title,
            "locality": recent_listing.locality,
            "city": recent_listing.city,
            "rent": float(recent_listing.rent),
        }
    else:
        recent_listing_data = None

    # =========================
    # EXPENSES
    # =========================

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

    top_category_name = (
        top_category.category
        if top_category
        else None
    )

    # =========================
    # ROOMMATES
    # =========================

    favorites = (
        db.query(FavoriteRoommate)
        .filter(
            FavoriteRoommate.user_id == current_user.id
        )
        .count()
    )

    # Replace later with actual matching module
    total_matches = 0
    pending_interests = 0
    top_match = None

    # =========================
    # NOTIFICATIONS
    # =========================

    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .limit(5)
        .all()
    )

    # =========================
    # TRANSPORT
    # =========================

    transport = {
        "nearest_metro": None,
        "metro_distance_km": None,
        "estimated_commute": None,
        "preferred_route": None,
    }

    # =========================
    # AI SUGGESTIONS
    # =========================

    ai_suggestions = []

    # =========================
    # RESPONSE
    # =========================

    return {
        "user": {
            "id": current_user.id,
            "full_name": current_user.name,
            "email": current_user.email,
            "city": None,
            "occupation": None,
            "profile_image": None,
        },
        "housing": {
            "total_listings": total_listings,
            "active_listings": active_listings,
            "saved_listings": saved_listings,
            "recent_listing": recent_listing_data,
        },
        "expenses": {
            "monthly_budget": monthly_budget,
            "total_expenses": float(total_expenses),
            "remaining_budget": remaining_budget,
            "budget_used_percentage": budget_used_percentage,
            "top_category": top_category_name,
        },
        "roommates": {
            "total_matches": total_matches,
            "favorites": favorites,
            "pending_interests": pending_interests,
            "top_match": top_match,
        },
        "notifications": notifications,
        "transport": transport,
        "aiSuggestions": ai_suggestions,
    }
