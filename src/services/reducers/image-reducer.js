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
    case 'SET_RESIZE_DIMENSIONS':
      return {
        ...state,
        resizeDimensions: action.payload,
      };
    case 'SET_ROTATION_ANGLE':
      return {
        ...state,
        rotationAngle: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
