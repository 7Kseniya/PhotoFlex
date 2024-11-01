import styles from './tools.module.css';
import Tunes from './tune-tool/tunes-tools';
import Filters from './filter-tool/filters-tools';
import Crop from './crop-tool/crop-tools';
import React from 'react';

const Tools = ({ activeTool }) => {
  return (
    <div className={styles.mainContainer}>
      {activeTool === 0 && <Tunes />}
      {activeTool === 1 && <Crop />}
      {activeTool === 4 && <Filters />}
    </div>
  );
};
export default Tools;
