import styles from './tools.module.css';
import Tunes from './tune-tool/tunes-tools';
import Filters from './filter-tool/filters-tools';
import Crop from './crop-tool/crop-tools';
import Rotate from './rotate-tool/rotate-tools';
import React from 'react';

const Tools = ({ activeTool }) => {
  return (
    <div className={styles.mainContainer}>
      {activeTool === 0 && <Tunes />}
      {activeTool === 1 && <Crop />}
      {activeTool === 2 && <Rotate />}
      {activeTool === 4 && <Filters />}
    </div>
  );
};
export default Tools;
