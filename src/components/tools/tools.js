import styles from './tools.module.css';
import React, { useState } from 'react';
import { Slider } from '@mui/material';

const Tools = ({ activeTool }) => {
  const filters = [
    { name: 'nebula' },
    { name: 'outerspace' },
    { name: 'refulgence' },
    { name: 'grayscale' },
    { name: 'grayscale' },
    { name: 'grayscale' },
  ];

  const tunes = [
    { name: 'brightness', min: 0, max: 100 },
    { name: 'contrast', min: 0, max: 100 },
    { name: 'saturation', min: 0, max: 100 },
    { name: 'sharpness', min: 0, max: 100 },
  ];

  const [settings, setSettings] = useState({
    brightness: 50,
    contrast: 50,
    saturation: 50,
    sharpness: 50,
  });

  const handleSlider = (optionName) => (event, newValue) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [optionName]: newValue,
    }));
  };

  const filterOptions = () => (
    <div className={styles.filterContainer}>
      {filters.map(({ name }, index) => (
        <div key={index} className={styles.filterItem}>
          <div className={styles.filterBlock}></div>
          <p className={styles.label}>{name}</p>
        </div>
      ))}
    </div>
  );

  const tuneOptions = () => (
    <div className={styles.tuneContainer}>
      {tunes.map(({ name, min, max }, index) => (
        <div key={index} className={styles.tuneItem}>
          <p className={styles.label}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </p>
          <Slider
            value={settings[name]}
            min={min}
            max={max}
            onChange={handleSlider(name)}
            className={styles.slider}
          />
        </div>
      ))}
    </div>
  );
  // циферки - это индексы массива иконок в tool-bar
  return (
    <div className={styles.mainContainer}>
      {activeTool === 4 && filterOptions()}
      {activeTool === 0 && tuneOptions()}
    </div>
  );
};
export default Tools;
