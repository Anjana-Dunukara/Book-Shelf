import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClass = `btn-${variant}`;
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClass} ${widthClass} ${className} ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;