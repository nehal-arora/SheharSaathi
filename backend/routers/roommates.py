from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from database.session import get_db
from models.user import User
from schemas.roommate import (
    RoommateCreate,
    RoommateUpdate,
    RoommateResponse,
    RoommateListResponse,
)
from services.roommate_service import (
    create_roommate_profile,
    get_my_profile,
    update_my_profile,
    delete_my_profile,
    get_roommate_list,
    get_roommate_by_id,
    get_recommendations,
)
from utils.dependencies import get_current_user

router = APIRouter(
    prefix="/roommates",
    tags=["Roommates"],
)


@router.post(
    "/profile",
    response_model=RoommateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_profile(
    roommate_data: RoommateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_roommate_profile(
        roommate_data,
        current_user,
        db,
    )


@router.get(
    "/me",
    response_model=RoommateResponse,
)
def my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_my_profile(
        current_user,
        db,
    )


@router.put(
    "/me",
    response_model=RoommateResponse,
)
def edit_profile(
    roommate_data: RoommateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_my_profile(
        roommate_data,
        current_user,
        db,
    )


@router.delete(
    "/me",
)
def remove_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return delete_my_profile(
        current_user,
        db,
    )


@router.get(
    "/",
    response_model=RoommateListResponse,
)
def get_roommates(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),

    city: str | None = Query(None),
    preferred_locality: str | None = Query(None),
    min_budget: float | None = Query(None),
    max_budget: float | None = Query(None),
    gender: str | None = Query(None),
    occupation: str | None = Query(None),
    sharing_type: str | None = Query(None),

    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_roommate_list(
        db=db,
        current_user=current_user,
        page=page,
        limit=limit,
        city=city,
        preferred_locality=preferred_locality,
        min_budget=min_budget,
        max_budget=max_budget,
        gender=gender,
        occupation=occupation,
        sharing_type=sharing_type,
    )

@router.get(
    "/recommendations",
    response_model=RoommateListResponse,
)
def roommate_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_recommendations(
        current_user=current_user,
        db=db,
    )

@router.get(
    "/{roommate_id}",
    response_model=RoommateResponse,
)
def get_roommate(
    roommate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_roommate_by_id(
        roommate_id,
        current_user,
        db,
    )