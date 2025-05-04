import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from '../../pages/auth/LoginPage';
import authReducer, { login } from '../../store/slices/authSlice';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage', () => {
  const renderLoginPage = () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders login form', () => {
    renderLoginPage();
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderLoginPage();
    
    const loginButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(loginButton);

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderLoginPage();
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const loginButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(loginButton);

    expect(await screen.findByText(/email is invalid/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    const mockDispatch = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.any(Function) // login thunk
      );
    });
  });
});