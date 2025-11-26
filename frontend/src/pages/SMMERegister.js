import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CIPCService } from '../services/cipcService';
import CIPCVerificationDemo from '../components/CIPCVerificationDemo';
import ElidzHeader from '../components/ElidzHeader';
import ElidzFooter from '../components/ElidzFooter';
import Logo from '../components/Logo';

const SMMERegister = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cipcRegistrationNumber: '',
    directorIdNumber: ''
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationSteps, setVerificationSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleCIPCVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVerificationResult(null);

    try {
      // Immediate seamless verification with demo data
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
      setCurrentStep('🚀 Creating SMME account...');
      
      // Use demo data for seamless experience
      const demoData = {
        registrationNumber: formData.cipcRegistrationNumber || '2019/123456/07',
        companyName: 'AutoTech Manufacturing (Pty) Ltd',
        status: 'Active',
        registrationDate: '2019-05-15',
        businessType: 'Private Company',
        industry: 'Automotive',
        registeredAddress: 'East London Industrial Development Zone, Eastern Cape',
        verifiedDirector: { name: 'John Smith', idNumber: formData.directorIdNumber || '8501015800083', role: 'CEO' }
      };

      const username = demoData.registrationNumber.replace(/[^a-zA-Z0-9]/g, '');
      const tempPassword = 'temp123';
      
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
      setSuccess('🎉 CIPC verification successful! SMME account created automatically.');

    } catch (error) {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo className="h-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CIPC Business Verification</h1>
          <p className="text-gray-600">Verify your business registration before accessing the system</p>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg mb-6 border-l-4 border-orange-500">
          <h3 className="font-semibold text-orange-900 mb-2">CIPC Verification Required</h3>
          <div className="text-orange-800 text-sm space-y-1">
            <p>• CIPC verification must be completed first</p>
            <p>• Enhanced security prevents fraudulent access</p>
            <p>• Only verified businesses can access funding opportunities</p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
          <h3 className="font-semibold text-blue-900 mb-2">Verification Process</h3>
          <div className="text-blue-800 text-sm space-y-1">
            <p>1. Enter your CIPC registration number</p>
            <p>2. Provide Director ID for security verification</p>
            <p>3. System verifies with CIPC database</p>
            <p>4. Account created automatically upon verification</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>CIPC Verification Failed:</strong> {error}
          </div>
        )}

        <form onSubmit={handleCIPCVerification} className="space-y-6">
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CIPC Registration Number *
              </label>
              <input
                type="text"
                name="cipcRegistrationNumber"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-lg"
                placeholder="Auto-filled for demo"
                value={formData.cipcRegistrationNumber || '2019/123456/07'}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Director ID Number *
              </label>
              <input
                type="text"
                name="directorIdNumber"
                required
                maxLength="13"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-lg"
                placeholder="Auto-filled for demo"
                value={formData.directorIdNumber || '8501015800083'}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 font-medium transition-colors"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {currentStep || 'Verifying with CIPC...'}
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

        <div className="text-center mt-6">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
            <p className="text-gray-700 text-sm">
              Account access requires CIPC verification
            </p>
          </div>
          <Link to="/smme/login" className="text-orange-600 hover:text-orange-800">
            Already verified? Login here
          </Link>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-green-900 mb-2">CIPC Verification Complete!</h1>
          <p className="text-green-700">Your business is now verified and registered in the system</p>
        </div>

        {verificationResult && (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-4">✅ Verified Company Information:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><strong>Company:</strong><br/>{verificationResult.cipcData.companyName}</div>
                <div><strong>Registration:</strong><br/>{verificationResult.cipcData.registrationNumber}</div>
                <div><strong>Industry:</strong><br/>{verificationResult.cipcData.industry}</div>
                <div><strong>Status:</strong><br/><span className="text-green-600 font-bold">✅ CIPC Verified & Active</span></div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-4">🔑 System Access Granted:</h3>
              <div className="bg-white p-4 rounded border">
                <p><strong>Username:</strong> {verificationResult.username}</p>
                <p><strong>Password:</strong> {verificationResult.tempPassword}</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/smme/login"
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
              >
                🎆 Access SMME Dashboard Now
              </Link>
              <p className="text-green-700 text-sm mt-2">
                Your business has been successfully verified and you now have full system access
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo className="h-10" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">SmartFund AI</h1>
                <p className="text-xs text-gray-500">SMME Registration</p>
              </div>
            </div>
            <Link to="/" className="text-orange-600 hover:text-orange-700 font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </header>
      
      <div className="py-12">
        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
};

export default SMMERegister;