import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
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
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('MainPage Component', () => {
  let store;
  beforeEach(() => {
    const initialState = {
      image: {
        imageSrc: 'placeholder.jpeg',
        activeTool: 5,
        rotationAngle: 0,
        cropDimensions: { width: 800, height: 900 },
        filter: 'none',
      },
    };
    store = mockStore(initialState);
    renderWithProvider(<MainPage />, initialState);
  });

  it('renders the main page with canvas', () => {
    const canvases = screen.getAllByTestId('canvas');
    expect(canvases.length).toBeGreaterThan(0);
  });

  it('handles mouse down event on canvas', () => {
    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('handles mouse move event on canvas', () => {
    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('handles mouse up event on canvas', () => {
    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    fireEvent.mouseUp(canvas);
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('renders the header', () => {
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('renders the upload container when there is no image', () => {
    const initialState = {
      image: {
        imageSrc: '',
        activeTool: 0,
        rotationAngle: 0,
        cropDimensions: { width: 800, height: 900 },
      },
    };
    renderWithProvider(<MainPage />, initialState);

    const uploadContainer = screen.getByTestId('upload-container');
    expect(uploadContainer).toBeInTheDocument();
  });

  it('renders the toolbar', () => {
    const toolbar = screen.getByTestId('toolbar');
    expect(toolbar).toBeInTheDocument();
  });

  it('renders the tools', () => {
    const tools = screen.getByTestId('tools-component');
    expect(tools).toBeInTheDocument();
  });

  it('handles brush size change', () => {
    const brushSizeInput = screen.getByTestId('brush-size');
    fireEvent.change(brushSizeInput, { target: { value: 20 } });
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('applies crop dimensions to the image', () => {
    const initialState = {
      image: {
        imageSrc: 'placeholder.jpeg',
        activeTool: 0,
        rotationAngle: 0,
        cropDimensions: { width: 800, height: 900 },
      },
    };
    renderWithProvider(<MainPage />, initialState);

    const canvases = screen.getAllByTestId('canvas');
    const mainCanvas = canvases[0];
    expect(mainCanvas).toHaveAttribute('width', '800');
    expect(mainCanvas).toHaveAttribute('height', '900');
  });
  it('renders upload container when imageSrc is empty', () => {
    const initialState = {
      image: {
        imageSrc: '',
        activeTool: 0,
        rotationAngle: 0,
        cropDimensions: { width: 800, height: 900 },
      },
    };
    renderWithProvider(<MainPage />, initialState);
    const uploadContainer = screen.getByTestId('upload-container');
    expect(uploadContainer).toBeInTheDocument();
  });
  it('handles reset action', () => {
    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
  it('handles remove background action', () => {
    const removeBackgroundButton = screen.getByTestId(
      'remove-background-button'
    );
    fireEvent.click(removeBackgroundButton);
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
  it('displays original image when Flip icon is pressed', () => {
    const flipIcon = screen.getByTestId('flip-icon');
    fireEvent.mouseDown(flipIcon);
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('reverts to modified image when Flip icon is released', () => {
    const flipIcon = screen.getByTestId('flip-icon');
    fireEvent.mouseDown(flipIcon);
    fireEvent.mouseUp(flipIcon);

    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('reverts to modified image when mouse leaves the Flip icon', () => {
    const flipIcon = screen.getByTestId('flip-icon');
    fireEvent.mouseDown(flipIcon);
    fireEvent.mouseLeave(flipIcon);

    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  // it('should apply the correct filter(none) on the canvas initially', async () => {
  //   const canvases = screen.getAllByTestId('canvas');
  //   const canvas = canvases[0];
  //   const canvasContext = canvas.getContext('2d');
  //   await waitFor(() => {
  //     expect(canvasContext.filter).toBe('none');
  //   });
  // });
});
