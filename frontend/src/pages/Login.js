import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockLogin } from '../data/mockData';
import ElidzHeader from '../components/ElidzHeader';
import ElidzFooter from '../components/ElidzFooter';
import Logo from '../components/Logo';
import { ElidzButton, ElidzInput, ElidzAlert, ElidzCard, ElidzCardBody, ElidzLoading } from '../components/ElidzUI';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: 'demo',
    password: 'password123'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      // Check registered users first
      const userCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
      
      if (userCredentials[credentials.username] && 
          userCredentials[credentials.username].password === credentials.password) {
        const userData = {
          user_id: credentials.username,
          username: credentials.username,
          email: userCredentials[credentials.username].email,
          companyData: userCredentials[credentials.username].companyData,
          token: 'token_' + Date.now()
        };
        onLogin(userData);
      } else {
        // Fallback to demo login
        const result = mockLogin(credentials.username, credentials.password);
        if (result.success) {
          onLogin(result.data);
        } else {
          setError('Invalid credentials. Register first or use demo/password123');
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-elidz-gray-50 font-elidz">
      <ElidzHeader />
      <div className="flex items-center justify-center elidz-gradient-hero min-h-screen py-12">
        <ElidzCard className="max-w-md w-full mx-4 elidz-animate-scale-in">
          <ElidzCardBody className="space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Logo className="h-16" showText={false} />
              </div>
              <h1 className="text-4xl font-bold text-elidz-primary mb-2">
                SmartFund AI
              </h1>
              <p className="text-elidz-gray-600 text-lg">
                Find funding opportunities for your SMME
              </p>
            </div>
        
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <ElidzAlert variant="error">
                  {error}
                </ElidzAlert>
              )}
              
              <div className="space-y-4">
                <ElidzInput
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  required
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                />
                
                <ElidzInput
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  required
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>

              <ElidzButton
                type="submit"
                variant="accent"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <ElidzLoading size="sm" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Sign In</span>
                  </>
                )}
              </ElidzButton>
          
              <div className="text-center text-sm text-elidz-gray-600 space-y-4">
                <div className="bg-elidz-accent-50 p-4 rounded-elidz-lg border border-elidz-accent-200">
                  <p className="font-semibold text-elidz-accent mb-2">Demo Credentials:</p>
                  <div className="space-y-1 font-elidz-mono text-elidz-primary">
                    <p>Username: <strong>demo</strong></p>
                    <p>Password: <strong>password123</strong></p>
                  </div>
                </div>
                
                <div className="border-t border-elidz-gray-200 pt-4 space-y-3">
                  <div>
                    <p className="text-elidz-gray-700">Don't have an account?</p>
                    <Link 
                      to="/register" 
                      className="text-elidz-accent hover:text-elidz-accent-dark font-semibold transition-colors duration-200 hover:underline"
                    >
                      Register your SMME →
                    </Link>
                  </div>
                  <div>
                    <p className="text-elidz-gray-700">Funding Administrator?</p>
                    <Link 
                      to="/admin/login" 
                      className="text-elidz-primary hover:text-elidz-primary-dark font-semibold transition-colors duration-200 hover:underline"
                    >
                      Admin Login →
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </ElidzCardBody>
        </ElidzCard>
      </div>
      <ElidzFooter />
    </div>
  );
};

export default Login;