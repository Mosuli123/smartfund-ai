import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ElidzAdminLogin = ({ onElidzAdminLogin }) => {
  const [credentials, setCredentials] = useState({ username: 'sita_super_admin', password: 'SITA2026!' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (credentials.username === 'sita_super_admin' && credentials.password === 'SITA2026!') {
        const adminData = {
          user_id: 'sita_super_admin',
          username: 'sita_super_admin',
          role: 'sita_admin',
          fullName: 'SITA System Administrator',
          organization: 'State Information Technology Agency (SITA)',
          permissions: ['system_admin', 'user_management', 'reports', 'funding_admin_management'],
          token: 'sita_admin_token_' + Date.now()
        };
        onElidzAdminLogin(adminData);
        navigate('/sita-admin/dashboard');
      } else {
        setError('Invalid SITA Administrator credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ background: '#0a2240', borderBottom: '3px solid #1a7a4a', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#1a7a4a,#22a05a)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '0.875rem' }}>S</span>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>SITA GovTech</div>
              <div style={{ color: '#1a7a4a', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>System Administration Portal</div>
            </div>
          </div>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </header>

      {/* Login Card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(10,34,64,0.08)', padding: '2.5rem', borderTop: '4px solid #1a7a4a' }}>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#1a7a4a,#22a05a)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.375rem' }}>SITA System Admin</h1>
              <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Restricted access — authorised personnel only</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', padding: '0.875rem', color: '#991b1b', fontSize: '0.875rem' }}>{error}</div>
              )}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>SITA Admin Username</label>
                <input type="text" required className="modern-input" value={credentials.username}
                  onChange={e => setCredentials({ ...credentials, username: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>System Password</label>
                <input type="password" required className="modern-input" value={credentials.password}
                  onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
              </div>
              <button type="submit" disabled={loading}
                style={{ background: 'linear-gradient(135deg,#1a7a4a,#22a05a)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.875rem', fontWeight: 700, fontSize: '0.9375rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                {loading && <span className="loading-spinner" />}
                {loading ? 'Authenticating...' : 'Access System Administration'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
              <p style={{ fontSize: '0.8125rem', color: '#166534', marginBottom: '0.375rem', fontWeight: 600 }}>Demo credentials:</p>
              <p style={{ fontSize: '0.8125rem', color: '#166534', fontFamily: 'monospace' }}>sita_super_admin / SITA2026!</p>
            </div>

            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fef2f2', borderRadius: '0.5rem', border: '1px solid #fecaca', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8125rem', color: '#991b1b', fontWeight: 600 }}>🔒 SITA Staff Only — Unauthorised access is prohibited</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElidzAdminLogin;
