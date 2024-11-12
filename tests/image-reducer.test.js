import imageReducer from '../src/services/reducers/image-reducer';
import {
  SET_IMAGE_SRC,
  SET_ROTATION,
  SET_CROP,
  SET_ACTIVE_TOOL,
  SET_IS_DRAG_OVER,
} from '../src/services/actions/image-actions';

describe('imageReducer', () => {
  const initialState = {
    activeTool: 0,
    imageSrc: null,
    rotation: 0,
    crop: {
      cropX: 0,
      cropY: 0,
      cropWidth: 1000,
      cropHeight: 1000,
    },
    isDragOver: false,
  };
  it('should return the initial state', () => {
    expect(imageReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle SET_ACTIVE_TOOL', () => {
    const action = {
      type: SET_ACTIVE_TOOL,
      payload: 1,
    };
    const newState = imageReducer(initialState, action);
    expect(newState.activeTool).toBe(1);
  });

  it('should handle SET_IMAGE_SRC', () => {
    const action = {
      type: SET_IMAGE_SRC,
      payload: 'test-image.jpg',
    };
    const newState = imageReducer(initialState, action);
    expect(newState.imageSrc).toBe('test-image.jpg');
    expect(newState.rotation).toBe(0);
  });
  it('should handle SET_ROTATION', () => {
    const action = {
      type: SET_ROTATION,
      payload: 90,
    };
    const newState = imageReducer(initialState, action);
    expect(newState.rotation).toBe(90);
  });
  it('should handle SET_CROP', () => {
    const action = {
      type: SET_CROP,
      payload: {
        cropX: 10,
        cropY: 20,
        cropWidth: 800,
        cropHeight: 600,
      },
    };
    const newState = imageReducer(initialState, action);
    expect(newState.crop).toEqual({
      cropX: 10,
      cropY: 20,
      cropWidth: 800,
      cropHeight: 600,
    });
  });
  it('should handle SET_IS_DRAG_OVER', () => {
    const action = {
      type: SET_IS_DRAG_OVER,
      payload: true,
    };
    const newState = imageReducer(initialState, action);
    expect(newState.isDragOver).toBe(true);
  });

  it('should return the same state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = imageReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
