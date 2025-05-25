import os
import time
import tiktoken
from datetime import datetime, timezone
from typing import Dict, List, Optional, Any, Callable
from functools import wraps
from google.cloud import firestore
import asyncio

class UsageTracker:
    """Track API usage for AI agents including tokens, requests, and costs"""
    
    def __init__(self, db_client: firestore.Client):
        self.db = db_client
        self.encoders = {}  # Cache for tiktoken encoders
        
        # Model pricing per 1M tokens (input/output) as of 2024
        self.model_pricing = {
            "gpt-4o": {"input": 2.50, "output": 10.00},
            "gpt-4o-mini": {"input": 0.150, "output": 0.600}, 
            "gpt-4.1-nano": {"input": 0.1, "output": 0.4},
            "gpt-4-turbo": {"input": 10.00, "output": 30.00},
            "gpt-3.5-turbo": {"input": 0.50, "output": 1.50},
        }
    
    def get_encoder(self, model: str) -> tiktoken.Encoding:
        """Get or create tiktoken encoder for a model"""
        if model not in self.encoders:
            try:
                # For most OpenAI models, use cl100k_base encoding
                encoding_name = "cl100k_base"
                if "gpt-3.5" in model:
                    encoding_name = "cl100k_base"
                elif "gpt-4" in model:
                    encoding_name = "cl100k_base"
                
                self.encoders[model] = tiktoken.get_encoding(encoding_name)
            except Exception as e:
                print(f"Warning: Could not get encoder for {model}, using default: {e}")
                self.encoders[model] = tiktoken.get_encoding("cl100k_base")
        
        return self.encoders[model]
    
    def count_tokens(self, text: str, model: str) -> int:
        """Count tokens in text for a specific model"""
        if not text:
            return 0
        
        try:
            encoder = self.get_encoder(model)
            return len(encoder.encode(str(text)))
        except Exception as e:
            print(f"Error counting tokens: {e}")
            # Fallback estimation: ~4 characters per token
            return len(str(text)) // 4
    
    def calculate_cost(self, input_tokens: int, output_tokens: int, model: str) -> float:
        """Calculate cost in USD for token usage"""
        pricing = self.model_pricing.get(model, {"input": 0.001, "output": 0.002})
        
        input_cost = (input_tokens / 1_000_000) * pricing["input"]
        output_cost = (output_tokens / 1_000_000) * pricing["output"]
        
        return input_cost + output_cost
    
    async def log_usage(
        self,
        user_id: str,
        agent_name: str,
        model: str,
        input_text: str = "",
        output_text: str = "",
        request_duration: float = 0.0,
        metadata: Optional[Dict[str, Any]] = None
    ):
        """Log usage data to user's Firestore document"""
        try:
            # Count tokens
            input_tokens = self.count_tokens(input_text, model)
            output_tokens = self.count_tokens(output_text, model)
            total_tokens = input_tokens + output_tokens
            
            # Calculate cost
            cost = self.calculate_cost(input_tokens, output_tokens, model)
            
            # Prepare usage data
            request_data = {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "agent": agent_name,
                "model": model,
                "tokens": {
                    "input": input_tokens,
                    "output": output_tokens,
                    "total": total_tokens
                },
                "cost_usd": round(cost, 6),
                "request_duration_seconds": round(request_duration, 3),
                "metadata": metadata or {}
            }
            
            # Get current date for monthly aggregation
            current_month = datetime.now(timezone.utc).strftime("%Y-%m")
            
            # Update user's usage document
            user_ref = self.db.collection('users').document(user_id)
            
            # Get current user doc
            user_doc = user_ref.get()
            user_data = user_doc.to_dict() if user_doc.exists else {}
            
            # Initialize usage structure if not exists
            if "ai_usage" not in user_data:
                user_data["ai_usage"] = {
                    "total_requests": 0,
                    "total_tokens": 0,
                    "total_cost_usd": 0.0,
                    "by_agent": {},
                    "by_model": {},
                    "monthly": {},
                    "recent_requests": []
                }
            
            usage = user_data["ai_usage"]
            
            # Update totals
            usage["total_requests"] += 1
            usage["total_tokens"] += total_tokens
            usage["total_cost_usd"] = round(usage["total_cost_usd"] + cost, 6)
            
            # Update by agent
            if agent_name not in usage["by_agent"]:
                usage["by_agent"][agent_name] = {
                    "requests": 0,
                    "tokens": 0,
                    "cost_usd": 0.0
                }
            
            usage["by_agent"][agent_name]["requests"] += 1
            usage["by_agent"][agent_name]["tokens"] += total_tokens
            usage["by_agent"][agent_name]["cost_usd"] = round(
                usage["by_agent"][agent_name]["cost_usd"] + cost, 6
            )
            
            # Update by model
            if model not in usage["by_model"]:
                usage["by_model"][model] = {
                    "requests": 0,
                    "tokens": 0,
                    "cost_usd": 0.0
                }
            
            usage["by_model"][model]["requests"] += 1
            usage["by_model"][model]["tokens"] += total_tokens
            usage["by_model"][model]["cost_usd"] = round(
                usage["by_model"][model]["cost_usd"] + cost, 6
            )
            
            # Update monthly stats
            if current_month not in usage["monthly"]:
                usage["monthly"][current_month] = {
                    "requests": 0,
                    "tokens": 0,
                    "cost_usd": 0.0,
                    "by_agent": {},
                    "by_model": {}
                }
            
            monthly = usage["monthly"][current_month]
            monthly["requests"] += 1
            monthly["tokens"] += total_tokens
            monthly["cost_usd"] = round(monthly["cost_usd"] + cost, 6)
            
            # Update monthly by agent
            if agent_name not in monthly["by_agent"]:
                monthly["by_agent"][agent_name] = {"requests": 0, "tokens": 0, "cost_usd": 0.0}
            monthly["by_agent"][agent_name]["requests"] += 1
            monthly["by_agent"][agent_name]["tokens"] += total_tokens
            monthly["by_agent"][agent_name]["cost_usd"] = round(
                monthly["by_agent"][agent_name]["cost_usd"] + cost, 6
            )
            
            # Update monthly by model
            if model not in monthly["by_model"]:
                monthly["by_model"][model] = {"requests": 0, "tokens": 0, "cost_usd": 0.0}
            monthly["by_model"][model]["requests"] += 1
            monthly["by_model"][model]["tokens"] += total_tokens
            monthly["by_model"][model]["cost_usd"] = round(
                monthly["by_model"][model]["cost_usd"] + cost, 6
            )
            
            # Add to recent requests (keep last 100)
            usage["recent_requests"].append(request_data)
            if len(usage["recent_requests"]) > 100:
                usage["recent_requests"] = usage["recent_requests"][-100:]
            
            # Update the document
            user_ref.set(user_data, merge=True)
            
            print(f"✅ Usage logged: {agent_name} | {model} | {total_tokens} tokens | ${cost:.6f}")
            
        except Exception as e:
            print(f"❌ Error logging usage: {e}")
            # Don't raise exception to avoid breaking the main functionality


def track_ai_usage(agent_name: str, model: str = None):
    """
    Decorator to track AI usage for agent functions
    
    Usage:
        @track_ai_usage("expense_parser", "gpt-4.1-nano")
        def my_agent_function(text: str, user_id: str, db_client: firestore.Client):
            # Your agent logic here
            return result
    """
    def decorator(func: Callable):
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            # Extract user_id and db_client from arguments
            user_id = None
            db_client = None
            input_text = ""
            
            # Try to extract from positional args (common patterns)
            for arg in args:
                if isinstance(arg, str) and len(arg) > 10 and '.' not in arg:
                    if not input_text:
                        input_text = arg
                elif isinstance(arg, str) and ('.' in arg or len(arg) < 50):
                    if not user_id:
                        user_id = arg
                elif hasattr(arg, 'collection'):  # Firestore client
                    db_client = arg
            
            # Try to extract from keyword args
            user_id = user_id or kwargs.get('user_id')
            db_client = db_client or kwargs.get('db_client')
            input_text = input_text or kwargs.get('text', '') or kwargs.get('query', '')
            
            if not user_id or not db_client:
                print(f"⚠️  Usage tracking skipped for {agent_name}: missing user_id or db_client")
                return await func(*args, **kwargs)
            
            # Initialize tracker
            tracker = UsageTracker(db_client)
            start_time = time.time()
            
            try:
                # Execute the original function
                result = await func(*args, **kwargs)
                end_time = time.time()
                
                # Extract output text from result
                output_text = ""
                if isinstance(result, dict):
                    output_text = str(result.get('short_text', '')) + str(result.get('raw_text', ''))
                elif isinstance(result, str):
                    output_text = result
                
                # Log usage
                await tracker.log_usage(
                    user_id=user_id,
                    agent_name=agent_name,
                    model=model or "unknown",
                    input_text=input_text,
                    output_text=output_text,
                    request_duration=end_time - start_time,
                    metadata={
                        "function": func.__name__,
                        "success": True
                    }
                )
                
                return result
                
            except Exception as e:
                end_time = time.time()
                
                # Log failed usage
                await tracker.log_usage(
                    user_id=user_id,
                    agent_name=agent_name,
                    model=model or "unknown",
                    input_text=input_text,
                    output_text="",
                    request_duration=end_time - start_time,
                    metadata={
                        "function": func.__name__,
                        "success": False,
                        "error": str(e)
                    }
                )
                
                raise
        
        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            # Convert sync function to async for tracking
            async def async_func():
                return func(*args, **kwargs)
            
            return asyncio.run(async_wrapper(*args, **kwargs))
        
        # Return async wrapper for async functions, sync wrapper for sync functions
        if asyncio.iscoroutinefunction(func):
            return async_wrapper
        else:
            return sync_wrapper
    
    return decorator


def track_openai_api_call(
    user_id: str,
    db_client: firestore.Client,
    agent_name: str,
    model: str,
    input_text: str,
    output_text: str,
    request_duration: float = 0.0,
    metadata: Optional[Dict[str, Any]] = None
):
    """
    Standalone function to track OpenAI API calls
    Use this for manual tracking when the decorator isn't suitable
    """
    async def log():
        tracker = UsageTracker(db_client)
        await tracker.log_usage(
            user_id=user_id,
            agent_name=agent_name,
            model=model,
            input_text=input_text,
            output_text=output_text,
            request_duration=request_duration,
            metadata=metadata
        )
    
    asyncio.run(log())
