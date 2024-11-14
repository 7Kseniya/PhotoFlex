export const setImageSrc = (src) => ({
  type: 'SET_IMAGE_SRC',
  payload: src,
});

export const setIsDragOver = (isDragOver) => ({
  type: 'SET_IS_DRAG_OVER',
  payload: isDragOver,
});
export const setActiveTool = (toolIndex) => ({
  type: 'SET_ACTIVE_TOOL',
  payload: toolIndex,
});

export const setRotationAngle = (angle) => ({
  type: 'SET_ROTATION_ANGLE',
  payload: angle,
});
export const setCropDimensions = (width, height) => ({
  type: 'SET_CROP_DIMENSIONS',
  payload: { width, height },
});
