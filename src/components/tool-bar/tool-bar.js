import styles from './tool-bar.module.css';
import React from 'react';
import TuneIcon from '@mui/icons-material/Tune';

const ToolBar = () => {
  return (
    <div className={styles.mainContainer}>
      <TuneIcon className={`${styles.icon} ${styles.tune}`} />
    </div>
  );
};
export default ToolBar;
