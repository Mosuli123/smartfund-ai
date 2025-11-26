import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { EmailService } from '../services/emailService';

const CompleteRegistration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      validateToken(token);
    } else {
      setError('No approval token provided');
      setLoading(false);
    }
  }, [searchParams]);

  const validateToken = (token) => {
    const validation = EmailService.validateApprovalToken(token);
    
    if (validation.valid) {
      setTokenValid(true);
      setTokenData(validation.data);
      setFormData(prev => ({
        ...prev,
        username: validation.data.email.split('@')[0] // Suggest username from email
      }));
    } else {
      setError(validation.error);
    }
    
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const token = searchParams.get('token');
      
      // Create user account
      const userData = {
        username: formData.username,
        email: tokenData.email,
        companyData: tokenData.companyData,
        registrationDate: new Date().toISOString(),
        status: 'Active',
        approvalToken: token
      };

      // Store user data
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      users.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      // Mark token as used
      EmailService.markTokenAsUsed(token);

      // Store login credentials for demo
      const credentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
      credentials[formData.username] = {
        password: formData.password, // In real app, this would be hashed
        email: tokenData.email,
        companyData: tokenData.companyData
      };
      localStorage.setItem('userCredentials', JSON.stringify(credentials));

      setRegistrationComplete(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      setError('An error occurred during registration completion');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="loading-spinner mb-4"></div>
          <p>Validating approval token...</p>
        </div>
      </div>
    );
  }

  if (error && !tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-900 mb-2">Invalid Token</h1>
          </div>
          
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-600 text-sm">
              The approval token is invalid, expired, or has already been used.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start New Registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-green-900 mb-4">Registration Complete!</h1>
          
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Your account has been successfully created. You can now access SmartFund AI.
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Redirecting to login page in 3 seconds...
          </p>
          
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Registration</h1>
          <p className="text-gray-600">Create your SmartFund AI account</p>
        </div>

        {tokenData && (
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-green-900 mb-2">✅ Approved Company:</h3>
            <p className="text-green-800 text-sm">
              <strong>{tokenData.companyData.companyName}</strong><br/>
              CIPC: {tokenData.companyData.registrationNumber}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleCompleteRegistration} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength="8"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 8 characters
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By completing registration, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegistration;