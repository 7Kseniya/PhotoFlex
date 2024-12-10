import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import {
  setLogin,
  setPassword,
  setLoginRegister,
  setPasswordRegister,
  setUsername,
  registerUser,
  loginUser,
} from '../src/services/actions/auth-actions';

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('Auth Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Simple Action Creators', () => {
    it('creates SET_LOGIN action', () => {
      const action = setLogin('testLogin');
      expect(action).toEqual({
        type: 'SET_LOGIN',
        payload: 'testLogin',
      });
    });

    it('creates SET_PASSWORD action', () => {
      const action = setPassword('testPassword');
      expect(action).toEqual({
        type: 'SET_PASSWORD',
        payload: 'testPassword',
      });
    });

    it('creates SET_LOGIN_REGISTER action', () => {
      const action = setLoginRegister('testLoginRegister');
      expect(action).toEqual({
        type: 'SET_LOGIN_REGISTER',
        payload: 'testLoginRegister',
      });
    });

    it('creates SET_PASSWORD_REGISTER action', () => {
      const action = setPasswordRegister('testPasswordRegister');
      expect(action).toEqual({
        type: 'SET_PASSWORD_REGISTER',
        payload: 'testPasswordRegister',
      });
    });

    it('creates SET_USERNAME action', () => {
      const action = setUsername('testUsername');
      expect(action).toEqual({
        type: 'SET_USERNAME',
        payload: 'testUsername',
      });
    });
  });

  describe('Async Actions', () => {
    it('dispatches REGISTER_SUCCESS when registerUser is successful', async () => {
      const mockResponse = {
        data: { token: 'mockToken', user: { id: 1 } },
      };
      axios.post.mockResolvedValueOnce(mockResponse);

      const expectedActions = [
        { type: 'REGISTER_SUCCESS', payload: mockResponse.data },
      ];

      await store.dispatch(
        registerUser('testLogin', 'testUsername', 'testPassword')
      );

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      expect(localStorage.getItem('authToken')).toBe('mockToken');
    });

    it('dispatches REGISTER_FAILURE when registerUser fails with response error', async () => {
      const mockError = { response: { data: 'Registration error' } };
      axios.post.mockRejectedValueOnce(mockError);

      const expectedActions = [
        { type: 'REGISTER_FAILURE', payload: 'Registration error' },
      ];

      await store.dispatch(
        registerUser('testLogin', 'testUsername', 'testPassword')
      );

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });

    it('dispatches REGISTER_FAILURE with default message when registerUser fails without response', async () => {
      const mockError = new Error('Network Error');
      axios.post.mockRejectedValueOnce(mockError);

      const expectedActions = [
        { type: 'REGISTER_FAILURE', payload: 'Ошибка соединения' },
      ];

      await store.dispatch(
        registerUser('testLogin', 'testUsername', 'testPassword')
      );

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });

    it('dispatches LOGIN_SUCCESS when loginUser is successful', async () => {
      const mockResponse = {
        data: { token: 'mockToken', user: { id: 1 } },
      };
      axios.post.mockResolvedValueOnce(mockResponse);

      const expectedActions = [
        { type: 'LOGIN_SUCCESS', payload: mockResponse.data },
      ];

      await store.dispatch(loginUser('testLogin', 'testPassword'));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      expect(localStorage.getItem('authToken')).toBe('mockToken');
    });

    it('dispatches LOGIN_FAILURE when loginUser fails with response error', async () => {
      const mockError = { response: { data: 'Login error' } };
      axios.post.mockRejectedValueOnce(mockError);

      const expectedActions = [
        { type: 'LOGIN_FAILURE', payload: 'Login error' },
      ];

      await store.dispatch(loginUser('testLogin', 'testPassword'));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });

    it('dispatches LOGIN_FAILURE with default message when loginUser fails without response', async () => {
      const mockError = new Error('Network Error');
      axios.post.mockRejectedValueOnce(mockError);

      const expectedActions = [
        { type: 'LOGIN_FAILURE', payload: 'Ошибка соединения' },
      ];

      await store.dispatch(loginUser('testLogin', 'testPassword'));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
