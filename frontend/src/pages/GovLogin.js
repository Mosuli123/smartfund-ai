import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GOV_CREDENTIALS = {
  'gov_analyst': { password: 'govtech2026', name: 'Dr. Nomsa Dlamini', role: 'Senior Policy Analyst', dept: 'Department of Small Business Development' },
  'gov_admin':   { password: 'admin2026',   name: 'Mr. Sipho Nkosi',   role: 'Programme Administrator', dept: 'Department of Trade, Industry and Competition' },
};

const GovLogin = ({ onGovLogin }) => {
  const [credentials, setCredentials] = useState({ username: 'gov_analyst', password: 'govtech2026' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const user = GOV_CREDENTIALS[credentials.username];
      if (user && user.password === credentials.password) {
        const govData = { user_id: credentials.username, username: credentials.username, name: user.name, role: user.role, dept: user.dept, token: 'gov_token_' + Date.now() };
        localStorage.setItem('govToken', govData.token);
        localStorage.setItem('govUser', JSON.stringify(govData));
        if (onGovLogin) onGovLogin(govData);
        navigate('/gov/dashboard');
      } else {
        setError('Invalid credentials. Use the demo accounts below.');
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'var(--font)' }}>

      {/* ── Left hero panel ── */}
      <div style={{ flex: '0 0 45%', background: 'linear-gradient(160deg,#061628 0%,#0a2240 40%,#1a7a4a 100%)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 80% 30%, rgba(26,122,74,0.3) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', marginBottom: '3rem' }}>
            <div style={{ width: 36, height: 36, background: 'var(--grad-green)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '1rem' }}>G</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: 600 }}>← Back to Portal</span>
          </Link>

          <span className="gov-badge" style={{ background: 'rgba(26,122,74,0.3)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', marginBottom: '1.5rem', display: 'inline-flex' }}>
            Government Intelligence Portal
          </span>

          <h1 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Funding Demand<br />
            <span style={{ background: 'linear-gradient(90deg,#4ade80,#22a05a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Intelligence
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 360 }}>
            Evidence-based analytics for policy analysts and government officials to understand the national funding ecosystem.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {[
            ['📊', 'Sector demand intelligence by industry'],
            ['🗺️', 'Province-level funding gap analysis'],
            ['🏆', 'Programme performance & AI insights'],
            ['🚧', 'Eligibility barrier identification'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.875rem' }}>
              <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{icon}</div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{text}</span>
            </div>
          ))}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            Four Horsemen Technologies · SITA GovTech Hackathon 2026
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div style={{ flex: 1, background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Intelligence Portal</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9375rem' }}>Access funding demand analytics and programme intelligence</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {error && (
              <div className="gov-alert gov-alert-danger anim-scale-in">
                <span>⚠</span><span>{error}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Username</label>
              <input type="text" required className="modern-input" value={credentials.username}
                onChange={e => setCredentials({ ...credentials, username: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Password</label>
              <input type="password" required className="modern-input" value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
            </div>

            <button type="submit" disabled={loading} className="gov-btn gov-btn-green" style={{ width: '100%', padding: '0.9375rem', fontSize: '1rem', marginTop: '0.25rem' }}>
              {loading && <span className="loading-spinner" />}
              {loading ? 'Signing In...' : 'Access Intelligence Dashboard'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'var(--green-50)', borderRadius: 'var(--r-lg)', border: '1px solid var(--green-100)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Credentials</div>
            <code style={{ fontSize: '0.875rem', color: 'var(--navy)' }}>gov_analyst / govtech2026</code>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/" style={{ color: 'var(--gray-500)', fontSize: '0.875rem', textDecoration: 'none' }}>← Return to Role Selection</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovLogin;
