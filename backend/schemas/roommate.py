from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, Field


class RoommateBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    age: int = Field(..., ge=18)
    gender: str
    occupation: str
    company_or_college: str
    city: str
    preferred_locality: str
    budget: Decimal
    bio: Optional[str] = None
    profile_image: Optional[str] = None
    food_preference: str
    smoking: bool
    drinking: bool
    pets: bool
    sleep_schedule: str
    wake_up_time: str
    cleanliness: str
    guest_preference: str
    work_schedule: str
    languages: List[str]
    preferred_gender: str
    sharing_type: str
    move_in_date: date
    lease_duration: int = Field(..., ge=1, le=60)


class RoommateCreate(RoommateBase):
    pass


class RoommateUpdate(RoommateBase):
    pass


class RoommateResponse(RoommateBase):
    id: int
    user_id: int
    compatibility: Optional[int] = None
    is_favorite: bool = False
    lease_duration: int
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }


class RoommateListResponse(BaseModel):
    items: List[RoommateResponse]
    total: int
    total_pages: int