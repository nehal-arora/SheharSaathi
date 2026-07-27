from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.init_db import init_db
from routers.auth import router as auth_router
from routers.users import router as users_router
from routers.housing import router as housing_router
from routers.roommates import router as roommates_router
from routers.favorite_roommates import router as favorite_roommates_router
from routers.expenses import router as expenses_router

app = FastAPI(
    title="SheharSaathi API",
    description="Backend API for SheharSaathi",
    version="1.0.0",
)

# Create database tables
init_db()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(housing_router)
app.include_router(roommates_router)
app.include_router(favorite_roommates_router)
app.include_router(expenses_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to SheharSaathi Backend"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }