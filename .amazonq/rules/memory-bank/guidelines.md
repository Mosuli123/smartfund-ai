# SmartFund AI - Development Guidelines

## Code Quality Standards

### JavaScript/React Formatting Patterns
- **Import Organization**: Group imports by type (React hooks, external libraries, internal components, services)
- **Component Structure**: Functional components with hooks pattern consistently used
- **State Management**: useState and useEffect hooks for local state, localStorage for persistence
- **Destructuring**: Consistent use of object destructuring for props and state
- **Arrow Functions**: Prefer arrow functions for component definitions and event handlers

### Python/FastAPI Formatting Patterns
- **Import Organization**: Standard library imports first, then third-party, then local imports
- **Function Definitions**: Async functions for all API endpoints with proper type hints
- **Error Handling**: HTTPException for API errors with descriptive messages
- **Data Models**: Pydantic BaseModel classes for request/response validation

### Naming Conventions
- **Components**: PascalCase for React components (e.g., `CreateOpportunity`, `ElidzButton`)
- **Variables**: camelCase for JavaScript variables and functions
- **Constants**: UPPER_SNAKE_CASE for constants and configuration values
- **Files**: PascalCase for component files, camelCase for service files
- **CSS Classes**: kebab-case with BEM-style modifiers (e.g., `elidz-btn`, `elidz-btn-primary`)

## Structural Conventions

### React Component Architecture
- **Component Composition**: Reusable UI components in dedicated components directory
- **Page Components**: Full-page components in pages directory with routing logic
- **Service Layer**: Separate service files for API communication and business logic
- **Context Usage**: React Context for global state management without external libraries

### Form Handling Patterns
```javascript
// Standard form state pattern used throughout
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
  // ... other fields
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

### Authentication Flow
- **Token Storage**: localStorage for authentication tokens
- **Route Protection**: Conditional rendering with Navigate component for protected routes
- **Multi-role Support**: Separate authentication states for different user types

### API Integration Patterns
```javascript
// Consistent async/await pattern for API calls
const handleSubmit = async (data) => {
  setLoading(true);
  try {
    const response = await apiService.submitData(data);
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};
```

## Semantic Patterns Overview

### Component Design Patterns
- **Compound Components**: Modal components with Header, Body, Footer sub-components
- **Render Props**: Theme context provider pattern for consistent styling
- **Higher-Order Components**: Service layer abstraction for API communication

### State Management Patterns
- **Local State**: useState for component-specific data
- **Persistent State**: localStorage for user sessions and preferences
- **Derived State**: Computed values from existing state rather than separate state variables

### Error Handling Patterns
- **Frontend**: Try-catch blocks with user-friendly error messages
- **Backend**: HTTPException with structured error responses
- **Validation**: Client-side validation with server-side validation backup

## Internal API Usage Patterns

### FastAPI Endpoint Structure
```python
@app.post("/api/endpoint-name")
async def endpoint_function(data: DataModel):
    try:
        # Process data
        result = process_data(data)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
```

### React Service Layer Pattern
```javascript
// Service class pattern for API communication
export class ServiceName {
  static async methodName(data) {
    const response = await fetch('/api/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}
```

### Data Validation Patterns
- **Frontend**: Form validation with error state management
- **Backend**: Pydantic models for automatic request/response validation
- **Type Safety**: TypeScript-style prop validation in React components

## Frequently Used Code Idioms

### React Hooks Patterns
```javascript
// Effect cleanup pattern
useEffect(() => {
  const cleanup = setupSomething();
  return () => cleanup();
}, [dependencies]);

// Conditional rendering pattern
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

### Array Manipulation Patterns
```javascript
// Multi-select toggle pattern
const handleMultiSelect = (name, value) => {
  setFormData(prev => ({
    ...prev,
    [name]: prev[name].includes(value)
      ? prev[name].filter(item => item !== value)
      : [...prev[name], value]
  }));
};
```

### Loading State Patterns
```javascript
// Consistent loading state management
const [loading, setLoading] = useState(false);

const handleAsyncAction = async () => {
  setLoading(true);
  try {
    await performAction();
  } finally {
    setLoading(false);
  }
};
```

## Popular Annotations and Comments

### Documentation Patterns
- **Component Documentation**: JSDoc-style comments for complex components
- **API Documentation**: Inline comments explaining business logic
- **Configuration Comments**: Detailed explanations for configuration objects

### Code Organization Comments
```javascript
// Section headers for logical code groupings
// ===== AUTHENTICATION LOGIC =====
// ===== FORM HANDLING =====
// ===== API INTEGRATION =====
```

### TODO and FIXME Patterns
- **TODO**: Future enhancements and feature additions
- **FIXME**: Known issues that need addressing
- **NOTE**: Important implementation details and warnings

## Testing and Quality Assurance

### Error Boundary Patterns
- **Graceful Degradation**: Fallback UI for component errors
- **User Feedback**: Clear error messages with actionable guidance
- **Logging**: Console logging for development debugging

### Performance Optimization
- **Lazy Loading**: Dynamic imports for route-based code splitting
- **Memoization**: React.memo for expensive component renders
- **Debouncing**: Input debouncing for search and filter operations

### Accessibility Standards
- **Semantic HTML**: Proper use of form labels and ARIA attributes
- **Keyboard Navigation**: Tab order and keyboard event handling
- **Screen Reader Support**: Alt text and descriptive labels