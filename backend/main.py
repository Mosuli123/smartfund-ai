from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import io
import base64
from smart_chatbot import SmartFundChatbot
from ai_system_admin import AISystemAdmin
from ai_funding_admin import AIFundingAdmin
from ai_smme_assistant import AISMMEAssistant

app = FastAPI(title="SmartFund AI API")

# CORS middleware - Allow all origins for hackathon demo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class BusinessProfile(BaseModel):
    business_name: str
    industry: str
    funding_amount: int
    location: str
    years_in_operation: int
    user_id: Optional[str] = "demo_user"

class User(BaseModel):
    username: str
    password: str

class FundingMatch(BaseModel):
    id: int
    name: str
    type: str
    match_score: int
    description: str
    min_amount: int
    max_amount: int
    explanation: str

class AIQuery(BaseModel):
    message: str
    user_id: Optional[str] = "demo_user"

# In-memory storage (for demo purposes)
users_db = {"demo": "password123"}
profiles_db = {}

# Initialize Smart Chatbot and AI System Admin
chatbot = SmartFundChatbot()
ai_system_admin = AISystemAdmin()
ai_funding_admin = AIFundingAdmin()
ai_smme_assistant = AISMMEAssistant()

# Load funding data with fallback
def load_funding_data():
    try:
        with open("data/funding_opportunities.json", "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        # Fallback data for hackathon demo
        return [
            {
                "id": 1,
                "name": "Demo Funding Opportunity",
                "type": "Grant",
                "sector": ["Technology", "Any"],
                "min_amount": 10000,
                "max_amount": 100000,
                "location": ["Eastern Cape"],
                "min_years": 0,
                "max_years": 10,
                "description": "Demo funding for hackathon presentation",
                "eligibility": "Any business type"
            }
        ]

funding_data = load_funding_data()

# Matching algorithm
def calculate_match_score(profile: BusinessProfile, opportunity: dict) -> tuple:
    score = 0
    explanations = []
    
    # Industry match (40% weight)
    if profile.industry in opportunity["sector"] or "Any" in opportunity["sector"]:
        score += 40
        explanations.append(f"Industry '{profile.industry}' matches funding sector")
    
    # Funding amount match (30% weight)
    if opportunity["min_amount"] <= profile.funding_amount <= opportunity["max_amount"]:
        score += 30
        explanations.append(f"Funding amount R{profile.funding_amount:,} is within range")
    elif profile.funding_amount < opportunity["min_amount"]:
        score += 10
        explanations.append(f"Funding amount slightly below minimum")
    elif profile.funding_amount > opportunity["max_amount"]:
        score += 15
        explanations.append(f"Funding amount above maximum but may qualify for higher tier")
    
    # Location match (20% weight)
    if profile.location in opportunity["location"] or "Eastern Cape" in opportunity["location"]:
        score += 20
        explanations.append(f"Location '{profile.location}' is eligible in Eastern Cape region")
    
    # Years in operation match (10% weight)
    if opportunity["min_years"] <= profile.years_in_operation <= opportunity["max_years"]:
        score += 10
        explanations.append(f"Business age ({profile.years_in_operation} years) meets requirements")
    
    return score, " | ".join(explanations)

@app.post("/api/auth/login")
async def login(user: User):
    if user.username in users_db and users_db[user.username] == user.password:
        return {"success": True, "token": "demo_token_123", "user": user.username}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/api/profile")
async def save_profile(profile: BusinessProfile):
    profiles_db[profile.user_id] = profile.dict()
    return {"success": True, "message": "Profile saved successfully"}

@app.get("/api/profile/{user_id}")
async def get_profile(user_id: str):
    if user_id in profiles_db:
        return profiles_db[user_id]
    return None

@app.post("/api/match-funding")
async def match_funding(profile: BusinessProfile):
    matches = []
    
    for opportunity in funding_data:
        score, explanation = calculate_match_score(profile, opportunity)
        
        if score > 0:  # Only include matches with some score
            matches.append(FundingMatch(
                id=opportunity["id"],
                name=opportunity["name"],
                type=opportunity["type"],
                match_score=score,
                description=opportunity["description"],
                min_amount=opportunity["min_amount"],
                max_amount=opportunity["max_amount"],
                explanation=explanation
            ))
    
    # Sort by match score descending
    matches.sort(key=lambda x: x.match_score, reverse=True)
    return matches

@app.post("/api/generate-application")
async def generate_application(profile: BusinessProfile):
    try:
        # Create PDF in memory
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        
        # Add content to PDF
        p.drawString(100, 750, "FUNDING APPLICATION DRAFT")
        p.drawString(100, 720, f"Business Name: {profile.business_name}")
        p.drawString(100, 700, f"Industry: {profile.industry}")
        p.drawString(100, 680, f"Funding Required: R{profile.funding_amount:,}")
        p.drawString(100, 660, f"Location: {profile.location}")
        p.drawString(100, 640, f"Years in Operation: {profile.years_in_operation}")
        
        p.drawString(100, 600, "APPLICATION DETAILS:")
        p.drawString(100, 580, "1. Executive Summary")
        p.drawString(120, 560, "   [Describe your business and funding needs]")
        p.drawString(100, 540, "2. Business Description")
        p.drawString(120, 520, "   [Detailed business overview]")
        p.drawString(100, 500, "3. Financial Information")
        p.drawString(120, 480, "   [Current financial status and projections]")
        p.drawString(100, 460, "4. Use of Funds")
        p.drawString(120, 440, "   [How the funding will be utilized]")
        
        p.save()
        
        # Get PDF data and encode as base64
        buffer.seek(0)
        pdf_data = buffer.getvalue()
        buffer.close()
        
        pdf_base64 = base64.b64encode(pdf_data).decode()
        
        return {
            "success": True,
            "pdf_data": pdf_base64,
            "filename": f"{profile.business_name}_application_draft.pdf"
        }
    except Exception as e:
        # Fallback for hackathon demo if PDF generation fails
        return {
            "success": True,
            "pdf_data": None,
            "filename": f"{profile.business_name}_application_draft.pdf",
            "message": "PDF generation temporarily unavailable - demo mode active"
        }

@app.get("/api/funding-opportunities")
async def get_funding_opportunities():
    return funding_data

@app.post("/api/smme/ai-insights")
async def get_smme_ai_insights(query: AIQuery):
    try:
        user_profile = profiles_db.get(query.user_id, {})
        if not user_profile:
            return {"success": False, "message": "Complete your profile first"}
        
        profile_analysis = ai_smme_assistant.analyze_business_profile(user_profile)
        auto_opportunities = ai_smme_assistant.auto_scan_opportunities(user_profile, funding_data)
        smart_notifications = ai_smme_assistant.generate_smart_notifications(user_profile, funding_data)
        personalized_insights = ai_smme_assistant.generate_personalized_insights(user_profile)
        
        return {
            "success": True,
            "data": {
                "profile_analysis": profile_analysis,
                "auto_opportunities": auto_opportunities,
                "notifications": smart_notifications,
                "personalized_insights": personalized_insights
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/api/admin/ai-insights")
async def get_ai_insights():
    try:
        # Get user data for analysis
        users_data = list(profiles_db.values())
        
        # Generate AI insights
        user_analysis = ai_system_admin.analyze_user_behavior(users_data)
        predictive_insights = ai_system_admin.generate_predictive_insights()
        system_health = ai_system_admin.monitor_system_health()
        executive_summary = ai_system_admin.generate_executive_summary(users_data)
        
        return {
            "success": True,
            "data": {
                "user_analysis": user_analysis,
                "predictive_insights": predictive_insights,
                "system_health": system_health,
                "executive_summary": executive_summary,
                "generated_at": "2024-01-01T00:00:00Z"
            }
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@app.get("/api/funding-admin/ai-insights")
async def get_funding_ai_insights():
    try:
        # Mock application data for AI analysis
        mock_applications = [
            {
                "id": 1,
                "business_name": "Tech Innovations Ltd",
                "industry": "Technology",
                "years_in_operation": 3,
                "funding_amount": 150000,
                "location": "Eastern Cape",
                "documents_complete": True
            },
            {
                "id": 2,
                "business_name": "Green Agriculture Co",
                "industry": "Agriculture",
                "years_in_operation": 5,
                "funding_amount": 200000,
                "location": "Eastern Cape",
                "documents_complete": True
            },
            {
                "id": 3,
                "business_name": "New Startup Ventures",
                "industry": "Services",
                "years_in_operation": 0.5,
                "funding_amount": 50000,
                "location": "South Africa",
                "documents_complete": False
            }
        ]
        
        # Generate AI insights
        scored_applications = ai_funding_admin.score_applications(mock_applications)
        portfolio_analysis = ai_funding_admin.analyze_portfolio_performance()
        market_insights = ai_funding_admin.generate_market_insights()
        funding_strategy = ai_funding_admin.optimize_funding_strategy()
        executive_dashboard = ai_funding_admin.generate_executive_dashboard()
        
        return {
            "success": True,
            "data": {
                "scored_applications": scored_applications,
                "portfolio_analysis": portfolio_analysis,
                "market_insights": market_insights,
                "funding_strategy": funding_strategy,
                "executive_dashboard": executive_dashboard,
                "generated_at": "2024-01-01T00:00:00Z"
            }
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@app.post("/api/ai-assistant")
async def ai_assistant_query(query: AIQuery):
    try:
        # Get user profile for personalized responses
        user_profile = profiles_db.get(query.user_id, {})
        
        # Generate chatbot response
        response = chatbot.chat_response(query.message, user_profile, query.user_id)
        
        return {
            "success": True,
            "response": response,
            "timestamp": "2024-01-01T00:00:00Z"
        }
    except Exception as e:
        return {
            "success": False,
            "response": "I'm having trouble processing your request right now. Please try asking about funding criteria, eligibility, or application process.",
            "error": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    print("SmartFund AI Backend Starting...")
    print("Demo Mode: Functional prototype ready")
    print("CORS: Enabled for all origins")
    print("Storage: In-memory (perfect for demos)")
    print("Server running on: http://localhost:8001")
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)