import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BackgroundPattern, DocumentIcon, ChartIcon } from '../components/Icons';

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setIsLoaded(true);
    loadApplications();
  }, []);

  const loadApplications = () => {
    const stored = localStorage.getItem('userApplications');
    if (stored) {
      setApplications(JSON.parse(stored));
    } else {
      // Generate sample applications with different statuses
      const sampleApps = [
        {
          id: 'APP-2024-001',
          opportunity_name: 'ELIDZ Manufacturing Excellence Grant',
          funding_company: 'East London Industrial Development Zone',
          amount_requested: 750000,
          approved_amount: 750000,
          status: 'Approved',
          status_message: '🎉 Congratulations! Your funding application has been approved.',
          submission_date: '2024-01-15',
          approval_date: '2024-01-28',
          last_updated: '2024-01-28',
          match_score: 92,
          contact_email: 'funding@elidz.co.za',
          next_steps: 'Funding agreement will be sent within 5 business days. Please prepare required documentation.',
          timeline: [
            { date: '2024-01-15', status: 'Submitted', description: 'Application submitted successfully' },
            { date: '2024-01-18', status: 'Under Review', description: 'Initial review completed, sent to funding committee' },
            { date: '2024-01-25', status: 'Committee Review', description: 'Presented to funding committee for final decision' },
            { date: '2024-01-28', status: 'Approved', description: 'Application approved! Funding agreement preparation in progress' }
          ]
        },
        {
          id: 'APP-2024-002',
          opportunity_name: 'ICT Innovation Accelerator',
          funding_company: 'Technology Innovation Agency',
          amount_requested: 500000,
          status: 'Under Review',
          status_message: 'Your application is currently being reviewed by our technical evaluation team.',
          submission_date: '2024-01-20',
          last_updated: '2024-01-25',
          match_score: 87,
          contact_email: 'funding@tia.org.za',
          timeline: [
            { date: '2024-01-20', status: 'Submitted', description: 'Application submitted successfully' },
            { date: '2024-01-22', status: 'Document Verification', description: 'All required documents verified' },
            { date: '2024-01-25', status: 'Technical Review', description: 'Technical evaluation in progress' }
          ]
        },
        {
          id: 'APP-2024-003',
          opportunity_name: 'Smart Agriculture Technology Fund',
          funding_company: 'East London Industrial Development Zone',
          amount_requested: 300000,
          status: 'Submitted',
          status_message: 'Application received and queued for initial review.',
          submission_date: '2024-01-25',
          last_updated: '2024-01-25',
          match_score: 78,
          contact_email: 'agritech@elidz.co.za',
          timeline: [
            { date: '2024-01-25', status: 'Submitted', description: 'Application submitted successfully' }
          ]
        }
      ];
      setApplications(sampleApps);
      localStorage.setItem('userApplications', JSON.stringify(sampleApps));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return isDarkMode ? 'bg-green-900/50 text-green-300 border-green-700' : 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review':
      case 'Technical Review':
      case 'Committee Review':
        return isDarkMode ? 'bg-orange-900/50 text-orange-300 border-orange-700' : 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Rejected':
        return isDarkMode ? 'bg-red-900/50 text-red-300 border-red-700' : 'bg-red-100 text-red-800 border-red-200';
      default:
        return isDarkMode ? 'bg-blue-900/50 text-blue-300 border-blue-700' : 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return '✅';
      case 'Under Review': 
      case 'Technical Review':
      case 'Committee Review': return '⏳';
      case 'Rejected': return '❌';
      case 'Document Verification': return '📋';
      default: return '📄';
    }
  };

  const approvedApplications = applications.filter(app => app.status === 'Approved');
  const totalApprovedAmount = approvedApplications.reduce((sum, app) => sum + (app.approved_amount || 0), 0);

  return (
    <BackgroundPattern isDarkMode={isDarkMode}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={`mb-12 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent'
          }`}>
            Application Status Tracker
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Track your funding applications and approval status
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Applications', value: applications.length, icon: DocumentIcon, color: 'blue' },
            { label: 'Approved', value: approvedApplications.length, icon: ChartIcon, color: 'orange' },
            { label: 'Under Review', value: applications.filter(a => a.status.includes('Review')).length, icon: DocumentIcon, color: 'blue' },
            { label: 'Total Approved Funding', value: `R${totalApprovedAmount.toLocaleString()}`, icon: ChartIcon, color: 'orange' }
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

        {/* Applications List */}
        <div className="space-y-6">
          {applications.map((app, index) => (
            <div 
              key={app.id}
              className={`backdrop-blur-sm rounded-2xl shadow-xl border p-8 transform transition-all duration-500 hover:scale-102 hover:-translate-y-1 ${
                isDarkMode 
                  ? 'bg-slate-800/90 border-slate-700/50' 
                  : 'bg-white/90 border-white/20'
              } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ animationDelay: `${400 + index * 200}ms` }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {app.opportunity_name}
                  </h3>
                  <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <strong>Provider:</strong> {app.funding_company}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <strong>Application ID:</strong> {app.id}
                  </p>
                </div>
                
                <div className={`px-4 py-2 rounded-xl border font-bold text-lg ${getStatusColor(app.status)}`}>
                  {getStatusIcon(app.status)} {app.status}
                </div>
              </div>

              {/* Status Message */}
              <div className={`p-4 rounded-xl mb-6 ${
                app.status === 'Approved' 
                  ? (isDarkMode ? 'bg-green-900/30 border border-green-700/50' : 'bg-green-50 border border-green-200')
                  : app.status.includes('Review')
                  ? (isDarkMode ? 'bg-orange-900/30 border border-orange-700/50' : 'bg-orange-50 border border-orange-200')
                  : (isDarkMode ? 'bg-blue-900/30 border border-blue-700/50' : 'bg-blue-50 border border-blue-200')
              }`}>
                <p className={`font-medium ${
                  app.status === 'Approved' 
                    ? (isDarkMode ? 'text-green-300' : 'text-green-800')
                    : app.status.includes('Review')
                    ? (isDarkMode ? 'text-orange-300' : 'text-orange-800')
                    : (isDarkMode ? 'text-blue-300' : 'text-blue-800')
                }`}>
                  {app.status_message}
                </p>
                {app.next_steps && (
                  <p className={`mt-2 text-sm ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                    <strong>Next Steps:</strong> {app.next_steps}
                  </p>
                )}
              </div>

              {/* Application Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount Requested</p>
                  <p className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    R{app.amount_requested?.toLocaleString()}
                  </p>
                  {app.approved_amount && (
                    <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      ✓ Approved: R{app.approved_amount.toLocaleString()}
                    </p>
                  )}
                </div>
                
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Match Score</p>
                  <p className={`font-bold text-xl ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    {app.match_score}%
                  </p>
                </div>
                
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Submitted</p>
                  <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {app.submission_date}
                  </p>
                  {app.approval_date && (
                    <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      Approved: {app.approval_date}
                    </p>
                  )}
                </div>
              </div>

              {/* Timeline */}
              {app.timeline && (
                <div className="mb-6">
                  <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Application Timeline
                  </h4>
                  <div className="space-y-3">
                    {app.timeline.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getStatusColor(event.status)}`}>
                          {getStatusIcon(event.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {event.status}
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {event.description}
                              </p>
                            </div>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {event.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Last updated: {app.last_updated}
                </div>
                
                <div className="flex space-x-3">
                  {app.status === 'Approved' ? (
                    <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-xl font-medium hover:from-green-700 hover:to-green-800 transform transition-all duration-200 hover:scale-105">
                      📄 Download Agreement
                    </button>
                  ) : (
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform transition-all duration-200 hover:scale-105">
                      📧 Contact Provider
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default ApplicationStatus;