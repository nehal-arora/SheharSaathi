from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.notification import Notification
from models.user import User


def get_notifications(
    current_user: User,
    db: Session,
):
    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == current_user.id
        )
        .order_by(
            Notification.created_at.desc()
        )
        .all()
    )

    unread_count = (
        db.query(Notification)
        .filter(
            Notification.user_id == current_user.id,
            Notification.is_read == False,
        )
        .count()
    )

    return {
        "notifications": notifications,
        "total": len(notifications),
        "unread_count": unread_count,
    }


def mark_notification_read(
    notification_id: int,
    current_user: User,
    db: Session,
):
    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == current_user.id,
        )
        .first()
    )

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    notification.is_read = True

    db.commit()
    db.refresh(notification)

    return {
        "success": True,
    }


def delete_notification(
    notification_id: int,
    current_user: User,
    db: Session,
):
    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == current_user.id,
        )
        .first()
    )

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    db.delete(notification)
    db.commit()

    return {
        "success": True,
        "message": "Notification deleted successfully.",
    }