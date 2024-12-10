import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import Header from '../src/components/header/header';

console.warn = jest.fn();

const mockStore = configureStore([]);

describe('Header Component', () => {
  let store;
  let canvasRef;
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mockObjectURL');
  });

  afterAll(() => {
    delete global.URL.createObjectURL;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({
      auth: {
        isAuthenticated: true,
      },
    });
    canvasRef = {
      current: {
        toDataURL: jest
          .fn()
          .mockReturnValue('data:image/png;base64,mockImageData'),
        width: 800,
        height: 600,
      },
    };
    axios.post.mockResolvedValue({ data: { token: 'mockToken' } });
    axios.get.mockResolvedValue({ data: { someData: 'mockData' } });
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
      {
        type: 'SET_SHOW_ORIGINAL',
        payload: false,
      },
    ]);

    fireEvent.mouseLeave(flipIcon);
    expect(store.getActions()).toEqual([
      { type: 'SET_SHOW_ORIGINAL', payload: true },
      {
        type: 'SET_SHOW_ORIGINAL',
        payload: false,
      },
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

  it('renders the correct initial format in the dropdown', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement.value).toBe('png');
  });

  it('changes the selected format in the dropdown', () => {
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
  it('downloads an SVG file when the format is set to SVG', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'svg' } });

    const saveIcon = screen.getByTestId('save-icon');
    fireEvent.click(saveIcon);
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(canvasRef.current.toDataURL).toHaveBeenCalled();
  });

  it('dispatches setShowOriginal actions correctly when FlipIcon is interacted with', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header canvasRef={canvasRef} />
        </Router>
      </Provider>
    );

    const flipIcon = screen.getByTestId('flip-icon');

    fireEvent.mouseDown(flipIcon);
    expect(store.getActions()).toContainEqual({
      type: 'SET_SHOW_ORIGINAL',
      payload: true,
    });

    fireEvent.mouseUp(flipIcon);
    expect(store.getActions()).toContainEqual({
      type: 'SET_SHOW_ORIGINAL',
      payload: false,
    });

    fireEvent.mouseLeave(flipIcon);
    expect(store.getActions()).toContainEqual({
      type: 'SET_SHOW_ORIGINAL',
      payload: false,
    });
  });
});
