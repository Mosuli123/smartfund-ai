import React, { useState, useEffect } from 'react';

const SecuritySettings = () => {
  const [securityData, setSecurityData] = useState({
    activeUsers: 127,
    failedLogins: 23,
    blockedIPs: 5,
    securityAlerts: 8,
    lastSecurityScan: '2024-01-20 14:30:00'
  });

  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, timestamp: '2024-01-20 15:45:23', type: 'Failed Login', user: 'unknown_user', ip: '192.168.1.100', severity: 'Medium' },
    { id: 2, timestamp: '2024-01-20 15:30:12', type: 'Suspicious Activity', user: 'test_user', ip: '10.0.0.45', severity: 'High' },
    { id: 3, timestamp: '2024-01-20 14:15:08', type: 'Password Change', user: 'admin_user', ip: '192.168.1.50', severity: 'Low' },
    { id: 4, timestamp: '2024-01-20 13:22:45', type: 'Multiple Login Attempts', user: 'demo_user', ip: '172.16.0.10', severity: 'High' },
    { id: 5, timestamp: '2024-01-20 12:10:33', type: 'Account Locked', user: 'test_smme', ip: '192.168.1.75', severity: 'Medium' }
  ]);

  const [blockedIPs, setBlockedIPs] = useState([
    { ip: '192.168.1.100', reason: 'Multiple failed login attempts', blockedAt: '2024-01-20 15:45:00', attempts: 15 },
    { ip: '10.0.0.45', reason: 'Suspicious activity detected', blockedAt: '2024-01-20 15:30:00', attempts: 8 },
    { ip: '172.16.0.10', reason: 'Brute force attack', blockedAt: '2024-01-20 13:22:00', attempts: 25 },
    { ip: '203.0.113.5', reason: 'Malicious requests', blockedAt: '2024-01-20 11:15:00', attempts: 12 },
    { ip: '198.51.100.8', reason: 'Automated bot activity', blockedAt: '2024-01-20 09:30:00', attempts: 30 }
  ]);

  const [newIPBlock, setNewIPBlock] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleBlockIP = () => {
    if (!newIPBlock.trim()) return;
    
    const newBlock = {
      ip: newIPBlock,
      reason: 'Manually blocked by admin',
      blockedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      attempts: 0
    };
    
    setBlockedIPs([newBlock, ...blockedIPs]);
    setNewIPBlock('');
    setMessage('IP address blocked successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleUnblockIP = (ipToUnblock) => {
    setBlockedIPs(blockedIPs.filter(item => item.ip !== ipToUnblock));
    setMessage('IP address unblocked successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const runSecurityScan = () => {
    setLoading(true);
    setTimeout(() => {
      setSecurityData(prev => ({
        ...prev,
        lastSecurityScan: new Date().toISOString().replace('T', ' ').substring(0, 19),
        securityAlerts: Math.floor(Math.random() * 15) + 1
      }));
      setLoading(false);
      setMessage('Security scan completed successfully');
      setTimeout(() => setMessage(''), 3000);
    }, 3000);
  };

  const clearSecurityLogs = () => {
    if (window.confirm('Are you sure you want to clear all security logs?')) {
      setSecurityLogs([]);
      setMessage('Security logs cleared');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">🔒 Security Settings</h1>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-white">Monitor system security, manage blocked IPs, and review security logs</p>
          </div>
        </div>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {/* Security Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl text-green-600 mr-4">👥</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
                <p className="text-2xl font-bold text-green-600">{securityData.activeUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl text-red-600 mr-4">⚠️</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Failed Logins</h3>
                <p className="text-2xl font-bold text-red-600">{securityData.failedLogins}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl text-orange-600 mr-4">🚫</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Blocked IPs</h3>
                <p className="text-2xl font-bold text-orange-600">{securityData.blockedIPs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl text-purple-600 mr-4">🛡️</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
                <p className="text-2xl font-bold text-purple-600">{securityData.securityAlerts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Security Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={runSecurityScan}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Scanning...' : '🔍 Run Security Scan'}
            </button>
            <button
              onClick={clearSecurityLogs}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑️ Clear Security Logs
            </button>
            <div className="text-sm text-gray-600 flex items-center">
              Last scan: {securityData.lastSecurityScan}
            </div>
          </div>
        </div>

        {/* IP Management */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">IP Address Management</h2>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter IP address to block"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newIPBlock}
              onChange={(e) => setNewIPBlock(e.target.value)}
            />
            <button
              onClick={handleBlockIP}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Block IP
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blocked At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attempts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blockedIPs.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.blockedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.attempts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleUnblockIP(item.ip)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Logs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Security Events</h2>
          <div className="space-y-4">
            {securityLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                    <span className="font-medium text-gray-900">{log.type}</span>
                    <span className="text-sm text-gray-500">User: {log.user}</span>
                    <span className="text-sm text-gray-500">IP: {log.ip}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;