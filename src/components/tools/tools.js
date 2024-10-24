import styles from './tools.module.css';
import React, { useState } from 'react';
import { Slider } from '@mui/material';
import {
  Crop169,
  Crop32,
  Crop54,
  Crop75,
  CropSquare,
} from '@mui/icons-material';

const Tools = ({ activeTool }) => {
  // фильтрики
  const filters = [
    { name: 'nebula' },
    { name: 'outerspace' },
    { name: 'refulgence' },
    { name: 'grayscale' },
    { name: 'grayscale' },
    { name: 'grayscale' },
  ];
  const filterOptions = () => (
    <div className={styles.sharedContainer}>
      {filters.map(({ name }, index) => (
        <div key={index} className={styles.filterItem}>
          <div className={styles.filterBlock}></div>
          <p className={styles.label}>{name}</p>
        </div>
      ))}
    </div>
  );

  // резкость и тд
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
  const tuneOptions = () => (
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

  // обрезание
  const crop = [
    { component: Crop169, name: '16:9' },
    { component: CropSquare, name: 'Квадрат' },
    { component: Crop169, name: '9:16', className: styles.crop916 },
    { component: Crop32, name: '3:2' },
    { component: Crop54, name: '5:4' },
    { component: Crop75, name: '7:5' },
  ];
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
  });
  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    const newValue = Math.max(0, value);
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [name]: newValue,
    }));
  };
  const cropOptions = () => (
    <div className={styles.sharedContainer}>
      <div className={styles.dimensionInputContainer}>
        <label className={styles.label}>
          Width:
          <input
            type="number"
            name="width"
            value={dimensions.width}
            onChange={handleDimensionChange}
            className={styles.dimensionInput}
          />
        </label>
        <label className={styles.label}>
          Height:
          <input
            type="number"
            name="height"
            value={dimensions.height}
            onChange={handleDimensionChange}
            className={styles.dimensionInput}
          />
        </label>
      </div>
      {crop.map((cropItem, index) => {
        const CropComponent = cropItem.component;
        return (
          <div key={index} className={styles.cropItem}>
            <CropComponent
              className={`${styles.cropIcon} ${cropItem.className}`}
            />
            <p className={styles.label}>{cropItem.name}</p>
          </div>
        );
      })}
    </div>
  );
  // циферки - это индексы массива иконок в tool-bar
  return (
    <div className={styles.mainContainer}>
      {activeTool === 0 && tuneOptions()}
      {activeTool === 1 && cropOptions()}
      {activeTool === 4 && filterOptions()}
    </div>
  );
};
export default Tools;
