import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../../components/shared/Input';

describe('Input Component', () => {
  const defaultProps = {
    label: 'Test Input',
    id: 'test-input',
  };

  it('renders with label and input', () => {
    render(<Input {...defaultProps} />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message', () => {
    const error = 'This field is required';
    render(<Input {...defaultProps} error={error} />);
    
    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-error-500');
  });

  it('can be disabled', () => {
    render(<Input {...defaultProps} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('accepts different input types', () => {
    render(<Input {...defaultProps} type="password" />);
    expect(screen.getByLabelText('Test Input')).toHaveAttribute('type', 'password');
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Input {...defaultProps} className={customClass} />);
    expect(screen.getByRole('textbox')).toHaveClass(customClass);
  });
});