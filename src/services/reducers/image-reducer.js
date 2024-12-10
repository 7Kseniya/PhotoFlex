const actionsWithoutHistory = [
  'SET_IMAGE_SRC',
  'SET_IMAGE',
  'SET_ORIGINAL_IMAGE',
  'SET_ACTIVE_TOOL',
  'SET_SHOW_ORIGINAL',
  'SET_IS_DRAG_OVER',
];

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
  imageBeforeRemove: null,
  past: [],
  future: [],
  hasInitializedResize: false,
};

const getPresentState = (state) => {
  // eslint-disable-next-line no-unused-vars
  const { past, future, hasInitializedResize, ...present } = state;
  return present;
};

export const imageReducer = (state = initialState, action) => {
  const shouldAddToHistory = !actionsWithoutHistory.includes(
    action.type
  );

  switch (action.type) {
    case 'UNDO': {
      console.log('UNDO');
      console.log(state.past.length);
      if (state.past.length === 0) {
        return state;
      }
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        ...previous,
        past: newPast,
        future: [getPresentState(state), ...state.future],
        hasInitializedResize: state.hasInitializedResize,
      };
    }

    case 'REDO': {
      console.log('REDO');
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
        hasInitializedResize: state.hasInitializedResize,
      };
    }

    case 'SET_RESIZE_DIMENSIONS':
      console.log('SET_RESIZE_DIMENSIONS');
      console.log(state.past.length);
      if (!state.hasInitializedResize) {
        return {
          ...state,
          resizeDimensions: action.payload,
          hasInitializedResize: true,
        };
      } else {
        return {
          ...state,
          resizeDimensions: action.payload,
          ...(shouldAddToHistory
            ? {
                past: [...state.past, getPresentState(state)],
                future: [],
              }
            : {}),
          hasInitializedResize: true,
        };
      }

    case 'SET_ACTIVE_TOOL':
      console.log('SET_ACTIVE_TOOL');
      console.log(state.past.length);
      return {
        ...state,
        activeTool: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_IMAGE_SRC':
      console.log('SET_IMAGE_SRC');
      console.log(state.past.length);
      return {
        ...state,
        imageSrc: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_IS_DRAG_OVER':
      console.log('SET_IS_DRAG_OVER');
      console.log(state.past.length);
      return {
        ...state,
        isDragOver: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_CROP_AREA':
      console.log('SET_CROP_AREA');
      console.log(state.past.length);
      return {
        ...state,
        cropArea: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_CROP_DIMENSIONS':
      console.log('SET_CROP_DIMENSIONS');
      console.log(state.past.length);
      return {
        ...state,
        cropDimensions: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_ROTATION_ANGLE':
      console.log('SET_ROTATION_ANGLE');
      console.log(state.past.length);
      return {
        ...state,
        rotationAngle: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_FILTER':
      console.log('SET_FILTER');
      console.log(state.past.length);
      return {
        ...state,
        filter: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_BRUSH_SIZE':
      console.log('SET_BRUSH_SIZE');
      console.log(state.past.length);
      return {
        ...state,
        brushSize: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_MASK':
      console.log('SET_MASK');
      console.log(state.past.length);
      return {
        ...state,
        mask: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_APPLIED_MASK':
      console.log('SET_APPLIED_MASK');
      console.log(state.past.length);
      return {
        ...state,
        appliedMask: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_DRAWING':
      console.log('SET_DRAWING');
      console.log(state.past.length);
      return {
        ...state,
        drawing: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_SHOW_ORIGINAL':
      console.log('SET_SHOW_ORIGINAL');
      console.log(state.past.length);
      return {
        ...state,
        showOriginal: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_ORIGINAL_IMAGE':
      console.log('SET_ORIGINAL_IMAGE');
      console.log(state.past.length);
      return {
        ...state,
        originalImage: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
      };

    case 'SET_IMAGE':
      console.log('SET_IMAGE');
      console.log(state.past.length);
      return {
        ...state,
        image: action.payload,
        ...(shouldAddToHistory
          ? {
              past: [...state.past, getPresentState(state)],
              future: [],
            }
          : {}),
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
