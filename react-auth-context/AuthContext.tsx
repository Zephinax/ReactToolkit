import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      Cookies.get('busnetStoreAccessToken') !== undefined ||
      localStorage.getItem('isAuthenticated') === 'true'
    );
  });

  const login = (token: string, rememberMe: boolean) => {
    setIsAuthenticated(true);
    Cookies.set('busnetStoreAccessToken', token, {
      expires: rememberMe ? 7 : undefined,
    });
    if (rememberMe) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      sessionStorage.setItem('isAuthenticated', 'true');
      localStorage.removeItem('isAuthenticated');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    Cookies.remove('busnetStoreAccessToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; /* eslint-disable react-refresh/only-export-components */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
