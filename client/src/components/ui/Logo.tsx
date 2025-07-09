// src/components/ui/Logo.tsx
import React from 'react';
import { FileText } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg ml-3">
        <FileText className={`text-white ${iconSizes[size]}`} />
      </div>
      <span className={`font-bold text-gray-800 mr-3 ${sizes[size]}`}>
        SmartDocs
      </span>
    </div>
  );
};

export default Logo;