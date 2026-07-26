from database.base import Base
from database.session import engine

# Import all models here
from models.user import User
from models.housing import Housing
from models.roommate import Roommate
from models.favorite_roommate import FavoriteRoommate



def init_db():
    Base.metadata.create_all(bind=engine)