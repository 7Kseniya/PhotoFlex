import './app.css';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/services/store';
import App from '../src/components/app/app';
console.warn = jest.fn();

// eslint-disable-next-line jest/expect-expect
test('App renders MainPage component', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
