import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadContainer from '../src/components/upload-container/upload-container';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import imageReducer from '../src/services/reducers/image-reducer';

const mockStore = createStore(imageReducer);
const renderWithProvider = (component) => {
  return render(<Provider store={mockStore}>{component}</Provider>);
};
describe('UploadContainer', () => {
  it('calls onImageUpload when a file is selected via input', async () => {
    const mockOnImageUpload = jest.fn();
    renderWithProvider(
      <UploadContainer onImageUpload={mockOnImageUpload} />
    );
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onload: jest.fn(),
      result: 'data:image/png;base64,dummyImageData',
    };
    window.FileReader = jest.fn(() => fileReaderMock);

    fileReaderMock.onload = function () {
      mockOnImageUpload(fileReaderMock.result);
    };
    fileReaderMock.onload();
    expect(mockOnImageUpload).toHaveBeenCalledWith(
      'data:image/png;base64,dummyImageData'
    );
  });

  it('does not call onImageUpload when no file is selected via input', () => {
    const mockOnImageUpload = jest.fn();
    renderWithProvider(
      <UploadContainer onImageUpload={mockOnImageUpload} />
    );
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [] } });
    expect(mockOnImageUpload).not.toHaveBeenCalled();
  });
  it('calls onImageUpload when a file is dropped', async () => {
    const mockOnImageUpload = jest.fn();
    renderWithProvider(
      <UploadContainer onImageUpload={mockOnImageUpload} />
    );
    const uploadArea = screen.getByText(
      /choose or drag file/i
    ).parentElement;
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onload: jest.fn(),
      result: 'data:image/png;base64,dummyImageData',
    };
    window.FileReader = jest.fn(() => fileReaderMock);
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [file],
      },
    });
    fileReaderMock.onload();
    expect(mockOnImageUpload).toHaveBeenCalledWith(
      'data:image/png;base64,dummyImageData'
    );
  });

  it('does not call onImageUpload when no file is dropped', () => {
    const mockOnImageUpload = jest.fn();
    renderWithProvider(
      <UploadContainer onImageUpload={mockOnImageUpload} />
    );
    const uploadArea = screen.getByRole('button');
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [],
      },
    });
    expect(mockOnImageUpload).not.toHaveBeenCalled();
  });
});
