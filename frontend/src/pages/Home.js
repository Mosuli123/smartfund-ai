import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { BuildingIcon, TargetIcon, DocumentIcon, SupportIcon, RocketIcon, SecurityIcon, IndustryIcon } from '../components/Icons';
import AISMMEDashboard from '../components/AISMMEDashboard';
import GamificationWidget from '../components/GamificationWidget';
import EngagementService from '../services/engagementService';

const Home = ({ user }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Track page view
    EngagementService.getInstance().trackPageView('/', 'Home Dashboard');
    
    // Track milestone if first visit
    const hasVisitedHome = localStorage.getItem('hasVisitedHome');
    if (!hasVisitedHome) {
      EngagementService.trackMilestone('first_home_visit', { timestamp: Date.now() });
      localStorage.setItem('hasVisitedHome', 'true');
    }
  }, []);

  const quickActions = [
    {
      id: 'profile',
      icon: BuildingIcon,
      title: 'Business Profile',
      description: 'Create and manage your business profile',
      path: '/profile',
      color: 'from-orange-500 to-orange-600',
      stats: 'Complete your profile'
    },
    {
      id: 'matching',
      icon: TargetIcon,
      title: 'Smart Matching',
      description: 'AI-powered funding opportunity matching',
      path: '/funding-opportunities',
      color: 'from-blue-500 to-blue-600',
      stats: '15+ opportunities available'
    },
    {
      id: 'applications',
      icon: DocumentIcon,
      title: 'Applications',
      description: 'Manage your funding applications',
      path: '/applications',
      color: 'from-orange-500 to-blue-500',
      stats: 'Draft • Preview • Submit'
    },
    {
      id: 'support',
      icon: SupportIcon,
      title: 'Support Center',
      description: 'Get help and guidance',
      path: '/support',
      color: 'from-blue-500 to-orange-500',
      stats: '24/7 assistance'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Create Profile',
      description: 'Complete your business profile with CIPC verification',
      icon: BuildingIcon,
      color: 'blue'
    },
    {
      step: '2',
      title: 'AI Matching',
      description: 'Get matched with relevant funding opportunities',
      icon: TargetIcon,
      color: 'orange'
    },
    {
      step: '3',
      title: 'Apply & Submit',
      description: 'Review, edit and submit your applications',
      icon: RocketIcon,
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #fef7f0 0%, #f0f4f8 100%)'}}>
      {/* Modern Welcome Section */}
      <div className="modern-nav">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="heading-1" style={{color: '#1e3a5f'}}>Welcome to SmartFund AI</h1>
            <p className="text-lg" style={{color: '#64748b'}}>Your intelligent SMME funding platform</p>
            <div className="mt-4 p-4 rounded-xl" style={{background: 'rgba(231, 126, 34, 0.1)', border: '1px solid rgba(231, 126, 34, 0.2)'}}>
              <p className="font-medium" style={{color: '#b8470f'}}>
                Hello, {user?.companyData?.companyName || user?.username || 'User'}
              </p>
            </div>
          </div>
        </div>
      </div>






      {/* Engagement and AI Dashboard */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <AISMMEDashboard user={user} />
            </div>
            <div>
              <GamificationWidget user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Modern Quick Actions */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-2" style={{color: '#1e3a5f'}}>Quick Actions</h2>
            <p className="text-lg" style={{color: '#64748b'}}>Access key features of your SMME dashboard</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={action.id}
                to={action.path}
                className={`modern-card p-6 group ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => EngagementService.trackAction('quick_action_click', { action: action.id, title: action.title })}
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300" style={{background: 'linear-gradient(135deg, #fdeee0 0%, #fbdcc1 100%)', transform: 'group-hover:scale(1.1)'}}>
                    <action.icon className="w-8 h-8" style={{color: '#e67e22'}} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{color: '#1e3a5f'}}>
                    {action.title}
                  </h3>
                  <p className="text-sm mb-4" style={{color: '#64748b'}}>
                    {action.description}
                  </p>
                  <div className="px-3 py-1 rounded-full text-xs font-medium" style={{background: 'rgba(65, 128, 190, 0.1)', color: '#2d4a6b'}}>
                    {action.stats}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Modern Process Steps */}
          <div className="modern-card p-8 mt-16">
            <div className="text-center mb-12">
              <h2 className="heading-2" style={{color: '#1e3a5f'}}>
                How SmartFund AI Works
              </h2>
              <p className="text-lg" style={{color: '#64748b'}}>
                Simple, secure, and intelligent funding process
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{
                    background: step.color === 'blue' 
                      ? 'linear-gradient(135deg, #d9e6f2 0%, #b3cce5 100%)' 
                      : 'linear-gradient(135deg, #fdeee0 0%, #fbdcc1 100%)'
                  }}>
                    <step.icon className="w-8 h-8" style={{
                      color: step.color === 'blue' ? '#4180be' : '#e67e22'
                    }} />
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm mb-4" style={{
                    background: step.color === 'blue' 
                      ? 'linear-gradient(135deg, #4180be 0%, #2d4a6b 100%)' 
                      : 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)'
                  }}>
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{color: '#1e3a5f'}}>
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{color: '#64748b'}}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;