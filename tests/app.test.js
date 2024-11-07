import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import App from './../src/components/app/app';

test('App renders MainPage component', () => {
  render(<App />);
  const mainPageElement = screen.getByTestId('main-page');
  expect(mainPageElement).toBeInTheDocument();
});
