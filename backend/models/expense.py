from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    Date,
    DateTime,
    ForeignKey,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from database.init_db import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    amount = Column(
        Float,
        nullable=False,
    )

    category = Column(
        String,
        nullable=False,
    )

    description = Column(
        String(250),
        default="",
    )

    date = Column(
        Date,
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

    user = relationship(
        "User",
        back_populates="expenses",
    )