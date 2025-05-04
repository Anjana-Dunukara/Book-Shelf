import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2, Calendar, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

import { fetchBook, deleteBook, clearCurrentBook } from '../../store/slices/bookSlice';
import { RootState } from '../../store';
import Spinner from '../../components/shared/Spinner';
import Button from '../../components/shared/Button';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { book, loading, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (id) {
      dispatch(fetchBook(id));
    }
    
    // Cleanup function to clear the current book when component unmounts
    return () => {
      dispatch(clearCurrentBook());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate('/books');
    }
  }, [error, navigate]);

  const handleDelete = () => {
    if (id && window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(id));
      toast.success('Book deleted successfully');
      navigate('/books');
    }
  };

  if (loading || !book) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="large" />
      </div>
    );
  }

  // Format the publication date
  const formattedDate = new Date(book.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fade-in">
      <Link to="/books" className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Books
      </Link>
      
      <div className="card p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
              by <span className="font-medium">{book.author}</span>
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Link to={`/books/${book._id}/edit`} className="btn-primary inline-flex items-center">
              <Edit className="mr-2 h-5 w-5" />
              Edit Book
            </Link>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="inline-flex items-center"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Delete
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                About this Book
              </h2>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Published on {formattedDate}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>Genre: {book.genre}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Book Details
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Title</dt>
                <dd className="text-gray-900 dark:text-white font-medium">{book.title}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Author</dt>
                <dd className="text-gray-900 dark:text-white font-medium">{book.author}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Genre</dt>
                <dd className="text-gray-900 dark:text-white font-medium">{book.genre}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Publication Date</dt>
                <dd className="text-gray-900 dark:text-white font-medium">{formattedDate}</dd>
              </div>
              {book.createdAt && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Added to Library</dt>
                  <dd className="text-gray-900 dark:text-white font-medium">
                    {new Date(book.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;