import React from 'react';
import Logo from './Logo';

const ElidzHeader = () => {
  return (
    <div className="bg-white border-b-4 border-elidz-accent shadow-elidz-sm font-elidz">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="elidz-animate-scale-in">
              <Logo className="h-12" />
            </div>
            <div className="hidden md:block elidz-animate-slide-in">
              <h1 className="text-lg font-bold text-elidz-primary">
                East London Industrial Development Zone
              </h1>
              <p className="text-sm text-elidz-accent font-semibold">
                Industrial Development • Investment Promotion • SMME Support
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right elidz-animate-fade-in">
              <h2 className="text-lg font-bold text-elidz-primary">SmartFund AI Platform</h2>
              <p className="text-sm text-elidz-accent font-medium">Eastern Cape • South Africa</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-elidz-accent-100 to-elidz-accent-200 rounded-full flex items-center justify-center shadow-elidz-md elidz-animate-float">
              <span className="text-elidz-accent font-bold text-xl">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElidzHeader;