import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Resize from '../src/components/tools/resize-tool/resize-tools';
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

describe('Resize Component', () => {
  let store;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    const initialState = {
      image: {
        resizeDimensions: { width: 800, height: 900 },
      },
    };
    store = mockStore(initialState);
    renderWithProvider(<Resize />, initialState);
  });

  it('renders resize component with presets', () => {
    const resizeComponent = screen.getByTestId('resize-component');
    expect(resizeComponent).toBeInTheDocument();

    const resize169 = screen.getByTestId('resize-16:9');
    expect(resize169).toBeInTheDocument();
  });

  it('renders input fields with initial values', () => {
    const widthInput = screen.getByTestId('resize-width');
    const heightInput = screen.getByTestId('resize-height');

    expect(widthInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();

    expect(widthInput.value).toBe('800');
    expect(heightInput.value).toBe('900');
  });

  it('updates width and height dynamically on input', () => {
    const widthInput = screen.getByTestId('resize-width');
    const heightInput = screen.getByTestId('resize-height');

    fireEvent.change(widthInput, { target: { value: '1200' } });
    fireEvent.change(heightInput, { target: { value: '1600' } });

    expect(widthInput.value).toBe('1200');
    expect(heightInput.value).toBe('1600');

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_RESIZE_DIMENSIONS',
      payload: { width: 1200, height: 1600 },
    });
  });

  it('updates dimensions when a preset is clicked', () => {
    const resize916 = screen.getByTestId('resize-9:16');
    fireEvent.click(resize916);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_RESIZE_DIMENSIONS',
      payload: { width: 506, height: 900 },
    });

    const widthInput = screen.getByTestId('resize-width');
    const heightInput = screen.getByTestId('resize-height');

    expect(widthInput.value).toBe('506');
    expect(heightInput.value).toBe('900');
  });

  it('renders all presets with correct labels', () => {
    const resizePresets = [
      '16:9',
      '4:4',
      '9:16',
      '3:2',
      '5:4',
      '7:5',
    ];
    resizePresets.forEach((preset) => {
      const presetElement = screen.getByTestId(`resize-${preset}`);
      expect(presetElement).toBeInTheDocument();
    });
  });

  it('renders reset button', () => {
    render(
      <Provider store={store}>
        <Resize />
      </Provider>
    );

    const resetButtons = screen.getAllByTestId('reset-button');
    const resetButton = resetButtons[0];

    expect(resetButton).toBeInTheDocument();
  });
});
