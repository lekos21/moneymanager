from typing import Dict, List, Optional, Any
from google.cloud import firestore
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException

class UsageService:
    """Service for retrieving and analyzing AI usage data"""
    
    def __init__(self, db_client: firestore.Client):
        self.db = db_client
    
    def get_user_usage(self, user_id: str) -> Dict[str, Any]:
        """Get comprehensive usage data for a user"""
        try:
            user_ref = self.db.collection('users').document(user_id)
            user_doc = user_ref.get()
            
            if not user_doc.exists:
                raise HTTPException(status_code=404, detail="User not found")
            
            user_data = user_doc.to_dict()
            usage_data = user_data.get("ai_usage", {})
            
            if not usage_data:
                return {
                    "total_requests": 0,
                    "total_tokens": 0,
                    "total_cost_usd": 0.0,
                    "by_agent": {},
                    "by_model": {},
                    "monthly": {},
                    "recent_requests": []
                }
            
            return usage_data
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error retrieving usage data: {str(e)}")
    
    def get_usage_summary(self, user_id: str) -> Dict[str, Any]:
        """Get a summary of user's AI usage"""
        usage_data = self.get_user_usage(user_id)
        
        current_month = datetime.now(timezone.utc).strftime("%Y-%m")
        last_month = (datetime.now(timezone.utc) - timedelta(days=30)).strftime("%Y-%m")
        
        # Calculate month-over-month changes
        current_month_data = usage_data.get("monthly", {}).get(current_month, {})
        last_month_data = usage_data.get("monthly", {}).get(last_month, {})
        
        def calculate_change(current: float, previous: float) -> Dict[str, Any]:
            if previous == 0:
                return {"value": current, "change_percent": 0, "trend": "neutral"}
            
            change_percent = ((current - previous) / previous) * 100
            trend = "up" if change_percent > 0 else "down" if change_percent < 0 else "neutral"
            
            return {
                "value": current,
                "change_percent": round(change_percent, 1),
                "trend": trend
            }
        
        # Get top agents and models
        top_agents = sorted(
            usage_data.get("by_agent", {}).items(),
            key=lambda x: x[1]["requests"],
            reverse=True
        )[:5]
        
        top_models = sorted(
            usage_data.get("by_model", {}).items(),
            key=lambda x: x[1]["tokens"],
            reverse=True
        )[:5]
        
        return {
            "overview": {
                "total_requests": usage_data.get("total_requests", 0),
                "total_tokens": usage_data.get("total_tokens", 0),
                "total_cost_usd": usage_data.get("total_cost_usd", 0.0),
                "avg_tokens_per_request": round(
                    usage_data.get("total_tokens", 0) / max(usage_data.get("total_requests", 1), 1)
                )
            },
            "current_month": {
                "requests": calculate_change(
                    current_month_data.get("requests", 0),
                    last_month_data.get("requests", 0)
                ),
                "tokens": calculate_change(
                    current_month_data.get("tokens", 0),
                    last_month_data.get("tokens", 0)
                ),
                "cost_usd": calculate_change(
                    current_month_data.get("cost_usd", 0.0),
                    last_month_data.get("cost_usd", 0.0)
                )
            },
            "top_agents": [
                {
                    "name": agent,
                    "requests": data["requests"],
                    "tokens": data["tokens"],
                    "cost_usd": data["cost_usd"],
                    "avg_tokens": round(data["tokens"] / max(data["requests"], 1))
                }
                for agent, data in top_agents
            ],
            "top_models": [
                {
                    "name": model,
                    "requests": data["requests"],
                    "tokens": data["tokens"],
                    "cost_usd": data["cost_usd"],
                    "avg_tokens": round(data["tokens"] / max(data["requests"], 1))
                }
                for model, data in top_models
            ]
        }
    
    def get_monthly_usage(self, user_id: str, months: int = 12) -> List[Dict[str, Any]]:
        """Get monthly usage data for the last N months"""
        usage_data = self.get_user_usage(user_id)
        monthly_data = usage_data.get("monthly", {})
        
        # Generate list of months
        current_date = datetime.now(timezone.utc)
        month_list = []
        
        for i in range(months):
            month_date = current_date - timedelta(days=30 * i)
            month_key = month_date.strftime("%Y-%m")
            month_name = month_date.strftime("%B %Y")
            
            data = monthly_data.get(month_key, {
                "requests": 0,
                "tokens": 0,
                "cost_usd": 0.0,
                "by_agent": {},
                "by_model": {}
            })
            
            month_list.append({
                "month": month_key,
                "month_name": month_name,
                "requests": data["requests"],
                "tokens": data["tokens"],
                "cost_usd": data["cost_usd"],
                "by_agent": data.get("by_agent", {}),
                "by_model": data.get("by_model", {})
            })
        
        return list(reversed(month_list))  # Oldest to newest
    
    def get_agent_breakdown(self, user_id: str) -> List[Dict[str, Any]]:
        """Get detailed breakdown by agent"""
        usage_data = self.get_user_usage(user_id)
        by_agent = usage_data.get("by_agent", {})
        
        total_requests = usage_data.get("total_requests", 1)
        total_tokens = usage_data.get("total_tokens", 1)
        total_cost = usage_data.get("total_cost_usd", 1)
        
        agents = []
        for agent_name, data in by_agent.items():
            agents.append({
                "name": agent_name,
                "requests": data["requests"],
                "tokens": data["tokens"],
                "cost_usd": data["cost_usd"],
                "request_percentage": round((data["requests"] / total_requests) * 100, 1),
                "token_percentage": round((data["tokens"] / total_tokens) * 100, 1),
                "cost_percentage": round((data["cost_usd"] / total_cost) * 100, 1),
                "avg_tokens_per_request": round(data["tokens"] / max(data["requests"], 1)),
                "avg_cost_per_request": round(data["cost_usd"] / max(data["requests"], 1), 6)
            })
        
        return sorted(agents, key=lambda x: x["requests"], reverse=True)
    
    def get_model_breakdown(self, user_id: str) -> List[Dict[str, Any]]:
        """Get detailed breakdown by model"""
        usage_data = self.get_user_usage(user_id)
        by_model = usage_data.get("by_model", {})
        
        total_requests = usage_data.get("total_requests", 1)
        total_tokens = usage_data.get("total_tokens", 1)
        total_cost = usage_data.get("total_cost_usd", 1)
        
        models = []
        for model_name, data in by_model.items():
            models.append({
                "name": model_name,
                "requests": data["requests"],
                "tokens": data["tokens"],
                "cost_usd": data["cost_usd"],
                "request_percentage": round((data["requests"] / total_requests) * 100, 1),
                "token_percentage": round((data["tokens"] / total_tokens) * 100, 1),
                "cost_percentage": round((data["cost_usd"] / total_cost) * 100, 1),
                "avg_tokens_per_request": round(data["tokens"] / max(data["requests"], 1)),
                "avg_cost_per_request": round(data["cost_usd"] / max(data["requests"], 1), 6)
            })
        
        return sorted(models, key=lambda x: x["tokens"], reverse=True)
    
    def get_recent_requests(self, user_id: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Get recent AI requests for debugging/monitoring"""
        usage_data = self.get_user_usage(user_id)
        recent_requests = usage_data.get("recent_requests", [])
        
        # Return the most recent requests
        return recent_requests[-limit:] if len(recent_requests) > limit else recent_requests
    
    def get_usage_alerts(self, user_id: str) -> List[Dict[str, Any]]:
        """Get usage alerts based on thresholds"""
        usage_data = self.get_user_usage(user_id)
        current_month = datetime.now(timezone.utc).strftime("%Y-%m")
        monthly_data = usage_data.get("monthly", {}).get(current_month, {})
        
        alerts = []
        
        # Monthly cost threshold
        monthly_cost = monthly_data.get("cost_usd", 0.0)
        if monthly_cost > 10.0:  # $10/month threshold
            alerts.append({
                "type": "high_monthly_cost",
                "severity": "warning" if monthly_cost < 25.0 else "critical",
                "message": f"Monthly AI cost is ${monthly_cost:.2f}",
                "value": monthly_cost,
                "threshold": 10.0
            })
        
        # Monthly request threshold
        monthly_requests = monthly_data.get("requests", 0)
        if monthly_requests > 1000:  # 1000 requests/month threshold
            alerts.append({
                "type": "high_monthly_requests",
                "severity": "warning" if monthly_requests < 2500 else "critical",
                "message": f"Monthly requests: {monthly_requests}",
                "value": monthly_requests,
                "threshold": 1000
            })
        
        # Token efficiency alert
        total_requests = usage_data.get("total_requests", 1)
        total_tokens = usage_data.get("total_tokens", 0)
        avg_tokens = total_tokens / total_requests
        
        if avg_tokens > 2000:  # High average tokens per request
            alerts.append({
                "type": "high_token_usage",
                "severity": "info",
                "message": f"Average {avg_tokens:.0f} tokens per request",
                "value": avg_tokens,
                "threshold": 2000
            })
        
        return alerts
