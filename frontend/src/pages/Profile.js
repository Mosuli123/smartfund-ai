import React, { useState, useEffect } from 'react';
import { getMatchedOpportunities, saveMatchedOpportunities } from '../services/matchingService';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState({
    business_name: '', cipc_registration_number: '', industry: '',
    funding_amount: '', location: '', years_in_operation: '',
    business_type: '', annual_turnover: '', employee_count: '', funding_purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const industries = [
    'Agriculture', 'Agro-processing', 'Automotive', 'Construction',
    'Green Economy', 'ICT', 'Manufacturing', 'Retail', 'Services',
    'Technology', 'Tourism', 'Food Processing'
  ];

  const businessTypes = [
    'Private Company (Pty Ltd)', 'Close Corporation (CC)', 'Sole Proprietorship',
    'Partnership', 'Non-Profit Company (NPC)', 'Public Company', 'Other'
  ];

  const fundingPurposes = [
    'Working Capital', 'Equipment Purchase', 'Business Expansion',
    'Technology Upgrade', 'Marketing & Sales', 'Staff Training',
    'Research & Development', 'Export Development', 'Inventory Purchase', 'Other'
  ];

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
    'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('businessProfile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    setTimeout(() => {
      const profileData = {
        ...profile,
        funding_amount: parseInt(profile.funding_amount),
        years_in_operation: parseInt(profile.years_in_operation),
        annual_turnover: parseInt(profile.annual_turnover),
        employee_count: parseInt(profile.employee_count),
        user_id: user?.user_id || 'demo_user'
      };
      localStorage.setItem('businessProfile', JSON.stringify(profileData));
      const matches = getMatchedOpportunities(profileData);
      saveMatchedOpportunities(matches);
      setMessage(`Profile saved. Found ${matches.length} matching government funding programme${matches.length !== 1 ? 's' : ''}.`);
      setLoading(false);
    }, 800);
  };

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const field = (id, label, type = 'text', extra = {}) => (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>{label}</label>
      <input type={type} id={id} name={id} required className="modern-input" value={profile[id]} onChange={handleChange} {...extra} />
    </div>
  );

  const select = (id, label, options, placeholder) => (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>{label}</label>
      <select id={id} name={id} required className="modern-input" value={profile[id]} onChange={handleChange}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.375rem' }}>Business Profile</h1>
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Complete your profile to receive AI-powered government funding recommendations.</p>
        </div>

        {message && (
          <div style={{ marginBottom: '1.25rem', padding: '0.875rem 1.25rem', borderRadius: '0.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: '0.9375rem', fontWeight: 500 }}>
            ✓ {message}
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              {field('business_name', 'Business Name *', 'text', { placeholder: 'Registered business name' })}
              {field('cipc_registration_number', 'CIPC Registration Number *', 'text', { placeholder: 'e.g. 2019/123456/07', pattern: '[0-9]{4}/[0-9]{6}/[0-9]{2}|[0-9]{10}|CK[0-9]{10}' })}
              {select('industry', 'Industry / Sector *', industries, 'Select your sector')}
              {select('business_type', 'Business Type *', businessTypes, 'Select business type')}
              {select('location', 'Province *', provinces, 'Select your province')}
              {field('years_in_operation', 'Years in Operation *', 'number', { min: 0, max: 50, placeholder: 'e.g. 3' })}
              {field('employee_count', 'Number of Employees *', 'number', { min: 1, max: 500, placeholder: 'e.g. 12' })}
              {field('annual_turnover', 'Annual Turnover (R) *', 'number', { min: 0, placeholder: 'e.g. 1500000' })}
              {field('funding_amount', 'Funding Amount Required (R) *', 'number', { min: 1000, placeholder: 'e.g. 500000' })}
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              {select('funding_purpose', 'Primary Funding Purpose *', fundingPurposes, 'Select funding purpose')}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => { const s = localStorage.getItem('businessProfile'); if (s) setProfile(JSON.parse(s)); }}
                className="btn-secondary"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{ background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1.75rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {loading && <span className="loading-spinner" />}
                {loading ? 'Saving...' : 'Save Profile & Find Matches'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
