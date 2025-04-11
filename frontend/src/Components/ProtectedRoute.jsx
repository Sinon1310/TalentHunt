import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useUser();

  if (!user) {
    // Not logged in
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
