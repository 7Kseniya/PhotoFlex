import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Rotate from '../src/components/tools/rotate-tool/rotate-tools';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
console.warn = jest.fn();
const mockStore = configureStore([]);
const renderWithProvider = (component, initialState) => {
  const store = mockStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Rotate Component', () => {
  let store;
  beforeEach(() => {
    const initialState = {
      image: {
        rotationAngle: 0,
      },
    };
    const renderResult = renderWithProvider(<Rotate />, initialState);
    store = renderResult.store;
  });

  it('renders rotate component with icons and slider', () => {
    const rotateComponent = screen.getByTestId('rotate-component');
    expect(rotateComponent).toBeInTheDocument();

    const rotateLeftIcon = screen.getByTestId('rotate-left-icon');
    expect(rotateLeftIcon).toBeInTheDocument();

    const rotateRightIcon = screen.getByTestId('rotate-right-icon');
    expect(rotateRightIcon).toBeInTheDocument();

    const rotationSlider = screen.getByTestId('rotation-slider');
    expect(rotationSlider).toBeInTheDocument();
  });

  it('handles rotate left click', () => {
    const rotateLeftIcon = screen.getByTestId('rotate-left-icon');
    fireEvent.click(rotateLeftIcon);

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'SET_ROTATION_ANGLE', payload: 270 },
    ]);
  });

  it('handles rotate right click', () => {
    const rotateRightIcon = screen.getByTestId('rotate-right-icon');
    fireEvent.click(rotateRightIcon);

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'SET_ROTATION_ANGLE', payload: 90 },
    ]);
  });

  it('renders reset button', () => {
    render(
        <Provider store={store}>
          <Rotate />
        </Provider>
    );

    const resetButtons = screen.getAllByTestId('reset-button');
    const resetButton = resetButtons[0];
    expect(resetButton).toBeInTheDocument();
  });
});
