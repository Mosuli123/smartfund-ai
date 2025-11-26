import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { DocumentIcon, ChartIcon, SettingsIcon, BackgroundPattern } from '../components/Icons';

const ManageOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    loadOpportunities();
  }, []);

  const loadOpportunities = () => {
    // Load custom opportunities from localStorage
    const customOpportunities = JSON.parse(localStorage.getItem('customOpportunities') || '[]');
    
    // Default opportunities
    const defaultOpportunities = [
      {
        id: 'default-1',
        title: 'Small Business Innovation Grant',
        description: 'Supporting innovative small businesses in technology and healthcare sectors',
        amount: 'R50,000 - R500,000',
        deadline: '2024-03-31',
        sectors: ['Technology', 'Healthcare', 'Manufacturing'],
        status: 'Active',
        applications: 12,
        type: 'Default'
      },
      {
        id: 'default-2',
        title: 'Women Entrepreneur Fund',
        description: 'Empowering women-led businesses across various industries',
        amount: 'R25,000 - R250,000',
        deadline: '2024-04-15',
        sectors: ['Retail', 'Services', 'Agriculture'],
        status: 'Active',
        applications: 8,
        type: 'Default'
      },
      {
        id: 'default-3',
        title: 'Tech Startup Accelerator',
        description: 'Fast-track funding for technology startups and fintech companies',
        amount: 'R100,000 - R1,000,000',
        deadline: '2024-05-30',
        sectors: ['Technology', 'Fintech'],
        status: 'Active',
        applications: 15,
        type: 'Default'
      },
      {
        id: 'default-4',
        title: 'Agricultural Development Fund',
        description: 'Supporting sustainable agriculture and food processing initiatives',
        amount: 'R75,000 - R750,000',
        deadline: '2024-06-15',
        sectors: ['Agriculture', 'Food Processing'],
        status: 'Active',
        applications: 6,
        type: 'Default'
      },
      {
        id: 'default-5',
        title: 'Youth Enterprise Scheme',
        description: 'Funding opportunities for young entrepreneurs under 35',
        amount: 'R10,000 - R100,000',
        deadline: '2024-07-31',
        sectors: ['Any'],
        status: 'Active',
        applications: 22,
        type: 'Default'
      },
      {
        id: 'default-6',
        title: 'Green Energy Initiative',
        description: 'Supporting renewable energy and sustainable technology projects',
        amount: 'R200,000 - R2,000,000',
        deadline: '2024-08-30',
        sectors: ['Energy', 'Technology'],
        status: 'Active',
        applications: 4,
        type: 'Default'
      }
    ];

    setOpportunities([...defaultOpportunities, ...customOpportunities]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return isDarkMode ? 'bg-blue-900/50 text-blue-300 border-blue-700' : 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Draft':
        return isDarkMode ? 'bg-orange-900/50 text-orange-300 border-orange-700' : 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Closed':
        return isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return isDarkMode ? 'bg-blue-900/50 text-blue-300 border-blue-700' : 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTotalApplications = () => {
    return opportunities.reduce((total, opp) => total + (opp.applications || 0), 0);
  };

  return (
    <BackgroundPattern isDarkMode={isDarkMode}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={`mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent'
          }`}>
            Manage Funding Opportunities
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Overview and management of all funding opportunities
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Opportunities', value: opportunities.length, icon: DocumentIcon, color: 'blue' },
            { label: 'Active Opportunities', value: opportunities.filter(o => o.status === 'Active').length, icon: ChartIcon, color: 'orange' },
            { label: 'Total Applications', value: getTotalApplications(), icon: SettingsIcon, color: 'blue' },
            { label: 'Custom Created', value: opportunities.filter(o => o.type !== 'Default').length, icon: DocumentIcon, color: 'orange' }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`backdrop-blur-sm p-6 rounded-2xl shadow-lg border transform transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800/90 border-slate-700/50' 
                  : 'bg-white/90 border-white/20'
              } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold ${
                    stat.color === 'blue' 
                      ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                      : (isDarkMode ? 'text-orange-400' : 'text-orange-600')
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${
                  stat.color === 'blue' 
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                    : (isDarkMode ? 'text-orange-400' : 'text-orange-600')
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={`mb-8 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '400ms' }}>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/create-opportunity"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Create New Opportunity
            </Link>
            <button className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-700 hover:to-orange-800 transform transition-all duration-200 hover:scale-105 shadow-lg">
              Export Report
            </button>
          </div>
        </div>

        {/* Opportunities List */}
        <div className={`backdrop-blur-sm rounded-2xl shadow-xl border ${
          isDarkMode 
            ? 'bg-slate-800/90 border-slate-700/50' 
            : 'bg-white/90 border-white/20'
        } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <div className="p-6">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              All Funding Opportunities
            </h2>
            
            <div className="space-y-4">
              {opportunities.map((opportunity, index) => (
                <div 
                  key={opportunity.id}
                  className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700/70' 
                      : 'bg-gray-50 border-gray-200 hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {opportunity.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(opportunity.status)}`}>
                          {opportunity.status}
                        </span>
                        {opportunity.type === 'Default' && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                          }`}>
                            System Default
                          </span>
                        )}
                      </div>
                      <p className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {opportunity.description}
                      </p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            Funding Amount:
                          </span>
                          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {opportunity.amount}
                          </p>
                        </div>
                        <div>
                          <span className={`font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                            Deadline:
                          </span>
                          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {opportunity.deadline}
                          </p>
                        </div>
                        <div>
                          <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            Applications:
                          </span>
                          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {opportunity.applications || 0} received
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className={`font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                          Target Sectors:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {opportunity.sectors?.map((sector, idx) => (
                            <span 
                              key={idx}
                              className={`px-2 py-1 rounded-full text-xs ${
                                isDarkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button 
                        onClick={() => navigate(`/admin/edit-opportunity/${opportunity.id}`)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => navigate(`/admin/review-applications?opportunityId=${opportunity.id}`)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-orange-700 hover:bg-orange-600 text-white' 
                            : 'bg-orange-600 hover:bg-orange-700 text-white'
                        }`}
                      >
                        View Applications ({opportunity.applications || 0})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default ManageOpportunities;