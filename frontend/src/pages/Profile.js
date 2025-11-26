import React, { useState, useEffect } from 'react';
import { getMatchedOpportunities, saveMatchedOpportunities } from '../services/matchingService';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState({
    business_name: '',
    cipc_registration_number: '',
    industry: '',
    funding_amount: '',
    location: '',
    years_in_operation: '',
    business_type: '',
    annual_turnover: '',
    employee_count: '',
    funding_purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const industries = [
    'Manufacturing', 'Automotive', 'Agriculture', 'ICT and Electronics', 'Renewable Energy'
  ];

  const businessTypes = [
    'Private Company (Pty Ltd)', 'Close Corporation (CC)', 'Sole Proprietorship',
    'Partnership', 'Non-Profit Company (NPC)', 'Public Company', 'Other'
  ];

  const fundingPurposes = [
    'Working Capital', 'Equipment Purchase', 'Business Expansion', 'Technology Upgrade',
    'Marketing & Sales', 'Staff Training', 'Research & Development', 'Export Development',
    'Inventory Purchase', 'Debt Consolidation', 'Other'
  ];

  const locations = [
    'South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Other'
  ];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate API delay
    setTimeout(() => {
      const profileData = {
        ...profile,
        funding_amount: parseInt(profile.funding_amount),
        years_in_operation: parseInt(profile.years_in_operation),
        annual_turnover: parseInt(profile.annual_turnover),
        employee_count: parseInt(profile.employee_count),
        user_id: 'demo_user'
      };

      localStorage.setItem('businessProfile', JSON.stringify(profileData));
      
      // Automatically find and save matched opportunities
      const matches = getMatchedOpportunities(profileData);
      saveMatchedOpportunities(matches);
      
      setMessage(`Profile saved successfully! Found ${matches.length} matching funding opportunities.`);
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen py-8" style={{background: 'linear-gradient(135deg, #fef7f0 0%, #f0f4f8 100%)'}}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="modern-card p-8">
          <div className="mb-6">
            <h1 className="heading-1" style={{color: '#1e3a5f'}}>Business Profile</h1>
            <div className="p-4 rounded-xl border" style={{background: 'rgba(65, 128, 190, 0.1)', borderColor: '#4180be'}}>
              <p className="font-medium text-sm" style={{color: '#2d4a6b'}}>
                Supported Industries: Manufacturing, Automotive, Agriculture, ICT & Electronics, Renewable Energy
              </p>
            </div>
          </div>
        
          {message && (
            <div className="mb-6 p-4 rounded-xl border" style={{
              background: message.includes('successfully') 
                ? 'rgba(16, 185, 129, 0.1)' 
                : 'rgba(239, 68, 68, 0.1)',
              borderColor: message.includes('successfully') ? '#10b981' : '#ef4444',
              color: message.includes('successfully') ? '#065f46' : '#991b1b'
            }}>
              {message}
            </div>
          )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="business_name" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                Business Name *
              </label>
              <input
                type="text"
                id="business_name"
                name="business_name"
                required
                className="modern-input"
                placeholder="Enter your registered business name"
                value={profile.business_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="cipc_registration_number" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                CIPC Registration Number *
              </label>
              <input
                type="text"
                id="cipc_registration_number"
                name="cipc_registration_number"
                required
                pattern="[0-9]{4}/[0-9]{6}/[0-9]{2}|[0-9]{10}|CK[0-9]{10}"
                className="modern-input"
                placeholder="e.g., 2019/123456/07 or CK2019123456"
                value={profile.cipc_registration_number}
                onChange={handleChange}
              />
              <p className="text-xs mt-1" style={{color: '#64748b'}}>
                Enter your CIPC registration number (required for SMME verification)
              </p>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                Industry *
              </label>
              <select
                id="industry"
                name="industry"
                required
                className="modern-input"
                value={profile.industry}
                onChange={handleChange}
              >
                <option value="">Select your industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="funding_amount" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                Funding Amount Required (R) *
              </label>
              <input
                type="number"
                id="funding_amount"
                name="funding_amount"
                required
                min="1000"
                className="modern-input"
                placeholder="e.g., 50000"
                value={profile.funding_amount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                Location *
              </label>
              <select
                id="location"
                name="location"
                required
                className="modern-input"
                value={profile.location}
                onChange={handleChange}
              >
                <option value="">Select your location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="business_type" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                Business Type *
              </label>
              <select
                id="business_type"
                name="business_type"
                required
                className="modern-input"
                value={profile.business_type}
                onChange={handleChange}
              >
                <option value="">Select business type</option>
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="years_in_operation" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                Years in Operation *
              </label>
              <input
                type="number"
                id="years_in_operation"
                name="years_in_operation"
                required
                min="0"
                max="50"
                className="modern-input"
                placeholder="e.g., 3"
                value={profile.years_in_operation}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="annual_turnover" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                Annual Turnover (R) *
              </label>
              <input
                type="number"
                id="annual_turnover"
                name="annual_turnover"
                required
                min="0"
                className="modern-input"
                placeholder="e.g., 500000"
                value={profile.annual_turnover}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="employee_count" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                Number of Employees *
              </label>
              <input
                type="number"
                id="employee_count"
                name="employee_count"
                required
                min="1"
                max="200"
                className="modern-input"
                placeholder="e.g., 5"
                value={profile.employee_count}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="funding_purpose" className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                Primary Funding Purpose *
              </label>
              <select
                id="funding_purpose"
                name="funding_purpose"
                required
                className="modern-input"
                value={profile.funding_purpose}
                onChange={handleChange}
              >
                <option value="">Select funding purpose</option>
                {fundingPurposes.map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={loadProfile}
              className="btn-secondary px-6 py-2"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-6 py-2 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Profile;