import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OAuthCallbackPage: React.FC = () => {
  const [status, setStatus] = useState('Checking authentication...');
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        setStatus('Verifying login...');
        
        // Check if we came from OAuth
        const oauthLogin = localStorage.getItem('vivaran-oauth-login');
        
        if (oauthLogin === 'true') {
          // Wait for cookies to be processed
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Check backend response
          const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://endearing-prosperity-production.up.railway.app';
          const response = await fetch(`${API_BASE}/auth/supabase/user`, {
            credentials: 'include'
          });
          
          const data = await response.json();
          console.log('OAuth response:', data);
          
          // If success is true, go to dashboard regardless of authenticated status  
          if (data.success === true) {
            setStatus('Login successful! Redirecting to dashboard...');
            
            // Clean up OAuth flags
            localStorage.removeItem('vivaran-oauth-login');
            localStorage.removeItem('vivaran-login-timestamp');
            
            // Force redirect to dashboard
            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 1000);
            
          } else {
            setStatus('Login failed. Redirecting to login page...');
            setTimeout(() => {
              navigate('/login', { replace: true });
            }, 2000);
          }
        } else {
          // No OAuth in progress, redirect to home
          navigate('/', { replace: true });
        }
        
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('Error occurred. Redirecting to login...');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      <div style={{
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '32px',
          fontWeight: 'bold'
        }}>
          V
        </div>
        
        <h1 style={{ margin: '20px 0' }}>Processing Login</h1>
        <p style={{ marginBottom: '20px' }}>{status}</p>
        
        <div style={{
          width: '32px',
          height: '32px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};