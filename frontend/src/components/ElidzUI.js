import React from 'react';
import { getComponentStyle } from '../config/theme';

// ELIDZ Button Component
export const ElidzButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseStyles = getComponentStyle('button', variant, size);
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      className={`elidz-btn elidz-btn-${variant} ${baseStyles} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// ELIDZ Input Component
export const ElidzInput = ({ 
  label, 
  error, 
  className = '', 
  required = false,
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="elidz-label">
          {label}
          {required && <span className="text-elidz-error ml-1">*</span>}
        </label>
      )}
      <input
        className={`elidz-input ${error ? 'border-elidz-error' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-elidz-error text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

// ELIDZ Select Component
export const ElidzSelect = ({ 
  label, 
  error, 
  children, 
  className = '', 
  required = false,
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="elidz-label">
          {label}
          {required && <span className="text-elidz-error ml-1">*</span>}
        </label>
      )}
      <select
        className={`elidz-select ${error ? 'border-elidz-error' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-elidz-error text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

// ELIDZ Card Component
export const ElidzCard = ({ 
  children, 
  className = '', 
  hover = true,
  ...props 
}) => {
  const hoverStyles = hover ? 'elidz-card:hover' : '';
  
  return (
    <div className={`elidz-card ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

// ELIDZ Card Header
export const ElidzCardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`elidz-card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

// ELIDZ Card Body
export const ElidzCardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`elidz-card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

// ELIDZ Card Footer
export const ElidzCardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`elidz-card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

// ELIDZ Badge Component
export const ElidzBadge = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  return (
    <span className={`elidz-badge elidz-badge-${variant} ${className}`} {...props}>
      {children}
    </span>
  );
};

// ELIDZ Alert Component
export const ElidzAlert = ({ 
  children, 
  variant = 'info', 
  className = '', 
  icon,
  onClose,
  ...props 
}) => {
  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️'
  };

  return (
    <div className={`elidz-alert elidz-alert-${variant} ${className}`} {...props}>
      <div className="flex items-start">
        {icon !== false && (
          <span className="text-xl mr-3 flex-shrink-0">
            {icon || icons[variant]}
          </span>
        )}
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-current opacity-70 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

// ELIDZ Loading Spinner
export const ElidzLoading = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`elidz-loading ${sizeClasses[size]} ${className}`}></div>
  );
};

// ELIDZ Modal Component
export const ElidzModal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = '',
  size = 'md',
  ...props 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="elidz-modal-overlay" onClick={onClose}>
      <div 
        className={`elidz-modal ${sizeClasses[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

// ELIDZ Modal Header
export const ElidzModalHeader = ({ children, className = '', onClose, ...props }) => {
  return (
    <div className={`elidz-modal-header ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div>{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-elidz-gray-400 hover:text-elidz-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

// ELIDZ Modal Body
export const ElidzModalBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`elidz-modal-body ${className}`} {...props}>
      {children}
    </div>
  );
};

// ELIDZ Modal Footer
export const ElidzModalFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`elidz-modal-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

// ELIDZ Table Component
export const ElidzTable = ({ children, className = '', ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`elidz-table ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
};

// ELIDZ Table Header
export const ElidzTableHeader = ({ children, className = '', ...props }) => {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
};

// ELIDZ Table Body
export const ElidzTableBody = ({ children, className = '', ...props }) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
};

// ELIDZ Table Row
export const ElidzTableRow = ({ children, className = '', ...props }) => {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
};

// ELIDZ Table Header Cell
export const ElidzTableHeaderCell = ({ children, className = '', ...props }) => {
  return (
    <th className={`elidz-table th ${className}`} {...props}>
      {children}
    </th>
  );
};

// ELIDZ Table Cell
export const ElidzTableCell = ({ children, className = '', ...props }) => {
  return (
    <td className={`elidz-table td ${className}`} {...props}>
      {children}
    </td>
  );
};

// ELIDZ Container Component
export const ElidzContainer = ({ children, className = '', size = 'default' }) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    default: 'max-w-7xl',
    lg: 'max-w-full',
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

// ELIDZ Section Component
export const ElidzSection = ({ children, className = '', background = 'default' }) => {
  const backgroundClasses = {
    default: 'bg-white',
    gray: 'bg-elidz-gray-50',
    primary: 'elidz-gradient-primary text-white',
    accent: 'elidz-gradient-accent text-white',
    hero: 'elidz-gradient-hero text-white',
  };

  return (
    <section className={`py-12 ${backgroundClasses[background]} ${className}`}>
      {children}
    </section>
  );
};