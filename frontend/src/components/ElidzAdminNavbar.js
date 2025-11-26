import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import ModernIcons from './ModernIcons';

const ElidzAdminNavbar = ({ admin, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b" style={{borderColor: '#e2e8f0'}}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/elidz-admin/dashboard" className="flex items-center">
              <Logo className="h-12" />
              <div className="ml-3">
                <div className="font-bold text-sm" style={{color: '#1e3a5f'}}>ELIDZ SYSTEM</div>
                <div className="text-xs" style={{color: '#64748b'}}>Administrator Portal</div>
              </div>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/elidz-admin/dashboard" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/elidz-admin/dashboard') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ModernIcons.Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/elidz-admin/user-management" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/elidz-admin/user-management') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ModernIcons.Users className="w-4 h-4" />
                <span>Users</span>
              </Link>
              <Link 
                to="/elidz-admin/approve-users" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/elidz-admin/approve-users') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ModernIcons.CheckCircle className="w-4 h-4" />
                <span>Approvals</span>
              </Link>
              <Link 
                to="/elidz-admin/funding-admins" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/elidz-admin/funding-admins') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ModernIcons.Briefcase className="w-4 h-4" />
                <span>Admins</span>
              </Link>
              <Link 
                to="/elidz-admin/reports" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/elidz-admin/reports') 
                    ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ModernIcons.FileText className="w-4 h-4" />
                <span>Reports</span>
              </Link>
              <Link 
                to="/elidz-admin/analytics" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/elidz-admin/analytics') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ModernIcons.Chart className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg" style={{backgroundColor: '#f0f4f8'}}>
              <ModernIcons.Shield className="w-4 h-4" color="#1e3a5f" />
              <span className="text-sm font-medium" style={{color: '#1e3a5f'}}>
                {admin?.fullName || 'ELIDZ Admin'}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
              style={{backgroundColor: '#dc2626'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              <ModernIcons.LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ElidzAdminNavbar;