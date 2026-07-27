from datetime import date
from typing import Optional
from fastapi import (
    APIRouter,
    Depends,
    Query,
    status,
)
from sqlalchemy.orm import Session

from database.session import get_db
from models.user import User
from schemas.expense import (
    ExpenseCreate,
    ExpenseUpdate,
    ExpenseResponse,
    ExpenseListResponse,
    BudgetCreate,
    BudgetResponse,
)
from services.expense_service import (
    create_expense,
    get_expenses,
    get_expense_by_id,
    update_expense,
    delete_expense,
    create_or_update_budget,
    get_budget,
    get_category_breakdown,
    get_spending_trends,
    get_dashboard_summary,
    get_monthly_report,
)
from utils.dependencies import get_current_user

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"],
)

@router.post(
    "/",
    response_model=ExpenseResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_expense(
    expense_data: ExpenseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return create_expense(
        expense_data,
        current_user,
        db,
    )


@router.get(
    "/",
    response_model=ExpenseListResponse,
)
def get_all_expenses(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    category: Optional[str]= None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    min_amount: Optional[float] = None,
    max_amount: Optional[float] = None,
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_expenses(
        db=db,
        current_user=current_user,
        page=page,
        limit=limit,
        category=category,
        start_date=start_date,
        end_date=end_date,
        min_amount=min_amount,
        max_amount=max_amount,
        search=search,
    )


@router.get(
    "/{expense_id}",
    response_model=ExpenseResponse,
)
def get_single_expense(
    expense_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_expense_by_id(
        expense_id,
        current_user,
        db,
    )


@router.put(
    "/{expense_id}",
    response_model=ExpenseResponse,
)
def update_single_expense(
    expense_id: int,
    expense_data: ExpenseUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return update_expense(
        expense_id,
        expense_data,
        current_user,
        db,
    )


@router.delete(
    "/{expense_id}",
)
def delete_single_expense(
    expense_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return delete_expense(
        expense_id,
        current_user,
        db,
    )
@router.post(
    "/budget",
    response_model=BudgetResponse,
)
def create_budget(
    budget_data: BudgetCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return create_or_update_budget(
        month=budget_data.month,
        year=budget_data.year,
        budget_amount=budget_data.budget_amount,
        current_user=current_user,
        db=db,
    )


@router.get(
    "/budget",
    response_model=Optional[BudgetResponse],
)
def get_budget_data(
    month: int,
    year: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_budget(
        month,
        year,
        current_user,
        db,
    )
@router.get("/analytics/category-breakdown")
def category_breakdown(
    month: int,
    year: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_category_breakdown(
        month,
        year,
        current_user,
        db,
    )


@router.get("/analytics/trends")
def spending_trends(
    months: int = 6,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_spending_trends(
        months,
        current_user,
        db,
    )


@router.get("/dashboard")
def dashboard_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_dashboard_summary(
        current_user,
        db,
    )


@router.get("/report")
def monthly_report(
    month: int,
    year: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_monthly_report(
        month,
        year,
        current_user,
        db,
    )