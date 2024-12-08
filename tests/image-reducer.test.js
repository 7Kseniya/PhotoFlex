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
});
