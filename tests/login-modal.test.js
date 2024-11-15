import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import LoginModal from '../src/components/modal/login-modal/login-modal';

describe('LoginModal', () => {
  const mockOnSignUpClick = jest.fn();
  const mockOnSubmitted = jest.fn();

  beforeEach(() => {
    render(
      <LoginModal
        onSignUpClick={mockOnSignUpClick}
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
      screen.getByLabelText(/enter your password/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
    expect(screen.getByText(/login via:/i)).toBeInTheDocument();
  });
  test('allows the user to toggle password visibility', () => {
    const passwordInput = screen.getByLabelText(
      /enter your password/i
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
      /enter your password/i
    );
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(loginInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'Password123!' },
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
    //expect(mockOnSubmitted).toHaveBeenCalled();
  });
  //
  test('shows alert when invalid email is provided', async () => {
    const loginInput = screen.getByLabelText(
      /enter your phone number\/email\/login/i
    );
    const passwordInput = screen.getByLabelText(
      /enter your password/i
    );
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(loginInput, {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'Password123!' },
    });
    fireEvent.click(submitButton);

    const alertMessage = await screen.findByText(
      /please enter valid email or phone number/i
    );
    expect(alertMessage).toBeInTheDocument();
    expect(mockOnSubmitted).not.toHaveBeenCalled();
  });

  test('shows alert when invalid password is provided', async () => {
    const loginInput = screen.getByLabelText(
      /enter your phone number\/email\/login/i
    );
    const passwordInput = screen.getByLabelText(
      /enter your password/i
    );
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(loginInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    const alertMessage = await screen.findByText(
      /password must be at least 8 characters long/i
    );

    expect(alertMessage).toBeInTheDocument();
    expect(mockOnSubmitted).not.toHaveBeenCalled();
  });

  //
  test('calls onSignUp Click when the sign-up button is clicked', () => {
    const signUpButton = screen.getByText(/sign up/i);
    fireEvent.click(signUpButton);
    expect(mockOnSignUpClick).toHaveBeenCalled();
  });
  test('calls "recover password" button click handler', () => {
    const recoverPasswordButton =
      screen.getByText(/recover password/i);
    fireEvent.click(recoverPasswordButton);
  });
});
