from fastapi import APIRouter, HTTPException, status, Depends, Form
from .firebase_admin import verify_firebase_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(tags=["Authentication"])

@router.get('/me')
async def get_current_user_info(token: str):
    """
    Verify a Firebase token and return user information.
    This endpoint is mainly for testing token validation.
    """
    try:
        decoded_token = verify_firebase_token(token)
        if not decoded_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        
        return {
            "user_id": decoded_token.get("uid"),
            "email": decoded_token.get("email"),
            "name": decoded_token.get("name", ""),
            "picture": decoded_token.get("picture", "")
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication error: {str(e)}"
        )

@router.post('/token')
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    OAuth2 compatible token login, get an access token for future requests.
    This endpoint is primarily for testing in the Swagger UI.
    
    For testing in Swagger UI:
    - Username: any value (not checked)
    - Password: any value (not checked)
    
    The token returned will be a test token that can be used to authenticate
    requests in the Swagger UI.
    """
    # For Swagger UI testing, we accept any username/password and return a test token
    # In a real app, you would validate credentials against a database
    
    # Return our mock token
    return {
        "access_token": "test-token-for-swagger-ui",
        "token_type": "bearer"
    }
