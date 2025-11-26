import React, { useState, useEffect } from 'react';
import { AdminIcons } from './AdminIcons';

const AIFundingInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    fetchFundingInsights();
  }, []);

  const fetchFundingInsights = async () => {
    try {
      const response = await fetch('http://localhost:8008/api/funding-admin/ai-insights');
      const data = await response.json();
      if (data.success) {
        setInsights(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch funding AI insights:', error);
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
    { id: 'applications', label: 'Smart Scoring', icon: AdminIcons.DocumentText },
    { id: 'portfolio', label: 'Portfolio AI', icon: AdminIcons.Analytics },
    { id: 'market', label: 'Market Intelligence', icon: AdminIcons.TrendingUp },
    { id: 'strategy', label: 'AI Strategy', icon: AdminIcons.Settings }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-green-600 bg-green-100';
    if (risk === 'Medium') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full flex items-center justify-center">
              <AdminIcons.CurrencyDollar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Funding Intelligence</h2>
              <p className="text-sm text-gray-500">Smart application analysis and portfolio optimization</p>
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
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(insights.executive_dashboard.key_metrics).map(([key, value]) => (
                <div key={key} className="bg-gradient-to-br from-orange-50 to-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">AI-Scored Applications</h3>
              <div className="space-y-4">
                {insights.scored_applications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{app.business_name}</h4>
                        <p className="text-sm text-gray-600">{app.industry} • {app.years_in_operation} years • R{app.funding_amount?.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(app.ai_score)}`}>
                          Score: {app.ai_score}/100
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(app.risk_level)}`}>
                          {app.risk_level} Risk
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Success Probability:</strong> {app.success_probability}
                      </p>
                      <p className={`text-sm font-medium ${
                        app.ai_recommendation.startsWith('APPROVE') ? 'text-green-700' :
                        app.ai_recommendation.startsWith('CONSIDER') ? 'text-yellow-700' :
                        app.ai_recommendation.startsWith('REVIEW') ? 'text-blue-700' :
                        'text-red-700'
                      }`}>
                        <strong>AI Recommendation:</strong> {app.ai_recommendation}
                      </p>
                    </div>

                    {app.risk_factors && app.risk_factors.length > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <p className="text-sm font-medium text-yellow-800 mb-1">Risk Factors:</p>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          {app.risk_factors.map((factor, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-yellow-500 mr-2">•</span>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">Portfolio Health</h3>
                <div className="space-y-2">
                  {Object.entries(insights.portfolio_analysis.portfolio_health).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-green-700 capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-medium text-green-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">Risk Distribution</h3>
                <div className="space-y-2">
                  {Object.entries(insights.portfolio_analysis.risk_distribution).map(([risk, percentage]) => (
                    <div key={risk} className="flex justify-between items-center">
                      <span className="text-blue-700">{risk}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: percentage}}
                          ></div>
                        </div>
                        <span className="font-medium text-blue-900 text-sm">{percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Industry Performance</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(insights.portfolio_analysis.industry_performance).map(([industry, data]) => (
                  <div key={industry} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{industry}</h4>
                      <span className="text-lg">{data.trend}</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-medium">{data.success_rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg ROI</span>
                        <span className="font-medium">{data.avg_roi}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">AI Insights</h3>
              <ul className="space-y-2">
                {insights.portfolio_analysis.ai_insights.map((insight, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <AdminIcons.CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Emerging Sectors</h3>
                <div className="space-y-3">
                  {insights.market_insights.market_trends.emerging_sectors.map((sector, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-green-900">{sector.sector}</span>
                        <span className="text-green-600 font-bold">{sector.growth}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        sector.opportunity === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sector.opportunity} Opportunity
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Market Patterns</h3>
                <div className="space-y-3">
                  {Object.entries(insights.market_insights.funding_patterns).map(([key, value]) => (
                    <div key={key} className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 capitalize mb-1">
                        {key.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-blue-700">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-3">Predictive Alerts</h3>
              <ul className="space-y-2">
                {insights.market_insights.predictive_alerts.map((alert, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <AdminIcons.TrendingUp className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-700">{alert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">Recommended Allocation</h3>
                <div className="space-y-2">
                  {Object.entries(insights.funding_strategy.allocation_optimization.recommended_distribution).map(([sector, percentage]) => (
                    <div key={sector} className="flex justify-between items-center">
                      <span className="text-blue-700">{sector}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: percentage}}
                          ></div>
                        </div>
                        <span className="font-medium text-blue-900 text-sm">{percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">Risk Management</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Diversification Score</span>
                    <span className="font-medium text-green-900">{insights.funding_strategy.risk_management.diversification_score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Concentration Risk</span>
                    <span className="font-medium text-green-900">{insights.funding_strategy.risk_management.concentration_risk}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">AI Automation Opportunities</h3>
              <ul className="space-y-2">
                {insights.funding_strategy.process_improvements.ai_automation_opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <AdminIcons.Settings className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{opportunity}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 p-3 bg-blue-100 rounded">
                <span className="text-sm font-medium text-blue-900">
                  Potential Efficiency Gain: {insights.funding_strategy.process_improvements.efficiency_gains}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFundingInsights;