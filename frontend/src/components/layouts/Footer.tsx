import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-4">
            <BookOpen className="h-6 w-6 text-primary-500" />
            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">BookShelf</span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Manage your reading collection with ease
          </p>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
            <span>© {currentYear} BookShelf. Made with</span>
            <Heart className="h-4 w-4 mx-1 text-error-500" />
            <span>for book lovers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;