import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from '../src/components/header/header';

const mockStore = configureStore([]);

describe('Header Component', () => {
  let store;
  let canvasRef;

  beforeEach(() => {
    store = mockStore({});
    canvasRef = {
      current: {
        toDataURL: jest
          .fn()
          .mockReturnValue('data:image/png;base64,mockImageData'),
        width: 800,
        height: 600,
      },
    };
  });

  it('renders Header component', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('handles format selection change', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'jpeg' } });

    expect(selectElement.value).toBe('jpeg');
  });

  it('handles save icon click', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );
    const saveIcon = screen.getByTestId('save-icon');
    fireEvent.click(saveIcon);

    expect(canvasRef.current.toDataURL).toHaveBeenCalledWith(
      'image/png'
    );
  });
  it('handles flip icon mouse events', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const flipIcon = screen.getByTestId('flip-icon');
    fireEvent.mouseDown(flipIcon);
    expect(store.getActions()).toEqual([
      { type: 'SET_SHOW_ORIGINAL', payload: true },
    ]);

    fireEvent.mouseUp(flipIcon);
    expect(store.getActions()).toEqual([
      { type: 'SET_SHOW_ORIGINAL', payload: true },
      { type: 'SET_SHOW_ORIGINAL', payload: false },
    ]);

    fireEvent.mouseLeave(flipIcon);
    expect(store.getActions()).toEqual([
      { type: 'SET_SHOW_ORIGINAL', payload: true },
      { type: 'SET_SHOW_ORIGINAL', payload: false },
      { type: 'SET_SHOW_ORIGINAL', payload: false },
    ]);
  });
  it('handles save icon click when canvas is null', () => {
    canvasRef = { current: null };

    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const saveIcon = screen.getByTestId('save-icon');
    fireEvent.click(saveIcon);
    expect(store.getActions()).toEqual([]);
  });
  it('navigates to personal account page when PersonAddIcon is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const personAddIcon = screen.getByTestId('PersonAddIcon');
    fireEvent.click(personAddIcon);
    expect(window.location.pathname).toBe('/personal-account');
  });
  it('navigates to home page when logo is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const logo = screen.getByAltText('logo');
    fireEvent.click(logo);
    expect(window.location.pathname).toBe('/');
  });
  it('handles redo icon', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const redoIcon = screen.getByTestId('redo-icon');

    expect(redoIcon).toBeInTheDocument();

    fireEvent.click(redoIcon);

    expect(store.getActions()).toContainEqual({ type: 'REDO' });
  });
  it('handles undo icon', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const undoIcon = screen.getByTestId('undo-icon');

    expect(undoIcon).toBeInTheDocument();

    fireEvent.click(undoIcon);

    expect(store.getActions()).toContainEqual({ type: 'UNDO' });
  });
});