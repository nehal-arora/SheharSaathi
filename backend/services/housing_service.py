from math import ceil
from typing import Optional 

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from models.housing import Housing
from models.user import User
from schemas.housing import (
    HousingCreate,
    HousingUpdate,
)


def get_housing_list(
    db: Session,
    page: int = 1,
    limit: int = 10,
    city: Optional[str]=None,
    locality: Optional[str]=None,
    min_rent: Optional[float]=None,
    max_rent: Optional[float]=None,
    house_type: Optional[str]=None,
):
    query = db.query(Housing)

    if city:
        query=query.filter(Housing.city.ilike(f"%{city}%"))
    if locality:
        query=query.filter(Housing.locality.ilike(f"%{locality}%"))  
    if min_rent is not None:
        query=query.filter(Housing.rent>= min_rent)
    if min_rent is not None:
        query=query.filter(Housing.rent <= max_rent)
    if house_type:
        query=query.filter(Housing.house_type==house_type)    

    total = query.count()

    total_pages = ceil(total / limit) if total > 0 else 1

    houses = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": houses,
        "total": total,
        "total_pages": total_pages,
    }


def get_housing_by_id(
    housing_id: int,
    db: Session,
):
    house = (
        db.query(Housing)
        .filter(Housing.id == housing_id)
        .first()
    )

    if not house:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Housing listing not found",
        )

    return house


def create_housing(
    housing_data: HousingCreate,
    current_user: User,
    db: Session,
):
    new_house = Housing(
        owner_id=current_user.id,
        **housing_data.model_dump()
    )

    db.add(new_house)
    db.commit()
    db.refresh(new_house)

    return new_house


def update_housing(
    housing_id: int,
    housing_data: HousingUpdate,
    current_user: User,
    db: Session,
):
    house = (
        db.query(Housing)
        .filter(Housing.id == housing_id)
        .first()
    )

    if not house:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Housing listing not found",
        )

    if house.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own listings",
        )

    for key, value in housing_data.model_dump().items():
        setattr(house, key, value)

    db.commit()
    db.refresh(house)

    return house


def delete_housing(
    housing_id: int,
    current_user: User,
    db: Session,
):
    house = (
        db.query(Housing)
        .filter(Housing.id == housing_id)
        .first()
    )

    if not house:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Housing listing not found",
        )

    if house.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own listings",
        )

    db.delete(house)
    db.commit()

    return {
        "message": "Housing listing deleted successfully"
    }