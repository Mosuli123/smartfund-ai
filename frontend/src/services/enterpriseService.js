import axios from 'axios';

// Enterprise API Configuration
const ENTERPRISE_API_BASE_URL = 'http://localhost:8500/api';

// Create axios instance with enterprise configuration
const enterpriseApi = axios.create({
  baseURL: ENTERPRISE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Four Horsemen Technologies',
    'X-API-Version': '2.0.0'
  }
});

// Token management
let authToken = localStorage.getItem('four_horsemen_token');

// Request interceptor to add auth token
enterpriseApi.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  console.log('🚀 Four Horsemen API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Response interceptor for enhanced error handling
enterpriseApi.interceptors.response.use(
  (response) => {
    console.log('✅ Four Horsemen API Response:', response.status, response.data?.message || 'Success');
    return response;
  },
  (error) => {
    console.error('❌ Four Horsemen API Error:', error.response?.status, error.response?.data?.detail || error.message);
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      authToken = null;
      localStorage.removeItem('four_horsemen_token');
      window.location.href = '/login?session_expired=true';
    }
    
    return Promise.reject(error);
  }
);

export class FourHorsemenEnterpriseService {
  
  /**
   * Health check for enterprise system
   */
  static async healthCheck() {
    try {
      const response = await enterpriseApi.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Enterprise system unavailable');
    }
  }

  /**
   * Enterprise authentication
   */
  static async enterpriseLogin(credentials) {
    try {
      const response = await enterpriseApi.post('/auth/enterprise-login', credentials);
      
      if (response.data.success) {
        authToken = response.data.data.token;
        localStorage.setItem('four_horsemen_token', authToken);
        localStorage.setItem('four_horsemen_user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Authentication failed');
    }
  }

  /**
   * Save enterprise business profile
   */
  static async saveEnterpriseProfile(profileData) {
    try {
      const response = await enterpriseApi.post('/enterprise/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Profile save failed');
    }
  }

  /**
   * Enhanced AI-powered funding matching
   */
  static async getEnterpriseMatches(profileData) {
    try {
      const response = await enterpriseApi.post('/enterprise/ai-matching', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Matching service unavailable');
    }
  }

  /**
   * Generate enterprise-grade funding application
   */
  static async generateEnterpriseApplication(profileData) {
    try {
      const response = await enterpriseApi.post('/enterprise/generate-application', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Application generation failed');
    }
  }

  /**
   * Get enterprise analytics dashboard
   */
  static async getEnterpriseAnalytics() {
    try {
      const response = await enterpriseApi.get('/enterprise/analytics');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Analytics service unavailable');
    }
  }

  /**
   * Logout and clear enterprise session
   */
  static async logout() {
    try {
      authToken = null;
      localStorage.removeItem('four_horsemen_token');
      localStorage.removeItem('four_horsemen_user');
      localStorage.removeItem('four_horsemen_profile');
      
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      throw new Error('Logout failed');
    }
  }

  /**
   * Get current user from storage
   */
  static getCurrentUser() {
    try {
      const userData = localStorage.getItem('four_horsemen_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated() {
    return !!authToken && !!localStorage.getItem('four_horsemen_token');
  }

  /**
   * Get stored profile
   */
  static getStoredProfile() {
    try {
      const profileData = localStorage.getItem('four_horsemen_profile');
      return profileData ? JSON.parse(profileData) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Store profile locally
   */
  static storeProfile(profileData) {
    try {
      localStorage.setItem('four_horsemen_profile', JSON.stringify(profileData));
      return true;
    } catch (error) {
      console.error('Failed to store profile:', error);
      return false;
    }
  }

  /**
   * Download PDF from base64 data
   */
  static downloadPDF(pdfBase64, filename) {
    try {
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename || 'Four_Horsemen_Application.pdf';
      link.click();
      
      URL.revokeObjectURL(link.href);
      return true;
    } catch (error) {
      console.error('PDF download failed:', error);
      return false;
    }
  }
}

// Utility functions for enterprise features
export class FourHorsemenUtils {
  
  /**
   * Format currency for display
   */
  static formatCurrency(amount) {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  /**
   * Calculate business score based on multiple factors
   */
  static calculateBusinessScore(profile) {
    let score = 0;
    
    // Years in operation (25 points max)
    if (profile.years_in_operation >= 5) score += 25;
    else if (profile.years_in_operation >= 2) score += 15;
    else if (profile.years_in_operation >= 1) score += 10;
    else score += 5;
    
    // Annual turnover (25 points max)
    if (profile.annual_turnover >= 10000000) score += 25;
    else if (profile.annual_turnover >= 5000000) score += 20;
    else if (profile.annual_turnover >= 1000000) score += 15;
    else if (profile.annual_turnover >= 500000) score += 10;
    else score += 5;
    
    // Employee count (25 points max)
    if (profile.employee_count >= 50) score += 25;
    else if (profile.employee_count >= 20) score += 20;
    else if (profile.employee_count >= 10) score += 15;
    else if (profile.employee_count >= 5) score += 10;
    else score += 5;
    
    // Profile completeness (25 points max)
    const requiredFields = ['business_name', 'cipc_registration_number', 'industry', 'funding_amount', 'location'];
    const completedFields = requiredFields.filter(field => profile[field] && profile[field] !== '');
    score += (completedFields.length / requiredFields.length) * 25;
    
    return Math.min(Math.round(score), 100);
  }

  /**
   * Generate business insights
   */
  static generateBusinessInsights(profile) {
    const insights = [];
    
    if (profile.annual_turnover > profile.funding_amount * 2) {
      insights.push({
        type: 'positive',
        title: 'Strong Financial Position',
        message: 'Your annual turnover exceeds funding requirements, indicating healthy cash flow'
      });
    }
    
    if (profile.years_in_operation >= 3) {
      insights.push({
        type: 'positive', 
        title: 'Established Business',
        message: 'Your business track record demonstrates stability and experience'
      });
    }
    
    if (profile.employee_count >= 10) {
      insights.push({
        type: 'positive',
        title: 'Job Creation Impact',
        message: 'Your business contributes significantly to employment opportunities'
      });
    }
    
    return insights;
  }

  /**
   * Validate CIPC registration number
   */
  static validateCIPCNumber(cipNumber) {
    if (!cipNumber) return false;
    
    // Basic CIPC format validation
    const patterns = [
      /^\d{4}\/\d{6}\/\d{2}$/,  // 2019/123456/07
      /^\d{10}$/,               // 2019123456
      /^CK\d{10}$/              // CK2019123456
    ];
    
    return patterns.some(pattern => pattern.test(cipNumber));
  }

  /**
   * Get industry-specific recommendations
   */
  static getIndustryRecommendations(industry) {
    const recommendations = {
      'Technology': [
        'Consider R&D tax incentives',
        'Explore innovation grants',
        'Look into tech incubator programs'
      ],
      'Agriculture': [
        'Agricultural development funds available',
        'Land bank financing options',
        'Export development opportunities'
      ],
      'Manufacturing': [
        'Industrial development incentives',
        'Equipment financing programs',
        'Skills development support'
      ]
    };
    
    return recommendations[industry] || [
      'General business development support',
      'Working capital financing',
      'Growth and expansion funding'
    ];
  }
}

export default FourHorsemenEnterpriseService;