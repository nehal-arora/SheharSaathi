from datetime import date, datetime
from decimal import Decimal
from typing import List

from pydantic import BaseModel, Field


class HousingBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=150)
    description: str
    rent: Decimal
    deposit: Decimal
    city: str
    locality: str
    address: str
    house_type: str
    sharing_type: str
    gender_preference: str
    is_furnished: bool
    available_from: date
    contact_number: str
    images: List[str]


class HousingCreate(HousingBase):
    pass


class HousingUpdate(HousingBase):
    pass


class HousingResponse(HousingBase):
    id: int
    owner_id: int
    available: bool
    verified: bool
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }


class HousingListResponse(BaseModel):
    items: List[HousingResponse]
    total: int
    total_pages: int