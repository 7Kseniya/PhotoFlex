import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filters from '../src/components/tools/filter-tool/filters-tools';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../src/services/reducers/image-reducer';
import { setFilter } from '../src/services/actions/image-actions';

const initialState = {
  image: {
    filter: 'none',
  },
};

const store = createStore(rootReducer, initialState);

describe('Filters component', () => {
  it('renders all filters with correct labels', () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );
    const filterNames = [
      'none',
      'grayscale',
      'sepia',
      'invert',
      'outerspace',
      'refulgence',
      'pink',
    ];
    filterNames.forEach((name) => {
      const filterLabels = screen.getAllByText(name);
      expect(filterLabels.length).toBeGreaterThan(0);
      filterLabels.forEach((label) => {
        expect(label).toBeInTheDocument();
      });
    });
  });

  it('dispatches setFilter with correct filter name when filter is clicked', () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );
    const grayscaleButton = screen.getByText('grayscale');
    fireEvent.click(grayscaleButton);
    expect(mockDispatch).toHaveBeenCalledWith(setFilter('grayscale'));
  });
});
