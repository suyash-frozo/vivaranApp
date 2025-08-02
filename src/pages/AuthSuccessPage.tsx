import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AuthSuccessPage: React.FC = () => {
  const [status, setStatus] = useState('Verifying authentication...');
  const [error, setError] = useState(false);
  const { checkAuthStatus, currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        setStatus('Verifying authentication...');
        
        // Wait a moment for cookies to be set
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check the backend response
        const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://endearing-prosperity-production.up.railway.app';
        const response = await fetch(`${API_BASE}/auth/supabase/user`, {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        // If we get success: true, redirect to dashboard regardless of authenticated status
        if (data.success === true) {
          setStatus('Login successful! Redirecting to dashboard...');
          
          // Also update auth context
          await checkAuthStatus();
          
          // Redirect to dashboard
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          // If not successful, redirect to login
          setError(true);
          setStatus('Authentication failed. Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
        
      } catch (err) {
        console.error('Error verifying authentication:', err);
        setError(true);
        setStatus('Unable to verify authentication.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleAuthSuccess();
  }, [checkAuthStatus, navigate]);

  // If user is already loaded and authenticated, redirect immediately
  useEffect(() => {
    if (!loading && currentUser) {
      navigate('/dashboard');
    } else if (!loading && !currentUser) {
      // If not authenticated after loading, redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [currentUser, loading, navigate]);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0,
      color: 'white'
    }}>
      <div style={{
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        maxWidth: '400px',
        width: '90%'
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
          fontWeight: 'bold',
          color: 'white'
        }}>
          V
        </div>
        
        {!error && (
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            animation: 'checkmark 0.6s ease-in-out'
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
        )}
        
        <h1 style={{
          margin: '20px 0 10px',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          {error ? 'Authentication Error' : 'Authentication Successful!'}
        </h1>
        
        <p style={{
          margin: '10px 0 30px',
          opacity: 0.9,
          fontSize: '16px'
        }}>
          {status}
        </p>
        
        {!error && (
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        )}
        
        {error && (
          <div style={{
            color: '#ef4444',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '15px',
            marginTop: '20px'
          }}>
            <button 
              onClick={() => navigate('/dashboard')}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes checkmark {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};