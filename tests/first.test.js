import { render, screen, fireEvent } from '@testing-library/react';
import App from './../src/App';
import React from 'react';
import '@testing-library/jest-dom';

test('renders button and toggles text on click', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Нажми на меня/i);
  expect(buttonElement).toBeInTheDocument();
  fireEvent.click(buttonElement);
  expect(screen.getByText(/Ура/i)).toBeInTheDocument();
  fireEvent.click(buttonElement);
  expect(screen.getByText(/Нажми на меня/i)).toBeInTheDocument();
});

test('multiplies 2 * 3 to equal 6', () => {
  expect(2 * 3).toBe(6);
});
test('subtracts 5 - 3 to equal 2', () => {
  expect(5 - 3).toBe(2);
});

test('divides 10 / 2 to equal 5', () => {
  expect(10 / 2).toBe(5);
});

test('compares "hello" to be "hello"', () => {
  expect('hello').toBe('hello');
});

test('checks if [1, 2, 3] contains 2', () => {
  expect([1, 2, 3]).toContain(2);
});

test('checks that true is true', () => {
  expect(true).toBe(true);
});
