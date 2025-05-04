import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookUp } from 'lucide-react';
import toast from 'react-hot-toast';

import { fetchBook, updateBook, clearBookError } from '../../store/slices/bookSlice';
import { RootState } from '../../store';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import Spinner from '../../components/shared/Spinner';

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
  });
  
  const [errors, setErrors] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { book, loading, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    // Clear any previous book errors
    dispatch(clearBookError());
    
    // Fetch the book data
    if (id) {
      dispatch(fetchBook(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    // Populate form data when book is loaded
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationDate: book.publicationDate.split('T')[0], // Format date for input
      });
    }
  }, [book]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: '',
      author: '',
      genre: '',
      publicationDate: '',
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
      valid = false;
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
      valid = false;
    }

    if (!formData.publicationDate) {
      newErrors.publicationDate = 'Publication date is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && id) {
      dispatch(updateBook({ id, bookData: formData }))
        .unwrap()
        .then(() => {
          toast.success('Book updated successfully');
          navigate(`/books/${id}`);
        })
        .catch(() => {
          // Error is handled by the error effect
        });
    }
  };

  if (loading && !book) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="large" />
      </div>
    );
  }

  // Genre options for dropdown
  const genreOptions = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Thriller',
    'Romance',
    'History',
    'Biography',
    'Self-Help',
    'Business',
    'Technology',
    'Science',
    'Philosophy',
    'Poetry',
    'Drama',
    'Horror',
    'Children',
    'Young Adult',
    'Other',
  ];

  return (
    <div className="fade-in">
      <Link to={`/books/${id}`} className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Book Details
      </Link>
      
      <div className="card p-8">
        <div className="flex items-center mb-6">
          <BookUp className="h-8 w-8 text-primary-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Book</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <Input
              label="Title"
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              error={errors.title}
              disabled={loading}
              required
            />
            
            <Input
              label="Author"
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author's name"
              error={errors.author}
              disabled={loading}
              required
            />
            
            <div className="form-group">
              <label htmlFor="genre" className="label">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className={`input ${errors.genre ? 'border-error-500 focus:ring-error-500' : ''}`}
                disabled={loading}
                required
              >
                <option value="" disabled>Select a genre</option>
                {genreOptions.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              {errors.genre && <p className="mt-1 text-sm text-error-500">{errors.genre}</p>}
            </div>
            
            <Input
              label="Publication Date"
              id="publicationDate"
              name="publicationDate"
              type="date"
              value={formData.publicationDate}
              onChange={handleChange}
              error={errors.publicationDate}
              disabled={loading}
              required
            />
            
            <div className="flex justify-end space-x-4 mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(`/books/${id}`)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
              >
                Update Book
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;