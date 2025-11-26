import React, { useState, useEffect } from 'react';

const AdminReports = ({ admin }) => {
  const [reportData, setReportData] = useState({
    users: [],
    applications: [],
    opportunities: [],
    matches: []
  });
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    generateReportData();
  }, [dateRange]);

  const generateReportData = () => {
    // Generate mock report data
    const users = Array.from({ length: 45 }, (_, i) => ({
      id: i + 1,
      username: `user${i + 1}`,
      registrationDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      location: ['Eastern Cape', 'Gauteng', 'Western Cape', 'KwaZulu-Natal'][Math.floor(Math.random() * 4)],
      industry: ['Manufacturing', 'Automotive', 'Agriculture', 'ICT and Electronics', 'Renewable Energy'][Math.floor(Math.random() * 5)],
      profileComplete: Math.random() > 0.3,
      applicationsSubmitted: Math.floor(Math.random() * 5)
    }));

    const applications = Array.from({ length: 78 }, (_, i) => ({
      id: i + 1,
      userId: Math.floor(Math.random() * 45) + 1,
      opportunityId: Math.floor(Math.random() * 6) + 1,
      status: ['Submitted', 'Under Review', 'Approved', 'Rejected'][Math.floor(Math.random() * 4)],
      submissionDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      amount: Math.floor(Math.random() * 1000000) + 50000
    }));

    const opportunities = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Opportunity ${i + 1}`,
      type: ['Grant', 'Loan', 'Equity', 'Subsidy'][Math.floor(Math.random() * 4)],
      applications: Math.floor(Math.random() * 20) + 5,
      successRate: Math.floor(Math.random() * 40) + 20
    }));

    const matches = Array.from({ length: 156 }, (_, i) => ({
      id: i + 1,
      userId: Math.floor(Math.random() * 45) + 1,
      opportunityId: Math.floor(Math.random() * 12) + 1,
      matchScore: Math.floor(Math.random() * 40) + 60,
      applied: Math.random() > 0.6
    }));

    setReportData({ users, applications, opportunities, matches });
  };

  const getOverviewStats = () => {
    const { users, applications, opportunities, matches } = reportData;
    const activeUsers = users.filter(u => new Date(u.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
    const approvedApps = applications.filter(a => a.status === 'Approved').length;
    const totalMatches = matches.length;
    const conversionRate = totalMatches > 0 ? Math.round((applications.length / totalMatches) * 100) : 0;

    return {
      totalUsers: users.length,
      activeUsers,
      totalApplications: applications.length,
      approvedApplications: approvedApps,
      totalMatches,
      conversionRate
    };
  };

  const getLocationStats = () => {
    const locationCounts = reportData.users.reduce((acc, user) => {
      acc[user.location] = (acc[user.location] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(locationCounts).map(([location, count]) => ({ location, count }));
  };

  const getIndustryStats = () => {
    const industryCounts = reportData.users.reduce((acc, user) => {
      acc[user.industry] = (acc[user.industry] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(industryCounts).map(([industry, count]) => ({ industry, count }));
  };

  const exportReport = () => {
    const stats = getOverviewStats();
    const reportContent = `
SmartFund AI - Administrative Report
Generated: ${new Date().toLocaleString()}
Period: Last ${dateRange} days

OVERVIEW STATISTICS:
- Total Registered Users: ${stats.totalUsers}
- Active Users (7 days): ${stats.activeUsers}
- Total Applications: ${stats.totalApplications}
- Approved Applications: ${stats.approvedApplications}
- Total Matches Generated: ${stats.totalMatches}
- Match-to-Application Conversion: ${stats.conversionRate}%

LOCATION BREAKDOWN:
${getLocationStats().map(item => `- ${item.location}: ${item.count} users`).join('\n')}

INDUSTRY BREAKDOWN:
${getIndustryStats().map(item => `- ${item.industry}: ${item.count} users`).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartfund-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const stats = getOverviewStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Administrative Reports</h1>
          <div className="flex space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button
              onClick={exportReport}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Export Report
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'users', label: 'Users' },
            { key: 'applications', label: 'Applications' },
            { key: 'opportunities', label: 'Opportunities' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedReport(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedReport === tab.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {selectedReport === 'overview' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
              <p className="text-sm text-gray-600">{stats.activeUsers} active in last 7 days</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Applications</h3>
              <p className="text-3xl font-bold text-green-600">{stats.totalApplications}</p>
              <p className="text-sm text-gray-600">{stats.approvedApplications} approved</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Match Success</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.conversionRate}%</p>
              <p className="text-sm text-gray-600">{stats.totalMatches} total matches</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by Location</h3>
              <div className="space-y-3">
                {getLocationStats().map(item => (
                  <div key={item.location} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.location}</span>
                    <span className="font-semibold text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by Industry</h3>
              <div className="space-y-3">
                {getIndustryStats().map(item => (
                  <div key={item.industry} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.industry}</span>
                    <span className="font-semibold text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'users' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">User Demographics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applications</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.users.slice(0, 20).map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.applicationsSubmitted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminReports;