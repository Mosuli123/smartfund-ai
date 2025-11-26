import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <Logo className="h-16" />
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 ${isActive('/') ? 'bg-gray-100' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/profile" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 ${isActive('/profile') ? 'bg-gray-100' : ''}`}
              >
                Profile
              </Link>
              <Link 
                to="/funding-opportunities" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 ${isActive('/funding-opportunities') ? 'bg-gray-100' : ''}`}
              >
                Funding Opportunities
              </Link>
              <Link 
                to="/applications" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 ${isActive('/applications') ? 'bg-gray-100' : ''}`}
              >
                Applications
              </Link>
              <Link 
                to="/documents" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 ${isActive('/documents') ? 'bg-gray-100' : ''}`}
              >
                Documents
              </Link>
              <Link 
                to="/notifications" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 ${isActive('/notifications') ? 'bg-gray-100' : ''}`}
              >
                Notifications
              </Link>
              <Link 
                to="/user-engagement" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 ${isActive('/user-engagement') ? 'bg-gray-100' : ''}`}
              >
                Engagement
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {user?.username || user?.user || 'User'}</span>
            <button
              onClick={() => {
                onLogout();
                navigate('/');
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
            <Link 
              to="/support"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;