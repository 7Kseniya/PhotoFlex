import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useModal } from '../src/hooks/use-modal';
import AuthRequired from '../src/components/tools/auth-required/auth-required';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../src/hooks/use-modal', () => ({
  useModal: jest.fn(),
}));

beforeEach(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal');
  document.body.appendChild(portalRoot);
});

afterEach(() => {
  const portalRoot = document.getElementById('portal');
  if (portalRoot) {
    document.body.removeChild(portalRoot);
  }
});

describe('AuthRequired Component', () => {
  it('renders correctly when user is not authenticated', () => {
    useSelector.mockReturnValue(false);

    const openModal = jest.fn();

    useModal.mockReturnValue({
      isModalOpen: false,
      activeModal: 'login',
      openModal,
      closeModal: jest.fn(),
      toggleToLogin: jest.fn(),
      toggleToRegister: jest.fn(),
      closeModalWithTimeOut: jest.fn(),
    });

    render(<AuthRequired />);

    expect(screen.getByText('Авторизироваться')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Авторизироваться'));

    expect(openModal).toHaveBeenCalledWith('login');
  });

  it('does not render anything when user is authenticated', () => {
    useSelector.mockReturnValue(true);

    render(<AuthRequired />);

    expect(
      screen.queryByText(
        'Вы должны авторизироваться для использования этого инструмента.'
      )
    ).toBeNull();
    expect(screen.queryByText('Авторизироваться')).toBeNull();
  });
});
