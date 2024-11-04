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
    <div className={styles.sharedContainer} data-testid="settings">
      {tunes.map((tune) => (
        <div key={tune.name} className={styles.tuneItem}>
          <p className={styles.label}>
            {tune.name.charAt(0).toUpperCase() + tune.name.slice(1)}
          </p>
          <Slider
            aria-label={tune.name}
            value={settings[tune.name]}
            min={tune.min}
            max={tune.max}
            onChange={handleSlider(tune.name)}
            valueLabelDisplay="auto"
            style={{ color: 'white' }}
          />
        </div>
      ))}
    </div>
  );
};

export default Tunes;
