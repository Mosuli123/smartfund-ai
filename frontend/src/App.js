import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/modern-theme.css';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import ElidzAdminNavbar from './components/ElidzAdminNavbar';

import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import FundingOpportunities from './pages/FundingOpportunities';


import Applications from './pages/Applications';
import DocumentUpload from './pages/DocumentUpload';
import Notifications from './pages/Notifications';
import AdminReports from './pages/AdminReports';
import SupportCenter from './pages/SupportCenter';
import UserEngagement from './pages/UserEngagement';
import Register from './pages/Register';
import RoleSelection from './pages/RoleSelection';
import SMMERegister from './pages/SMMERegister';
import SMMELogin from './pages/SMMELogin';
import AdminRegister from './pages/AdminRegister';
import ElidzAdminLogin from './pages/ElidzAdminLogin';
import ElidzAdminDashboard from './pages/ElidzAdminDashboard';
import UserManagement from './pages/UserManagement';
import ApproveUsers from './pages/ApproveUsers';
import FundingAdminManagement from './pages/FundingAdminManagement';
import SystemAnalytics from './pages/SystemAnalytics';
import SystemReports from './pages/SystemReports';
import SystemConfiguration from './pages/SystemConfiguration';
import SecuritySettings from './pages/SecuritySettings';
import CompleteRegistration from './pages/CompleteRegistration';
import CreateOpportunity from './pages/CreateOpportunity';
import EditOpportunity from './pages/EditOpportunity';
import ReviewApplications from './pages/ReviewApplications';
import ManageOpportunities from './pages/ManageOpportunities';
import ApplicationStatus from './pages/ApplicationStatus';
import CIPCVerification from './pages/CIPCVerification';
import AIAssistant from './components/AIAssistant';
import AIAssistantButton from './components/AIAssistantButton';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isElidzAdminAuthenticated, setIsElidzAdminAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [elizAdmin, setElidzAdmin] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('admin');
    if (adminToken && adminData) {
      setIsAdminAuthenticated(true);
      setAdmin(JSON.parse(adminData));
    }
    
    // Check if ELIDZ admin is already logged in
    const elizAdminToken = localStorage.getItem('elizAdminToken');
    const elizAdminData = localStorage.getItem('elizAdmin');
    if (elizAdminToken && elizAdminData) {
      setIsElidzAdminAuthenticated(true);
      setElidzAdmin(JSON.parse(elizAdminData));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleAdminLogin = (adminData) => {
    setIsAdminAuthenticated(true);
    setAdmin(adminData);
    localStorage.setItem('adminToken', adminData.token);
    localStorage.setItem('admin', JSON.stringify(adminData));
  };

  const handleElidzAdminLogin = (elizAdminData) => {
    setIsElidzAdminAuthenticated(true);
    setElidzAdmin(elizAdminData);
    localStorage.setItem('elizAdminToken', elizAdminData.token);
    localStorage.setItem('elizAdmin', JSON.stringify(elizAdminData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
  };

  const handleElidzAdminLogout = () => {
    setIsElidzAdminAuthenticated(false);
    setElidzAdmin(null);
    localStorage.removeItem('elizAdminToken');
    localStorage.removeItem('elizAdmin');
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen" style={{background: 'linear-gradient(135deg, #fef7f0 0%, #f0f4f8 100%)'}}>
        {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
        {isAdminAuthenticated && <AdminNavbar admin={admin} onLogout={handleAdminLogout} />}
        {isElidzAdminAuthenticated && <ElidzAdminNavbar admin={elizAdmin} onLogout={handleElidzAdminLogout} />}
        
        <Routes>

          
          <Route 
            path="/smme/login" 
            element={
              !isAuthenticated ? 
              <SMMELogin onLogin={handleLogin} /> : 
              <Navigate to="/" replace />
            } 
          />
          
          <Route 
            path="/smme/register" 
            element={
              !isAuthenticated ? 
              <SMMERegister /> : 
              <Navigate to="/" replace />
            } 
          />
          
          <Route 
            path="/admin/register" 
            element={
              !isAdminAuthenticated ? 
              <AdminRegister /> : 
              <Navigate to="/admin/dashboard" replace />
            } 
          />
          
          <Route 
            path="/register" 
            element={
              !isAuthenticated ? 
              <Register /> : 
              <Navigate to="/" replace />
            } 
          />
          
          <Route 
            path="/complete-registration" 
            element={
              !isAuthenticated ? 
              <CompleteRegistration /> : 
              <Navigate to="/" replace />
            } 
          />
          
          <Route 
            path="/cipc-verification" 
            element={
              !isAuthenticated ? 
              <CIPCVerification /> : 
              <Navigate to="/" replace />
            } 
          />
          
          <Route 
            path="/admin/login" 
            element={
              !isAdminAuthenticated ? 
              <AdminLogin onAdminLogin={handleAdminLogin} /> : 
              <Navigate to="/admin/dashboard" replace />
            } 
          />
          
          <Route 
            path="/admin/dashboard" 
            element={
              isAdminAuthenticated ? 
              <AdminDashboard admin={admin} /> : 
              <Navigate to="/admin/login" replace />
            } 
          />
          
          <Route 
            path="/admin/create-opportunity" 
            element={
              isAdminAuthenticated ? 
              <CreateOpportunity /> : 
              <Navigate to="/admin/login" replace />
            } 
          />
          
          <Route 
            path="/admin/edit-opportunity/:id" 
            element={
              isAdminAuthenticated ? 
              <EditOpportunity /> : 
              <Navigate to="/admin/login" replace />
            } 
          />
          
          <Route 
            path="/admin/review-applications" 
            element={
              isAdminAuthenticated ? 
              <ReviewApplications /> : 
              <Navigate to="/admin/login" replace />
            } 
          />
          
          <Route 
            path="/admin/manage-opportunities" 
            element={
              isAdminAuthenticated ? 
              <ManageOpportunities /> : 
              <Navigate to="/admin/login" replace />
            } 
          />
          
          <Route 
            path="/admin/reports" 
            element={
              isAdminAuthenticated ? 
              <AdminReports admin={admin} /> : 
              <Navigate to="/admin/login" replace />
            } 
          />
          
          <Route 
            path="/elidz-admin/login" 
            element={
              !isElidzAdminAuthenticated ? 
              <ElidzAdminLogin onElidzAdminLogin={handleElidzAdminLogin} /> : 
              <Navigate to="/elidz-admin/dashboard" replace />
            } 
          />
          
          <Route 
            path="/elidz-admin/dashboard" 
            element={
              isElidzAdminAuthenticated ? 
              <ElidzAdminDashboard admin={elizAdmin} /> : 
              <Navigate to="/elidz-admin/login" replace />
            } 
          />
          
          <Route 
            path="/elidz-admin/user-management" 
            element={
              isElidzAdminAuthenticated ? 
              <UserManagement /> : 
              <Navigate to="/elidz-admin/login" replace />
            } 
          />
          
          <Route 
            path="/elidz-admin/approve-users" 
            element={
              isElidzAdminAuthenticated ? 
              <ApproveUsers /> : 
              <Navigate to="/elidz-admin/login" replace />
            } 
          />
          
          <Route 
            path="/elidz-admin/funding-admins" 
            element={
              isElidzAdminAuthenticated ? 
              <FundingAdminManagement /> : 
              <Navigate to="/elidz-admin/login" replace />
            } 
          />
          
          <Route 
            path="/elidz-admin/analytics" 
            element={
              isElidzAdminAuthenticated ? 
              <SystemAnalytics /> : 
              <Navigate to="/elidz-admin/login" replace />
            } 
          />
          
          <Route 
            path="/elidz-admin/reports" 
            element={
              isElidzAdminAuthenticated ? 
              <SystemReports /> : 
              <Navigate to="/elidz-admin/login" replace />
            } 
          />
          
          <Route 
            path="/elidz-admin/system-config" 
            element={
              isElidzAdminAuthenticated ? 
              <SystemConfiguration /> : 
              <Navigate to="/elidz-admin/login" replace />
            } 
          />
          
          <Route 
            path="/elidz-admin/security" 
            element={
              isElidzAdminAuthenticated ? 
              <SecuritySettings /> : 
              <Navigate to="/elidz-admin/login" replace />
            } 
          />
          
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
                user?.role === 'admin' ? 
                  <Navigate to="/admin/dashboard" replace /> :
                  <Home user={user} /> :
              <RoleSelection />
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
              <Profile user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/funding-opportunities" 
            element={
              isAuthenticated ? 
              <FundingOpportunities user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/applications" 
            element={
              isAuthenticated ? 
              <Applications user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/application-status" 
            element={
              isAuthenticated ? 
              <ApplicationStatus user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/documents" 
            element={
              isAuthenticated ? 
              <DocumentUpload user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/notifications" 
            element={
              isAuthenticated ? 
              <Notifications user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/support" 
            element={
              isAuthenticated ? 
              <SupportCenter user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/user-engagement" 
            element={
              isAuthenticated ? 
              <UserEngagement user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          

          

        </Routes>
        
        {/* AI Assistant */}
        {isAuthenticated && (
          <>
            <AIAssistantButton onClick={() => setShowAIAssistant(true)} />
            <AIAssistant 
              user={user} 
              isOpen={showAIAssistant} 
              onClose={() => setShowAIAssistant(false)} 
            />
          </>
        )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;