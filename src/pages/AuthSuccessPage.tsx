import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AuthSuccessPage: React.FC = () => {
  const [status, setStatus] = useState('Completing authentication...');
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  const verifyAuthentication = async (attempt = 1) => {
    try {
      setError(false);
      setStatus(`Verifying authentication... (${attempt}/3)`);
      
      // Wait for cookies to be properly set
      const waitTime = attempt === 1 ? 2000 : 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      // Call backend to verify authentication
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://endearing-prosperity-production.up.railway.app';
      const response = await fetch(`${API_BASE}/auth/supabase/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Auth verification response:', data);
      
      // Check if authentication was successful
      if (data.success === true) {
        setStatus('Authentication successful! Redirecting to dashboard...');
        
        // Update auth context with the verified user
        await checkAuthStatus();
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);
        
        return true;
      } else {
        throw new Error(data.message || 'Authentication verification failed');
      }
      
    } catch (err) {
      console.error(`Auth verification attempt ${attempt} failed:`, err);
      
      if (attempt < 3) {
        // Retry up to 3 times
        setStatus(`Authentication check failed. Retrying... (${attempt + 1}/3)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return verifyAuthentication(attempt + 1);
      } else {
        // All retries failed
        setError(true);
        setStatus('Authentication verification failed. Please try again.');
        setRetryCount(prev => prev + 1);
        return false;
      }
    }
  };

  const handleRetry = () => {
    setError(false);
    setRetryCount(0);
    verifyAuthentication(1);
  };

  const handleGoToLogin = () => {
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    // Start authentication verification when component mounts
    verifyAuthentication(1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
        {/* Logo */}
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-bold text-white">V</span>
        </div>
        
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {error ? (
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white text-center mb-4">
          {error ? 'Authentication Failed' : 'Completing Authentication'}
        </h1>
        
        {/* Status Message */}
        <p className="text-white/80 text-center mb-6 text-sm leading-relaxed">
          {status}
        </p>
        
        {/* Loading Indicator */}
        {!error && (
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
        
        {/* Error Actions */}
        {error && (
          <div className="space-y-3">
            <button 
              onClick={handleRetry}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Retry Authentication
            </button>
            <button 
              onClick={handleGoToLogin}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Back to Login
            </button>
            
            {retryCount > 2 && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-200 text-sm text-center">
                  Having trouble? Try logging in again or contact support.
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Success Indicator */}
        {status.includes('successful') && (
          <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p className="text-green-200 text-sm text-center">
              ✓ Authentication verified successfully
            </p>
          </div>
        )}
      </div>
    </div>
  );
};