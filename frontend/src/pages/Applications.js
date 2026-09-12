import React, { useState, useEffect } from 'react';
import { getApplications, submitApplication } from '../services/applicationStore';

const Applications = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewApplication, setShowNewApplication] = useState(false);
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState(null);
  const [applicationData, setApplicationData] = useState({
    executiveSummary: '',
    businessDescription: '',
    financialInfo: '',
    useOfFunds: '',
    marketAnalysis: '',
    managementTeam: '',
    growthStrategy: '',
    conclusion: ''
  });
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadApplications();
    loadProfile();
  }, []);

  const loadProfile = () => {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setProfile(profileData);
      generateInitialDraft(profileData);
    }
  };

  const generateInitialDraft = (profileData) => {
    setApplicationData({
      executiveSummary: `${profileData.business_name} is seeking R${profileData.funding_amount?.toLocaleString()} in funding to expand our ${profileData.industry} business operations in ${profileData.location}.`,
      businessDescription: `We are a ${profileData.business_type} operating in the ${profileData.industry} sector for ${profileData.years_in_operation} years with ${profileData.employee_count} employees.`,
      financialInfo: `Current annual turnover: R${profileData.annual_turnover?.toLocaleString()}. We are seeking R${profileData.funding_amount?.toLocaleString()} for ${profileData.funding_purpose}.`,
      useOfFunds: `The requested funding of R${profileData.funding_amount?.toLocaleString()} will be used primarily for ${profileData.funding_purpose}.`,
      marketAnalysis: `Our target market in the ${profileData.industry} sector shows strong growth potential in ${profileData.location}.`,
      managementTeam: `Our experienced management team has been successfully operating in the ${profileData.industry} sector.`,
      growthStrategy: `With this funding, we plan to expand our operations and increase our market share in the ${profileData.industry} sector.`,
      conclusion: `This funding opportunity will enable ${profileData.business_name} to achieve significant growth and contribute to the economic development of ${profileData.location}.`
    });
  };

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const selectedOpp = JSON.parse(localStorage.getItem('selectedOpportunity') || '{}');
      const newApp = submitApplication(selectedOpp, profile || {}, applicationData, signature);
      const all = getApplications();
      setApplications(all);
      setShowNewApplication(false);
      setStep(1);
      setSignature('');
      setLoading(false);
    }, 2000);
  };

  const loadApplications = () => {
    setApplications(getApplications());
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return '✅';
      case 'Under Review': return '⏳';
      case 'Rejected': return '❌';
      default: return '📄';
    }
  };

  const ta = (field) => (
    <textarea rows={4} className="modern-input" style={{ resize: 'vertical' }}
      value={applicationData[field]} onChange={e => handleInputChange(field, e.target.value)} />
  );

  const btnRow = (left, right) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>{left}{right}</div>
  );

  const renderApplicationForm = () => {
    if (step === 1) return (
      <div>
        <h3 style={{ fontWeight: 700, color: '#0a2240', marginBottom: '1.25rem' }}>📝 Application Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
          {[['Executive Summary', 'executiveSummary'], ['Business Description', 'businessDescription'], ['Financial Information', 'financialInfo'], ['Use of Funds', 'useOfFunds']].map(([l, f]) => (
            <div key={f}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>{l} *</label>
              {ta(f)}
            </div>
          ))}
        </div>
        {btnRow(
          <button onClick={() => setShowNewApplication(false)} className="btn-secondary">Cancel</button>,
          <button onClick={() => setStep(2)} style={{ background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.625rem 1.25rem', fontWeight: 600, cursor: 'pointer' }}>Preview →</button>
        )}
      </div>
    );

    if (step === 2) return (
      <div>
        <h3 style={{ fontWeight: 700, color: '#0a2240', marginBottom: '1.25rem' }}>👀 Preview Application</h3>
        <div style={{ background: '#f8fafc', borderRadius: '0.5rem', padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#0a2240', marginBottom: '1rem' }}>{profile?.business_name} — Funding Application</div>
          {[['Executive Summary', applicationData.executiveSummary], ['Business Description', applicationData.businessDescription], ['Financial Information', applicationData.financialInfo], ['Use of Funds', applicationData.useOfFunds]].map(([t, c]) => (
            <div key={t} style={{ marginBottom: '0.875rem' }}>
              <div style={{ fontWeight: 600, color: '#334155', fontSize: '0.875rem' }}>{t}</div>
              <div style={{ color: '#475569', fontSize: '0.875rem', marginTop: '0.25rem' }}>{c}</div>
            </div>
          ))}
        </div>
        {btnRow(
          <button onClick={() => setStep(1)} className="btn-secondary">← Edit</button>,
          <button onClick={() => setStep(3)} style={{ background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.625rem 1.25rem', fontWeight: 600, cursor: 'pointer' }}>Sign & Submit →</button>
        )}
      </div>
    );

    if (step === 3) return (
      <div>
        <h3 style={{ fontWeight: 700, color: '#0a2240', marginBottom: '1.25rem' }}>✍️ Digital Signature</h3>
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '0.875rem', marginBottom: '1.25rem', fontSize: '0.875rem', color: '#92400e' }}>
          By signing, you confirm all information is accurate and complete.
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Full Name (Digital Signature) *</label>
          <input type="text" className="modern-input" placeholder="Type your full name" value={signature} onChange={e => setSignature(e.target.value)} />
        </div>
        {btnRow(
          <button onClick={() => setStep(2)} className="btn-secondary">← Back</button>,
          <button onClick={handleSubmit} disabled={!signature.trim() || loading}
            style={{ background: 'linear-gradient(135deg,#1a7a4a,#22a05a)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.625rem 1.25rem', fontWeight: 600, cursor: (!signature.trim() || loading) ? 'not-allowed' : 'pointer', opacity: (!signature.trim() || loading) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {loading && <span className="loading-spinner" />}
            {loading ? 'Submitting...' : '🚀 Submit Application'}
          </button>
        )}
      </div>
    );
  };

  if (loading && applications.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 1rem', borderColor: 'rgba(26,79,138,0.2)', borderTopColor: '#1a4f8a' }} />
          <p style={{ color: '#64748b' }}>Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.25rem' }}>My Applications</h1>
            <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Track and manage your government funding applications</p>
          </div>
          <button
            onClick={() => setShowNewApplication(true)}
            style={{ background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.625rem 1.25rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
          >
            + New Application
          </button>
        </div>

        {showNewApplication && (
          <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '1.5rem' }}>
            {renderApplicationForm()}
          </div>
        )}

        {applications.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ fontWeight: 700, color: '#0a2240', marginBottom: '0.5rem' }}>No Applications Yet</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Find a funding match first, then apply from the Funding Matches page.</p>
            <a href="/funding-opportunities" style={{ background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}>Find Funding Matches →</a>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {applications.map((app) => {
              const name = app.opportunity_name || app.programme;
              const provider = app.funding_company || app.provider;
              const amount = app.amount_requested || app.amount;
              const score = app.match_score || app.score;
              const date = app.submission_date || app.submitted;
              const msg = app.status_message;
              return (
              <div key={app.id} style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1.5rem', borderLeft: `4px solid ${app.status === 'Approved' ? '#1a7a4a' : app.status === 'Rejected' ? '#dc2626' : app.status === 'Under Review' ? '#c8922a' : '#1a4f8a'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, color: '#0a2240', fontSize: '1rem', marginBottom: '0.25rem' }}>{name}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{provider} · ID: {app.id}</p>
                  </div>
                  <span style={{ padding: '0.3rem 0.875rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600, background: app.status === 'Approved' ? '#f0fdf4' : app.status === 'Rejected' ? '#fef2f2' : app.status === 'Under Review' ? '#fffbeb' : '#eff6ff', color: app.status === 'Approved' ? '#166534' : app.status === 'Rejected' ? '#991b1b' : app.status === 'Under Review' ? '#92400e' : '#1e40af' }}>
                    {getStatusIcon(app.status)} {app.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                  {[['Amount', `R${amount?.toLocaleString()}`], ['Match Score', `${score}%`], ['Submitted', date]].map(([l, v]) => (
                    <div key={l} style={{ background: '#f8fafc', borderRadius: '0.5rem', padding: '0.75rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>{l}</div>
                      <div style={{ fontWeight: 700, color: '#0a2240' }}>{v}</div>
                    </div>
                  ))}
                </div>

                {msg && (
                  <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', background: app.status === 'Approved' ? '#f0fdf4' : app.status === 'Rejected' ? '#fef2f2' : '#f8fafc', border: `1px solid ${app.status === 'Approved' ? '#bbf7d0' : app.status === 'Rejected' ? '#fecaca' : '#e2e8f0'}`, fontSize: '0.875rem', color: app.status === 'Approved' ? '#166534' : app.status === 'Rejected' ? '#991b1b' : '#475569' }}>
                    {msg}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  {app.status === 'Approved' ? (
                    <button style={{ background: '#1a7a4a', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}>📄 Download Agreement</button>
                  ) : app.status === 'Rejected' ? (
                    <button style={{ background: '#c8922a', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}>🔄 Reapply</button>
                  ) : (
                    <button style={{ background: '#1a4f8a', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}>📧 Contact Provider</button>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;