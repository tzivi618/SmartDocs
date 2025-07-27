// src/components/GoogleLoginButton.tsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;

      // Optional: decode token if you want user info right away
      const decoded: any = jwtDecode(idToken);
      console.log('Decoded Google user:', decoded);

      const response = await api.post('/auth/google-login', {
        idToken,
      });

      // Server should return the user object
      const user = response.data.user;
      setUser(user); // Save to context
      navigate('/documents');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleError = () => {
    console.error('Google login failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap={false}
    />
  );
};
