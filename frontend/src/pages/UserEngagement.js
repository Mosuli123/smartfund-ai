import React, { useState, useEffect } from 'react';
import ModernIcons from '../components/ModernIcons';

const UserEngagement = ({ user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [engagementData, setEngagementData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [weeklyGoals, setWeeklyGoals] = useState([]);

  useEffect(() => {
    loadEngagementData();
    loadAchievements();
    loadWeeklyGoals();
  }, []);

  const loadEngagementData = () => {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
    const matches = JSON.parse(localStorage.getItem('matchedOpportunities') || '[]');
    const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');

    const data = {
      profileCompleteness: calculateProfileCompleteness(profile),
      totalApplications: applications.length,
      successfulMatches: matches.filter(m => m.match_score >= 70).length,
      loginStreak: calculateLoginStreak(loginHistory),
      lastActive: new Date().toISOString(),
      weeklyActivity: generateWeeklyActivity(),
      engagementScore: 0
    };

    data.engagementScore = calculateEngagementScore(data);
    setEngagementData(data);
  };

  const calculateProfileCompleteness = (profile) => {
    const requiredFields = ['business_name', 'industry', 'funding_amount', 'location', 'years_in_operation'];
    const completedFields = requiredFields.filter(field => profile[field] && profile[field] !== '');
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const calculateLoginStreak = (history) => {
    if (!history.length) return 0;
    let streak = 1;
    const today = new Date().toDateString();
    
    for (let i = history.length - 1; i >= 0; i--) {
      const loginDate = new Date(history[i]).toDateString();
      if (loginDate === today || 
          new Date(today).getTime() - new Date(loginDate).getTime() <= 24 * 60 * 60 * 1000) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const generateWeeklyActivity = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      activity: Math.floor(Math.random() * 100)
    }));
  };

  const calculateEngagementScore = (data) => {
    let score = 0;
    score += data.profileCompleteness * 0.3;
    score += Math.min(data.totalApplications * 10, 30);
    score += Math.min(data.successfulMatches * 15, 25);
    score += Math.min(data.loginStreak * 3, 15);
    return Math.round(score);
  };

  const loadAchievements = () => {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
    
    const achievementsList = [
      {
        id: 'profile_complete',
        title: 'Profile Master',
        description: 'Complete your business profile',
        icon: 'Users',
        color: '#4180be',
        unlocked: calculateProfileCompleteness(profile) === 100,
        progress: calculateProfileCompleteness(profile)
      },
      {
        id: 'first_application',
        title: 'First Steps',
        description: 'Submit your first funding application',
        icon: 'FileText',
        color: '#e67e22',
        unlocked: applications.length > 0,
        progress: applications.length > 0 ? 100 : 0
      },
      {
        id: 'active_user',
        title: 'Consistent User',
        description: 'Login for 7 consecutive days',
        icon: 'Calendar',
        color: '#1e3a5f',
        unlocked: engagementData?.loginStreak >= 7,
        progress: Math.min((engagementData?.loginStreak || 0) / 7 * 100, 100)
      },
      {
        id: 'match_expert',
        title: 'Match Expert',
        description: 'Get 5 high-quality funding matches',
        icon: 'Target',
        color: '#d35400',
        unlocked: (engagementData?.successfulMatches || 0) >= 5,
        progress: Math.min(((engagementData?.successfulMatches || 0) / 5) * 100, 100)
      }
    ];

    setAchievements(achievementsList);
  };

  const loadWeeklyGoals = () => {
    const goals = [
      {
        id: 'complete_profile',
        title: 'Complete Business Profile',
        description: 'Fill in all required business information',
        target: 100,
        current: engagementData?.profileCompleteness || 0,
        type: 'percentage'
      },
      {
        id: 'apply_funding',
        title: 'Submit Applications',
        description: 'Apply to at least 2 funding opportunities',
        target: 2,
        current: JSON.parse(localStorage.getItem('userApplications') || '[]').length,
        type: 'count'
      },
      {
        id: 'daily_login',
        title: 'Stay Active',
        description: 'Login at least 5 days this week',
        target: 5,
        current: Math.min(engagementData?.loginStreak || 0, 5),
        type: 'count'
      }
    ];

    setWeeklyGoals(goals);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Engagement Score Card */}
      <div className="modern-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="heading-2" style={{color: '#1e3a5f'}}>Engagement Score</h3>
          <div className="flex items-center space-x-2">
            <ModernIcons.TrendingUp className="w-5 h-5" color="#e67e22" />
            <span className="text-2xl font-bold" style={{color: '#e67e22'}}>
              {engagementData?.engagementScore || 0}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(engagementData?.engagementScore || 0, 100)}%`,
              background: 'linear-gradient(90deg, #4180be 0%, #e67e22 100%)'
            }}
          ></div>
        </div>
        <p className="text-sm" style={{color: '#64748b'}}>
          Keep engaging to improve your score and unlock more features!
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="modern-card p-4 text-center">
          <ModernIcons.Users className="w-8 h-8 mx-auto mb-2" color="#4180be" />
          <div className="text-2xl font-bold" style={{color: '#1e3a5f'}}>
            {engagementData?.profileCompleteness || 0}%
          </div>
          <div className="text-sm" style={{color: '#64748b'}}>Profile Complete</div>
        </div>
        <div className="modern-card p-4 text-center">
          <ModernIcons.FileText className="w-8 h-8 mx-auto mb-2" color="#e67e22" />
          <div className="text-2xl font-bold" style={{color: '#1e3a5f'}}>
            {engagementData?.totalApplications || 0}
          </div>
          <div className="text-sm" style={{color: '#64748b'}}>Applications</div>
        </div>
        <div className="modern-card p-4 text-center">
          <ModernIcons.Target className="w-8 h-8 mx-auto mb-2" color="#d35400" />
          <div className="text-2xl font-bold" style={{color: '#1e3a5f'}}>
            {engagementData?.successfulMatches || 0}
          </div>
          <div className="text-sm" style={{color: '#64748b'}}>Quality Matches</div>
        </div>
        <div className="modern-card p-4 text-center">
          <ModernIcons.Calendar className="w-8 h-8 mx-auto mb-2" color="#1e3a5f" />
          <div className="text-2xl font-bold" style={{color: '#1e3a5f'}}>
            {engagementData?.loginStreak || 0}
          </div>
          <div className="text-sm" style={{color: '#64748b'}}>Day Streak</div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="modern-card p-6">
        <h3 className="heading-2 mb-4" style={{color: '#1e3a5f'}}>Weekly Activity</h3>
        <div className="flex items-end justify-between h-32 space-x-2">
          {engagementData?.weeklyActivity?.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full rounded-t transition-all duration-500"
                style={{
                  height: `${day.activity}%`,
                  background: 'linear-gradient(180deg, #4180be 0%, #e67e22 100%)'
                }}
              ></div>
              <div className="text-xs mt-2" style={{color: '#64748b'}}>{day.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="heading-1 mb-2" style={{color: '#1e3a5f'}}>Achievements</h2>
        <p style={{color: '#64748b'}}>Track your progress and unlock rewards</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`modern-card p-6 ${achievement.unlocked ? 'ring-2 ring-orange-200' : ''}`}
          >
            <div className="flex items-start space-x-4">
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  achievement.unlocked ? 'bg-orange-100' : 'bg-gray-100'
                }`}
              >
                {React.createElement(ModernIcons[achievement.icon], {
                  className: "w-6 h-6",
                  color: achievement.unlocked ? achievement.color : '#9ca3af'
                })}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold" style={{color: '#1e3a5f'}}>
                    {achievement.title}
                  </h3>
                  {achievement.unlocked && (
                    <ModernIcons.CheckCircle className="w-5 h-5" color="#e67e22" />
                  )}
                </div>
                <p className="text-sm mb-3" style={{color: '#64748b'}}>
                  {achievement.description}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${achievement.progress}%`,
                      backgroundColor: achievement.unlocked ? achievement.color : '#9ca3af'
                    }}
                  ></div>
                </div>
                <div className="text-xs mt-1" style={{color: '#64748b'}}>
                  {achievement.progress}% Complete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="heading-1 mb-2" style={{color: '#1e3a5f'}}>Weekly Goals</h2>
        <p style={{color: '#64748b'}}>Stay on track with your funding journey</p>
      </div>

      <div className="space-y-4">
        {weeklyGoals.map((goal) => {
          const progress = goal.type === 'percentage' 
            ? goal.current 
            : Math.min((goal.current / goal.target) * 100, 100);
          
          return (
            <div key={goal.id} className="modern-card p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold" style={{color: '#1e3a5f'}}>
                  {goal.title}
                </h3>
                <span className="text-sm font-medium" style={{color: '#e67e22'}}>
                  {goal.type === 'percentage' 
                    ? `${goal.current}%` 
                    : `${goal.current}/${goal.target}`
                  }
                </span>
              </div>
              <p className="text-sm mb-4" style={{color: '#64748b'}}>
                {goal.description}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: progress >= 100 
                      ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                      : 'linear-gradient(90deg, #4180be 0%, #e67e22 100%)'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (!engagementData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p style={{color: '#64748b'}}>Loading engagement data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)'}}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="heading-1 mb-2" style={{color: '#1e3a5f'}}>User Engagement</h1>
          <p style={{color: '#64748b'}}>Track your progress and stay motivated on your funding journey</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="modern-card p-1 flex space-x-1">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: 'Chart' },
              { key: 'achievements', label: 'Achievements', icon: 'Award' },
              { key: 'goals', label: 'Goals', icon: 'Target' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.key 
                    ? 'btn-primary' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {React.createElement(ModernIcons[tab.icon], { className: "w-4 h-4" })}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'achievements' && renderAchievements()}
        {activeTab === 'goals' && renderGoals()}
      </div>
    </div>
  );
};

export default UserEngagement;