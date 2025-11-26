import openai
import json
import os
from typing import Dict, Optional

class GPTFundingAssistant:
    def __init__(self):
        # Set your OpenAI API key here or use environment variable
        openai.api_key = os.getenv('OPENAI_API_KEY', 'your-api-key-here')
        self.funding_data = self.load_funding_data()
    
    def load_funding_data(self):
        try:
            with open("data/funding_opportunities.json", "r") as f:
                return json.load(f)
        except FileNotFoundError:
            return []
    
    def get_system_prompt(self, user_profile: Dict = None):
        profile_info = ""
        if user_profile:
            profile_info = f"""
User Profile:
- Business: {user_profile.get('businessName', 'Not provided')}
- Industry: {user_profile.get('industry', 'Not provided')}
- Funding Amount: R{user_profile.get('fundingAmount', 0):,}
- Years Operating: {user_profile.get('yearsInOperation', 'Not provided')}
- Location: {user_profile.get('location', 'South Africa')}
"""
        
        return f"""You are a SmartFund AI Assistant helping South African SMMEs with funding opportunities.

Available Funding Opportunities:
{json.dumps(self.funding_data, indent=2)}

{profile_info}

Guidelines:
- Provide specific, actionable advice
- Reference actual funding opportunities when relevant
- Use South African context (CIPC, BEE, etc.)
- Be encouraging but realistic
- Format responses clearly with bullet points
- Keep responses concise but comprehensive
- Always mention specific funding amounts and requirements when available
"""

    async def get_gpt_response(self, user_message: str, user_profile: Dict = None) -> str:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": self.get_system_prompt(user_profile)},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=500,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"I'm having trouble connecting to my AI brain right now. Here's what I can tell you: For funding questions, check our available opportunities, ensure your CIPC registration is current, and prepare a solid business plan. Error: {str(e)}"