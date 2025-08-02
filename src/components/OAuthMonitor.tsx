import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabaseAuthService } from '../services/supabaseAuth';

export const OAuthMonitor: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Monitor for OAuth completion
    const checkOAuthCompletion = async () => {
      // Check if we have pending OAuth login
      const pendingLogin = localStorage.getItem('vivaran-oauth-login');
      const loginTimestamp = localStorage.getItem('vivaran-login-timestamp');
      
      if (pendingLogin === 'true' && loginTimestamp) {
        const timeSinceLogin = Date.now() - parseInt(loginTimestamp);
        
        // If login attempt was recent (within 10 minutes)
        if (timeSinceLogin < 10 * 60 * 1000) {
          try {
            console.log('Checking OAuth completion...');
            
            // Check authentication status
            const response = await supabaseAuthService.getCurrentUser();
            console.log('OAuth check response:', response);
            
            if (response.success === true) {
              // OAuth was successful, clear flag and redirect
              localStorage.removeItem('vivaran-oauth-login');
              localStorage.removeItem('vivaran-login-timestamp');
              
              console.log('OAuth completion detected! Redirecting to dashboard...');
              
              // Only redirect if not already on dashboard
              if (location.pathname !== '/dashboard') {
                navigate('/dashboard', { replace: true });
              }
            }
          } catch (error) {
            console.error('Error checking OAuth completion:', error);
          }
        } else {
          // Clean up old flags
          console.log('Cleaning up old OAuth flags');
          localStorage.removeItem('vivaran-oauth-login');
          localStorage.removeItem('vivaran-login-timestamp');
        }
      }
    };

    // Check immediately when component mounts
    checkOAuthCompletion();

    // Set up polling every 3 seconds to check for OAuth completion
    const intervalId = setInterval(checkOAuthCompletion, 3000);

    // Check when window gains focus (user comes back from OAuth)
    const handleFocus = () => {
      setTimeout(checkOAuthCompletion, 1000); // Small delay to ensure cookies are processed
    };

    // Check when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(checkOAuthCompletion, 1000);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [navigate, location.pathname]);

  return null; // This component doesn't render anything
};