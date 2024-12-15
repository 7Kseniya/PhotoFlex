import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { loginUser } from '../src/services/actions/auth-actions';
import {
  validateLogin,
  validatePassword,
} from '../src/utils/auth-utils';
import LoginModal from '../src/components/modal/login-modal/login-modal';

jest.mock('../src/utils/auth-utils');
jest.mock('../src/services/actions/auth-actions', () => ({
  loginUser: jest.fn(),
  setLogin: jest.fn((value) => ({
    type: 'SET_LOGIN',
    payload: value,
  })),
  setPassword: jest.fn((value) => ({
    type: 'SET_PASSWORD',
    payload: value,
  })),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('LoginModal', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        login: '',
        password: '',
      },
    });

    validateLogin.mockReturnValue(true);
    validatePassword.mockReturnValue(true);
    loginUser.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the LoginModal component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginModal
            onSignUpClick={() => {}}
            onSubmited={() => {}}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('sign in')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Enter your phone number/email/login')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Enter your password')
    ).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
    expect(screen.getByText('login via:')).toBeInTheDocument();
    expect(
      screen.getByText("don't have an account?")
    ).toBeInTheDocument();
    expect(screen.getByText('sign up')).toBeInTheDocument();
  });

  it('handles password visibility toggle', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginModal
            onSignUpClick={() => {}}
            onSubmited={() => {}}
          />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByLabelText(
      'Enter your password'
    );
    const toggleButton = screen.getByLabelText(
      'toggle password visibility'
    );

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  it('dispatches setLogin and setPassword actions on input change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginModal
            onSignUpClick={() => {}}
            onSubmited={() => {}}
          />
        </MemoryRouter>
      </Provider>
    );

    const loginInput = screen.getByLabelText(
      'Enter your phone number/email/login'
    );
    const passwordInput = screen.getByLabelText(
      'Enter your password'
    );

    fireEvent.change(loginInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });

    expect(store.getActions()).toContainEqual({
      type: 'SET_LOGIN',
      payload: 'test@example.com',
    });
    expect(store.getActions()).toContainEqual({
      type: 'SET_PASSWORD',
      payload: 'password123',
    });
  });

  it('calls onSignUpClick when sign up link is clicked', () => {
    const onSignUpClick = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginModal
            onSignUpClick={onSignUpClick}
            onSubmited={() => {}}
          />
        </MemoryRouter>
      </Provider>
    );

    const signUpLink = screen.getByTestId('signup-link');
    fireEvent.click(signUpLink);

    expect(onSignUpClick).toHaveBeenCalled();
  });
});
