import React from 'react';

const FourHorsemenLogo = ({ className = "h-16 w-auto", showText = true, variant = "full" }) => {
  const HorsemenIcon = () => (
    <div className="relative">
      {/* Four Horsemen Icon - Stylized */}
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 rounded-xl shadow-lg">
        <div className="grid grid-cols-2 gap-1">
          <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
        </div>
      </div>
      {/* Tech accent */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">4</span>
      </div>
    </div>
  );

  if (variant === "icon-only") {
    return <HorsemenIcon />;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <HorsemenIcon />
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Four Horsemen
          </span>
          <span className="text-sm font-medium text-gray-600">
            Technologies
          </span>
        </div>
      )}
    </div>
  );
};

// Legacy Logo component with ELIDZ branding for compatibility
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
export { FourHorsemenLogo };