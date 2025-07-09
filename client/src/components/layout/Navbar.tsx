// src/components/layout/Navbar.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700">
              <User className="h-5 w-5 ml-2" />
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 ml-1" />
              התנתקות
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;