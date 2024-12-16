import React from 'react';
import { useSelector } from 'react-redux';
import styles from './tools.module.css';
import Tunes from './tune-tool/tunes-tools';
import Filters from './filter-tool/filters-tools';
import Resize from './resize-tool/resize-tools';
import Rotate from './rotate-tool/rotate-tools';
import RemoveBgTool from './remove-bg-tool/remove-bg-tool';
import TextTool from './text-tool/text-tools';
import Crop from './crop-tool/crop-tools';
import ReplaceBgTool from './replace-bg-tool/replace-bg-tool';

const Tools = ({ canvasRef }) => {
  const activeTool = useSelector((state) => state.image.activeTool);
  return (
    <div
      className={styles.mainContainer}
      data-testid="tools-component"
    >
      {activeTool === 0 && <Tunes data-testid="tunes-component" />}
      {activeTool === 1 && <Crop data-testid="crop-component" />}
      {activeTool === 2 && <Rotate data-testid="rotate-component" />}
      {activeTool === 3 && <Resize data-testid="resize-component" />}
      {activeTool === 4 && (
        <Filters data-testid="filters-component" />
      )}
      {activeTool === 5 && (
        <RemoveBgTool
          canvasRef={canvasRef}
          data-testid="remove-bg-component"
        />
      )}
      {activeTool === 6 && (
        <ReplaceBgTool
          canvasRef={canvasRef}
          data-testid="replace-bg-component"
        />
      )}
      {activeTool === 7 && <TextTool data-testid="text-component" />}
    </div>
  );
};

export default Tools;
