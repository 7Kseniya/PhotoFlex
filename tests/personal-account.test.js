import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonalAccount from './../src/components/personal-account/personal-account';

describe('PersonalAccount Component', () => {
  test('renders PersonalAccount component', () => {
    render(<PersonalAccount />);

    // Проверка наличия заголовка
    const userNameElement = screen.getByText(/Username/i);
    expect(userNameElement).toBeInTheDocument();

    // Проверка наличия поля ввода для телефона
    const phoneInput = screen.getByPlaceholderText(/phone/i);
    expect(phoneInput).toBeInTheDocument();

    // Проверка наличия поля ввода для email
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('allows input of a valid email address', () => {
    render(<PersonalAccount />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });

    // Проверка, что значение поля ввода стало корректным
    expect(emailInput.value).toBe('test@example.com');

    // Проверка отсутствия ошибок для email
    const errorElement = screen.queryByText(/Неверный формат email/i);
    expect(errorElement).not.toBeInTheDocument();
  });

  test('shows an error message for an invalid phone number', () => {
    render(<PersonalAccount />);

    const phoneInput = screen.getByPlaceholderText(/phone/i);
    fireEvent.change(phoneInput, { target: { value: '123456789' } });

    // Проверка, что сообщение об ошибке отображается
    const errorElement = screen.getByText(/Неверный формат номера/i);
    expect(errorElement).toBeInTheDocument();
  });
});
