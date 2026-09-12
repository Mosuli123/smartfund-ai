import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApplications, getAdminStats } from '../services/applicationStore';

const GOV_PROGRAMMES = {
  'funding_admin': { org: 'Department of Small Business Development (DSBD)', programmes: ['SEDA Grant', 'BBSDP', 'Co-operative Incentive Scheme'] },
  'programme_mgr': { org: 'Small Enterprise Development Agency (SEDA)', programmes: ['Seda Technology Programme', 'Business Development Support', 'Incubation Support'] },
  'sita_admin': { org: 'State Information Technology Agency (SITA)', programmes: ['GovTech Innovation Fund', 'Digital Transformation Grant'] },
  'default': { org: 'Government Funding Programme', programmes: ['National SMME Fund'] }
};

const AdminDashboard = ({ admin }) => {
  const [stats, setStats] = useState({ totalProgrammes: 0, activeApplications: 0, pendingReview: 0, totalDisbursed: 0, approvedThisMonth: 0, rejectedThisMonth: 0 });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const providerInfo = GOV_PROGRAMMES[admin?.username] || GOV_PROGRAMMES['default'];

  useEffect(() => {
    const customOpportunities = JSON.parse(localStorage.getItem('customOpportunities') || '[]');
    const s = getAdminStats();
    setStats({
      totalProgrammes: customOpportunities.length + 8,
      activeApplications: s.total,
      pendingReview: s.pending + s.underReview,
      totalDisbursed: 34700000,
      approvedThisMonth: s.approved,
      rejectedThisMonth: s.rejected,
    });
    const all = getApplications();
    setRecentApplications(
      [...all].sort((a, b) => new Date(b.submitted || b.submission_date) - new Date(a.submitted || a.submission_date)).slice(0, 5)
    );
    setLoading(false);
  }, []);

  const statusStyle = (status) => {
    if (status === 'Approved') return { background: '#dcfce7', color: '#166534' };
    if (status === 'Under Review') return { background: '#dbeafe', color: '#1e40af' };
    if (status === 'Rejected') return { background: '#fee2e2', color: '#991b1b' };
    return { background: '#fef9c3', color: '#854d0e' };
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loading-spinner" style={{ width: 40, height: 40, margin: '0 auto 1rem' }} />
        <p style={{ color: '#64748b' }}>Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #0a2240 0%, #1a4f8a 100%)', borderRadius: '0.75rem', padding: '1.5rem 2rem', marginBottom: '2rem', borderBottom: '3px solid #c8922a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                Funding Programme Administration
              </h1>
              <p style={{ color: '#93c5fd', fontSize: '0.9375rem' }}>{providerInfo.org}</p>
              <p style={{ color: '#c8922a', fontSize: '0.8125rem', marginTop: '0.25rem', fontWeight: 600 }}>
                Active Programmes: {providerInfo.programmes.join(' • ')}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'white', fontWeight: 600 }}>Welcome, {admin?.username || 'Admin'}</div>
              <div style={{ color: '#93c5fd', fontSize: '0.8125rem' }}>Last login: {new Date().toLocaleDateString('en-ZA')}</div>
              <div style={{ marginTop: '0.5rem', display: 'inline-block', background: '#c8922a', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                FUNDING PROVIDER
              </div>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Active Programmes', value: stats.totalProgrammes, color: '#1a4f8a', bg: '#eff6ff', icon: '📋' },
            { label: 'Total Applications', value: stats.activeApplications, color: '#0a2240', bg: '#f0f4f8', icon: '📄' },
            { label: 'Pending Review', value: stats.pendingReview, color: '#b45309', bg: '#fffbeb', icon: '⏳' },
            { label: 'Approved This Month', value: stats.approvedThisMonth, color: '#166534', bg: '#f0fdf4', icon: '✅' },
            { label: 'Total Disbursed', value: `R${(stats.totalDisbursed / 1000000).toFixed(1)}M`, color: '#1a7a4a', bg: '#f0fdf4', icon: '💰' },
            { label: 'Declined This Month', value: stats.rejectedThisMonth, color: '#991b1b', bg: '#fef2f2', icon: '❌' },
          ].map((kpi, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', borderTop: `3px solid ${kpi.color}` }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{kpi.icon}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 500 }}>{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0a2240', marginBottom: '1rem' }}>Programme Management</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { label: '+ Create Programme', desc: 'Add new funding opportunity', to: '/admin/create-opportunity', bg: 'linear-gradient(135deg,#0a2240,#1a4f8a)' },
              { label: '📋 Manage Programmes', desc: 'Edit & monitor opportunities', to: '/admin/manage-opportunities', bg: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)' },
              { label: '📥 Review Applications', desc: `${stats.pendingReview} awaiting decision`, to: '/admin/review-applications', bg: 'linear-gradient(135deg,#c8922a,#e8a830)' },
              { label: '📊 Reports & Analytics', desc: 'Programme performance data', to: '/admin/reports', bg: 'linear-gradient(135deg,#1a7a4a,#22a05a)' },
            ].map((action, i) => (
              <Link key={i} to={action.to} style={{ background: action.bg, color: 'white', borderRadius: '0.625rem', padding: '1.25rem', textDecoration: 'none', display: 'block', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{action.label}</div>
                <div style={{ fontSize: '0.8125rem', opacity: 0.85 }}>{action.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Applications Table */}
        <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0a2240' }}>Recent Applications</h2>
            <Link to="/admin/review-applications" style={{ color: '#1a4f8a', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
              View all →
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Company', 'Programme', 'Amount Requested', 'AI Score', 'Status', 'Submitted', 'Action'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app, i) => (
                  <tr key={app.id} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: '#1e293b', fontSize: '0.875rem' }}>{app.company}</td>
                    <td style={{ padding: '0.875rem 1rem', color: '#475569', fontSize: '0.8125rem' }}>{app.programme || app.opportunity_name}</td>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 700, color: '#0a2240', fontSize: '0.875rem' }}>R{(app.amount || app.amount_requested)?.toLocaleString()}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ fontWeight: 700, color: (app.score || app.match_score) >= 85 ? '#166534' : (app.score || app.match_score) >= 70 ? '#b45309' : '#991b1b', fontSize: '0.875rem' }}>{app.score || app.match_score}%</span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ ...statusStyle(app.status), padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>{app.status}</span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', color: '#64748b', fontSize: '0.8125rem' }}>{app.submitted}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <Link to="/admin/review-applications" style={{ color: '#1a4f8a', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none' }}>Review</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
