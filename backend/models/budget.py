from sqlalchemy import (
    Column,
    Integer,
    Float,
    DateTime,
    ForeignKey,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import relationship

from database.init_db import Base


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    month = Column(Integer, nullable=False)

    year = Column(Integer, nullable=False)

    budget_amount = Column(Float, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "month",
            "year",
            name="unique_budget_per_month",
        ),
    )

    user = relationship("User", back_populates="budgets")