# SheharSaathi Backend

Backend API for SheharSaathi – an AI-powered relocation platform that helps people moving to a new city with authentication, housing, budgeting, and local services.

---

## Tech Stack

- FastAPI
- Python
- PostgreSQL (Supabase)
- SQLAlchemy
- JWT Authentication
- Passlib (bcrypt)
- Pydantic

---

## Project Setup

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Go to backend folder

```bash
cd backend
```

### 3. Create virtual environment

```bash
python -m venv venv
```

### 4. Activate virtual environment

Windows:

```bash
venv\Scripts\activate
```

Mac/Linux:

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
DATABASE_URL=your_supabase_database_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## Run the Backend

```bash
uvicorn main:app --reload
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

## Authentication APIs

### POST /auth/signup

Creates a new user.

Request:

```json
{
  "name": "Rishika",
  "email": "rishika@example.com",
  "password": "StrongPass123"
}
```

---

### POST /auth/login

Logs in an existing user.

Request:

```json
{
  "email": "rishika@example.com",
  "password": "StrongPass123"
}
```

Returns:

- access_token
- token_type
- user details

---

### GET /users/me

Protected route.

Requires:

```
Authorization: Bearer <access_token>
```

Returns the currently logged-in user.

---

## Current Status

 Authentication Module Completed

Upcoming Modules:

- Housing
- Expense Tracker
- AI Chatbot
- Roommate Matching
- Local Services