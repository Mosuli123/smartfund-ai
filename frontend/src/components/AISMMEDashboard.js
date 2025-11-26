import React, { useState, useEffect } from 'react';
import { BuildingIcon, TargetIcon, DocumentIcon, RocketIcon } from '../components/Icons';

const AISMMEDashboard = ({ user }) => {
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAIInsights();
  }, []);

  const fetchAIInsights = async () => {
    try {
      const response = await fetch('http://localhost:8008/api/smme/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'get insights', user_id: user?.user_id || 'demo_user' })
      });
      const data = await response.json();
      if (data.success) {
        setAiInsights(data.data);
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

  if (!aiInsights) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
        <BuildingIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Complete your business profile to unlock AI insights</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'AI Overview', icon: RocketIcon },
    { id: 'opportunities', label: 'Auto Applications', icon: TargetIcon },
    { id: 'optimization', label: 'Profile AI', icon: BuildingIcon },
    { id: 'notifications', label: 'Smart Alerts', icon: DocumentIcon }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full flex items-center justify-center">
              <RocketIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Business Assistant</h2>
              <p className="text-sm text-gray-500">Intelligent funding automation for your business</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">AI Working</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(aiInsights.personalized_insights.quick_stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
            </div>
          ))}
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
                  ? 'border-b-2 border-orange-500 text-orange-600 bg-orange-50'
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
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">AI Success Prediction</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-700">Funding Success Probability</span>
                <span className="text-2xl font-bold text-green-900">
                  {aiInsights.profile_analysis.success_probability.probability}%
                </span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full transition-all duration-1000" 
                  style={{width: `${aiInsights.profile_analysis.success_probability.probability}%`}}
                ></div>
              </div>
              <p className="text-green-700 text-sm mt-2">
                {aiInsights.profile_analysis.success_probability.recommendation}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-3">Profile Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-orange-700">Completeness</span>
                    <span className="font-medium text-orange-900">
                      {aiInsights.profile_analysis.profile_completeness.score}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-700">Funding Readiness</span>
                    <span className="font-medium text-orange-900">
                      {aiInsights.profile_analysis.funding_readiness.level}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">Next Actions</h3>
                <ul className="space-y-1">
                  {aiInsights.personalized_insights.next_actions.slice(0, 3).map((action, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-blue-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">AI Recommendations</h3>
              <ul className="space-y-2">
                {aiInsights.personalized_insights.ai_recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <RocketIcon className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">AI Auto-Application System</h3>
              <p className="text-blue-700 text-sm">
                AI continuously scans for funding opportunities and generates applications automatically based on your profile.
              </p>
            </div>

            <div className="space-y-4">
              {aiInsights.auto_opportunities.map((opportunity, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{opportunity.opportunity.name}</h4>
                      <p className="text-sm text-gray-600">
                        {opportunity.opportunity.type} • R{opportunity.opportunity.min_amount?.toLocaleString()} - R{opportunity.opportunity.max_amount?.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        opportunity.match_score >= 80 ? 'bg-green-100 text-green-800' :
                        opportunity.match_score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {opportunity.match_score}% Match
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        opportunity.ai_confidence === 'High' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {opportunity.ai_confidence} Confidence
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
                    <p className="text-sm font-medium text-green-800 mb-1">AI-Generated Application Ready</p>
                    <p className="text-sm text-green-700">
                      Application automatically created and optimized for this opportunity. 
                      Review and submit with one click.
                    </p>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    <strong>Match Explanation:</strong>
                    <pre className="whitespace-pre-wrap text-xs mt-1 bg-gray-50 p-2 rounded">
                      {opportunity.auto_application.match_explanation}
                    </pre>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 text-sm font-medium">
                      Review Application
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                      Submit Now
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Profile Completeness</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Completion Score</span>
                    <span className="font-bold text-gray-900">
                      {aiInsights.profile_analysis.profile_completeness.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-orange-600 h-2 rounded-full" 
                      style={{width: `${aiInsights.profile_analysis.profile_completeness.score}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {aiInsights.profile_analysis.profile_completeness.completed_fields} of {aiInsights.profile_analysis.profile_completeness.total_fields} fields completed
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Funding Readiness</h3>
                <div className="space-y-2">
                  {aiInsights.profile_analysis.funding_readiness.factors.map((factor, index) => (
                    <div key={index} className={`p-2 rounded text-sm ${
                      factor.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {factor}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-3">AI Optimization Suggestions</h3>
              <ul className="space-y-2">
                {aiInsights.profile_analysis.optimization_suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <TargetIcon className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {aiInsights.notifications.map((notification, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                notification.priority === 'high' ? 'border-orange-200 bg-orange-50' :
                notification.priority === 'medium' ? 'border-blue-200 bg-blue-50' :
                'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    notification.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    notification.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {notification.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-3">{notification.message}</p>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  notification.priority === 'high' ? 'bg-orange-600 text-white hover:bg-orange-700' :
                  'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {notification.action}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISMMEDashboard;