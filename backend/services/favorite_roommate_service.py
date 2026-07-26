from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from models.favorite_roommate import FavoriteRoommate
from models.roommate import Roommate
from models.user import User


def add_favorite(
    roommate_id: int,
    current_user: User,
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
            detail="Roommate profile not found",
        )

    existing = (
        db.query(FavoriteRoommate)
        .filter(
            FavoriteRoommate.user_id == current_user.id,
            FavoriteRoommate.roommate_id == roommate_id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Roommate already added to favorites",
        )

    favorite = FavoriteRoommate(
        user_id=current_user.id,
        roommate_id=roommate_id,
    )

    db.add(favorite)
    db.commit()

    return {
        "message": "Roommate added to favorites"
    }


def remove_favorite(
    roommate_id: int,
    current_user: User,
    db: Session,
):
    favorite = (
        db.query(FavoriteRoommate)
        .filter(
            FavoriteRoommate.user_id == current_user.id,
            FavoriteRoommate.roommate_id == roommate_id,
        )
        .first()
    )

    if not favorite:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Favorite not found",
        )

    db.delete(favorite)
    db.commit()

    return {
        "message": "Roommate removed from favorites"
    }


def get_favorites(
    current_user: User,
    db: Session,
):
    favorites = (
        db.query(Roommate)
        .join(
            FavoriteRoommate,
            FavoriteRoommate.roommate_id == Roommate.id,
        )
        .filter(
            FavoriteRoommate.user_id == current_user.id,
        )
        .all()
    )

    return favorites