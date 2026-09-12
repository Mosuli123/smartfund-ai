import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ADMIN_ACCOUNTS = {
  'funding_admin': { password: 'admin2026', companyName: 'Department of Small Business Development', industry: 'Government', focusAreas: ['SMME Development', 'Funding Administration'], contactEmail: 'admin@dsbd.gov.za' },
  'programme_mgr': { password: 'prog2026', companyName: 'Small Enterprise Development Agency (SEDA)', industry: 'Government', focusAreas: ['Programme Management', 'SMME Support'], contactEmail: 'programmes@seda.org.za' },
  'sita_admin': { password: 'sita2026', companyName: 'SITA GovTech (System Admin)', industry: 'Government Technology', focusAreas: ['Digital Government', 'SMME Enablement'], contactEmail: 'admin@sita.co.za' },
};

const AdminLogin = ({ onAdminLogin }) => {
  const [credentials, setCredentials] = useState({ username: 'funding_admin', password: 'admin2026' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('adminCredentials') || '{}');
      const storedUser = stored[credentials.username];
      const builtIn = ADMIN_ACCOUNTS[credentials.username];

      if (storedUser && storedUser.password === credentials.password) {
        onAdminLogin({ user_id: credentials.username, username: credentials.username, role: 'admin', fullName: storedUser.fullName, email: storedUser.email, token: 'admin_token_' + Date.now() });
      } else if (builtIn && builtIn.password === credentials.password) {
        onAdminLogin({ user_id: credentials.username, username: credentials.username, role: 'admin', companyName: builtIn.companyName, industry: builtIn.industry, focusAreas: builtIn.focusAreas, contactEmail: builtIn.contactEmail, token: 'admin_token_' + Date.now() });
      } else {
        setError('Invalid credentials.');
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ background: '#0a2240', borderBottom: '3px solid #c8922a', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#c8922a,#e8a830)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '0.875rem' }}>A</span>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>Funding Programme Administration</div>
              <div style={{ color: '#c8922a', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Government Funding Intelligence & Access Platform</div>
            </div>
          </div>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 4rem)', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(10,34,64,0.08)', padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#c8922a,#e8a830)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.375rem' }}>Programme Admin Login</h1>
              <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Manage funding programmes and review applications</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', padding: '0.875rem', color: '#991b1b', fontSize: '0.875rem' }}>{error}</div>
              )}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Username</label>
                <input type="text" required className="modern-input" value={credentials.username}
                  onChange={e => setCredentials({ ...credentials, username: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Password</label>
                <input type="password" required className="modern-input" value={credentials.password}
                  onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
              </div>
              <button type="submit" disabled={loading}
                style={{ background: 'linear-gradient(135deg,#c8922a,#e8a830)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.875rem', fontWeight: 600, fontSize: '0.9375rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                {loading && <span className="loading-spinner" />}
                {loading ? 'Signing In...' : 'Access Admin Dashboard'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fffbeb', borderRadius: '0.5rem', border: '1px solid #fde68a' }}>
              <p style={{ fontSize: '0.8125rem', color: '#92400e', marginBottom: '0.375rem', fontWeight: 600 }}>Demo credentials:</p>
              <p style={{ fontSize: '0.8125rem', color: '#92400e', fontFamily: 'monospace' }}>funding_admin / admin2026</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
              <Link to="/admin/register" style={{ color: '#c8922a', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500 }}>Register as Admin</Link>
              <Link to="/" style={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none' }}>← Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
