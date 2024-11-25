import React from 'react';
import styles from './remove-bg-tool.module.css';
import {
  setAppliedMask,
  setBrushSize,
  setMask,
} from '../../../services/actions/image-actions';
import { useSelector, useDispatch } from 'react-redux';
const RemoveBgTool = () => {
  const { brushSize, mask } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const handleRemoveBackground = () => {
    dispatch(setAppliedMask(mask));
  };
  const handleReset = () => {
    dispatch(setMask([]));
    dispatch(setAppliedMask([]));
  };
  return (
    <div
      className={styles.container}
      data-testid="remove-bg-component"
    >
      <label htmlFor="brushSize">Размер кисти: {brushSize}</label>
      <input
        type="range"
        id="brushSize"
        min="5"
        max="100"
        value={brushSize}
        onChange={(e) =>
          dispatch(setBrushSize(Number(e.target.value)))
        }
        className={styles.rangeInput}
        data-testid="brush-size"
        aria-label="brush size"
      />
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          onClick={handleRemoveBackground}
          data-testid="remove-background-button"
        >
          Удалить фон
        </button>
        <button
          className={styles.button}
          onClick={handleReset}
          data-testid="reset-button"
        >
          Сброс
        </button>
      </div>
    </div>
  );
};

export default RemoveBgTool;
