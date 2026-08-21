import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute: redirects to /admin/login if user is not authenticated.
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/admin/login" replace />;

  return children;
};

export default PrivateRoute;
