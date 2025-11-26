import React, { useState, useEffect } from 'react';

const ApplicationReview = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [applicationData, setApplicationData] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [signature, setSignature] = useState('');
  const [signatureDate, setSignatureDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
    loadSelectedOpportunity();
  }, []);

  const loadProfile = () => {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  };

  const loadSelectedOpportunity = () => {
    const opportunity = localStorage.getItem('selectedOpportunity');
    if (opportunity) {
      setSelectedOpportunity(JSON.parse(opportunity));
      generateApplication(JSON.parse(opportunity));
    }
  };

  const generateApplication = (opportunity) => {
    const savedProfile = localStorage.getItem('businessProfile');
    if (!savedProfile) return;
    
    const profileData = JSON.parse(savedProfile);
    
    const application = `
FUNDING APPLICATION

Application Date: ${new Date().toLocaleDateString()}
Funding Opportunity: ${opportunity.name}
Application Reference: APP-${Date.now()}

APPLICANT INFORMATION
Business Name: ${profileData.business_name}
CIPC Registration Number: ${profileData.cipc_registration_number}
Business Type: ${profileData.business_type}
Industry: ${profileData.industry}
Location: ${profileData.location}
Years in Operation: ${profileData.years_in_operation}
Number of Employees: ${profileData.employee_count}
Annual Turnover: R${parseInt(profileData.annual_turnover).toLocaleString()}

FUNDING REQUEST
Amount Requested: R${parseInt(profileData.funding_amount).toLocaleString()}
Primary Purpose: ${profileData.funding_purpose}
Funding Type: ${opportunity.type}

BUSINESS OVERVIEW
${profileData.business_name} is a ${profileData.business_type.toLowerCase()} operating in the ${profileData.industry.toLowerCase()} sector for ${profileData.years_in_operation} years. We are seeking ${opportunity.type.toLowerCase()} funding of R${parseInt(profileData.funding_amount).toLocaleString()} primarily for ${profileData.funding_purpose.toLowerCase()}.

Our business currently employs ${profileData.employee_count} people and generates an annual turnover of R${parseInt(profileData.annual_turnover).toLocaleString()}. We are registered with CIPC under registration number ${profileData.cipc_registration_number}.

FUNDING JUSTIFICATION
This funding will enable us to:
- Expand our operations and market reach
- Improve our competitive position in the ${profileData.industry.toLowerCase()} sector
- Create additional employment opportunities
- Contribute to economic growth in ${profileData.location}

COMPLIANCE DECLARATION
We hereby declare that:
✓ All information provided is true and accurate
✓ We are registered with CIPC and in good standing
✓ We qualify as a Small, Medium & Micro Enterprise (SMME)
✓ We will use the funding for the stated purposes only
✓ We will comply with all funding terms and conditions

SUPPORTING DOCUMENTS (To be attached)
□ CIPC Certificate of Incorporation
□ Latest Financial Statements
□ Bank Statements (3 months)
□ Business Plan
□ Tax Clearance Certificate
□ BEE Certificate (if applicable)
□ Municipal Rates Certificate
□ Proof of Address

This application is submitted in accordance with the terms and conditions of the ${opportunity.name}.
    `;
    
    setApplicationData(application);
  };

  const handleReview = () => {
    setIsReviewing(true);
  };

  const handleSign = () => {
    if (!signature.trim()) {
      alert('Please enter your full name as digital signature');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setIsSigned(true);
      setSignatureDate(new Date().toLocaleString());
      setLoading(false);
      
      // Save signed application
      const signedApplication = {
        ...applicationData,
        signature,
        signatureDate: new Date().toLocaleString(),
        status: 'Signed and Ready for Submission'
      };
      
      localStorage.setItem('signedApplication', JSON.stringify(signedApplication));
    }, 1500);
  };

  const downloadApplication = () => {
    const finalApplication = applicationData + `\n\nDIGITAL SIGNATURE\nSigned by: ${signature}\nDate: ${signatureDate}\nStatus: Digitally Signed and Ready for Submission`;
    
    const blob = new Blob([finalApplication], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${profile?.business_name}_Application_${Date.now()}.txt`;
    downloadLink.click();
    window.URL.revokeObjectURL(url);
  };

  if (!profile || !selectedOpportunity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
        <div className="max-w-4xl mx-auto px-4">
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Setup Required</h2>
          <p className="text-yellow-700">
            Please complete your business profile and select a funding opportunity first.
          </p>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Review & Signature</h1>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Application Summary</h3>
          <p className="text-blue-800 text-sm">
            <strong>{selectedOpportunity.name}</strong> | {selectedOpportunity.type} | 
            R{parseInt(profile.funding_amount).toLocaleString()} | {profile.business_name}
          </p>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleReview}
            disabled={isReviewing}
            className={`px-6 py-2 rounded-lg ${
              isReviewing 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isReviewing ? '✓ Reviewed' : '👁️ Review Application'}
          </button>
          
          {isReviewing && !isSigned && (
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Enter your full name to sign"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSign}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Signing...' : '✍️ Sign Application'}
              </button>
            </div>
          )}
          
          {isSigned && (
            <button
              onClick={downloadApplication}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              📥 Download Signed Application
            </button>
          )}
        </div>

        {isSigned && (
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-green-900 mb-2">✅ Application Signed Successfully</h3>
            <p className="text-green-800 text-sm">
              Signed by: <strong>{signature}</strong> on {signatureDate}
            </p>
            <p className="text-green-700 text-sm mt-1">
              Your application is now ready for submission to the funding provider.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Application Preview</h2>
          <p className="text-gray-600 text-sm mt-1">
            Review all details carefully before signing. You can edit your profile to make changes.
          </p>
        </div>
        
        <div className="p-6">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
            {applicationData}
          </pre>
          
          {isSigned && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">DIGITAL SIGNATURE</h4>
              <p className="text-green-800 text-sm">
                Signed by: <strong>{signature}</strong><br/>
                Date: {signatureDate}<br/>
                Status: <span className="font-semibold">Digitally Signed and Ready for Submission</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-amber-50 p-6 rounded-lg">
        <h3 className="font-semibold text-amber-900 mb-3">📋 Next Steps After Signing:</h3>
        <ul className="text-amber-800 text-sm space-y-2">
          <li>• Download your signed application</li>
          <li>• Gather all required supporting documents</li>
          <li>• Submit application through the funding provider's portal</li>
          <li>• Keep copies of all submitted documents</li>
          <li>• Follow up on application status as required</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default ApplicationReview;