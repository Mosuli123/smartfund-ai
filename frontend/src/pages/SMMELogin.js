import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockLogin } from '../data/mockData';
import ElidzHeader from '../components/ElidzHeader';
import ElidzFooter from '../components/ElidzFooter';
import Logo from '../components/Logo';

const SMMELogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const userCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
      
      if (userCredentials[credentials.username] && 
          userCredentials[credentials.username].password === credentials.password &&
          userCredentials[credentials.username].role === 'smme') {
        const userData = {
          user_id: credentials.username,
          username: credentials.username,
          role: 'smme',
          companyData: userCredentials[credentials.username].cipcData,
          token: 'smme_token_' + Date.now()
        };
        onLogin(userData);
      } else {
        const result = mockLogin(credentials.username, credentials.password);
        if (result.success) {
          const userData = { ...result.data, role: 'smme' };
          onLogin(userData);
        } else {
          setError('Invalid credentials or business not verified. Complete CIPC verification first.');
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #fef7f0 0%, #f0f4f8 100%)'}}>
      {/* Modern Header */}
      <header className="modern-nav">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo className="h-16" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold" style={{color: '#1e3a5f'}}>SmartFund AI</h1>
                <p className="text-xs" style={{color: '#64748b'}}>SMME Login</p>
              </div>
            </div>
            <Link to="/" className="font-medium transition-colors" style={{color: '#e67e22'}} onMouseEnter={(e) => e.target.style.color = '#d35400'} onMouseLeave={(e) => e.target.style.color = '#e67e22'}>
              Back to Home
            </Link>
          </div>
        </div>
      </header>
      
      <div className="flex items-center justify-center py-12 min-h-screen">
        <div className="max-w-md w-full mx-4">
          <div className="modern-card p-8">
            <div className="text-center mb-8">
              <h2 className="heading-2" style={{color: '#1e3a5f'}}>
                SMME Login
              </h2>
              <p className="text-lg" style={{color: '#64748b'}}>
                Access your verified business account
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
                  Username
                </label>
                <input
                  type="text"
                  required
                  className="modern-input"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#334155'}}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="modern-input"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>
            
            <div className="text-center space-y-4 mt-6">
              <div className="p-4 rounded-xl border-l-4" style={{background: 'rgba(231, 126, 34, 0.1)', borderColor: '#e67e22'}}>
                <p className="text-sm font-medium" style={{color: '#b8470f'}}>
                  CIPC verification required for access
                </p>
              </div>
              <div>
                <p className="text-sm mb-2" style={{color: '#64748b'}}>Business not verified yet?</p>
                <Link 
                  to="/smme/register" 
                  className="font-medium transition-colors"
                  style={{color: '#e67e22'}}
                  onMouseEnter={(e) => e.target.style.color = '#d35400'}
                  onMouseLeave={(e) => e.target.style.color = '#e67e22'}
                >
                  Complete CIPC Verification
                </Link>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMMELogin;