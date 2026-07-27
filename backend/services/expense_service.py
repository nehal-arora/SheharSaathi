from math import ceil

from fastapi import HTTPException, status
from sqlalchemy import desc, func
from sqlalchemy.orm import Session

from models.expense import Expense
from models.user import User
from models.budget import Budget
from schemas.expense import (
    ExpenseCreate,
    ExpenseUpdate,
)


def create_expense(
    expense_data: ExpenseCreate,
    current_user: User,
    db: Session,
):
    new_expense = Expense(
        user_id=current_user.id,
        **expense_data.model_dump(),
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense


def get_expenses(
    db: Session,
    current_user: User,
    page: int = 1,
    limit: int = 10,
    category: str | None = None,
    start_date=None,
    end_date=None,
    min_amount: float | None = None,
    max_amount: float | None = None,
    search: str | None = None,
):
    query = (
        db.query(Expense)
        .filter(Expense.user_id == current_user.id)
    )

    if category:
        query = query.filter(
            Expense.category == category
        )

    if start_date:
        query = query.filter(
            Expense.date >= start_date
        )

    if end_date:
        query = query.filter(
            Expense.date <= end_date
        )

    if min_amount is not None:
        query = query.filter(
            Expense.amount >= min_amount
        )

    if max_amount is not None:
        query = query.filter(
            Expense.amount <= max_amount
        )

    if search:
        query = query.filter(
            Expense.description.ilike(f"%{search}%")
        )

    query = query.order_by(
        desc(Expense.date)
    )

    total = query.count()

    expenses = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": expenses,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": ceil(total / limit) if total else 0,
    }


def get_expense_by_id(
    expense_id: int,
    current_user: User,
    db: Session,
):
    expense = (
        db.query(Expense)
        .filter(
            Expense.id == expense_id,
            Expense.user_id == current_user.id,
        )
        .first()
    )

    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found",
        )

    return expense
def update_expense(
    expense_id: int,
    expense_data: ExpenseUpdate,
    current_user: User,
    db: Session,
):
    expense = (
        db.query(Expense)
        .filter(
            Expense.id == expense_id,
            Expense.user_id == current_user.id,
        )
        .first()
    )

    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found",
        )

    update_data = expense_data.model_dump(
        exclude_unset=True,
        exclude_none=True,
    )

    for key, value in update_data.items():
        setattr(expense, key, value)

    db.commit()
    db.refresh(expense)

    return expense


def delete_expense(
    expense_id: int,
    current_user: User,
    db: Session,
):
    expense = (
        db.query(Expense)
        .filter(
            Expense.id == expense_id,
            Expense.user_id == current_user.id,
        )
        .first()
    )

    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found",
        )

    db.delete(expense)
    db.commit()

    return {
        "success": True,
        "message": "Expense deleted successfully.",
    }
def create_or_update_budget(
    month: int,
    year: int,
    budget_amount: float,
    current_user: User,
    db: Session,
):
    budget = (
        db.query(Budget)
        .filter(
            Budget.user_id == current_user.id,
            Budget.month == month,
            Budget.year == year,
        )
        .first()
    )

    if budget:
        budget.budget_amount = budget_amount

        db.commit()
        db.refresh(budget)

        return budget

    budget = Budget(
        user_id=current_user.id,
        month=month,
        year=year,
        budget_amount=budget_amount,
    )

    db.add(budget)
    db.commit()
    db.refresh(budget)

    return budget


def get_budget(
    month: int,
    year: int,
    current_user: User,
    db: Session,
):
    budget = (
        db.query(Budget)
        .filter(
            Budget.user_id == current_user.id,
            Budget.month == month,
            Budget.year == year,
        )
        .first()
    )

    return budget    
def get_category_breakdown(
    month: int,
    year: int,
    current_user: User,
    db: Session,
):
    expenses = (
        db.query(Expense)
        .filter(
            Expense.user_id == current_user.id,
            func.extract("month", Expense.date) == month,
            func.extract("year", Expense.date) == year,
        )
        .all()
    )

    if not expenses:
        return {
            "categories": []
        }

    total_spent = sum(exp.amount for exp in expenses)

    category_map = {}

    for expense in expenses:
        category_map.setdefault(expense.category, 0)
        category_map[expense.category] += expense.amount

    categories = []

    for category, amount in category_map.items():
        categories.append(
            {
                "category": category,
                "amount": amount,
                "percentage": round(
                    (amount / total_spent) * 100,
                    2,
                ),
            }
        )

    return {
        "categories": categories
    }


def get_spending_trends(
    months: int,
    current_user: User,
    db: Session,
):
    expenses = (
        db.query(Expense)
        .filter(
            Expense.user_id == current_user.id,
        )
        .order_by(Expense.date.asc())
        .all()
    )

    trend_map = {}

    for expense in expenses:
        key = (
            expense.date.year,
            expense.date.month,
        )

        if key not in trend_map:
            trend_map[key] = 0

        trend_map[key] += expense.amount

    items = []

    for (year, month), total in sorted(trend_map.items()):
        items.append(
            {
                "month": month,
                "year": year,
                "label": expense.date.strftime("%b %Y"),
                "total_spent": total,
            }
        )

    return {
        "items": items[-months:]
    }


def get_dashboard_summary(
    current_user: User,
    db: Session,
):
    expenses = (
        db.query(Expense)
        .filter(
            Expense.user_id == current_user.id,
        )
        .order_by(desc(Expense.date))
        .all()
    )

    total_spent = sum(
        expense.amount for expense in expenses
    )

    expense_count = len(expenses)

    recent_expenses = expenses[:5]

    category_totals = {}

    for expense in expenses:
        category_totals.setdefault(
            expense.category,
            0,
        )

        category_totals[
            expense.category
        ] += expense.amount

    largest_category = (
        max(
            category_totals,
            key=category_totals.get,
        )
        if category_totals
        else None
    )

    return {
        "current_month": None,
        "current_year": None,
        "total_spent": total_spent,
        "expense_count": expense_count,
        "budget": None,
        "remaining": None,
        "budget_usage_percentage": None,
        "largest_category": largest_category,
        "recent_expenses": recent_expenses,
    }


def get_monthly_report(
    month: int,
    year: int,
    current_user: User,
    db: Session,
):
    expenses = (
        db.query(Expense)
        .filter(
            Expense.user_id == current_user.id,
            func.extract("month", Expense.date) == month,
            func.extract("year", Expense.date) == year,
        )
        .all()
    )

    total_spent = sum(
        expense.amount for expense in expenses
    )

    expense_count = len(expenses)

    category_map = {}

    for expense in expenses:
        category_map.setdefault(
            expense.category,
            0,
        )

        category_map[
            expense.category
        ] += expense.amount

    breakdown = []

    for category, amount in category_map.items():
        breakdown.append(
            {
                "category": category,
                "amount": amount,
                "percentage": round(
                    (amount / total_spent) * 100,
                    2,
                )
                if total_spent
                else 0,
            }
        )

    highest_category = (
        max(
            category_map,
            key=category_map.get,
        )
        if category_map
        else None
    )

    return {
        "month": month,
        "year": year,
        "total_spent": total_spent,
        "expense_count": expense_count,
        "budget": None,
        "remaining": None,
        "budget_usage_percentage": None,
        "average_daily_spend": round(
            total_spent / 31,
            2,
        )
        if total_spent
        else 0,
        "highest_category": highest_category,
        "category_breakdown": breakdown,
    }    