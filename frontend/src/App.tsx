import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './store';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import BookListPage from './pages/books/BookListPage';
import BookDetailPage from './pages/books/BookDetailPage';
import AddBookPage from './pages/books/AddBookPage';
import EditBookPage from './pages/books/EditBookPage';
import NotFoundPage from './pages/NotFoundPage';

// Import components
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              padding: '1rem',
            },
            success: {
              style: {
                border: '1px solid #34a853',
              },
            },
            error: {
              style: {
                border: '1px solid #ea4335',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="books" element={<BookListPage />} />
              <Route path="books/:id" element={<BookDetailPage />} />
              <Route path="books/add" element={<AddBookPage />} />
              <Route path="books/:id/edit" element={<EditBookPage />} />
            </Route>
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;