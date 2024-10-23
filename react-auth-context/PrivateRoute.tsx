import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectPath = '/',
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectPath} replace />
  );
};

export default PrivateRoute;
