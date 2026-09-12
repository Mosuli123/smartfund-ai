import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockLogin } from '../data/mockData';

const SMMELogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const userCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
      if (
        userCredentials[credentials.username] &&
        userCredentials[credentials.username].password === credentials.password &&
        userCredentials[credentials.username].role === 'smme'
      ) {
        onLogin({ user_id: credentials.username, username: credentials.username, role: 'smme', companyData: userCredentials[credentials.username].cipcData, token: 'smme_token_' + Date.now() });
      } else {
        const result = mockLogin(credentials.username, credentials.password);
        if (result.success) {
          onLogin({ ...result.data, role: 'smme' });
        } else {
          setError('Invalid credentials. Complete CIPC verification first to create your account.');
        }
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'var(--font)' }}>

      {/* ── Left hero panel ── */}
      <div className="gov-hero" style={{ flex: '0 0 45%', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', marginBottom: '3rem' }}>
            <div style={{ width: 36, height: 36, background: 'var(--grad-blue)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1rem' }}>G</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', fontWeight: 600 }}>← Back to Portal</span>
          </Link>

          <span className="gov-badge gov-badge-gold" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>SMME Portal</span>

          <h1 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Access Government<br />
            <span style={{ background: 'linear-gradient(90deg,#c8922a,#e8a830)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Funding Opportunities
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 360 }}>
            AI-powered matching connects your business to the right government funding programmes — with explainable scores and one-click applications.
          </p>
        </div>

        {/* Feature list */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {[
            ['🎯', 'AI funding match scores with explanations'],
            ['🏛️', '8 national SA government programmes'],
            ['📋', 'Auto-generated application drafts'],
            ['🔒', 'CIPC-verified business accounts'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.875rem' }}>
              <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{icon}</div>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{text}</span>
            </div>
          ))}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>
            Four Horsemen Technologies · SITA GovTech Hackathon 2026
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div style={{ flex: 1, background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Welcome back</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9375rem' }}>Sign in to your verified business account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {error && (
              <div className="gov-alert gov-alert-danger anim-scale-in">
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Username</label>
              <input type="text" required className="modern-input" placeholder="Enter your username"
                value={credentials.username}
                onChange={e => setCredentials({ ...credentials, username: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Password</label>
              <input type="password" required className="modern-input" placeholder="Enter your password"
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
            </div>

            <button type="submit" disabled={loading} className="gov-btn gov-btn-primary" style={{ width: '100%', padding: '0.9375rem', fontSize: '1rem', marginTop: '0.25rem' }}>
              {loading && <span className="loading-spinner" />}
              {loading ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'var(--blue-50)', borderRadius: 'var(--r-lg)', border: '1px solid var(--blue-100)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--blue)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Credentials</div>
            <code style={{ fontSize: '0.875rem', color: 'var(--navy)' }}>demo / password123</code>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>Business not yet verified?</p>
            <Link to="/cipc-verification" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
              Complete CIPC Verification →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMMELogin;
