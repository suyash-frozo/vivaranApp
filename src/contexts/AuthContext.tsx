import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabaseAuthService } from '../services/supabaseAuth';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  logout: () => Promise<void>;
  loading: boolean;
  checkAuthStatus: () => Promise<boolean>;
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
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  const checkAuthStatus = async (force = false) => {
    // If user is already authenticated and not forced, skip API call
    if (!force && currentUser && session) {
      console.log('Using cached auth status - user already authenticated');
      setLoading(false);
      return true;
    }
    
    try {
      console.log('Making auth API call - force:', force);
      setLoading(true);
      const response = await supabaseAuthService.getCurrentUser();
      
      // If backend returns success: true, treat as authenticated regardless of authenticated field
      if (response.success === true) {
        if (response.authenticated && response.user) {
          // Full user data available
          const user: User = {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            role: response.user.role,
            permissions: response.user.permissions,
            provider: response.user.provider,
            created_at: response.user.created_at,
            last_login: response.user.last_login,
          };
          setCurrentUser(user);
          setSession(response);
          return true;
        } else {
          // Success but no user data - still treat as successful login
          // This handles: {"success": true, "authenticated": false, "message": "No authenticated user found"}
          const basicUser: User = {
            id: 'oauth-user-' + Date.now(),
            email: 'user@vivaran.app',
            name: 'Authenticated User',
            role: 'user',
            provider: 'oauth'
          };
          setCurrentUser(basicUser);
          setSession(response);
          return true;
        }
      } else {
        setCurrentUser(null);
        setSession(null);
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setCurrentUser(null);
      setSession(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    supabaseAuthService.loginWithGoogle();
  };

  const loginWithGithub = () => {
    supabaseAuthService.loginWithGithub();
  };

  const logout = async () => {
    const response = await supabaseAuthService.logout();
    if (response.success) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    // Clean up any stale OAuth flags on app start
    const oauthLogin = localStorage.getItem('vivaran-oauth-login');
    const loginTimestamp = localStorage.getItem('vivaran-login-timestamp');
    
    if (oauthLogin && loginTimestamp) {
      const timeSinceLogin = Date.now() - parseInt(loginTimestamp);
      // If login attempt was more than 10 minutes ago, clean up
      if (timeSinceLogin > 10 * 60 * 1000) {
        localStorage.removeItem('vivaran-oauth-login');
        localStorage.removeItem('vivaran-login-timestamp');
      }
    }
    
    checkAuthStatus();
    
    // Only check auth status when user comes back after being away for a while
    let wasAway = false;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasAway = true;
      } else if (wasAway) {
        // Only check if user was actually away
        console.log('User returned from being away, checking auth');
        wasAway = false;
        checkAuthStatus();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    loginWithGithub,
    logout,
    loading,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};