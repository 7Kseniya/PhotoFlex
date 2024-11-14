import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Crop from '../src/components/tools/crop-tool/crop-tools';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
console.warn = jest.fn();
const renderWithProvider = (component, initialState) => {
  const store = mockStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
};
describe('Crop Component', () => {
  let store;
  beforeEach(() => {
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

    const cropSquare = screen.getByTestId('crop-4:4');
    expect(cropSquare).toBeInTheDocument();

    const crop916 = screen.getByTestId('crop-9:16');
    expect(crop916).toBeInTheDocument();

    const crop32 = screen.getByTestId('crop-3:2');
    expect(crop32).toBeInTheDocument();

    const crop54 = screen.getByTestId('crop-5:4');
    expect(crop54).toBeInTheDocument();

    const crop75 = screen.getByTestId('crop-7:5');
    expect(crop75).toBeInTheDocument();
  });
});
