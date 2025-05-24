import os
from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field, validator
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from google.cloud import firestore

# Load environment variables from .env file
load_dotenv()

class ExpenseData(BaseModel):
    """Data structure for parsed expense information"""
    amount: float = Field(description="The amount of money spent")
    currency: str = Field(description="The currency code (e.g., EUR, USD)")
    area_tags: List[str] = Field(description="Tags that categorize the expense area (e.g., food, clothing, transportation)", default=[])
    context_tags: List[str] = Field(description="Optional tags that provide additional context or purpose (e.g., gift, personal, vacation)", default=[])
    short_text: str = Field(description="A short description of what was purchased (e.g., 'shoes', 'dinner', 'movie ticket')")
    main_tag_icon: Optional[str] = Field(default=None, description="Font Awesome icon name for the primary area tag")
    
    # Add validation to ensure amount is positive
    @validator('amount')
    def amount_must_be_positive(cls, v):
        if v < 0:
            raise ValueError("Amount must be positive")
        return v

def create_expense_parser(db_client, default_currency):
    """Create a LangChain parser for expense data"""
    # Get API key from environment variable
    api_key = os.environ.get("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not found")
    
    # Remove quotes if they're present in the API key
    if api_key.startswith('"') and api_key.endswith('"'):
        api_key = api_key[1:-1]
    
    print(f"Using API key starting with: {api_key[:5]}...")
    
    # Use a reliably available model (gpt-3.5-turbo is widely available)
    # This can be updated to gpt-4o-mini or another model that's definitely available in your account
    model = ChatOpenAI(
        model="gpt-4.1-nano",  # More reliable model name
        temperature=0,  # Low temperature for more deterministic outputs
        openai_api_key=api_key,  # Explicitly pass the API key
    )
    
    # Set up the Pydantic output parser with our ExpenseData model
    parser = PydanticOutputParser(pydantic_object=ExpenseData)
    
    # Fetch tags dynamically from Firestore
    tags_docs = db_client.collection('tags').stream()
    area_tags = []
    context_tags = []
    for doc in tags_docs:
        data = doc.to_dict()
        if not data.get("active", False):
            continue
        tag_id = data.get("tag_id", doc.id)
        facet = data.get("facet", "")
        if facet == "area":
            area_tags.append(tag_id)
        elif facet == "context":
            context_tags.append(tag_id)
    area_examples = ", ".join(area_tags)
    context_examples = ", ".join(context_tags)

    # Create a prompt template with improved handling for simple formats
    prompt = PromptTemplate( 
    template=""" 
        You are an AI assistant that extracts expense information from text. 
        Extract the following details from the user's expense description: 
 
        1. The amount spent - REQUIRED 
 
        2. The currency - REQUIRED 
           - Always return a 3-letter currency code (USD, EUR, GBP, etc.) 
           - If the user doesn't specify a currency, assume {default_currency} 
 
        3. Area tags (REQUIRED): Tags that categorize what the expense is for, the object actually bought (could be multiple!).  
           Create appropriate tags for the expense category. Common examples include: {area_examples}
           But feel free to create other relevant category tags as needed.
 
        4. Context tags (OPTIONAL): Tags that provide additional context, the people or events associated with the expense (could be multiple!). 
           This can include people's names, occasions, locations, or other relevant details.
           Examples include: {context_examples}
           Create any context tags that help describe the circumstances of the expense.
 
        5. Short text (REQUIRED): A brief description (1–4 words) of what was purchased. Include brands if provided or relevant details. 
           Examples: "Prada shoes", "dinner at Luigi's", "movie ticket", "electricity bill", "Netflix payment", "Airbnb booking", "H&M t-shirt", "gym membership", "gift for Anna" 
 
        Guidelines for tagging:
        - Be consistent with tag naming (use lowercase, simple terms)
        - If a person is mentioned include their name as a context tag (e.g., "gift for Anna" would have as tags both "gift" and "Anna")
        - Create tags that would be useful for filtering and categorizing expenses later
        - If the expense is in a different language, adapt the tags to the language used in the expense description
        - Don't use similar tags for area and context (e.g. "gift" and "gifts")
        - For food, assign the tag "food" but also try to infer if it also should have a "groceries" or "restaurant" tag
 
        {format_instructions} 
 
        User expense: {query} 
        """, 
            input_variables=["query"], 
            partial_variables={
                "format_instructions": parser.get_format_instructions(), 
                "area_examples": area_examples, 
                "context_examples": context_examples, 
                "default_currency": default_currency
            }, 
        )

    
    # Create the chain
    prompt_and_model = prompt | model
    
    return prompt_and_model, parser

def parse_expense(text: str, user_id: str, db_client: firestore.Client) -> dict:
    """
    Parse expense information from text and return a structured expense object
    
    Args:
        text: The text to parse expense information from
        user_id: The ID of the user making the request
        db_client: Firestore client instance for database operations
        
    Returns:
        A dictionary containing the parsed expense information
    """
    print(f"Parsing expense: '{text}' for user: {user_id}")
    
    try:
        # Fetch user's default currency
        user_doc = db_client.collection('users').document(user_id).get()
        if user_doc.exists and 'currency' in user_doc.to_dict():
            default_currency = user_doc.to_dict()['currency']
        else:
            default_currency = 'EUR'
        
        # Create the parser chain
        prompt_and_model, parser = create_expense_parser(db_client, default_currency)
        
        # Get the model output
        print(f"Sending to LLM: '{text}'")
        output = prompt_and_model.invoke({"query": text})
        print(f"LLM output: {output}")
        
        # Parse the output into our Pydantic model
        result = parser.invoke(output)
        print(f"Parsed result: {result}")
        
        # Convert to dict and add the user_id, timestamp, and raw_text
        result_dict = result.dict()  # Use .dict() instead of model_dump() in Pydantic v1
        result_dict["user_id"] = user_id
        
        # Use the original text directly
        result_dict["raw_text"] = text
        
        # Always use current timestamp (fix deprecated warning)
        result_dict["timestamp"] = datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')

        # Fetch icon for the first area_tag
        result_dict["main_tag_icon"] = "tag" # Default icon
        if result_dict.get("area_tags") and len(result_dict["area_tags"]) > 0:
            first_area_tag_id = result_dict["area_tags"][0].lower() # Assuming tag_ids are stored in lowercase
            try:
                tag_ref = db_client.collection('tags').document(first_area_tag_id)
                tag_doc = tag_ref.get()
                if tag_doc.exists:
                    tag_data = tag_doc.to_dict()
                    if tag_data and 'icon' in tag_data:
                        result_dict["main_tag_icon"] = tag_data['icon']
                        print(f"Found icon '{tag_data['icon']}' for tag '{first_area_tag_id}'")
                    else:
                        print(f"Tag '{first_area_tag_id}' found but has no icon field.")
                else:
                    print(f"Tag '{first_area_tag_id}' not found in Firestore.")
            except Exception as e:
                print(f"Error fetching tag '{first_area_tag_id}' from Firestore: {str(e)}")
        
        print(f"Final result with icon: {result_dict}")
        return result_dict
    except Exception as e:
        # Print the error for debugging
        print(f"Error parsing expense: {str(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        
        # If parsing fails, return a basic structure with the raw text
        fallback = {
            "user_id": user_id,
            "amount": 0.0,
            "currency": "EUR",  # Default currency
            "timestamp": datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
            "raw_text": text,
            "area_tags": [],
            "context_tags": [],
            "short_text": "generic purchase",
            "main_tag_icon": "tag" # Default icon for fallback
        }
        print(f"Returning fallback: {fallback}")
        return fallback
