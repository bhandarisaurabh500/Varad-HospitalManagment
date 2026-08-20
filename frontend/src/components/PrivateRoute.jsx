import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute: redirects to /login if user is not authenticated.
 * @param {string[]} roles - Optional array of allowed roles. If empty, any auth user is allowed.
 */
const PrivateRoute = ({ children, roles = [] }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    // Redirect to the appropriate dashboard
    if (user.role === 'ADMIN')   return <Navigate to="/admin/dashboard"   replace />;
    if (user.role === 'DOCTOR')  return <Navigate to="/doctor/dashboard"  replace />;
    if (user.role === 'PATIENT') return <Navigate to="/patient/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
