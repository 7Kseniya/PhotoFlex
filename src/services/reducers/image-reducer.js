import {
  SET_IMAGE_SRC,
  SET_ROTATION,
  SET_CROP,
  SET_ACTIVE_TOOL,
  SET_IS_DRAG_OVER,
} from '../actions/image-actions';

const initialState = {
  activeTool: -1,
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

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TOOL:
      return {
        ...state,
        activeTool: action.payload,
      };
    case SET_IMAGE_SRC:
      return {
        ...state,
        imageSrc: action.payload || null,
        rotation: 0,
      };
    case SET_ROTATION:
      return {
        ...state,
        rotation: action.payload,
      };
    case SET_CROP:
      return {
        ...state,
        crop: {
          ...state.crop,
          ...action.payload,
        },
      };

    case SET_IS_DRAG_OVER:
      return {
        ...state,
        isDragOver: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
