import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RemoveBgTool from '../src/components/tools/remove-bg-tool/remove-bg-tool';
import * as imageActions from '../src/services/actions/image-actions';
import { applyMaskToImageData } from '../src/utils/image-utils';

const mockStore = configureStore([]);
const renderWithProvider = (component, initialState) => {
  const store = mockStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('RemoveBgTool Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders RemoveBgTool component correctly', () => {
    const initialState = {
      image: {
        imageBeforeRemove: null,
        image: null,
        brushSize: 10,
        mask: [],
      },
      auth: {
        isAuthenticated: true,
      },
    };

    renderWithProvider(
      <RemoveBgTool canvasRef={{ current: {} }} />,
      initialState
    );

    expect(screen.getByLabelText('brush size')).toBeInTheDocument();
    expect(screen.getByText('Удалить фон')).toBeInTheDocument();
    expect(screen.getByText('Сброс')).toBeInTheDocument();
  });

  it('disables "Удалить фон" button when no image is loaded', () => {
    const initialState = {
      image: {
        imageBeforeRemove: null,
        image: null,
        brushSize: 10,
        mask: [],
      },
      auth: {
        isAuthenticated: true,
      },
    };

    renderWithProvider(
      <RemoveBgTool canvasRef={{ current: {} }} />,
      initialState
    );

    const removeBgButton = screen.getByText('Удалить фон');
    expect(removeBgButton).toBeDisabled();
  });

  it('dispatches setBrushSize action when brush size slider is changed', () => {
    const initialState = {
      image: {
        imageBeforeRemove: null,
        image: null,
        brushSize: 10,
        mask: [],
      },
      auth: {
        isAuthenticated: true,
      },
    };

    const { store } = renderWithProvider(
      <RemoveBgTool canvasRef={{ current: {} }} />,
      initialState
    );

    const brushSizeSlider = screen.getByLabelText('brush size');
    fireEvent.change(brushSizeSlider, { target: { value: '50' } });

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'SET_BRUSH_SIZE', payload: 50 },
    ]);
  });

  it('dispatches setImageBeforeRemove when image is set', () => {
    const initialState = {
      image: {
        imageBeforeRemove: null,
        image: { src: 'test-image' },
        brushSize: 10,
        mask: [],
      },
      auth: {
        isAuthenticated: true,
      },
    };

    const spy = jest.spyOn(imageActions, 'setImageBeforeRemove');
    renderWithProvider(
      <RemoveBgTool canvasRef={{ current: {} }} />,
      initialState
    );

    expect(spy).toHaveBeenCalledWith({ src: 'test-image' });
  });

  it('disables "Сброс" button when no imageBeforeRemove is available', () => {
    const initialState = {
      image: {
        imageBeforeRemove: null,
        image: null,
        brushSize: 10,
        mask: [],
      },
      auth: {
        isAuthenticated: true,
      },
    };

    renderWithProvider(
      <RemoveBgTool canvasRef={{ current: {} }} />,
      initialState
    );

    const resetButton = screen.getByText('Сброс');
    expect(resetButton).toBeDisabled();
  });

  it('calls handleReset correctly', () => {
    const initialState = {
      image: {
        imageBeforeRemove: { src: 'original-image' },
        image: { src: 'test-image' },
        brushSize: 10,
        mask: [],
      },
      auth: {
        isAuthenticated: true,
      },
    };

    const { store } = renderWithProvider(
      <RemoveBgTool canvasRef={{ current: {} }} />,
      initialState
    );

    const resetButton = screen.getByText('Сброс');
    fireEvent.click(resetButton);

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'SET_IMAGE',
      payload: { src: 'original-image' },
    });
    expect(actions).toContainEqual({ type: 'SET_MASK', payload: [] });
  });
  it('should render AuthRequired if user is not authenticated', () => {
    const initialState = {
      image: {
        imageBeforeRemove: null,
        image: null,
        brushSize: 10,
        mask: [],
      },
      auth: {
        isAuthenticated: false,
      },
    };

    renderWithProvider(
      <RemoveBgTool canvasRef={{ current: {} }} />,
      initialState
    );
  });

  it('should render RemoveBgTool if user is authenticated', () => {
    const initialState = {
      image: {
        imageBeforeRemove: null,
        image: null,
        brushSize: 10,
        mask: [],
      },
      auth: {
        isAuthenticated: true,
      },
    };

    renderWithProvider(
      <RemoveBgTool canvasRef={{ current: {} }} />,
      initialState
    );

    expect(screen.getByLabelText('brush size')).toBeInTheDocument();
    expect(screen.getByText('Удалить фон')).toBeInTheDocument();
  });
  it('should do nothing if no image is loaded or canvas is not available', () => {
    const initialState = {
      image: {
        imageBeforeRemove: null,
        image: null,
        brushSize: 10,
        mask: [],
      },
      auth: {
        isAuthenticated: true,
      },
    };

    const canvasRef = { current: null };
    const { store } = renderWithProvider(
      <RemoveBgTool canvasRef={canvasRef} />,
      initialState
    );
    fireEvent.click(screen.getByText('Удалить фон'));
    const actions = store.getActions();
    expect(actions).toHaveLength(0);
  });
});
