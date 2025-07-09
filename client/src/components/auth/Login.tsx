// src/components/auth/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import Card from '../ui/Card';
import Logo from '../ui/Logo';
import GoogleLoginButton from './GoogleLoginButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      console.log('User logged in successfully:', { email });
      navigate('/documents');
    } catch (err: any) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
      console.log('Login process completed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="justify-center" size="lg" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">התחברות</h2>
          <p className="mt-2 text-gray-600">היכנס לחשבון SmartDocs שלך</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="כתובת אימייל"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@gmail.com"
          />

          <InputField
            label="סיסמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="הכנס סיסמה"
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-right">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            התחבר
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">או</span>
            </div>
          </div>

          <GoogleLoginButton />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              עוד לא רשום?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                הרשמה
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;