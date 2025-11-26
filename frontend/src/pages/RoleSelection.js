import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { ModernIcons } from '../components/ModernIcons';

const RoleSelection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #fef7f0 0%, #f0f4f8 100%)'}}>
      {/* Modern Header */}
      <header className="modern-nav">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo className="h-12" />
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold" style={{color: '#1e3a5f'}}>SmartFund AI</h1>
                <p className="text-sm" style={{color: '#64748b'}}>Intelligent SMME Funding Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 text-sm" style={{color: '#64748b'}}>
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{backgroundColor: '#10b981'}}></div>
                  AI System Active
                </span>
                <span>|</span>
                <span>Powered by ELIDZ STP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <div className="py-20" style={{background: 'linear-gradient(135deg, #fdeee0 0%, #d9e6f2 100%)'}}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="heading-1 text-center mb-6" style={{color: '#1e3a5f'}}>
              ELIDZ SmartFund AI Platform
            </h1>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-center" style={{color: '#475569'}}>
              Connecting South African SMMEs with funding opportunities through intelligent AI matching
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Modern SMME Card */}
            <div 
              className={`modern-card p-8 transform transition-all duration-500 group delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, #fdeee0 0%, #fbdcc1 100%)'}}>
                  <ModernIcons.Building className="w-10 h-10" color="#d35400" />
                </div>
                <h2 className="heading-2 text-center mb-4" style={{color: '#1e3a5f'}}>
                  SMME Business Owner
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Access funding opportunities through verified CIPC registration and secure business authentication.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-xl border-l-4" style={{backgroundColor: '#fef7f0', borderColor: '#e67e22'}}>
                    <div className="font-medium" style={{color: '#b8470f'}}>CIPC Verification Required</div>
                    <div className="text-sm mt-1" style={{color: '#d35400'}}>Secure business identity verification</div>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center" style={{color: '#475569'}}>
                      <ModernIcons.CheckCircle className="w-4 h-4 mr-3" color="#e67e22" />
                      <span>Access funding opportunities</span>
                    </div>
                    <div className="flex items-center" style={{color: '#475569'}}>
                      <ModernIcons.Brain className="w-4 h-4 mr-3" color="#e67e22" />
                      <span>AI-powered matching system</span>
                    </div>
                    <div className="flex items-center" style={{color: '#475569'}}>
                      <ModernIcons.Shield className="w-4 h-4 mr-3" color="#e67e22" />
                      <span>Secure application management</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link
                    to="/cipc-verification"
                    className="btn-primary w-full justify-center"
                  >
                    <ModernIcons.Shield className="w-5 h-5" />
                    Verify Business Registration
                  </Link>
                  <Link
                    to="/smme/login"
                    className="btn-secondary w-full justify-center"
                  >
                    <ModernIcons.Users className="w-5 h-5" />
                    Login (Verified Users)
                  </Link>
                </div>
              </div>
            </div>

            {/* Modern Admin Card */}
            <div 
              className={`modern-card p-8 transform transition-all duration-500 group delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, #d9e6f2 0%, #b3cce5 100%)'}}>
                  <ModernIcons.MoneyBag className="w-12 h-12" />
                </div>
                <h2 className="heading-2 text-center mb-4" style={{color: '#1e3a5f'}}>
                  Funding Provider
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Create funding opportunities, review applications, and manage the funding ecosystem.
                </p>
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center" style={{color: '#475569'}}>
                    <ModernIcons.Target className="w-4 h-4 mr-3" color="#4180be" />
                    <span>Create funding opportunities</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Review applications</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Generate reports</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Manage SMME database</span>
                  </div>
                </div>
                <div>
                  <Link
                    to="/admin/login"
                    className="btn-primary w-full justify-center"
                    style={{background: 'linear-gradient(135deg, #4180be 0%, #2d4a6b 100%)'}}
                  >
                    <ModernIcons.Briefcase className="w-5 h-5" />
                    Login as Provider
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modern ELIDZ Admin Card */}
          <div className="flex justify-center">
            <div 
              className={`modern-card p-8 transform transition-all duration-500 group max-w-md delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, #fdeee0 0%, #d9e6f2 100%)'}}>
                  <ModernIcons.Shield className="w-10 h-10" color="#1e3a5f" />
                </div>
                <h2 className="heading-2 text-center mb-4" style={{color: '#1e3a5f'}}>
                  ELIDZ System Administrator
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  System administration, user management, and comprehensive analytics for the ELIDZ platform.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-xl border-l-4" style={{backgroundColor: '#f0f4f8', borderColor: '#4180be'}}>
                    <div className="font-medium" style={{color: '#1e3a5f'}}>Restricted Access</div>
                    <div className="text-sm mt-1" style={{color: '#2d4a6b'}}>ELIDZ staff authorization required</div>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>System administration</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>User approval and management</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Analytics and sustainability reports</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    to="/elidz-admin/login"
                    className="btn-secondary w-full justify-center"
                  >
                    <ModernIcons.Shield className="w-5 h-5" />
                    ELIDZ Administrator Access
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern Features Section */}
      <div className="py-16" style={{background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)'}}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-center mb-4" style={{color: '#1e3a5f'}}>Platform Features</h2>
            <p className="text-center max-w-2xl mx-auto" style={{color: '#64748b'}}>Enterprise-grade AI solutions designed for the South African SMME ecosystem</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ModernIcons.Shield className="w-8 h-8" color="#e67e22" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-gray-600">Bank-level encryption with CIPC verification and secure data handling</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ModernIcons.Rocket className="w-8 h-8" color="#4180be" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Intelligent Matching</h3>
              <p className="text-gray-600">AI-powered algorithms for optimal funding opportunity matching</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ModernIcons.Chart className="w-8 h-8" color="#64748b" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">Comprehensive reporting and insights for informed decision making</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Logo className="h-8" />
            <div className="text-sm text-gray-500">
              © 2024 East London Industrial Development Zone. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoleSelection;