import React, { useState } from 'react';
import Logo from '../components/Logo';

const SupportCenter = ({ user }) => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const supportSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      content: [
        {
          question: 'How do I register my SMME?',
          answer: 'Simply enter your CIPC registration number and Director ID on the registration page. Our system automatically verifies your business with the CIPC database and creates your account instantly.'
        },
        {
          question: 'What documents do I need?',
          answer: 'You need your CIPC registration number and a registered director\'s ID number for initial registration. Additional documents like tax clearance, bank statements, and business plan can be uploaded later.'
        },
        {
          question: 'How long does verification take?',
          answer: 'CIPC verification is instant! Our system connects to the official CIPC database in real-time to verify your business registration and director details within seconds.'
        }
      ]
    },
    {
      id: 'profile-setup',
      title: 'Profile Setup',
      icon: '👤',
      content: [
        {
          question: 'How do I complete my business profile?',
          answer: 'Go to Profile → Fill in business details (industry, funding amount, location, years in operation, employee count, annual turnover, funding purpose) → Save Profile. The system automatically finds matching opportunities.'
        },
        {
          question: 'What industries are supported?',
          answer: 'We focus on ELIDZ partner industries: Manufacturing, Automotive, Agriculture, ICT & Electronics, and Renewable Energy. These sectors have the most funding opportunities available.'
        },
        {
          question: 'Can I update my profile later?',
          answer: 'Yes! You can update your profile anytime. When you save changes, the system automatically refreshes your funding matches based on the new information.'
        }
      ]
    },
    {
      id: 'finding-funding',
      title: 'Finding Funding',
      icon: '💰',
      content: [
        {
          question: 'How does the AI matching work?',
          answer: 'Our AI analyzes your business profile against funding criteria including industry (30%), funding amount (25%), location (15%), business age (10%), company size (10%), and funding purpose (10%) to find the best matches.'
        },
        {
          question: 'What do match scores mean?',
          answer: 'Match scores show compatibility: 80%+ = Excellent match, 60-79% = Good match, 40-59% = Fair match, Below 40% = Poor match. Higher scores mean better chances of approval.'
        },
        {
          question: 'How often are new opportunities added?',
          answer: 'Funding opportunities are updated regularly by our partner organizations (ELIDZ, AIDC, TIA). Check your notifications for alerts about new matches.'
        }
      ]
    },
    {
      id: 'applications',
      title: 'Applications',
      icon: '📋',
      content: [
        {
          question: 'How do I apply for funding?',
          answer: 'From Funding Opportunities → Click "Apply Now" on a match → Review pre-filled application → Edit if needed → Submit. The system auto-generates applications using your profile data.'
        },
        {
          question: 'Can I track my applications?',
          answer: 'Yes! Go to Applications to see all your submissions with statuses: Submitted, Under Review, Approved, or Rejected. You can also contact funding providers directly.'
        },
        {
          question: 'What happens after I apply?',
          answer: 'You\'ll receive notifications about status updates. Funding providers review applications based on their criteria and contact successful applicants directly.'
        }
      ]
    },
    {
      id: 'documents',
      title: 'Document Management',
      icon: '📄',
      content: [
        {
          question: 'What documents should I upload?',
          answer: 'Required: CIPC Certificate, Tax Clearance, Bank Statements (6 months), Financial Statements, Business Plan, ID Document. Optional: Proof of Address, BEE Certificate.'
        },
        {
          question: 'What file formats are accepted?',
          answer: 'We accept PDF, DOC, DOCX, JPG, and PNG files up to 10MB each. PDF is recommended for official documents.'
        },
        {
          question: 'Are my documents secure?',
          answer: 'Yes! All documents are encrypted and stored securely. Only you and relevant funding providers can access your documents during the application process.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: '🔧',
      content: [
        {
          question: 'CIPC verification failed - what do I do?',
          answer: 'Ensure your CIPC number format is correct (e.g., 2019/123456/07) and the Director ID belongs to a registered company director. Contact support if the issue persists.'
        },
        {
          question: 'I\'m not seeing any funding matches',
          answer: 'Check that your profile is complete, especially industry and location. Try adjusting your funding amount or consider related industries. New opportunities are added regularly.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page, enter your username, and follow the email instructions. You can also change your password in Settings after logging in.'
        }
      ]
    }
  ];

  const filteredSections = supportSections.map(section => ({
    ...section,
    content: section.content.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.content.length > 0);

  const quickActions = [
    { title: 'Complete Profile', description: 'Set up your business details', link: '/profile', icon: '👤' },
    { title: 'Find Funding', description: 'Discover opportunities', link: '/funding-opportunities', icon: '🔍' },
    { title: 'Upload Documents', description: 'Add required files', link: '/documents', icon: '📄' },
    { title: 'Check Applications', description: 'Track your submissions', link: '/applications', icon: '📋' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <Logo className="h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Center</h1>
        <p className="text-gray-600">Everything you need to know about using SmartFund AI</p>
      </div>

      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!searchQuery && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.link}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-4">Help Topics</h3>
            <nav className="space-y-2">
              {supportSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {searchQuery ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Search Results for "{searchQuery}"
                </h2>
                {filteredSections.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try different keywords or browse the help topics</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {filteredSections.map((section) => (
                      <div key={section.id}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <span className="mr-2">{section.icon}</span>
                          {section.title}
                        </h3>
                        <div className="space-y-4">
                          {section.content.map((item, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-4">
                              <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">{item.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {supportSections.find(s => s.id === activeSection) && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="mr-3 text-3xl">
                        {supportSections.find(s => s.id === activeSection).icon}
                      </span>
                      {supportSections.find(s => s.id === activeSection).title}
                    </h2>
                    <div className="space-y-6">
                      {supportSections.find(s => s.id === activeSection).content.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">{item.question}</h3>
                          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Still need help?</h3>
          <p className="text-blue-800 mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Contact Support
            </button>
            <button className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SupportCenter;