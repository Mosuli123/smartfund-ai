from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import json, os, uuid, hashlib, logging
from datetime import datetime, timedelta
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
import io, base64

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Government Funding Intelligence & Access Platform",
    description="Four Horsemen Technologies | SITA GovTech Hackathon 2026",
    version="1.0.0",
    docs_url="/api/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Data Models ──────────────────────────────────────────────────────────────

class SMEProfile(BaseModel):
    business_name: str
    cipc_registration_number: str
    industry: str
    funding_amount: int
    location: str
    years_in_operation: int
    business_type: str
    annual_turnover: int
    employee_count: int
    funding_purpose: str
    ownership_type: Optional[str] = "General"
    business_stage: Optional[str] = "Growth"
    contact_email: Optional[str] = ""
    user_id: Optional[str] = "demo_user"

class LoginRequest(BaseModel):
    username: str
    password: str

class AIQuery(BaseModel):
    message: str
    user_id: Optional[str] = "demo_user"

# ── In-memory storage ─────────────────────────────────────────────────────────

users_db = {
    "smme_demo": {
        "password": hashlib.sha256("demo123".encode()).hexdigest(),
        "role": "smme", "name": "Demo SMME User",
        "email": "smme@demo.gov.za", "verified": True
    },
    "gov_analyst": {
        "password": hashlib.sha256("govpass".encode()).hexdigest(),
        "role": "government", "name": "Government Analyst",
        "email": "analyst@gov.za", "verified": True
    },
    "admin": {
        "password": hashlib.sha256("admin123".encode()).hexdigest(),
        "role": "admin", "name": "System Administrator",
        "email": "admin@platform.gov.za", "verified": True
    },
    # Legacy demo credentials
    "demo": {
        "password": hashlib.sha256("password123".encode()).hexdigest(),
        "role": "smme", "name": "Demo User",
        "email": "demo@platform.gov.za", "verified": True
    }
}

profiles_db = {}
sessions_db = {}
applications_db = []

# ── Helpers ───────────────────────────────────────────────────────────────────

def load_programmes():
    try:
        path = os.path.join(os.path.dirname(__file__), "data", "funding_opportunities.json")
        with open(path, "r") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Failed to load programmes: {e}")
        return []

programmes = load_programmes()

def create_token(username: str) -> str:
    token = str(uuid.uuid4())
    sessions_db[token] = {
        "username": username,
        "role": users_db[username]["role"],
        "expires": datetime.now() + timedelta(hours=24)
    }
    return token

def ai_match_score(profile: SMEProfile, programme: dict) -> tuple:
    """
    Explainable AI matching engine.
    Returns (score, met_criteria, unmet_criteria, explanation, next_action)
    """
    score = 0
    met = []
    unmet = []

    # 1. Sector alignment (30 pts)
    sectors = programme.get("sector", [])
    if profile.industry in sectors or "Any" in sectors:
        score += 30
        met.append(f"Sector '{profile.industry}' aligns with programme focus")
    else:
        unmet.append(f"Sector '{profile.industry}' not in target sectors: {', '.join(sectors)}")

    # 2. Funding amount (25 pts)
    mn, mx = programme.get("min_amount", 0), programme.get("max_amount", 0)
    if mn <= profile.funding_amount <= mx:
        score += 25
        met.append(f"Funding requirement R{profile.funding_amount:,} within programme range")
    elif profile.funding_amount < mn:
        score += 8
        unmet.append(f"Funding requirement R{profile.funding_amount:,} below minimum R{mn:,}")
    else:
        score += 10
        unmet.append(f"Funding requirement R{profile.funding_amount:,} exceeds maximum R{mx:,}")

    # 3. Geographic eligibility (20 pts)
    locs = programme.get("location", [])
    if profile.location in locs or "All Provinces" in locs:
        score += 20
        met.append(f"Location '{profile.location}' is eligible")
    else:
        unmet.append(f"Location '{profile.location}' not in eligible areas")

    # 4. Business maturity (15 pts)
    min_y, max_y = programme.get("min_years", 0), programme.get("max_years", 99)
    if min_y <= profile.years_in_operation <= max_y:
        score += 15
        met.append(f"Business age ({profile.years_in_operation} yrs) meets requirements")
    else:
        unmet.append(f"Business age ({profile.years_in_operation} yrs) outside required range ({min_y}–{max_y} yrs)")

    # 5. Ownership bonus (10 pts)
    ownership = profile.ownership_type or ""
    name = programme.get("name", "")
    if "Women" in name and "women" in ownership.lower():
        score += 10
        met.append("Women ownership aligns with programme focus")
    elif "Black" in name and "black" in ownership.lower():
        score += 10
        met.append("Black ownership aligns with programme focus")
    elif "Youth" in name and profile.years_in_operation <= 2:
        score += 10
        met.append("Business stage aligns with youth programme")
    else:
        score += 5  # partial

    score = min(score, 100)

    # Build explanation
    explanation = (
        f"Your business was matched because "
        + (f"your sector, location and funding requirement align with this programme's eligibility criteria." if score >= 70
           else f"some criteria align but there are gaps to address before applying.")
    )

    # Next action
    if score >= 80:
        next_action = "Review eligibility requirements and prepare your application documents."
    elif score >= 60:
        next_action = "Address the identified gaps, then proceed with your application."
    else:
        next_action = "This programme may not be the best fit. Review other recommendations."

    return score, met, unmet, explanation, next_action

# ── Auth Endpoints ────────────────────────────────────────────────────────────

@app.post("/api/auth/login")
async def login(req: LoginRequest):
    pw_hash = hashlib.sha256(req.password.encode()).hexdigest()
    user = users_db.get(req.username)
    if not user or user["password"] != pw_hash:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(req.username)
    return {
        "success": True,
        "token": token,
        "user": {
            "username": req.username,
            "name": user["name"],
            "role": user["role"],
            "email": user["email"]
        }
    }

# ── Profile Endpoints ─────────────────────────────────────────────────────────

@app.post("/api/profile")
async def save_profile(profile: SMEProfile):
    profiles_db[profile.user_id] = {**profile.dict(), "updated_at": datetime.now().isoformat()}
    logger.info(f"Profile saved: {profile.business_name}")
    return {"success": True, "message": "Business profile saved successfully"}

@app.get("/api/profile/{user_id}")
async def get_profile(user_id: str):
    return profiles_db.get(user_id)

# ── Funding Programme Endpoints ───────────────────────────────────────────────

@app.get("/api/funding-programmes")
async def get_programmes():
    return programmes

@app.get("/api/funding-programmes/{programme_id}")
async def get_programme(programme_id: int):
    prog = next((p for p in programmes if p["id"] == programme_id), None)
    if not prog:
        raise HTTPException(status_code=404, detail="Programme not found")
    return prog

# ── AI Matching Endpoint ──────────────────────────────────────────────────────

@app.post("/api/match-funding")
async def match_funding(profile: SMEProfile):
    results = []
    for prog in programmes:
        score, met, unmet, explanation, next_action = ai_match_score(profile, prog)
        if score >= 20:
            results.append({
                "id": prog["id"],
                "name": prog["name"],
                "short_name": prog.get("short_name", ""),
                "government_entity": prog.get("government_entity", ""),
                "type": prog["type"],
                "match_score": score,
                "description": prog["description"],
                "min_amount": prog["min_amount"],
                "max_amount": prog["max_amount"],
                "eligibility": prog["eligibility"],
                "required_documents": prog.get("required_documents", []),
                "application_status": prog.get("application_status", "Open"),
                "application_deadline": prog.get("application_deadline", ""),
                "contact_email": prog.get("contact_email", ""),
                # Explainable AI fields
                "criteria_met": met,
                "criteria_unmet": unmet,
                "explanation": explanation,
                "next_action": next_action,
                "ai_assisted": True
            })
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return {"matches": results, "total": len(results), "profile_summary": profile.business_name}

# ── Application Endpoints ─────────────────────────────────────────────────────

@app.post("/api/applications/submit")
async def submit_application(data: dict):
    app_id = f"APP-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:6].upper()}"
    application = {
        "id": app_id,
        "status": "Submitted",
        "submitted_at": datetime.now().isoformat(),
        **data
    }
    applications_db.append(application)
    return {"success": True, "application_id": app_id, "status": "Submitted"}

@app.get("/api/applications")
async def get_applications(user_id: str = "demo_user"):
    return [a for a in applications_db if a.get("user_id") == user_id]

# ── Government Intelligence Endpoints ────────────────────────────────────────

@app.get("/api/intelligence/overview")
async def intelligence_overview():
    """Government intelligence dashboard data — prototype dataset"""
    return {
        "disclaimer": "Prototype Data — Demonstration Dataset",
        "generated_at": datetime.now().isoformat(),
        "kpis": {
            "total_programmes": len(programmes),
            "total_applications": 4872,
            "applications_this_month": 312,
            "approved_applications": 2104,
            "pending_applications": 1438,
            "rejected_applications": 1330,
            "total_funding_demand_rands": 8_420_000_000,
            "total_funding_disbursed_rands": 7_140_000_000,
            "avg_processing_days": 47,
            "smmes_assisted": 2104,
            "funding_gap_rands": 1_280_000_000,
            "approval_rate_percent": 43.2
        },
        "sector_demand": [
            {"sector": "Agriculture & Agro-processing", "applications": 1124, "demand_rands": 2100000000, "approved": 487, "approval_rate": 43},
            {"sector": "Technology & ICT", "applications": 876, "demand_rands": 1800000000, "approved": 412, "approval_rate": 47},
            {"sector": "Manufacturing", "applications": 743, "demand_rands": 1650000000, "approved": 298, "approval_rate": 40},
            {"sector": "Retail & Services", "applications": 612, "demand_rands": 820000000, "approved": 310, "approval_rate": 51},
            {"sector": "Green Economy", "applications": 487, "demand_rands": 1200000000, "approved": 178, "approval_rate": 37},
            {"sector": "Tourism & Hospitality", "applications": 398, "demand_rands": 540000000, "approved": 187, "approval_rate": 47},
            {"sector": "Construction", "applications": 312, "demand_rands": 680000000, "approved": 124, "approval_rate": 40},
            {"sector": "Other", "applications": 320, "demand_rands": 430000000, "approved": 108, "approval_rate": 34}
        ],
        "geographic_demand": [
            {"province": "Gauteng", "applications": 1342, "demand_rands": 2800000000, "smmes": 1342, "funding_gap": 420000000},
            {"province": "KwaZulu-Natal", "applications": 876, "demand_rands": 1600000000, "smmes": 876, "funding_gap": 280000000},
            {"province": "Western Cape", "applications": 743, "demand_rands": 1400000000, "smmes": 743, "funding_gap": 180000000},
            {"province": "Eastern Cape", "applications": 612, "demand_rands": 980000000, "smmes": 612, "funding_gap": 210000000},
            {"province": "Limpopo", "applications": 487, "demand_rands": 620000000, "smmes": 487, "funding_gap": 140000000},
            {"province": "Mpumalanga", "applications": 312, "demand_rands": 480000000, "smmes": 312, "funding_gap": 95000000},
            {"province": "North West", "applications": 287, "demand_rands": 340000000, "smmes": 287, "funding_gap": 88000000},
            {"province": "Free State", "applications": 143, "demand_rands": 140000000, "smmes": 143, "funding_gap": 42000000},
            {"province": "Northern Cape", "applications": 70, "demand_rands": 60000000, "smmes": 70, "funding_gap": 25000000}
        ],
        "eligibility_barriers": [
            {"barrier": "Insufficient Documentation", "count": 876, "percentage": 28},
            {"barrier": "Business Age Requirements", "count": 612, "percentage": 20},
            {"barrier": "Turnover Requirements", "count": 487, "percentage": 16},
            {"barrier": "Sector Restrictions", "count": 398, "percentage": 13},
            {"barrier": "Credit Requirements", "count": 312, "percentage": 10},
            {"barrier": "Compliance Requirements", "count": 187, "percentage": 6},
            {"barrier": "Incomplete Applications", "count": 218, "percentage": 7}
        ],
        "programme_performance": [
            {"programme": "SEFA SMME Loan", "applications": 1243, "approved": 684, "rejected": 312, "pending": 247, "approval_rate": 55, "disbursed_rands": 2800000000},
            {"programme": "YES Fund", "applications": 987, "approved": 612, "rejected": 198, "pending": 177, "approval_rate": 62, "disbursed_rands": 980000000},
            {"programme": "Women Empowerment Fund", "applications": 743, "approved": 357, "rejected": 243, "pending": 143, "approval_rate": 48, "disbursed_rands": 420000000},
            {"programme": "SEDA Technology Programme", "applications": 612, "approved": 257, "rejected": 243, "pending": 112, "approval_rate": 42, "disbursed_rands": 187000000},
            {"programme": "Agro-Processing Support", "applications": 487, "approved": 185, "rejected": 198, "pending": 104, "approval_rate": 38, "disbursed_rands": 520000000},
            {"programme": "Green Economy Fund", "applications": 398, "approved": 139, "rejected": 187, "pending": 72, "approval_rate": 35, "disbursed_rands": 890000000},
            {"programme": "Black Industrialists Scheme", "applications": 312, "approved": 87, "rejected": 168, "pending": 57, "approval_rate": 28, "disbursed_rands": 1340000000},
            {"programme": "Tourism Support", "applications": 90, "approved": 40, "rejected": 30, "pending": 20, "approval_rate": 44, "disbursed_rands": 310000000}
        ],
        "monthly_trend": [
            {"month": "Aug 2025", "applications": 198, "approved": 87, "demand_rands": 420000000},
            {"month": "Sep 2025", "applications": 234, "approved": 102, "demand_rands": 510000000},
            {"month": "Oct 2025", "applications": 267, "approved": 118, "demand_rands": 580000000},
            {"month": "Nov 2025", "applications": 289, "approved": 124, "demand_rands": 620000000},
            {"month": "Dec 2025", "applications": 198, "approved": 87, "demand_rands": 430000000},
            {"month": "Jan 2026", "applications": 312, "approved": 138, "demand_rands": 680000000}
        ]
    }

# ── PDF Generation ────────────────────────────────────────────────────────────

@app.post("/api/generate-application")
async def generate_application(profile: SMEProfile):
    try:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        styles = getSampleStyleSheet()
        story = []

        story.append(Paragraph("GOVERNMENT FUNDING APPLICATION DRAFT", styles['Title']))
        story.append(Paragraph("Government Funding Intelligence & Access Platform", styles['Normal']))
        story.append(Paragraph("Four Horsemen Technologies | SITA GovTech Hackathon 2026", styles['Normal']))
        story.append(Spacer(1, 20))
        story.append(Paragraph(f"<b>Business:</b> {profile.business_name}", styles['Normal']))
        story.append(Paragraph(f"<b>CIPC:</b> {profile.cipc_registration_number}", styles['Normal']))
        story.append(Paragraph(f"<b>Industry:</b> {profile.industry}", styles['Normal']))
        story.append(Paragraph(f"<b>Funding Required:</b> R{profile.funding_amount:,}", styles['Normal']))
        story.append(Paragraph(f"<b>Purpose:</b> {profile.funding_purpose}", styles['Normal']))
        story.append(Spacer(1, 12))
        story.append(Paragraph("<b>Executive Summary</b>", styles['Heading2']))
        story.append(Paragraph(
            f"{profile.business_name} is a {profile.business_type} operating in the {profile.industry} sector "
            f"for {profile.years_in_operation} years in {profile.location}. We are seeking R{profile.funding_amount:,} "
            f"for {profile.funding_purpose}.", styles['Normal']))
        story.append(Spacer(1, 12))
        story.append(Paragraph("<b>Note:</b> This is an AI-assisted draft. All information must be verified before submission.", styles['Normal']))

        doc.build(story)
        buffer.seek(0)
        pdf_b64 = base64.b64encode(buffer.getvalue()).decode()
        buffer.close()

        return {"success": True, "pdf_data": pdf_b64, "filename": f"{profile.business_name}_Application.pdf"}
    except Exception as e:
        logger.error(f"PDF generation failed: {e}")
        return {"success": False, "message": str(e)}

# ── Health ────────────────────────────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "platform": "Government Funding Intelligence & Access Platform",
        "version": "1.0.0",
        "built_by": "Four Horsemen Technologies",
        "event": "SITA GovTech Hackathon 2026"
    }

if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print("  Government Funding Intelligence & Access Platform")
    print("  Four Horsemen Technologies")
    print("  SITA GovTech Hackathon 2026")
    print("=" * 60)
    uvicorn.run("main-govtech:app", host="0.0.0.0", port=8600, reload=True)
