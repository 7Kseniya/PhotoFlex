import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tools from '../src/components/tools/tools';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import imageReducer from '../src/services/reducers/image-reducer';
const renderWithProvider = (component, initialState) => {
  const store = createStore(imageReducer, initialState);
  return render(<Provider store={store}>{component}</Provider>);
};
describe('Tools Component', () => {
  it('renders Tunes component when activeTool is 0', () => {
    renderWithProvider(<Tools />, { activeTool: 0 });
    expect(screen.getByText('Brightness')).toBeInTheDocument();
  });
  it('renders Rotate component when activeTool is 2', () => {
    renderWithProvider(<Tools onRotate={jest.fn()} />, {
      activeTool: 2,
    });
    expect(
      screen.getByTestId('rotate-left-icon')
    ).toBeInTheDocument();
  });
  it('renders Filters component when activeTool is 4', () => {
    renderWithProvider(<Tools />, { activeTool: 4 });
    expect(screen.getByText('nebula')).toBeInTheDocument();
  });

  it('renders Text component when activeTool is 7', () => {
    renderWithProvider(<Tools />, { activeTool: 7 });
    expect(screen.getByText(/добавить текст/i)).toBeInTheDocument();
  });
});
