export const SET_IMAGE_SRC = 'SET_IMAGE_SRC';
export const SET_ROTATION = 'SET_ROTATION';
export const SET_CROP = 'SET_CROP';
export const SET_ACTIVE_TOOL = 'SET_ACTIVE_TOOL';
export const SET_IS_DRAG_OVER = 'SET_IS_DRAG_OVER';

export const setImageSrc = (src) => ({
  type: SET_IMAGE_SRC,
  payload: src,
});
export const setRotation = (angle) => ({
  type: SET_ROTATION,
  payload: angle,
});

export const setCrop = (crop) => ({
  type: SET_CROP,
  payload: crop,
});
export const setActiveTool = (toolIndex) => ({
  type: SET_ACTIVE_TOOL,
  payload: toolIndex,
});

export const setIsDragOver = (isDragOver) => ({
  type: SET_IS_DRAG_OVER,
  payload: isDragOver,
});
