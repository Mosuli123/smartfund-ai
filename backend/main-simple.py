from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import json
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import io
import base64

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
    # Create PDF in memory
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    
    # Add content to PDF
    p.drawString(100, 750, "FUNDING APPLICATION DRAFT")
    p.drawString(100, 720, f"Business Name: {profile.get('business_name', 'N/A')}")
    p.drawString(100, 700, f"Industry: {profile.get('industry', 'N/A')}")
    p.drawString(100, 680, f"Funding Required: R{profile.get('funding_amount', 0):,}")
    p.drawString(100, 660, f"Location: {profile.get('location', 'N/A')}")
    p.drawString(100, 640, f"Years in Operation: {profile.get('years_in_operation', 0)}")
    
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
        "filename": f"{profile.get('business_name', 'business')}_application_draft.pdf"
    }

@app.get("/api/funding-opportunities")
async def get_funding_opportunities():
    return funding_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)