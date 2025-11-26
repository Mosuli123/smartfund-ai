import json
import re
from typing import Dict, List
from datetime import datetime

class SmartFundChatbot:
    def __init__(self):
        self.funding_data = self.load_funding_data()
        self.conversation_context = {}
        
    def load_funding_data(self):
        try:
            with open("data/funding_opportunities.json", "r") as f:
                return json.load(f)
        except FileNotFoundError:
            return [
                {
                    "id": 1,
                    "name": "Small Business Innovation Grant",
                    "type": "Grant",
                    "sector": ["Technology", "Healthcare", "Manufacturing"],
                    "min_amount": 50000,
                    "max_amount": 500000,
                    "location": ["Eastern Cape"],
                    "min_years": 1,
                    "max_years": 10,
                    "description": "Supporting innovative small businesses",
                    "eligibility": "CIPC registered, innovative business model"
                },
                {
                    "id": 2,
                    "name": "Women Entrepreneur Fund",
                    "type": "Loan",
                    "sector": ["Retail", "Services", "Agriculture"],
                    "min_amount": 25000,
                    "max_amount": 200000,
                    "location": ["Eastern Cape"],
                    "min_years": 0,
                    "max_years": 5,
                    "description": "Empowering women-owned businesses",
                    "eligibility": "51% women ownership required"
                }
            ]
    
    def chat_response(self, message: str, user_profile: Dict = None, user_id: str = "demo") -> str:
        message_lower = message.lower()
        
        # Store conversation context
        if user_id not in self.conversation_context:
            self.conversation_context[user_id] = []
        self.conversation_context[user_id].append({"user": message, "timestamp": datetime.now()})
        
        # Greeting responses
        if any(word in message_lower for word in ['hello', 'hi', 'hey', 'good morning', 'good afternoon']):
            name = user_profile.get('businessName', 'there') if user_profile else 'there'
            return f"Hello {name}! 👋 I'm your SmartFund AI Assistant. I'm here to help you navigate funding opportunities for your business. What would you like to know about funding today?"
        
        # Specific funding questions
        if 'how much' in message_lower and any(word in message_lower for word in ['funding', 'money', 'loan']):
            return self.get_funding_amounts(user_profile)
        
        if any(word in message_lower for word in ['eligible', 'qualify', 'can i get']):
            return self.check_eligibility(user_profile)
        
        if any(word in message_lower for word in ['apply', 'application', 'how to']):
            return self.application_guidance(user_profile)
        
        if any(word in message_lower for word in ['document', 'paperwork', 'need']):
            return self.document_requirements()
        
        if any(word in message_lower for word in ['best', 'recommend', 'suggest']):
            return self.recommend_funding(user_profile)
        
        if any(word in message_lower for word in ['time', 'long', 'when', 'duration']):
            return self.timeline_info()
        
        # Conversational responses
        if any(word in message_lower for word in ['thank', 'thanks']):
            return "You're welcome! I'm here whenever you need help with funding questions. Is there anything else about funding opportunities you'd like to know?"
        
        if any(word in message_lower for word in ['bye', 'goodbye', 'see you']):
            return "Goodbye! Remember, I'm always here to help with your funding journey. Good luck with your business! 🚀"
        
        # Default intelligent response
        return self.contextual_response(message, user_profile)
    
    def get_funding_amounts(self, user_profile: Dict = None) -> str:
        if user_profile and user_profile.get('fundingAmount'):
            amount = user_profile['fundingAmount']
            suitable = [f for f in self.funding_data if f['min_amount'] <= amount <= f['max_amount']]
            return f"For R{amount:,}, you have {len(suitable)} funding options available! The best matches are:\n\n" + \
                   "\n".join([f"• {f['name']}: R{f['min_amount']:,} - R{f['max_amount']:,}" for f in suitable[:3]])
        
        return "Funding amounts vary by opportunity:\n\n• **Micro funding**: R10K - R50K (equipment, working capital)\n• **Small business**: R50K - R500K (expansion, technology)\n• **Growth funding**: R500K+ (major projects)\n\nWhat amount are you looking for?"
    
    def check_eligibility(self, user_profile: Dict = None) -> str:
        if not user_profile:
            return "To check your eligibility, I need to know about your business. Please complete your profile with:\n• Business name and industry\n• Years in operation\n• Funding amount needed\n\nThen I can give you a personalized eligibility assessment!"
        
        matches = []
        for fund in self.funding_data:
            score = 0
            if user_profile.get('industry') in fund.get('sector', []):
                score += 40
            if fund.get('min_years', 0) <= user_profile.get('yearsInOperation', 0):
                score += 30
            if fund.get('min_amount', 0) <= user_profile.get('fundingAmount', 0) <= fund.get('max_amount', float('inf')):
                score += 30
            
            if score >= 60:
                matches.append((fund, score))
        
        if matches:
            response = f"Great news! Based on your profile, you're eligible for {len(matches)} funding opportunities:\n\n"
            for fund, score in sorted(matches, key=lambda x: x[1], reverse=True)[:3]:
                response += f"• **{fund['name']}** ({score}% match)\n"
            return response
        
        return "Based on your current profile, let's work on improving your eligibility. Consider:\n• Updating your business registration\n• Preparing financial statements\n• Developing a solid business plan"
    
    def application_guidance(self, user_profile: Dict = None) -> str:
        status = "✅ Ready" if user_profile and user_profile.get('businessName') else "⏳ Complete profile first"
        
        return f"Here's your application roadmap:\n\n**Step 1: Preparation** {status}\n• Complete business profile\n• Gather required documents\n• Prepare business plan\n\n**Step 2: Apply**\n• Use our matching system\n• Generate application draft\n• Submit to chosen funds\n\n**Step 3: Follow-up**\n• Track application status\n• Respond to queries\n• Prepare for interviews\n\nWould you like detailed help with any step?"
    
    def document_requirements(self) -> str:
        return "📋 **Essential Documents Checklist:**\n\n**Business Registration:**\n• CIPC Certificate\n• Tax Clearance Certificate\n• Business bank statements (6 months)\n\n**Financial Documents:**\n• Financial statements\n• Cash flow projections\n• Proof of business address\n\n**Application Specific:**\n• Detailed business plan\n• Market research\n• Job creation plan\n\n💡 **Tip:** Start gathering these now - it typically takes 1-2 weeks to collect everything!"
    
    def recommend_funding(self, user_profile: Dict = None) -> str:
        if not user_profile:
            return "I'd love to recommend the best funding for you! First, tell me:\n• What industry is your business in?\n• How much funding do you need?\n• How long have you been operating?\n\nWith this info, I can suggest the perfect funding opportunities!"
        
        industry = user_profile.get('industry', '')
        amount = user_profile.get('fundingAmount', 0)
        
        recommendations = []
        for fund in self.funding_data:
            if industry in fund.get('sector', []) and fund.get('min_amount', 0) <= amount <= fund.get('max_amount', float('inf')):
                recommendations.append(fund)
        
        if recommendations:
            response = f"Perfect! For your {industry} business needing R{amount:,}, I recommend:\n\n"
            for i, fund in enumerate(recommendations[:3], 1):
                response += f"**{i}. {fund['name']}**\n• Amount: R{fund['min_amount']:,} - R{fund['max_amount']:,}\n• Type: {fund['type']}\n• Focus: {fund['description']}\n\n"
            return response
        
        return f"For your {industry} business, consider broadening your search or adjusting your funding amount. I can help you find alternative options!"
    
    def timeline_info(self) -> str:
        return "⏰ **Typical Funding Timeline:**\n\n**Weeks 1-2: Preparation**\n• Complete profile and gather documents\n• Prepare business plan\n\n**Weeks 3-4: Application**\n• Submit applications\n• Initial screening by funders\n\n**Weeks 5-8: Review**\n• Detailed evaluation\n• Possible interviews\n\n**Weeks 9-12: Decision**\n• Final approval\n• Contract signing\n\n**Total: 8-12 weeks** from start to funding! 🎯"
    
    def contextual_response(self, message: str, user_profile: Dict = None) -> str:
        responses = [
            "I'm here to help with your funding journey! I can assist with eligibility checks, application guidance, document requirements, and funding recommendations. What specific aspect interests you?",
            
            "As your funding assistant, I have access to current opportunities and can provide personalized advice. What would you like to explore - funding amounts, eligibility, or application process?",
            
            "Let me help you find the right funding! I can check what you qualify for, guide you through applications, and recommend the best opportunities for your business. What's your main question?"
        ]
        
        base_response = responses[hash(message) % len(responses)]
        
        if user_profile and user_profile.get('businessName'):
            base_response += f"\n\n💼 I see you're working with {user_profile['businessName']} - I can provide tailored advice for your business!"
        
        return base_response