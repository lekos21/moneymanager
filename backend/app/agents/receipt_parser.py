"""
Receipt OCR Parser

This module handles receipt image processing using GPT-4o vision to extract
expense items and integrate them with the multi-expense parser.
"""

import os
import base64
import requests
from typing import Dict, List, Any
from datetime import datetime, timezone
from fastapi import HTTPException, status
from google.cloud import firestore

from .multi_expense_parser import parse_multiple_expenses


async def parse_receipt_image(
    image_content: bytes,
    user_id: str,
    save_to_db: bool = False,
    filename: str = "receipt.jpg"
) -> Dict[str, Any]:
    """
    Parse receipt information from image content using GPT-4o vision.
    
    This function processes receipt images to extract a list of purchased items
    with their prices, then processes them through the multi-expense parser.
    
    Args:
        image_content: Raw image bytes
        user_id: User ID for expense ownership
        save_to_db: Whether to save extracted expenses to database
        filename: Original filename for reference
    
    Returns:
        Multi-expense parsing result with all extracted items
        
    Raises:
        HTTPException: If image processing fails or no expenses found
    """
    try:
        print(f"Processing receipt image: {filename}")
        
        # Convert image to base64 for OpenAI Vision API
        image_base64 = base64.b64encode(image_content).decode('utf-8')
        
        # Initialize OpenAI client
        api_key = os.environ.get("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="OpenAI API key not configured"
            )
        
        # Remove quotes if present
        if api_key.startswith('"') and api_key.endswith('"'):
            api_key = api_key[1:-1]
        
        # Extract receipt items using GPT-4o vision
        extracted_text = await _extract_receipt_items(image_base64, api_key)
        
        # Check if no expenses were found
        if "NO_EXPENSES_FOUND" in extracted_text.upper():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No expenses found in the uploaded image. Please ensure this is a clear receipt photo."
            )
        
        # Initialize Firestore client
        db = firestore.Client()
        
        # Process the extracted text through the multi-expense parser
        print("Processing extracted text through multi-expense parser...")
        multi_expense_result = await parse_multiple_expenses(extracted_text, user_id, db)
        
        # Check if any expenses were successfully parsed
        if not multi_expense_result.expenses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not parse any valid expenses from the receipt. Please ensure the image shows clear item names and prices."
            )
        
        # If save_to_db is true, save all expenses to Firestore
        if save_to_db and multi_expense_result.expenses:
            print(f"Saving {len(multi_expense_result.expenses)} expenses from receipt to Firestore")
            
            # Enhance expenses with database info
            enhanced_expenses = []
            for expense in multi_expense_result.expenses:
                # Convert ExpenseData to dict for saving
                expense_dict = expense.dict()
                expense_dict.update({
                    "user_id": user_id,
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "raw_text": f"Receipt: {expense.short_text}",  # Mark as receipt item
                    "receipt_source": True  # Flag to indicate this came from a receipt
                })
                
                # Save to Firestore
                doc_ref = db.collection('expenses').add(expense_dict)
                expense_id = doc_ref[1].id
                print(f"Receipt expense saved with ID: {expense_id}")
                
                # Add the database ID to the expense
                expense_dict["id"] = expense_id
                enhanced_expenses.append(expense_dict)
            
            # Return the enhanced result with full expense data
            return {
                "expenses": enhanced_expenses,
                "total_count": multi_expense_result.total_count,
                "processing_time": multi_expense_result.processing_time,
                "original_text": f"Receipt items: {extracted_text}",
                "error": multi_expense_result.error,
                "receipt_filename": filename
            }
        
        # Return parsed result without saving
        return {
            "expenses": [expense.dict() for expense in multi_expense_result.expenses],
            "total_count": multi_expense_result.total_count,
            "processing_time": multi_expense_result.processing_time,
            "original_text": f"Receipt items: {extracted_text}",
            "error": multi_expense_result.error,
            "receipt_filename": filename
        }
        
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        import traceback
        print(f"Error in parse_receipt_image: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing receipt: {str(e)}"
        )


async def _extract_receipt_items(image_base64: str, api_key: str) -> str:
    """
    Extract receipt items using OpenAI GPT-4o vision API.
    
    Args:
        image_base64: Base64 encoded image
        api_key: OpenAI API key
        
    Returns:
        Extracted text containing receipt items
        
    Raises:
        HTTPException: If API call fails
    """
    # Call OpenAI Vision API to extract receipt items
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": """
                        Analyze this receipt image and extract all purchased items with their prices.
                        
                        Format your response as a simple text list that can be parsed by an expense parser.
                        Each line should contain: item name and price (with currency symbol if visible).
                        
                        Rules:
                        1. Only include actual purchased items (not tax, tips, subtotals, discounts, etc.)
                        2. Include the currency symbol if clearly visible, otherwise use $ as default
                        3. Be concise but descriptive for each item
                        4. If no expenses are found in the image, respond with exactly: "NO_EXPENSES_FOUND"
                        
                        Example format:
                        Coffee $4.50
                        Sandwich $8.99
                        Chips $2.25
                        
                        If this is not a receipt or contains no expenses, respond with: NO_EXPENSES_FOUND
                        """
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_base64}"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 500,
        "temperature": 0.1
    }
    
    print("Calling OpenAI Vision API...")
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers=headers,
        json=payload,
        timeout=30
    )
    
    if response.status_code != 200:
        print(f"OpenAI API error: {response.status_code} - {response.text}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OpenAI Vision API error: {response.status_code}"
        )
    
    result = response.json()
    extracted_text = result['choices'][0]['message']['content'].strip()
    print(f"Extracted text from receipt: {extracted_text}")
    
    return extracted_text
