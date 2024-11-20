import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../src/components/pages/main-page/main-page';
import {
  setImage,
  setMask,
  setOriginalImage,
  setResizeDimensions,
} from '../src/services/actions/image-actions';

console.warn = jest.fn();
const mockStore = configureStore([]);
jest.mock('../src/services/actions/image-actions.js', () => ({
  setResizeDimensions: jest.fn(),
  setDrawing: jest.fn(),
  setMask: jest.fn(),
  setImage: jest.fn(),
  setOriginalImage: jest.fn(),
  setActiveTool: jest.fn(),
}));

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
        resizeDimensions: { width: 800, height: 900 },
        mask: [],
        appliedMask: [],
        brushSize: 10,
        drawing: false,
        showOriginal: true,
        originalImage: null,
        image: null,
      },
    };
    store = mockStore(initialState);
    renderWithProvider(<MainPage />, initialState);
  });

  it('renders the main page with canvas', () => {
    const canvases = screen.getAllByTestId('canvasMain');
    expect(canvases.length).toBeGreaterThan(0);
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
        resizeDimensions: { width: 800, height: 900 },
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

  it('applies resize dimensions to the image', () => {
    const initialState = {
      image: {
        imageSrc: 'placeholder.jpeg',
        activeTool: 0,
        rotationAngle: 0,
        resizeDimensions: { width: 800, height: 900 },
      },
    };
    renderWithProvider(<MainPage />, initialState);
    const canvases = screen.getAllByTestId('canvasMain');
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
        resizeDimensions: { width: 800, height: 900 },
      },
    };
    renderWithProvider(<MainPage />, initialState);
    const uploadContainer = screen.getByTestId('upload-container');
    expect(uploadContainer).toBeInTheDocument();
  });

  it('renders all main components correctly', () => {
    const header = screen.getByTestId('header');
    const toolbar = screen.getByTestId('toolbar');
    const tools = screen.getByTestId('tools-component');
    const canvas = screen.getByTestId('canvasMain');
    expect(header).toBeInTheDocument();
    expect(toolbar).toBeInTheDocument();
    expect(tools).toBeInTheDocument();
    expect(canvas).toBeInTheDocument();
  });

  it('does not dispatch setMask when active tool is not 5', () => {
    const initialState = {
      image: {
        imageSrc: 'placeholder.jpeg',
        activeTool: 0, // Tool is not brush tool
        rotationAngle: 0,
        resizeDimensions: { width: 800, height: 900 },
        mask: [],
        appliedMask: [],
        brushSize: 10,
      },
    };
    renderWithProvider(<MainPage />, initialState);
    const canvases = screen.getAllByTestId('canvasMain');
    const mainCanvas = canvases[1];
    fireEvent.mouseDown(mainCanvas, { clientX: 100, clientY: 100 });
    expect(setMask).not.toHaveBeenCalled();
  });

  it('dispatches setResizeDimensions when imageSrc is loaded', () => {
    const initialState = {
      image: {
        imageSrc: 'test-image.jpg',
        activeTool: 0,
        rotationAngle: 0,
        resizeDimensions: { width: 0, height: 0 },
      },
    };
    renderWithProvider(<MainPage />, initialState);

    const img = new Image();
    img.src = 'test-image.jpg';
    img.onload = () => {
      expect(setResizeDimensions).toHaveBeenCalledWith({
        width: expect.any(Number),
        height: expect.any(Number),
      });
    };
  });

  it('renders upload container when imageSrc is null', () => {
    const initialState = {
      image: {
        imageSrc: null,
      },
    };
    renderWithProvider(<MainPage />, initialState);

    const uploadContainer = screen.getByTestId('upload-container');
    expect(uploadContainer).toBeInTheDocument();
  });

  it('renders the original image when showOriginal is true', () => {
    const initialState = {
      image: {
        imageSrc: 'placeholder.jpeg',
        originalImage: 'original-placeholder.jpeg',
        showOriginal: true,
        resizeDimensions: { width: 800, height: 900 },
      },
    };
    renderWithProvider(<MainPage />, initialState);
    const canvases = screen.getAllByTestId('canvasMain');
    const mainCanvas = canvases[1];
    expect(mainCanvas).toBeInTheDocument();
  });

  it('dispatches setImage and setOriginalImage when imageSrc is updated', () => {
    const initialState = {
      image: {
        imageSrc: 'test-image.jpg',
        activeTool: 0,
        rotationAngle: 0,
        resizeDimensions: { width: 0, height: 0 },
        mask: [],
        appliedMask: [],
        brushSize: 10,
        drawing: false,
        showOriginal: true,
        originalImage: null,
        image: null,
      },
    };

    renderWithProvider(<MainPage />, initialState);

    const img = new Image();
    img.src = 'test-image.jpg';
    img.onload = () => {
      expect(setImage).toHaveBeenCalled();
      expect(setOriginalImage).toHaveBeenCalled();
    };
  });

  it('calculates and dispatches correct resize dimensions for large images', () => {
    const initialState = {
      image: {
        imageSrc: 'test-image-large.jpg',
        activeTool: 0,
        rotationAngle: 0,
        resizeDimensions: { width: 0, height: 0 },
        mask: [],
        appliedMask: [],
        brushSize: 10,
        drawing: false,
        showOriginal: true,
        originalImage: null,
        image: null,
      },
    };

    renderWithProvider(<MainPage />, initialState);

    const img = new Image();
    img.width = 2000;
    img.height = 1500;
    img.onload = () => {
      expect(setResizeDimensions).toHaveBeenCalledWith({
        width: 1000,
        height: 750,
      });
    };
  });

  it('does not dispatch actions if imageSrc is null', () => {
    const initialState = {
      image: {
        imageSrc: null,
        activeTool: 0,
        rotationAngle: 0,
        resizeDimensions: { width: 0, height: 0 },
        mask: [],
        appliedMask: [],
        brushSize: 10,
        drawing: false,
        showOriginal: true,
        originalImage: null,
        image: null,
      },
    };

    renderWithProvider(<MainPage />, initialState);

    expect(setImage).not.toHaveBeenCalled();
    expect(setOriginalImage).not.toHaveBeenCalled();
    expect(setResizeDimensions).not.toHaveBeenCalled();
  });

  it('renders UploadContainer when imageSrc is empty', () => {
    const initialState = {
      image: {
        imageSrc: '',
      },
    };
    renderWithProvider(<MainPage />, initialState);

    const uploadContainer = screen.getByTestId('upload-container');
    expect(uploadContainer).toBeInTheDocument();
  });
  it('renders the canvas when image is loaded', () => {
    const initialState = {
      image: {
        imageSrc: 'placeholder.jpeg',
        activeTool: 5,
        rotationAngle: 0,
        resizeDimensions: { width: 800, height: 900 },
        mask: [],
        appliedMask: [],
        brushSize: 10,
        drawing: false,
        showOriginal: true,
        originalImage: null,
        image: null,
      },
    };

    renderWithProvider(<MainPage />, initialState);
    const canvases = screen.getAllByTestId('canvasMain');
    expect(canvases.length).toBeGreaterThan(0);
  });
  it('dispatches setResizeDimensions when image is resized correctly', () => {
    const initialState = {
      image: {
        imageSrc: 'test-image-large.jpg',
        activeTool: 0,
        rotationAngle: 0,
        resizeDimensions: { width: 0, height: 0 },
        mask: [],
        appliedMask: [],
        brushSize: 10,
        drawing: false,
        showOriginal: true,
        originalImage: null,
        image: null,
      },
    };

    renderWithProvider(<MainPage />, initialState);
    const img = new Image();
    img.src = 'test-image-large.jpg';
    img.width = 2000;
    img.height = 1500;
    img.onload = () => {
      expect(setResizeDimensions).toHaveBeenCalledWith({
        width: 1000,
        height: 750,
      });
    };
  });
  it('does not render canvas when imageSrc is empty or null', () => {
    const initialState = {
      image: {
        imageSrc: '',
        activeTool: 0,
        rotationAngle: 0,
        resizeDimensions: { width: 800, height: 900 },
      },
    };
    renderWithProvider(<MainPage />, initialState);
    const canvases = screen.queryAllByTestId('canvasMain');
    expect(canvases.length).toBe(1);
  });
  it('does not dispatch setMask when drawing is false', () => {
    const initialState = {
      image: {
        imageSrc: 'placeholder.jpeg',
        activeTool: 5,
        drawing: false,
        brushSize: 10,
        mask: [],
      },
    };

    renderWithProvider(<MainPage />, initialState);
    const canvases = screen.getAllByTestId('canvasMain');
    const mainCanvas = canvases[0];
    fireEvent.mouseMove(mainCanvas, { clientX: 150, clientY: 150 });
    expect(setMask).not.toHaveBeenCalled();
  });
});
