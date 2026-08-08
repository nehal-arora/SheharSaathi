from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.session import get_db
from schemas.auth import (
    SignupRequest,
    LoginRequest,
    GoogleLoginRequest,
    LoginResponse,
)
from schemas.user import UserResponse
from services.auth_service import (
    register_user,
    login_user,
    login_with_google,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/signup",
    response_model=UserResponse,
    status_code=201,
)
def signup(
    user_data: SignupRequest,
    db: Session = Depends(get_db),
):
    return register_user(user_data, db)


@router.post(
    "/login",
    response_model=LoginResponse,
)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    return login_user(login_data, db)

@router.post(
    "/google",
    response_model=LoginResponse,
)
def google_login(
    google_data: GoogleLoginRequest,
    db: Session = Depends(get_db),
):
    return login_with_google(
        google_data,
        db,
    )    