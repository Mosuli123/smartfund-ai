import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ElidzHeader from '../components/ElidzHeader';
import ElidzFooter from '../components/ElidzFooter';
import Logo from '../components/Logo';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizationCode: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.organizationCode !== 'ELIDZ2024') {
      setError('Invalid organization code. Contact ELIDZ administration.');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const adminData = {
        username: formData.username,
        email: formData.email,
        fullName: formData.fullName,
        role: 'admin',
        organizationCode: formData.organizationCode,
        registrationDate: new Date().toISOString(),
        status: 'Active'
      };

      const admins = JSON.parse(localStorage.getItem('registeredAdmins') || '[]');
      admins.push(adminData);
      localStorage.setItem('registeredAdmins', JSON.stringify(admins));

      const adminCredentials = JSON.parse(localStorage.getItem('adminCredentials') || '{}');
      adminCredentials[formData.username] = {
        password: formData.password,
        role: 'admin',
        email: formData.email,
        fullName: formData.fullName
      };
      localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));

      setSuccess('Admin account created successfully! You can now login.');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ElidzHeader />
      <div className="flex items-center justify-center bg-gradient-to-br from-orange-200 to-blue-200 min-h-screen">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
          <div>
            <div className="flex justify-center mb-6">
              <Logo className="h-12" />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Admin Registration
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Register as a funding administrator
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization Code *
                </label>
                <input
                  type="text"
                  name="organizationCode"
                  required
                  placeholder="Contact ELIDZ for code"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.organizationCode}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register as Admin'}
            </button>
            
            <div className="text-center space-y-3">
              <div>
                <p className="text-sm text-gray-600">Already have an admin account?</p>
                <Link 
                  to="/admin/login" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login here
                </Link>
              </div>
              <div className="border-t pt-3">
                <Link 
                  to="/" 
                  className="text-orange-600 hover:text-orange-800 text-sm"
                >
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

export default AdminRegister;