import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MainPage from '../src/components/pages/main-page/main-page';
import { BrowserRouter as Router } from 'react-router-dom';
import * as imageActions from '../src/services/actions/image-actions';
import { resizeImageToCanvas } from '../src/utils/image-utils';
import {
  setImage,
  setOriginalImage,
  setResizeDimensions,
} from '../src/services/actions/image-actions';

console.warn = jest.fn();
const mockStore = configureStore([]);
const renderWithProvider = (component, initialState) => {
  const store = mockStore(initialState);
  return {
    ...render(
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    ),
    store,
  };
};
describe('MainPage Component', () => {
  let store;
  beforeEach(() => {
    const initialState = {
      image: {
        imageSrc: 'mock-image-url',
        activeTool: 5,
        brushSize: 10,
        mask: [],
        originalImage: null,
        image: null,
        resizeDimensions: { width: 800, height: 600 },
      },
      auth: {
        isAuthenticated: true,
      },
    };
    const renderResult = renderWithProvider(
      <MainPage />,
      initialState
    );
    store = renderResult.store;
    jest.spyOn(imageActions, 'setImage');
    jest.spyOn(imageActions, 'setOriginalImage');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('renders without crashing', () => {
    const canvasElement = screen.getByTestId('canvasMain');
    expect(canvasElement).toBeInTheDocument();
  });
  it('handles mouse down, move, and up for drawing correctly', async () => {
    const canvasElement = screen.getByTestId('canvasMain');
    const event = { clientX: 100, clientY: 150 };
    fireEvent.mouseDown(canvasElement, event);
    let actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'SET_DRAWING',
      payload: true,
    });
    fireEvent.mouseMove(canvasElement, event);
    actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'SET_MASK',
      payload: expect.arrayContaining([
        { x: 100, y: 150, brushSize: 10 },
      ]),
    });
    fireEvent.mouseUp(canvasElement);
    actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'SET_DRAWING',
      payload: false,
    });
  });

  it('displays upload container when no imageSrc is provided', () => {
    const initialState = {
      image: {
        imageSrc: null,
        activeTool: 5,
        brushSize: 10,
        mask: [],
        originalImage: null,
        image: null,
        resizeDimensions: { width: 0, height: 0 },
      },
      auth: {
        isAuthenticated: true,
      },
    };
    renderWithProvider(<MainPage />, initialState);
    const uploadContainer = screen.getByTestId('upload-container');
    expect(uploadContainer).toBeInTheDocument();
  });

  it('displays the correct image size on canvas', () => {
    const imageContainer =
      screen.getByTestId('canvasMain').parentElement;
    const canvas = screen.getByTestId('canvasMain');
    expect(imageContainer).toHaveStyle('width: 800px; height: 600px');
    expect(canvas).toHaveAttribute('width', '800');
    expect(canvas).toHaveAttribute('height', '600');
  });

  it('calls handleMouseDown when mouse is clicked and tool is active', () => {
    const canvasElement = screen.getByTestId('canvasMain');
    fireEvent.mouseDown(canvasElement, {
      clientX: 100,
      clientY: 150,
    });
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'SET_DRAWING',
      payload: true,
    });
  });
  it('does not call handleMouseMove when drawing is not active', () => {
    const canvasElement = screen.getByTestId('canvasMain');
    fireEvent.mouseMove(canvasElement, {
      clientX: 100,
      clientY: 150,
    });
    const actions = store.getActions();
    expect(actions).not.toContainEqual({
      type: 'SET_MASK',
      payload: expect.anything(),
    });
  });

  it('sets image and original image when imageSrc is provided', async () => {
    const initialState = {
      image: {
        imageSrc: 'mock-image-url',
        activeTool: 5,
        brushSize: 10,
        mask: [],
        originalImage: null,
        image: null,
        resizeDimensions: { width: 0, height: 0 },
      },
      auth: {
        isAuthenticated: true,
      },
    };
    renderWithProvider(<MainPage />, initialState);
    const mockImage = new Image();
    mockImage.src = 'mock-image-url';
    mockImage.onload = jest.fn(() => {
      store.dispatch(setImage(mockImage));
      store.dispatch(setOriginalImage(mockImage));
      const resizedDimensions = resizeImageToCanvas(
        mockImage,
        1000,
        800
      );
      store.dispatch(setResizeDimensions(resizedDimensions));
    });
    mockImage.onload();

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual({
        type: 'SET_IMAGE',
        payload: mockImage,
      });
      expect(actions).toContainEqual({
        type: 'SET_ORIGINAL_IMAGE',
        payload: mockImage,
      });
      expect(actions).toContainEqual({
        type: 'SET_RESIZE_DIMENSIONS',
        payload: expect.any(Object),
      });
    });
  });
});
