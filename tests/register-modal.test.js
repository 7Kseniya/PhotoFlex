import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { registerUser } from '../src/services/actions/auth-actions';
import {
  validateLogin,
  validatePassword,
  validateUsername,
} from '../src/utils/auth-utils';
import RegisterModal from '../src/components/modal/register-modal/register-modal';

jest.mock('../src/utils/auth-utils');
jest.mock('../src/services/actions/auth-actions', () => ({
  registerUser: jest.fn(),
  setLoginRegister: jest.fn((value) => ({
    type: 'SET_LOGIN_REGISTER',
    payload: value,
  })),
  setPasswordRegister: jest.fn((value) => ({
    type: 'SET_PASSWORD_REGISTER',
    payload: value,
  })),
  setUsername: jest.fn((value) => ({
    type: 'SET_USERNAME',
    payload: value,
  })),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('RegisterModal', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loginRegister: '',
        passwordRegister: '',
        username: '',
      },
    });

    validateLogin.mockReturnValue(true);
    validatePassword.mockReturnValue(true);
    validateUsername.mockReturnValue(true);
    registerUser.mockResolvedValue({});
    jest.clearAllMocks();
  });

  it('renders the RegisterModal component', () => {
    render(
      <Provider store={store}>
        <RegisterModal
          onSignInClick={() => {}}
          onSubmited={() => {}}
        />
      </Provider>
    );

    expect(screen.getByText('sign up')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Enter your phone number/email/login')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Come up with a password')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Come up with username')
    ).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
    expect(screen.getByText('login via:')).toBeInTheDocument();
    expect(
      screen.getByText('already have an account?')
    ).toBeInTheDocument();
    expect(screen.getByText('sign in')).toBeInTheDocument();
  });

});
