# SmartFund AI - Technology Stack

## Programming Languages & Versions

### Frontend
- **JavaScript**: ES6+ with React.js patterns
- **React.js**: Version 18.2.0 (latest stable)
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Utility-first approach via Tailwind CSS

### Backend
- **Python**: 3.8+ required for FastAPI compatibility
- **JSON**: Data storage and API communication format

## Framework & Library Stack

### Frontend Dependencies
```json
Core Framework:
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.8.1

HTTP Client:
- axios: ^1.6.2

Styling:
- tailwindcss: ^3.3.6
- autoprefixer: ^10.4.16
- postcss: ^8.4.32

Testing:
- @testing-library/jest-dom: ^5.17.0
- @testing-library/react: ^13.4.0
- @testing-library/user-event: ^13.5.0

Build Tools:
- react-scripts: 5.0.1
```

### Backend Dependencies
```python
Web Framework:
- fastapi==0.104.1
- uvicorn==0.24.0

Data Handling:
- pydantic==2.5.0
- python-multipart==0.0.6

Authentication:
- python-jose==3.3.0
- passlib==1.7.4
- bcrypt==4.0.1

PDF Generation:
- reportlab==4.0.7
```

## Build Systems & Configuration

### Frontend Build System
- **Create React App**: Zero-configuration React build setup
- **Webpack**: Module bundling (via react-scripts)
- **Babel**: JavaScript transpilation (via react-scripts)
- **PostCSS**: CSS processing with Tailwind CSS
- **ESLint**: Code linting with React-specific rules

### Backend Build System
- **FastAPI**: ASGI-based web framework
- **Uvicorn**: ASGI server for development and production
- **Pydantic**: Data validation and serialization
- **Python Package Management**: pip with requirements.txt

### Configuration Files
```
Frontend:
- package.json: Dependencies and scripts
- tailwind.config.js: Tailwind CSS customization
- postcss.config.js: PostCSS plugin configuration

Backend:
- requirements.txt: Python dependencies
- main.py: FastAPI application configuration
```

## Development Commands

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (not recommended)
npm run eject
```

### Backend Development
```bash
# Install dependencies
pip install -r requirements.txt

# Start development server (http://localhost:8000)
python main.py

# Alternative uvicorn command
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Quick Demo Startup
```bash
# Windows batch script for simultaneous startup
start-demo.bat
```

## Development Environment Requirements

### System Prerequisites
- **Node.js**: v14 or higher for frontend development
- **Python**: 3.8+ for backend development
- **npm/yarn**: Package manager for frontend dependencies
- **pip**: Python package manager

### IDE Recommendations
- **VS Code**: Recommended with React and Python extensions
- **WebStorm**: Full-featured JavaScript IDE
- **PyCharm**: Python-focused development environment

### Browser Compatibility
```
Production Support:
- Chrome/Chromium: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Edge: Latest 2 versions

Development Support:
- Chrome: Latest version (primary testing)
- Firefox: Latest version
- Safari: Latest version
```

## Deployment Configuration

### Development Ports
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **CORS**: Configured for cross-origin requests between ports

### Production Build
- **Frontend**: Static files via `npm run build`
- **Backend**: ASGI server deployment via uvicorn
- **Environment Variables**: Configurable API endpoints and secrets