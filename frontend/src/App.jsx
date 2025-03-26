import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import AuthPage from './Components/AuthPage';
import Dashboard from './Components/Dashboard';
import CompetitionDetails from './Components/CompetitionDetails';
import ProfileSettings from './Components/ProfileSettings';
import TeamManagement from './Components/TeamManagement';
import MentorDashboard from './Components/MentorDashboard';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import ProtectedAdminRoute from './Components/ProtectedAdminRoute';
import { AdminAuthProvider } from './Contexts/AdminAuthContext';

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/competition/:id" element={<CompetitionDetails />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/team/:id" element={<TeamManagement />} />
          <Route path="/mentor" element={<MentorDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;