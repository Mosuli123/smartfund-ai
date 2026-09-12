import React, { useState, useEffect } from 'react';
import { ModernIcons } from '../components/ModernIcons';

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    try {
      // Generate notifications based on user activity
      const matches = JSON.parse(localStorage.getItem('matchedOpportunities') || '[]');
      const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
      const profile = JSON.parse(localStorage.getItem('businessProfile') || '{}');
      
      const notifs = [
        ...matches.slice(0, 3).map((match, index) => ({
          id: `match-${index}`,
          type: 'match',
          title: 'New Funding Match Found',
          message: `${match.name} matches your business profile with ${match.match_score}% compatibility`,
          timestamp: new Date(Date.now() - index * 2 * 60 * 60 * 1000).toISOString(),
          read: index > 0,
          actionUrl: '/funding-opportunities',
          priority: match.match_score >= 80 ? 'high' : 'normal'
        })),
        ...applications.slice(0, 3).map((app, index) => ({
          id: `app-${index}`,
          type: 'application',
          title: 'Application Status Update',
          message: `Your application for ${app.opportunity_name} is now ${app.status.toLowerCase()}`,
          timestamp: new Date(app.last_updated || Date.now()).toISOString(),
          read: app.status !== 'Approved',
          actionUrl: '/applications',
          priority: app.status === 'Approved' ? 'high' : 'normal'
        })),
        // System notifications
        {
          id: 'achievement-unlock',
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: 'You have completed your business profile. Great job!',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          read: false,
          actionUrl: '/profile',
          priority: 'high'
        },
        {
          id: 'weekly-goal',
          type: 'goal',
          title: 'Weekly Goal Progress',
          message: 'You are 80% towards your weekly application goal. Keep it up!',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          read: false,
          actionUrl: '/applications',
          priority: 'normal'
        },
        {
          id: 'welcome',
          type: 'system',
          title: 'Welcome to SmartFund AI',
          message: 'Complete your business profile to start receiving funding matches',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: true,
          actionUrl: '/profile',
          priority: 'normal'
        }
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setNotifications(notifs);
      setLoading(false);
    } catch (err) {
      setError('Failed to load notifications');
      setLoading(false);
      console.error('Notification loading error:', err);
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'matches') return notif.type === 'match';
    if (filter === 'applications') return notif.type === 'application';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'match': return <ModernIcons.Target className="w-6 h-6" color="#4180be" />;
      case 'application': return <ModernIcons.FileText className="w-6 h-6" color="#e67e22" />;
      case 'achievement': return <ModernIcons.Award className="w-6 h-6" color="#d35400" />;
      case 'goal': return <ModernIcons.TrendingUp className="w-6 h-6" color="#1e3a5f" />;
      case 'system': return <ModernIcons.Bell className="w-6 h-6" color="#64748b" />;
      default: return <ModernIcons.Info className="w-6 h-6" color="#64748b" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'match': return 'bg-blue-100 text-blue-800';
      case 'application': return 'bg-orange-100 text-orange-800';
      case 'achievement': return 'bg-yellow-100 text-yellow-800';
      case 'goal': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8" style={{background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)'}}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="modern-card p-8 text-center">
            <ModernIcons.Bell className="w-12 h-12 mx-auto mb-4 animate-pulse" color="#4180be" />
            <h2 className="text-xl font-semibold mb-2" style={{color: '#1e3a5f'}}>Loading Notifications...</h2>
            <p style={{color: '#64748b'}}>Please wait while we fetch your updates</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8" style={{background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)'}}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="modern-card p-8 text-center">
            <ModernIcons.Info className="w-12 h-12 mx-auto mb-4" color="#ef4444" />
            <h2 className="text-xl font-semibold mb-2 text-red-600">Error Loading Notifications</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={loadNotifications} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)'}}>
      <div className="max-w-4xl mx-auto px-4">
      <div className="modern-card p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="heading-1" style={{color: '#1e3a5f'}}>Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="btn-secondary"
          >
            <ModernIcons.CheckCircle className="w-4 h-4" />
            Mark all as read
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread' },
            { key: 'matches', label: 'Matches' },
            { key: 'applications', label: 'Applications' }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === filterOption.key
                  ? 'btn-primary'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filterOption.label}
              {filterOption.key === 'unread' && notifications.filter(n => !n.read).length > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <ModernIcons.Bell className="w-16 h-16 mx-auto mb-4" color="#9ca3af" />
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1e3a5f'}}>No notifications</h3>
              <p style={{color: '#64748b'}}>You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-all ${
                  notification.read 
                    ? 'bg-gray-50 border-gray-200' 
                    : notification.priority === 'high'
                    ? 'bg-orange-50 border-orange-200 shadow-sm'
                    : 'bg-white border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${
                          notification.read ? 'text-gray-700' : 'text-gray-900'
                        }`} style={{color: notification.read ? '#64748b' : '#1e3a5f'}}>
                          {notification.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#e67e22'}}></span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        notification.read ? 'text-gray-600' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm font-medium transition-colors"
                        style={{color: '#4180be'}}
                        onMouseEnter={(e) => e.target.style.color = '#1e3a5f'}
                        onMouseLeave={(e) => e.target.style.color = '#4180be'}
                      >
                        Mark read
                      </button>
                    )}
                    <a
                      href={notification.actionUrl}
                      className="text-sm font-medium transition-colors flex items-center space-x-1"
                      style={{color: '#e67e22'}}
                      onMouseEnter={(e) => e.target.style.color = '#d35400'}
                      onMouseLeave={(e) => e.target.style.color = '#e67e22'}
                    >
                      <span>View</span>
                      <ModernIcons.ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Notifications;