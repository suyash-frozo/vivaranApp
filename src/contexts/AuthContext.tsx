import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - create a demo user
    const mockUser: User = {
      id: 'demo-user-' + Date.now(),
      email,
      name,
    };
    setCurrentUser(mockUser);
    localStorage.setItem('demoUser', JSON.stringify(mockUser));
  };

  const login = async (email: string, password: string) => {
    // Mock login - create a demo user
    const mockUser: User = {
      id: 'demo-user-' + Date.now(),
      email,
      name: email.split('@')[0],
    };
    setCurrentUser(mockUser);
    localStorage.setItem('demoUser', JSON.stringify(mockUser));
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('demoUser');
  };

  useEffect(() => {
    // Check for existing demo user in localStorage
    const savedUser = localStorage.getItem('demoUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};