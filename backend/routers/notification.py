from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from database.init_db import Base

from models.user import User

from schemas.notification import (
    NotificationListResponse,
    MarkNotificationReadRequest,
    SuccessResponse,
)

from services.notification_service import (
    get_notifications,
    mark_notification_read,
    delete_notification,
)

from utils.dependencies import (
    get_current_user,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get(
    "",
    response_model=NotificationListResponse,
)
def notifications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_notifications(
        current_user,
        db,
    )


@router.post(
    "/read",
    response_model=SuccessResponse,
)
def read_notification(
    request: MarkNotificationReadRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return mark_notification_read(
        request.notification_id,
        current_user,
        db,
    )


@router.delete(
    "/{notification_id}",
    response_model=SuccessResponse,
)
def remove_notification(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return delete_notification(
        notification_id,
        current_user,
        db,
    )