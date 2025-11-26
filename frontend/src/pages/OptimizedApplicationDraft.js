import React, { useState, useEffect } from 'react';

const OptimizedApplicationDraft = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [step, setStep] = useState(1); // 1: Draft, 2: Preview, 3: Sign, 4: Submit
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signature, setSignature] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setProfile(profileData);
      generateInitialDraft(profileData);
    } else {
      setError('Please complete your business profile first.');
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

  const handlePreview = () => {
    setStep(2);
  };

  const handleSign = () => {
    if (!signature.trim()) {
      setError('Please provide your digital signature');
      return;
    }
    setError('');
    setStep(4);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const application = {
        id: Date.now(),
        businessName: profile.business_name,
        applicantName: signature,
        submissionDate: new Date().toISOString(),
        status: 'Submitted',
        data: applicationData,
        profile: profile
      };
      
      const applications = JSON.parse(localStorage.getItem('submittedApplications') || '[]');
      applications.push(application);
      localStorage.setItem('submittedApplications', JSON.stringify(applications));
      
      setIsSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  const renderDraftForm = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Executive Summary *</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={applicationData.executiveSummary}
            onChange={(e) => handleInputChange('executiveSummary', e.target.value)}
            placeholder="Brief overview of your business and funding needs..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Description *</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={applicationData.businessDescription}
            onChange={(e) => handleInputChange('businessDescription', e.target.value)}
            placeholder="Detailed description of your business..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Financial Information *</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={applicationData.financialInfo}
            onChange={(e) => handleInputChange('financialInfo', e.target.value)}
            placeholder="Current financial status and projections..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Use of Funds *</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={applicationData.useOfFunds}
            onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
            placeholder="How you will use the funding..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Market Analysis *</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={applicationData.marketAnalysis}
            onChange={(e) => handleInputChange('marketAnalysis', e.target.value)}
            placeholder="Market analysis and opportunities..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Management Team *</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={applicationData.managementTeam}
            onChange={(e) => handleInputChange('managementTeam', e.target.value)}
            placeholder="Key team members and their experience..."
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Growth Strategy *</label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={applicationData.growthStrategy}
          onChange={(e) => handleInputChange('growthStrategy', e.target.value)}
          placeholder="Your growth and expansion plans..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Conclusion *</label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={applicationData.conclusion}
          onChange={(e) => handleInputChange('conclusion', e.target.value)}
          placeholder="Summary and closing statement..."
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handlePreview}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Preview Application →
        </button>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">FUNDING APPLICATION</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
          <div><strong>Business Name:</strong> {profile.business_name}</div>
          <div><strong>Industry:</strong> {profile.industry}</div>
          <div><strong>Funding Required:</strong> R{profile.funding_amount?.toLocaleString()}</div>
          <div><strong>Location:</strong> {profile.location}</div>
        </div>
        
        {Object.entries({
          'Executive Summary': applicationData.executiveSummary,
          'Business Description': applicationData.businessDescription,
          'Financial Information': applicationData.financialInfo,
          'Use of Funds': applicationData.useOfFunds,
          'Market Analysis': applicationData.marketAnalysis,
          'Management Team': applicationData.managementTeam,
          'Growth Strategy': applicationData.growthStrategy,
          'Conclusion': applicationData.conclusion
        }).map(([title, content]) => (
          <div key={title} className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-700 text-sm">{content}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          ← Edit Application
        </button>
        <button
          onClick={() => setStep(3)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Sign Application →
        </button>
      </div>
    </div>
  );

  const renderSignature = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-900 mb-2">📝 Digital Signature Required</h3>
        <p className="text-yellow-800 text-sm">
          By signing this application, you confirm that all information provided is accurate and complete.
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name (Digital Signature) *
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Type your full name as digital signature"
        />
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Declaration:</h4>
        <p className="text-blue-800 text-sm">
          I hereby declare that the information provided in this application is true and accurate to the best of my knowledge. 
          I understand that any false information may result in the rejection of this application.
        </p>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          ← Back to Preview
        </button>
        <button
          onClick={handleSign}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Sign & Submit →
        </button>
      </div>
    </div>
  );

  const renderSubmit = () => (
    <div className="text-center space-y-6">
      {!isSubmitted ? (
        <>
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-900">Ready to Submit</h2>
          <p className="text-gray-600">Your application is complete and ready for submission.</p>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Application Summary:</h3>
            <div className="text-green-800 text-sm space-y-1">
              <p><strong>Business:</strong> {profile.business_name}</p>
              <p><strong>Funding Amount:</strong> R{profile.funding_amount?.toLocaleString()}</p>
              <p><strong>Signed by:</strong> {signature}</p>
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold"
          >
            {loading ? 'Submitting...' : '🚀 SUBMIT APPLICATION'}
          </button>
        </>
      ) : (
        <>
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-900">Application Successfully Submitted!</h2>
          <p className="text-green-700">Your funding application has been submitted and is now under review.</p>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-3">What happens next?</h3>
            <div className="text-green-800 text-sm space-y-2">
              <p>• Your application will be reviewed by funding administrators</p>
              <p>• You will receive updates via email and notifications</p>
              <p>• Review process typically takes 5-10 business days</p>
              <p>• You can track progress in your Applications dashboard</p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-blue-600 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-blue-600 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            {step === 1 ? '📝 Application Draft' : 
             step === 2 ? '👀 Preview Application' :
             step === 3 ? '✍️ Sign Application' : '🚀 Submit Application'}
          </h1>
          
          {profile && (
            <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-white mb-2">Application for: {profile.business_name}</h3>
              <p className="text-orange-100 text-sm">
                Industry: {profile.industry} | Funding: R{profile.funding_amount?.toLocaleString()}
              </p>
            </div>
          )}
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= stepNum ? 'bg-white text-orange-600' : 'bg-white bg-opacity-30 text-white'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && <div className={`w-12 h-1 ${
                  step > stepNum ? 'bg-white' : 'bg-white bg-opacity-30'
                }`}></div>}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          {step === 1 && renderDraftForm()}
          {step === 2 && renderPreview()}
          {step === 3 && renderSignature()}
          {step === 4 && renderSubmit()}
        </div>
      </div>
    </div>
  );
};

export default OptimizedApplicationDraft;