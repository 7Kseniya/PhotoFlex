import React from 'react';
import styles from './remove-bg-tool.module.css';

const RemoveBgTool = ({
  brushSize,
  onBrushSizeChange,
  onRemoveBackground,
  onReset,
}) => {
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
        onChange={(e) => onBrushSizeChange(Number(e.target.value))}
        className={styles.rangeInput}
        data-testid="brush-size"
        aria-label="brush size"
      />
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          onClick={onRemoveBackground}
          data-testid="remove-background-button"
        >
          Удалить фон
        </button>
        <button
          className={styles.button}
          onClick={onReset}
          data-testid="reset-button"
        >
          Сброс
        </button>
      </div>
    </div>
  );
};

export default RemoveBgTool;
