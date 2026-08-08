from sqlalchemy.orm import Session
from fastapi import HTTPException, status
import secrets

from google.oauth2 import id_token
from google.auth.transport import requests
from models.user import User
from schemas.auth import SignupRequest, LoginRequest, GoogleLoginRequest
from config.settings import settings
from utils.security import hash_password, verify_password
from utils.jwt import create_access_token


def register_user(user_data: SignupRequest, db: Session):
    # Check if email already exists
    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(login_data: LoginRequest, db: Session):
    user = db.query(User).filter(
        User.email == login_data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(
        login_data.password,
        user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": str(user.id)
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }

def login_with_google(
    google_data: GoogleLoginRequest,
    db: Session,
):
    try:
        google_user = id_token.verify_oauth2_token(
            google_data.credential,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID,
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google credential",
        )

    email = google_user.get("email")
    name = google_user.get("name")

    if not email or not name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google account information is incomplete",
        )

    # Make sure Google has verified the email.
    if not google_user.get("email_verified"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google email is not verified",
        )

    user = db.query(User).filter(
        User.email == email
    ).first()

    # Existing account
    if user:
        token = create_access_token(
            {
                "sub": str(user.id)
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user,
        }

    # New Google account
    random_password = secrets.token_urlsafe(32)

    new_user = User(
        name=name,
        email=email,
        hashed_password=hash_password(random_password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(
        {
            "sub": str(new_user.id)
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": new_user,
    }    