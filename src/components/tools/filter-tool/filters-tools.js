import styles from './filters-tools.module.css';
import React from 'react';

const Filters = () => {
  const filters = [
    { name: 'nebula' },
    { name: 'outerspace' },
    { name: 'refulgence' },
    { name: 'grayscale' },
    { name: 'grayscale' },
    { name: 'grayscale' },
  ];

  return (
    <div
      className={styles.sharedContainer}
      data-testid={'filters-component'}
    >
      {filters.map(({ name }, index) => (
        <div key={index} className={styles.filterItem}>
          <div className={styles.filterBlock}></div>
          <p className={styles.label}>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default Filters;
