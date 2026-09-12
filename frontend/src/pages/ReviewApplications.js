import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApplications, updateApplicationStatus } from '../services/applicationStore';

const ReviewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const [actionLoading, setActionLoading] = useState(false);
  const [note, setNote] = useState('');
  const [searchParams] = useSearchParams();
  const opportunityId = searchParams.get('opportunityId');

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const filtered = applications.filter(a => {
    const statusOk = filter === 'All' || a.status === filter;
    const oppOk = !opportunityId || a.opportunityId === opportunityId;
    return statusOk && oppOk;
  });

  const counts = { All: applications.length, Pending: 0, 'Under Review': 0, Approved: 0, Rejected: 0 };
  applications.forEach(a => { if (counts[a.status] !== undefined) counts[a.status]++; });

  const updateStatus = (id, newStatus) => {
    setActionLoading(true);
    setTimeout(() => {
      const updated = updateApplicationStatus(id, newStatus, note);
      setApplications(updated);
      setSelected(prev => prev?.id === id ? { ...prev, status: newStatus, reviewNote: note, reviewDate: new Date().toISOString().split('T')[0] } : prev);
      setNote('');
      setActionLoading(false);
    }, 800);
  };

  const statusStyle = (status) => {
    if (status === 'Approved') return { background: '#dcfce7', color: '#166534' };
    if (status === 'Under Review') return { background: '#dbeafe', color: '#1e40af' };
    if (status === 'Rejected') return { background: '#fee2e2', color: '#991b1b' };
    return { background: '#fef9c3', color: '#854d0e' };
  };

  const scoreColor = (s) => s >= 85 ? '#166534' : s >= 70 ? '#b45309' : '#991b1b';

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0a2240', marginBottom: '0.25rem' }}>Application Review</h1>
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Review, assess and make funding decisions on SMME applications</p>
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {['All', 'Pending', 'Under Review', 'Approved', 'Rejected'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem',
                background: filter === s ? '#0a2240' : 'white', color: filter === s ? 'white' : '#475569',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              {s} ({counts[s] ?? filtered.length})
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* Applications List */}
          <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', fontWeight: 700, color: '#0a2240', fontSize: '0.9375rem' }}>
              {filtered.length} Application{filtered.length !== 1 ? 's' : ''}
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No applications match this filter.</div>
            ) : (
              filtered.map(app => (
                <div key={app.id} onClick={() => setSelected(app)}
                  style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', cursor: 'pointer',
                    background: selected?.id === app.id ? '#eff6ff' : 'white',
                    borderLeft: selected?.id === app.id ? '4px solid #1a4f8a' : '4px solid transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#0a2240', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{app.company}</div>
                      <div style={{ color: '#64748b', fontSize: '0.8125rem', marginBottom: '0.5rem' }}>{app.programme}</div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8125rem', color: '#475569', flexWrap: 'wrap' }}>
                        <span>💰 R{app.amount.toLocaleString()}</span>
                        <span>📍 {app.province}</span>
                        <span>🏭 {app.industry}</span>
                        <span>📅 {app.submitted}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ ...statusStyle(app.status), padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>{app.status}</span>
                      <span style={{ fontWeight: 800, color: scoreColor(app.score), fontSize: '0.9375rem' }}>{app.score}%</span>
                      <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>AI Score</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden', position: 'sticky', top: '1rem' }}>
              <div style={{ background: 'linear-gradient(135deg,#0a2240,#1a4f8a)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9375rem' }}>{selected.company}</div>
                  <div style={{ color: '#93c5fd', fontSize: '0.8125rem' }}>CIPC: {selected.cipc}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', borderRadius: '0.375rem', padding: '0.25rem 0.625rem', cursor: 'pointer', fontSize: '0.875rem' }}>✕</button>
              </div>

              <div style={{ padding: '1.25rem 1.5rem', maxHeight: '75vh', overflowY: 'auto' }}>

                {/* AI Score */}
                <div style={{ background: '#f8fafc', borderRadius: '0.625rem', padding: '1rem', marginBottom: '1.25rem', textAlign: 'center', border: `2px solid ${scoreColor(selected.score)}20` }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: scoreColor(selected.score) }}>{selected.score}%</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>AI Match Score</div>
                  <div style={{ fontSize: '0.75rem', color: scoreColor(selected.score), marginTop: '0.25rem' }}>
                    {selected.score >= 85 ? '✅ Strong candidate — recommend approval' : selected.score >= 70 ? '⚠️ Moderate match — review carefully' : '❌ Weak match — likely ineligible'}
                  </div>
                </div>

                {/* Programme */}
                <section style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>Programme Applied For</h4>
                  <div style={{ background: '#eff6ff', borderRadius: '0.5rem', padding: '0.75rem', fontSize: '0.875rem', color: '#1e40af', fontWeight: 600 }}>{selected.programme}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.375rem' }}>Provider: {selected.provider}</div>
                </section>

                {/* Business Info */}
                <section style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>Business Information</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8125rem' }}>
                    {[
                      ['Industry', selected.industry], ['Province', selected.province],
                      ['Employees', selected.employees], ['Years Operating', `${selected.yearsOp} yrs`],
                      ['Annual Turnover', `R${selected.turnover?.toLocaleString()}`], ['Contact', selected.email],
                    ].map(([k, v]) => (
                      <div key={k} style={{ background: '#f8fafc', borderRadius: '0.375rem', padding: '0.5rem 0.625rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase' }}>{k}</div>
                        <div style={{ color: '#1e293b', fontWeight: 600 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Funding Purpose */}
                <section style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Funding Purpose</h4>
                  <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, background: '#f8fafc', borderRadius: '0.5rem', padding: '0.75rem' }}>{selected.purpose}</p>
                  <div style={{ marginTop: '0.5rem', fontWeight: 700, color: '#0a2240', fontSize: '0.9375rem' }}>Amount: R{selected.amount?.toLocaleString()}</div>
                </section>

                {/* Criteria */}
                {selected.criteriaMatches?.length > 0 && (
                  <section style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Eligibility Criteria Met</h4>
                    {selected.criteriaMatches.map((c, i) => (
                      <div key={i} style={{ fontSize: '0.8125rem', color: '#166534', background: '#f0fdf4', borderRadius: '0.375rem', padding: '0.375rem 0.625rem', marginBottom: '0.25rem' }}>{c}</div>
                    ))}
                  </section>
                )}

                {/* Gaps */}
                {selected.gaps?.length > 0 && (
                  <section style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Gaps / Concerns</h4>
                    {selected.gaps.map((g, i) => (
                      <div key={i} style={{ fontSize: '0.8125rem', color: '#991b1b', background: '#fef2f2', borderRadius: '0.375rem', padding: '0.375rem 0.625rem', marginBottom: '0.25rem' }}>⚠️ {g}</div>
                    ))}
                  </section>
                )}

                {/* Current Status */}
                <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>Current Status:</span>
                  <span style={{ ...statusStyle(selected.status), padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 700 }}>{selected.status}</span>
                </div>

                {/* Review Note */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>Review Note (optional)</label>
                  <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                    placeholder="Add a note for the applicant or internal record..."
                    style={{ width: '100%', padding: '0.625rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.8125rem', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selected.status === 'Pending' && (
                    <button onClick={() => updateStatus(selected.id, 'Under Review')} disabled={actionLoading}
                      style={{ background: '#1a4f8a', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.75rem', fontWeight: 700, cursor: 'pointer', opacity: actionLoading ? 0.6 : 1 }}>
                      {actionLoading ? 'Processing...' : '🔍 Start Review'}
                    </button>
                  )}
                  {(selected.status === 'Pending' || selected.status === 'Under Review') && (
                    <>
                      <button onClick={() => updateStatus(selected.id, 'Approved')} disabled={actionLoading}
                        style={{ background: '#166534', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.75rem', fontWeight: 700, cursor: 'pointer', opacity: actionLoading ? 0.6 : 1 }}>
                        {actionLoading ? 'Processing...' : '✅ Approve Application'}
                      </button>
                      <button onClick={() => updateStatus(selected.id, 'Rejected')} disabled={actionLoading}
                        style={{ background: '#991b1b', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.75rem', fontWeight: 700, cursor: 'pointer', opacity: actionLoading ? 0.6 : 1 }}>
                        {actionLoading ? 'Processing...' : '❌ Decline Application'}
                      </button>
                    </>
                  )}
                  {(selected.status === 'Approved' || selected.status === 'Rejected') && (
                    <div style={{ background: '#f8fafc', borderRadius: '0.5rem', padding: '0.75rem', fontSize: '0.8125rem', color: '#64748b', textAlign: 'center' }}>
                      Decision recorded on {selected.reviewDate || 'file'}
                    </div>
                  )}
                  <button style={{ background: 'white', color: '#1a4f8a', border: '1.5px solid #1a4f8a', borderRadius: '0.5rem', padding: '0.625rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                    📧 Contact Applicant
                  </button>
                  <button style={{ background: 'white', color: '#475569', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', padding: '0.625rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                    📥 Download Application
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewApplications;
