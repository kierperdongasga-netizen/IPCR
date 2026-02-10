import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 backdrop-blur-sm";
  
  // PSU Colors: Primary (Blue), Secondary (White/Glass), Danger (Red)
  const variants = {
    primary: "border border-transparent text-white bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-blue-900/30 focus:ring-blue-500",
    secondary: "border border-white/50 text-gray-700 bg-white/60 hover:bg-white/80 hover:shadow-md focus:ring-blue-500",
    danger: "border border-transparent text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-red-900/30 focus:ring-red-500",
    ghost: "border-transparent text-blue-700 hover:bg-blue-50/50 focus:ring-blue-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};