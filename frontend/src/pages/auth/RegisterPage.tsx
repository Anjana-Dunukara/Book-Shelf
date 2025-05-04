import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

import { register, clearError } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Clear any previous auth errors
    dispatch(clearError());
    
    // If user is already authenticated, redirect
    if (isAuthenticated) {
      navigate('/books');
    }
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const { username, email, password } = formData;
      dispatch(register({ username, email, password }));
    }
  };

  return (
    <div className="max-w-md mx-auto fade-in">
      <div className="card p-8">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-3">
            <UserPlus className="h-6 w-6 text-primary-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Create an account
        </h1>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            error={errors.username}
            disabled={loading}
            required
          />
          
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            disabled={loading}
            required
          />
          
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            error={errors.password}
            disabled={loading}
            required
          />
          
          <Input
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            disabled={loading}
            required
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={loading} 
            fullWidth 
            className="mt-6"
          >
            Create Account
          </Button>
        </form>
        
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;