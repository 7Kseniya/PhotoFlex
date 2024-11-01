import React, { useState } from 'react';
import { Slider } from '@mui/material';
import styles from './tunes-tools.module.css';

const Tunes = () => {
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

  return (
    <div className={styles.sharedContainer}>
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
            style={{ color: 'white' }}
          />
        </div>
      ))}
    </div>
  );
};

export default Tunes;
