const initialState = {
  imageSrc: null,
  imageFix: null,
  isDragOver: false,
  activeTool: 0,
  rotationAngle: 0,
  cropDimensions: { width: 800, height: 900 },
  mask: [],
  brushSize: 10,
  drawing: false,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TOOL':
      return {
        ...state,
        activeTool: action.payload,
      };
    case 'SET_IMAGE_SRC':
      return {
        ...state,
        imageSrc: action.payload,
      };
    case 'SET_IS_DRAG_OVER':
      return {
        ...state,
        isDragOver: action.payload,
      };
    case 'SET_CROP_DIMENSIONS':
      return {
        ...state,
        cropDimensions: action.payload,
      };
    case 'SET_ROTATION_ANGLE':
      return {
        ...state,
        rotationAngle: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
