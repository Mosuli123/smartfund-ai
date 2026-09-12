# Government Funding Intelligence & Access Platform

> **SITA GovTech Hackathon 2026** — Developed by Four Horsemen Technologies

---

## The Problem

Over **R500 billion** in South African government funding goes unclaimed or underutilised every year.

Not because the money isn't there — but because:

- SMMEs don't know which programmes they qualify for
- Applications are complex, time-consuming, and often rejected on technicalities
- Government has no real-time visibility into funding demand, gaps, or barriers
- There is no feedback loop between SMME outcomes and programme design

---

## The Solution

A four-tier intelligent platform that connects SMMEs to government funding **and** transforms every interaction into actionable intelligence for government decision-makers.

> **Access for SMMEs. Intelligence for Government. Better Decisions for South Africa.**

---

## Platform Architecture — Four Tiers

### Tier 1 — SMME Portal (`/smme/*`)

The public-facing layer for small business owners.

- CIPC registration number + Director ID verification
- Business profile capture (industry, size, location, turnover, funding purpose)
- AI-powered funding matching with percentage scores and plain-language explanations
- One-click application submission with auto-generated application drafts
- Application tracking, document upload, and notifications
- AI Assistant chatbot for guided support

**Demo credentials:** `demo / password123`

---

### Tier 2 — Funding Provider Admin (`/admin/*`)

For government funding programme administrators (SEDA, IDC, TIA, DAFF, NEF, DBSA, TEP, NYDA).

- Dashboard with live KPIs: total applications, approval rates, pending backlog, disbursement
- Manage 8 national SA government funding programmes
- Full application review workflow: AI match score display, criteria met vs gaps, review notes
- Approve / Decline / Request More Info actions with audit trail
- Programme performance reports

**Demo credentials:** `funding_admin / admin2026`

---

### Tier 3 — Government Intelligence Portal (`/gov/*`)

The strategic intelligence layer for policy analysts and government officials.

- **Overview**: 8 national KPIs — applications, approvals, funding demand vs disbursed, SMMEs assisted
- **Sector Intelligence**: Funding demand ranked by industry with demand bar visualisation
- **Geographic Intelligence**: Province-by-province gap analysis with Critical / High / Medium / Low ratings
- **Programme Performance**: Approval rates, disbursement vs allocation, AI-generated insights and recommendations per programme
- **Eligibility Barriers**: Top barriers preventing applications from progressing with policy recommendations
- The Intelligence Feedback Loop — every SMME interaction generates data that improves programme design

**Demo credentials:** `gov_analyst / govtech2026`

---

### Tier 4 — SITA System Administration (`/sita-admin/*`)

Platform-wide infrastructure management operated by SITA.

- User management and access control across all tiers
- Funding provider admin approval and onboarding
- System analytics, audit logs, and platform health
- System configuration (SMTP, integrations, environment settings)
- Security settings and compliance reporting
- Full platform reports with export

**Demo credentials:** `sita_super_admin / SITA2026!`

---

## The Intelligence Feedback Loop

```text
Government Programmes → SMME Discovery → Applications → Outcomes
        ↑                                                    ↓
Improved Programmes ← Better Decisions ← Intelligence ← Data
```

Every application submitted, every rejection reason captured, every funding gap identified — feeds back into the intelligence layer so government can make evidence-based decisions about programme design, eligibility criteria, and resource allocation.

---

## Technology Stack

### Frontend

- React.js 18 with React Router v6
- Tailwind CSS + custom inline styles (navy `#0a2240` / gold `#c8922a` design system)
- localStorage-based session management (demo-ready, no backend dependency)
- Context API for theme and auth state

### Backend

- Python FastAPI with Uvicorn
- Pydantic v2 for data validation
- ReportLab for PDF generation
- CORS middleware for cross-origin requests

### Data

- JSON-based mock funding opportunities
- In-memory storage for demo purposes
- 8 real SA government funding programmes as reference data

---

## Quick Start

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
# Runs on http://localhost:8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

---

## Demo Flow (Recommended Pitch Order)

### 1. Start at Role Selection (`/`)

Show the four entry points — this immediately signals the platform's scope.

### 2. SMME Journey (~2 min)

- Login as `demo / password123`
- Show the business profile and AI funding match scores with explanations
- Submit an application — show the auto-generated draft

### 3. Funding Provider Review (~1 min)

- Login as `funding_admin / admin2026`
- Show the application just submitted — AI score, criteria met, gaps
- Approve it

### 4. Government Intelligence — the differentiator (~2 min)

- Login as `gov_analyst / govtech2026`
- Show the Geographic Intelligence tab — Northern Cape at 10% demand met (Critical)
- Show Programme Performance — AI-generated insights and policy recommendations
- Show the Eligibility Barriers tab — documentation is the #1 barrier at 38%
- Explain the feedback loop

### 5. Close with the system view

- Mention SITA as the infrastructure layer managing all tiers
- Emphasise: this is not just an app — it's a national funding intelligence system

---

## National Funding Programmes Included

| Programme | Organisation | Sector |
| --- | --- | --- |
| SMME Growth Fund | SEDA | All sectors |
| Industrial Development Fund | IDC | Manufacturing |
| Technology Innovation Fund | TIA | Technology / ICT |
| Agricultural Development Grant | DAFF | Agriculture |
| Black Industrialists Fund | NEF | All sectors |
| Infrastructure Development Fund | DBSA | Infrastructure |
| Tourism Enterprise Programme | TEP | Tourism |
| Youth Enterprise Scheme | NYDA | Youth-owned businesses |

---

## AI Matching Algorithm

Scores each SMME against each programme across six weighted criteria:

| Criterion | Weight |
| --- | --- |
| Industry / sector match | 30% |
| Funding amount vs programme range | 25% |
| Geographic eligibility | 15% |
| Business age vs requirements | 10% |
| Company size (employees) | 10% |
| Funding purpose alignment | 10% |

Scores above 80% = Excellent match. Each score includes a plain-language explanation of why the match was made and what gaps exist.

---

## Key Demo Credentials Summary

| Portal | Username | Password |
| --- | --- | --- |
| SMME Portal | `demo` | `password123` |
| Funding Provider Admin | `funding_admin` | `admin2026` |
| Government Intelligence | `gov_analyst` | `govtech2026` |
| SITA System Admin | `sita_super_admin` | `SITA2026!` |

---

## Project Structure

```text
smartfund-ai/
├── backend/
│   ├── main.py                        # FastAPI application
│   ├── data/funding_opportunities.json
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.js              # SMME portal navbar
│       │   ├── AdminNavbar.js         # Funding provider navbar (navy/gold)
│       │   └── ElidzAdminNavbar.js    # SITA system admin navbar (navy/green)
│       ├── pages/
│       │   ├── SMMELogin.js / SMMERegister.js
│       │   ├── Home.js / Profile.js / FundingOpportunities.js
│       │   ├── Applications.js / DocumentUpload.js
│       │   ├── AdminDashboard.js / ManageOpportunities.js / ReviewApplications.js
│       │   ├── GovLogin.js / GovDashboard.js
│       │   └── ElidzAdminLogin.js / ElidzAdminDashboard.js
│       └── App.js                     # Route definitions for all four tiers
└── README.md
```

---

## Troubleshooting

| Issue | Fix |
| --- | --- |
| CORS errors | Ensure backend is running on port 8000 |
| Blank page after login | Clear localStorage and refresh |
| PDF generation fails | Run `pip install reportlab` in backend |
| `npm start` fails | Run `npm install` first |

---

## Disclaimer

This is a prototype built for the SITA GovTech Hackathon 2026. All data is simulated for demonstration purposes. Not an official government platform.

---

*Four Horsemen Technologies — Built for SMME funding accessibility and government intelligence.*
