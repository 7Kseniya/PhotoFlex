import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RemoveBgTool from '../src/components/tools/remove-bg-tool/remove-bg-tool';
import '@testing-library/jest-dom';
import {
  setAppliedMask,
  setBrushSize,
  setMask,
} from '../src/services/actions/image-actions';

const mockStore = configureStore([]);
const initialState = {
  image: {
    brushSize: 10,
    mask: [],
    appliedMask: [],
  },
};

describe('RemoveBgTool', () => {
  it('changes brush size when slider value is changed', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <RemoveBgTool />
      </Provider>
    );
    const slider = screen.getByTestId('brush-size');
    fireEvent.change(slider, { target: { value: '20' } });
    const actions = store.getActions();
    expect(actions).toEqual([setBrushSize(20)]);
  });

  it('calls setAppliedMask when "Удалить фон" button is clicked', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <RemoveBgTool />
      </Provider>
    );
    const removeBgButton = screen.getByTestId(
      'remove-background-button'
    );
    fireEvent.click(removeBgButton);
    const actions = store.getActions();
    expect(actions).toEqual([setAppliedMask([])]);
  });
  it('calls setMask and setAppliedMask with empty arrays when "Сброс" button is clicked', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <RemoveBgTool />
      </Provider>
    );
    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);
    const actions = store.getActions();
    expect(actions).toEqual([setMask([]), setAppliedMask([])]);
  });
});
