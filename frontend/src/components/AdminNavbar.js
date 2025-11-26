import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { ChartIcon, DocumentIcon, TargetIcon, UserIcon, SettingsIcon } from './Icons';

const AdminNavbar = ({ admin, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: ChartIcon },
    { path: '/admin/create-opportunity', label: 'Create', icon: TargetIcon },
    { path: '/admin/manage-opportunities', label: 'Manage', icon: SettingsIcon },
    { path: '/admin/review-applications', label: 'Review', icon: DocumentIcon },
    { path: '/admin/reports', label: 'Reports', icon: UserIcon }
  ];

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-6">
            <Link to="/admin/dashboard" className="flex items-center group">
              <Logo className="h-12" />
              <div className="ml-3 hidden sm:block">
                <span className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                  Admin Portal
                </span>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Funding Management</div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path) 
                        ? 'bg-orange-100 text-orange-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* User Info and Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <div className="w-6 h-6 relative">
                  <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </button>
            </div>
            
            {/* User Profile */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {admin?.companyName || 'Admin User'}
                </div>
                <div className="text-xs text-gray-500">
                  {admin?.industry || 'System Administrator'}
                </div>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {(admin?.companyName || admin?.username || 'A').charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Logout
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <div className="w-6 h-6">
                <div className={`w-full h-0.5 bg-current transition-all ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : 'mb-1'
                }`}></div>
                <div className={`w-full h-0.5 bg-current transition-all ${
                  isMenuOpen ? 'opacity-0' : 'mb-1'
                }`}></div>
                <div className={`w-full h-0.5 bg-current transition-all ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></div>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.path) 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;