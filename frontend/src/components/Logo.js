import React from 'react';

const Logo = ({ className = "h-16 w-auto", showText = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/assets/elidz-stp-logo.png"
        alt="ELIDZ Science & Technology Park"
        className="h-full w-auto object-contain"
        onError={(e) => {
          e.target.outerHTML = '<div class="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">ELIDZ STP</div>';
        }}
      />
      {showText && (
        <span className="ml-2 text-lg font-bold text-orange-500">
          SmartFund AI
        </span>
      )}
    </div>
  );
};

export default Logo;