# SmartFund AI - SMME Funding Platform

A fully functional web application prototype that helps Small, Medium & Micro Enterprises (SMMEs) find and apply for funding opportunities using AI-powered matching.

## 🚀 Features

- **User Authentication**: Simple login system (demo credentials provided)
- **Business Profile Management**: Capture and store business information
- **AI-Powered Matching**: Smart algorithm matches businesses with relevant funding opportunities
- **Match Scoring**: Percentage-based scoring system with explanations
- **Application Draft Generation**: Auto-generate and edit funding applications
- **PDF Export**: Download application drafts as PDF documents
- **Responsive Design**: Professional UI suitable for demo presentations

## 🛠 Technology Stack

### Frontend
- React.js 18
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Python FastAPI
- Pydantic for data validation
- ReportLab for PDF generation
- CORS middleware for cross-origin requests

### Data
- JSON-based mock funding opportunities
- In-memory storage for demo purposes

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone/Download the Project
```bash
# If you have the project files, navigate to the project directory
cd smartfund-ai
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
python main.py
```
The backend will run on `http://localhost:8000`

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the React development server
npm start
```
The frontend will run on `http://localhost:3000`

## 🎮 Demo Usage

### Login Credentials
- **Username**: `demo`
- **Password**: `password123`

### Demo Flow
1. **Login** with the provided credentials
2. **Create Business Profile**:
   - Business Name: "Tech Innovations Ltd"
   - Industry: "Technology"
   - Funding Amount: "100000"
   - Location: "South Africa"
   - Years in Operation: "3"

3. **Find Funding Matches**:
   - Navigate to "Funding Opportunities"
   - Click "Find My Funding Matches"
   - View AI-generated matches with scores and explanations

4. **Generate Application Draft**:
   - Navigate to "Application Draft"
   - Click "Generate PDF Draft" to download
   - Edit the draft content as needed
   - Click "Mark as Ready" when complete

## 📊 Sample Data

The system includes 6 mock funding opportunities:
- Small Business Innovation Grant (Technology/Healthcare/Manufacturing)
- Women Entrepreneur Fund (Retail/Services/Agriculture)
- Tech Startup Accelerator (Technology/Fintech)
- Agricultural Development Fund (Agriculture/Food Processing)
- Youth Enterprise Scheme (Any industry)
- Green Energy Initiative (Energy/Technology)

## 🧠 AI Matching Algorithm

The matching system considers:
- **Industry Match** (40% weight): Business industry vs funding sectors
- **Funding Amount** (30% weight): Required amount vs funding range
- **Location** (20% weight): Business location vs eligible regions
- **Business Age** (10% weight): Years in operation vs requirements

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Profile Management
- `POST /api/profile` - Save business profile
- `GET /api/profile/{user_id}` - Get business profile

### Funding
- `POST /api/match-funding` - Get funding matches
- `GET /api/funding-opportunities` - List all opportunities
- `POST /api/generate-application` - Generate PDF application

## 🚀 Deployment Options

### Local Development
- Backend: `python main.py` (Port 8000)
- Frontend: `npm start` (Port 3000)

### Production Deployment
- **Backend**: Deploy to Heroku, AWS, or similar platform
- **Frontend**: Build with `npm run build` and deploy to Netlify, Vercel, or Firebase Hosting
- **Database**: Replace in-memory storage with PostgreSQL, MongoDB, or Firebase

## 🔮 Future Enhancements

- Real funding API integrations
- Advanced AI/ML matching algorithms
- User document upload and management
- Email notifications and reminders
- Multi-language support
- Advanced analytics and reporting
- Integration with banking APIs
- Mobile app development

## 🎪 Demo Presentation Tips

1. **Start with Login**: Show the simple authentication
2. **Profile Creation**: Demonstrate the form validation and data capture
3. **AI Matching**: Highlight the percentage scores and explanations
4. **PDF Generation**: Show the professional application draft
5. **Responsive Design**: Test on different screen sizes
6. **Loading States**: Show the professional loading indicators

## 🐛 Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend is running on port 8000
2. **Module Not Found**: Run `pip install -r requirements.txt` in backend
3. **React Build Errors**: Run `npm install` in frontend directory
4. **PDF Generation Issues**: Ensure ReportLab is properly installed

### Port Conflicts
- Backend default: 8000 (change in `main.py`)
- Frontend default: 3000 (React will prompt for alternative)

## 📝 License

This is a prototype/demo application. Feel free to use and modify for educational or commercial purposes.

## 👥 Contributors

Built for SMME funding accessibility and hackathon demonstrations.

---

**Ready for Demo!** 🎉

The application is fully functional and ready for hackathon presentations or investor demos. All features work end-to-end with realistic data and professional UI/UX.