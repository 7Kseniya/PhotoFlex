import React from 'react';
import { useSelector } from 'react-redux';
import styles from './tools.module.css';
import Tunes from './tune-tool/tunes-tools';
import Filters from './filter-tool/filters-tools';
import Resize from './resize-tool/resize-tools';
import Rotate from './rotate-tool/rotate-tools';
import RemoveBgTool from './remove-bg-tool/remove-bg-tool';
import TextTool from './text-tool/text-tools';

const Tools = ({
  brushSize,
  onBrushSizeChange,
  onRemoveBackground,
  onReset,
}) => {
  const activeTool = useSelector((state) => state.image.activeTool);

  return (
    <div
      className={styles.mainContainer}
      data-testid="tools-component"
    >
      {activeTool === 0 && <Tunes data-testid="tunes-component" />}
      {activeTool === 2 && <Rotate data-testid="rotate-component" />}
      {activeTool === 3 && <Resize data-testid="crop-component" />}
      {activeTool === 4 && (
        <Filters data-testid="filters-component" />
      )}
      {activeTool === 5 && (
        <RemoveBgTool
          brushSize={brushSize}
          onBrushSizeChange={onBrushSizeChange}
          onRemoveBackground={onRemoveBackground}
          onReset={onReset}
          data-testid="remove-bg-component"
        />
      )}
      {activeTool === 7 && <TextTool data-testid="text-component" />}
    </div>
  );
};

export default Tools;
