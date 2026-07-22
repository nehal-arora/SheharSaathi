from database.base import Base
from database.session import engine

# Import all models here
from models.user import User


def init_db():
    Base.metadata.create_all(bind=engine)