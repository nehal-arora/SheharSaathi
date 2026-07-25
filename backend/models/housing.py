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


class Housing(Base):
    __tablename__ = "housing"

    id = Column(Integer, primary_key=True, index=True)

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    title = Column(String(150), nullable=False)

    description = Column(Text, nullable=False)

    rent = Column(Numeric(10, 2), nullable=False)

    deposit = Column(Numeric(10, 2), nullable=False)

    city = Column(String(100), nullable=False)

    locality = Column(String(150), nullable=False)

    address = Column(Text, nullable=False)

    house_type = Column(String(50), nullable=False)

    sharing_type = Column(String(50), nullable=False)

    gender_preference = Column(String(30), nullable=False)

    is_furnished = Column(Boolean, default=False)

    available_from = Column(Date, nullable=False)

    available = Column(Boolean, default=True)

    verified = Column(Boolean, default=False)

    contact_number = Column(String(20), nullable=False)

    images = Column(JSON, default=list)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )