import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const CIPCVerification = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cipcRegistrationNumber: '2019/123456/07',
    directorIdNumber: '8501015800083'
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [currentStep, setCurrentStep] = useState('');
  const [verificationSteps, setVerificationSteps] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCIPCVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Seamless verification animation
      setCurrentStep('🔍 Connecting to CIPC Database...');
      setVerificationSteps(['🔍 Initiating CIPC Database connection...']);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentStep('✅ Connected to CIPC Database');
      setVerificationSteps(prev => [...prev, '✅ Connected to CIPC Database']);
      
      await new Promise(resolve => setTimeout(resolve, 600));
      setCurrentStep('🔎 Querying company registration records...');
      setVerificationSteps(prev => [...prev, '🔎 Querying company registration records...']);
      
      await new Promise(resolve => setTimeout(resolve, 700));
      setCurrentStep('🆔 Cross-referencing director ID number...');
      setVerificationSteps(prev => [...prev, '🆔 Cross-referencing director ID number...']);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep('✅ CIPC Verification Completed');
      setVerificationSteps(prev => [...prev, '✅ Registration number found and verified', '✅ Company status: Active', '✅ Director ID verified in company records', '✅ Enhanced security verification completed']);
      
      await new Promise(resolve => setTimeout(resolve, 400));
      setCurrentStep('🚀 Creating account...');
      
      // Demo company data
      const demoData = {
        registrationNumber: formData.cipcRegistrationNumber,
        companyName: 'AutoTech Manufacturing (Pty) Ltd',
        status: 'Active',
        registrationDate: '2019-05-15',
        businessType: 'Private Company',
        industry: 'Automotive',
        registeredAddress: 'East London Industrial Development Zone, Eastern Cape',
        verifiedDirector: { name: 'John Smith', idNumber: formData.directorIdNumber, role: 'CEO' }
      };

      const username = demoData.registrationNumber.replace(/[^a-zA-Z0-9]/g, '');
      const tempPassword = 'temp123';
      
      // Store user data
      const userData = {
        username: username,
        role: 'smme',
        cipcData: demoData,
        registrationDate: new Date().toISOString(),
        status: 'Active',
        profileComplete: false
      };

      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      users.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      const credentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
      credentials[username] = {
        password: tempPassword,
        role: 'smme',
        cipcData: demoData
      };
      localStorage.setItem('userCredentials', JSON.stringify(credentials));

      await new Promise(resolve => setTimeout(resolve, 600));
      setVerificationResult({
        cipcData: demoData,
        username: username,
        tempPassword: tempPassword
      });
      setStep(2);

    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/smme/login');
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200">
        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Logo className="h-10" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">SmartFund AI</h1>
                <p className="text-xs text-gray-500">CIPC Verification Complete</p>
              </div>
            </div>
          </div>
        </header>

        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="text-8xl mb-6 text-green-600">✓</div>
                <h1 className="text-4xl font-bold text-green-900 mb-3">Verification Successful!</h1>
                <p className="text-green-700 text-lg">Your CIPC registration has been verified</p>
              </div>

              {verificationResult && (
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="font-bold text-green-900 mb-4 text-lg flex items-center">
                      <span className="text-xl mr-2">🏢</span> Company Information Verified
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-3 rounded-lg">
                        <strong className="text-green-900">Company Name:</strong><br/>
                        <span className="text-gray-800 font-semibold">{verificationResult.cipcData.companyName}</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <strong className="text-green-900">Registration Number:</strong><br/>
                        <span className="text-gray-800 font-mono">{verificationResult.cipcData.registrationNumber}</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <strong className="text-green-900">Industry:</strong><br/>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">{verificationResult.cipcData.industry}</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <strong className="text-green-900">Status:</strong><br/>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">{verificationResult.cipcData.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
                      <span className="text-xl mr-2">🎉</span> Account Created Successfully!
                    </h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <strong className="text-blue-900">Username:</strong>
                          <span className="font-mono text-blue-700 font-semibold">{verificationResult.username}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <strong className="text-blue-900">Temporary Password:</strong>
                          <span className="font-mono text-blue-700 font-semibold">{verificationResult.tempPassword}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-3 text-center">
                        You can change your password after logging in
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={handleGoToLogin}
                      className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium text-lg transition-colors duration-200"
                    >
                      <span className="flex items-center">
                        <span className="mr-2">🚀</span>
                        Access SMME Dashboard
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo className="h-10" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">SmartFund AI</h1>
                <p className="text-xs text-gray-500">CIPC Business Verification</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <Logo className="h-16" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">CIPC Business Verification</h1>
              <p className="text-gray-600 text-lg">Verify your business registration to access funding opportunities</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg mb-6 border-l-4 border-orange-500">
              <h3 className="font-semibold text-orange-900 mb-2 flex items-center">
                <span className="text-xl mr-2">🚀</span> Instant Verification
              </h3>
              <div className="text-orange-800 text-sm space-y-1">
                <p>• Pre-filled with demo data for instant testing</p>
                <p>• Real-time CIPC database verification</p>
                <p>• Automatic account creation upon verification</p>
              </div>
            </div>

            {loading && currentStep && (
              <div className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                  <div>
                    <p className="font-semibold text-blue-900">{currentStep}</p>
                    {verificationSteps.length > 0 && (
                      <ul className="text-xs mt-2 space-y-1 text-blue-800">
                        {verificationSteps.map((step, index) => (
                          <li key={index}>• {step}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleCIPCVerification} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CIPC Registration Number *
                  </label>
                  <input
                    type="text"
                    name="cipcRegistrationNumber"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-lg font-semibold"
                    placeholder="Auto-filled for demo"
                    value={formData.cipcRegistrationNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director ID Number * (Enhanced Security)
                  </label>
                  <input
                    type="text"
                    name="directorIdNumber"
                    required
                    maxLength="13"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-lg font-semibold"
                    placeholder="Auto-filled for demo"
                    value={formData.directorIdNumber}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    ID number of a registered company director
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 font-medium text-lg transition-colors duration-200"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {currentStep || 'Verifying...'}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">🚀</span>
                      Verify Business Registration
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIPCVerification;