import os
from datetime import datetime, timezone
from typing import List, Optional, Dict
from pydantic import BaseModel, Field, validator
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import time
from .usage_tracker import track_openai_api_call

# Load environment variables from .env file
load_dotenv()

class TagData(BaseModel):
    """Data structure for generated tag information"""
    tag_id: str = Field(description="The unique identifier for the tag")
    name: str = Field(description="The display name for the tag (capitalized)")
    facet: str = Field(description="The facet of the tag (area or context)")
    synonyms: List[str] = Field(description="List of synonyms for the tag (3-6 words)")
    icon: str = Field(description="Name of a Font Awesome icon (e.g., 'shopping-cart', 'coffee', 'tag')")
    colors: Dict[str, str] = Field(description="Color information for the tag in various formats")
    
    # Validate facet is either 'area' or 'context'
    @validator('facet')
    def facet_must_be_valid(cls, v):
        if v not in ['area', 'context']:
            raise ValueError("Facet must be either 'area' or 'context'")
        return v
    
    # Validate synonyms has 3-6 items
    @validator('synonyms')
    def synonyms_length(cls, v):
        if len(v) < 3 or len(v) > 6:
            raise ValueError("Synonyms must contain between 3 and 6 items")
        return v
        
    # Validate colors has all required fields
    @validator('colors')
    def colors_must_have_required_fields(cls, v):
        required_fields = ['hex', 'bgHex', 'textHex']
        for field in required_fields:
            if field not in v:
                raise ValueError(f"Colors must include '{field}'")
        return v

def create_tag_generator():
    """Create a LangChain parser for tag generation"""
    # Get API key from environment variable
    api_key = os.environ.get("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not found")
    
    # Initialize the OpenAI model
    model = ChatOpenAI(
        model="gpt-4o",
        temperature=0.2,  # Slightly higher temperature for more creative synonyms
        openai_api_key=api_key,
    )
    
    # Set up the Pydantic output parser with our TagData model
    parser = PydanticOutputParser(pydantic_object=TagData)
    
    # Create a prompt template
    prompt = PromptTemplate(
        template="""
        You are an AI assistant that generates tag information for an expense tracking system.
        
        Given a tag_id and facet, generate a structured tag with appropriate synonyms, a suitable Font Awesome icon, and color information.
        
        For the tag name, capitalize the first letter of each word.
        For synonyms, generate 3-6 related terms that are semantically similar to the tag.
        For the icon, select an appropriate Font Awesome icon name (e.g., 'shopping-cart', 'coffee', 'tag').
        The icon name should be in kebab-case and lowercase if applicable (e.g., 'shopping-cart' not 'ShoppingCart').
        
        For colors, provide a consistent color scheme that semantically matches the tag's meaning using hex color codes:
        - 'hex': The main color for borders and highlights (e.g., '#f97316' for orange-500)
        - 'bgHex': A lighter background color (e.g., '#fff7ed' for orange-50)
        - 'textHex': A color for text that contrasts well with bgHex (e.g., '#ea580c' for orange-600)
        
        Choose colors that are semantically appropriate for the tag:
        - Food/Dining: Orange shades (#f97316, orange-500)
        - Shopping: Purple shades (#a855f7, purple-500)
        - Entertainment: Red shades (#ef4444, red-500)
        - Travel: Blue shades (#3b82f6, blue-500)
        - Health: Green shades (#22c55e, green-500)
        - Utilities/Home: Yellow shades (#eab308, yellow-500)
        - Education: Blue shades (#2563eb, blue-600)
        - Personal: Indigo shades (#6366f1, indigo-500)
        - Gifts: Pink shades (#ec4899, pink-500)
        
        Examples:
        - For tag_id "restaurant" (facet: area):
          - icon: "utensils"
          - colors: {{ "hex": "#fb923c", "bgHex": "#fff7ed", "textHex": "#ea580c" }}
        - For tag_id "gift" (facet: context):
          - icon: "gift"
          - colors: {{ "hex": "#ec4899", "bgHex": "#fdf2f8", "textHex": "#db2777" }}
        
        {format_instructions}
        
        Tag ID: {tag_id}
        Facet: {facet}
        """,
        input_variables=["tag_id", "facet"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    
    # Create the chain
    prompt_and_model = prompt | model
    
    return prompt_and_model, parser

def generate_tag(tag_id: str, facet: str, user_id: str = None, db_client = None) -> dict:
    """
    Generate tag information and return a structured tag object
    
    Args:
        tag_id: The ID of the tag to generate
        facet: The facet of the tag (area or context)
        user_id: Optional user ID for usage tracking
        db_client: Optional Firestore client for usage tracking
        
    Returns:
        A dictionary containing the generated tag information
    """
    try:
        # Create the generator chain
        prompt_and_model, parser = create_tag_generator()
        
        # Get the model output
        start_time = time.time()
        output = prompt_and_model.invoke({"tag_id": tag_id, "facet": facet})
        end_time = time.time()
        
        # Parse the output into our Pydantic model
        result = parser.invoke(output)
        
        # Track usage if user_id and db_client are provided
        if user_id and db_client:
            try:
                output_text = str(result.dict()) if hasattr(result, 'dict') else str(result)
                track_openai_api_call(
                    user_id=user_id,
                    db_client=db_client,
                    agent_name="tag_generator",
                    model="gpt-4.1-nano",
                    input_text=f"tag_id: {tag_id}, facet: {facet}",
                    output_text=output_text,
                    request_duration=end_time - start_time,
                    metadata={"function": "generate_tag", "tag_id": tag_id, "facet": facet, "success": True}
                )
            except Exception as e:
                print(f"Warning: Failed to track usage: {e}")
        
        # Convert to dict and add the created_at, embedding, and active fields
        result_dict = result.dict()  # Use .dict() instead of model_dump() in Pydantic v1
        
        # Add current timestamp
        result_dict["created_at"] = datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')
        
        # Add empty embedding list
        result_dict["embedding"] = []
        
        # Set active to true
        result_dict["active"] = True
            
        return result_dict
    except Exception as e:
        # Print the error for debugging
        print(f"Error generating tag: {str(e)}")
        
        # If generation fails, return a basic structure
        return {
            "tag_id": tag_id,
            "name": tag_id.capitalize(),
            "facet": facet,
            "synonyms": [f"{tag_id}-related-1", f"{tag_id}-related-2", f"{tag_id}-related-3"],
            "icon": "tag",  # Default Font Awesome icon
            "colors": {
                "hex": "#d1d5db",
                "bgHex": "#f9fafb",
                "textHex": "#4b5563"
            },
            "embedding": [],
            "created_at": datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
            "active": True
        }
