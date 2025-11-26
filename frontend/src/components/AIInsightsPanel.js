import React, { useState, useEffect } from 'react';
import { AdminIcons } from './AdminIcons';

const AIInsightsPanel = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAIInsights();
  }, []);

  const fetchAIInsights = async () => {
    try {
      const response = await fetch('http://localhost:8008/api/admin/ai-insights');
      const data = await response.json();
      if (data.success) {
        setInsights(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
        <AdminIcons.XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">Failed to load AI insights</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'AI Overview', icon: AdminIcons.Analytics },
    { id: 'users', label: 'User Intelligence', icon: AdminIcons.Users },
    { id: 'predictions', label: 'Predictions', icon: AdminIcons.TrendingUp },
    { id: 'health', label: 'System Health', icon: AdminIcons.Shield }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center">
              <AdminIcons.Analytics className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI System Intelligence</h2>
              <p className="text-sm text-gray-500">Real-time insights and predictions</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">AI Active</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(insights.executive_summary.key_metrics).map(([key, value]) => (
                <div key={key} className="bg-gradient-to-br from-blue-50 to-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">AI Recommendations</h3>
              <ul className="space-y-1">
                {insights.executive_summary.strategic_recommendations.slice(0, 3).map((rec, index) => (
                  <li key={index} className="text-green-700 text-sm flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">User Segments</h3>
                <div className="space-y-3">
                  {Object.entries(insights.user_analysis.user_segmentation).map(([segment, data]) => (
                    <div key={segment} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium capitalize">{segment.replace('_', ' ')}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{data.count}</span>
                      </div>
                      <p className="text-sm text-gray-600">{data.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Risk Assessment</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800">Security Score</span>
                    <span className="font-bold text-green-600">{insights.user_analysis.risk_assessment.security_score}%</span>
                  </div>
                  <div className="space-y-2">
                    {insights.user_analysis.risk_assessment.fraud_alerts.map((alert, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        alert.risk_level === 'High' ? 'bg-red-50 border border-red-200' :
                        alert.risk_level === 'Medium' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{alert.user_id}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            alert.risk_level === 'High' ? 'bg-red-100 text-red-800' :
                            alert.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {alert.risk_level} Risk
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{alert.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">Registration Trends</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Next Week</span>
                    <span className="font-medium text-blue-900">+{insights.user_analysis.registration_trends.predicted_next_week - insights.user_analysis.registration_trends.current_users} users</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Next Month</span>
                    <span className="font-medium text-blue-900">+{insights.user_analysis.registration_trends.predicted_next_month - insights.user_analysis.registration_trends.current_users} users</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Growth Rate</span>
                    <span className="font-medium text-blue-900">{insights.user_analysis.registration_trends.growth_rate}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-3">System Predictions</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(insights.predictive_insights.system_predictions).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-orange-700 capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-medium text-orange-900 text-right max-w-xs">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">AI Recommendations</h3>
              <ul className="space-y-2">
                {insights.predictive_insights.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <AdminIcons.CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                <div className="space-y-3">
                  {Object.entries(insights.system_health.performance_metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">AI Alerts</h3>
                <div className="space-y-3">
                  {insights.system_health.alerts.map((alert, index) => (
                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AdminIcons.CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-900">{alert.type}</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-1">{alert.message}</p>
                      <p className="text-xs text-blue-600">{alert.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;