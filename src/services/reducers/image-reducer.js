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
};

const getPresentState = (state) => {
  const { past, future, ...present } = state;
  return present;
};

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UNDO': {
      console.log(state.past.length);
      if (state.past.length === 0) {
        console.log('+');
        return state;
      }
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        ...previous,
        past: newPast,
        future: [getPresentState(state), ...state.future],
      };
    }

    case 'REDO': {
      console.log(state.past.length);
      if (state.future.length === 0) {
        return state;
      }
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        ...next,
        past: [...state.past, getPresentState(state)],
        future: newFuture,
      };
    }
    case 'SET_ACTIVE_TOOL':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        activeTool: action.payload,
      };
    case 'SET_IMAGE_SRC':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        imageSrc: action.payload,
      };
    case 'SET_IS_DRAG_OVER':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        isDragOver: action.payload,
      };
    case 'SET_CROP_AREA':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        cropArea: action.payload,
      };
    case 'SET_CROP_DIMENSIONS':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        cropDimensions: action.payload,
      };
    case 'SET_ROTATION_ANGLE':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        rotationAngle: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        filter: action.payload,
      };
    case 'SET_BRUSH_SIZE':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        brushSize: action.payload,
      };
    case 'SET_MASK':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        mask: action.payload,
      };
    case 'SET_APPLIED_MASK':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        appliedMask: action.payload,
      };
    case 'SET_DRAWING':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        drawing: action.payload,
      };
    case 'SET_RESIZE_DIMENSIONS':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        resizeDimensions: action.payload,
      };
    case 'SET_SHOW_ORIGINAL':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        showOriginal: action.payload,
      };
    case 'SET_ORIGINAL_IMAGE':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        originalImage: action.payload,
      };
    case 'SET_IMAGE':
      return {
        ...state,
        past: [...state.past, getPresentState(state)],
        future: [],
        image: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
