from typing import List

from schemas.transport import (
    RouteResponse,
    NearbyTransportResponse,
)


def get_transport_route(
    city: str,
    from_location: str,
    to_location: str,
) -> RouteResponse:
    """
    Placeholder implementation.
    Later this will use Google Maps / Metro APIs.
    """

    return RouteResponse(
        metro="Yellow Line → Blue Line",
        bus="Bus 764",
        estimatedTime="52 mins",
    )


def get_nearby_transport(
    city: str,
    locality: str,
) -> List[NearbyTransportResponse]:
    """
    Placeholder implementation.
    """

    return [
        NearbyTransportResponse(
            id=1,
            name="GTB Nagar Metro",
            type="Metro",
            distance="700 m",
        ),
        NearbyTransportResponse(
            id=2,
            name="Kingsway Camp Bus Stop",
            type="Bus Stop",
            distance="250 m",
        ),
    ]