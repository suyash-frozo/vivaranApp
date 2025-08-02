import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthInstructionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
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

        <h1 style={{ color: '#1f2937', marginBottom: '20px' }}>
          Almost There!
        </h1>

        <p style={{ color: '#6b7280', marginBottom: '30px', lineHeight: '1.6' }}>
          Your Google login was successful! Due to a redirect configuration, 
          please click the button below to access your dashboard.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
        >
          Go to Dashboard
        </button>

        <p style={{ 
          color: '#9ca3af', 
          fontSize: '14px',
          marginTop: '20px',
          fontStyle: 'italic'
        }}>
          This extra step will be removed once the backend redirect is configured.
        </p>
      </div>
    </div>
  );
};