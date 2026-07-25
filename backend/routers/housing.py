from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from typing import Optional

from database.session import get_db
from schemas.housing import (
    HousingCreate,
    HousingUpdate,
    HousingResponse,
    HousingListResponse,
)
from services.housing_service import (
    get_housing_list,
    get_housing_by_id,
    create_housing,
    update_housing,
    delete_housing,
)
from utils.dependencies import get_current_user
from models.user import User

router = APIRouter(
    prefix="/housing",
    tags=["Housing"],
)



@router.get(
    "/",
    response_model=HousingListResponse,
)
def get_all_housing(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),

    city: Optional[str] = None,
    locality: Optional[str] = None,
    min_rent: Optional[float] = None,
    max_rent: Optional[float] = None,
    house_type: Optional[str] = None,

    db: Session = Depends(get_db),
):
    return get_housing_list(
        db=db,
        page=page,
        limit=limit,
        city=city,
        locality=locality,
        min_rent=min_rent,
        max_rent=max_rent,
        house_type=house_type,
    )


@router.get(
    "/{housing_id}",
    response_model=HousingResponse,
)
def get_housing(
    housing_id: int,
    db: Session = Depends(get_db),
):
    return get_housing_by_id(
        housing_id,
        db,
    )


@router.post(
    "/",
    response_model=HousingResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_listing(
    housing_data: HousingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_housing(
        housing_data,
        current_user,
        db,
    )


@router.put(
    "/{housing_id}",
    response_model=HousingResponse,
)
def update_listing(
    housing_id: int,
    housing_data: HousingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_housing(
        housing_id,
        housing_data,
        current_user,
        db,
    )


@router.delete(
    "/{housing_id}",
)
def delete_listing(
    housing_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return delete_housing(
        housing_id,
        current_user,
        db,
    )