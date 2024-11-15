import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Crop from '../src/components/tools/crop-tool/crop-tools';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);
const renderWithProvider = (component, initialState) => {
  const store = mockStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Crop Component', () => {
  let store;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    const initialState = {
      image: {
        cropDimensions: { width: 800, height: 900 },
      },
    };
    store = mockStore(initialState);
    renderWithProvider(<Crop />, initialState);
  });

  it('renders crop component with presets', () => {
    const cropComponent = screen.getByTestId('crop-component');
    expect(cropComponent).toBeInTheDocument();

    const crop169 = screen.getByTestId('crop-16:9');
    expect(crop169).toBeInTheDocument();
  });

  it('renders input fields with initial values', () => {
    const widthInput = screen.getByTestId('crop-width');
    const heightInput = screen.getByTestId('crop-height');

    expect(widthInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();

    expect(widthInput.value).toBe('800');
    expect(heightInput.value).toBe('900');
  });

  it('updates width and height dynamically on input', () => {
    const widthInput = screen.getByTestId('crop-width');
    const heightInput = screen.getByTestId('crop-height');

    fireEvent.change(widthInput, { target: { value: '1200' } });
    fireEvent.change(heightInput, { target: { value: '1600' } });

    expect(widthInput.value).toBe('1200');
    expect(heightInput.value).toBe('1600');

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_CROP_DIMENSIONS',
      payload: { width: 1200, height: 1600 },
    });
  });

  it('updates dimensions when a preset is clicked', () => {
    const crop916 = screen.getByTestId('crop-9:16');
    fireEvent.click(crop916);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_CROP_DIMENSIONS',
      payload: { width: 506, height: 900 },
    });

    const widthInput = screen.getByTestId('crop-width');
    const heightInput = screen.getByTestId('crop-height');

    expect(widthInput.value).toBe('506');
    expect(heightInput.value).toBe('900');
  });

  it('renders all presets with correct labels', () => {
    const cropPresets = ['16:9', '4:4', '9:16', '3:2', '5:4', '7:5'];
    cropPresets.forEach((preset) => {
      const presetElement = screen.getByTestId(`crop-${preset}`);
      expect(presetElement).toBeInTheDocument();
    });
  });
});
