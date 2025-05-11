from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud import firestore
from pydantic import BaseModel
from typing import Dict, Any, Optional
from app.auth.dependencies import get_current_user

router = APIRouter(tags=["Users"])

class UserUpdate(BaseModel):
    """Model for updating user data"""
    budget: Optional[float] = None
    preferred_currency: Optional[str] = None
    # Add more fields here as needed for future customizations
    # currency_preference: Optional[str] = None
    # theme: Optional[str] = None

@router.get('/me')
def get_user_data(current_user: dict = Depends(get_current_user)):
    """Get the current user's data from Firestore"""
    user_id = current_user["user_id"]
    db = firestore.Client()
    
    # Get user document from Firestore
    user_ref = db.collection('users').document(user_id)
    user_doc = user_ref.get()
    
    # If user document doesn't exist, return empty data
    if not user_doc.exists:
        return {
            "user_id": user_id,
            "email": current_user.get("email", ""),
            "name": current_user.get("name", ""),
            "budget": None
        }
    
    # Return user data
    user_data = user_doc.to_dict()
    
    # Add user ID to the response
    user_data["user_id"] = user_id
    
    # Ensure email and name are included
    if "email" not in user_data:
        user_data["email"] = current_user.get("email", "")
    if "name" not in user_data:
        user_data["name"] = current_user.get("name", "")
    
    return user_data

@router.patch('/me')
def update_user_data(update_data: UserUpdate, current_user: dict = Depends(get_current_user)):
    """Update the current user's data in Firestore"""
    user_id = current_user["user_id"]
    db = firestore.Client()
    
    # Get user document reference
    user_ref = db.collection('users').document(user_id)
    
    # Convert Pydantic model to dict, excluding None values
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid fields to update"
        )
    
    # Update or create user document
    user_ref.set(update_dict, merge=True)
    
    # Get updated user data
    updated_doc = user_ref.get()
    
    if not updated_doc.exists:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user data"
        )
    
    # Return updated user data
    user_data = updated_doc.to_dict()
    user_data["user_id"] = user_id
    
    return user_data
