import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChartIcon, DocumentIcon, TargetIcon, UserIcon } from '../components/Icons';
import AIFundingInsights from '../components/AIFundingInsights';

const AdminDashboard = ({ admin }) => {
  const [stats, setStats] = useState({
    totalOpportunities: 0,
    activeOpportunities: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalFunding: 0,
    approvedApplications: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const opportunities = JSON.parse(localStorage.getItem('customOpportunities') || '[]');
    const applications = JSON.parse(localStorage.getItem('submittedApplications') || '[]');
    
    // Calculate total funding amount
    const totalFunding = opportunities.reduce((sum, op) => sum + (op.maxAmount || 0), 0) + 6850000; // Include default opportunities
    
    setStats({
      totalOpportunities: opportunities.length + 6,
      activeOpportunities: opportunities.filter(op => op.status === 'Active').length + 6,
      totalApplications: applications.length + 23, // Add some demo data
      pendingApplications: applications.filter(app => app.status === 'Pending').length + 8,
      totalFunding: totalFunding,
      approvedApplications: applications.filter(app => app.status === 'Approved').length + 15
    });

    // Generate recent activity
    setRecentActivity([
      { type: 'application', title: 'New application received', company: 'Tech Innovations Ltd', time: '2 hours ago', status: 'new' },
      { type: 'approval', title: 'Application approved', company: 'Green Energy Solutions', time: '1 day ago', status: 'approved' },
      { type: 'opportunity', title: 'New opportunity created', company: 'Youth Development Fund', time: '2 days ago', status: 'created' },
      { type: 'review', title: 'Application under review', company: 'Smart Manufacturing Co', time: '3 days ago', status: 'review' },
      { type: 'rejection', title: 'Application declined', company: 'Basic Services Ltd', time: '4 days ago', status: 'declined' }
    ]);
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="text-white font-medium">Welcome, {admin?.username || 'Admin'}</span>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-white text-lg">{admin?.companyName || 'SmartFund AI Admin'}</h3>
                <p className="text-orange-100 text-sm">Role: Funding Administrator</p>
              </div>
              <div>
                <p className="text-orange-100 text-sm">Industry: {admin?.industry || 'Financial Services'}</p>
                <p className="text-orange-100 text-sm">Focus: {admin?.focusAreas?.join(', ') || 'SMME Development'}</p>
              </div>
              <div>
                <p className="text-orange-100 text-sm">Contact: {admin?.contactEmail || 'admin@smartfundai.co.za'}</p>
                <p className="text-orange-100 text-sm">Last Login: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Opportunities</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalOpportunities}</p>
                <p className="text-sm text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TargetIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Applications</h3>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.totalApplications}</p>
                <p className="text-sm text-green-600 mt-1">+8% from last month</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <DocumentIcon className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pending Review</h3>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingApplications}</p>
                <p className="text-sm text-yellow-600 mt-1">Requires attention</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <UserIcon className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Funding</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">R{(stats.totalFunding / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-green-600 mt-1">Available funding</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ChartIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Funding Intelligence */}
        <div className="mb-8">
          <AIFundingInsights />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/admin/create-opportunity"
                  className="group p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center">
                    <TargetIcon className="w-8 h-8 mr-3" />
                    <div>
                      <h3 className="font-semibold">Create Opportunity</h3>
                      <p className="text-sm opacity-90">Add new funding opportunity</p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/admin/manage-opportunities"
                  className="group p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center">
                    <ChartIcon className="w-8 h-8 mr-3" />
                    <div>
                      <h3 className="font-semibold">Manage Opportunities</h3>
                      <p className="text-sm opacity-90">Edit existing opportunities</p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/admin/review-applications"
                  className="group p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center">
                    <DocumentIcon className="w-8 h-8 mr-3" />
                    <div>
                      <h3 className="font-semibold">Review Applications</h3>
                      <p className="text-sm opacity-90">{stats.pendingApplications} pending review</p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/admin/reports"
                  className="group p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center">
                    <UserIcon className="w-8 h-8 mr-3" />
                    <div>
                      <h3 className="font-semibold">Generate Reports</h3>
                      <p className="text-sm opacity-90">Analytics and insights</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-3 h-3 rounded-full mt-2 mr-3 ${
                      activity.status === 'new' ? 'bg-blue-500' :
                      activity.status === 'approved' ? 'bg-green-500' :
                      activity.status === 'created' ? 'bg-orange-500' :
                      activity.status === 'review' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.company}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link 
                  to="/admin/reports" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all activity →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;