import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  target?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  href, 
  variant = 'primary', 
  className = '',
  target = '_self'
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-rose-600 hover:shadow-lg",
    secondary: "bg-secondary text-white hover:bg-lime-600 hover:shadow-lg",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedStyles} target={target} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
};