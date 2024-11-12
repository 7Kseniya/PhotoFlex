import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from '../src/components/pages/main-page/main-page';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import imageReducer from '../src/services/reducers/image-reducer';

const renderWithProviderAndRouter = (component, initialState) => {
  const store = createStore(imageReducer, initialState);
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );
};

describe('MainPage component', () => {
  it('updates rotation when Rotate icon is clicked', () => {
    renderWithProviderAndRouter(
      <MainPage initialImageSrc="/placeholder.jpeg" />,
      {
        imageSrc: '/placeholder.jpeg',
        activeTool: 2,
        crop: { cropWidth: 100, cropHeight: 100, cropX: 0, cropY: 0 },
      }
    );
    const rotateIcon = screen.getByTestId('icon-2');
    fireEvent.click(rotateIcon);

    const imageRotateCanvas = screen.getByTestId('image-rotate');
    expect(imageRotateCanvas).toBeInTheDocument();
  });

  it('renders UploadContainer when no image is uploaded', () => {
    renderWithProviderAndRouter(<MainPage />, {
      imageSrc: null,
      activeTool: 0,
      crop: { cropWidth: 100, cropHeight: 100, cropX: 0, cropY: 0 },
    });
    const uploadContainer = screen.getByTestId('file-input');
    expect(uploadContainer).toBeInTheDocument();
  });

  it('renders ImageRotate component when image is uploaded and activeTool is 2', () => {
    renderWithProviderAndRouter(
      <MainPage initialImageSrc="test-image.jpg" />,
      {
        imageSrc: 'test-image.jpg',
        activeTool: 2,
        crop: { cropWidth: 100, cropHeight: 100, cropX: 0, cropY: 0 },
      }
    );
    const rotateIcon = screen.getByTestId('icon-2');
    fireEvent.click(rotateIcon);

    const imageRotateCanvas = screen.getByTestId('image-rotate');
    expect(imageRotateCanvas).toBeInTheDocument();
  });

  it('renders ImageCrop component when image is uploaded and activeTool is 1', () => {
    renderWithProviderAndRouter(
      <MainPage initialImageSrc="test-image.jpg" />,
      {
        imageSrc: 'test-image.jpg',
        activeTool: 1,
        crop: { cropWidth: 100, cropHeight: 100, cropX: 0, cropY: 0 },
      }
    );
    const cropIcon = screen.getByTestId('icon-1');
    fireEvent.click(cropIcon);
    const imageCropCanvas = screen.getByTestId('image-crop');
    expect(imageCropCanvas).toBeInTheDocument();
  });

  it('changes activeTool state when tool icon is clicked', () => {
    renderWithProviderAndRouter(
      <MainPage initialImageSrc="test-image.jpg" />,
      {
        imageSrc: 'test-image.jpg',
        activeTool: 0,
        crop: { cropWidth: 100, cropHeight: 100, cropX: 0, cropY: 0 },
      }
    );
    const rotateIcon = screen.getByTestId('icon-2');
    fireEvent.click(rotateIcon);
    const imageRotateCanvas = screen.getByTestId('image-rotate');
    expect(imageRotateCanvas).toBeInTheDocument();
  });

  it('does not render ImageRotate if no image is uploaded and tool is selected', () => {
    renderWithProviderAndRouter(<MainPage initialImageSrc={null} />, {
      imageSrc: null,
      activeTool: 2,
      crop: { cropWidth: 100, cropHeight: 100, cropX: 0, cropY: 0 },
    });
    const imageRotateCanvas = screen.queryByTestId('image-rotate');
    expect(imageRotateCanvas).not.toBeInTheDocument();
  });
});
