from typing import List
from fastapi import Query
from fastapi import APIRouter, Depends
from models.user import User

from schemas.transport import (
    RouteResponse,
    NearbyTransportResponse,
)

from services.transport_service import (
    get_transport_route,
    get_nearby_transport,
)

from utils.dependencies import get_current_user


router = APIRouter(
    prefix="/transport",
    tags=["Transport"],
)


@router.get(
    "/routes",
    response_model=RouteResponse,
)
def transport_routes(
    city: str= Query(...),
    from_: str= Query(..., alias="from"),
    to: str= Query(...),
    current_user: User = Depends(get_current_user),
):
    return get_transport_route(
        city,
        from_,
        to,
    )


@router.get(
    "/nearby",
    response_model=List[NearbyTransportResponse],
)
def nearby_transport(
    city: str,
    locality: str,
    current_user: User = Depends(get_current_user),
):
    return get_nearby_transport(
        city,
        locality,
    )