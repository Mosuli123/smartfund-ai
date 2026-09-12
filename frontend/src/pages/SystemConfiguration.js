import React, { useState, useEffect } from 'react';

const SystemConfiguration = () => {
  const [config, setConfig] = useState({
    systemSettings: {
      systemName: 'SmartFund AI',
      maintenanceMode: false,
      maxApplicationsPerUser: 5,
      applicationTimeout: 30,
      autoBackup: true,
      backupFrequency: 'daily'
    },
    emailSettings: {
      smtpServer: 'smtp.sita.co.za',
      smtpPort: 587,
      emailFrom: 'noreply@govfunding.gov.za',
      enableNotifications: true,
      notificationTypes: {
        applicationSubmitted: true,
        applicationApproved: true,
        applicationRejected: true,
        systemMaintenance: true
      }
    },
    securitySettings: {
      sessionTimeout: 60,
      maxLoginAttempts: 3,
      passwordMinLength: 8,
      requireSpecialChars: true,
      enableTwoFactor: false,
      ipWhitelist: ''
    },
    fundingSettings: {
      minFundingAmount: 10000,
      maxFundingAmount: 5000000,
      defaultMatchThreshold: 70,
      autoMatchEnabled: true,
      approvalWorkflow: 'manual',
      fundingCategories: ['Grant', 'Loan', 'Equity', 'Subsidy']
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('system');

  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = () => {
    const savedConfig = localStorage.getItem('systemConfiguration');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('systemConfiguration', JSON.stringify(config));
      setMessage('Configuration saved successfully!');
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      localStorage.removeItem('systemConfiguration');
      loadConfiguration();
      setMessage('Configuration reset to defaults');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const updateConfig = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedConfig = (section, subsection, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.systemSettings.systemName}
            onChange={(e) => updateConfig('systemSettings', 'systemName', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Applications Per User</label>
          <input
            type="number"
            min="1"
            max="20"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.systemSettings.maxApplicationsPerUser}
            onChange={(e) => updateConfig('systemSettings', 'maxApplicationsPerUser', parseInt(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Application Timeout (minutes)</label>
          <input
            type="number"
            min="5"
            max="120"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.systemSettings.applicationTimeout}
            onChange={(e) => updateConfig('systemSettings', 'applicationTimeout', parseInt(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.systemSettings.backupFrequency}
            onChange={(e) => updateConfig('systemSettings', 'backupFrequency', e.target.value)}
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="maintenanceMode"
            className="mr-2"
            checked={config.systemSettings.maintenanceMode}
            onChange={(e) => updateConfig('systemSettings', 'maintenanceMode', e.target.checked)}
          />
          <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
            Enable Maintenance Mode
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoBackup"
            className="mr-2"
            checked={config.systemSettings.autoBackup}
            onChange={(e) => updateConfig('systemSettings', 'autoBackup', e.target.checked)}
          />
          <label htmlFor="autoBackup" className="text-sm font-medium text-gray-700">
            Enable Automatic Backups
          </label>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Email Configuration</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.emailSettings.smtpServer}
            onChange={(e) => updateConfig('emailSettings', 'smtpServer', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.emailSettings.smtpPort}
            onChange={(e) => updateConfig('emailSettings', 'smtpPort', parseInt(e.target.value))}
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email Address</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.emailSettings.emailFrom}
            onChange={(e) => updateConfig('emailSettings', 'emailFrom', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Notification Types</h4>
        <div className="space-y-2">
          {Object.entries(config.emailSettings.notificationTypes).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                className="mr-2"
                checked={value}
                onChange={(e) => updateNestedConfig('emailSettings', 'notificationTypes', key, e.target.checked)}
              />
              <label htmlFor={key} className="text-sm text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Configuration</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            min="5"
            max="480"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.securitySettings.sessionTimeout}
            onChange={(e) => updateConfig('securitySettings', 'sessionTimeout', parseInt(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            min="1"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.securitySettings.maxLoginAttempts}
            onChange={(e) => updateConfig('securitySettings', 'maxLoginAttempts', parseInt(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
          <input
            type="number"
            min="6"
            max="20"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.securitySettings.passwordMinLength}
            onChange={(e) => updateConfig('securitySettings', 'passwordMinLength', parseInt(e.target.value))}
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist (comma-separated)</label>
          <textarea
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.securitySettings.ipWhitelist}
            onChange={(e) => updateConfig('securitySettings', 'ipWhitelist', e.target.value)}
            placeholder="192.168.1.1, 10.0.0.1"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireSpecialChars"
            className="mr-2"
            checked={config.securitySettings.requireSpecialChars}
            onChange={(e) => updateConfig('securitySettings', 'requireSpecialChars', e.target.checked)}
          />
          <label htmlFor="requireSpecialChars" className="text-sm font-medium text-gray-700">
            Require Special Characters in Passwords
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableTwoFactor"
            className="mr-2"
            checked={config.securitySettings.enableTwoFactor}
            onChange={(e) => updateConfig('securitySettings', 'enableTwoFactor', e.target.checked)}
          />
          <label htmlFor="enableTwoFactor" className="text-sm font-medium text-gray-700">
            Enable Two-Factor Authentication
          </label>
        </div>
      </div>
    </div>
  );

  const renderFundingSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Funding Configuration</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Funding Amount (R)</label>
          <input
            type="number"
            min="1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.fundingSettings.minFundingAmount}
            onChange={(e) => updateConfig('fundingSettings', 'minFundingAmount', parseInt(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Funding Amount (R)</label>
          <input
            type="number"
            min="10000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.fundingSettings.maxFundingAmount}
            onChange={(e) => updateConfig('fundingSettings', 'maxFundingAmount', parseInt(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Match Threshold (%)</label>
          <input
            type="number"
            min="50"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.fundingSettings.defaultMatchThreshold}
            onChange={(e) => updateConfig('fundingSettings', 'defaultMatchThreshold', parseInt(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Approval Workflow</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={config.fundingSettings.approvalWorkflow}
            onChange={(e) => updateConfig('fundingSettings', 'approvalWorkflow', e.target.value)}
          >
            <option value="manual">Manual Approval</option>
            <option value="automatic">Automatic Approval</option>
            <option value="hybrid">Hybrid (Auto + Manual)</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="autoMatchEnabled"
          className="mr-2"
          checked={config.fundingSettings.autoMatchEnabled}
          onChange={(e) => updateConfig('fundingSettings', 'autoMatchEnabled', e.target.checked)}
        />
        <label htmlFor="autoMatchEnabled" className="text-sm font-medium text-gray-700">
          Enable Automatic Matching
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">System Configuration</h1>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-white">Configure system settings, security, and operational parameters</p>
          </div>
        </div>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'system', label: 'System', icon: '' },
                { id: 'email', label: 'Email', icon: '' },
                { id: 'security', label: 'Security', icon: '' },
                { id: 'funding', label: 'Funding', icon: '' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'system' && renderSystemSettings()}
            {activeTab === 'email' && renderEmailSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'funding' && renderFundingSettings()}
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfiguration;