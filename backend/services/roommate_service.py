from math import ceil

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from models.roommate import Roommate
from models.favorite_roommate import FavoriteRoommate
from models.user import User
from schemas.roommate import (
    RoommateCreate,
    RoommateUpdate,
)


def create_roommate_profile(
    roommate_data: RoommateCreate,
    current_user: User,
    db: Session,
):
    existing_profile = (
        db.query(Roommate)
        .filter(Roommate.user_id == current_user.id)
        .first()
    )

    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Roommate profile already exists.",
        )

    new_profile = Roommate(
        user_id=current_user.id,
        **roommate_data.model_dump()
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


def get_my_profile(
    current_user: User,
    db: Session,
):
    profile = (
        db.query(Roommate)
        .filter(Roommate.user_id == current_user.id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roommate profile not found.",
        )

    return profile


def update_my_profile(
    roommate_data: RoommateUpdate,
    current_user: User,
    db: Session,
):
    profile = (
        db.query(Roommate)
        .filter(Roommate.user_id == current_user.id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roommate profile not found.",
        )

    for key, value in roommate_data.model_dump().items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)

    return profile


def delete_my_profile(
    current_user: User,
    db: Session,
):
    profile = (
        db.query(Roommate)
        .filter(Roommate.user_id == current_user.id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roommate profile not found.",
        )

    db.delete(profile)
    db.commit()

    return {
        "message": "Roommate profile deleted successfully."
    }


def get_roommate_list(
    db: Session,
    current_user: User,
    page: int = 1,
    limit: int = 10,
    city: str | None = None,
    preferred_locality: str | None = None,
    min_budget: float | None = None,
    max_budget: float | None = None,
    gender: str | None = None,
    occupation: str | None = None,
    sharing_type: str | None = None,
):
    query = (
        db.query(Roommate)
        .filter(Roommate.user_id != current_user.id)
    )

    if city:
        query = query.filter(Roommate.city == city)

    if preferred_locality:
        query = query.filter(
            Roommate.preferred_locality == preferred_locality
        )

    if min_budget is not None:
        query = query.filter(Roommate.budget >= min_budget)

    if max_budget is not None:
        query = query.filter(Roommate.budget <= max_budget)

    if gender:
        query = query.filter(Roommate.gender == gender)

    if occupation:
        query = query.filter(
            Roommate.occupation == occupation
        )

    if sharing_type:
        query = query.filter(
            Roommate.sharing_type == sharing_type
        )

    total = query.count()

    total_pages = ceil(total / limit) if total > 0 else 1

    roommates = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    favorite_ids = {
        favorite.roommate_id
        for favorite in (
            db.query(FavoriteRoommate)
            .filter(
                FavoriteRoommate.user_id == current_user.id
            )
            .all()
        )
    }
    for roommate in roommates:
        roommate.is_favorite = roommate.id in favorite_ids            

    return {
        "items": roommates,
        "total": total,
        "total_pages": total_pages,
    }


def get_roommate_by_id(
    roommate_id: int,
    current_user:User,
    db: Session,
):
    roommate = (
        db.query(Roommate)
        .filter(Roommate.id == roommate_id)
        .first()
    )

    if not roommate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roommate profile not found.",
        )
    favorite=(
        db.query(FavoriteRoommate)
        .filter(
            FavoriteRoommate.user_id == current_user.id,
             FavoriteRoommate.roommate_id == roommate.id,
        )
        .first()
    )
    roommate.is_favorite = favorite is not None
    return roommate

def get_recommendations(
    current_user: User,
    db: Session,
):
    my_profile = (
        db.query(Roommate)
        .filter(Roommate.user_id == current_user.id)
        .first()
    )

    if not my_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Create your roommate profile first.",
        )

    roommates = (
        db.query(Roommate)
        .filter(Roommate.user_id != current_user.id)
        .all()
    )

    recommendations = []

    for roommate in roommates:

        score = 0

        if roommate.city == my_profile.city:
            score += 20

        if roommate.preferred_locality == my_profile.preferred_locality:
            score += 15

        if abs(float(roommate.budget) - float(my_profile.budget)) <= 2000:
            score += 15

        if roommate.food_preference == my_profile.food_preference:
            score += 10

        if roommate.smoking == my_profile.smoking:
            score += 10

        if roommate.drinking == my_profile.drinking:
            score += 10

        if roommate.pets == my_profile.pets:
            score += 5

        if roommate.sleep_schedule == my_profile.sleep_schedule:
            score += 10

        if roommate.sharing_type == my_profile.sharing_type:
            score += 5

        roommate.compatibility = score
        favorite=(
            db.query(FavoriteRoommate)
            .filter(
                FavoriteRoommate.user_id == current_user.id,
                FavoriteRoommate.roommate_id == roommate.id,
            )
            .first()
        )
        roommate.is_favorite = favorite is not None

        recommendations.append(roommate)

    recommendations.sort(
        key=lambda x: x.compatibility,
        reverse=True,
    )

    return {
        "items": recommendations,
        "total": len(recommendations),
        "total_pages": 1,
    }    