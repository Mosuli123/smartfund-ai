import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredMatches, getMatchedOpportunities, saveMatchedOpportunities } from '../services/matchingService';

const FundingOpportunities = ({ user }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const p = localStorage.getItem('businessProfile');
    if (p) setProfile(JSON.parse(p));
    const stored = getStoredMatches();
    if (stored.length > 0) setMatches(stored);
  }, []);

  const findMatches = () => {
    if (!profile) return;
    setLoading(true);
    setTimeout(() => {
      const m = getMatchedOpportunities(profile);
      saveMatchedOpportunities(m);
      setMatches(m);
      setLoading(false);
    }, 1200);
  };

  const scoreColor = s => s >= 80 ? '#166534' : s >= 60 ? '#92400e' : '#991b1b';
  const scoreBg = s => s >= 80 ? '#f0fdf4' : s >= 60 ? '#fffbeb' : '#fef2f2';
  const scoreBorder = s => s >= 80 ? '#bbf7d0' : s >= 60 ? '#fde68a' : '#fecaca';

  const typeColors = { Grant: ['#dcfce7', '#166534'], Loan: ['#dbeafe', '#1e40af'], Equity: ['#f3e8ff', '#6b21a8'], Subsidy: ['#fef9c3', '#854d0e'] };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.375rem' }}>AI Funding Matches</h1>
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Government funding programmes matched to your business profile with explainable AI scoring.</p>
        </div>

        {profile ? (
          <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span style={{ fontWeight: 600, color: '#0a2240' }}>{profile.business_name}</span>
              <span style={{ color: '#94a3b8', margin: '0 0.5rem' }}>|</span>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{profile.industry} · {profile.location} · R{parseInt(profile.funding_amount || 0).toLocaleString()} required</span>
            </div>
            <button
              onClick={findMatches}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.625rem 1.25rem', fontWeight: 600, fontSize: '0.875rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {loading && <span className="loading-spinner" />}
              {loading ? 'Matching...' : 'Refresh Matches'}
            </button>
          </div>
        ) : (
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '1rem 1.25rem', marginBottom: '1.25rem', color: '#92400e', fontSize: '0.9375rem' }}>
            ⚠ Complete your <a href="/profile" style={{ color: '#1a4f8a', fontWeight: 600 }}>business profile</a> first to receive personalised funding matches.
          </div>
        )}

        {matches.length > 0 && (
          <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, color: '#0a2240' }}>{matches.length} funding programme{matches.length !== 1 ? 's' : ''} matched</span>
            <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Sorted by match score · Prototype demonstration data</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {matches.map(m => {
            const [tbg, tc] = typeColors[m.type] || ['#f1f5f9', '#475569'];
            const isOpen = expanded === m.id;
            return (
              <div key={m.id} style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                {/* Card header */}
                <div style={{ padding: '1.5rem', borderLeft: `4px solid ${scoreColor(m.match_score)}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ background: tbg, color: tc, padding: '0.2rem 0.625rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600 }}>{m.type}</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>{m.funding_company}</span>
                      </div>
                      <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.375rem' }}>{m.name}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>{m.description}</p>
                      <div style={{ marginTop: '0.625rem', fontSize: '0.8125rem', color: '#475569' }}>
                        <strong>Range:</strong> R{m.min_amount?.toLocaleString()} – R{m.max_amount?.toLocaleString()}
                        &nbsp;·&nbsp; <strong>Deadline:</strong> {m.application_deadline || 'Open'}
                      </div>
                    </div>
                    {/* Score badge */}
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ background: scoreBg(m.match_score), border: `2px solid ${scoreBorder(m.match_score)}`, borderRadius: '0.75rem', padding: '0.75rem 1.25rem' }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: scoreColor(m.match_score), lineHeight: 1 }}>{m.match_score}%</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: scoreColor(m.match_score), marginTop: '0.25rem' }}>MATCH</div>
                      </div>
                    </div>
                  </div>

                  {/* Primary reason */}
                  <div style={{ marginTop: '1rem', background: '#f8fafc', borderRadius: '0.5rem', padding: '0.875rem', fontSize: '0.875rem' }}>
                    <span style={{ fontWeight: 600, color: '#0a2240' }}>Why this match? </span>
                    <span style={{ color: '#475569' }}>{m.primaryReason}</span>
                  </div>

                  {/* Actions */}
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setExpanded(isOpen ? null : m.id)}
                      style={{ background: 'white', color: '#1a4f8a', border: '1.5px solid #1a4f8a', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}
                    >
                      {isOpen ? 'Hide Details ▲' : 'View Eligibility Details ▼'}
                    </button>
                    <button
                      onClick={() => { localStorage.setItem('selectedOpportunity', JSON.stringify(m)); navigate('/applications'); }}
                      style={{ background: 'linear-gradient(135deg,#1a7a4a,#22a05a)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1.25rem', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}
                    >
                      Apply Now →
                    </button>
                  </div>
                </div>

                {/* Expanded eligibility breakdown */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid #e2e8f0', padding: '1.5rem', background: '#fafafa' }}>
                    <h4 style={{ fontWeight: 700, color: '#0a2240', marginBottom: '1rem', fontSize: '0.9375rem' }}>Eligibility Assessment</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {(m.criteriaMatches || []).map(c => (
                        <div key={c.criteria} style={{ background: 'white', borderRadius: '0.5rem', border: `1px solid ${c.met ? '#bbf7d0' : '#fecaca'}`, padding: '0.875rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                            <span style={{ fontSize: '1rem' }}>{c.met ? '✅' : '⚠️'}</span>
                            <span style={{ fontWeight: 600, color: '#0a2240', fontSize: '0.875rem' }}>{c.criteria}</span>
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{c.detail}</div>
                        </div>
                      ))}
                    </div>

                    {m.gaps && m.gaps.length > 0 && (
                      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                        <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Potential gaps to address:</div>
                        {m.gaps.map((g, i) => <div key={i} style={{ fontSize: '0.8125rem', color: '#92400e' }}>• {g}</div>)}
                      </div>
                    )}

                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1rem' }}>
                      <span style={{ fontWeight: 600, color: '#1e40af', fontSize: '0.875rem' }}>Recommended next action: </span>
                      <span style={{ color: '#1e40af', fontSize: '0.875rem' }}>{m.nextAction}</span>
                    </div>

                    <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                      AI-assisted recommendation. Final eligibility determined by {m.funding_company}. Contact: {m.contact_email}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {matches.length === 0 && !loading && profile && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontWeight: 700, color: '#0a2240', marginBottom: '0.5rem' }}>No matches found</h3>
            <p style={{ color: '#64748b' }}>Update your profile or click Refresh Matches to search again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundingOpportunities;
