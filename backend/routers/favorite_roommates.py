from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.session import get_db
from models.user import User
from schemas.roommate import RoommateResponse
from services.favorite_roommate_service import (
    add_favorite,
    remove_favorite,
    get_favorites,
)
from utils.dependencies import get_current_user

router = APIRouter(
    prefix="/roommates/favorites",
    tags=["Roommate Favorites"],
)


@router.post("/{roommate_id}")
def add_roommate_to_favorites(
    roommate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return add_favorite(
        roommate_id=roommate_id,
        current_user=current_user,
        db=db,
    )


@router.delete("/{roommate_id}")
def remove_roommate_from_favorites(
    roommate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return remove_favorite(
        roommate_id=roommate_id,
        current_user=current_user,
        db=db,
    )


@router.get(
    "/",
    response_model=List[RoommateResponse],
)
def get_my_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_favorites(
        current_user=current_user,
        db=db,
    )