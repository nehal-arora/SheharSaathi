from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    Numeric,
    JSON,
)
from sqlalchemy.sql import func

from database.base import Base


class Roommate(Base):
    __tablename__ = "roommates"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False,
    )

    name = Column(
        String(100),
        nullable=False,
    )

    age = Column(
        Integer,
        nullable=False,
    )

    gender = Column(
        String(20),
        nullable=False,
    )

    occupation = Column(
        String(100),
        nullable=False,
    )

    company_or_college = Column(
        String(150),
        nullable=False,
    )

    city = Column(
        String(100),
        nullable=False,
    )

    preferred_locality = Column(
        String(150),
        nullable=False,
    )

    budget = Column(
        Numeric(10, 2),
        nullable=False,
    )

    bio = Column(
        Text,
        nullable=True,
    )

    profile_image = Column(
        String,
        nullable=True,
    )

    food_preference = Column(
        String(50),
        nullable=False,
    )

    smoking = Column(
        Boolean,
        default=False,
    )

    drinking = Column(
        Boolean,
        default=False,
    )

    pets = Column(
        Boolean,
        default=False,
    )

    sleep_schedule = Column(
        String(50),
        nullable=False,
    )

    wake_up_time = Column(
        String(50),
        nullable=False,
    )

    cleanliness = Column(
        String(50),
        nullable=False,
    )

    guest_preference = Column(
        String(50),
        nullable=False,
    )

    work_schedule = Column(
        String(50),
        nullable=False,
    )

    languages = Column(
        JSON,
        default=list,
    )

    preferred_gender = Column(
        String(20),
        nullable=False,
    )

    sharing_type = Column(
        String(50),
        nullable=False,
    )

    move_in_date = Column(
        Date,
        nullable=False,
    )

    lease_duration = Column(
        Integer,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )