import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',                      label: 'Dashboard' },
  { to: '/profile',               label: 'Business Profile' },
  { to: '/funding-opportunities', label: 'Find Funding' },
  { to: '/applications',          label: 'Applications' },
  { to: '/documents',             label: 'Documents' },
  { to: '/notifications',         label: 'Notifications' },
];

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = path => location.pathname === path;

  const businessName = user?.companyData?.companyName || user?.username || 'User';

  return (
    <nav className="gov-navbar">

      {/* ── Top identity bar ── */}
      <div className="gov-navbar-top">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0.6rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: 40, height: 40, background: 'var(--grad-blue)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-blue)', flexShrink: 0 }}>
              <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1.125rem' }}>G</span>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                Funding Intelligence Platform
              </div>
              <div style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Four Horsemen Technologies · SMME Portal
              </div>
            </div>
          </div>

          {/* User + actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'white', fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.2 }}>{businessName}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem', letterSpacing: '0.04em' }}>Logged in as SMME</div>
            </div>
            <Link to="/support" className="gov-btn gov-btn-ghost" style={{ padding: '0.375rem 0.875rem', fontSize: '0.8125rem' }}>
              Help
            </Link>
            <button
              onClick={() => { onLogout(); navigate('/'); }}
              className="gov-btn"
              style={{ background: '#c0392b', color: 'white', padding: '0.375rem 1rem', fontSize: '0.8125rem', boxShadow: 'none' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ── Nav links bar ── */}
      <div className="gov-navbar-links">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '3rem' }}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`gov-nav-link${isActive(to) ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
