import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../src/components/pages/main-page/main-page';
console.warn = jest.fn();

const mockStore = configureStore([]);

const renderWithProvider = (component, initialState) => {
  const store = mockStore(initialState);
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    ),
    store,
  };
};

describe('MainPage Component with Redux', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      image: {
        imageSrc: null,
        activeTool: 0,
        rotationAngle: 0,
        cropDimensions: { width: 800, height: 900 },
      },
    };
    store = mockStore(initialState);
  });

  it('renders UploadContainer when imageSrc is null', () => {
    renderWithProvider(<MainPage />, store.getState());
    const uploadContainer = screen.getByTestId('upload-container');
    expect(uploadContainer).toBeInTheDocument();
  });

  it('renders canvas when imageSrc is provided', () => {
    const initialStateWithImage = {
      image: {
        imageSrc: 'test-image.jpg',
        activeTool: 0,
        rotationAngle: 0,
        cropDimensions: { width: 800, height: 900 },
      },
    };
    renderWithProvider(<MainPage />, initialStateWithImage);
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('allows drawing on canvas when active tool is drawing tool', () => {
    const initialStateWithImage = {
      image: {
        imageSrc: 'test-image.jpg',
        activeTool: 5,
        rotationAngle: 0,
        cropDimensions: { width: 800, height: 900 },
      },
    };

    const { store } = renderWithProvider(
      <MainPage />,
      initialStateWithImage
    );

    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    fireEvent.mouseUp(canvas);
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
});
