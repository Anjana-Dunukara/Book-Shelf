import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Library, UserPlus, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Manage Your <span className="text-primary-500">Book Collection</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          A simple and elegant way to organize, track, and discover books in your personal library.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <>
              <Link to="/books" className="btn-primary text-lg px-6 py-3">
                View My Books
              </Link>
              <Link to="/books/add" className="btn-secondary text-lg px-6 py-3">
                Add New Book
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn-primary text-lg px-6 py-3">
                Get Started
              </Link>
              <Link to="/login" className="btn-ghost text-lg px-6 py-3">
                Log In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-12 sm:py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card p-6 transition-transform hover:scale-105">
            <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BookOpen className="text-primary-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Organize Books
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Categorize and manage your book collection with ease. Add details like author, genre, and publication date.
            </p>
          </div>

          <div className="card p-6 transition-transform hover:scale-105">
            <div className="rounded-full bg-secondary-100 dark:bg-secondary-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Library className="text-secondary-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Digital Library
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create your own digital library. Keep track of books you own, have read, or want to read.
            </p>
          </div>

          <div className="card p-6 transition-transform hover:scale-105">
            <div className="rounded-full bg-accent-100 dark:bg-accent-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Search className="text-accent-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Easy Search
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Quickly find books in your collection with powerful search and filtering options.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-12 sm:py-16 text-center bg-primary-50 dark:bg-gray-900 rounded-xl p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to start organizing your books?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Join BookShelf today and create your personal digital library.
          </p>
          <Link to="/register" className="btn-primary inline-flex items-center text-lg px-6 py-3">
            <UserPlus className="mr-2 h-5 w-5" />
            Sign Up for Free
          </Link>
        </section>
      )}
    </div>
  );
};

export default HomePage;