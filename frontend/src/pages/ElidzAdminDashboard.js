import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { AdminIcons } from '../components/AdminIcons';
import AIInsightsPanel from '../components/AIInsightsPanel';
import { ModernIcons } from '../components/ModernIcons';

const ElidzAdminDashboard = ({ admin }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedSMMEs: 0,
    fundingAdmins: 0,
    totalApplications: 0,
    successfulApplications: 0,
    totalFunding: 0,
    systemUsage: 0,
    recentLogins: 0
  });

  const [demographics, setDemographics] = useState({
    byIndustry: {},
    byLocation: {},
    byFundingRange: {}
  });

  useEffect(() => {
    setIsLoaded(true);
    loadSystemStats();
    loadDemographics();
  }, []);

  const loadSystemStats = () => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const admins = JSON.parse(localStorage.getItem('registeredAdmins') || '[]');
    const applications = JSON.parse(localStorage.getItem('submittedApplications') || '[]');
    
    setStats({
      totalUsers: users.length + 1,
      verifiedSMMEs: users.filter(u => u.status === 'Active').length + 1,
      fundingAdmins: admins.length + 3,
      totalApplications: applications.length,
      successfulApplications: applications.filter(a => a.status === 'Approved').length,
      totalFunding: applications.reduce((sum, app) => sum + (app.amount || 0), 0),
      systemUsage: Math.floor(Math.random() * 1000) + 500,
      recentLogins: Math.floor(Math.random() * 50) + 20
    });
  };

  const loadDemographics = () => {
    const byIndustry = {
      'Manufacturing': 15,
      'Automotive': 8,
      'Agriculture': 12,
      'ICT and Electronics': 6,
      'Renewable Energy': 4
    };

    const byLocation = {
      'Buffalo City Municipality (East London)': 18,
      'Nelson Mandela Bay Municipality (Port Elizabeth)': 15,
      'King Sabata Dalindyebo Municipality (Mthatha)': 12,
      'Chris Hani District Municipality (Queenstown)': 8,
      'Makana Municipality (Grahamstown)': 6,
      'Amathole District Municipality': 4,
      'OR Tambo District Municipality': 3
    };

    const byFundingRange = {
      'R10K - R50K': 18,
      'R50K - R200K': 15,
      'R200K - R1M': 8,
      'R1M+': 4
    };

    setDemographics({ byIndustry, byLocation, byFundingRange });
  };

  const quickActions = [
    {
      title: 'User Management',
      icon: AdminIcons.Users,
      description: 'Manage all users and permissions',
      actions: [
        { label: 'Manage All Users', path: '/elidz-admin/user-management', color: 'from-blue-600 to-blue-700' },
        { label: 'Approve/Decline Access', path: '/elidz-admin/approve-users', color: 'from-orange-600 to-orange-700' },
        { label: 'Manage Funding Donors', path: '/elidz-admin/funding-admins', color: 'from-blue-500 to-orange-500' }
      ]
    },
    {
      title: 'Analytics & Reports',
      icon: AdminIcons.Analytics,
      description: 'System insights and reporting',
      actions: [
        { label: 'System Analytics', path: '/elidz-admin/analytics', color: 'from-orange-600 to-orange-700' },
        { label: 'Generate Reports', path: '/elidz-admin/reports', color: 'from-blue-600 to-blue-700' },
        { label: 'User Demographics', path: '/elidz-admin/demographics', color: 'from-orange-500 to-blue-500' }
      ]
    },
    {
      title: 'System Settings',
      icon: AdminIcons.Settings,
      description: 'Configuration and security',
      actions: [
        { label: 'System Configuration', path: '/elidz-admin/system-config', color: 'from-blue-600 to-orange-600' },
        { label: 'Security Settings', path: '/elidz-admin/security', color: 'from-orange-700 to-orange-800' },
        { label: 'Sustainability Model', path: '/elidz-admin/sustainability', color: 'from-blue-700 to-blue-800' }
      ]
    }
  ];

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #fef7f0 0%, #f0f4f8 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Modern Header */}
        <div className={`mb-12 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="heading-1 flex items-center gap-4 mb-6" style={{color: '#1e3a5f'}}>
            <AdminIcons.Shield className="w-12 h-12" style={{color: '#4180be'}} />
            ELIDZ System Administration
          </h1>
          <div className="modern-card p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #d9e6f2 0%, #fdeee0 100%)'}}>
                <AdminIcons.UserCheck className="w-8 h-8" style={{color: '#4180be'}} />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{color: '#1e3a5f'}}>{admin?.fullName || 'System Administrator'}</h3>
                <p style={{color: '#64748b'}}>Organization: {admin?.organization || 'ELIDZ Science & Technology Park'}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#10b981'}}></div>
                    <span className="font-medium" style={{color: '#10b981'}}>System Admin</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#4180be'}}></div>
                    <span className="font-medium" style={{color: '#4180be'}}>Full Access</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#e67e22'}}></div>
                    <span className="font-medium" style={{color: '#e67e22'}}>Security Clearance</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: AdminIcons.Users, color: '#4180be', bgColor: 'rgba(65, 128, 190, 0.1)' },
            { label: 'Verified SMMEs', value: stats.verifiedSMMEs, icon: AdminIcons.CheckCircle, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
            { label: 'Funding Admins', value: stats.fundingAdmins, icon: AdminIcons.UserCheck, color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)' },
            { label: 'Total Funding', value: `R${stats.totalFunding.toLocaleString()}`, icon: AdminIcons.CurrencyDollar, color: '#e67e22', bgColor: 'rgba(231, 126, 34, 0.1)' }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`modern-card p-6 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 group ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms`, background: stat.bgColor }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-1" style={{color: '#64748b'}}>{stat.label}</p>
                  <p className="text-3xl font-bold" style={{color: stat.color}}>{stat.value}</p>
                </div>
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8" style={{color: '#64748b'}} />
                </div>
              </div>
              <div className="mt-4 h-1 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{backgroundColor: stat.color}}></div>
            </div>
          ))}
        </div>

        {/* Modern Quick Actions */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {quickActions.map((section, sectionIndex) => (
            <div 
              key={sectionIndex}
              className={`modern-card p-8 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              onMouseEnter={() => setHoveredCard(sectionIndex)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${400 + sectionIndex * 200}ms` }}
            >
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transform transition-all duration-300 ${hoveredCard === sectionIndex ? 'scale-110 rotate-12' : ''}`} style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'}}>
                    <section.icon className="w-6 h-6" style={{color: '#64748b'}} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold transition-colors duration-300" style={{color: hoveredCard === sectionIndex ? '#4180be' : '#1e3a5f'}}>{section.title}</h2>
                    <p className="text-sm" style={{color: '#64748b'}}>{section.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {section.actions.map((action, actionIndex) => {
                  const getActionStyle = (actionIndex) => {
                    const styles = [
                      { background: 'linear-gradient(135deg, #4180be 0%, #2d4a6b 100%)' },
                      { background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)' },
                      { background: 'linear-gradient(135deg, #4180be 0%, #e67e22 100%)' }
                    ];
                    return styles[actionIndex % styles.length];
                  };
                  
                  return (
                    <Link
                      key={actionIndex}
                      to={action.path}
                      className="block w-full p-4 text-white rounded-xl hover:shadow-lg transform transition-all duration-200 hover:scale-105 text-center font-medium group/button"
                      style={getActionStyle(actionIndex)}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>{action.label}</span>
                        <svg className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* AI Intelligence Panel */}
        <div className="mb-12">
          <AIInsightsPanel />
        </div>

        {/* Modern Demographics Overview */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'By Industry', icon: AdminIcons.TrendingUp, data: demographics.byIndustry, color: '#4180be', bgColor: 'rgba(65, 128, 190, 0.1)' },
            { title: 'By Location', icon: AdminIcons.Globe, data: demographics.byLocation, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
            { title: 'By Funding Range', icon: AdminIcons.CurrencyDollar, data: demographics.byFundingRange, color: '#e67e22', bgColor: 'rgba(231, 126, 34, 0.1)' }
          ].map((demo, index) => (
            <div 
              key={index}
              className={`modern-card p-6 transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ animationDelay: `${1000 + index * 200}ms` }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: demo.bgColor}}>
                  <demo.icon className="w-5 h-5" style={{color: '#64748b'}} />
                </div>
                <h3 className="text-xl font-bold" style={{color: '#1e3a5f'}}>{demo.title}</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(demo.data).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 rounded-lg transition-colors duration-200 group hover:bg-opacity-50" style={{'&:hover': {backgroundColor: demo.bgColor}}}>
                    <span className="transition-colors duration-200" style={{color: '#64748b'}}>{key}</span>
                    <span className="font-bold text-lg" style={{color: demo.color}}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElidzAdminDashboard;