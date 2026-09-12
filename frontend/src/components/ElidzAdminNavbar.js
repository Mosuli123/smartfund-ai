import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ModernIcons } from './ModernIcons';

const ElidzAdminNavbar = ({ admin, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/sita-admin/dashboard', label: 'Dashboard', icon: ModernIcons.Home },
    { path: '/sita-admin/user-management', label: 'Users', icon: ModernIcons.Users },
    { path: '/sita-admin/approve-users', label: 'Approvals', icon: ModernIcons.CheckCircle },
    { path: '/sita-admin/funding-admins', label: 'Providers', icon: ModernIcons.Briefcase },
    { path: '/sita-admin/reports', label: 'Reports', icon: ModernIcons.FileText },
    { path: '/sita-admin/analytics', label: 'Analytics', icon: ModernIcons.Chart },
  ];

  const linkStyle = (path) => ({
    display: 'flex', alignItems: 'center', gap: '0.375rem',
    padding: '0.4rem 0.75rem', borderRadius: '0.375rem',
    textDecoration: 'none', fontSize: '0.875rem', fontWeight: isActive(path) ? 700 : 500,
    color: isActive(path) ? '#c8922a' : 'rgba(255,255,255,0.75)',
    background: isActive(path) ? 'rgba(200,146,42,0.15)' : 'transparent',
    whiteSpace: 'nowrap', transition: 'all 0.15s',
  });

  return (
    <nav style={{ background: '#0a2240', borderBottom: '3px solid #1a7a4a', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>

          {/* Brand */}
          <Link to="/sita-admin/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#1a7a4a,#22a05a)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ModernIcons.Shield style={{ width: 20, height: 20, color: 'white' }} />
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2 }}>SITA GovTech</div>
              <div style={{ color: '#1a7a4a', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>System Administration</div>
            </div>
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path} style={linkStyle(path)}>
                <Icon style={{ width: 14, height: 14 }} />
                {label}
              </Link>
            ))}
          </div>

          {/* User + Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(26,122,74,0.2)', padding: '0.375rem 0.75rem', borderRadius: '0.375rem' }}>
              <ModernIcons.Shield style={{ width: 14, height: 14, color: '#1a7a4a' }} />
              <span style={{ color: 'white', fontSize: '0.8125rem', fontWeight: 600 }}>
                {admin?.fullName || 'SITA Admin'}
              </span>
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

export default ElidzAdminNavbar;
