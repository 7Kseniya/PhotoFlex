import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolBar from '../src/components/tool-bar/tool-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import imageReducer from '../src/services/reducers/image-reducer';
const mockStore = createStore(imageReducer);
const renderWithProvider = (component) => {
  return render(<Provider store={mockStore}>{component}</Provider>);
};
describe('ToolBar component', () => {
  it('should render all icons', () => {
    const { getByTestId } = renderWithProvider(
      <ToolBar onRotate={jest.fn()} />
    );
    for (let i = 0; i < 8; i++) {
      expect(getByTestId(`icon-${i}`)).toBeInTheDocument();
    }
  });
});
