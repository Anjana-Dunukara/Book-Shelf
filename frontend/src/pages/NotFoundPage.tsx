import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 fade-in">
      <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/"
          className="btn-primary inline-flex items-center"
        >
          <HomeIcon className="h-5 w-5 mr-2" />
          Go to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="btn-ghost inline-flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;