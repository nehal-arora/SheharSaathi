from pydantic import BaseModel


class RouteResponse(BaseModel):
    metro: str
    bus: str
    estimatedTime: str


class NearbyTransportResponse(BaseModel):
    id: int
    name: str
    type: str
    distance: str