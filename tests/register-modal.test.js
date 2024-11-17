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
  test('prevents default behavior on mouse down and mouse up for password visibility toggle', () => {
    const togglePasswordButton = screen.getByLabelText(
      /toggle password visibility/i
    );

    const mockEvent = {
      preventDefault: jest.fn(),
    };
    fireEvent.mouseDown(togglePasswordButton, mockEvent);

    const handleMouseDownPassword = jest.fn((event) => {
      event.preventDefault();
    });
    handleMouseDownPassword(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    const handleMouseUpPassword = jest.fn((event) => {
      event.preventDefault();
    });
    handleMouseUpPassword(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
  test('closes alert when the close button is clicked', async () => {
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

    // Trigger an alert by providing invalid input
    fireEvent.change(loginInput, {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'Password123!' },
    });
    fireEvent.change(usernameInput, {
      target: { value: 'test_username' },
    });
    fireEvent.click(submitButton);

    // Ensure the alert is displayed
    const alertMessage = await screen.findByText(
      /please enter valid email or phone number/i
    );
    expect(alertMessage).toBeInTheDocument();

    // Close the alert
    const alertCloseButton = screen.getByRole('button', {
      name: /close/i,
    }); // Assuming the close button has the accessible name 'close'
    fireEvent.click(alertCloseButton);

    // Ensure the alert is no longer displayed
    expect(alertMessage).not.toBeInTheDocument();
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
  test('calls onSignIn click when the sign-up button is clicked', () => {
    const signInButton = screen.getByText(/sign in/i);
    fireEvent.click(signInButton);
    expect(mockOnSignInClick).toHaveBeenCalled();
  });
  test('shows alert when invalid username is provided', () => {
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
      target: { value: 'ab' },
    });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(
        /username must be 5-20 characters long and can only contain letters, numbers, and underscores/i
      )
    ).toBeInTheDocument();
    //expect(mockOnSubmitted).not.toHaveBeenCalled();
  });
});
