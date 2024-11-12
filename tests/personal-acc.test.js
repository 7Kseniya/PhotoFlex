import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import PersonalAccount from '../src/components/pages/personal-account/personal-account';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  console.warn.mockRestore();
});

describe('PersonalAccount Component', () => {
  it('renders the Edit icon', () => {
    render(
      <Router>
        <PersonalAccount />
      </Router>
    );
    const editIcon = screen.getByTestId('edit-icon');
    expect(editIcon).toBeInTheDocument();
  });

  it('renders the NavLink correctly', () => {
    render(
      <Router>
        <PersonalAccount />
      </Router>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
