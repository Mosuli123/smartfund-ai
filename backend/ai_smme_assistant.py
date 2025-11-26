import json
import random
from datetime import datetime, timedelta
from typing import Dict, List, Any

class AISMMEAssistant:
    def __init__(self):
        self.auto_application_queue = []
        self.notification_queue = []
        self.success_patterns = {}
        
    def analyze_business_profile(self, profile: Dict) -> Dict:
        """AI analysis of SMME business profile for optimization"""
        analysis = {
            "profile_completeness": self.calculate_profile_completeness(profile),
            "funding_readiness": self.assess_funding_readiness(profile),
            "optimization_suggestions": self.generate_optimization_suggestions(profile),
            "success_probability": self.predict_funding_success(profile)
        }
        return analysis
    
    def calculate_profile_completeness(self, profile: Dict) -> Dict:
        """Calculate how complete the business profile is"""
        required_fields = [
            "businessName", "industry", "fundingAmount", 
            "yearsInOperation", "location", "businessDescription"
        ]
        
        completed = sum(1 for field in required_fields if profile.get(field))
        completeness_score = (completed / len(required_fields)) * 100
        
        missing_fields = [field for field in required_fields if not profile.get(field)]
        
        return {
            "score": round(completeness_score),
            "completed_fields": completed,
            "total_fields": len(required_fields),
            "missing_fields": missing_fields,
            "status": "Complete" if completeness_score >= 90 else "Needs Improvement"
        }
    
    def assess_funding_readiness(self, profile: Dict) -> Dict:
        """AI assessment of funding readiness"""
        readiness_score = 0
        factors = []
        
        # Business maturity
        years = profile.get("yearsInOperation", 0)
        if years >= 2:
            readiness_score += 25
            factors.append("✓ Established business with track record")
        elif years >= 1:
            readiness_score += 15
            factors.append("⚠ Young business, consider building more history")
        else:
            factors.append("⚠ New business, may need additional documentation")
        
        # Industry alignment
        high_success_industries = ["Technology", "Manufacturing", "Agriculture", "Healthcare"]
        if profile.get("industry") in high_success_industries:
            readiness_score += 25
            factors.append("✓ Industry has high funding success rates")
        
        # Funding amount reasonableness
        amount = profile.get("fundingAmount", 0)
        if 25000 <= amount <= 500000:
            readiness_score += 25
            factors.append("✓ Funding amount in optimal range")
        elif amount > 500000:
            factors.append("⚠ High funding amount may require additional scrutiny")
        
        # Location advantage
        if profile.get("location") in ["Eastern Cape", "South Africa"]:
            readiness_score += 15
            factors.append("✓ Located in priority development region")
        
        # Profile completeness bonus
        completeness = self.calculate_profile_completeness(profile)
        if completeness["score"] >= 90:
            readiness_score += 10
            factors.append("✓ Complete business profile")
        
        return {
            "score": min(readiness_score, 100),
            "level": "High" if readiness_score >= 75 else "Medium" if readiness_score >= 50 else "Low",
            "factors": factors
        }
    
    def generate_optimization_suggestions(self, profile: Dict) -> List[str]:
        """AI-generated suggestions to improve funding chances"""
        suggestions = []
        
        completeness = self.calculate_profile_completeness(profile)
        if completeness["score"] < 90:
            suggestions.append(f"Complete missing profile fields: {', '.join(completeness['missing_fields'])}")
        
        years = profile.get("yearsInOperation", 0)
        if years < 1:
            suggestions.append("Consider documenting any business activities or pilot projects to strengthen your application")
        
        amount = profile.get("fundingAmount", 0)
        if amount > 500000:
            suggestions.append("Consider breaking large funding requests into phases for better approval chances")
        elif amount < 25000:
            suggestions.append("Ensure funding amount covers all necessary business expenses")
        
        if not profile.get("businessDescription"):
            suggestions.append("Add detailed business description highlighting unique value proposition")
        
        industry = profile.get("industry")
        if industry in ["Technology", "Manufacturing"]:
            suggestions.append("Emphasize innovation and job creation potential in your applications")
        elif industry == "Agriculture":
            suggestions.append("Highlight sustainability and food security contributions")
        
        return suggestions
    
    def predict_funding_success(self, profile: Dict) -> Dict:
        """AI prediction of funding success probability"""
        readiness = self.assess_funding_readiness(profile)
        completeness = self.calculate_profile_completeness(profile)
        
        base_probability = (readiness["score"] + completeness["score"]) / 2
        
        # Industry multipliers
        industry_multipliers = {
            "Technology": 1.2,
            "Manufacturing": 1.1,
            "Agriculture": 1.15,
            "Healthcare": 1.1,
            "Services": 0.95,
            "Retail": 0.9
        }
        
        multiplier = industry_multipliers.get(profile.get("industry"), 1.0)
        final_probability = min(base_probability * multiplier, 95)
        
        return {
            "probability": round(final_probability),
            "confidence": "High" if final_probability >= 75 else "Medium" if final_probability >= 50 else "Low",
            "recommendation": self.get_success_recommendation(final_probability)
        }
    
    def get_success_recommendation(self, probability: float) -> str:
        """Get recommendation based on success probability"""
        if probability >= 80:
            return "Excellent funding prospects! Ready to apply for multiple opportunities."
        elif probability >= 65:
            return "Good funding potential. Consider applying to 2-3 suitable opportunities."
        elif probability >= 50:
            return "Moderate prospects. Focus on improving profile before applying."
        else:
            return "Low success probability. Strengthen business profile and consider mentorship."
    
    def auto_scan_opportunities(self, profile: Dict, opportunities: List[Dict]) -> List[Dict]:
        """AI automatically scans and matches funding opportunities"""
        matched_opportunities = []
        
        for opportunity in opportunities:
            match_score = self.calculate_opportunity_match(profile, opportunity)
            if match_score >= 60:  # Auto-apply threshold
                auto_application = self.generate_auto_application(profile, opportunity, match_score)
                matched_opportunities.append({
                    "opportunity": opportunity,
                    "match_score": match_score,
                    "auto_application": auto_application,
                    "status": "Ready for Review",
                    "ai_confidence": "High" if match_score >= 80 else "Medium"
                })
        
        return sorted(matched_opportunities, key=lambda x: x["match_score"], reverse=True)
    
    def calculate_opportunity_match(self, profile: Dict, opportunity: Dict) -> int:
        """Calculate match score between profile and opportunity"""
        score = 0
        
        # Industry match
        if profile.get("industry") in opportunity.get("sector", []):
            score += 40
        
        # Funding amount match
        amount = profile.get("fundingAmount", 0)
        if opportunity.get("min_amount", 0) <= amount <= opportunity.get("max_amount", float('inf')):
            score += 30
        
        # Location match
        if profile.get("location") in opportunity.get("location", []):
            score += 20
        
        # Business age match
        years = profile.get("yearsInOperation", 0)
        if opportunity.get("min_years", 0) <= years <= opportunity.get("max_years", 100):
            score += 10
        
        return score
    
    def generate_auto_application(self, profile: Dict, opportunity: Dict, match_score: int) -> Dict:
        """AI generates application draft automatically"""
        return {
            "opportunity_name": opportunity["name"],
            "business_name": profile.get("businessName", ""),
            "funding_amount": profile.get("fundingAmount", 0),
            "application_text": self.generate_application_text(profile, opportunity),
            "match_explanation": self.explain_match(profile, opportunity, match_score),
            "required_documents": self.identify_required_documents(opportunity),
            "submission_deadline": self.calculate_deadline(opportunity),
            "ai_generated": True,
            "created_at": datetime.now().isoformat()
        }
    
    def generate_application_text(self, profile: Dict, opportunity: Dict) -> str:
        """AI generates personalized application text"""
        business_name = profile.get("businessName", "Our Business")
        industry = profile.get("industry", "business")
        years = profile.get("yearsInOperation", 0)
        amount = profile.get("fundingAmount", 0)
        
        return f"""Dear {opportunity["name"]} Review Committee,

I am writing to apply for funding through the {opportunity["name"]} program on behalf of {business_name}, a {industry.lower()} business with {years} years of operational experience.

BUSINESS OVERVIEW:
{business_name} operates in the {industry} sector and is seeking R{amount:,} in funding to support our growth and expansion plans. Our business aligns perfectly with your program's focus on {', '.join(opportunity.get('sector', []))}.

FUNDING UTILIZATION:
The requested funding will be strategically deployed to:
- Expand operational capacity and infrastructure
- Enhance product/service offerings
- Create sustainable employment opportunities
- Contribute to economic development in the Eastern Cape region

ALIGNMENT WITH PROGRAM GOALS:
Our business model directly supports the objectives of {opportunity["name"]} by:
- Operating within your target sectors: {', '.join(opportunity.get('sector', []))}
- Meeting the funding range requirements (R{opportunity.get('min_amount', 0):,} - R{opportunity.get('max_amount', 0):,})
- Contributing to regional economic development

We are committed to transparent reporting and look forward to partnering with {opportunity["name"]} to achieve mutual success.

Thank you for your consideration.

Sincerely,
{business_name} Management Team

---
This application was intelligently generated by SmartFund AI based on your business profile and optimized for this specific opportunity."""
    
    def explain_match(self, profile: Dict, opportunity: Dict, score: int) -> str:
        """Explain why this opportunity matches the business"""
        explanations = []
        
        if profile.get("industry") in opportunity.get("sector", []):
            explanations.append(f"✓ Perfect industry match: {profile.get('industry')}")
        
        amount = profile.get("fundingAmount", 0)
        if opportunity.get("min_amount", 0) <= amount <= opportunity.get("max_amount", float('inf')):
            explanations.append(f"✓ Funding amount fits perfectly: R{amount:,}")
        
        if profile.get("location") in opportunity.get("location", []):
            explanations.append(f"✓ Location eligibility: {profile.get('location')}")
        
        years = profile.get("yearsInOperation", 0)
        if opportunity.get("min_years", 0) <= years:
            explanations.append(f"✓ Business experience meets requirements: {years} years")
        
        return f"Match Score: {score}%\n" + "\n".join(explanations)
    
    def identify_required_documents(self, opportunity: Dict) -> List[str]:
        """Identify documents needed for this opportunity"""
        standard_docs = [
            "CIPC Certificate of Incorporation",
            "Tax Clearance Certificate", 
            "Bank statements (6 months)",
            "Business plan",
            "Financial projections"
        ]
        
        # Add opportunity-specific documents
        if opportunity.get("type") == "Grant":
            standard_docs.append("Proof of business premises")
        
        if "BEE" in opportunity.get("eligibility", ""):
            standard_docs.append("BEE Certificate")
        
        return standard_docs
    
    def calculate_deadline(self, opportunity: Dict) -> str:
        """Calculate application deadline"""
        # Simulate deadline calculation
        deadline = datetime.now() + timedelta(days=random.randint(14, 45))
        return deadline.strftime("%Y-%m-%d")
    
    def generate_smart_notifications(self, profile: Dict, opportunities: List[Dict]) -> List[Dict]:
        """Generate intelligent notifications for SMME"""
        notifications = []
        
        # New opportunity alerts
        matched_ops = self.auto_scan_opportunities(profile, opportunities)
        if matched_ops:
            notifications.append({
                "type": "opportunity_match",
                "title": f"🎯 {len(matched_ops)} New Funding Matches Found!",
                "message": f"AI found {len(matched_ops)} opportunities matching your profile. Applications ready for review.",
                "action": "Review Auto-Generated Applications",
                "priority": "high",
                "created_at": datetime.now().isoformat()
            })
        
        # Profile optimization alerts
        completeness = self.calculate_profile_completeness(profile)
        if completeness["score"] < 90:
            notifications.append({
                "type": "profile_optimization",
                "title": "📋 Profile Optimization Opportunity",
                "message": f"Complete {len(completeness['missing_fields'])} more fields to increase funding success by 15%",
                "action": "Complete Profile",
                "priority": "medium",
                "created_at": datetime.now().isoformat()
            })
        
        # Success probability alerts
        success = self.predict_funding_success(profile)
        if success["probability"] >= 75:
            notifications.append({
                "type": "success_alert",
                "title": "🚀 High Success Probability Detected!",
                "message": f"{success['probability']}% funding success probability. Perfect time to apply!",
                "action": "View Recommendations",
                "priority": "high",
                "created_at": datetime.now().isoformat()
            })
        
        return notifications
    
    def generate_personalized_insights(self, profile: Dict) -> Dict:
        """Generate personalized insights for SMME dashboard"""
        analysis = self.analyze_business_profile(profile)
        
        return {
            "profile_analysis": analysis,
            "quick_stats": {
                "profile_completeness": f"{analysis['profile_completeness']['score']}%",
                "funding_readiness": analysis['funding_readiness']['level'],
                "success_probability": f"{analysis['success_probability']['probability']}%",
                "ai_confidence": analysis['success_probability']['confidence']
            },
            "next_actions": [
                "Review AI-generated applications",
                "Complete missing profile fields",
                "Upload required documents",
                "Schedule funding consultation"
            ],
            "ai_recommendations": analysis['optimization_suggestions'][:3]
        }