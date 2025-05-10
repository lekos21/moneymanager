from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from google.cloud import firestore
from app.auth.dependencies import get_current_user

router = APIRouter(tags=["Reports"])

@router.get("/{period}")
def get_report(period: str, current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    db = firestore.Client()
    # Fetch aggregates by period for the authenticated user
    docs = db.collection('aggregates').where('periodKey', '==', period).where('user_id', '==', user_id).stream()
    data = [doc.to_dict() for doc in docs]
    return JSONResponse(content={"period": period, "data": data})
