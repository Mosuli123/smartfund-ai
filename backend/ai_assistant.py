import json
import re
from typing import Dict, List, Any

class FundingAIAssistant:
    def __init__(self):
        self.funding_data = self.load_funding_data()
        self.user_profiles = {}
        
    def load_funding_data(self):
        """Load funding opportunities data"""
        try:
            with open("data/funding_opportunities.json", "r") as f:
                return json.load(f)
        except FileNotFoundError:
            return self.get_default_funding_data()
    
    def get_default_funding_data(self):
        """Default funding data if file not found"""
        return [
            {
                "id": 1,
                "name": "Small Business Innovation Grant",
                "type": "Grant",
                "sector": ["Technology", "Healthcare", "Manufacturing"],
                "min_amount": 50000,
                "max_amount": 500000,
                "location": ["Eastern Cape", "National"],
                "min_years": 1,
                "max_years": 10,
                "description": "Supporting innovative small businesses with growth potential",
                "eligibility": "CIPC registered, innovative business model, job creation potential"
            }
        ]
    
    def analyze_user_query(self, query: str, user_profile: Dict = None) -> str:
        """Analyze user query and generate appropriate response"""
        query_lower = query.lower()
        
        # Enhanced intent classification with more keywords
        if any(word in query_lower for word in ['criteria', 'requirement', 'need', 'must', 'qualify for', 'meet']):
            return self.get_criteria_response(user_profile)
        elif any(word in query_lower for word in ['eligible', 'qualify', 'can i', 'do i qualify', 'am i eligible']):
            return self.get_eligibility_response(user_profile)
        elif any(word in query_lower for word in ['apply', 'application', 'process', 'how to', 'steps', 'procedure']):
            return self.get_application_process_response(user_profile)
        elif any(word in query_lower for word in ['document', 'paperwork', 'papers', 'files', 'certificates']):
            return self.get_document_requirements_response()
        elif any(word in query_lower for word in ['tips', 'advice', 'success', 'help', 'improve', 'better']):
            return self.get_success_tips_response(user_profile)
        elif any(word in query_lower for word in ['amount', 'money', 'funding', 'rand', 'cost', 'price']):
            return self.get_funding_amount_response(user_profile)
        elif any(word in query_lower for word in ['opportunities', 'funds', 'grants', 'available', 'options']):
            return self.get_opportunities_response(user_profile)
        elif any(word in query_lower for word in ['timeline', 'time', 'when', 'how long', 'duration']):
            return self.get_timeline_response(user_profile)
        else:
            return self.get_general_response(user_profile)
    
    def get_criteria_response(self, user_profile: Dict = None) -> str:
        """Generate response about funding criteria"""
        response = "Here are the key funding criteria across available opportunities:\n\n"
        response += "**Universal Requirements:**\n"
        response += "• Valid CIPC registration and compliance\n"
        response += "• Tax clearance certificate (current)\n"
        response += "• Business operational for minimum period\n"
        response += "• Comprehensive business plan\n"
        response += "• Financial statements and projections\n"
        response += "• Proof of business premises\n\n"
        
        response += "**Specific Fund Criteria:**\n"
        for fund in self.funding_data[:3]:
            response += f"• **{fund['name']}:** {fund.get('eligibility', 'Standard SMME requirements')}\n"
        
        if user_profile:
            response += "\n**Your Profile Assessment:**\n"
            if user_profile.get('industry'):
                matching_funds = [f for f in self.funding_data if user_profile['industry'] in f.get('sector', [])]
                response += f"• Industry match: {len(matching_funds)}/{len(self.funding_data)} opportunities\n"
            
            if user_profile.get('yearsInOperation'):
                eligible_funds = [f for f in self.funding_data if f.get('min_years', 0) <= user_profile['yearsInOperation']]
                response += f"• Experience eligibility: {len(eligible_funds)}/{len(self.funding_data)} funds\n"
            
            if user_profile.get('fundingAmount'):
                amount_match = [f for f in self.funding_data if f.get('min_amount', 0) <= user_profile['fundingAmount'] <= f.get('max_amount', float('inf'))]
                response += f"• Amount eligibility: {len(amount_match)}/{len(self.funding_data)} funds\n"
        
        return response
    
    def get_eligibility_response(self, user_profile: Dict = None) -> str:
        """Generate eligibility assessment response"""
        if not user_profile:
            return "To provide an accurate eligibility assessment, I need your business profile information. Please complete your profile first."
        
        eligible_funds = []
        for fund in self.funding_data:
            score = self.calculate_eligibility_score(user_profile, fund)
            if score > 60:
                eligible_funds.append((fund, score))
        
        response = f"Based on your profile for {user_profile.get('businessName', 'your business')}:\n\n"
        
        if eligible_funds:
            response += "**You're likely eligible for:**\n"
            for fund, score in sorted(eligible_funds, key=lambda x: x[1], reverse=True):
                response += f"• {fund['name']} ({score}% match)\n"
        else:
            response += "**Recommendations to improve eligibility:**\n"
            response += "• Ensure all registration documents are current\n"
            response += "• Develop a comprehensive business plan\n"
            response += "• Consider partnerships to strengthen your application\n"
        
        return response
    
    def calculate_eligibility_score(self, profile: Dict, fund: Dict) -> int:
        """Calculate eligibility score for a specific fund"""
        score = 0
        
        # Industry match
        if profile.get('industry') in fund.get('sector', []):
            score += 40
        
        # Years in operation
        years = profile.get('yearsInOperation', 0)
        if fund.get('min_years', 0) <= years <= fund.get('max_years', 100):
            score += 30
        
        # Funding amount
        amount = profile.get('fundingAmount', 0)
        if fund.get('min_amount', 0) <= amount <= fund.get('max_amount', float('inf')):
            score += 30
        
        return min(score, 100)
    
    def get_application_process_response(self, user_profile: Dict = None) -> str:
        """Generate application process guidance"""
        response = "Here's your step-by-step funding application process:\n\n"
        response += "**Phase 1: Preparation**\n"
        response += "1. Complete business profile ✓\n" if user_profile else "1. Complete business profile (Required)\n"
        response += "2. Gather required documents\n"
        response += "3. Prepare detailed business plan\n"
        response += "4. Develop financial projections\n\n"
        
        response += "**Phase 2: Application**\n"
        response += "1. Use AI matching to find suitable opportunities\n"
        response += "2. Review eligibility criteria carefully\n"
        response += "3. Generate application draft using our system\n"
        response += "4. Customize application for specific fund\n\n"
        
        response += "**Phase 3: Submission & Follow-up**\n"
        response += "1. Submit complete application\n"
        response += "2. Track application status\n"
        response += "3. Respond promptly to queries\n"
        response += "4. Prepare for potential interviews\n"
        
        if user_profile:
            response += f"\n**Your Status:** Ready to proceed with matching and applications!"
        
        return response
    
    def get_document_requirements_response(self) -> str:
        """Generate document requirements response"""
        return """Required documents typically include:

**Essential Business Documents:**
• CIPC Certificate of Incorporation
• Business registration certificate
• Tax clearance certificate
• VAT registration (if applicable)

**Financial Documents:**
• Bank statements (6-12 months)
• Financial statements (audited if available)
• Cash flow projections
• Proof of business address

**Application-Specific Documents:**
• Detailed business plan
• Market analysis and research
• Job creation plan
• Skills development strategy
• Environmental impact assessment (if applicable)

**Additional Requirements:**
• BEE certificate (where applicable)
• Professional references
• Proof of business premises
• Insurance certificates

💡 **Pro Tip:** Start gathering these documents early. Our system can help generate some templates through the application draft feature."""
    
    def get_success_tips_response(self, user_profile: Dict = None) -> str:
        """Generate success tips response"""
        response = "Here are proven strategies for funding success:\n\n"
        response += "**Application Excellence:**\n"
        response += "• Be specific about how funds will be used\n"
        response += "• Show clear return on investment\n"
        response += "• Demonstrate market demand and validation\n"
        response += "• Highlight job creation and economic impact\n\n"
        
        if user_profile:
            industry = user_profile.get('industry')
            if industry == 'Technology':
                response += "**Tech Business Tips:**\n"
                response += "• Emphasize innovation and scalability\n"
                response += "• Show intellectual property potential\n"
                response += "• Highlight digital transformation impact\n\n"
            elif industry == 'Manufacturing':
                response += "**Manufacturing Tips:**\n"
                response += "• Focus on job creation potential\n"
                response += "• Highlight supply chain benefits\n"
                response += "• Show export potential\n\n"
        
        response += "**Common Pitfalls to Avoid:**\n"
        response += "• Incomplete or rushed applications\n"
        response += "• Unrealistic financial projections\n"
        response += "• Lack of market research\n"
        response += "• Poor presentation and formatting\n"
        
        return response
    
    def get_funding_amount_response(self, user_profile: Dict = None) -> str:
        """Generate funding amount guidance"""
        if user_profile and user_profile.get('fundingAmount'):
            amount = user_profile['fundingAmount']
            suitable_funds = [f for f in self.funding_data if f.get('min_amount', 0) <= amount <= f.get('max_amount', float('inf'))]
            
            response = f"For your funding requirement of R{amount:,}:\n\n"
            response += f"**Available Options:** {len(suitable_funds)} funding opportunities match your amount\n\n"
            
            if suitable_funds:
                response += "**Recommended Funds:**\n"
                for fund in suitable_funds[:3]:
                    response += f"• {fund['name']}: R{fund['min_amount']:,} - R{fund['max_amount']:,}\n"
        else:
            response = "**Funding Amount Guidelines:**\n\n"
            response += "**Micro Funding (R10K - R50K):**\n"
            response += "• Equipment purchases\n"
            response += "• Working capital\n"
            response += "• Market entry costs\n\n"
            
            response += "**Small Business Funding (R50K - R500K):**\n"
            response += "• Business expansion\n"
            response += "• Technology upgrades\n"
            response += "• Staff hiring\n\n"
            
            response += "**Growth Funding (R500K+):**\n"
            response += "• Major expansion projects\n"
            response += "• New market entry\n"
            response += "• Manufacturing setup\n"
        
        return response
    
    def get_general_response(self, user_profile: Dict = None) -> str:
        """Generate general helpful response"""
        responses = [
            "I'm here to help with your funding journey! I can assist with:\n\n• Funding criteria and requirements\n• Eligibility assessments\n• Application process guidance\n• Document preparation\n• Success strategies\n\nWhat specific aspect would you like to explore?",
            
            "Welcome to your AI funding assistant! I have access to:\n\n• Current funding opportunities\n• Application requirements\n• Success tips and strategies\n• Personalized recommendations\n\nHow can I help you secure funding for your business?"
        ]
        
        base_response = responses[0]
        
        if user_profile:
            base_response += f"\n\n**Your Profile:** {user_profile.get('businessName', 'Business')} in {user_profile.get('industry', 'your industry')}"
            base_response += f"\nI can provide personalized advice based on your specific needs."
        
        return base_response
    
    def get_opportunities_response(self, user_profile: Dict = None) -> str:
        """Generate response about available funding opportunities"""
        response = "Here are the current funding opportunities available:\n\n"
        
        for i, fund in enumerate(self.funding_data[:5], 1):
            response += f"**{i}. {fund['name']}**\n"
            response += f"• Type: {fund['type']}\n"
            response += f"• Amount: R{fund['min_amount']:,} - R{fund['max_amount']:,}\n"
            response += f"• Sectors: {', '.join(fund.get('sector', []))}\n"
            response += f"• Description: {fund['description']}\n\n"
        
        if user_profile:
            matching_funds = [f for f in self.funding_data if user_profile.get('industry') in f.get('sector', [])]
            if matching_funds:
                response += f"**Perfect for your {user_profile.get('industry')} business:** {len(matching_funds)} opportunities match your industry!\n"
        
        return response
    
    def get_timeline_response(self, user_profile: Dict = None) -> str:
        """Generate response about funding timelines"""
        response = "Here's the typical funding timeline:\n\n"
        response += "**Application Phase (2-4 weeks):**\n"
        response += "• Profile completion: 1-2 days\n"
        response += "• Document gathering: 1-2 weeks\n"
        response += "• Application preparation: 3-5 days\n"
        response += "• Final review and submission: 1-2 days\n\n"
        
        response += "**Review Phase (4-8 weeks):**\n"
        response += "• Initial screening: 1-2 weeks\n"
        response += "• Detailed evaluation: 2-4 weeks\n"
        response += "• Committee review: 1-2 weeks\n\n"
        
        response += "**Decision Phase (2-4 weeks):**\n"
        response += "• Final decision: 1-2 weeks\n"
        response += "• Notification and contracting: 1-2 weeks\n\n"
        
        if user_profile and user_profile.get('businessName'):
            response += f"**For {user_profile['businessName']}:** Start your application now to be funded within 8-16 weeks!\n"
        
        return response