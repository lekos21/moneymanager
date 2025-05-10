from fastapi import APIRouter, Depends, HTTPException, status
from google.cloud import firestore
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from app.auth.dependencies import get_current_user

router = APIRouter(tags=["Tags"])

class TagBase(BaseModel):
    """Base model for tag data without required created_at field"""
    tag_id: str
    name: str
    facet: str
    synonyms: List[str] = []
    icon: str = "Tag"  # Default to "Tag" icon if not specified
    embedding: Optional[List[float]] = None
    active: bool = True

class Tag(TagBase):
    """Complete tag model with created_at field"""
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

class TagCreate(TagBase):
    """Model for creating a new tag without requiring created_at field"""
    pass

@router.get('/')
def list_tags(current_user: dict = Depends(get_current_user)):
    """List all active tags"""
    db = firestore.Client()
    docs = db.collection('tags').where('active', '==', True).stream()
    return [doc.to_dict() for doc in docs]

@router.get('/{tag_id}')
def get_tag(tag_id: str, current_user: dict = Depends(get_current_user)):
    """Get a specific tag by ID"""
    db = firestore.Client()
    doc_ref = db.collection('tags').document(tag_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Tag not found')
    
    return doc.to_dict()

@router.get('/{facet}/{tag_id}')
def get_tag_by_facet(facet: str, tag_id: str, current_user: dict = Depends(get_current_user)):
    """Get a specific tag by facet and ID"""
    if facet not in ['area', 'context']:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Facet must be either "area" or "context"')
    
    db = firestore.Client()
    # Query tags collection with filters for both facet and tag_id
    query = db.collection('tags').where('facet', '==', facet).where('tag_id', '==', tag_id)
    docs = list(query.stream())
    
    if not docs:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Tag not found with facet {facet} and id {tag_id}')
    
    return docs[0].to_dict()

@router.post('/')
def create_tag(tag: TagCreate, current_user: dict = Depends(get_current_user)):
    """Create a new tag"""
    db = firestore.Client()
    
    # Check if tag_id already exists
    existing_doc = db.collection('tags').document(tag.tag_id).get()
    if existing_doc.exists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Tag with ID '{tag.tag_id}' already exists"
        )
    
    # Convert to dict and add created_at with current timestamp
    data = tag.dict()
    data['created_at'] = datetime.utcnow().isoformat() + "Z"
    
    doc_ref = db.collection('tags').document(tag.tag_id)
    doc_ref.set(data)
    
    return {'tag_id': tag.tag_id, 'status': 'created'}

@router.patch('/{tag_id}')
def update_tag(tag_id: str, tag_update: dict, current_user: dict = Depends(get_current_user)):
    """Update an existing tag"""
    db = firestore.Client()
    doc_ref = db.collection('tags').document(tag_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Tag not found')
    
    # Don't allow updating tag_id
    if 'tag_id' in tag_update:
        del tag_update['tag_id']
    
    # Don't allow updating created_at
    if 'created_at' in tag_update:
        del tag_update['created_at']
    
    doc_ref.update(tag_update)
    
    # Get the updated document
    updated_doc = doc_ref.get()
    return updated_doc.to_dict()

@router.delete('/{tag_id}')
def delete_tag(tag_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a tag (mark as inactive)"""
    db = firestore.Client()
    doc_ref = db.collection('tags').document(tag_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Tag not found')
    
    # Soft delete - mark as inactive
    doc_ref.update({'active': False})
    
    return {'tag_id': tag_id, 'status': 'deleted'}

@router.delete('/{tag_id}/permanent')
def permanent_delete_tag(tag_id: str, current_user: dict = Depends(get_current_user)):
    """Permanently delete a tag from the database"""
    db = firestore.Client()
    doc_ref = db.collection('tags').document(tag_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Tag not found')
    
    # Hard delete
    doc_ref.delete()
    
    return {'tag_id': tag_id, 'status': 'permanently deleted'}
