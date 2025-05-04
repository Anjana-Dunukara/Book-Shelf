import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, Plus, BookOpen, Trash2, Edit, Info } from 'lucide-react';
import toast from 'react-hot-toast';

import { fetchBooks, deleteBook } from '../../store/slices/bookSlice';
import { RootState } from '../../store';
import Spinner from '../../components/shared/Spinner';
import Button from '../../components/shared/Button';

const BookListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDeleteConfirm = (id: string) => {
    setConfirmDelete(id);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBook(id));
    setConfirmDelete(null);
    toast.success('Book deleted successfully');
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  // Extract unique genres for filter dropdown
  const genres = [...new Set(books.map(book => book.genre))].sort();

  // Filter books based on search term and genre
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    return matchesSearch && matchesGenre;
  });

  if (loading && books.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">My Book Collection</h1>
        <Link to="/books/add" className="btn-primary inline-flex items-center">
          <Plus className="mr-2 h-5 w-5" />
          Add New Book
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title or author..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="sm:w-48">
          <select
            className="input"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="card p-8 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No books found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {books.length === 0 
              ? "You haven't added any books to your collection yet." 
              : "No books match your current search filters."}
          </p>
          {books.length === 0 && (
            <Link to="/books/add" className="btn-primary inline-flex items-center justify-center">
              <Plus className="mr-2 h-5 w-5" />
              Add Your First Book
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div key={book._id} className="card overflow-hidden transition-shadow hover:shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {book.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  by <span className="font-medium">{book.author}</span>
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 rounded-full text-xs font-medium">
                    {book.genre}
                  </span>
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-xs font-medium">
                    {new Date(book.publicationDate).getFullYear()}
                  </span>
                </div>
                
                {confirmDelete === book._id ? (
                  <div className="p-4 bg-error-50 dark:bg-error-900 rounded-lg mb-4">
                    <p className="text-sm text-error-700 dark:text-error-300 mb-3">
                      Are you sure you want to delete this book?
                    </p>
                    <div className="flex space-x-3">
                      <Button 
                        variant="danger" 
                        onClick={() => handleDelete(book._id)}
                        size="sm"
                      >
                        Delete
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={handleCancelDelete}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between mt-4">
                    <Link to={`/books/${book._id}`} className="btn-ghost inline-flex items-center text-sm">
                      <Info className="mr-1 h-4 w-4" />
                      Details
                    </Link>
                    <div className="flex space-x-2">
                      <Link to={`/books/${book._id}/edit`} className="btn-ghost text-primary-500 inline-flex items-center text-sm">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteConfirm(book._id)}
                        className="btn-ghost text-error-500 inline-flex items-center text-sm"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookListPage;