// src/components/layout/Layout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Upload, User } from 'lucide-react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'המסמכים שלי', href: '/documents', icon: FileText },
    { name: 'העלאת מסמך', href: '/upload', icon: Upload },
    { name: 'הפרופיל שלי', href: '/profile', icon: User },
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200">
          <nav className="mt-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const linkClasses = isActive
                ? 'flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                : 'flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 text-gray-700 hover:bg-gray-50';
              const Icon = item.icon;
              const iconClasses = `h-5 w-5 ml-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`;

              return (
                <Link
                  key={item.name}
                  to={item.href} className={linkClasses}
                >
                  <Icon className={iconClasses} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;