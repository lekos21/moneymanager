from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud import firestore
from pydantic import BaseModel
from typing import List, Optional, Dict
from app.auth.dependencies import get_current_user

router = APIRouter(tags=["Expenses"])

class Expense(BaseModel):
    user_id: str
    timestamp: str
    amount: float
    currency: str
    raw_text: str
    area_tags: List[str] = []  # Tags that categorize the expense area
    context_tags: List[str] = []  # Tags that provide additional context
    short_text: str = ""  # A short description of what was purchased
    main_tag_icon: Optional[str] = None # Font Awesome icon for the primary area tag

def _enrich_expense_with_icon(expense_data: Dict, db_client: firestore.Client) -> Dict:
    """Fetches and adds the main_tag_icon to expense_data based on the first area_tag."""
    expense_data['main_tag_icon'] = "tag"  # Default icon
    if expense_data.get("area_tags") and len(expense_data["area_tags"]) > 0:
        first_area_tag_id = expense_data["area_tags"][0].lower()
        try:
            tag_ref = db_client.collection('tags').document(first_area_tag_id)
            tag_doc = tag_ref.get()
            if tag_doc.exists:
                tag_data_db = tag_doc.to_dict()
                if tag_data_db and 'icon' in tag_data_db:
                    expense_data['main_tag_icon'] = tag_data_db['icon']
            # else: tag not found, default 'tag' icon remains
        except Exception as e:
            print(f"Error fetching tag '{first_area_tag_id}' for icon: {str(e)}")
            # In case of error, default 'tag' icon remains
    return expense_data

@router.get('/')
def list_expenses(current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    db = firestore.Client()
    docs_stream = db.collection('expenses').where('user_id', '==', user_id).stream()
    expenses = []
    for doc in docs_stream:
        expense_data = doc.to_dict()
        expense_data['id'] = doc.id # Ensure ID is included
        enriched_expense = _enrich_expense_with_icon(expense_data, db)
        expenses.append(enriched_expense)
    return expenses

@router.get('/{expense_id}')
def get_expense(expense_id: str, current_user: dict = Depends(get_current_user)):
    db = firestore.Client()
    doc_ref = db.collection('expenses').document(expense_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Expense not found')
    
    expense_data = doc.to_dict()
    expense_data['id'] = doc.id # Ensure ID is included
    if expense_data.get('user_id') != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot access expenses of other users"
        )
    
    enriched_expense_data = _enrich_expense_with_icon(expense_data, db)
    return enriched_expense_data

@router.post('/')
def create_expense(expense: Expense, current_user: dict = Depends(get_current_user)):
    if expense.user_id != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot create expenses for other users"
        )
    
    db = firestore.Client()
    data = expense.dict()
    # Enrich with icon before saving
    enriched_data = _enrich_expense_with_icon(data, db)
    
    doc_ref = db.collection('expenses').add(enriched_data)
    return {'id': doc_ref[1].id, **enriched_data}

@router.patch('/{expense_id}')
def update_expense(expense_id: str, expense_update: dict, current_user: dict = Depends(get_current_user)):
    db = firestore.Client()
    doc_ref = db.collection('expenses').document(expense_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Expense not found')
    
    # Verify the user owns this expense
    expense_data = doc.to_dict()
    if expense_data.get('user_id') != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot update expenses of other users"
        )
    
    # Don't allow updating user_id
    if 'user_id' in expense_update and expense_update['user_id'] != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot change expense ownership"
        )
    
    doc_ref.update(expense_update)
    
    # Get the updated document
    updated_doc = doc_ref.get()
    return updated_doc.to_dict()

@router.delete('/{expense_id}')
def delete_expense(expense_id: str, current_user: dict = Depends(get_current_user)):
    db = firestore.Client()
    doc_ref = db.collection('expenses').document(expense_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Expense not found')
    
    # Verify the user owns this expense
    expense_data = doc.to_dict()
    if expense_data.get('user_id') != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot delete expenses of other users"
        )
    
    doc_ref.delete()
    return {'status': 'deleted'}

@router.get('/by-tag/{tag_id}')
def get_expenses_by_tag(tag_id: str, current_user: dict = Depends(get_current_user)):
    """Get all expenses associated with a specific tag"""
    user_id = current_user["user_id"]
    db = firestore.Client()
    
    # Query expenses that have this tag in their tags array
    # Firestore array-contains query
    docs = db.collection('expenses').where('user_id', '==', user_id).where('tags', 'array_contains', tag_id).stream()
    
    return [doc.to_dict() for doc in docs]
