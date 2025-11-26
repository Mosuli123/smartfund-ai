import React, { useState, useEffect } from 'react';

const ApplicationDraft = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [draftContent, setDraftContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    const draft = `FUNDING APPLICATION DRAFT

Business Name: ${profileData.business_name}
Industry: ${profileData.industry}
Funding Required: R${profileData.funding_amount?.toLocaleString()}
Location: ${profileData.location}
Years in Operation: ${profileData.years_in_operation}

EXECUTIVE SUMMARY
[Provide a brief overview of your business and why you need funding. Highlight your unique value proposition and growth potential.]

BUSINESS DESCRIPTION
[Describe your business in detail, including:
- What products/services you offer
- Your target market
- Your competitive advantages
- Current business status and achievements]

FINANCIAL INFORMATION
[Include:
- Current revenue and profit margins
- Financial projections for the next 2-3 years
- How the funding will impact your financial performance
- Any existing debts or financial obligations]

USE OF FUNDS
[Explain specifically how you will use the funding:
- Equipment purchases
- Working capital
- Marketing and expansion
- Staff hiring
- Other operational needs]

MARKET ANALYSIS
[Describe:
- Your target market size and growth potential
- Customer demographics and needs
- Competitive landscape
- Your market positioning strategy]

MANAGEMENT TEAM
[Highlight:
- Key team members and their experience
- Relevant skills and qualifications
- Advisory board or mentors
- Organizational structure]

GROWTH STRATEGY
[Outline:
- Short-term and long-term goals
- Expansion plans
- Marketing and sales strategy
- Risk mitigation plans]

CONCLUSION
[Summarize why your business is a good investment opportunity and how the funding will help achieve your goals.]`;

    setDraftContent(draft);
  };

  const generateTextDraft = () => {
    if (!profile) {
      setError('Please complete your business profile first.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      // Create download link for text file
      const blob = new Blob([draftContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${profile.business_name}_funding_application.txt`;
      downloadLink.click();
      window.URL.revokeObjectURL(url);
      setLoading(false);
    }, 1000);
  };

  const generatePDFDraft = async () => {
    if (!profile) {
      setError('Please complete your business profile first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8003/api/generate-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        const data = await response.json();
        
        // Convert base64 to blob and download
        const byteCharacters = atob(data.pdf_data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = data.filename;
        downloadLink.click();
        window.URL.revokeObjectURL(url);
      } else {
        setError('Failed to generate PDF. Please try again.');
      }
    } catch (error) {
      setError('Error connecting to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const markAsReady = () => {
    setIsReady(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Draft</h1>
        
        {profile ? (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Application for: {profile.business_name}</h3>
            <p className="text-blue-800 text-sm">
              Industry: {profile.industry} | Funding: R{profile.funding_amount?.toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <p className="text-yellow-800">
              Complete your business profile to generate an application draft.
            </p>
          </div>
        )}

        <div className="flex space-x-4 mb-6">
          <button
            onClick={generatePDFDraft}
            disabled={loading || !profile}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : '📄 Download PDF Agreement'}
          </button>
          
          <button
            onClick={generateTextDraft}
            disabled={loading || !profile}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : '📝 Generate Text Draft'}
          </button>
          
          <button
            onClick={markAsReady}
            disabled={!draftContent || isReady}
            className={`px-6 py-2 rounded-lg ${
              isReady 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isReady ? '✅ Marked as Ready' : '🚀 Mark as Ready'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          🎉 Application marked as ready! You can now submit it to funding providers.
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Your Application Draft</h2>
          <p className="text-gray-600 text-sm mt-1">
            Customize the generated draft to match your specific needs and requirements.
          </p>
        </div>
        
        <div className="p-6">
          <textarea
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Your application draft will appear here..."
          />
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Characters: {draftContent.length} | Words: {draftContent.split(' ').length}
            </div>
            
            <div className="space-x-3">
              <button
                onClick={() => setDraftContent('')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={() => loadProfile()}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">💡 Tips for a Strong Application:</h3>
        <ul className="text-blue-800 text-sm space-y-2">
          <li>• Be specific about how you'll use the funding</li>
          <li>• Include realistic financial projections</li>
          <li>• Highlight your unique competitive advantages</li>
          <li>• Show clear market demand for your product/service</li>
          <li>• Demonstrate your team's capability to execute the plan</li>
          <li>• Include supporting documents when submitting</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default ApplicationDraft;