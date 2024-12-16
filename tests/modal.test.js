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

  test('renders correct', () => {
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByTestId('ClearIcon')).toBeInTheDocument();
  });

  test('calls onClose while Escape is clicked', () => {
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose on click on close icon', () => {
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('ClearIcon'));
    expect(onClose).toHaveBeenCalled();
  });
  test('unmounting the modal cleans up event listeners', () => {
    const { unmount } = render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    unmount();
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });
  test('renders correctly without children', () => {
    render(<Modal onClose={onClose} />);
    expect(screen.getByTestId('ClearIcon')).toBeInTheDocument();
  });
  test('does not call onClose when clicking inside the modal', () => {
    render(
      <Modal onClose={onClose}>
        <div>
          Modal Content
          <button>Inside Button</button>
        </div>
      </Modal>
    );

    fireEvent.click(screen.getByText('Inside Button'));

    expect(onClose).not.toHaveBeenCalled();
  });
  test('does not call onClose when other key is pressed', () => {
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });
  test('does not call onClose when clicking inside the modal content', () => {
    render(
      <Modal onClose={onClose}>
        <div data-testid="modal-content">
          Modal Content
          <button data-testid="inside-button">Inside Button</button>
        </div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('inside-button'));
    fireEvent.click(screen.getByTestId('modal-content'));

    expect(onClose).not.toHaveBeenCalled();
  });
  test('calls onClose when clicking on the overlay', () => {
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(onClose).toHaveBeenCalled();
  });
});
