import imageReducer from '../src/services/reducers/image-reducer';
import {
  setActiveTool,
  setResizeDimensions,
  setImageSrc,
  setIsDragOver,
  setRotationAngle,
  setFilter,
} from '../src/services/actions/image-actions';

describe('imageReducer', () => {
  const initialState = {
    imageSrc: null,
    imageFix: null,
    isDragOver: false,
    activeTool: 0,
    rotationAngle: 0,
    resizeDimensions: { width: 800, height: 900 },
    mask: [],
    brushSize: 10,
    drawing: false,
    filter: 'none',
  };
  it('should return the initial state', () => {
    expect(imageReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_IMAGE_SRC', () => {
    const action = setImageSrc('newImageSrc');
    const newState = imageReducer(initialState, action);
    expect(newState.imageSrc).toBe('newImageSrc');
  });

  it('should handle SET_IS_DRAG_OVER', () => {
    const action = setIsDragOver(true);
    const newState = imageReducer(initialState, action);
    expect(newState.isDragOver).toBe(true);
  });

  it('should handle SET_ACTIVE_TOOL', () => {
    const action = setActiveTool(1);
    const newState = imageReducer(initialState, action);
    expect(newState.activeTool).toBe(1);
  });

  it('should handle SET_ROTATION_ANGLE', () => {
    const action = setRotationAngle(90);
    const newState = imageReducer(initialState, action);
    expect(newState.rotationAngle).toBe(90);
  });

  it('should handle SET_RESIZE_DIMENSIONS', () => {
    const action = setResizeDimensions(600, 400);
    const newState = imageReducer(initialState, action);
    expect(newState.resizeDimensions).toEqual({
      width: 600,
      height: 400,
    });
  });

  it('should handle SET_FILTER', () => {
    const action = setFilter('grayscale');
    const newState = imageReducer(initialState, action);
    expect(newState.filter).toBe('grayscale');
  });

  it('should ignore unknown actions', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = imageReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
