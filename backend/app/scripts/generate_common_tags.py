import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API URL
API_URL = os.getenv("API_URL", "http://localhost:8000")

# Common expense categories
common_area_tags = [
    "food", "groceries", "restaurant", "coffee", "clothes", "shopping", 
    "transportation", "taxi", "bus", "train", "entertainment", "movie", 
    "utilities", "rent", "healthcare", "pharmacy", "fitness", "education",
    "books", "electronics", "travel", "hotel", "gifts", "charity"
]

common_context_tags = [
    "personal", "business", "family", "recurring", "one-time", "emergency",
    "necessary", "luxury", "subscription", "investment", "savings"
]

# Function to get a test token for authentication
def get_test_token():
    try:
        response = requests.post(
            f"{API_URL}/api/auth/token",
            data={"username": "admin", "password": "admin"}
        )
        response.raise_for_status()
        return response.json()["access_token"]
    except Exception as e:
        print(f"Error getting test token: {str(e)}")
        return None

# Function to generate tags in bulk
def generate_tags(token):
    try:
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "area": common_area_tags,
            "context": common_context_tags
        }
        
        response = requests.post(
            f"{API_URL}/api/agents/bulk_tag_generator/",
            headers=headers,
            json=payload
        )
        
        if response.status_code == 200:
            result = response.json()
            print("Tags generated successfully!")
            print(f"Generated {len(result['generated_tags']['area'])} area tags")
            print(f"Generated {len(result['generated_tags']['context'])} context tags")
            print(f"Skipped {len(result['skipped_tags'])} tags (already exist)")
            print(f"Failed {len(result['failed_tags'])} tags")
            
            if result['failed_tags']:
                print("\nFailed tags:")
                for tag in result['failed_tags']:
                    print(f"  - {tag['tag_id']} ({tag['facet']}): {tag['error']}")
        else:
            print(f"Error: {response.status_code} - {response.text}")
    
    except Exception as e:
        print(f"Error generating tags: {str(e)}")

if __name__ == "__main__":
    print("Generating common expense tags...")
    token = get_test_token()
    
    if token:
        generate_tags(token)
    else:
        print("Failed to get authentication token. Make sure the backend server is running.")
