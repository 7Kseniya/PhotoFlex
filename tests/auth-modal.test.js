import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthModal from '../src/components/modal/auth-modal.js';
import '@testing-library/jest-dom';

jest.mock('../src/components/modal/modal', () => {
  const React = require('react');
  // eslint-disable-next-line react/display-name
  return ({ children, onClose }) => (
    <div data-testid="mocked-modal">
      <button data-testid="close-button" onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  );
});

jest.mock('../src/components/modal/login-modal/login-modal', () => {
  const React = require('react');
  // eslint-disable-next-line react/display-name
  return ({ onSignUpClick, onSubmited }) => (
    <div data-testid="login-modal">
      <button data-testid="signup-button" onClick={onSignUpClick}>
        Sign Up
      </button>
      <button data-testid="login-submit" onClick={onSubmited}>
        Submit Login
      </button>
    </div>
  );
});

jest.mock(
  '../src/components/modal/register-modal/register-modal',
  () => {
    const React = require('react');
    // eslint-disable-next-line react/display-name
    return ({ onSignInClick, onSubmited }) => (
      <div data-testid="register-modal">
        <button data-testid="signin-button" onClick={onSignInClick}>
          Sign In
        </button>
        <button data-testid="register-submit" onClick={onSubmited}>
          Submit Register
        </button>
      </div>
    );
  }
);

describe('AuthModal component', () => {
  const onClose = jest.fn();
  const toggleToLogin = jest.fn();
  const toggleToRegister = jest.fn();
  const closeModalWithTimeOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render if isModalOpen is false', () => {
    render(
      <AuthModal
        isModalOpen={false}
        activeModal="login"
        onClose={onClose}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
        closeModalWithTimeOut={closeModalWithTimeOut}
      />
    );
    expect(
      screen.queryByTestId('mocked-modal')
    ).not.toBeInTheDocument();
  });

  test('renders login modal when isModalOpen is true and activeModal is "login"', () => {
    render(
      <AuthModal
        isModalOpen={true}
        activeModal="login"
        onClose={onClose}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
        closeModalWithTimeOut={closeModalWithTimeOut}
      />
    );
    expect(screen.getByTestId('mocked-modal')).toBeInTheDocument();
    expect(screen.getByTestId('login-modal')).toBeInTheDocument();
    expect(
      screen.queryByTestId('register-modal')
    ).not.toBeInTheDocument();
  });

  test('renders register modal when isModalOpen is true and activeModal is "register"', () => {
    render(
      <AuthModal
        isModalOpen={true}
        activeModal="register"
        onClose={onClose}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
        closeModalWithTimeOut={closeModalWithTimeOut}
      />
    );
    expect(screen.getByTestId('mocked-modal')).toBeInTheDocument();
    expect(screen.getByTestId('register-modal')).toBeInTheDocument();
    expect(
      screen.queryByTestId('login-modal')
    ).not.toBeInTheDocument();
  });

  test('calls onClose when close button in Modal is clicked', () => {
    render(
      <AuthModal
        isModalOpen={true}
        activeModal="login"
        onClose={onClose}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
        closeModalWithTimeOut={closeModalWithTimeOut}
      />
    );

    fireEvent.click(screen.getByTestId('close-button'));
    expect(onClose).toHaveBeenCalled();
  });

  test('calls toggleToRegister when SignUp button in LoginModal is clicked', () => {
    render(
      <AuthModal
        isModalOpen={true}
        activeModal="login"
        onClose={onClose}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
        closeModalWithTimeOut={closeModalWithTimeOut}
      />
    );

    fireEvent.click(screen.getByTestId('signup-button'));
    expect(toggleToRegister).toHaveBeenCalled();
  });

  test('calls toggleToLogin when SignIn button in RegisterModal is clicked', () => {
    render(
      <AuthModal
        isModalOpen={true}
        activeModal="register"
        onClose={onClose}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
        closeModalWithTimeOut={closeModalWithTimeOut}
      />
    );

    fireEvent.click(screen.getByTestId('signin-button'));
    expect(toggleToLogin).toHaveBeenCalled();
  });

  test('calls closeModalWithTimeOut when submit login button is clicked in LoginModal', () => {
    render(
      <AuthModal
        isModalOpen={true}
        activeModal="login"
        onClose={onClose}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
        closeModalWithTimeOut={closeModalWithTimeOut}
      />
    );

    fireEvent.click(screen.getByTestId('login-submit'));
    expect(closeModalWithTimeOut).toHaveBeenCalled();
  });

  test('calls closeModalWithTimeOut when submit register button is clicked in RegisterModal', () => {
    render(
      <AuthModal
        isModalOpen={true}
        activeModal="register"
        onClose={onClose}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
        closeModalWithTimeOut={closeModalWithTimeOut}
      />
    );

    fireEvent.click(screen.getByTestId('register-submit'));
    expect(closeModalWithTimeOut).toHaveBeenCalled();
  });
});
