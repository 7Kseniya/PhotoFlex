import React from 'react';
import { useSelector } from 'react-redux';
import styles from './tools.module.css';
import Tunes from './tune-tool/tunes-tools';
import Filters from './filter-tool/filters-tools';
import Crop from './crop-tool/crop-tools';
import Rotate from './rotate-tool/rotate-tools';
import Text from './text-tool/text-tools';

const Tools = () => {
  const { activeTool } = useSelector((state) => state);

  return (
    <div className={styles.mainContainer}>
      {activeTool === 0 && <Tunes data-testid="tunes-component" />}
      {activeTool === 1 && <Crop data-testid="crop-component" />}
      {activeTool === 2 && <Rotate data-testid="rotate-component" />}
      {activeTool === 4 && (
        <Filters data-testid="filters-component" />
      )}
      {activeTool === 7 && <Text data-testid="text-component" />}
    </div>
  );
};

export default Tools;
