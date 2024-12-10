export const initialState = {
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
  imageBeforeRemove: null,
};

export const imageReducer = (state = initialState, action) => {
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
    case 'SET_CROP_AREA':
      return {
        ...state,
        cropArea: action.payload,
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
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'SET_BRUSH_SIZE':
      return {
        ...state,
        brushSize: action.payload,
      };
    case 'SET_MASK':
      return {
        ...state,
        mask: action.payload,
      };
    case 'SET_APPLIED_MASK':
      return {
        ...state,
        appliedMask: action.payload,
      };
    case 'SET_DRAWING':
      return {
        ...state,
        drawing: action.payload,
      };
    case 'SET_RESIZE_DIMENSIONS':
      return {
        ...state,
        resizeDimensions: action.payload,
      };
    case 'SET_SHOW_ORIGINAL':
      return {
        ...state,
        showOriginal: action.payload,
      };
    case 'SET_ORIGINAL_IMAGE':
      return {
        ...state,
        originalImage: action.payload,
      };
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload,
      };
    case 'SET_IMAGE_BEFORE_REMOVE':
      return {
        ...state,
        imageBeforeRemove: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
