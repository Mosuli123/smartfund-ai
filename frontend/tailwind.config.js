/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ELIDZ Primary Colors - Navy Blue/Dark Teal
        'elidz-primary': {
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
        // ELIDZ Accent Colors - Warm Orange
        'elidz-accent': {
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
        // Supporting Colors
        'elidz-success': '#27ae60',
        'elidz-warning': '#f39c12',
        'elidz-error': '#e74c3c',
        'elidz-info': '#3498db',
      },
      fontFamily: {
        'elidz': ['Inter', 'Segoe UI', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'elidz-mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      spacing: {
        'elidz-xs': '0.25rem',
        'elidz-sm': '0.5rem',
        'elidz-md': '1rem',
        'elidz-lg': '1.5rem',
        'elidz-xl': '2rem',
        'elidz-2xl': '3rem',
        'elidz-3xl': '4rem',
      },
      borderRadius: {
        'elidz-sm': '0.375rem',
        'elidz-md': '0.5rem',
        'elidz-lg': '0.75rem',
        'elidz-xl': '1rem',
        'elidz-2xl': '1.5rem',
      },
      boxShadow: {
        'elidz-sm': '0 1px 2px 0 rgba(30, 58, 95, 0.05)',
        'elidz-md': '0 4px 6px -1px rgba(30, 58, 95, 0.1), 0 2px 4px -1px rgba(30, 58, 95, 0.06)',
        'elidz-lg': '0 10px 15px -3px rgba(30, 58, 95, 0.1), 0 4px 6px -2px rgba(30, 58, 95, 0.05)',
        'elidz-xl': '0 20px 25px -5px rgba(30, 58, 95, 0.1), 0 10px 10px -5px rgba(30, 58, 95, 0.04)',
        'elidz-2xl': '0 25px 50px -12px rgba(30, 58, 95, 0.25)',
      },
      transitionTimingFunction: {
        'elidz-fast': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'elidz-normal': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'elidz-slow': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'elidz-fast': '150ms',
        'elidz-normal': '300ms',
        'elidz-slow': '500ms',
      },
      backgroundImage: {
        'elidz-gradient-primary': 'linear-gradient(135deg, #1e3a5f 0%, #2d4a6b 100%)',
        'elidz-gradient-accent': 'linear-gradient(135deg, #e67e22 0%, #f39c12 100%)',
        'elidz-gradient-hero': 'linear-gradient(135deg, #1e3a5f 0%, #e67e22 100%)',
      },
      animation: {
        'elidz-fade-in': 'elidz-fade-in 0.6s ease-out',
        'elidz-slide-in': 'elidz-slide-in 0.6s ease-out',
        'elidz-spin': 'elidz-spin 1s ease-in-out infinite',
      },
      keyframes: {
        'elidz-fade-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'elidz-slide-in': {
          'from': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'elidz-spin': {
          'to': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [],
}