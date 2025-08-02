import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page since we're using OAuth authentication
    navigate('/login');
  }, [navigate]);

  return null; // Redirects to login page
};