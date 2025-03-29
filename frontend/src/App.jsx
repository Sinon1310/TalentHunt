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
import ProtectedMentorRoute from './Components/ProtectedMentorRoute';
import { AdminAuthProvider } from './Contexts/AdminAuthContext';
import CompetitionsPage from './Components/CompetitionsPage';
import MentorshipPage from './Components/MentorshipPage';
import CalendarPage from './Components/CalenderPage';
import { UserProvider } from './Contexts/UserContext';
import TeamDetails from './Components/TeamDetails';

function App() {
  return (
    <UserProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/competition/:id" element={<CompetitionDetails />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/manage-team/:id" element={<TeamManagement />} />
            
            {/* Protected Mentor Routes */}
            <Route path="/mentor/team/:teamId" element={
              <ProtectedMentorRoute>
                <TeamDetails />
              </ProtectedMentorRoute>
            } />
            <Route path="/mentor" element={
              <ProtectedMentorRoute>
                <MentorDashboard />
              </ProtectedMentorRoute>
            } />
            
            <Route path="/competitions" element={<CompetitionsPage />} />
            <Route path="/mentorship" element={<MentorshipPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            
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
    </UserProvider>
  );
}

export default App;