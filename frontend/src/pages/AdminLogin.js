import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { UserIcon, SecurityIcon } from '../components/Icons';

const AdminLogin = ({ onAdminLogin }) => {
  const [credentials, setCredentials] = useState({
    username: 'elidz_admin',
    password: 'elidz123'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock funding companies database
  const fundingCompanies = {
    'elidz_admin': {
      password: 'elidz123',
      companyName: 'East London Industrial Development Zone (ELIDZ)',
      industry: 'Industrial Development',
      focusAreas: ['Manufacturing', 'Automotive', 'Agriculture'],
      contactEmail: 'funding@elidz.co.za'
    },
    'automotive_admin': {
      password: 'auto123',
      companyName: 'Automotive Industry Development Centre (AIDC)',
      industry: 'Automotive Development',
      focusAreas: ['Automotive', 'Manufacturing'],
      contactEmail: 'funding@aidc.co.za'
    },
    'tech_admin': {
      password: 'tech123',
      companyName: 'Technology Innovation Agency (TIA)',
      industry: 'Technology Development',
      focusAreas: ['ICT and Electronics', 'Renewable Energy'],
      contactEmail: 'funding@tia.org.za'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Check registered admins first
      const adminCredentials = JSON.parse(localStorage.getItem('adminCredentials') || '{}');
      
      if (adminCredentials[credentials.username] && 
          adminCredentials[credentials.username].password === credentials.password) {
        const adminData = {
          user_id: credentials.username,
          username: credentials.username,
          role: 'admin',
          fullName: adminCredentials[credentials.username].fullName,
          email: adminCredentials[credentials.username].email,
          token: 'admin_token_' + Date.now()
        };
        onAdminLogin(adminData);
      } else {
        // Fallback to predefined funding companies
        const company = fundingCompanies[credentials.username];
        if (company && company.password === credentials.password) {
          const adminData = {
            user_id: credentials.username,
            username: credentials.username,
            role: 'admin',
            companyName: company.companyName,
            industry: company.industry,
            focusAreas: company.focusAreas,
            contactEmail: company.contactEmail,
            token: 'admin_token_' + Date.now()
          };
          onAdminLogin(adminData);
        } else {
          setError('Invalid admin credentials');
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{background: 'linear-gradient(135deg, #fef7f0 0%, #f0f4f8 100%)'}}>
      <div className="max-w-md w-full">
        {/* Modern Header */}
        <div className="text-center mb-8">
          <Logo className="h-16 mx-auto mb-6" />
          <h1 className="heading-1" style={{color: '#1e3a5f'}}>Admin Portal</h1>
          <p className="text-lg" style={{color: '#64748b'}}>Funding Management System</p>
        </div>

        {/* Modern Login Card */}
        <div className="modern-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)'}}>
              <SecurityIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="heading-2" style={{color: '#1e3a5f'}}>Administrator Login</h2>
            <p className="text-lg" style={{color: '#64748b'}}>Access your funding management dashboard</p>
          </div>
        
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-5 h-5 text-red-500 mr-2">⚠</div>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="modern-input pl-10"
                    placeholder="Enter admin username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SecurityIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="modern-input pl-10"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Access Admin Dashboard'
              )}
            </button>
          
          </form>
          
          {/* Demo Credentials */}
          <div className="mt-8 space-y-4">
            <div className="p-4 rounded-xl border" style={{background: 'rgba(65, 128, 190, 0.1)', borderColor: '#4180be'}}>
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 mr-2" style={{color: '#4180be'}}>ℹ</div>
                <p className="text-sm font-semibold" style={{color: '#2d4a6b'}}>Demo Admin Accounts</p>
              </div>
              <div className="text-xs space-y-2" style={{color: '#334155'}}>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-medium">ELIDZ Admin:</p>
                    <code className="px-2 py-1 rounded text-xs block" style={{background: 'rgba(65, 128, 190, 0.2)'}}>elidz_admin</code>
                    <code className="px-2 py-1 rounded text-xs block mt-1" style={{background: 'rgba(65, 128, 190, 0.2)'}}>elidz123</code>
                  </div>
                  <div>
                    <p className="font-medium">Tech Admin:</p>
                    <code className="px-2 py-1 rounded text-xs block" style={{background: 'rgba(65, 128, 190, 0.2)'}}>tech_admin</code>
                    <code className="px-2 py-1 rounded text-xs block mt-1" style={{background: 'rgba(65, 128, 190, 0.2)'}}>tech123</code>
                  </div>
                </div>
                <p className="font-medium text-center pt-2 border-t" style={{color: '#e67e22', borderColor: 'rgba(65, 128, 190, 0.3)'}}>ELIDZ Hackathon Partners</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <Link 
                to="/admin/register" 
                className="font-medium hover:underline transition-colors"
                style={{color: '#e67e22'}}
                onMouseEnter={(e) => e.target.style.color = '#d35400'}
                onMouseLeave={(e) => e.target.style.color = '#e67e22'}
              >
                Register as Admin
              </Link>
              <Link 
                to="/" 
                className="hover:underline transition-colors"
                style={{color: '#64748b'}}
                onMouseEnter={(e) => e.target.style.color = '#475569'}
                onMouseLeave={(e) => e.target.style.color = '#64748b'}
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;