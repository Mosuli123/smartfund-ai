class EngagementService {
  constructor() {
    this.sessionStart = Date.now();
    this.interactions = [];
    this.pageViews = [];
    this.initializeTracking();
  }

  initializeTracking() {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('page_hidden', { timestamp: Date.now() });
      } else {
        this.trackEvent('page_visible', { timestamp: Date.now() });
      }
    });

    // Track clicks
    document.addEventListener('click', (event) => {
      this.trackClick(event);
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      this.trackFormSubmission(event);
    });
  }

  trackEvent(eventType, data = {}) {
    const event = {
      id: this.generateId(),
      type: eventType,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      ...data
    };

    this.interactions.push(event);
    this.saveToStorage();
    
    // Send to analytics if needed
    this.sendAnalytics(event);
  }

  trackPageView(path, title = '') {
    const pageView = {
      id: this.generateId(),
      path,
      title,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      referrer: document.referrer
    };

    this.pageViews.push(pageView);
    this.trackEvent('page_view', { path, title });
  }

  trackClick(event) {
    const target = event.target;
    const clickData = {
      element: target.tagName.toLowerCase(),
      className: target.className,
      id: target.id,
      text: target.textContent?.substring(0, 100),
      href: target.href,
      coordinates: { x: event.clientX, y: event.clientY }
    };

    this.trackEvent('click', clickData);
  }

  trackFormSubmission(event) {
    const form = event.target;
    const formData = {
      formId: form.id,
      formClass: form.className,
      action: form.action,
      method: form.method,
      fieldCount: form.elements.length
    };

    this.trackEvent('form_submit', formData);
  }

  trackUserAction(action, details = {}) {
    const actionData = {
      action,
      details,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    this.trackEvent('user_action', actionData);
  }

  trackEngagementMilestone(milestone, data = {}) {
    const milestoneData = {
      milestone,
      sessionDuration: Date.now() - this.sessionStart,
      interactionCount: this.interactions.length,
      pageViewCount: this.pageViews.length,
      ...data
    };

    this.trackEvent('engagement_milestone', milestoneData);
    
    // Store milestone achievements
    this.saveMilestone(milestone, milestoneData);
  }

  getEngagementMetrics() {
    const now = Date.now();
    const sessionDuration = now - this.sessionStart;
    
    return {
      sessionDuration,
      totalInteractions: this.interactions.length,
      totalPageViews: this.pageViews.length,
      clicksPerMinute: this.interactions.filter(i => i.type === 'click').length / (sessionDuration / 60000),
      averageTimePerPage: this.calculateAverageTimePerPage(),
      bounceRate: this.calculateBounceRate(),
      engagementScore: this.calculateEngagementScore()
    };
  }

  calculateAverageTimePerPage() {
    if (this.pageViews.length < 2) return 0;
    
    let totalTime = 0;
    for (let i = 1; i < this.pageViews.length; i++) {
      totalTime += this.pageViews[i].timestamp - this.pageViews[i - 1].timestamp;
    }
    
    return totalTime / (this.pageViews.length - 1);
  }

  calculateBounceRate() {
    const sessions = this.getStoredSessions();
    const bouncedSessions = sessions.filter(session => session.pageViews <= 1);
    return sessions.length > 0 ? (bouncedSessions.length / sessions.length) * 100 : 0;
  }

  calculateEngagementScore() {
    const metrics = this.getEngagementMetrics();
    let score = 0;

    // Session duration (max 30 points)
    score += Math.min(metrics.sessionDuration / 60000 * 2, 30);

    // Interaction frequency (max 25 points)
    score += Math.min(metrics.clicksPerMinute * 5, 25);

    // Page views (max 20 points)
    score += Math.min(metrics.totalPageViews * 3, 20);

    // Time per page (max 15 points)
    score += Math.min(metrics.averageTimePerPage / 30000 * 15, 15);

    // Bounce rate penalty (max -10 points)
    score -= Math.min(metrics.bounceRate / 10, 10);

    return Math.max(0, Math.round(score));
  }

  getUserEngagementLevel() {
    const score = this.calculateEngagementScore();
    
    if (score >= 80) return 'highly_engaged';
    if (score >= 60) return 'engaged';
    if (score >= 40) return 'moderately_engaged';
    if (score >= 20) return 'low_engagement';
    return 'disengaged';
  }

  getPersonalizedRecommendations() {
    const level = this.getUserEngagementLevel();
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');

    const recommendations = [];

    switch (level) {
      case 'highly_engaged':
        recommendations.push({
          type: 'achievement',
          title: 'Power User!',
          message: 'You\'re making great use of the platform. Consider sharing your success story!',
          action: 'Share Story',
          priority: 'low'
        });
        break;

      case 'engaged':
        recommendations.push({
          type: 'optimization',
          title: 'Optimize Your Profile',
          message: 'Add more details to your business profile for better funding matches.',
          action: 'Update Profile',
          priority: 'medium'
        });
        break;

      case 'moderately_engaged':
        recommendations.push({
          type: 'guidance',
          title: 'Need Help?',
          message: 'Check out our support center for tips on maximizing your funding success.',
          action: 'Get Help',
          priority: 'medium'
        });
        break;

      case 'low_engagement':
        recommendations.push({
          type: 'activation',
          title: 'Complete Your Setup',
          message: 'Finish setting up your profile to start receiving funding matches.',
          action: 'Complete Setup',
          priority: 'high'
        });
        break;

      default:
        recommendations.push({
          type: 'onboarding',
          title: 'Welcome!',
          message: 'Let\'s get you started with finding the perfect funding opportunities.',
          action: 'Start Tour',
          priority: 'high'
        });
    }

    return recommendations;
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('engagementSessionId');
    if (!sessionId) {
      sessionId = this.generateId();
      sessionStorage.setItem('engagementSessionId', sessionId);
    }
    return sessionId;
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id || user.username || 'anonymous';
  }

  saveToStorage() {
    const data = {
      interactions: this.interactions.slice(-100), // Keep last 100 interactions
      pageViews: this.pageViews.slice(-50), // Keep last 50 page views
      sessionStart: this.sessionStart,
      lastUpdate: Date.now()
    };

    localStorage.setItem('engagementData', JSON.stringify(data));
  }

  saveMilestone(milestone, data) {
    const milestones = JSON.parse(localStorage.getItem('engagementMilestones') || '[]');
    milestones.push({
      milestone,
      timestamp: Date.now(),
      data
    });

    // Keep last 20 milestones
    localStorage.setItem('engagementMilestones', JSON.stringify(milestones.slice(-20)));
  }

  getStoredSessions() {
    const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
    return sessions;
  }

  sendAnalytics(event) {
    // In a real application, this would send data to an analytics service
    console.log('Analytics Event:', event);
  }

  // Public methods for components to use
  static getInstance() {
    if (!window.engagementService) {
      window.engagementService = new EngagementService();
    }
    return window.engagementService;
  }

  static trackAction(action, details) {
    const service = EngagementService.getInstance();
    service.trackUserAction(action, details);
  }

  static trackMilestone(milestone, data) {
    const service = EngagementService.getInstance();
    service.trackEngagementMilestone(milestone, data);
  }

  static getMetrics() {
    const service = EngagementService.getInstance();
    return service.getEngagementMetrics();
  }

  static getRecommendations() {
    const service = EngagementService.getInstance();
    return service.getPersonalizedRecommendations();
  }
}

export default EngagementService;