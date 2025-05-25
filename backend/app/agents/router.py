from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Dict, List, Optional
from datetime import datetime, timezone
from app.auth.dependencies import get_current_user
from .expense_parser import parse_expense as ai_parse_expense, ExpenseData
from .multi_expense_parser import parse_multiple_expenses, detect_expense_count, MultiExpenseResult
from .tag_generator import generate_tag as ai_generate_tag
from google.cloud import firestore
import requests
import os

router = APIRouter(tags=["Agents"])

class ExpenseQuery(BaseModel):
    """Request model for expense parsing"""
    text: str
    save_to_db: bool = False

class TagGenerationQuery(BaseModel):
    """Request model for bulk tag generation"""
    area: List[str] = []
    context: List[str] = []

class MultiExpenseQuery(BaseModel):
    """Request model for multi-expense parsing"""
    text: str
    save_to_db: bool = False

@router.post('/expense_parser/')
def parse_expense(query: ExpenseQuery, current_user: dict = Depends(get_current_user)):
    """
    Parse expense information from text using AI.
    
    This endpoint uses a language model to extract structured expense data
    from natural language text descriptions.
    
    If save_to_db is set to true, the parsed expense will be saved directly to Firestore.
    
    Example:
        Request: {"text": "I spent 25 euros on lunch yesterday", "save_to_db": true}
        Response: {
            "user_id": "user123",
            "amount": 25.0,
            "currency": "EUR",
            "timestamp": "2025-05-04T12:00:00Z",
            "raw_text": "I spent 25 euros on lunch yesterday",
            "area_tags": ["food", "restaurant"],
            "context_tags": [],
            "id": "expense_id"  # Only included if save_to_db is true
        }
    """
    try:
        print(f"Expense parser endpoint called with: {query.dict()}")
        
        # Get the user ID from the authenticated user
        user_id = current_user["user_id"]
        print(f"User ID: {user_id}")
        
        # Initialize Firestore client before calling the parser
        db = firestore.Client()

        # Parse the expense information using our AI parser, passing the db client
        print(f"Calling AI parser with text: '{query.text}'")
        result = ai_parse_expense(query.text, user_id, db_client=db)
        print(f"AI parser result: {result}")
        
        # If save_to_db is true, save the expense to Firestore
        if query.save_to_db:
            print(f"Saving expense to Firestore (save_to_db={query.save_to_db})")
            # db client is already initialized
            doc_ref = db.collection('expenses').add(result)
            expense_id = doc_ref[1].id
            print(f"Expense saved with ID: {expense_id}")
            
            # Add the ID to the response
            result["id"] = expense_id
        else:
            print("Not saving to database (save_to_db=False)")
        
        print(f"Returning result: {result}")
        return result
    except Exception as e:
        import traceback
        print(f"Error in parse_expense: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error parsing expense: {str(e)}"
        )

@router.post('/tag_generator/')
def generate_tag(query: TagGenerationQuery, current_user: dict = Depends(get_current_user)):
    """
    Generate tag information using AI and save it to the database.
    
    This endpoint uses a language model to generate tag information including
    a properly formatted name and relevant synonyms (3-6 terms).
    
    The generated tag is automatically saved to the tags collection.
    
    Example:
        Request: {"tag_id": "restaurant", "facet": "area"}
        Response: {
            "tag_id": "restaurant",
            "name": "Restaurant",
            "facet": "area",
            "synonyms": ["dining", "eatery", "bistro", "café", "diner"],
            "embedding": [],
            "created_at": "2025-05-06T18:47:43Z",
            "active": true
        }
    """
    try:
        # Generate the tag information using our AI generator
        tag_data = ai_generate_tag(query.area, query.context)
        
        # Save the tag to the database using the tags endpoint
        db = firestore.Client()
        
        # Check if tag already exists
        existing_tag = db.collection('tags').document(query.area).get()
        if existing_tag.exists:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Tag with ID '{query.area}' already exists"
            )
        
        # Save the tag to Firestore
        doc_ref = db.collection('tags').document(query.area)
        doc_ref.set(tag_data)
        
        return tag_data
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating tag: {str(e)}"
        )

@router.post('/bulk_tag_generator/')
def bulk_generate_tags(query: TagGenerationQuery, current_user: dict = Depends(get_current_user)):
    """
    Generate multiple tags in bulk and save them to the database.
    
    This endpoint takes lists of tag IDs for both area and context facets,
    generates tag information for each one, and saves them to the database.
    
    Example:
        Request: {
            "area": ["food", "groceries", "restaurant"],
            "context": ["gift", "personal"]
        }
        Response: {
            "generated_tags": {
                "area": ["food", "groceries", "restaurant"],
                "context": ["gift", "personal"]
            },
            "skipped_tags": [],
            "failed_tags": []
        }
    """
    generated_tags = {"area": [], "context": []}
    skipped_tags = []
    failed_tags = []
    db = firestore.Client()
    
    # Process area tags
    for tag_id in query.area:
        try:
            # Check if tag already exists
            existing_tag = db.collection('tags').document(tag_id).get()
            if existing_tag.exists:
                skipped_tags.append({"tag_id": tag_id, "facet": "area", "reason": "already exists"})
                continue
                
            # Generate tag data
            tag_data = ai_generate_tag(tag_id, "area")
            
            # Save to Firestore
            doc_ref = db.collection('tags').document(tag_id)
            doc_ref.set(tag_data)
            
            generated_tags["area"].append(tag_id)
        except Exception as e:
            failed_tags.append({"tag_id": tag_id, "facet": "area", "error": str(e)})
    
    # Process context tags
    for tag_id in query.context:
        try:
            # Check if tag already exists
            existing_tag = db.collection('tags').document(tag_id).get()
            if existing_tag.exists:
                skipped_tags.append({"tag_id": tag_id, "facet": "context", "reason": "already exists"})
                continue
                
            # Generate tag data
            tag_data = ai_generate_tag(tag_id, "context")
            
            # Save to Firestore
            doc_ref = db.collection('tags').document(tag_id)
            doc_ref.set(tag_data)
            
            generated_tags["context"].append(tag_id)
        except Exception as e:
            failed_tags.append({"tag_id": tag_id, "facet": "context", "error": str(e)})
    
    return {
        "generated_tags": generated_tags,
        "skipped_tags": skipped_tags,
        "failed_tags": failed_tags
    }

@router.post('/multi_expense_parser/')
async def parse_multi_expense(query: MultiExpenseQuery, current_user: dict = Depends(get_current_user)):
    """
    Parse multiple expenses from text using AI with parallel processing.
    
    This endpoint intelligently detects whether the input contains single or multiple
    expenses and processes them accordingly. For multiple expenses, it uses parallel
    processing for optimal performance.
    
    Example:
        Request: {"text": "I spent €15 for lunch and $20 for taxi", "save_to_db": true}
        Response: {
            "expenses": [
                {
                    "amount": 15.0,
                    "currency": "EUR",
                    "short_text": "lunch",
                    "area_tags": ["food"],
                    "context_tags": [],
                },
                {
                    "amount": 20.0,
                    "currency": "USD",
                    "short_text": "taxi",
                    "area_tags": ["transport"],
                    "context_tags": [],
                }
            ],
            "total_count": 2,
            "processing_time": 1.2,
            "original_text": "I spent €15 for lunch and $20 for taxi",
            "error": ""
        }
    """
    try:
        print(f"Multi-expense parser endpoint called with: {query.dict()}")
        
        # Get the user ID from the authenticated user
        user_id = current_user["user_id"]
        print(f"User ID: {user_id}")
        
        # Initialize Firestore client
        db = firestore.Client()
        
        # Detect expense count first
        expense_type = detect_expense_count(query.text)
        print(f"Detected expense type: {expense_type}")
        
        # Parse multiple expenses (now async)
        result = await parse_multiple_expenses(query.text, user_id, db)
        
        # If save_to_db is true, save all expenses to Firestore
        if query.save_to_db and result.expenses:
            print(f"Saving {len(result.expenses)} expenses to Firestore")
            
            # Enhance expenses with database info (similar to single expense parser)
            enhanced_expenses = []
            for expense in result.expenses:
                # Convert ExpenseData back to dict for saving
                expense_dict = expense.dict()
                expense_dict.update({
                    "user_id": user_id,
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "raw_text": query.text  # Keep original text for context
                })
                
                # Save to Firestore
                doc_ref = db.collection('expenses').add(expense_dict)
                expense_id = doc_ref[1].id  # Get the document ID
                print(f"Expense saved with ID: {expense_id}")
                
                # Add the database ID to the expense
                expense_dict["id"] = expense_id
                enhanced_expenses.append(expense_dict)
            
            # Return the enhanced result with full expense data (like single expense parser)
            return {
                "expenses": enhanced_expenses,
                "total_count": result.total_count,
                "processing_time": result.processing_time,
                "original_text": result.original_text,
                "error": result.error
            }
        
        print(f"Returning multi-expense result: {result}")
        return result
        
    except Exception as e:
        import traceback
        print(f"Error in parse_multi_expense: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error parsing multiple expenses: {str(e)}"
        )
