import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Landing from './Components/Landing';
import AuthPage from './Components/AuthPage';
import EmailVerification from './Components/EmailVerification';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
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
import StudentProgress from './Components/StudentProgress';
import MentorProfile from './Components/MentorProfile';
import MentorSettings from './Components/MentorSettings';

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
            <Route path="/auth/verify-email" element={<EmailVerification />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/competitions" element={<CompetitionsPage />} />
            <Route path="/competitions/:id" element={<CompetitionDetails />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
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
              path="/team/new/:id"
              element={
                <ProtectedRoute>
                  <TeamCreate />
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
              path="/team/:id"
              element={
                <ProtectedRoute>
                  <TeamDetails />
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
              path="/mentor/teams"
              element={
                <ProtectedMentorRoute>
                  <MentorDashboard activeTab="teams" />
                </ProtectedMentorRoute>
              }
            />
            <Route
              path="/mentor/team/:teamId"
              element={
                <ProtectedRoute>
                  <TeamDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentor/profile"
              element={
                <ProtectedMentorRoute>
                  <MentorProfile />
                </ProtectedMentorRoute>
              }
            />
            <Route
              path="/mentor/settings"
              element={
                <ProtectedMentorRoute>
                  <MentorSettings />
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
            <Route
              path="/student-progress"
              element={
                <ProtectedAdminRoute>
                  <StudentProgress />
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