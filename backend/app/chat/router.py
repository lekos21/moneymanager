from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional, Literal
from datetime import datetime
from pydantic import BaseModel
from firebase_admin import firestore
from app.auth.dependencies import get_current_user

router = APIRouter(tags=["Chat"])
db = firestore.client()

# Pydantic models for request and response
class MessageCreate(BaseModel):
    content: str
    message_type: Literal["user", "system"] = "user"
    expense_data: Optional[dict] = None  # Store expense data for system messages
    expense_ids: Optional[List[str]] = None  # Store expense IDs for reliable lookup
    
class Message(BaseModel):
    id: str
    content: str
    user_id: str
    timestamp: datetime
    message_type: Literal["user", "system"]
    expense_data: Optional[dict] = None  # Include expense data in response
    expense_ids: Optional[List[str]] = None  # Include expense IDs in response
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

@router.post("/messages", response_model=Message, status_code=status.HTTP_201_CREATED)
async def create_message(
    message: MessageCreate, 
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new chat message for the authenticated user
    """
    user_id = current_user["user_id"]
    
    # Create a new message document
    message_data = {
        "content": message.content,
        "user_id": user_id,
        "timestamp": firestore.SERVER_TIMESTAMP,
        "message_type": message.message_type,
        "expense_data": message.expense_data,
        "expense_ids": message.expense_ids
    }
    
    # Add the message to Firestore
    message_ref = db.collection("messages").document()
    message_ref.set(message_data)
    
    # Get the created message (to return the server timestamp)
    created_message = message_ref.get()
    message_dict = created_message.to_dict()
    
    # Return the created message with its ID
    return Message(
        id=message_ref.id,
        content=message_dict["content"],
        user_id=message_dict["user_id"],
        timestamp=message_dict.get("timestamp", datetime.now()),  # Fallback to current time if server timestamp not available
        message_type=message_dict["message_type"],
        expense_data=message_dict.get("expense_data"),
        expense_ids=message_dict.get("expense_ids")
    )

@router.get("/messages", response_model=List[Message])
async def get_messages(
    limit: int = Query(30, ge=1, le=30),  # Fixed at max 30 messages
    current_user: dict = Depends(get_current_user)
):
    """
    Get the latest chat messages for the authenticated user
    
    - limit: Maximum number of messages to return (default and max: 30)
    """
    user_id = current_user["user_id"]
    
    try:
        # Simple query for the most recent messages
        query = db.collection("messages") \
                 .where("user_id", "==", user_id) \
                 .order_by("timestamp", direction=firestore.Query.DESCENDING) \
                 .limit(limit)
        
        messages = []
        for doc in query.stream():
            try:
                message_data = doc.to_dict()
                
                # Handle timestamp - ensure it's a datetime
                timestamp = message_data.get("timestamp")
                if not isinstance(timestamp, datetime):
                    # Convert Firestore timestamp to datetime if needed
                    if hasattr(timestamp, "seconds"):
                        timestamp = datetime.fromtimestamp(timestamp.seconds)
                    else:
                        timestamp = datetime.now()
                
                messages.append(
                    Message(
                        id=doc.id,
                        content=message_data["content"],
                        user_id=message_data["user_id"],
                        timestamp=timestamp,
                        message_type=message_data.get("message_type", "user"),
                        expense_data=message_data.get("expense_data"),
                        expense_ids=message_data.get("expense_ids")
                    )
                )
            except Exception as e:
                print(f"Error processing message document {doc.id}: {e}")
                continue
        
        # Return messages in chronological order (oldest to newest)
        return sorted(messages, key=lambda x: x.timestamp)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving messages: {str(e)}"
        )

@router.delete("/messages/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_message(
    message_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Delete a specific chat message
    """
    user_id = current_user["user_id"]
    
    # Get the message
    message_ref = db.collection("messages").document(message_id)
    message = message_ref.get()
    
    # Check if message exists
    if not message.exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )
    
    # Check if the message belongs to the current user
    message_data = message.to_dict()
    if message_data["user_id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this message"
        )
    
    # Delete the message
    message_ref.delete()
    
    return None

@router.delete("/messages", status_code=status.HTTP_204_NO_CONTENT)
async def delete_all_messages(
    current_user: dict = Depends(get_current_user)
):
    """
    Delete all chat messages for the authenticated user
    """
    user_id = current_user["user_id"]
    
    # Query all messages for the current user
    messages_ref = db.collection("messages").where("user_id", "==", user_id)
    
    # Delete messages in batches (Firestore has a limit of 500 operations per batch)
    batch_size = 450  # Leave some room for other potential operations
    
    while True:
        batch = db.batch()
        docs = messages_ref.limit(batch_size).stream()
        
        count = 0
        for doc in docs:
            batch.delete(doc.reference)
            count += 1
        
        if count == 0:
            break
        
        batch.commit()
    
    return None
