import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PersonalAccount from '../src/components/pages/personal-account/personal-account';
import '@testing-library/jest-dom';
console.warn = jest.fn();

describe('PersonalAccount Component', () => {
  test('renders PersonalAccount component', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('telegram')
    ).toBeInTheDocument();
  });

  test('validates phone input format', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText('phone');
    fireEvent.change(phoneInput, { target: { value: '65845694' } });
    expect(
      screen.getByText('Неверный формат номера')
    ).toBeInTheDocument();

    fireEvent.change(phoneInput, {
      target: { value: '+7 999 999 99 99' },
    });
    expect(phoneInput.value).toBe('+7 999 999 99 99');
    expect(
      screen.queryByText('Неверный формат номера')
    ).not.toBeInTheDocument();
  });

  test('validates email input format', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');

    fireEvent.change(emailInput, {
      target: { value: 'invalid-email' },
    });
    expect(
      screen.getByText('Неверный формат email')
    ).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: { value: 'username52@gmail.com' },
    });
    expect(emailInput.value).toBe('username52@gmail.com');
    expect(
      screen.queryByText('Неверный формат email')
    ).not.toBeInTheDocument();
  });
  test('activates edit mode on EditIcon click', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );
    const editIcon = screen.getByTestId('EditIcon');
    expect(screen.getByPlaceholderText('phone')).toBeDisabled();
    expect(screen.getByPlaceholderText('email')).toBeDisabled();
    expect(screen.getByPlaceholderText('telegram')).toBeDisabled();
    fireEvent.click(editIcon);
    expect(screen.getByPlaceholderText('phone')).not.toBeDisabled();
    expect(screen.getByPlaceholderText('email')).not.toBeDisabled();
    expect(
      screen.getByPlaceholderText('telegram')
    ).not.toBeDisabled();
  });
});
