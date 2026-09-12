import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ admin, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/manage-opportunities', label: 'Programmes' },
    { path: '/admin/review-applications', label: 'Applications' },
    { path: '/admin/create-opportunity', label: 'Add Programme' },
    { path: '/admin/reports', label: 'Reports' },
  ];

  const linkStyle = (path) => ({
    color: isActive(path) ? '#c8922a' : 'rgba(255,255,255,0.75)',
    background: isActive(path) ? 'rgba(200,146,42,0.15)' : 'transparent',
    borderBottom: isActive(path) ? '2px solid #c8922a' : '2px solid transparent',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: isActive(path) ? 700 : 500,
    padding: '0.4rem 0.75rem',
    whiteSpace: 'nowrap',
    transition: 'all 0.15s',
  });

  return (
    <nav style={{ background: '#0a2240', borderBottom: '3px solid #c8922a', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>

          {/* Brand */}
          <Link to="/admin/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#c8922a,#e8a830)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '1rem' }}>G</span>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2 }}>GovTech Funding Platform</div>
              <div style={{ color: '#c8922a', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Funding Provider Portal</div>
            </div>
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
            {navItems.map(({ path, label }) => (
              <Link key={path} to={path} style={linkStyle(path)}>{label}</Link>
            ))}
          </div>

          {/* User + Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'white', fontSize: '0.8125rem', fontWeight: 600 }}>
                {admin?.companyName || admin?.username || 'Admin'}
              </div>
              <div style={{ color: '#c8922a', fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Funding Provider
              </div>
            </div>
            <button
              onClick={() => { onLogout(); navigate('/'); }}
              style={{ background: '#c0392b', color: 'white', border: 'none', padding: '0.375rem 0.875rem', borderRadius: '0.375rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
