import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRouteElement = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
