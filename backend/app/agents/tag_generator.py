import os
from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field, validator
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class TagData(BaseModel):
    """Data structure for generated tag information"""
    tag_id: str = Field(description="The unique identifier for the tag")
    name: str = Field(description="The display name for the tag (capitalized)")
    facet: str = Field(description="The facet of the tag (area or context)")
    synonyms: List[str] = Field(description="List of synonyms for the tag (3-6 words)")
    icon: str = Field(description="Name of a Lucide React icon to represent this tag")
    
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
        
        Given a tag_id and facet, generate a structured tag with appropriate synonyms and a suitable Lucide React icon.
        
        For the tag name, capitalize the first letter of each word.
        For synonyms, generate 3-6 related terms that are semantically similar to the tag.
        For the icon, select an appropriate Lucide React icon name
        
        Examples:
        - For tag_id "restaurant" (facet: area), icon might be "Utensils"
        - For tag_id "gift" (facet: context), icon might be "Gift"
        
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

def generate_tag(tag_id: str, facet: str) -> dict:
    """
    Generate tag information and return a structured tag object
    
    Args:
        tag_id: The ID of the tag to generate
        facet: The facet of the tag (area or context)
        
    Returns:
        A dictionary containing the generated tag information
    """
    try:
        # Create the generator chain
        prompt_and_model, parser = create_tag_generator()
        
        # Get the model output
        output = prompt_and_model.invoke({"tag_id": tag_id, "facet": facet})
        
        # Parse the output into our Pydantic model
        result = parser.invoke(output)
        
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
            "icon": "Tag",  # Default icon
            "embedding": [],
            "created_at": datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
            "active": True
        }
