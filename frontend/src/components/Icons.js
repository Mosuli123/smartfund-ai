import React from 'react';

export const BuildingIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect x="4" y="3" width="16" height="18" rx="2" fill="url(#buildingGrad)" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="7" y="6" width="2" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    <rect x="11" y="6" width="2" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    <rect x="15" y="6" width="2" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    <rect x="7" y="10" width="2" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    <rect x="11" y="10" width="2" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    <rect x="15" y="10" width="2" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    <rect x="9" y="15" width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

export const TargetIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#targetGrad)" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const DocumentIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path d="M6 4v16a2 2 0 002 2h8a2 2 0 002-2V8l-6-4H8a2 2 0 00-2 2z" fill="url(#docGrad)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 4v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <line x1="9" y1="16" x2="15" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <line x1="9" y1="20" x2="13" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const SupportIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="supportGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#supportGrad)" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 6c2.2 0 4 1.8 4 4 0 1.5-1.2 2.8-2.8 3.2-.3.1-.7.4-.7.8v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
  </svg>
);

export const RocketIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path d="M12 2C8 2 8 6 8 6s0 4 4 4 4-4 4-4-0-4-4-4z" fill="url(#rocketGrad)" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="8" rx="2" ry="3" fill="currentColor" fillOpacity="0.3" />
    <circle cx="12" cy="7" r="1" fill="currentColor" fillOpacity="0.6" />
    <path d="M8 12c-2 0-3 1-3 3v2c0 1 1 2 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M16 12c2 0 3 1 3 3v2c0 1-1 2-3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M10 18l1 3h2l1-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="10" cy="14" r="1" fill="currentColor" fillOpacity="0.4" />
    <circle cx="14" cy="14" r="1" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

export const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="8" r="4" fill="url(#userGrad)" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="8" r="2" fill="currentColor" fillOpacity="0.3" />
    <path d="M6 21c0-4.418 2.686-8 6-8s6 3.582 6 8" fill="url(#userGrad)" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 21c0-2.209 1.343-4 3-4h2c1.657 0 3 1.791 3 4" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const ChartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="chartGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <rect x="3" y="13" width="4" height="8" rx="1" fill="url(#chartGrad)" stroke="currentColor" strokeWidth="1" />
    <rect x="10" y="9" width="4" height="12" rx="1" fill="url(#chartGrad)" stroke="currentColor" strokeWidth="1" />
    <rect x="17" y="5" width="4" height="16" rx="1" fill="url(#chartGrad)" stroke="currentColor" strokeWidth="1" />
    <circle cx="5" cy="11" r="1.5" fill="currentColor" />
    <circle cx="12" cy="7" r="1.5" fill="currentColor" />
    <circle cx="19" cy="3" r="1.5" fill="currentColor" />
    <path d="M5 11l7-4 7-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

export const SettingsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="settingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" fill="url(#settingsGrad)" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.6" />
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="1" x2="12" y2="3" opacity="0.8" />
      <line x1="12" y1="21" x2="12" y2="23" opacity="0.8" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" opacity="0.6" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" opacity="0.6" />
      <line x1="1" y1="12" x2="3" y2="12" opacity="0.8" />
      <line x1="21" y1="12" x2="23" y2="12" opacity="0.8" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" opacity="0.6" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" opacity="0.6" />
    </g>
  </svg>
);

export const SecurityIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="securityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" fill="url(#securityGrad)" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 4L6 7v5c0 3.87 2.67 7.48 6 8.32 3.33-.84 6-4.45 6-8.32V7l-6-3z" fill="currentColor" fillOpacity="0.1" />
    <circle cx="12" cy="11" r="2" fill="currentColor" fillOpacity="0.3" />
    <path d="M9 14l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const IndustryIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="industryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect x="2" y="14" width="20" height="8" rx="2" fill="url(#industryGrad)" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    <rect x="6" y="8" width="4" height="6" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
    <rect x="14" y="10" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
    <rect x="10" y="4" width="4" height="10" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="11" r="0.5" fill="currentColor" />
    <circle cx="12" cy="7" r="0.5" fill="currentColor" />
    <circle cx="16" cy="12" r="0.5" fill="currentColor" />
    <path d="M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

export const BackgroundPattern = ({ isDarkMode, children }) => (
  <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
    isDarkMode 
      ? 'bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900' 
      : 'bg-gradient-to-br from-green-200 via-green-100 to-green-300'
  }`}>
    {/* Consistent animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full filter blur-xl opacity-20 animate-pulse ${
        isDarkMode ? 'bg-orange-500 mix-blend-screen' : 'bg-orange-200 mix-blend-multiply'
      }`}></div>
      <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full filter blur-xl opacity-20 animate-pulse animation-delay-2000 ${
        isDarkMode ? 'bg-blue-500 mix-blend-screen' : 'bg-blue-200 mix-blend-multiply'
      }`}></div>
      <div className={`absolute top-1/2 left-1/2 w-60 h-60 rounded-full filter blur-xl opacity-15 animate-pulse animation-delay-4000 ${
        isDarkMode ? 'bg-orange-500 mix-blend-screen' : 'bg-orange-200 mix-blend-multiply'
      }`}></div>
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);