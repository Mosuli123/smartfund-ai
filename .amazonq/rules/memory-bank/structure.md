# SmartFund AI - Project Structure

## Directory Organization

### Root Level

```
smartfund-ai/
├── backend/           # FastAPI Python backend
├── frontend/          # React.js frontend application
├── README.md          # Comprehensive project documentation
└── start-demo.bat     # Windows batch script for quick demo startup
```

### Backend Structure (`/backend/`)
```
backend/
├── data/
│   └── funding_opportunities.json    # Mock funding data for demo
├── main.py                          # Primary FastAPI application
├── main-simple.py                   # Simplified version for basic demos
├── main-minimal.py                  # Minimal implementation for testing
├── requirements.txt                 # Production dependencies
├── requirements-simple.txt          # Simplified dependency set
└── requirements-minimal.txt         # Minimal dependency set
```

### Frontend Structure (`/frontend/`)
```
frontend/
├── public/
│   ├── assets/                      # Static assets and images (JPEG logo format preferred)
│   └── index.html                   # Main HTML template
├── src/
│   ├── components/                  # Reusable React components
│   ├── config/                      # Configuration files
│   ├── contexts/                    # React context providers
│   ├── data/                        # Static data and mock content
│   ├── pages/                       # Page-level React components
│   ├── services/                    # API service layers
│   ├── styles/                      # CSS and styling files
│   ├── App.js                       # Main React application component
│   ├── index.css                    # Global styles
│   └── index.js                     # React application entry point
├── package.json                     # Node.js dependencies and scripts
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
└── ELIDZ_THEME_IMPLEMENTATION.md    # Theme implementation guide
```

## Core Components & Relationships

### Backend Architecture
- **FastAPI Application**: RESTful API server handling authentication, profile management, and funding matching
- **Data Layer**: JSON-based mock data storage for funding opportunities
- **PDF Generation**: ReportLab integration for application document creation
- **CORS Middleware**: Cross-origin request handling for frontend integration

### Frontend Architecture
- **React Router**: Client-side routing for single-page application navigation
- **Component Hierarchy**: Modular component structure with reusable UI elements
- **Service Layer**: Axios-based API communication with backend services
- **Context Management**: React contexts for global state management
- **Styling System**: Tailwind CSS utility-first styling approach
- **Asset Management**: JPEG logo format for branding consistency

### Data Flow
1. **Authentication**: Frontend → Backend API → Session management
2. **Profile Management**: User input → Frontend validation → Backend storage
3. **Funding Matching**: Profile data → AI matching algorithm → Scored results
4. **Application Generation**: Match selection → Template processing → PDF creation

## Architectural Patterns

### Frontend Patterns
- **Component-Based Architecture**: Modular, reusable React components
- **Service-Oriented Design**: Separated API communication layer
- **Context Pattern**: Global state management without external libraries
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend Patterns
- **RESTful API Design**: Standard HTTP methods and status codes
- **Dependency Injection**: FastAPI's built-in dependency system
- **Data Validation**: Pydantic models for request/response validation
- **Middleware Pattern**: CORS and authentication middleware

### Integration Patterns
- **API-First Design**: Backend-agnostic frontend development
- **JSON Communication**: Standardized data exchange format
- **Error Handling**: Consistent error responses across all endpoints
- **Development Separation**: Independent frontend and backend development workflows