import styles from './tools.module.css';
import React from 'react';

const Tools = () => {
  const filters = [
    { name: 'nebula' },
    { name: 'outerspace' },
    { name: 'refulgence' },
    { name: 'grayscale' },
    { name: 'grayscale' },
    { name: 'grayscale' },
  ];
  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        {filters.map((filter, index) => (
          <div key={index} className={styles.filterItem}>
            <div className={styles.filterBlock}></div>
            <p className={styles.filterLabel}>{filter.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tools;
