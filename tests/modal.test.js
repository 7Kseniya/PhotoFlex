import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Modal from '../src/components/modal/modal';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element) => element,
}));

describe('Modal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  test('рендерится корректно и отображает переданный контент', () => {
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByTestId('ClearIcon')).toBeInTheDocument();
  });

  test('вызывает onClose при нажатии на клавишу Escape', () => {
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(onClose).toHaveBeenCalled();
  });

  test('вызывает onClose при клике на иконку закрытия', () => {
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('ClearIcon'));

    expect(onClose).toHaveBeenCalled();
  });
});
