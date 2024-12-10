import React, { useEffect } from 'react';
import styles from './remove-bg-tool.module.css';
import {
  setBrushSize,
  setImage,
  setImageBeforeRemove,
  setMask,
} from '../../../services/actions/image-actions';
import { useSelector, useDispatch } from 'react-redux';
import { applyMaskToImageData } from '../../../utils/image-utils';
import AuthRequired from '../auth-required/auth-required';

const RemoveBgTool = ({ canvasRef }) => {
  const dispatch = useDispatch();
  const { imageBeforeRemove, image, brushSize, mask } = useSelector(
    (state) => state.image
  );
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!imageBeforeRemove && image) {
      dispatch(setImageBeforeRemove(image));
    }
  }, [image, imageBeforeRemove, dispatch]);
  const handleRemoveBackground = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    if (mask.length === 0) return;
    const imageData = ctx.getImageData(0, 0, width, height);
    applyMaskToImageData(imageData, mask);
    ctx.putImageData(imageData, 0, 0);
    const updatedImage = new Image();
    updatedImage.src = canvas.toDataURL();
    updatedImage.onload = () => {
      dispatch(setImage(updatedImage));
    };
    dispatch(setMask([]));
  };
  const handleReset = () => {
    if (imageBeforeRemove) {
      dispatch(setImage(imageBeforeRemove));
      dispatch(setMask([]));
    }
  };
  if (!isAuth) {
    return <AuthRequired />;
  }
  return (
    <div className={styles.container}>
      <label className={styles.brushSizeLabel} htmlFor="brushSize">
        Размер кисти: {brushSize}
      </label>
      <input
        type="range"
        id="brushSize"
        min="5"
        max="200"
        value={brushSize}
        onChange={(e) =>
          dispatch(setBrushSize(Number(e.target.value)))
        }
        className={styles.rangeInput}
        aria-label="brush size"
      />
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          onClick={handleRemoveBackground}
          disabled={!image}
        >
          Удалить фон
        </button>
        <button
          className={styles.button}
          onClick={handleReset}
          disabled={!imageBeforeRemove}
        >
          Сброс
        </button>
      </div>
    </div>
  );
};

export default RemoveBgTool;
