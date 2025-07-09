// src/components/auth/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import Card from '../ui/Card';
import Logo from '../ui/Logo';
import GoogleLoginButton from './GoogleLoginButton';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      setLoading(false);
      return;
    }

    try {
      await register(email, password, name);
      console.log('User registered successfully:', { email, name });
      navigate('/documents');

    } catch (err: any) {
      setError(err.message);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
      console.log('Registration process completed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="justify-center" size="lg" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">הרשמה</h2>
          <p className="mt-2 text-gray-600">צור חשבון SmartDocs חדש</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="שם מלא"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="הכנס שם מלא"
          />

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

          <InputField
            label="אימות סיסמה"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="הכנס סיסמה שוב"
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
            הרשם
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
              כבר רשום?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                התחברות
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;