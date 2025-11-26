from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import json
import os

app = FastAPI(title="SmartFund AI API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (for demo purposes)
users_db = {"demo": "password123"}
profiles_db = {}

# Load funding data
def load_funding_data():
    try:
        with open("data/funding_opportunities.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

funding_data = load_funding_data()

# Matching algorithm
def calculate_match_score(profile: Dict[str, Any], opportunity: dict) -> tuple:
    score = 0
    explanations = []
    
    # Industry match (40% weight)
    if profile["industry"] in opportunity["sector"] or "Any" in opportunity["sector"]:
        score += 40
        explanations.append(f"Industry '{profile['industry']}' matches funding sector")
    
    # Funding amount match (30% weight)
    if opportunity["min_amount"] <= profile["funding_amount"] <= opportunity["max_amount"]:
        score += 30
        explanations.append(f"Funding amount R{profile['funding_amount']:,} is within range")
    elif profile["funding_amount"] < opportunity["min_amount"]:
        score += 10
        explanations.append(f"Funding amount slightly below minimum")
    elif profile["funding_amount"] > opportunity["max_amount"]:
        score += 15
        explanations.append(f"Funding amount above maximum but may qualify for higher tier")
    
    # Location match (20% weight)
    if profile["location"] in opportunity["location"]:
        score += 20
        explanations.append(f"Location '{profile['location']}' is eligible")
    
    # Years in operation match (10% weight)
    if opportunity["min_years"] <= profile["years_in_operation"] <= opportunity["max_years"]:
        score += 10
        explanations.append(f"Business age ({profile['years_in_operation']} years) meets requirements")
    
    return score, " | ".join(explanations)

@app.post("/api/auth/login")
async def login(user_data: Dict[str, str]):
    username = user_data.get("username")
    password = user_data.get("password")
    
    if username in users_db and users_db[username] == password:
        return {"success": True, "token": "demo_token_123", "user": username}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/api/profile")
async def save_profile(profile: Dict[str, Any]):
    user_id = profile.get("user_id", "demo_user")
    profiles_db[user_id] = profile
    return {"success": True, "message": "Profile saved successfully"}

@app.get("/api/profile/{user_id}")
async def get_profile(user_id: str):
    if user_id in profiles_db:
        return profiles_db[user_id]
    return None

@app.post("/api/match-funding")
async def match_funding(profile: Dict[str, Any]):
    matches = []
    
    for opportunity in funding_data:
        score, explanation = calculate_match_score(profile, opportunity)
        
        if score > 0:  # Only include matches with some score
            matches.append({
                "id": opportunity["id"],
                "name": opportunity["name"],
                "type": opportunity["type"],
                "match_score": score,
                "description": opportunity["description"],
                "min_amount": opportunity["min_amount"],
                "max_amount": opportunity["max_amount"],
                "explanation": explanation
            })
    
    # Sort by match score descending
    matches.sort(key=lambda x: x["match_score"], reverse=True)
    return matches

@app.post("/api/generate-application")
async def generate_application(profile: Dict[str, Any]):
    # Generate text-based application draft
    business_name = profile.get('business_name', 'N/A')
    industry = profile.get('industry', 'N/A')
    funding_amount = profile.get('funding_amount', 0)
    location = profile.get('location', 'N/A')
    years_in_operation = profile.get('years_in_operation', 0)
    
    draft_text = f"""FUNDING APPLICATION DRAFT

Business Name: {business_name}
Industry: {industry}
Funding Required: R{funding_amount:,}
Location: {location}
Years in Operation: {years_in_operation}

APPLICATION DETAILS:

1. EXECUTIVE SUMMARY
[Provide a brief overview of your business and why you need funding. Highlight your unique value proposition and growth potential.]

2. BUSINESS DESCRIPTION
[Describe your business in detail, including:
- What products/services you offer
- Your target market
- Your competitive advantages
- Current business status and achievements]

3. FINANCIAL INFORMATION
[Include:
- Current revenue and profit margins
- Financial projections for the next 2-3 years
- How the funding will impact your financial performance
- Any existing debts or financial obligations]

4. USE OF FUNDS
[Explain specifically how you will use the funding:
- Equipment purchases
- Working capital
- Marketing and expansion
- Staff hiring
- Other operational needs]

5. MARKET ANALYSIS
[Describe:
- Your target market size and growth potential
- Customer demographics and needs
- Competitive landscape
- Your market positioning strategy]

6. MANAGEMENT TEAM
[Highlight:
- Key team members and their experience
- Relevant skills and qualifications
- Advisory board or mentors
- Organizational structure]

7. GROWTH STRATEGY
[Outline:
- Short-term and long-term goals
- Expansion plans
- Marketing and sales strategy
- Risk mitigation plans]

8. CONCLUSION
[Summarize why your business is a good investment opportunity and how the funding will help achieve your goals.]

---
Generated by SmartFund AI
Date: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    
    return {
        "success": True,
        "draft_text": draft_text,
        "filename": f"{business_name}_application_draft.txt"
    }

@app.get("/api/funding-opportunities")
async def get_funding_opportunities():
    return funding_data

@app.get("/")
async def root():
    return {"message": "SmartFund AI API is running!", "status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)