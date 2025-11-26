import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ElidzHeader from '../components/ElidzHeader';
import ElidzFooter from '../components/ElidzFooter';
import Logo from '../components/Logo';

const ElidzAdminLogin = ({ onElidzAdminLogin }) => {
  const [credentials, setCredentials] = useState({
    username: 'elidz_super_admin',
    password: 'ELIDZ2024!'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Check ELIDZ super admin credentials
      if (credentials.username === 'elidz_super_admin' && credentials.password === 'ELIDZ2024!') {
        const adminData = {
          user_id: 'elidz_super_admin',
          username: 'elidz_super_admin',
          role: 'elidz_admin',
          fullName: 'ELIDZ System Administrator',
          organization: 'East London Industrial Development Zone',
          permissions: ['system_admin', 'user_management', 'reports', 'funding_admin_management'],
          token: 'elidz_admin_token_' + Date.now()
        };
        onElidzAdminLogin(adminData);
      } else {
        setError('Invalid ELIDZ Administrator credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #fef7f0 0%, #f0f4f8 100%)'}}>
      <ElidzHeader />
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full space-y-8 modern-card p-8 border-t-4" style={{borderColor: '#4180be'}}>
          <div>
            <div className="flex justify-center mb-6">
              <Logo className="h-12" />
            </div>
            <h2 className="text-center heading-2" style={{color: '#1e3a5f'}}>
              ELIDZ System Admin
            </h2>
            <p className="mt-2 text-center text-sm font-medium" style={{color: '#4180be'}}>
              Restricted Access - System Administration Only
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                  ELIDZ Admin Username
                </label>
                <input
                  type="text"
                  required
                  className="modern-input"
                  placeholder="Enter ELIDZ admin username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                  System Password
                </label>
                <input
                  type="password"
                  required
                  className="modern-input"
                  placeholder="Enter system password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-bold disabled:opacity-50 transition-all"
              style={{background: 'linear-gradient(135deg, #4180be 0%, #2d4a6b 100%)', color: 'white'}}
            >
              {loading ? 'Authenticating...' : 'Access System Administration'}
            </button>
            
            <div className="text-center space-y-3">
              <div className="p-3 rounded-lg border" style={{background: 'rgba(231, 126, 34, 0.1)', borderColor: '#e67e22'}}>
                <p className="text-sm font-medium" style={{color: '#b8470f'}}>
                  ELIDZ Staff Only - Unauthorized access prohibited
                </p>
              </div>
              <div className="text-xs" style={{color: '#64748b'}}>
                <p>Demo Credentials:</p>
                <p>Username: elidz_super_admin</p>
                <p>Password: ELIDZ2024!</p>
              </div>
              <div className="border-t pt-3">
                <Link to="/" className="text-sm transition-colors" style={{color: '#e67e22'}} onMouseEnter={(e) => e.target.style.color = '#d35400'} onMouseLeave={(e) => e.target.style.color = '#e67e22'}>
                  ← Back to role selection
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ElidzFooter />
    </div>
  );
};

export default ElidzAdminLogin;