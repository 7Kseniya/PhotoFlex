import React from 'react';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import styles from './rotate-tools.module.css';
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setRotation } from '../../../services/actions/image-actions';
const Rotate = ({ onRotate }) => {
  const dispatch = useDispatch();
  const rotation = useSelector((state) => state.rotation);
  const icons = [
    {
      component: RotateLeftIcon,
      className: styles.left90,
      action: () =>
        onRotate ? onRotate(-90) : dispatch(setRotation(-90)), // Если onRotate передан, вызываем его
      testId: 'rotate-left-icon',
    },
    {
      component: RotateRightIcon,
      className: styles.right90,
      action: () =>
        onRotate ? onRotate(90) : dispatch(setRotation(90)), // Если onRotate передан, вызываем его
      testId: 'rotate-right-icon',
    },
  ];
  const sliders = [
    {
      name: 'rotateHandle',
      label: 'Rotation',
      min: 0,
      max: 360,
      defaultValue: rotation,
      testId: 'rotation-slider',
    },
  ];

  const handleSliderChange = (event, newValue) => {
    dispatch(setRotation(newValue));
  };

  return (
    <div className={styles.sharedContainer}>
      {icons.map((icon, index) => {
        const IconComponent = icon.component;
        return (
          <div
            key={index}
            onClick={icon.action}
            data-testid={icon.testId}
          >
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
            value={rotation !== undefined ? rotation : 0}
            min={slider.min}
            max={slider.max}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            style={{ color: 'white' }}
            data-testid={`slider-${slider.name}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Rotate;
