// src/components/ui/InputField.tsx
import React from 'react';
import { cn } from '../../lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          {label}
        </label>
      )}
      <input
        className={cn(
          'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-right',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 text-right">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 text-right">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;