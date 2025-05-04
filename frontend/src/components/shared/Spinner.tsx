import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', className = '' }) => {
  const sizeClass = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className={`animate-spin ${sizeClass[size]} text-primary-500`} />
    </div>
  );
};

export default Spinner;