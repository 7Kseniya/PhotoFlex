import styles from './filters-tools.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../services/actions/image-actions';

const Filters = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.image.filter);

  const filters = [
    { name: 'none' },
    { name: 'grayscale' },
    { name: 'sepia' },
    { name: 'invert' },
    { name: 'outerspace' },
    { name: 'refulgence' },
    { name: 'pink' },
  ];
  const handleFilterSelect = (name) => {
    dispatch(setFilter(name));
  };
  return (
    <div
      className={styles.sharedContainer}
      data-testid="filters-component"
    >
      {filters.map(({ name }, index) => (
        <div
          key={index}
          className={`${styles.filterItem} ${
            activeFilter === name ? styles.activeFilter : ''
          }`}
          onClick={() => handleFilterSelect(name)}
        >
          <div className={styles.filterBlock} />
          <p className={styles.label}>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default Filters;
