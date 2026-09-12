import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FourHorsemenLogo } from '../components/FourHorsemenLogo';
import { FourHorsemenEnterpriseService, FourHorsemenUtils } from '../services/enterpriseService';

const FourHorsemenDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      // Check authentication
      if (!FourHorsemenEnterpriseService.isAuthenticated()) {
        navigate('/four-horsemen/login');
        return;
      }

      // Load user data
      const currentUser = FourHorsemenEnterpriseService.getCurrentUser();
      const storedProfile = FourHorsemenEnterpriseService.getStoredProfile();
      
      setUser(currentUser);
      setProfile(storedProfile);

      // Load analytics data
      const analyticsData = await FourHorsemenEnterpriseService.getEnterpriseAnalytics();
      setAnalytics(analyticsData.data);

    } catch (error) {
      console.error('Dashboard initialization failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await FourHorsemenEnterpriseService.logout();
      navigate('/four-horsemen/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <FourHorsemenLogo variant="icon-only" className="mx-auto mb-6 animate-pulse" />
          <div className="text-white text-xl font-medium">Loading Enterprise Dashboard...</div>
          <div className="text-purple-300 text-sm mt-2">Four Horsemen Technologies</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Enterprise Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <FourHorsemenLogo showText={true} />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-white">SmartFund AI</h1>
                <p className="text-purple-300 text-sm">Enterprise Intelligence Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-white font-medium">{user?.company || 'Enterprise User'}</p>
                <p className="text-purple-300 text-sm">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-black/10 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'analytics', name: 'Analytics', icon: '📈' },
              { id: 'intelligence', name: 'AI Intelligence', icon: '🤖' },
              { id: 'portfolio', name: 'Portfolio', icon: '💼' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-400 text-white'
                    : 'border-transparent text-purple-300 hover:text-white hover:border-purple-500/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to Four Horsemen Technologies
              </h2>
              <p className="text-purple-200 text-lg mb-6">
                Enterprise-grade funding intelligence platform powered by advanced AI algorithms
              </p>
              
              {profile && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/20 rounded-xl p-4">
                    <h3 className="text-white font-semibold">{profile.business_name}</h3>
                    <p className="text-purple-300 text-sm">{profile.industry}</p>
                    <p className="text-purple-300 text-sm">CIPC: {profile.cipc_registration_number}</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4">
                    <h3 className="text-white font-semibold">Business Score</h3>
                    <p className="text-2xl font-bold text-green-400">
                      {FourHorsemenUtils.calculateBusinessScore(profile)}%
                    </p>
                    <p className="text-purple-300 text-sm">Excellent Rating</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4">
                    <h3 className="text-white font-semibold">Funding Target</h3>
                    <p className="text-2xl font-bold text-orange-400">
                      {FourHorsemenUtils.formatCurrency(profile.funding_amount)}
                    </p>
                    <p className="text-purple-300 text-sm">{profile.funding_purpose}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            {analytics && (
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">🎯</div>
                    <div className="text-green-400 font-bold text-2xl">
                      {analytics.user_metrics?.success_rate}%
                    </div>
                  </div>
                  <h3 className="text-white font-semibold">Success Rate</h3>
                  <p className="text-green-300 text-sm">Funding Approvals</p>
                </div>

                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">💰</div>
                    <div className="text-blue-400 font-bold text-2xl">
                      {analytics.funding_metrics?.total_opportunities}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold">Opportunities</h3>
                  <p className="text-blue-300 text-sm">Available Now</p>
                </div>

                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">🚀</div>
                    <div className="text-purple-400 font-bold text-2xl">
                      {analytics.performance_metrics?.ai_accuracy}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold">AI Accuracy</h3>
                  <p className="text-purple-300 text-sm">Matching Precision</p>
                </div>

                <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">📈</div>
                    <div className="text-orange-400 font-bold text-2xl">
                      +23%
                    </div>
                  </div>
                  <h3 className="text-white font-semibold">Growth</h3>
                  <p className="text-orange-300 text-sm">Monthly Increase</p>
                </div>
              </div>
            )}

            {/* Action Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-colors cursor-pointer">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-white font-bold text-lg mb-2">Find Funding</h3>
                <p className="text-purple-200 text-sm mb-4">
                  AI-powered matching with 94.2% accuracy rate
                </p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors">
                  Start Matching
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-800/30 to-indigo-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-colors cursor-pointer">
                <div className="text-3xl mb-4">📄</div>
                <h3 className="text-white font-bold text-lg mb-2">Generate Application</h3>
                <p className="text-blue-200 text-sm mb-4">
                  Professional applications powered by AI
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                  Create Application
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-800/30 to-emerald-800/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-colors cursor-pointer">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-white font-bold text-lg mb-2">Business Intelligence</h3>
                <p className="text-green-200 text-sm mb-4">
                  Advanced analytics and market insights
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && analytics && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Enterprise Analytics</h2>
            
            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-white font-bold text-lg mb-4">System Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Response Time</span>
                    <span className="text-green-400 font-bold">{analytics.performance_metrics?.response_time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Uptime</span>
                    <span className="text-green-400 font-bold">{analytics.performance_metrics?.uptime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">User Satisfaction</span>
                    <span className="text-green-400 font-bold">{analytics.performance_metrics?.user_satisfaction}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-800/30 to-indigo-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-white font-bold text-lg mb-4">Business Intelligence</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Market Penetration</span>
                    <span className="text-orange-400 font-bold">{analytics.business_intelligence?.market_penetration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Growth Trend</span>
                    <span className="text-green-400 font-bold">{analytics.business_intelligence?.growth_trend}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">ROI Projection</span>
                    <span className="text-purple-400 font-bold">{analytics.business_intelligence?.roi_projection}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intelligence' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">AI Intelligence Center</h2>
              <p className="text-purple-200 text-lg">
                Powered by Four Horsemen Technologies Advanced AI
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
              <div className="text-center">
                <div className="text-6xl mb-6">🤖</div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Intelligence Coming Soon</h3>
                <p className="text-purple-200 text-lg mb-8">
                  Advanced machine learning algorithms for predictive funding analysis
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">🧠</div>
                    <h4 className="text-white font-semibold">Predictive Analytics</h4>
                    <p className="text-purple-300">Market trend prediction</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="text-white font-semibold">Smart Matching</h4>
                    <p className="text-purple-300">Enhanced opportunity detection</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="text-white font-semibold">Risk Assessment</h4>
                    <p className="text-purple-300">Automated risk evaluation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Investment Portfolio</h2>
            <div className="bg-gradient-to-br from-green-800/30 to-emerald-800/30 backdrop-blur-sm rounded-xl p-8 border border-green-500/30">
              <div className="text-center">
                <div className="text-6xl mb-6">💼</div>
                <h3 className="text-2xl font-bold text-white mb-4">Portfolio Management</h3>
                <p className="text-green-200 text-lg">
                  Comprehensive portfolio tracking and performance analytics
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-purple-500/30 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FourHorsemenLogo variant="icon-only" />
              <div>
                <p className="text-white font-medium">Four Horsemen Technologies</p>
                <p className="text-purple-300 text-sm">SmartFund AI Enterprise Edition v2.0</p>
              </div>
            </div>
            <div className="text-purple-300 text-sm">
              Powered by Advanced AI • Secure • Scalable • Enterprise Ready
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FourHorsemenDashboard;