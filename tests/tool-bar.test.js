import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolBar from '../src/components/tool-bar/tool-bar';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const renderWithProvider = (component, initialState) => {
  const store = mockStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
};
describe('ToolBar component', () => {
  it('should render all icons', () => {
    const initialState = {
      image: {
        activeTool: 0,
      },
    };

    renderWithProvider(
      <ToolBar onRotate={jest.fn()} />,
      initialState
    );

    for (let i = 0; i < 8; i++) {
      expect(screen.getByTestId(`icon-${i}`)).toBeInTheDocument();
    }
  });
});
