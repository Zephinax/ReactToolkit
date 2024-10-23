import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectPath = '/',
}) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a check for loading purposes
    const checkAuth = async () => {
      // Your logic to check auth status
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return isAuthenticated ? <>{children}</> : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
