import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ImageCrop from '../src/components/editor-actions/image-crop';
import '@testing-library/jest-dom';
import Crop from '../src/components/tools/crop-tool/crop-tools';
import { setCrop } from '../src/services/actions/image-actions';

const mockStore = configureStore([]);

describe('ImageCrop Component', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      crop: {
        cropX: 0,
        cropY: 0,
        cropWidth: 200,
        cropHeight: 150,
      },
      imageSrc: 'test-image-src',
    };
    store = mockStore(initialState);
  });

  it('renders container div for image crop', () => {
    render(
      <Provider store={store}>
        <ImageCrop />
      </Provider>
    );

    const container = screen.getByTestId('image-crop-container');
    expect(container).toBeInTheDocument();
  });

  it('renders canvas element inside the container', () => {
    render(
      <Provider store={store}>
        <ImageCrop />
      </Provider>
    );

    const canvas = screen.getByTestId('image-crop');
    expect(canvas).toBeInTheDocument();
  });

  it('renders with the correct crop values from the store', () => {
    render(
      <Provider store={store}>
        <ImageCrop />
      </Provider>
    );

    const canvas = screen.getByTestId('image-crop');
    expect(canvas.width).toBe(300);
    expect(canvas.height).toBe(150);
  });
});

describe('Crop Component - Function Tests', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      crop: {
        cropX: 0,
        cropY: 0,
        cropWidth: 200,
        cropHeight: 150,
      },
      imageSrc: 'test-image-src',
    };
    store = mockStore(initialState);
  });

  it('calls handlePresetSelect and dispatches correct action for preset selection', () => {
    render(
      <Provider store={store}>
        <Crop />
      </Provider>
    );
    const preset16x9 = screen.getByTestId('crop-16:9');
    fireEvent.click(preset16x9);
    const actions = store.getActions();
    expect(actions).toEqual([
      setCrop({
        cropX: 0,
        cropY: 0,
        cropWidth: 400,
        cropHeight: 225,
      }),
    ]);
  });
});
