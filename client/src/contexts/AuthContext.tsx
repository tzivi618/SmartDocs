// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../lib/axios';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth חייב להיות בשימוש בתוך AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/me');
        setUser(response.data);
      } catch (error: any) {
        console.error('שגיאה בקבלת המשתמש הנוכחי:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      const user = response.data.user;
      if (!user) {
        throw new Error('שגיאה בהתחברות - נתונים חסרים');
      }
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'שגיאה בהתחברות');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', { email, password, name });
      const user = response.data.user;
      if (!user) {
        throw new Error('שגיאה בהרשמה - נתונים חסרים');
      }
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'שגיאה בהרשמה');
    }
  };

  const loginWithGoogle = async (token: string) => {
    try {
      const response = await axiosInstance.post('/api/auth/google', { token });
      const user = response.data.user;
      if (!user) {
        throw new Error('שגיאה בהתחברות עם Google - נתונים חסרים');
      }
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'שגיאה בהתחברות עם Google');
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.warn('שגיאה בניסיון להתנתק:', error);
      setUser(null);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await axiosInstance.patch('/api/auth/me', data);
      setUser(response.data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'שגיאה בעדכון פרופיל');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
