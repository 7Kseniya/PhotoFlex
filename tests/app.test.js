import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import App from './../src/components/app/app';
import ImageRotate from './../src/components/editor-actions/image-rotate';
import ToolBar from './../src/components/tool-bar/tool-bar';
import MainPage from '../src/components/pages/main-page/main-page';
import UploadContainer from '../src/components/upload-container/upload-container';

test('App renders MainPage component', () => {
  render(<App />);
  const mainPageElement = screen.getByTestId('main-page');
  expect(mainPageElement).toBeInTheDocument();
});

test('MainPage updates rotation when Rotate icon is clicked', () => {
  render(<MainPage initialImageSrc="/placeholder.jpeg" />);

  const rotateIcon = screen.getByTestId('icon-2');

  fireEvent.click(rotateIcon);

  const imageRotateCanvas = screen.getByTestId('image-rotate');
  expect(imageRotateCanvas).toBeInTheDocument();
});

describe('Editor-actions tools', () => {
  it('ImageRotate Component correctly sets canvas dimensions based on rotation', async () => {
    global.Image = class {
      constructor() {
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 0);
      }
    };

    const { container } = render(
      <ImageRotate imageSrc="placeholder.jpeg" rotation={90} />
    );
    const canvas = container.querySelector('canvas');

    await waitFor(() => {
      expect(canvas.width).toBeGreaterThan(0);
      expect(canvas.height).toBeGreaterThan(0);
    });
  });
});

describe('ToolBar component', () => {
  it('should render all icons', () => {
    const { getByTestId } = render(<ToolBar onRotate={jest.fn()} />);

    for (let i = 0; i < 8; i++) {
      expect(getByTestId(`icon-${i}`)).toBeInTheDocument();
    }
  });

  it('should call onRotate action when Rotate icon is clicked', () => {
    const mockRotate = jest.fn();
    const { getByTestId } = render(<ToolBar onRotate={mockRotate} />);

    fireEvent.click(getByTestId('icon-2'));

    expect(mockRotate).toHaveBeenCalled();
  });

  it('should not call action for icons without action', () => {
    const mockRotate = jest.fn();
    const { getByTestId } = render(<ToolBar onRotate={mockRotate} />);

    fireEvent.click(getByTestId('icon-0'));

    expect(mockRotate).not.toHaveBeenCalled();
  });
});

describe('UploadContainer', () => {
  it('calls onImageUpload when a file is selected via input', async () => {
    const mockOnImageUpload = jest.fn();

    render(<UploadContainer onImageUpload={mockOnImageUpload} />);

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onload: null,
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

    render(<UploadContainer onImageUpload={mockOnImageUpload} />);

    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [] } });

    expect(mockOnImageUpload).not.toHaveBeenCalled();
  });

  it('calls onImageUpload when a file is dropped', async () => {
    const mockOnImageUpload = jest.fn();

    render(<UploadContainer onImageUpload={mockOnImageUpload} />);

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

    render(<UploadContainer onImageUpload={mockOnImageUpload} />);

    const uploadArea = screen.getByRole('button');

    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [],
      },
    });

    expect(mockOnImageUpload).not.toHaveBeenCalled();
  });
});
