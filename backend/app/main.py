from fastapi import FastAPI
from app.agents.router import router as agents_router
from app.expenses.router import router as expenses_router
from app.auth.router import router as auth_router
from app.reports.router import router as reports_router
from app.chat.router import router as chat_router
from app.tags.router import router as tags_router
from app.users.router import router as users_router
from fastapi.middleware.cors import CORSMiddleware

# Define tags metadata for Swagger UI organization
tags_metadata = [
    {
        "name": "Authentication",
        "description": "Operations related to user authentication and authorization",
    },
    {
        "name": "Users",
        "description": "Manage user profile data and preferences",
    },
    {
        "name": "Expenses",
        "description": "Manage user expenses including creation, retrieval, updating and deletion",
    },
    {
        "name": "Tags",
        "description": "Manage expense classification tags and categories",
    },
    {
        "name": "Reports",
        "description": "Generate and retrieve financial reports and analytics",
    },
    {
        "name": "Chat",
        "description": "Chat functionality for user interaction and support",
    },
    {
        "name": "Agents",
        "description": "AI-powered services",
    }
]

app = FastAPI(
    title="MoneyManager API",
    description="Backend API for the MoneyManager expense tracking application",
    version="1.0.0",
    openapi_tags=tags_metadata
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agents_router, prefix='/api/agents')
app.include_router(expenses_router, prefix='/api/expenses')
app.include_router(auth_router, prefix='/api/auth')
app.include_router(reports_router, prefix='/api/reports')
app.include_router(chat_router, prefix='/api/chat')
app.include_router(tags_router, prefix='/api/tags')
app.include_router(users_router, prefix='/api/users')

@app.get('/', tags=["Root"])
def root():
    return {'message': 'MoneyManager API'}
