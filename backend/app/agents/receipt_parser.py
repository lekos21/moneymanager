"""
Receipt OCR Parser

This module handles receipt image processing using GPT-4o vision to extract
expense items and integrate them with the multi-expense parser.
"""

import os
import base64
from typing import Dict, List, Any
from datetime import datetime, timezone
from fastapi import HTTPException, status
from google.cloud import firestore
from .multi_expense_parser import parse_multiple_expenses
from .usage_tracker import track_openai_api_call
import time
import requests

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
        
        # Initialize Firestore client
        db = firestore.Client()
        
        # Extract receipt items using GPT-4o vision
        extracted_text = await _extract_receipt_items(image_base64, api_key, user_id, db)
        
        # Check if no expenses were found
        if "NO_EXPENSES_FOUND" in extracted_text.upper():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No expenses found in the uploaded image. Please ensure this is a clear receipt photo."
            )
        
        # Process the extracted text through the multi-expense parser
        print("Processing extracted text through multi-expense parser...")
        multi_expense_result = await parse_multiple_expenses(extracted_text, user_id, db)
        
        # Check if any expenses were successfully parsed
        if not multi_expense_result.expenses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not parse any valid expenses from the receipt. Please ensure the image shows clear item names and prices."
            )
        
        # If save_to_db is true, save all expenses to Firestore (using same logic as multi-expense parser)
        if save_to_db and multi_expense_result.expenses:
            print(f"Saving {len(multi_expense_result.expenses)} expenses from receipt to Firestore")
            
            # Enhance expenses with database info (same as multi-expense parser endpoint)
            enhanced_expenses = []
            for expense in multi_expense_result.expenses:
                # Convert ExpenseData to dict for saving
                expense_dict = expense.dict()
                expense_dict.update({
                    "user_id": user_id,
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "raw_text": extracted_text,  # Use extracted text for context
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
        
        # Return parsed result without saving (convert ExpenseData objects to dicts)
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


async def _extract_receipt_items(image_base64: str, api_key: str, user_id: str = None, db: firestore.Client = None) -> str:
    """
    Extract receipt items using OpenAI GPT-4o vision API.
    
    Args:
        image_base64: Base64 encoded image
        api_key: OpenAI API key
        user_id: Optional user ID for usage tracking
        db: Firestore client for usage tracking
        
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
                        2. Add an expense called "Receipt Adjustments" to account for tax, tips, discounts, etc. to get to the total of the receipt (e.g. food 7$, drink 3$, taxes 2$, service 3$, discount 10%, subtotal 15$, Total 13.5$, "Receipt Adjustments" is 3.5 because it's the delta between 10$ of food and drink and 13.5$ of total). on this one write also between brackets (tag: "other")
                        3. Include the currency symbol if clearly visible, otherwise use $ as default
                        4. Be concise but descriptive for each item
                        5. If no expenses are found in the image, respond with exactly: "NO_EXPENSES_FOUND"
                        
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
    start_time = time.time()
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers=headers,
        json=payload,
        timeout=30
    )
    end_time = time.time()
    
    if response.status_code != 200:
        print(f"OpenAI API error: {response.status_code} - {response.text}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OpenAI Vision API error: {response.status_code}"
        )
    
    result = response.json()
    extracted_text = result['choices'][0]['message']['content'].strip()
    print(f"Extracted text from receipt: {extracted_text}")
    
    # Track usage if user_id and db are provided
    if user_id and db:
        try:
            track_openai_api_call(
                user_id=user_id,
                db_client=db,
                agent_name="receipt_parser_vision",
                model="gpt-4o",
                input_text="[Receipt Image Analysis]",
                output_text=extracted_text,
                request_duration=end_time - start_time,
                metadata={"function": "receipt_vision", "success": True}
            )
        except Exception as e:
            print(f"Warning: Failed to track usage: {e}")
    
    return extracted_text
