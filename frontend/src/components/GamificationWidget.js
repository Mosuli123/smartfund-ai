import React, { useState, useEffect } from 'react';
import { ModernIcons } from './ModernIcons';

const GamificationWidget = ({ user, compact = false }) => {
  const [userStats, setUserStats] = useState(null);
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadUserStats();
    loadRecentAchievements();
  }, []);

  const loadUserStats = () => {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
    const matches = JSON.parse(localStorage.getItem('matchedOpportunities') || '[]');
    const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');

    const stats = {
      level: calculateUserLevel(profile, applications, matches),
      xp: calculateXP(profile, applications, matches),
      streak: calculateStreak(loginHistory),
      completionRate: calculateProfileCompletion(profile),
      badges: calculateBadges(profile, applications, matches)
    };

    setUserStats(stats);
  };

  const loadRecentAchievements = () => {
    const milestones = JSON.parse(localStorage.getItem('engagementMilestones') || '[]');
    const recent = milestones
      .filter(m => Date.now() - m.timestamp < 7 * 24 * 60 * 60 * 1000) // Last 7 days
      .slice(-3);
    
    setRecentAchievements(recent);
  };

  const calculateUserLevel = (profile, applications, matches) => {
    let points = 0;
    
    // Profile completion points
    const requiredFields = ['business_name', 'industry', 'funding_amount', 'location'];
    const completedFields = requiredFields.filter(field => profile[field]);
    points += completedFields.length * 25;

    // Application points
    points += applications.length * 50;

    // Match quality points
    const highQualityMatches = matches.filter(m => m.match_score >= 70);
    points += highQualityMatches.length * 30;

    // Calculate level (every 200 points = 1 level)
    return Math.floor(points / 200) + 1;
  };

  const calculateXP = (profile, applications, matches) => {
    let xp = 0;
    
    // Base XP from profile
    const requiredFields = ['business_name', 'industry', 'funding_amount', 'location'];
    const completedFields = requiredFields.filter(field => profile[field]);
    xp += completedFields.length * 25;

    // XP from applications
    xp += applications.length * 50;

    // XP from matches
    xp += matches.length * 20;

    return xp;
  };

  const calculateStreak = (loginHistory) => {
    if (!loginHistory.length) return 0;
    
    let streak = 1;
    const today = new Date().toDateString();
    
    for (let i = loginHistory.length - 1; i >= 0; i--) {
      const loginDate = new Date(loginHistory[i]).toDateString();
      if (loginDate === today || 
          new Date(today).getTime() - new Date(loginDate).getTime() <= 24 * 60 * 60 * 1000) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const calculateProfileCompletion = (profile) => {
    const allFields = [
      'business_name', 'industry', 'funding_amount', 'location', 
      'years_in_operation', 'employee_count', 'annual_turnover', 'funding_purpose'
    ];
    const completedFields = allFields.filter(field => profile[field] && profile[field] !== '');
    return Math.round((completedFields.length / allFields.length) * 100);
  };

  const calculateBadges = (profile, applications, matches) => {
    const badges = [];

    // Profile badges
    if (calculateProfileCompletion(profile) === 100) {
      badges.push({ id: 'profile_master', name: 'Profile Master', icon: 'Users', color: '#4180be' });
    }

    // Application badges
    if (applications.length >= 1) {
      badges.push({ id: 'first_application', name: 'First Steps', icon: 'FileText', color: '#e67e22' });
    }
    if (applications.length >= 5) {
      badges.push({ id: 'active_applicant', name: 'Active Applicant', icon: 'Send', color: '#d35400' });
    }

    // Match badges
    const highQualityMatches = matches.filter(m => m.match_score >= 80);
    if (highQualityMatches.length >= 3) {
      badges.push({ id: 'match_expert', name: 'Match Expert', icon: 'Target', color: '#1e3a5f' });
    }

    return badges;
  };

  const getNextLevelXP = () => {
    if (!userStats) return 0;
    return userStats.level * 200;
  };

  const getCurrentLevelProgress = () => {
    if (!userStats) return 0;
    const currentLevelXP = (userStats.level - 1) * 200;
    const progressXP = userStats.xp - currentLevelXP;
    return (progressXP / 200) * 100;
  };

  if (!userStats) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{background: 'linear-gradient(135deg, #4180be 0%, #e67e22 100%)'}}
          >
            {userStats.level}
          </div>
          <div>
            <div className="text-sm font-medium" style={{color: '#1e3a5f'}}>
              Level {userStats.level}
            </div>
            <div className="text-xs" style={{color: '#64748b'}}>
              {userStats.xp} XP
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ModernIcons.Flame className="w-4 h-4" color="#e67e22" />
          <span className="text-sm font-medium" style={{color: '#e67e22'}}>
            {userStats.streak}
          </span>
        </div>

        <div className="flex space-x-1">
          {userStats.badges.slice(0, 3).map((badge, index) => (
            <div 
              key={badge.id}
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{backgroundColor: badge.color + '20'}}
              title={badge.name}
            >
              {React.createElement(ModernIcons[badge.icon], { className: "w-3 h-3", color: badge.color })}
            </div>
          ))}
          {userStats.badges.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-gray-600">+{userStats.badges.length - 3}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="modern-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="heading-2" style={{color: '#1e3a5f'}}>Your Progress</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Level and XP */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
              style={{background: 'linear-gradient(135deg, #4180be 0%, #e67e22 100%)'}}
            >
              {userStats.level}
            </div>
            <div>
              <div className="text-lg font-semibold" style={{color: '#1e3a5f'}}>
                Level {userStats.level}
              </div>
              <div className="text-sm" style={{color: '#64748b'}}>
                {userStats.xp} / {getNextLevelXP()} XP
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <ModernIcons.Flame className="w-5 h-5" color="#e67e22" />
            <div className="text-center">
              <div className="text-lg font-bold" style={{color: '#e67e22'}}>
                {userStats.streak}
              </div>
              <div className="text-xs" style={{color: '#64748b'}}>Day Streak</div>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${getCurrentLevelProgress()}%`,
              background: 'linear-gradient(90deg, #4180be 0%, #e67e22 100%)'
            }}
          ></div>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3" style={{color: '#1e3a5f'}}>
          Badges ({userStats.badges.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {userStats.badges.map((badge) => (
            <div 
              key={badge.id}
              className="flex items-center space-x-2 px-3 py-2 rounded-full border"
              style={{
                backgroundColor: badge.color + '10',
                borderColor: badge.color + '30'
              }}
            >
              {React.createElement(ModernIcons[badge.icon], { className: "w-4 h-4", color: badge.color })}
              <span className="text-sm font-medium" style={{color: badge.color}}>
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-3" style={{color: '#1e3a5f'}}>
            Recent Achievements
          </h4>
          <div className="space-y-2">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-orange-50 rounded-lg">
                <ModernIcons.Award className="w-4 h-4" color="#e67e22" />
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{color: '#1e3a5f'}}>
                    {achievement.milestone}
                  </div>
                  <div className="text-xs" style={{color: '#64748b'}}>
                    {new Date(achievement.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDetails && (
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium" style={{color: '#1e3a5f'}}>Profile Completion</div>
              <div style={{color: '#64748b'}}>{userStats.completionRate}%</div>
            </div>
            <div>
              <div className="font-medium" style={{color: '#1e3a5f'}}>Total Applications</div>
              <div style={{color: '#64748b'}}>{JSON.parse(localStorage.getItem('userApplications') || '[]').length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationWidget;