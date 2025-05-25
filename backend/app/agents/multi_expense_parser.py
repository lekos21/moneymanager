import os
import time
import asyncio
from datetime import datetime, timezone
from typing import List, Dict, Any
from concurrent.futures import ThreadPoolExecutor, as_completed
from pydantic import BaseModel, Field
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from google.cloud import firestore
from .usage_tracker import track_openai_api_call
from .expense_parser import parse_expense, ExpenseData

# Load environment variables
load_dotenv()

class MultiExpenseResult(BaseModel):
    """Result structure for multi-expense parsing"""
    expenses: List[ExpenseData] = Field(description="List of parsed expense objects")
    total_count: int = Field(description="Total number of expenses parsed")
    processing_time: float = Field(description="Time taken to process in seconds")
    original_text: str = Field(description="Original input text")
    error: str = Field(default="", description="Error message if any")

class ExpenseListData(BaseModel):
    """Data structure for splitting multi-expense text into individual expense strings"""
    individual_expenses: List[str] = Field(description="List of individual expense descriptions extracted from the text")

async def split_multi_expense_text(text: str, user_id: str, db_client: firestore.Client) -> List[str]:
    """
    Use GPT-4o-nano to intelligently split multi-expense text into individual expense strings
    """
    # Get API key from environment variable
    api_key = os.environ.get("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not found")
    
    # Remove quotes if they're present in the API key
    if api_key.startswith('"') and api_key.endswith('"'):
        api_key = api_key[1:-1]
    
    model = ChatOpenAI(
        model="gpt-4.1-nano",
        temperature=0.1,  # Very low temperature for consistent splitting
        openai_api_key=api_key,
    )
    
    # Set up the Pydantic output parser for expense list
    parser = PydanticOutputParser(pydantic_object=ExpenseListData)
    
    # Create a prompt template for splitting expenses
    prompt = PromptTemplate(
        template="""
        You are an AI assistant that splits multi-expense text into individual expense descriptions.
        
        Your task is to take a text that contains multiple expenses and split it into separate, 
        complete expense descriptions that can each be parsed individually.
        
        Rules:
        1. Each individual expense must contain an amount and description
        2. Preserve the original currency and amount for each expense
        3. Include enough context so each expense can be understood independently
        4. If an expense lacks an amount, try to infer if it should be grouped with another expense
        5. Maintain the original language and style of the user
        
        Examples:
        Input: "$10 for coffee, $15 for lunch, $20 for dinner"
        Output: ["$10 for coffee", "$15 for lunch", "$20 for dinner"]
        
        Input: "Morning coffee was $4.50, then lunch at $18.75"
        Output: ["Morning coffee was $4.50", "lunch at $18.75"]
        
        {format_instructions}
        
        Multi-expense text: {query}
        """,
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    
    # Create the chain
    chain = prompt | model | parser
    
    try:
        start_time = time.time()
        result = await chain.ainvoke({"query": text})
        end_time = time.time()
        
        # Track the API call
        try:
            output_text = str(result.individual_expenses) if hasattr(result, 'individual_expenses') else str(result)
            track_openai_api_call(
                user_id=user_id,
                db_client=db_client,
                agent_name="multi_expense_parser_splitter",
                model="gpt-4.1-nano", 
                input_text=text,
                output_text=output_text,
                request_duration=end_time - start_time,
                metadata={"function": "split_multi_expense_text", "success": True}
            )
        except Exception as e:
            print(f"Warning: Failed to track usage: {e}")
        
        return result.individual_expenses
    except Exception as e:
        print(f"Error splitting multi-expense text: {e}")
        # Fallback: simple comma/and splitting
        parts = text.replace(' and ', ', ').split(',')
        return [part.strip() for part in parts if part.strip()]

async def parse_multiple_expenses(text: str, user_id: str, db_client: firestore.Client) -> MultiExpenseResult:
    """
    Parse multiple expenses from text using parallel processing
    """
    start_time = time.time()
    
    try:
        print(f"Starting multi-expense parsing for: '{text}'")
        
        # Step 1: Split the text into individual expense descriptions (async)
        expense_texts = await split_multi_expense_text(text, user_id, db_client)
        
        print(f"Split into {len(expense_texts)} parts: {expense_texts}")
        
        if len(expense_texts) == 1:
            # Single expense detected, use regular parser
            result_dict = parse_expense(expense_texts[0], user_id, db_client)
            if result_dict:
                # Convert dict to ExpenseData object
                expense_data = ExpenseData(**result_dict)
                return MultiExpenseResult(
                    expenses=[expense_data],
                    total_count=1,
                    processing_time=time.time() - start_time,
                    original_text=text,
                    error=""
                )
            else:
                return MultiExpenseResult(
                    expenses=[],
                    total_count=0,
                    processing_time=time.time() - start_time,
                    original_text=text,
                    error="Failed to parse single expense"
                )
        
        # Step 2: Process all expenses in parallel using ThreadPoolExecutor
        expenses = []
        errors = []
        
        with ThreadPoolExecutor(max_workers=5) as executor:
            # Submit all parsing tasks
            future_to_text = {
                executor.submit(parse_expense, expense_text, user_id, db_client): expense_text
                for expense_text in expense_texts
            }
            
            # Collect results as they complete (with timeout)
            for future in as_completed(future_to_text, timeout=30):
                expense_text = future_to_text[future]
                try:
                    result_dict = future.result()
                    if result_dict and result_dict.get('amount', 0) > 0:  # Only add successful parses with valid amounts
                        # Convert dict to ExpenseData object
                        expense_data = ExpenseData(**result_dict)
                        expenses.append(expense_data)
                        print(f"Successfully parsed: {expense_text} -> {expense_data.short_text}")
                    else:
                        print(f"Failed to parse or invalid result for: {expense_text}")
                        errors.append(f"Failed to parse: {expense_text}")
                except Exception as exc:
                    print(f'Expense parsing failed for "{expense_text}": {exc}')
                    errors.append(f"Error parsing '{expense_text}': {str(exc)}")
        
        return MultiExpenseResult(
            expenses=expenses,
            total_count=len(expenses),
            processing_time=time.time() - start_time,
            original_text=text,
            error="; ".join(errors) if errors else ""
        )
        
    except asyncio.TimeoutError:
        return MultiExpenseResult(
            expenses=[],
            total_count=0,
            processing_time=time.time() - start_time,
            original_text=text,
            error="Timeout while processing expenses"
        )
    except Exception as e:
        print(f"Error in parse_multiple_expenses: {e}")
        return MultiExpenseResult(
            expenses=[],
            total_count=0,
            processing_time=time.time() - start_time,
            original_text=text,
            error=f"Error: {str(e)}"
        )

def detect_expense_count(text: str) -> str:
    """
    Detect if text contains single or multiple expenses based on monetary amounts
    """
    # Match monetary patterns: "10 euros", "$5", "€3.50", etc.
    import re
    money_regex = r'(?:€|£|\$|¥)?\d+(?:\.\d{2})?(?:\s*(?:euros?|dollars?|pounds?|yen|gbp|usd|eur|jpy))?'
    matches = re.findall(money_regex, text, re.IGNORECASE)
    
    if not matches or len(matches) <= 1:
        return 'single'  # 0 or 1 monetary amount = single expense parser
    else:
        return 'multiple'  # 2+ monetary amounts = multi-expense parser
