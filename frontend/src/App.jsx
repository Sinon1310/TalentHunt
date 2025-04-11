import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Landing from './Components/Landing';
import AuthPage from './Components/AuthPage';
import Dashboard from './Components/Dashboard';
import CompetitionDetails from './Components/CompetitionDetails';
import ProfileSettings from './Components/ProfileSettings';
import TeamManagement from './Components/TeamManagement';
import MentorDashboard from './Components/MentorDashboard';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import CompetitionsPage from './Components/CompetitionsPage';
import MentorshipPage from './Components/MentorshipPage';
import CalendarPage from './Components/CalenderPage';
import TeamDetails from './Components/TeamDetails';
import TeamCreate from './Components/TeamCreate';
import AdminTeams from './Components/AdminTeams';
import AdminCompetitions from './Components/AdminCompetitions';

// Context Providers
import { UserProvider } from './Contexts/UserContext';
import { AdminAuthProvider } from './Contexts/AdminAuthContext';

// Protected Routes
import ProtectedRoute from './Components/ProtectedRoute';
import ProtectedAdminRoute from './Components/ProtectedAdminRoute';
import ProtectedMentorRoute from './Components/ProtectedMentorRoute';

function App() {
  return (
    <UserProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminLogin />} />

            {/* General Protected Routes (requires login) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/competition/:id"
              element={
                <ProtectedRoute>
                  <CompetitionDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-team/:id"
              element={
                <ProtectedRoute>
                  <TeamManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/competitions"
              element={
                <ProtectedRoute>
                  <CompetitionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/team/create/:id"
              element={
                <ProtectedRoute>
                  <TeamCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentorship"
              element={
                <ProtectedRoute>
                  <MentorshipPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />

            {/* Mentor Protected Routes */}
            <Route
              path="/mentor"
              element={
                <ProtectedMentorRoute>
                  <MentorDashboard />
                </ProtectedMentorRoute>
              }
            />
            <Route
              path="/mentor/team/:teamId"
              element={
                <ProtectedMentorRoute>
                  <TeamDetails />
                </ProtectedMentorRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/teams"
              element={
                <ProtectedAdminRoute>
                  <AdminTeams />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/competitions"
              element={
                <ProtectedAdminRoute>
                  <AdminCompetitions />
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
