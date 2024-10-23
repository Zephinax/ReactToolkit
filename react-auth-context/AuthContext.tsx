import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, userData: UserProfile, rememberMe: boolean) => void;
  logout: () => void;
  user?: UserProfile;
}

interface UserProfile {
  id: string;
  email: string;
  roles: string[];
}

const COOKIE_OPTIONS = {
  secure: true,
  sameSite: 'strict' as const,
  path: '/',
  expires: 7,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    validateAuth();
  }, []);

  const validateAuth = () => {
    const token = Cookies.get('AccessToken');
    const persistedAuth = localStorage.getItem('isAuthenticated');
    const sessionAuth = sessionStorage.getItem('isAuthenticated');

    if (!token) {
      logout();
      return;
    }

    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
      setIsAuthenticated(true);
    } catch (error) {
      logout();
    }
  };

  const login = (token: string, userData: UserProfile, rememberMe: boolean) => {
    setIsAuthenticated(true);

    Cookies.set('AccessToken', token, {
      ...COOKIE_OPTIONS,
      expires: rememberMe ? 7 : undefined,
    });

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    if (rememberMe) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      sessionStorage.setItem('isAuthenticated', 'true');
      localStorage.removeItem('isAuthenticated');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    sessionStorage.removeItem('isAuthenticated');
    Cookies.remove('AccessToken', { ...COOKIE_OPTIONS });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
