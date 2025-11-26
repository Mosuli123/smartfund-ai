// ELIDZ Theme Configuration
export const elidzTheme = {
  // Color Palette
  colors: {
    primary: {
      50: '#f0f4f8',
      100: '#d9e6f2',
      200: '#b3cce5',
      300: '#8db3d8',
      400: '#6799cb',
      500: '#4180be',
      600: '#2d4a6b',
      700: '#1e3a5f',
      800: '#152d47',
      900: '#0c1f2f',
      DEFAULT: '#1e3a5f',
    },
    accent: {
      50: '#fef7f0',
      100: '#fdeee0',
      200: '#fbdcc1',
      300: '#f9cba2',
      400: '#f7b983',
      500: '#f5a864',
      600: '#e67e22',
      700: '#d35400',
      800: '#b8470f',
      900: '#9c3a0c',
      DEFAULT: '#e67e22',
    },
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#3498db',
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    }
  },

  // Typography
  typography: {
    fontFamily: {
      primary: ['Inter', 'Segoe UI', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    }
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  // Border Radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgba(30, 58, 95, 0.05)',
    md: '0 4px 6px -1px rgba(30, 58, 95, 0.1), 0 2px 4px -1px rgba(30, 58, 95, 0.06)',
    lg: '0 10px 15px -3px rgba(30, 58, 95, 0.1), 0 4px 6px -2px rgba(30, 58, 95, 0.05)',
    xl: '0 20px 25px -5px rgba(30, 58, 95, 0.1), 0 10px 10px -5px rgba(30, 58, 95, 0.04)',
    '2xl': '0 25px 50px -12px rgba(30, 58, 95, 0.25)',
  },

  // Transitions
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Component Styles
  components: {
    button: {
      base: 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-content gap-2 cursor-pointer border-none',
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
      variants: {
        primary: 'bg-gradient-to-r from-elidz-primary to-elidz-primary-light text-white shadow-md hover:shadow-lg hover:scale-105',
        accent: 'bg-gradient-to-r from-elidz-accent to-elidz-accent-light text-white shadow-md hover:shadow-lg hover:scale-105',
        outline: 'border-2 border-elidz-primary text-elidz-primary hover:bg-elidz-primary hover:text-white',
        ghost: 'text-elidz-gray-600 border border-elidz-gray-300 hover:bg-elidz-gray-50',
      }
    },
    
    input: {
      base: 'w-full px-4 py-2 border-2 border-elidz-gray-300 rounded-lg font-medium transition-all duration-200 bg-white',
      focus: 'focus:outline-none focus:border-elidz-primary focus:ring-4 focus:ring-elidz-primary/10',
      hover: 'hover:border-elidz-gray-400',
    },

    card: {
      base: 'bg-white rounded-xl shadow-md border border-elidz-gray-200 transition-all duration-300 overflow-hidden',
      hover: 'hover:shadow-xl hover:scale-102 hover:border-elidz-primary-200',
      header: 'p-6 border-b border-elidz-gray-200 bg-gradient-to-r from-elidz-gray-50 to-white',
      body: 'p-6',
      footer: 'p-6 border-t border-elidz-gray-200 bg-elidz-gray-50',
    },

    badge: {
      base: 'inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wide',
      variants: {
        primary: 'bg-elidz-primary text-white',
        accent: 'bg-elidz-accent text-white',
        success: 'bg-elidz-success text-white',
        warning: 'bg-elidz-warning text-white',
        error: 'bg-elidz-error text-white',
        info: 'bg-elidz-info text-white',
      }
    },

    alert: {
      base: 'p-4 rounded-lg border-l-4 mb-4',
      variants: {
        success: 'bg-green-50 border-elidz-success text-elidz-success',
        warning: 'bg-yellow-50 border-elidz-warning text-elidz-warning',
        error: 'bg-red-50 border-elidz-error text-elidz-error',
        info: 'bg-blue-50 border-elidz-info text-elidz-info',
      }
    },

    navigation: {
      base: 'bg-gradient-to-r from-elidz-primary to-elidz-primary-dark shadow-lg border-b-3 border-elidz-accent',
      link: 'text-white px-4 py-2 rounded-md font-medium transition-all duration-200 relative overflow-hidden',
      linkHover: 'hover:bg-white/10 hover:transform hover:translateY(-1px)',
      linkActive: 'bg-elidz-accent shadow-md',
    }
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  }
};

// Utility functions for theme usage
export const getThemeColor = (colorPath) => {
  const keys = colorPath.split('.');
  let value = elidzTheme.colors;
  
  for (const key of keys) {
    value = value[key];
    if (!value) return null;
  }
  
  return value;
};

export const getComponentStyle = (component, variant = 'base', size = 'md') => {
  const componentStyles = elidzTheme.components[component];
  if (!componentStyles) return '';
  
  let styles = componentStyles.base || '';
  
  if (componentStyles.sizes && componentStyles.sizes[size]) {
    styles += ' ' + componentStyles.sizes[size];
  }
  
  if (componentStyles.variants && componentStyles.variants[variant]) {
    styles += ' ' + componentStyles.variants[variant];
  }
  
  return styles;
};

export default elidzTheme;