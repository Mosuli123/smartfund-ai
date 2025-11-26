import axios from 'axios';

const API_BASE_URL = 'http://localhost:8008/api';

export class AIService {
  static async queryAssistant(message, userId = 'demo_user') {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai-assistant`, {
        message: message,
        user_id: userId
      });
      
      if (response.data.success) {
        return {
          success: true,
          response: response.data.response,
          timestamp: response.data.timestamp
        };
      } else {
        return {
          success: false,
          response: response.data.response || 'Sorry, I encountered an error. Please try again.',
          error: response.data.error
        };
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        success: false,
        response: 'I\'m currently offline. Here are some things I can help with when I\'m back online:\n\n• Funding criteria and requirements\n• Eligibility assessments\n• Application guidance\n• Document requirements\n• Success tips\n\nPlease try again in a moment.',
        error: error.message
      };
    }
  }
}