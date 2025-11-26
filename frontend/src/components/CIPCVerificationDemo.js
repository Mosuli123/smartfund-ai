import React, { useState } from 'react';

const CIPCVerificationDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const demoSteps = [
    {
      title: "🔗 Connecting to CIPC Database",
      description: "Establishing secure connection to official CIPC records",
      status: "connecting"
    },
    {
      title: "🔍 Querying Registration Number",
      description: "Searching for company registration in database",
      status: "searching"
    },
    {
      title: "✅ Company Found",
      description: "Registration number exists and company is active",
      status: "found"
    },
    {
      title: "🆔 Verifying Director ID",
      description: "Cross-referencing ID number with registered directors",
      status: "verifying"
    },
    {
      title: "🎉 Verification Complete",
      description: "Business registration and director identity confirmed",
      status: "complete"
    }
  ];

  const startDemo = () => {
    setShowDemo(true);
    setDemoStep(0);
    
    // Simulate verification steps
    const interval = setInterval(() => {
      setDemoStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const resetDemo = () => {
    setShowDemo(false);
    setDemoStep(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-red-900 mb-2">
          🔒 MANDATORY SECURITY VERIFICATION
        </h3>
        <p className="text-red-700 text-sm font-medium">
          All businesses MUST pass CIPC verification before system access
        </p>
        <p className="text-gray-600 text-xs mt-1">
          Real-time database verification with Director ID cross-referencing
        </p>
      </div>

      {!showDemo ? (
        <div className="text-center">
          <button
            onClick={startDemo}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold"
          >
            🛡️ Demo Mandatory Verification
          </button>
          <p className="text-xs text-red-600 mt-2 font-medium">
            See how verification prevents unauthorized access
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Live Verification Process:</h4>
            
            {demoSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded-lg mb-2 ${
                  index <= demoStep
                    ? index === demoStep
                      ? 'bg-green-100 border border-green-300'
                      : 'bg-green-50 border border-green-200'
                    : 'bg-gray-100'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{step.title.split(' ')[0]}</span>
                    <span className={`font-medium ${
                      index <= demoStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title.substring(2)}
                    </span>
                    {index === demoStep && (
                      <div className="loading-spinner ml-2"></div>
                    )}
                    {index < demoStep && (
                      <span className="text-green-600 ml-2">✓</span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${
                    index <= demoStep ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {demoStep >= demoSteps.length - 1 && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-900 mb-2">
                🛡️ Mandatory Security Benefits:
              </h5>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• 🚫 Prevents fraudulent business registrations</li>
                <li>• 🔍 Real-time CIPC database verification</li>
                <li>• 🎯 Director ID cross-verification for authenticity</li>
                <li>• ⚠️ Automatic rejection of non-existent businesses</li>
                <li>• 🔒 Secure funding ecosystem for legitimate SMMEs</li>
              </ul>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={resetDemo}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Reset Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CIPCVerificationDemo;