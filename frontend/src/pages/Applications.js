import React, { useState, useEffect } from 'react';

const Applications = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewApplication, setShowNewApplication] = useState(false);
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState(null);
  const [applicationData, setApplicationData] = useState({
    executiveSummary: '',
    businessDescription: '',
    financialInfo: '',
    useOfFunds: '',
    marketAnalysis: '',
    managementTeam: '',
    growthStrategy: '',
    conclusion: ''
  });
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadApplications();
    loadProfile();
  }, []);

  const loadProfile = () => {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setProfile(profileData);
      generateInitialDraft(profileData);
    }
  };

  const generateInitialDraft = (profileData) => {
    setApplicationData({
      executiveSummary: `${profileData.business_name} is seeking R${profileData.funding_amount?.toLocaleString()} in funding to expand our ${profileData.industry} business operations in ${profileData.location}.`,
      businessDescription: `We are a ${profileData.business_type} operating in the ${profileData.industry} sector for ${profileData.years_in_operation} years with ${profileData.employee_count} employees.`,
      financialInfo: `Current annual turnover: R${profileData.annual_turnover?.toLocaleString()}. We are seeking R${profileData.funding_amount?.toLocaleString()} for ${profileData.funding_purpose}.`,
      useOfFunds: `The requested funding of R${profileData.funding_amount?.toLocaleString()} will be used primarily for ${profileData.funding_purpose}.`,
      marketAnalysis: `Our target market in the ${profileData.industry} sector shows strong growth potential in ${profileData.location}.`,
      managementTeam: `Our experienced management team has been successfully operating in the ${profileData.industry} sector.`,
      growthStrategy: `With this funding, we plan to expand our operations and increase our market share in the ${profileData.industry} sector.`,
      conclusion: `This funding opportunity will enable ${profileData.business_name} to achieve significant growth and contribute to the economic development of ${profileData.location}.`
    });
  };

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const application = {
        id: `APP-${Date.now()}`,
        opportunity_name: 'New Application',
        funding_company: 'ELIDZ Funding',
        amount_requested: profile.funding_amount,
        status: 'Submitted',
        submission_date: new Date().toISOString().split('T')[0],
        last_updated: new Date().toISOString().split('T')[0],
        match_score: 85,
        contact_email: 'funding@elidz.co.za',
        data: applicationData,
        signature: signature
      };
      
      const updatedApps = [...applications, application];
      setApplications(updatedApps);
      localStorage.setItem('userApplications', JSON.stringify(updatedApps));
      
      setShowNewApplication(false);
      setStep(1);
      setSignature('');
      setLoading(false);
    }, 2000);
  };

  const loadApplications = () => {
    const stored = localStorage.getItem('userApplications');
    if (stored) {
      setApplications(JSON.parse(stored));
    } else {
      const mockApps = generateMockApplications();
      setApplications(mockApps);
      localStorage.setItem('userApplications', JSON.stringify(mockApps));
    }
    setLoading(false);
  };

  const generateMockApplications = () => {
    const profile = JSON.parse(localStorage.getItem('businessProfile') || '{}');
    const matches = JSON.parse(localStorage.getItem('matchedOpportunities') || '[]');
    
    const statuses = ['Approved', 'Under Review', 'Submitted', 'Rejected'];
    const statusMessages = {
      'Approved': 'Congratulations! Your funding has been approved. Next steps will be communicated via email.',
      'Under Review': 'Your application is currently being reviewed by our funding committee.',
      'Submitted': 'Application successfully submitted and received.',
      'Rejected': 'Unfortunately, your application was not successful. Please review feedback and consider reapplying.'
    };
    
    return matches.slice(0, 4).map((match, index) => ({
      id: `APP-${Date.now()}-${index}`,
      opportunity_name: match.name,
      funding_company: match.funding_company,
      amount_requested: profile.funding_amount || 500000,
      status: statuses[index] || 'Submitted',
      status_message: statusMessages[statuses[index]] || statusMessages['Submitted'],
      submission_date: new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      last_updated: new Date(Date.now() - (index * 2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      match_score: match.match_score,
      contact_email: match.contact_email,
      approved_amount: statuses[index] === 'Approved' ? (profile.funding_amount || 500000) : null,
      next_steps: statuses[index] === 'Approved' ? 'Funding agreement will be sent within 5 business days.' : null
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return '✅';
      case 'Under Review': return '⏳';
      case 'Rejected': return '❌';
      default: return '📄';
    }
  };

  const renderApplicationForm = () => {
    if (step === 1) {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Complete Your Application</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Executive Summary *</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={applicationData.executiveSummary}
                onChange={(e) => handleInputChange('executiveSummary', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Description *</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={applicationData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Financial Information *</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={applicationData.financialInfo}
                onChange={(e) => handleInputChange('financialInfo', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Use of Funds *</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={applicationData.useOfFunds}
                onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowNewApplication(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Preview →
            </button>
          </div>
        </div>
      );
    }
    
    if (step === 2) {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">👀 Preview Application</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">{profile?.business_name} - Funding Application</h4>
            {Object.entries({
              'Executive Summary': applicationData.executiveSummary,
              'Business Description': applicationData.businessDescription,
              'Financial Information': applicationData.financialInfo,
              'Use of Funds': applicationData.useOfFunds
            }).map(([title, content]) => (
              <div key={title} className="mb-4">
                <h5 className="font-medium text-gray-900">{title}</h5>
                <p className="text-gray-700 text-sm mt-1">{content}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              ← Edit
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign →
            </button>
          </div>
        </div>
      );
    }
    
    if (step === 3) {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">✍️ Digital Signature</h3>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800 text-sm">
              By signing, you confirm all information is accurate and complete.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name (Digital Signature) *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Type your full name"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!signature.trim() || loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : '🚀 Submit Application'}
            </button>
          </div>
        </div>
      );
    }
  };

  if (loading && applications.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-white">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p>Loading your applications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex justify-between items-center">
            <p className="text-white">Track and manage your funding applications</p>
            <button
              onClick={() => setShowNewApplication(true)}
              className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-gray-100 font-medium"
            >
              + New Application
            </button>
          </div>
        </div>

        {showNewApplication && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {renderApplicationForm()}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-4">Create your first funding application to get started.</p>
            <button
              onClick={() => setShowNewApplication(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            >
              Create Application
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {app.opportunity_name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Funding Provider:</strong> {app.funding_company}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Application ID:</strong> {app.id}
                    </p>
                  </div>
                  
                  <div className={`px-3 py-2 rounded-lg border font-medium ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)} {app.status}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Amount Requested</p>
                    <p className="font-semibold text-lg">R{app.amount_requested?.toLocaleString()}</p>
                    {app.approved_amount && (
                      <p className="text-sm text-green-600 font-medium">✓ Approved: R{app.approved_amount.toLocaleString()}</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Match Score</p>
                    <p className="font-semibold text-lg text-green-600">{app.match_score}%</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Submitted</p>
                    <p className="font-semibold">{app.submission_date}</p>
                  </div>
                </div>

                {/* Status Message */}
                <div className={`p-4 rounded-lg mb-4 ${
                  app.status === 'Approved' ? 'bg-green-50 border border-green-200' :
                  app.status === 'Under Review' ? 'bg-orange-50 border border-orange-200' :
                  app.status === 'Rejected' ? 'bg-red-50 border border-red-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    app.status === 'Approved' ? 'text-green-800' :
                    app.status === 'Under Review' ? 'text-orange-800' :
                    app.status === 'Rejected' ? 'text-red-800' :
                    'text-blue-800'
                  }`}>
                    {app.status_message}
                  </p>
                  {app.next_steps && (
                    <p className="text-sm text-green-700 mt-2">
                      <strong>Next Steps:</strong> {app.next_steps}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Last updated: {app.last_updated}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                      View Details
                    </button>
                    {app.status === 'Approved' ? (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        📄 Download Agreement
                      </button>
                    ) : app.status === 'Rejected' ? (
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                        🔄 Reapply
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        📧 Contact Provider
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-white bg-opacity-20 p-4 rounded-lg">
          <h3 className="font-semibold text-white mb-2">Application Status Guide:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-100">
            <div>
              <p><span className="font-medium">📄 Submitted:</span> Application received and being processed</p>
              <p><span className="font-medium">⏳ Under Review:</span> Application is being evaluated by funding team</p>
            </div>
            <div>
              <p><span className="font-medium">✅ Approved:</span> Congratulations! Funding has been approved</p>
              <p><span className="font-medium">❌ Rejected:</span> Application was not successful this time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;