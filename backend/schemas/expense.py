from datetime import date, datetime
from typing import Literal,Optional

from pydantic import BaseModel, Field, ConfigDict


ExpenseCategory = Literal[
    "Food",
    "Rent",
    "Transport",
    "Utilities",
    "Shopping",
    "Healthcare",
    "Education",
    "Entertainment",
    "Travel",
    "Other",
]


class ExpenseCreate(BaseModel):
    amount: float = Field(..., gt=0)
    category: ExpenseCategory
    description: str = Field(
        default="",
        max_length=250,
    )
    date: date


class ExpenseUpdate(BaseModel):
    amount: Optional[float] = Field(
        default=None,
        gt=0,
    )
    category: Optional[ExpenseCategory] = None
    description: Optional[str] = Field(
        default=None,
        max_length=250,
    )
    date: Optional[date] = None


class ExpenseResponse(BaseModel):
    id: int
    user_id: int
    amount: float
    category: ExpenseCategory
    description: str
    date: date
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class ExpenseListResponse(BaseModel):
    items: list[ExpenseResponse]
    total: int
    page: int
    limit: int
    total_pages: int


class BudgetCreate(BaseModel):
    month: int = Field(..., ge=1, le=12)
    year: int = Field(..., ge=2000, le=2100)
    budget_amount: float = Field(..., gt=0)


class BudgetResponse(BaseModel):
    id: int
    user_id: int
    month: int
    year: int
    budget_amount: float
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )