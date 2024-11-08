import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalOverlay from '../src/components/modal/modal-overlay';

describe('ModalOverlay', () => {
  test('render modal overlay', () => {
    const { getByTestId } = render(
      <ModalOverlay onClose={() => {}} />
    );
    expect(getByTestId('modal-overlay')).toBeInTheDocument();
  });
});
test('calls onClose when clicked', () => {
  const mockOnClose = jest.fn();
  const { getByTestId } = render(
    <ModalOverlay onClose={mockOnClose}></ModalOverlay>
  );
  fireEvent.click(getByTestId('modal-overlay'));
  expect(mockOnClose).toHaveBeenCalledTimes(1);
});
