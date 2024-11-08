import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import RegisterModal from '../src/components/modal/register-modal/register-modal';

describe('RegisterModal', () => {
  const mockOnSignInClick = jest.fn();
  const mockOnSubmitted = jest.fn();

  beforeEach(() => {
    render(
      <RegisterModal
        onSignInClick={mockOnSignInClick}
        onSubmited={mockOnSubmitted}
      />
    );
  });
  test('renders login modal with input fields and buttons', () => {
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/enter your phone number\/email\/login/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/come up with a password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/come up with username/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
    expect(screen.getByText(/login via:/i)).toBeInTheDocument();
  });
  test('allows the user to toggle password visibility', () => {
    const passwordInput = screen.getByLabelText(
      /come up with a password/i
    );
    const togglePasswordButton = screen.getByLabelText(
      /toggle password visibility/i
    );

    // check initial password input type
    expect(passwordInput).toHaveAttribute('type', 'password');

    // toggle to show password
    fireEvent.click(togglePasswordButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // toggle to hide password
    fireEvent.click(togglePasswordButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  test('calls onSubmitted when valid login and password are provided', () => {
    const loginInput = screen.getByLabelText(
      /enter your phone number\/email\/login/i
    );
    const passwordInput = screen.getByLabelText(
      /come up with a password/i
    );
    const usernameInput = screen.getByLabelText(
      /come up with username/i
    );
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(loginInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'Password123!' },
    });
    fireEvent.change(usernameInput, {
      target: { value: 'test_username' },
    });
    fireEvent.click(submitButton);

    expect(
      screen.queryByText(/please enter valid email or phone number/i)
    ).toBeNull();
    expect(
      screen.queryByText(
        /password must be at least 8 characters long/i
      )
    ).toBeNull();
    expect(mockOnSubmitted).toHaveBeenCalled();
  });
  test('calls onSignIn Click when the sign-up button is clicked', () => {
    const signInButton = screen.getByText(/sign in/i);
    fireEvent.click(signInButton);
    expect(mockOnSignInClick).toHaveBeenCalled();
  });
});
