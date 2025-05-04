import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';

// Types
export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BookState {
  books: Book[];
  book: Book | null;
  loading: boolean;
  error: string | null;
}

interface BookInput {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

const initialState: BookState = {
  books: [],
  book: null,
  loading: false,
  error: null,
};

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Async actions
export const fetchBooks = createAsyncThunk(
  'books/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/books`, getAuthHeader());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
    }
  }
);

export const fetchBook = createAsyncThunk<Book, string>(
  'books/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/books/${id}`, getAuthHeader());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch book');
    }
  }
);

export const createBook = createAsyncThunk<Book, BookInput>(
  'books/create',
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/books`, bookData, getAuthHeader());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create book');
    }
  }
);

export const updateBook = createAsyncThunk<Book, { id: string; bookData: BookInput }>(
  'books/update',
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/books/${id}`, bookData, getAuthHeader());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update book');
    }
  }
);

export const deleteBook = createAsyncThunk<string, string>(
  'books/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`, getAuthHeader());
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete book');
    }
  }
);

// Slice
const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBookError: (state) => {
      state.error = null;
    },
    clearCurrentBook: (state) => {
      state.book = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all books
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
      state.loading = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch single book
    builder.addCase(fetchBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBook.fulfilled, (state, action: PayloadAction<Book>) => {
      state.loading = false;
      state.book = action.payload;
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create book
    builder.addCase(createBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBook.fulfilled, (state, action: PayloadAction<Book>) => {
      state.loading = false;
      state.books.push(action.payload);
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update book
    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
      state.loading = false;
      const index = state.books.findIndex((book) => book._id === action.payload._id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
      state.book = action.payload;
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete book
    builder.addCase(deleteBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.books = state.books.filter((book) => book._id !== action.payload);
      if (state.book && state.book._id === action.payload) {
        state.book = null;
      }
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearBookError, clearCurrentBook } = bookSlice.actions;
export default bookSlice.reducer;