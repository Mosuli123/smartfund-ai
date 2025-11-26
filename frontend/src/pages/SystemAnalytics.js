import React, { useState, useEffect } from 'react';
import { AdminIcons } from '../components/AdminIcons';

const SystemAnalytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [timeRange, setTimeRange] = useState('30days');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = () => {
    const mockAnalytics = {
      userGrowth: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [45, 67, 89, 123, 156, 189]
      },
      applicationTrends: {
        submitted: 456,
        approved: 234,
        rejected: 89,
        pending: 133,
        trends: [
          { month: 'Jan', submitted: 45, approved: 23, rejected: 8 },
          { month: 'Feb', submitted: 67, approved: 34, rejected: 12 },
          { month: 'Mar', submitted: 89, approved: 45, rejected: 15 },
          { month: 'Apr', submitted: 123, approved: 67, rejected: 23 },
          { month: 'May', submitted: 156, approved: 89, rejected: 34 },
          { month: 'Jun', submitted: 189, approved: 123, rejected: 45 }
        ]
      },
      industryPerformance: [
        { industry: 'Manufacturing', users: 45, applications: 123, success: 78, funding: 12500000 },
        { industry: 'Automotive', users: 32, applications: 89, success: 82, funding: 8900000 },
        { industry: 'Agriculture', users: 28, applications: 67, success: 65, funding: 6700000 },
        { industry: 'ICT & Electronics', users: 23, applications: 45, success: 73, funding: 4500000 },
        { industry: 'Renewable Energy', users: 18, applications: 34, success: 85, funding: 3400000 }
      ],
      systemHealth: {
        uptime: 99.8,
        responseTime: 245,
        errorRate: 0.2,
        activeUsers: 127,
        peakUsers: 234,
        dataStorage: 78.5
      },
      regionalDistribution: [
        { region: 'Eastern Cape', municipality: 'Buffalo City (East London)', users: 156, percentage: 52.3 },
        { region: 'Eastern Cape', municipality: 'Nelson Mandela Bay (Port Elizabeth)', users: 78, percentage: 26.2 },
        { region: 'Eastern Cape', municipality: 'OR Tambo District', users: 34, percentage: 11.4 },
        { region: 'Eastern Cape', municipality: 'Chris Hani District', users: 18, percentage: 6.0 },
        { region: 'Eastern Cape', municipality: 'Amathole District', users: 12, percentage: 4.1 }
      ]
    };
    setAnalytics(mockAnalytics);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <AdminIcons.Analytics className="w-8 h-8" />
            System Analytics
          </h1>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex justify-between items-center">
            <p className="text-white">Comprehensive system performance and usage analytics</p>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>

        {/* System Health Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AdminIcons.Shield className="w-5 h-5 text-green-600" />
              System Health
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="font-medium text-green-600">{analytics.systemHealth?.uptime}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="font-medium text-blue-600">{analytics.systemHealth?.responseTime}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className="font-medium text-orange-600">{analytics.systemHealth?.errorRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Storage Used</span>
                <span className="font-medium text-purple-600">{analytics.systemHealth?.dataStorage}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AdminIcons.Users className="w-5 h-5 text-blue-600" />
              User Activity
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="font-medium text-green-600">{analytics.systemHealth?.activeUsers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Peak Users</span>
                <span className="font-medium text-blue-600">{analytics.systemHealth?.peakUsers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Registered</span>
                <span className="font-medium text-purple-600">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Growth Rate</span>
                <span className="font-medium text-green-600">+23.4%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AdminIcons.DocumentText className="w-5 h-5 text-purple-600" />
              Application Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Submitted</span>
                <span className="font-medium text-blue-600">{analytics.applicationTrends?.submitted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Approved</span>
                <span className="font-medium text-green-600">{analytics.applicationTrends?.approved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-medium text-yellow-600">{analytics.applicationTrends?.pending}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="font-medium text-green-600">72.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Performance */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">🏭 Industry Performance Analysis</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">Industry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">Applications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">Success Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">Total Funding</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics.industryPerformance?.map((industry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {industry.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {industry.users}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {industry.applications}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        industry.success >= 80 ? 'bg-green-100 text-green-800' :
                        industry.success >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {industry.success}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      R{(industry.funding / 1000000).toFixed(1)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">🏙️ Regional Distribution</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Users by Eastern Cape Municipality</h4>
              <div className="space-y-3">
                {analytics.regionalDistribution?.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{location.region}</div>
                      <div className="text-xs text-gray-500">{location.municipality}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${location.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12">{location.users}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Application Trends</h4>
              <div className="space-y-2">
                {analytics.applicationTrends?.trends?.slice(-3).map((trend, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-900">{trend.month}</span>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {trend.submitted} submitted, {trend.approved} approved
                      </div>
                      <div className="text-xs text-green-600">
                        {Math.round((trend.approved / trend.submitted) * 100)}% success rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;