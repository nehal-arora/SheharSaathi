from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from config.settings import settings

# JWT configuration
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES


def create_access_token(data: dict) -> str:
    """
    Create a JWT access token.
    """
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    print("=" * 60)
    print("JWT CREATED")
    print("SECRET_KEY:", SECRET_KEY)
    print("PAYLOAD:", to_encode)
    print("=" * 60)

    return token


def verify_access_token(token: str):
    """
    Verify and decode a JWT token.
    """
    try:
        print("=" * 60)
        print("VERIFYING TOKEN")
        print("SECRET_KEY:", SECRET_KEY)
        print("TOKEN:", token)

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        print("DECODED PAYLOAD:", payload)
        print("=" * 60)

        return payload

    except JWTError as e:
        print("=" * 60)
        print("JWT ERROR")
        print(str(e))
        print("=" * 60)

        return None