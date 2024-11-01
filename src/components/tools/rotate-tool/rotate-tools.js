import React, { useState } from 'react';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import styles from './rotate-tools.module.css';
import { Slider } from '@mui/material';

const Rotate = ({ onRotate }) => {
  const icons = [
    {
      component: RotateLeftIcon,
      className: styles.left90,
      action: () => onRotate(-90),
    },
    {
      component: RotateRightIcon,
      className: styles.right90,
      action: () => onRotate(90),
    },
  ];

  const sliders = [
    {
      name: 'rotateHandle',
      label: 'Rotation',
      min: 0,
      max: 360,
      defaultValue: 50,
    },
  ];

  const [settings, setSettings] = useState(
    sliders.reduce(
      (acc, slider) => ({
        ...acc,
        [slider.name]: slider.defaultValue,
      }),
      {}
    )
  );

  const handleSliderChange = (name) => (event, newValue) => {
    setSettings((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <div className={styles.sharedContainer}>
      {icons.map((icon, index) => {
        const IconComponent = icon.component;
        return (
          <div key={index} onClick={icon.action}>
            <IconComponent
              className={`${styles.rotateIcon} ${icon.className}`}
            />
          </div>
        );
      })}
      {sliders.map((slider) => (
        <div key={slider.name} className={styles.rotateItem}>
          <Slider
            aria-label={slider.label}
            value={settings[slider.name]}
            min={slider.min}
            max={slider.max}
            onChange={handleSliderChange(slider.name)}
            valueLabelDisplay="auto"
            style={{ color: 'white' }}
          />
        </div>
      ))}
    </div>
  );
};

export default Rotate;
