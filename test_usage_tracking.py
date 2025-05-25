#!/usr/bin/env python3
"""
Test script to verify usage tracking is working correctly
"""

import sys
import asyncio
from google.cloud import firestore
from backend.app.agents.usage_tracker import UsageTracker, track_openai_api_call

async def test_usage_tracking():
    """Test the usage tracking functionality"""
    
    print("Testing Usage Tracking System...")
    print("=" * 50)
    
    # Initialize test parameters
    test_user_id = "test_user_123"
    db_client = firestore.Client()
    
    # Test 1: Direct usage tracker
    print("1. Testing UsageTracker class...")
    usage_tracker = UsageTracker()
    
    try:
        await usage_tracker.log_usage(
            user_id=test_user_id,
            agent_name="test_agent",
            model="gpt-4.1-nano",
            input_text="Test expense: Coffee $5.00",
            output_text='{"amount": 5.00, "currency": "USD", "short_text": "Coffee"}',
            request_duration=1.2,
            metadata={"test": True}
        )
        print("✅ UsageTracker.log_usage() - SUCCESS")
    except Exception as e:
        print(f"❌ UsageTracker.log_usage() - FAILED: {e}")
    
    # Test 2: Direct function call
    print("\n2. Testing track_openai_api_call function...")
    
    try:
        track_openai_api_call(
            user_id=test_user_id,
            db_client=db_client,
            agent_name="test_agent_2",
            model="gpt-4o",
            input_text="Test receipt analysis",
            output_text="Coffee $4.50\nSandwich $8.99",
            request_duration=2.1,
            metadata={"function": "test_function"}
        )
        print("✅ track_openai_api_call() - SUCCESS")
    except Exception as e:
        print(f"❌ track_openai_api_call() - FAILED: {e}")
    
    # Test 3: Check if data was saved
    print("\n3. Checking if usage data was saved to Firestore...")
    
    try:
        user_ref = db_client.collection('users').document(test_user_id)
        user_doc = user_ref.get()
        
        if user_doc.exists:
            user_data = user_doc.to_dict()
            usage_data = user_data.get('ai_usage', {})
            
            if usage_data:
                print("✅ Usage data found in Firestore:")
                print(f"   - Total requests: {usage_data.get('total_requests', 0)}")
                print(f"   - Total tokens: {usage_data.get('total_tokens', 0)}")
                print(f"   - Agents: {list(usage_data.get('by_agent', {}).keys())}")
                print(f"   - Models: {list(usage_data.get('by_model', {}).keys())}")
            else:
                print("⚠️  No usage data found")
        else:
            print("⚠️  User document not found")
            
    except Exception as e:
        print(f"❌ Firestore check - FAILED: {e}")
    
    print("\n" + "=" * 50)
    print("Usage tracking test completed!")

if __name__ == "__main__":
    # Set up Google Cloud credentials if needed
    import os
    if not os.getenv('GOOGLE_APPLICATION_CREDENTIALS'):
        cred_path = '/home/alex/moneymanager/backend/serviceAccountKey.json'
        if os.path.exists(cred_path):
            os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = cred_path
            print(f"Using credentials: {cred_path}")
    
    # Run the test
    asyncio.run(test_usage_tracking())
