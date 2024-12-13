import imageReducer from '../src/services/reducers/image-reducer';

describe('imageReducer', () => {
  const getPresentState = (state) => {
    const { past, future, hasInitializedResize, ...present } = state;
    return present;
  };

  const initialState = {
    imageSrc: null,
    imageFix: null,
    isDragOver: false,
    activeTool: 0,
    rotationAngle: 0,
    resizeDimensions: { width: 2000, height: 2000 },
    cropArea: { x: 0, y: 0 },
    mask: [],
    appliedMask: [],
    brushSize: 10,
    imageBeforeRemove: null,
    drawing: false,
    filter: 'none',
    showOriginal: false,
    originalImage: null,
    image: null,
    past: [],
    future: [],
    hasInitializedResize: false,
  };

  it('should return the initial state when no action is passed', () => {
    expect(imageReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_ACTIVE_TOOL action', () => {
    const action = {
      type: 'SET_ACTIVE_TOOL',
      payload: 1,
    };
    const expectedState = {
      ...initialState,
      activeTool: 1,
      past: [],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_IMAGE_SRC action', () => {
    const action = {
      type: 'SET_IMAGE_SRC',
      payload: 'image-src-path',
    };
    const expectedState = {
      ...initialState,
      imageSrc: 'image-src-path',
      past: [],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_IS_DRAG_OVER action', () => {
    const action = {
      type: 'SET_IS_DRAG_OVER',
      payload: true,
    };
    const expectedState = {
      ...initialState,
      isDragOver: true,
      past: [],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_CROP_AREA action', () => {
    const action = {
      type: 'SET_CROP_AREA',
      payload: { x: 50, y: 50 },
    };
    const expectedState = {
      ...initialState,
      cropArea: { x: 50, y: 50 },
      past: [getPresentState(initialState)],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_ROTATION_ANGLE action', () => {
    const action = {
      type: 'SET_ROTATION_ANGLE',
      payload: 90,
    };
    const expectedState = {
      ...initialState,
      rotationAngle: 90,
      past: [getPresentState(initialState)],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_FILTER action', () => {
    const action = {
      type: 'SET_FILTER',
      payload: 'grayscale',
    };
    const expectedState = {
      ...initialState,
      filter: 'grayscale',
      past: [getPresentState(initialState)],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_BRUSH_SIZE action', () => {
    const action = {
      type: 'SET_BRUSH_SIZE',
      payload: 15,
    };
    const expectedState = {
      ...initialState,
      brushSize: 15,
      past: [getPresentState(initialState)],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_MASK action', () => {
    const action = {
      type: 'SET_MASK',
      payload: [{ x: 10, y: 10, brushSize: 5 }],
    };
    const expectedState = {
      ...initialState,
      mask: [{ x: 10, y: 10, brushSize: 5 }],
      past: [getPresentState(initialState)],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_APPLIED_MASK action', () => {
    const action = {
      type: 'SET_APPLIED_MASK',
      payload: [{ x: 20, y: 20, brushSize: 5 }],
    };
    const expectedState = {
      ...initialState,
      appliedMask: [{ x: 20, y: 20, brushSize: 5 }],
      past: [getPresentState(initialState)],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_DRAWING action', () => {
    const action = {
      type: 'SET_DRAWING',
      payload: true,
    };
    const expectedState = {
      ...initialState,
      drawing: true,
      past: [getPresentState(initialState)],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_RESIZE_DIMENSIONS action', () => {
    const action = {
      type: 'SET_RESIZE_DIMENSIONS',
      payload: { width: 2500, height: 2500 },
    };
    const expectedState = {
      ...initialState,
      resizeDimensions: { width: 2500, height: 2500 },
      hasInitializedResize: true,
      past: [],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_SHOW_ORIGINAL action', () => {
    const action = {
      type: 'SET_SHOW_ORIGINAL',
      payload: true,
    };
    const expectedState = {
      ...initialState,
      showOriginal: true,
      past: [],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_ORIGINAL_IMAGE action', () => {
    const action = {
      type: 'SET_ORIGINAL_IMAGE',
      payload: { src: 'original-image-path' },
    };
    const expectedState = {
      ...initialState,
      originalImage: { src: 'original-image-path' },
      past: [],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_IMAGE action', () => {
    const action = {
      type: 'SET_IMAGE',
      payload: { src: 'image-path' },
    };
    const expectedState = {
      ...initialState,
      image: { src: 'image-path' },
      past: [],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_CROP_DIMENSIONS action', () => {
    const action = {
      type: 'SET_CROP_DIMENSIONS',
      payload: { width: 100, height: 100 },
    };
    const expectedState = {
      ...initialState,
      cropDimensions: { width: 100, height: 100 },
      past: [getPresentState(initialState)],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UNDO action', () => {
    const action = {
      type: 'UNDO',
    };
    const expectedState = {
      ...initialState,
      past: [],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle REDO action', () => {
    const action = {
      type: 'REDO',
    };
    const expectedState = {
      ...initialState,
      past: [],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle SET_RESIZE_DIMENSIONS when hasInitializedResize is false', () => {
    const action = {
      type: 'SET_RESIZE_DIMENSIONS',
      payload: { width: 2500, height: 2500 },
    };
    const state = {
      ...initialState,
      hasInitializedResize: false,
    };

    const expectedState = {
      ...state,
      resizeDimensions: { width: 2500, height: 2500 },
      hasInitializedResize: true,
    };

    expect(imageReducer(state, action)).toEqual(expectedState);
  });

  it('should handle SET_RESIZE_DIMENSIONS when hasInitializedResize is true and add to history', () => {
    const action = {
      type: 'SET_RESIZE_DIMENSIONS',
      payload: { width: 3000, height: 3000 },
    };
    const state = {
      ...initialState,
      hasInitializedResize: true,
      past: [],
    };

    const expectedState = {
      ...state,
      resizeDimensions: { width: 3000, height: 3000 },
      past: [getPresentState(state)],
      future: [],
    };

    expect(imageReducer(state, action)).toEqual(expectedState);
  });
  it('should handle UNDO when past is empty', () => {
    const action = { type: 'UNDO' };

    const state = {
      ...initialState,
      past: [],
    };

    expect(imageReducer(state, action)).toEqual(state);
  });

  it('should handle UNDO when past contains states', () => {
    const previousState = { ...initialState, activeTool: 1 };
    const state = {
      ...initialState,
      past: [previousState],
      future: [],
    };

    const action = { type: 'UNDO' };

    const expectedState = {
      ...previousState,
      past: [],
      future: [getPresentState(state)],
    };

    expect(imageReducer(state, action)).toEqual(expectedState);
  });
  it('should handle REDO when future is empty', () => {
    const action = { type: 'REDO' };

    const state = {
      ...initialState,
      future: [],
    };

    expect(imageReducer(state, action)).toEqual(state);
  });

  it('should handle REDO when future contains states', () => {
    const nextState = { ...initialState, activeTool: 2 };
    const state = {
      ...initialState,
      past: [],
      future: [nextState],
    };

    const action = { type: 'REDO' };

    const expectedState = {
      ...nextState,
      past: [getPresentState(state)],
      future: [],
    };

    expect(imageReducer(state, action)).toEqual(expectedState);
  });
  it('should not add to history for actions in actionsWithoutHistory', () => {
    const action = { type: 'SET_ACTIVE_TOOL', payload: 1 };

    const state = {
      ...initialState,
      past: [],
    };

    const expectedState = {
      ...state,
      activeTool: 1,
    };

    expect(imageReducer(state, action)).toEqual(expectedState);
  });
  it('should keep hasInitializedResize flag after REDO', () => {
    const nextState = { ...initialState, rotationAngle: 30 };
    const state = {
      ...initialState,
      hasInitializedResize: true,
      past: [],
      future: [nextState],
    };

    const action = { type: 'REDO' };
    const expectedState = {
      ...nextState,
      past: [getPresentState(state)],
      future: [],
      hasInitializedResize: true,
    };
    expect(imageReducer(state, action)).toEqual(expectedState);
  });

  it('should return current state for an unknown action type', () => {
    const action = { type: 'UNKNOWN_ACTION', payload: 123 };
    expect(imageReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle SET_IMAGE_BEFORE_REMOVE without changing history if in actionsWithoutHistory (not in list, so adds history)', () => {
    const previousState = {
      ...initialState,
      brushSize: 20,
      past: [],
    };

    const testImage = { src: 'before-remove-image-2' };
    const action = {
      type: 'SET_IMAGE_BEFORE_REMOVE',
      payload: testImage,
    };

    const expectedState = {
      ...previousState,
      imageBeforeRemove: testImage,
      past: [getPresentState(previousState)],
      future: [],
    };

    expect(imageReducer(previousState, action)).toEqual(
      expectedState
    );
  });
  it('should not add to history for actions in actionsWithoutHistory (e.g. SET_IS_DRAG_OVER)', () => {
    const action = { type: 'SET_IS_DRAG_OVER', payload: true };
    const expectedState = {
      ...initialState,
      isDragOver: true,
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should not add to history for actions in actionsWithoutHistory (e.g. SET_IMAGE)', () => {
    const testImage = { src: 'test-image' };
    const action = { type: 'SET_IMAGE', payload: testImage };
    const expectedState = {
      ...initialState,
      image: testImage,
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle SET_IMAGE_BEFORE_REMOVE action', () => {
    const testImage = { src: 'before-remove-image' };
    const action = {
      type: 'SET_IMAGE_BEFORE_REMOVE',
      payload: testImage,
    };
    const expectedState = {
      ...initialState,
      imageBeforeRemove: testImage,
      past: [getPresentState(initialState)],
      future: [],
    };
    expect(imageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_STATE action', () => {
    const modifiedState = {
      ...initialState,
      activeTool: 1,
      mask: [{ x: 10, y: 10 }],
      past: [{ ...initialState, activeTool: 0 }],
      future: [{ ...initialState, activeTool: 2 }],
    };
    const action = { type: 'RESET_STATE' };
    expect(imageReducer(modifiedState, action)).toEqual(initialState);
  });
});
